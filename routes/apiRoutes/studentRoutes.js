const router = require('express').Router();
const {
  createStudent,
  getStudents,
  getStudentsCount,
  getStudentsVerifiedCount,
  getStudent,
  editStudent,
  deleteStudent,
} = require('../../controllers/studentController');

module.exports = function () {
  router.post('/', createStudent);
  router.get('/', getStudents);
  router.get('/count', getStudentsCount);
  router.get('/verified-count', getStudentsVerifiedCount);
  router.get('/:studentId', getStudent);
  router.put('/:studentId', editStudent);
  router.delete('/:studentId', deleteStudent);

  return router;
};
