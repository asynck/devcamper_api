const ErrorResponse = require('../utils/errorResponse');
const geoCoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');
// Using asyncHandler instead of try catch for each error that can be returned in each method
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc    Get all bootcamps
// @route   GET to /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // req.query looks at the filter parameters that are coming in the url - we are using stringify to be able to manipulate it
  let queryStr = JSON.stringify(req.query);

  // greater | greater or equal | less than etc | in looks in a list/array - all these are part of mongo
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (result) => {
    return `$${result}`;
  });
  // make it a JSON again
  query = Bootcamp.find(JSON.parse(queryStr));

  const bootcamps = await query;
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
  // returns a promise - like every mongoose method
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

// @desc    Get bootcamps within a radius
// @route   GET to /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  // Get zipcode and distance from that zipcode, from the url params
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by earth radius
  // Earth radius = 3,963 miles
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
    message: `All bootcamps within radius`,
  });
});
