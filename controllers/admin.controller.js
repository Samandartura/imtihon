const bcrypt = require("bcrypt");
const { errorHandler } = require("../helpers/error_handler");
const { adminValidation } = require("../validations/admin.validation");
const jwt = require("jsonwebtoken");
const config = require("config");
const myJwt = require("../services/JwtService");
const { request } = require("express");
const  pool  = require("../config/db");

const generateAccessToken = (id, is_active, is_creator) => {
    const payload = {
        id,
        is_active,
        is_creator,
    };
    return jwt.sign(payload, config.get("secret"), { expiresIn: "1h" });
};



const addAdmin = async(req,res)=>{
  try {
    const {full_name,user_name,phone_number,email,tg_link,description} = req.body;
    const newAdmin = await pool.query(
      `
      INSERT INTO admin(full_name,user_name,phone_number,email,tg_link,description)
      values($1,$2,$3,$4,$5,$6) RETURNING *
      `,
      [full_name,user_name,phone_number,email,tg_link,description]
    );
    res.status(200).json(newAdmin.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const updateAdmin = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const {full_name,user_name,phone_number,email,tg_link,description} = req.body;
    const updatedAdmin = await pool.query(
      `
      UPDATE admin SET(full_name=$1,user_name=$2,phone_number=$3,email=$4,tg_link=$5,description=$6) WHERE id=$7 RETURNING *
      `,
      [full_name,user_name,phone_number,email,tg_link,description,params.id]
    );
    res.status(200).json(updatedAdmin.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    console.log(error);
  }
}

const getAdmins = async(req,res)=>{  
  try {
    const Result = await pool.query(`SELECT * FROM admin`)
    const result =JSON(Result).stringify;
    return res.status(200).send(result);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const getAdminById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`SELECT * FROM admin WHERE id = $1`,[params.id])
    const request = Result.rows[0];
    if(Result.rows.length==0){
      return res.status(400).send("Bunday admin topilmadi")
    }
    return res.status(200).send(request);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const deleteAdminById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`DELETE FROM admin WHERE id = $1`,[params.id],(request,error)=>{
      if(error){
        return res.status(400).send("Bunday admin topilmadi")
      }
      return res.status(200).send({MESSEGE:"admin o'chirildi"});

    })
 
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Result = await pool.query(`SELECT * FROM admin WHERE email = $1`,[email],(request,error)=>{
      if (error){
        res.status(404).send({message:"email xato"})
      }
      
    })
    
  } catch (error) {
    errorHandler(res, error);
    console.log(error);
  }
};


module.exports={
  getAdmins,
  getAdminById,
  addAdmin,
  updateAdmin,
  deleteAdminById,
  loginAdmin
}