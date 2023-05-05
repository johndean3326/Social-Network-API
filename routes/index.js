const router = require('express').Router();
// const users = require('./userRoutes');
// const thoughts = require('./thoughtRoutes');

// router.use('/users', users);
// router.use('/thoughts', thoughtRoutes);

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;