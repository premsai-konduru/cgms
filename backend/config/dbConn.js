const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI,
            // The below are deprecated in the newer versions as they are included in the database_uri itself
            // {
            //     useUnifiedTopology: true,
            //     useNewUrlParser: true
            // }
        );
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;