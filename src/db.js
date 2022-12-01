const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser : true}, (err) => {
   if(err) return console.log(err.message);
    console.log("Connect DB Success"); 
}); 