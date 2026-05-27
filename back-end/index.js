const PostRouter = require("./routes/PostRouter");
const dbConnect = require("./db/dbConnect");
const express = require("express");
const cors = require("cors");
const session = require("express-session");

dbConnect();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  session({
    secret: "trungvutru2k5_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use(express.json());
app.use("/api", PostRouter);

app.listen(8080, function () {
  console.log("listening at port 8080");
});
