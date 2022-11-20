"use strict";
const express = require('express');
const router = express.Router();
const Message = require('../controllers/message.js');
router.get('/', Message.getAllMessages);
router.post('/', Message.addNewMessage);
module.exports = router;
//# sourceMappingURL=message_route.js.map