const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(
      "mongodb+srv://shakirraza737:Anilla621@ecomerse.fxjt0iy.mongodb.net/MERNEcomerse?retryWrites=true&w=majority&appName=Ecomerse"
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
