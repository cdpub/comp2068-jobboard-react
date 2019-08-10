const Job = require('../models/job');

exports.index = (req, res) => {
  Job.find()
    .populate("company")
    .then(jobs => res.json(jobs))
    .catch(err => res.status(404).json(err));
};

exports.show = (req, res) => {
  Job.findOne({
      _id: req.params.id,
    })
    .populate("company")
    .then(job => res.json(job))
    .catch(err => res.status(404).json(err));
};

exports.create = async (req, res) => {
	if(!req.isAuthenticated())
    return res.status(401).send({error: "Not authenticated"});

  //add employer(company) to the job   
  req.body.job.company = req.session.userId;

  Job.create(req.body.job)
    .then(() => res.status(200).send({success: "New Job Created."}))
    .catch(err => res.status(404).send(err));
};

exports.edit = (req, res) => {
  if(!req.isAuthenticated())
    return res.status(401).send({error: "Not authenticated"});

  Job.findOne({
      _id: req.params.id,
      employer: req.session.userId
    })
    .then(job => res.send(job))
    .catch(err => res.status(404).send(err));
};

exports.update = (req, res) => {
  if(!req.isAuthenticated())
    return res.status(401).send({error: "Not authenticated"});

  Job.updateOne({
      _id: req.body.id,
      employer: req.session.userId
    }, req.body.job, {
      runValidators: true
    })
    .then(() => res.status(200).send({success: "Job Update Successful."}))
    .catch(err => res.status(404).send(err));
};

exports.destroy = (req, res) => {
  if(!req.isAuthenticated())
  return res.status(401).send({error: "Not authenticated"});


  Job.deleteOne({
      _id: req.body.id,
      employer: req.session.userId
    })
    .then(() => res.status(200).send({success: "Job Delete Successful."}))
    .catch(err => res.status(404).send(err));
}