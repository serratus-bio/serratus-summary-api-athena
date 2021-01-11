const express = require('express')
const router = express.Router()
const athena = require('../services/athena')

router.get('/:id', async (req, res, next) => {
  var scoreMin = req.query.scoreMin
  var scoreMax = req.query.scoreMax
  var identityMin = req.query.identityMin
  var identityMax = req.query.identityMax
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
