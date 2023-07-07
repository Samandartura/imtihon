const {Router} = require("express");
const { getcurrency_types, deletecurrency_typeById, addcurrency_type, updatecurrency_type, getcurrency_typeById } = require("../controllers/currency_type.controller");


const router = Router();

router.get("/",getcurrency_types)
router.get("/:id",getcurrency_typeById)
router.delete("/:id",deletecurrency_typeById)
router.post("/new",addcurrency_type)
router.put("/update/:id",updatecurrency_type)

module.exports=router
