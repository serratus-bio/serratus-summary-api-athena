const express = require('express')
const router = express.Router()
const athena = require('../services/athena')

router.get('/:id', (req, res) => {
  var scoreMin = req.query.scoreMin
  var scoreMax = req.query.scoreMax
  var identityMin = req.query.identityMin
  var identityMax = req.query.identityMax
  var results = athena.queryFamily(req.params.id, scoreMin, scoreMax, identityMin, identityMax)
  results.then((result) => {
      console.log(result['Items'])
      return res.status(200).json(result['Items']);
  })
})

module.exports = router
