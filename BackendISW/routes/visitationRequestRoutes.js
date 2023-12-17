const express = require('express');
const router = express.Router();
const visitationRequestController = require('../visitationRequestController');

router.post('/create', visitationRequestController.createVisitationRequest);
router.get('/all', visitationRequestController.getAllVisitationRequests);
router.put('/update-state', visitationRequestController.updateVisitationRequestState);

module.exports = router;
