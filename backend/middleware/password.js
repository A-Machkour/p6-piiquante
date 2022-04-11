const passSchema = require('../models/password');

module.exports = (req, res, next) => {
  if (passSchema.validate(req.body.password)) {
    next();
  } else {
    res.status(400).json({
      error:
        'Votre mot de passe doit faire entre 8 et 15 caractères et contenir au moins une minuscule,majuscule et un chiffre',
    });
  }
};