const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

/////////////////////////////////////////////////////////
//GET ROUTES
// find all tags
// be sure to include its associated Product data
router.get("/", (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tag_name" }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "tag_name" }],
    });

    if (!locationData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//////////////////////////////////////////////////////////
//POST ROUTE

// create a new tag

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// router.post("/", async (req, res) => {
//   const tagData = await Tag.create({
//     // tag_id: req.body.tag_id,
//     tag_name: req.body.tag_name,
//   });

//   return res.json(tagData);
// });

/////////////////////////////////////////////////////////
//PUT (UPDATE) ROUTE

// update a tag's name by its `id` value

router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //Keep an eye on this [0]
    if (!tagData) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//////////////////////////////////////////////////////////
//DELETE ROUTE

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
