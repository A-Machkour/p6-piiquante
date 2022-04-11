require('dotenv').config();
const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const jwtPassword = process.env.JWT_PASSWORD;

module.exports = (req, res, next) => {
    Product.findOne({ _id: req.params.id})
        .then(sauce => {
            // Récupération du token d'authentification
            const token = req.header("Authorization").split(" ")[1];
            const decodedToken = jwt.verify(token, jwtPassword); 
            // Récupération du userId encodé dans le token       
            const userId = decodedToken.userId;
            // Comparaison du userId de la requête et celui du token
            if (sauce.userId && sauce.userId !== userId) {
            throw 'Invalid user ID';
            } else {
            next();
            }      
            
        })
        .catch(error => {
            res.status(401).json({ error })
        });
} 