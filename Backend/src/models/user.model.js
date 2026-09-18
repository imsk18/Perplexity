import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        minlength: 3,
        maxlength: 30,
        trim:true


    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false

    },
    isVerified: {
    type: Boolean,
    default: false
    },

},
{timestamps:true}
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("User",userSchema);
export default userModel