var rk = require('required-keys');
var createViews = require('./lib/createViews');

module.exports = {
  getProfile: getProfile,
  createViews: createViews
};

function getProfile(data, cb) {
  var findUserProfile = data.findUserProfile || require('./lib/findUserProfile');
  var createUserProfile = data.createUserProfile || require('./lib/createUserProfile');
  var keys = ['db', 'email'];
  var err = rk.truthySync(data, keys);
  if (err) { return cb(err); }
  findUserProfile(data, function (err, reply) {
    if (err) { return cb(err); }
    if (reply) { return reply(); }
    createUserProfile(data, cb);
  });
};
