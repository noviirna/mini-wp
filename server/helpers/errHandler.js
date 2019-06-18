module.exports = function(err, req, res, next) {
  console.log(JSON.stringify(err, null, 4));
  console.log(err)
  if (err.code) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: `"internal server error ${err.name}"` });
  }
};