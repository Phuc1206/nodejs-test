const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:slug', courseController.show);
router.put('/:_id',courseController.update);
router.delete('/:_id', courseController.delete);
router.delete('/:_id/destroy', courseController.destroy);
router.get('/:_id/edit', courseController.updatecourse);
router.patch('/:_id/restore', courseController.restore);
router.get('/', courseController.index);

module.exports = router;
