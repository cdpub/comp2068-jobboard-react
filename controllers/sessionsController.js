const Employer = require('../models/employer');
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res) => {
  Employer.findOne({email: req.body.email})
    .then(employer => {
     if(!employer) throw new Error('ERROR: Your credentials do not match.')
      
        employer.authenticate(req.body.password, (err, isMatch) => {
          if (err) throw new Error(err);

          if (isMatch)  {
            req.session.userId = employer.id;

            const token = jwt.sign({payload: req.body.email}, "cdpub", {expiresIn: "1h"});

            res
              .cookie("token", token, {httpOnly: true})
              .status(201)
              .send({success: "Successful Authentication."});
          } else {
          res.status(401).json({error: "Your credentials do not match"});
        }
      });
    })
    .catch(err => {
      res.status(404).json(err);
    }
  );
};
 
exports.logout = (req, res) => {
  if (!req.isAuthenticated()) 
    res.status(404).send({error: "Could not authenticate request"});
  
  req.session.userId = null;
  res
    .clearCookie("token")
    .status(200)
    .send({success: "You are now Logged outt"});
};



      

