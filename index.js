const express = require("express");
const mongoose  = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
require('dotenv').config();

//middlewares
const { requireAuth } = require("./middleware/authMiddleware");
//models
const User = require("./models/users");
//controllers
const userController = require("./controllers/user");

const app = express();

//--------------------setting cors for front end--------------------//
app.use(
  cors({
    origin:'*',
  })
);
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//--------------------connecting with mongoDB--------------------//

// const URL = "mongodb://127.0.0.1:27017/lab9";
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    app.listen(3100,()=>{
        console.log("Server started on port 3100...");
    });
})
.catch((err)=>{
    console.log("Error while connecting to mongoose");
    console.log(err, err.message);
});



//--------------------setting router and routes--------------------//
router.get("/",(req,res)=>{
  res.send("Welcome to todo App backend.")
})
router.post("/login",userController.login_post);
router.post("/register",userController.register_post);
router.post("/tasks",requireAuth,userController.tasks_post);
router.post("/addTask",requireAuth,userController.add_task_post);
router.post("/changeStatus",requireAuth,userController.change_status_post);
router.post("/deleteTask",requireAuth,userController.delete_task_post);
router.post("/profile",requireAuth,userController.get_user_profile_post);


//--------------------setting router and routes--------------------//

app.use("/",router);