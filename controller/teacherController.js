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
    const payrollArr = [];
    const teachers = await Teacher.find({});

    teachers.forEach((teacher) => {
      const payroll = teacher.rate * teacher.hours_worked;
      payrollArr.push({
        name: teacher.name,
        subject: teacher.subject,
        class_type: teacher.class_type,
        payroll: payroll,
      });
    });
    res.status(200).json(payrollArr);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const calcPay = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    let overall = 0;
    let onlineTotal = 0;
    let onsiteTotal = 0;

    const totalByClassType = (teacher, payroll) => {
      if (teacher.class_type === "Online") {
        onlineTotal += payroll;
      } else {
        onsiteTotal += payroll;
      }
    };

    teachers.forEach((teacher) => {
      const payroll = teacher.rate * teacher.hours_worked;
      overall += payroll;
      totalByClassType(teacher, payroll);
    });

    const calcObj = {
      overall: overall,
      onlineTotal: onlineTotal,
      onsiteTotal: onsiteTotal,
    };

    res.status(200).json(calcObj);
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
  calcPay,
};
