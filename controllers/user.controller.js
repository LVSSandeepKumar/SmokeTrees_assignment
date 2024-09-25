import mongoose from "mongoose";

import User from "../models/user.model.js";
import Address from "../models/address.model.js";

//Function to create a new user
export const createUser = async(req,res) => {
    try {
        //Check if user has entered all credentials and read them from req body
        const {username, address} = req.body;
        if(!username || !address) {
            res.status(400).json({ message: "Please fill both fields" });
        }
        // Define the regex pattern for lowercase letters, optional single '.' or '_' between letters        
        const usernameRegex = /^[a-z]+([._]?[a-z]+)*$/;
        if(!usernameRegex.test(username)) {
            res.status(400).json({ message: "Username shall contain only lowercase letters and optional '.', '_' in between" });
        }
        //Check if the user exists and if not create new user
        const user = await User.findOne({username});
        if(!user) {
            //Use mongoose transactions method to ensure both operations are atomic
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                //Create new user
                const newUser = await User.create([{
                    username: username
                }], {session});
                //Create new address
                const newAddress = await Address.create([{
                    user: newUser[0]._id,
                    address: address
                }], {session});
                //Push the new address to user's adresses array and save
                newUser[0].addresses.push(newAddress[0]._id);
                await newUser[0].save({session});
                //Commit transaction and end session
                await session.commitTransaction();
                session.endSession();
                //Respond to client with newly created documents
                res.status(201).json({ newUser: newUser[0], newAddress: newAddress[0]})
            } catch (error) {
                //Abort Transaction in case of error
                await session.abortTransaction();
                session.endSession();
                //Throw the error so that we can catch it in outside catch block
                throw error;
            }
        }
        //If there is a user already, create new address and associate it to that user
        const newAddress = new Address({
            user: user._id,
            address: address 
        });
        //Push the address id to addresses array and save both user and address
        user.addresses.push(newAddress._id);
        await user.save();
        await newAddress.save();
        //Respond to client with user and address documents
        res.status(201).json({user, newAddress});
    } catch (error) {
        //Error Handling
        console.log("Error in createUser controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}