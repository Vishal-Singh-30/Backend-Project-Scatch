const mongoose = require('mongoose');

mongoose
.connect('mongodb://localhost:27017/scatch')
.then(() => {
   console.log('Connected to MongoDB');
})
.catch((err) => {
   console.log('Error connecting to MongoDB:', err);
});

// we can export the connection object
module.exports = mongoose.connection;