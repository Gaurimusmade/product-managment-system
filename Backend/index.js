const express = require("express");
const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const Port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome To login registration system" });
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Page Not Found" });
});

app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
