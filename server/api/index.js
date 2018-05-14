const router = require('express').Router();
const todosRouter = require('./todos');
const authRouter = require('./auth');

router.use('/todos', todosRouter);
router.use('/auth', authRouter);

module.exports = router;
