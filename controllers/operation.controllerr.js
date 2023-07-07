const { request } = require("express");
const  pool  = require("../config/db");



const addoperation = async(req,res)=>{
  try {
    const {order_id,status_id,operation_date,admin_id,description} = req.body;
    const newcurrency_type = await pool.query(
      `
      INSERT INTO operation(order_id,status_id,operation_date,admin_id,description)
      values($1,$2,$3,$4,$5) RETURNING *
      `,
      [order_id,status_id,operation_date,admin_id,description]
    );
    res.status(200).json(newcurrency_type.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const updateoperation = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const {order_id,status_id,operation_date,admin_id,description} = req.body;
    const updatedoperation = await pool.query(
      `
      UPDATE operation SET(order_id=$1,status_id=$2,operation_date=$3,admin_id=$4,description=$5) WHERE id=$6 RETURNING *
      `,
      [order_id,status_id,operation_date,admin_id,description,params.id]
    );
    res.status(200).json(updatedoperation.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const getoperations = async(req,res)=>{  
  try {
    const Result = await pool.query(`SELECT * FROM operation`)
    const result =Result.rows[0];
    return res.status(200).send(result);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const getoperationById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`SELECT * FROM operation WHERE id = $1`,[params.id])
    const request = Result.rows[0];
    if(Result.rows.length==0){
      return res.status(400).send("Bunday operation topilmadi")
    }
    return res.status(200).send(request);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const deleteoperationById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`DELETE FROM operation WHERE id = $1`,[params.id],(request,error)=>{
      if(error){
        return res.status(400).send("Bunday operation topilmadi")
      }
      return res.status(200).send({MESSEGE:"operation o'chirildi"});

    })
 
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}



module.exports={
  getoperations,
  getoperationById,
  addoperation,
  updateoperation,
  deleteoperationById,

}