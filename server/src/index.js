import connectDB from "./db/index.js";

connectDB()
  .then((res) => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Your server is Listening to PORT", `${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed !!");
  });
