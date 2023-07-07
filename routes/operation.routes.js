const {Router} = require("express");
const { getoperations, getoperationById, deleteoperationById, addoperation, updateoperation } = require("../controllers/operation.controllerr");


const router = Router();

router.get("/",getoperations)
router.get("/:id",getoperationById)
router.delete("/:id",deleteoperationById)
router.post("/new",addoperation)
router.put("/update/:id",updateoperation)

module.exports=router
