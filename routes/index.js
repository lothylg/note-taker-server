const router = require('express').Router();
// const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// Import our modular routers for /tips and /feedback
const homeRouter = require('./api/homeRoute');
const noteRouter = require('./api/noteRoutes');
// const diagnosticsRouter = require('./diagnostics') // TODO: import your diagnostics route


router.use('/notes', noteRouter);
router.use('/', homeRouter);
// router.use('/diagnostics', diagnosticsRouter) // TODO: Initialize diagnostics route


module.exports = router;
