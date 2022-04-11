require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_PASSWORD;

module.exports= (req,res,next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        const decodedToken = jwt.verify(token, jwtPassword);        
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          throw 'Invalid user ID';
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }

}
