const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

/////////////////////////////////////////////////////////////
//GET ROUTES

// find all categories
// be sure to include its associated Products
router.get("/", (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, through: Category, as: "product_name" }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", (req, res) => {
  try {
    const categoryData = await Category.findOne(req.params.id, {
      include: [{ model: Product, through: Category, as: "product_name" }],
    });

    if (!locationData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////////////////////////////////////////////////
//POST PUT ROUTES

// create a new category
router.post("/", async (req, res) => {
  const categoryData = await Category.create({
    // category_id: req.body.category_id,
    category_name: req.body.category_name,
  });

  return res.json(categoryData);
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//////////////////////////////////////////////////////////////
//DELETE ROUTE

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
