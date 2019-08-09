//import express library and assign module to app
const express = require(`express`);         
const app = express();     

//import routes
const jobRoutes = require(`./routes/jobs`);
const employersRoutes = require(`./routes/employers`);
const sessionsRoutes = require(`./routes/sessions`);

//register routes
app.use(`/jobs`, jobRoutes);
app.use(`/employers`, employersRoutes);
app.use(`/`, sessionsRoutes);

//export changes to app
module.exports = app;