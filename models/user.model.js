import mongoose from "mongoose";

//User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        }
    ]
});

//User Model
const User = mongoose.model("User", userSchema);

export default User;