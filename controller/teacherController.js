const Teacher = require("../models/teacherModel");

const getTeachers = async (req, res) => {
  try {
    const teacher = await Teacher.find({});
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addTeacher = async (req, res) => {
  try {
    var teacher = await Teacher.create(req.body);
    teacher = await Teacher.find({});
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

const searchTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndUpdate(id, req.body);
    if (!teacher) {
      return res.status(500).json(`Cannot find teacher with ID ${id}`);
    }
    const updatedTeacher = await Teacher.findById(id);
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(500).json(`Cannot find teacher with ID ${id}`);
    }
    res.status(200).json(`${teacher.name} has been deleted.`);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const payTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    const rate = teacher.rate;
    const hours_worked = teacher.hours_worked;
    const payroll = rate * hours_worked;

    res.status(200).json(payroll);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getTeachers,
  addTeacher,
  searchTeacher,
  updateTeacher,
  deleteTeacher,
  payTeacher,
};
