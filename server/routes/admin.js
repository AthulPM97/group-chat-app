const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/make-admin', adminController.postMakeAdmin);

router.post('/delete-member', adminController.postDeleteMember);

module.exports = router;