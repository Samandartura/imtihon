const express=require("express");
const config = require("config");
const app= express();
const mainRouter = require("./routes/index.routes")


const PORT = config.get("port") || 3030
app.use(express.json())
app.use("/api",mainRouter)


async function start(){
  try {
    app.listen(PORT, ()=>{
      console.log(`Server ${PORT} da ishga tushdi`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()
