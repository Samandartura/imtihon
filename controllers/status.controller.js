const { request } = require("express");
const  pool  = require("../config/db");



const addstatus = async(req,res)=>{
  try {
    const {name,description} = req.body;
    const newstatus = await pool.query(
      `
      INSERT INTO status(name,description)
      values($1,$2) RETURNING *
      `,
      [name,description]
    );
    res.status(200).json(newstatus.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const updatestatus = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const {name,description} = req.body;
    const updatedstatus = await pool.query(
      `
      UPDATE status SET(name=$1,description=$2) WHERE id=$3 RETURNING *
      `,
      [name,description,params.id]
    );
    res.status(200).json(updatedstatus.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const getstatus = async(req,res)=>{  
  try {
    const Result = await pool.query(`SELECT * FROM status`)
    const result =Result.rows[0];
    return res.status(200).send(result);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const getstatusById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`SELECT * FROM status WHERE id = $1`,[params.id])
    const request = Result.rows[0];
    if(Result.rows.length==0){
      return res.status(400).send("Bunday status topilmadi")
    }
    return res.status(200).send(request);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const deletestatusById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`DELETE FROM status WHERE id = $1`,[params.id],(request,error)=>{
      if(error){
        return res.status(400).send("Bunday status topilmadi")
      }
      return res.status(200).send({MESSEGE:"status o'chirildi"});

    })
 
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}



module.exports={
  getstatus,
  getstatusById,
  addstatus,
  updatestatus,
  deletestatusById,

}