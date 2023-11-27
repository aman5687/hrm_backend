const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Employee = require("../models/employees");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;


// multer config
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });
// ends here


// cloudinary config
cloudinary.config({
    cloud_name: 'djrh8oflc',
    api_key: '544113442678141',
    api_secret: 'G6AKEYGFz2eiEcVHXg-4myu5cXg'
});
// ends here



// registration api starts
router.post("/register", async (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const token = uuidv4();

    const errors = [];

    if (!name) {
        errors.push("Please enter a name");
    }
    if (!email) {
        errors.push("Please enter an email");
    }
    if (!password) {
        errors.push("Please enter a password");
    }
    if (!validator.isEmail(email)) {
        errors.push("Please enter a valid email");
    }
    if (password.length < 8) {
        errors.push("Password should be atleast 8 characters long");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors })
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 8);
            const user = new User({
                name,
                email,
                hashedPassword,
                token,
            });
            const savedUser = await user.save();

            if (!savedUser) {
                res.status(500).send({ message: "Error occured" });
            } else {
                res.status(200).send({ message: "Successful" });
            }
        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
                res.status(409).json({ message: "Email is already in use, please enter a unique email" }); // Use 409 Conflict
            } else {
                res.status(500).json({ message: "Error in catch" }); // Use 500 Internal Server Error
            }
        }
    }
});

// ends


router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = [];

    if (!email) {
        errors.push("Please provide the email");
    }
    if (!password) {
        errors.push("Please provide the password");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    const user = await User.findOne({ email });

    if (!user) {
        errors.push("This email is not registered");
        res.status(400).json({ errors });
        return;
    } else {
        const checkPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!checkPassword) {
            errors.push("Wrong password");
            res.status(400).json({ errors });
            return;
        } else {
            const username = user.name;
            res.status(201).send({ user, message: "Logged in" });
        }
    }

});


// api to add employee by HR

router.post("/addEmployee", upload.fields([
    { name: 'employeeTenthImage', maxCount: 1 },
    { name: 'employeeTwelthImage', maxCount: 1 },
    { name: 'employeeGraduationImage', maxCount: 1 },
    { name: 'employeePostGraduationImage', maxCount: 1 }
  ]), async (req, res) => {
    try {
        
        const {
            employeeID,
            employeeName,
            employeeFatherName,
            employeeMotherName,
            employeeDOB,
            employeeGender,
            employeeAddress,
            employeeCountry,
            employeePhone,
            employeeEmail,
            employeeBankName,
            employeeBankHolderName,
            employeeBranchName,
            employeeAccountNumber,
            employeeIFSCcode,
            employeeAadharNumber,
            employeePancard,
            employeeBloodGroup,
        } = req.body;
    
        const filesToUpload = [
            req.files.employeeTenthImage[0].path,
            req.files.employeeTwelthImage[0].path,
            req.files.employeeGraduationImage[0].path,
            req.files.employeePostGraduationImage[0].path,
        ];


        const errors = [];

        if(!employeeID){
            errors.push("Please provide an employee ID");
            return res.status(401).json({errors});
        }
        if(!employeeName){
            errors.push("Please provide an employee Name");
            return res.status(401).json({errors});
        }
        if(!employeeFatherName){
            errors.push("Please provide an employee Father Name");
            return res.status(401).json({errors});
        }
        if(!employeeMotherName){
            errors.push("Please provide an employee Mother Name");
            return res.status(401).json({errors});
        }
        if(!employeeDOB){
            errors.push("Please provide an employee DOB");
            return res.status(401).json({errors});
        }
        if(!employeeGender){
            errors.push("Please provide an employee Gender");
            return res.status(401).json({errors});
        }
        if(!employeeAddress){
            errors.push("Please provide an employee Address");
            return res.status(401).json({errors});
        }
        if(!employeeCountry){
            errors.push("Please provide an employee Country");
            return res.status(401).json({errors});
        }
        if(!employeePhone){
            errors.push("Please provide an employee Phone");
            return res.status(401).json({errors});
        }
        if(!employeeEmail){
            errors.push("Please provide an employee Email");
            return res.status(401).json({errors});
        }
        if(!employeeBankName){
            errors.push("Please provide an employee Bank Name");
            return res.status(401).json({errors});
        }
        if(!employeeBankHolderName){
            errors.push("Please provide an employee Bank Holder Name");
            return res.status(401).json({errors});
        }
        if(!employeeBranchName){
            errors.push("Please provide an employee Bank Branch Name");
            return res.status(401).json({errors});
        }
        if(!employeeAccountNumber){
            errors.push("Please provide an employee Account Number");
            return res.status(401).json({errors});
        }
        if(!employeeIFSCcode){
            errors.push("Please provide an employee IFSC Code");
            return res.status(401).json({errors});
        }
        if(!employeeAadharNumber){
            errors.push("Please provide an employee Addhar Card Number");
            return res.status(401).json({errors});
        }
        if(!employeePancard){
            errors.push("Please provide an employee Pan Card Number");
            return res.status(401).json({errors});
        }
        if(!employeeBloodGroup){
            errors.push("Please provide an employee Blood Group");
            return res.status(401).json({errors});
        }
    
        const uploadedFiles = await Promise.all(filesToUpload.map(filePath => cloudinary.uploader.upload(filePath, {folder: "hrm_employee_files"})));
    
    
        const employee = new Employee({
            employeeID,
            employeeName,
            employeeFatherName,
            employeeMotherName,
            employeeDOB,
            employeeGender,
            employeeAddress,
            employeeCountry,
            employeePhone,
            employeeEmail,
            employeeBankName,
            employeeBankHolderName,
            employeeBranchName,
            employeeAccountNumber,
            employeeIFSCcode,
            employeeAadharNumber,
            employeePancard,
            employeeBloodGroup,
            employeeTenthImage: uploadedFiles[0].url,
            employeeTwelthImage: uploadedFiles[1].url,
            employeeGraduationImage: uploadedFiles[2].url,
            employeePostGraduationImage: uploadedFiles[3].url,
    
        });
    
        const employeeRegistered = await employee.save();
    
        if (!employeeRegistered.errors) {
            res.status(200).json({ employeeRegistered });
          } else {
            res.status(401).json({ message: "Employee has not been registered", errors: employeeRegistered.errors });
          }
    } catch (error) {
        res.status(401).json({error});
    }



})


// ends here






module.exports = router;