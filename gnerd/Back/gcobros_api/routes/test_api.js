const { Router } = require('express');
const router = Router();
const { getTestConnection } =  require('../controllers/test_api_controller.js');

router.get('/', getTestConnection);

module.exports = router;