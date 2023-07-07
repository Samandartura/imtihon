const { request } = require("express");
const  pool  = require("../config/db");



const addcurrency_type = async(req,res)=>{
  try {
    const {name,description} = req.body;
    const newcurrency_type = await pool.query(
      `
      INSERT INTO currency_type(name,description)
      values($1,$2) RETURNING *
      `,
      [name,description]
    );
    res.status(200).json(newcurrency_type.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const updatecurrency_type = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const {name,description} = req.body;
    const updatedcurrency_type = await pool.query(
      `
      UPDATE currency_type SET(name=$1,description=$2) WHERE id=$3 RETURNING *
      `,
      [name,description,params.id]
    );
    res.status(200).json(updatedcurrency_type.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const getcurrency_types = async(req,res)=>{  
  try {
    const Result = await pool.query(`SELECT * FROM currency_type`)
    const result =Result.rows[0];
    return res.status(200).send(result);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const getcurrency_typeById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`SELECT * FROM currency_type WHERE id = $1`,[params.id])
    const request = Result.rows[0];
    if(Result.rows.length==0){
      return res.status(400).send("Bunday currency_type topilmadi")
    }
    return res.status(200).send(request);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const deletecurrency_typeById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`DELETE FROM currency_type WHERE id = $1`,[params.id],(request,error)=>{
      if(error){
        return res.status(400).send("Bunday currency_type topilmadi")
      }
      return res.status(200).send({MESSEGE:"currency_type o'chirildi"});

    })
 
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}



module.exports={
  getcurrency_types,
  getcurrency_typeById,
  addcurrency_type,
  updatecurrency_type,
  deletecurrency_typeById,

}