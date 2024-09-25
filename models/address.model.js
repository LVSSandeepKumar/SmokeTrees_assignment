import mongoose from "mongoose";

//Address Schema
const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: String,
        required: true
    }
});

//Address Model
const Address = mongoose.model("Address", addressSchema);

export default Address;