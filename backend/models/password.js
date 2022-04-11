const passwordValidator  = require('password-validator');

const passSchema = new passwordValidator ();

passSchema
  .is().min(8)
  .is().max(15)
  .has().uppercase(1)
  .has().lowercase(1)
  .has().digits(1)
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = passSchema;