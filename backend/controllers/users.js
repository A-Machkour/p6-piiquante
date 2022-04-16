const userDb = require("../models/userdb");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign up
exports.userToDatabase=(req, res)=> {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new userDb({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(err => res.status(400).json({ message: "error" + err  }));
    })
    .catch(err => res.status(500).json({ message: "error" + err  }));
}

// Login
exports.userLogin=(req, res)=> {


    userDb.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          const jwtPassword = process.env.JWT_PASSWORD;
          res.status(200).json({
            
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                jwtPassword,
                { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error}));
}


