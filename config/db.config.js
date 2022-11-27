if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

module.exports ={
    DB_SOURSE : process.env.DB_SOURSE 
}