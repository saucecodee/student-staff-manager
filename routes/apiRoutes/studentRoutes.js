const router = require('express').Router();
const {
  createStudent,
  getStudents,
  getStudent,
  editStudent,
  deleteStudent,
} = require('../../controllers/studentController');

module.exports = function () {
  router.post('/', createStudent);
  router.get('/', getStudents);
  router.get('/:studentId', getStudent);
  router.put('/:studentId', editStudent);
  router.delete('/:studentId', deleteStudent);

  return router;
};
