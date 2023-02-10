const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
// Using asyncHandler instead of try catch for each error that can be returned in each method
const asyncHandler = require('../middleware/async');

// @desc    Get all bootcamps
// @route   GET to /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // returns a promise - like every mongoose method
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
    message: 'All bootcamps',
  });
});

// @desc    Get single bootcamp
// @route   GET to /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
    message: `Bootcamp ${req.params.id} found`,
  });
});

// @desc    Create new bootcamp
// @route   POST to /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // returns a promise - like every mongoose method
  const bootcamp = await Bootcamp.create(req.body);
  res
    .status(201)
    .json({ success: true, data: bootcamp, message: 'New bootcamp created' });
});

// @desc    Update bootcamp
// @route   PUT to /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
    message: `Updated bootcamp ${req.params.id}`,
  });
});

// @desc    Delete bootcamp
// @route   DELETE to /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
    message: `Deleted bootcamp ${req.params.id}`,
  });
});
