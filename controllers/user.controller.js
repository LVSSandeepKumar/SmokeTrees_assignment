export const createUser = async(req,res) => {
    try {
        
    } catch (error) {
        //Error Handling
        console.log("Error in createUser controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}