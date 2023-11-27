const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
    employeeID:{
        type:String,
        required: true,
    },
    employeeName:{
        type:String,
        required: true,
    },
    employeeFatherName:{
        type:String,
        required: true,
    },
    employeeMotherName:{
        type:String,
        required: true,
    },
    employeeDOB:{
        type:String,
        required: true,
    },
    employeeGender:{
        type:String,
        required: true,
    },
    employeeAddress:{
        type:String,
        required: true,
    },
    employeeCountry:{
        type:String,
        required: true,
    },
    employeePhone:{
        type:String,
        required: true,
    },
    employeeEmail:{
        type:String,
        required: true,
    },
    employeeBankName:{
        type:String,
        required: true,
    },
    employeeBankHolderName:{
        type:String,
        required: true,
    },
    employeeBranchName:{
        type:String,
        required: true,
    },
    employeeAccountNumber:{
        type:String,
        required: true,
    },
    employeeIFSCcode:{
        type:String,
        required: true,
    },
    employeeTenthImage:{
        type:String,
        required: true,
    },
    employeeTwelthImage:{
        type:String,
        required: true,
    },
    employeeGraduationImage:{
        type:String,
        required: true,
    },
    employeePostGraduationImage:{
        type:String,
        required: true,
    },
    employeeAadharNumber:{
        type:String,
        required: true,
    },
    employeePancard:{
        type:String,
        required: true,
    },
    employeeBloodGroup:{
        type:String,
        required: true,
    },
})


module.exports = mongoose.model('employee', employeeSchema);