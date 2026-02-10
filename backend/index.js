const express = require("express");
const { connectMongoDB } = require("./connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const coordinatorRoute = require("./routes/coordinator");
const adminRoute = require("./routes/admin");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());

// ROUTES
app.use("/coordinator", coordinatorRoute);
app.use("/admin", adminRoute);

connectMongoDB(
  "mongodb+srv://sgpproject264_db_user:CP9rmjEywwtGH1E0@cluster0.urf1c4q.mongodb.net/sgp"
)
.then(() => {
  console.log("MongoDB Atlas connected");
})
.catch((err) => {
  console.log("MongoDB connection error:", err.message);
});

let port = 8000;
app.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
