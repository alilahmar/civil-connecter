const express = require("express");
const connectDB = require("./config/Db");
const app = express();
//connect with database
connectDB();
//middleware json
app.use(express.json());
// test of the Route
app.get("/", (req, res) => res.send("API is running"));

//Define Routes
app.use("/api/users", require("./routes/API/users"));
app.use("/api/profile", require("./routes/API/profile"));
app.use("/api/auth", require("./routes/API/auth"));
app.use("/api/posts", require("./routes/API/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
