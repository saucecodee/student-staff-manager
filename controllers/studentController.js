const {
  createStudent,
  getStudent,
  getStudents,
  editStudent,
  deleteStudent,
} = require('../services/studentServices');
const { response } = require('../helpers/messages');

class StudentContoller {
  async createStudent(req, res, next) {
    console.log(req.body)
    const student = await createStudent(req.body);
    res.status(201).send(response('Account created.', student));
  }

  async getStudent(req, res, next) {
    let data = await getStudent(req.params.studentId);
    res.status(200).send(response('Found', data));
  }

  async getStudents(req, res, next) {
    let data = await getStudents();
    res.status(200).send(response('All Students', data));
  }

  async editStudent(req, res, next) {
    let data = await editStudent(req.params.studentId, req.body);
    res.status(200).send(response('Student edited', data));
  }

  async deleteStudent(req, res, next) {
    let data = await deleteStudent(req.params.studentId);
    res.status(200).send(response('Student deleted', data));
  }
}

module.exports = new StudentContoller();