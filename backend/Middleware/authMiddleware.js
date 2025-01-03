import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ensureAuthenticate = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
        return res.status(403).json({
            message: "Unauthorized, JWT token is required"
        });
    }

    const token = authHeader.split(" ")[1]; 

    console.log("token",token);
    console.log("token from env",process.env.SECRET_ID)
    
    if (!token) {
        return res.status(403).json({
            message: "Unauthorized, JWT token is required"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_ID);
        req.user = decoded;  
        next();
    } catch (err) {
        res.status(403).json({
            message: "Invalid JWT token"
        });
    }
};

export default ensureAuthenticate;
