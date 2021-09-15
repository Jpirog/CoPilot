const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
//    console.log('====++++', req.body)
//    res.send({ token: await User.authenticate(req.body)}); 
    const myData = await User.authenticate(req.body);  // added
//    console.log('====++++', myData)
    res.send( {token: myData.token, userId: myData.user.id}); // added second part
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken(), userId: user.id}); // added second part
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('This email is already registered. Please use a different email address or reset your password.')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
