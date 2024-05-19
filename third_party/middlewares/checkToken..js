// Assuming you have some User model
const { where } = require("sequelize");
const db = require("../models/index");

const checkTokenMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ error: "Unauthorized: Missing or invalid token" });
    }

    const extractedToken = token.split(" ")[1];

    const decodedToken = Buffer.from(extractedToken, "base64").toString("utf-8");

    req.decodedToken = decodedToken;

    try {
        const userName = decodedToken;

        const user = await db.User.findOne({ where: { name: userName } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = checkTokenMiddleware;
