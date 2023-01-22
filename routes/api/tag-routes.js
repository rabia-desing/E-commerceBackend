const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTagData = await Tag.findAll({
      include: [
        { model: Product }
      ],
    });
    res.status(200).json(getTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product }
      ],
    });

    if (!singleTagData) {
      res.status(404).json({ message: 'Error! No data found' });
      return;
    }

    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!updateTag[0]) {
      res.status(404).json({ message: 'Error! No tag found to update' });
      return;
    }
    res.status(200).json("Tag with id " + updateTag + " has been updated to " + req.body.tag_name);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: { id: req.params.id, }
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'Error! No tag found to delete' });
      return;
    }
    res.status(200).json('Tag deleted Successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
