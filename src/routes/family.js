const express = require('express')
const router = express.Router()
const athena = require('../services/athena')

router.get('/:id', async (req, res, next) => {
  var scoreMin = req.query.scoreMin || 0
  var scoreMax = req.query.scoreMax || 100
  var identityMin = req.query.identityMin || 0
  var identityMax = req.query.identityMax || 100
  try {
    var result = await athena.queryFamily(req.params.id, scoreMin, scoreMax, identityMin, identityMax)
    console.log(result)
    res.send(result['Items'])
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
