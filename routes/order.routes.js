const {Router} = require("express");
const { getorder, getorderById, deleteorderById, addorder, updateorder } = require("../controllers/order.controller");


const router = Router();

router.get("/",getorder)
router.get("/:id",getorderById)
router.delete("/:id",deleteorderById)
router.post("/new",addorder)
router.put("/update/:id",updateorder)

module.exports=router
