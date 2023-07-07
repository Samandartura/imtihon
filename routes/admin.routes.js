const {Router} = require("express");
const { getAdminById, deleteAdminById, addAdmin, updateAdmin, loginAdmin } = require("../controllers/admin.controller");


const router = Router();

router.get("/:id",getAdminById)
router.delete("/:id",deleteAdminById)
router.post("/new",addAdmin)
router.post("/login",loginAdmin)
router.put("/update/:id",updateAdmin)

module.exports=router
