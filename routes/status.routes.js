const {Router} = require("express");
const { getstatus, getstatusById, deletestatusById, addstatus, updatestatus } = require("../controllers/status.controller");


const router = Router();

router.get("/",getstatus)
router.get("/:id",getstatusById)
router.delete("/:id",deletestatusById)
router.post("/new",addstatus)
router.put("/update/:id",updatestatus)

module.exports=router
