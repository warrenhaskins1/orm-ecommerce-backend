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
    const categoryData = await Category.findByPk(req.params.id, {
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
//POST ROUTE

// create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// router.post("/", async (req, res) => {
//   const categoryData = await Category.create({
//     // category_id: req.body.category_id,
//     category_name: req.body.category_name,
//   });

//   return res.json(categoryData);
// });

/////////////////////////////////////////////////////////
//PUT (UPDATE) ROUTE
// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //Keep an eye on this [0]
    if (!categoryData) {
      res.status(404).json({ message: "No user with this id!" });
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
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
