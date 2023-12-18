import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
       // _id:{type: String, required:true},
        name:{type:String, required:true},
        email:{type:String, required:true, unique: true},
        password:{type:String, required:true},
        confirmPassword: {type:String, required:true},
        isAdmin:{type:Boolean, default:false, required:true},
    },
    {
        timestamps:true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;