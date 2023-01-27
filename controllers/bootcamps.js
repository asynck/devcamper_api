const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET to /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, data: bootcamps, message: 'All bootcamps' });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single bootcamp
// @route   GET to /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
      message: `Bootcamp ${req.params.id} found`,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new bootcamp
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
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
      message: `Updated bootcamp ${req.params.id}`,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete bootcamp
// @route   DELETE to /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
      message: `Deleted bootcamp ${req.params.id}`,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
