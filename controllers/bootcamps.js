const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET to /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Show all bootcamps' });
};

// @desc    Get single bootcamp
// @route   GET to /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Show bootcamp ${req.params.id}` });
};

// @desc    Create single bootcamp
// @route   POST to /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    // returns a promise - like every mongoose method
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(201)
      .json({ success: true, data: bootcamp, message: 'New bootcamp created' });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update bootcamp
// @route   PUT to /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
};

// @desc    Delete bootcamp
// @route   DELETE to /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
