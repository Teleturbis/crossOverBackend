const express = require('express');
const router = express.Router();

const DataParser = require('../classes/DataParser');

router.get('/:search', (req, res) => {
  DataParser.getData(req.params.search).then((response) => res.send(response));
});

module.exports = router;
