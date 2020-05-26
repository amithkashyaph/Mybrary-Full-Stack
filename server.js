if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Call routing
app.use("/", require("./routes/index"));

// DB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.listen(process.env.PORT || 3000, () =>
  console.log("Server started at port 3000")
);
