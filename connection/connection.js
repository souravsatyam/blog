const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogger', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
