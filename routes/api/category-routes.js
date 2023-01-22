const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories with its associated Products
    const getCategoryData = await Category.findAll({
      include: [
        { model: Product }
      ],
    });
    res.status(200).json(getCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value and its associated Products 
    const findCategoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }],
    });

    if (!findCategoryData) {
      res.status(404).json({ message: 'No category found.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const postCategoryData = await Category.create(req.body);
    res.status(200).json(postCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updateCategoryData[0]) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    res.status(200).json(updateCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategoryData = await Category.destroy({
      where: { id: req.params.id, }
    });
    if (!deleteCategoryData) {
      res.status(404).json({ message: 'No if found to delete' });
      return;
    }
    res.status(200).json(deleteCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
