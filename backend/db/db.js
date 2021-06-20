const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Conection with MongoDB: ON");
  } catch (error) {
    console.log("Error Connecting to MongoDB: ", error);
    process.exit(0);
  }
};

module.exports = { dbConnection };
