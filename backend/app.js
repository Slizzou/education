/****************** Module Importations ****************/
const express = require("express");
const bodyParser = require("body-parser");
//Import Mongoose Module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/educationDB');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const session = require('express-session');
const multer = require("multer");
const path = require("path");

/********** Express Application *************/
const app = express();

//************************ App Configuration  ********************/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

const secretKey = 'croco-venus-24';
app.use(session({
  secret: secretKey,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/******** Models Importations *****************/
const User = require("./models/user");
const Course = require("./models/course");

/******** Business Logic *****************/

//

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads'); // Set the default destination directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const filename = file.originalname.replace(ext, ''); // Remove the extension from the original filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.fieldname}`;
    const newFilename = `${filename}-${uniqueSuffix}${ext}`; // Construct the new filename with a unique suffix
    cb(null, newFilename);
  }
});

app.use('/avatars', express.static(path.join(__dirname, './uploads')));
//

app.use('/cvs', express.static(path.join(__dirname, './uploads/cvs')));

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf'
};

/**** Routes *****/
// Signup
app.post("/users/signup", multer({ storage: storageConfig }).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), (req, res) => {
  console.log("Here into Signup ", req.body);

  // Check if the user role is requested_teacher
  if (req.body.role === 'requested_teacher') {
    // Continue with user registration process for requested_teacher
    User.findOne({ email: req.body.email }).then((doc) => {
      if (doc) {
        res.json({ msg: "Email Exists" });
      } else {
        bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
          console.log("Here Crypted Pwd", cryptedPwd);
          
          let newUser = {
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            pwd: cryptedPwd,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role
          };
    
          if (req.files['cv']) {
            newUser.cv = `http://localhost:3000/cvs/${req.files['cv'][0].filename}`;
          }
    
          let userObj = new User(newUser);
          userObj.save();
          res.json({ msg: "User added with success" });
        });
      }
    });
  } else {
    // For other roles, proceed with the default registration process
    User.findOne({ email: req.body.email }).then((doc) => {
      if (doc) {
        res.json({ msg: "Email Exists" });
      } else {
        bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
          console.log("Here Crypted Pwd", cryptedPwd);
          
          let newUser = {
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            pwd: cryptedPwd,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role
          };
    
          if (req.files['img']) {
            newUser.avatar = `http://localhost:3000/avatars/${req.files['img'][0].filename}`;
          }
    
          let userObj = new User(newUser);
          userObj.save();
          res.json({ msg: "User added with success" });
        });
      }
    });
  }
});








/**** Routes *****/
// Signup
app.post("/users/signup", multer({ storage: storageConfig }).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), (req, res) => {
  console.log("Here into Signup ", req.body);

  // Check if the user role is requested teacher
  if (req.body.role === 'requested_teacher') {
    // Continue with user registration process for requested teacher
    User.findOne({ email: req.body.email }).then((doc) => {
      if (doc) {
        res.json({ msg: "Email Exists" });
      } else {
        bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
          console.log("Here Crypted Pwd", cryptedPwd);
          
          let newUser = {
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            pwd: cryptedPwd,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role
          };
    
          if (req.files['cv']) {
            newUser.cv = `http://localhost:3000/cvs/${req.files['cv'][0].filename}`;
          }
    
          let userObj = new User(newUser);
          userObj.save();
          res.json({ msg: "User added with success" });
        });
      }
    });
  } else {
    // For other roles, proceed with the default registration process
    User.findOne({ email: req.body.email }).then((doc) => {
      if (doc) {
        res.json({ msg: "Email Exists" });
      } else {
        bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
          console.log("Here Crypted Pwd", cryptedPwd);
          
          let newUser = {
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            pwd: cryptedPwd,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role
          };
    
          if (req.files['img']) {
            newUser.avatar = `http://localhost:3000/avatars/${req.files['img'][0].filename}`;
          }
    
          let userObj = new User(newUser);
          userObj.save();
          res.json({ msg: "User added with success" });
        });
      }
    });
  }
});


app.get("/users", (req, res) => {
  // Business Logic
  console.log("here into BL: Get All players");

  User.find().then(
    (docs) => {
      console.log("Here all docs", docs)
      res.json({ users: docs })

    }

  )

});
app.delete("/users/:id", (request, response) => {
  const userID = request.params.id;
  User.deleteOne({ _id: userID }).then((deleteResponse) => {
    console.log("Here DeleteResponse", deleteResponse);
    if (deleteResponse.deletedCount == 1) {
      // If user is successfully deleted, fetch the updated list of users
      User.find().then((users) => {
        // Send the updated list of users in the response
        response.json({ response: true, users: users });
      }).catch((error) => {
        console.error("Error fetching updated list of users:", error);
        response.status(500).json({ response: false, error: "Internal Server Error" });
      });
    } else {
      response.json({ response: false });
    }
  }).catch((error) => {
    console.error("Error deleting user:", error);
    response.status(500).json({ response: false, error: "Internal Server Error" });
  });
});

// Get all teachers
app.get("/getallteachers", async (req, res) => {
  try {
    console.log("Here into BL: Get All teachers");
    // Updated the role array to include both 'teacher' and 'request_teacher'
    const teachers = await User.find({ role: { $in: ['teacher', 'requested_teacher'] }}).maxTimeMS(5000);
    console.log("Here all teachers:", teachers);
    // Returning the teachers as JSON
    res.json({ teachers: teachers });
  } catch (err) {
    console.error("Error:", err);
    // Sending a 500 status code in case of error
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get all students
app.get("/getallstudents", async (req, res) => {
  try {
    console.log("Here into BL: Get All students");
    const students = await User.find({ role: 'student' }).maxTimeMS(5000);
    console.log("Here all Students:", students);
    res.json({ students: students });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get all courses
app.get("/courses", (req, res) => {
  // Business Logic
  console.log("here into BL: Get All courses");

  Course.find().then(
    (docs) => {
      console.log("Here all docs", docs)
      res.json({ courses: docs })

    }


  )

});
// User login
app.post("/users/login/", (req, res) => {
  console.log("Here Into BL:Login", req.body);

  // Search User By Email
  User.findOne({ email: req.body.email }).then((doc) => {
    if (!doc) {
      res.json({ msg: "Please check your email" });
    } else {
      // Compare passwords
      bcrypt.compare(req.body.pwd, doc.pwd).then((pwdResult) => {
        console.log("PwdResult", pwdResult);
        if (!pwdResult) {
          res.json({ msg: "Please check your password" });
        } else {
          const token = jwt.sign({
            role: doc.role,
            fName: doc.firstName,
            lName: doc.lastName,
            id: doc._id,
            avatar:doc.avatar,
            cv:doc.cv,
          }
            ,

            secretKey, {
            expiresIn: "1h",
          }
          );
          console.log("Here generated token", token);
          res.json({ msg: "Welcome", token: token });
        }
      });
    }
  });
});
// Get User By ID
app.get("/users/:id", (req, res) => {
  console.log("Here Into BL : Get User By ID", req.params.id);
  let id = req.params.id;
  User.findById(id).then(

    (doc) => {

      if (doc) {
        res.json({ obj: doc });

      } else {
        res.json({ msg: "Not Found" });
      }


    }

  );
});
// Get Course By ID
app.get("/courses/:id", async (req, res) => {
  console.log("Here Into BL: Get Course By ID", req.params.id);
  try {
    const id = req.params.id;
    const course = await Course.findById(id)
                                .populate('students')
                                .populate('teacherID', 'firstName'); // Corrected field name to 'teacherID'
    if (course) {
      res.json({ obj: course });
    } else {
      res.status(404).json({ msg: "Course not found" });
    }
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




// Update user role to teacher
app.put("/teachers/", (request, response) => {
  console.log('here is the object',request.body)
  const  id = request.body._id;
  
  // Extract id and role from request body
  // Use findOneAndUpdate to update user role based on id value
  User.findByIdAndUpdate(id, { role: 'teacher' }, { new: true, useFindAndModify: false }) // Add useFindAndModify: false option
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("User role updated successfully:", updatedUser);
        response.json({ success: true });
      } else {
        console.error("User not found or role not updated.");
        response.status(404).json({ success: false, message: "User not found or role not updated." });
      }
    })
    .catch((error) => {
      console.error("Error updating user role:", error);
      response.status(500).json({ success: false, message: "Internal Server Error" });
    });
});
// Add a new course
app.post("/courses/", (req, res) => {
  console.log("Here into BL: Add Course", req.body);

  // Assuming you have a User model and a Course model defined

  // Find the user by ID
  User.findById(req.body.teacherID).then((userObj) => {
    if (userObj) {
      let courseObj = new Course(req.body); // Assuming Course model is defined

      // Set the user ID for the course
      courseObj.teacherID = userObj._id;

      courseObj.save((err, doc) => {
        if (doc) {
          res.json({ msg: "Course Added With Success" });
        } else {
          // Error
          res.json({ msg: "Course Not Saved" });
        }
      });
    } else {
      res.json({ msg: "User Not Found" });
    }
  });
});

app.delete("/courses/:id", (request, response) => {
  const courseID = request.params.id;
  Course.deleteOne({ _id: courseID }).then((deleteResponse) => {
    console.log("Here DeleteResponse", deleteResponse);
    if (deleteResponse.deletedCount == 1) {
      // If course is successfully deleted, fetch the updated list of courses
      Course.find().then((courses) => {
        // Send the updated list of courses in the response
        response.json({ response: true, courses: courses });
      }).catch((error) => {
        console.error("Error fetching updated list of users:", error);
        response.status(500).json({ response: false, error: "Internal Server Error" });
      });
    } else {
      response.json({ response: false });
    }
  }).catch((error) => {
    console.error("Error deleting user:", error);
    response.status(500).json({ response: false, error: "Internal Server Error" });
  });
});

// Edit Course
app.put("/courses/", (request, response) => {
  let course = request.body;
  console.log("Here is the course ",course);
  const id = course.id;
  Course.updateOne({ _id: course.id }, request.body).then((updateResponse) => {
    console.log("Here Update response", updateResponse);
    if (updateResponse.nModified == 1) {
      response.json({ response: true });
    } else {
      response.json({ response: false });
    }
  });
});


//http://localhost:3000/avatars/165__1620012335821_254996629_large-1710680234386-428277213-img.jpg"
//C:\Users\Salim\Desktop\Education\learnify\backend\uploads\165__1620012335821_254996629_large-1710680234386-428277213-img.jpg
/************* Export Application ****************/
module.exports = app;
