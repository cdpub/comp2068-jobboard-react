const Employer = require('../models/employer');

exports.create = (req, res) => {
  Employer.create(req.body.employer)
  .then(() => res.status(200).send({success: "Employer Registration Successful."}))
  .catch(err => res.status(404).send(err));
};

