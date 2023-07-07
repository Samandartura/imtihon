const { request } = require("express");
const  pool  = require("../config/db");



const addorder = async(req,res)=>{
  try {
    const {order_unique_id,full_name,phone_number,product_link,summa,current_type_id,truck,email,description} = req.body;
    const neworder = await pool.query(
      `
      INSERT INTO order(order_unique_id,full_name,phone_number,product_link,summa,current_type_id,truck,email,description)
      values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
      `,
      [order_unique_id,full_name,phone_number,product_link,summa,current_type_id,truck,email,description]
    );
    res.status(200).json(neworder.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const updateorder = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const {order_unique_id,full_name,phone_number,product_link,summa,current_type_id,truck,email,description} = req.body;
    const updatedorder = await pool.query(
      `
      UPDATE order SET(order_unique_id=$1,full_name=$2,phone_number=$3,product_link=$4,summa=$5,current_type_id=$6,truck=$7,email=$8,description=$9) WHERE id=$10 RETURNING *
      `,
      [order_unique_id,full_name,phone_number,product_link,summa,current_type_id,truck,email,description,params.id]
    );
    res.status(200).json(updatedorder.rows[0])
    
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
  }
}

const getorder = async(req,res)=>{  
  try {
    const Result = await pool.query(`SELECT * FROM order`)
    const result =Result.rows[0];
    return res.status(200).send(result);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    console.log(error);
    
  }
}

const getorderById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`SELECT * FROM order WHERE id = $1`,[params.id])
    const request = Result.rows[0];
    if(Result.rows.length==0){
      return res.status(400).send("Bunday order topilmadi")
    }
    return res.status(200).send(request);

  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}

const deleteorderById = async(req,res)=>{
  try {
    let params={id: req.params.id}
    const Result = await pool.query(`DELETE FROM order WHERE id = $1`,[params.id],(request,error)=>{
      if(error){
        return res.status(400).send("Bunday order topilmadi")
      }
      return res.status(200).send({MESSEGE:"order o'chirildi"});

    })
 
  } catch (error) {
    res.status(500).json(`Serverda xatolig ${error}`)
    
  }
}



module.exports={
  getorder,
  getorderById,
  addorder,
  updateorder,
  deleteorderById,

}