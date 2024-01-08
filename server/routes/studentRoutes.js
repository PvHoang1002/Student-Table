const express = require('express');
const studentController = require('./../controllers/studentController');

const router = express.Router();

router.route('/').get(studentController.getAllStudents);

router
  .route('/:id')
  .get(studentController.getStudent)
  .post(studentController.createStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
