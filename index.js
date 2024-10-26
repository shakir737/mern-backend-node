const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const https = require("https");
const compression = require("compression");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 4000;
const httpsPort = 4001;
const key = fs.readFileSync("./keys/private.key");
const certificate = fs.readFileSync("./keys/certificate.crt");
const credentials = {
  key,
  certificate,
};
const server = https.createServer(app);
const httpsServer = https.createServer(credentials, app);

const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const StatesRouter = require("./routes/statesRoute");
const CitiesRouter = require("./routes/citiesRoute");
const CountriesRouter = require("./routes/countriesRoute");
const productcategoryRouter = require("./routes/prodcategoryRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const orderRouter = require("./routes/orderRoute");
const uploadRouter = require("./routes/uploadRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { authMiddleware } = require("./middlewares/authMiddleware");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
cloudinary.config({
  cloud_name: "ds89lej3j",
  api_key: "377267562544887",
  api_secret: "2ajdov-hm1YUh2R5EypgM2Jf1_Y",
});
const whitelist = [
  "https://main.d1bygvczrsspbr.amplifyapp.com",
  "https://main.d1bygvczrsspbr.amplifyapp.com/",
  "http://localhost:3000/",
];
// app.options(cors());
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log(true);
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
dbConnect();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  compression({
    level: 6,
    threshold: 0,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});
app.use(
  "/.well-known/pki-validation/7D4CFBD31F87F804D883F6644403CCB2.txt",
  (req, res) => {
    res.sendFile(
      "/root/mern-backend-node/7D4CFBD31F87F804D883F6644403CCB2.txt"
    );
  }
);
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/category", productcategoryRouter);
app.use("/api/States", StatesRouter);
app.use("/api/Countries", CountriesRouter);
app.use("/api/Cities", CitiesRouter);
app.use("/api/orders", orderRouter);
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  // console.log(amount);

  // Create a PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
httpsServer.listen(httpsPort, () => {
  console.log(`https server is running on PORT ${httpsPort}`);
});
