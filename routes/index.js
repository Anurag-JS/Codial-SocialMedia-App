const express = require('express');

const router = express.Router();
console.log('Router Loaded Successfully');

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);

router.use('/users', require('./users'));


router.use('/posts', require('./posts'));





// Exporting router so we can use it outside this file
module.exports= router;