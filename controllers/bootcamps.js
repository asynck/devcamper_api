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
// @access  Public
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Create new bootcamp' });
};

// @desc    Update bootcamp
// @route   PUT to /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
};

// @desc    Delete bootcamp
// @route   DELETE to /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
