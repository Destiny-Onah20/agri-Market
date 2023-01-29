const modelName = require("../models/users");
const bcrypt = require("bcryptjs");
const v = require("fastest-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mailSender = require("../helpers/email");
dotenv.config({path: './config/config.env'})

exports.signUpUser = async(req,res)=>{
    try {
        const {firstName,lastName, email, phoneNumber,location, password} = req.body;
        const saltPwd = await bcrypt.genSalt(5);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const createData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            location,
            password: hassPwd
        };
            const createUser = new modelName(createData);
            const genToken = await jwt.sign({
                id: createUser._id,
                isAdmin: createUser.isAdmin
            },process.env.JWTTOKEN, {expiresIn: "1h"});

            createUser.token = genToken;
            await createUser.save();

            const verifyUser = `${req.protocol}://${req.get("host")}/api/verifyUser/${createUser._id}`;
            const message = `Please click on this link ${verifyUser} to verify your account`;
            mailSender({
                email: createUser.email,
                subject: "Kindly verify your account",
                message
            })

            res.status(201).json({
                message: "created Successfully...",
                data: createUser
            })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.signUpAdmin = async(req,res)=>{
    try {
        const {firstName,lastName, email, phoneNumber,location, password} = req.body;
        const saltPwd = await bcrypt.genSalt(5);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const createData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            location,
            password: hassPwd
        };
        const createAdmin = new modelName(createData);
        createAdmin.isAdmin = true;
        const genToken = jwt.sign({
            id: createAdmin._id,
            isAdmin: createAdmin.isAdmin
        },process.env.JWTTOKEN, {expiresIn: "1h"});

        createAdmin.token = genToken;
        await createAdmin.save();

            const verifyMe = `${req.protocol}://${req.get("host")}/api/verifyUser/${createAdmin._id}`
            const message = `Please verify for texting nodemailer with this link ${verifyMe}`;
            mailSender({
                email: createAdmin.email,
                subject: "texting verification",
                message
            })

        res.status(201).json({
            message: "Successfully created Admin..",
            data: createAdmin
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.logIn = async (req,res)=>{
    try{
        const {email, password } = req.body;
        const checkEmail = await modelName.findOne({email});
        if(!checkEmail){
            res.status(404).json({
                message: "Email or password is not authentic..."
            })
        }else{
            const checkPasswrd = bcrypt.compare(password, checkEmail.password);
            if(!checkPasswrd){
                res.status(404).json({
                    message: "Email or password is not authentic..."
                })
            }else{
                const genToken = jwt.sign({
                    id: checkEmail._id,
                    isAdmin: checkEmail.isAdmin
                },process.env.JWTTOKEN, {expiresIn: "1h"});
                checkEmail.token = genToken;
                await checkEmail.save();
                res.status(200).json({
                    data: checkEmail
                })
            }
        }
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
};

exports.verifyUser = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const user = await modelName.findById(userId);
        await modelName.findByIdAndUpdate(user._id, {
            verify: true
        },{
            new: true
        });
        res.status(200).json({
            message: "U have been verified.."
        })
    } catch (error) {
        res.status(400).json({
            message: err.message
        })
    }
}