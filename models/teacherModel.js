const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    hours_worked: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
