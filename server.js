require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const teacherRoute = require("./routes/teacherRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/teachers", teacherRoute);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
mongoose.connect(MONGO_URL).then(console.log("MongoDB connected succesfully."));
