const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    
  
  name:{type:string,
    required:true
  },
    email: {type:string,
    required:true
  },
  phone:{ type:Number,
    
  } ,
  password:  {type:string,
    required:true
  },
  role:  {type:String,
    enaum:['user', 'shelter-user','admin'],
    default:'user'
  },         
  address:  {type:string,

  },
  pet_owner: {type:string,
    enaum:['Yes', 'No'],
  },

},{timestamps:true})

const User=mongoose.model("user",userSchema)
module.exports=User;