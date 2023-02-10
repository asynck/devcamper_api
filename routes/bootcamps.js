const express = require('express');
const router = express.Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;

// THIS IS THE WAY TO DO IT WITHOUT CONTROLLERS

// the first parameter is the route ie where the front end will need to make the request from to get/post/.. data
// router.get('/', (req, res) => {
//   //   res.send('Hello from Express');
//   //   res.json({ name: 'Kelly' });
//   //   res.status(400).json({ success: false });
//   res.status(200).json({ success: true, message: 'Show all bootcamps' });
// });

// router.get('/:id', (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, message: `Show bootcamp ${req.params.id}` });
// });

// router.post('/', (req, res) => {
//   res.status(200).json({ success: true, message: 'Create new bootcamp' });
// });

// router.put('/:id', (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, message: `Update bootcamp ${req.params.id}` });
// });

// router.delete('/:id', (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
// });

// module.exports = router;
