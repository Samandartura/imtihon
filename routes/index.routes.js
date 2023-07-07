const {Router} = require("express");
const adminRouter = require("./admin.routes");
const curency_typeRouter = require("./currency_type.routes");
const operationRouter = require("./operation.routes");
const orderRouter = require("./order.routes");
const statusRouter = require("./status.routes")

const router = Router();


router.use("/admin",adminRouter);
router.use("/currency_type",curency_typeRouter);
router.use("/operation",operationRouter);
router.use("/order",orderRouter);
router.use("/status",statusRouter);


module.exports=router
