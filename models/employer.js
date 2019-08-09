const mongoose = require(`mongoose`);
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const EmployerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },  
    company: {
      type: String,
      required: true
    },
  }, 
  {
    timestamps: true        
  }
);

EmployerSchema.virtual(`passwordConfirmation`)
  .get(() => this.passwordConfirmation)
  .set(value => this.passwordConfirmation = value);

EmployerSchema.pre('save', function (next) {
  const employer = this;

  if (!employer.isModified('password')) return next();
  if (employer.password !== employer.passwordConfirmation) 
    throw new Error('Your password do not match.');

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(employer.password, salt, (err, hash) => {
      if (err) return next(err);

      employer.password = hash;
      next();
    });
  });
});  

EmployerSchema.methods.authenticate = function(plainPassword, callback) {

  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};


module.exports = mongoose.model('Employer', EmployerSchema);
