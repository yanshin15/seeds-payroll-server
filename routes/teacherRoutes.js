const express = require("express");
const {
  getTeachers,
  addTeacher,
  searchTeacher,
  updateTeacher,
  deleteTeacher,
  payTeacher,
  calcPay,
} = require("../controller/teacherController");
const router = express.Router();

//Show all teachers
router.get("/", getTeachers);

//Add a teacher
router.post("/add", addTeacher);

//Show a teacher by ID
router.get("/:id", searchTeacher);

//Update teacher details
router.put("/:id", updateTeacher);

//Delete a teacher
router.delete("/:id", deleteTeacher);

//Payrollpay
router.get("/pay/all", payTeacher);

//Calculate totals
router.get("/calculate/all", calcPay);

module.exports = router;
