const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');


mongoose
.connect(`${config.get('MONGODB_URI')}/scatch`)
.then(() => {
   dbgr('Connected to MongoDB');
})
.catch((err) => {
   dbgr('Error connecting to MongoDB:', err);
});

// we can export the connection object
module.exports = mongoose.connection;