const admin = require("firebase-admin");

class Middleware {
    async decodeToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            console.log(decodedToken);
            
            if (decodedToken) {
                return next();
            }

            return res.status(401).json({ message: "Unauthorized" });
        } catch (error) {
            return res.status(500).json({ message: "Internal error" });
        }
    }
}

module.exports = new Middleware();
