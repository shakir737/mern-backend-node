module.exports = {
  apps: [
    {
      name: "mern-ecomerse-backend",
      script: "npm",
      args: "run start",
      env: {
        PORT: 4000,
        MONGO_DB_URL:
          "mongodb+srv://shakirraza737:Anilla621@ecomerse.fxjt0iy.mongodb.net/MERNEcomerse?retryWrites=true&w=majority&appName=Ecomerse",
        JWT_SECRET: "mysecret",
        MAIL_ID: "shakirraza737@gmail.com",
        MP: "xhqpssnrcairvago",
        cloud_name: "ds89lej3j",
        api_key: "377267562544887",
        api_secret: "2ajdov-hm1YUh2R5EypgM2Jf1_Y",
        PAYMENT_SECRET_KEY:
          "sk_test_51OsgHYRxvBLvZ1fRhA2hMAHnMi2pdj15wglniIdAckxAIncTUBWAG5J2qrgsd6VqBny5equTTeksWKDbTZWHKjng00A2xZlM2g",
      },
    },
  ],
};
