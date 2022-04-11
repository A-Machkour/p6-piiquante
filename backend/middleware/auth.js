require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_PASSWORD;

module.exports= (req,res,next) => {
    try {
        // Récupération du token d'authentification
        const token = req.header("Authorization").split(" ")[1];
        const decodedToken = jwt.verify(token, jwtPassword); 
        // Récupération du userId encodé dans le token       
        const userId = decodedToken.userId;
        // Comparaison du userId de la requête et celui du token
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
