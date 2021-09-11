const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

// following is used by the authentication and register code and should not be changed if possible
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'name']
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

// the below are APIs for CoPilot
router.get("/:id", async (req, res, next) => {
  const id = req.params.id * 1;
  try {
    const user = await User.findByPk(id, {
      attributes: {exclude: ['password']},
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  const id = req.body.id * 1;
  try {
    const user = await User.update(req.body, { where: { id: id } });
    res.json(user);
  } catch (err) {
    next(err);
  }
});