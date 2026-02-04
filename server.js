const app = require("./src/app")
const connectDb = require("./src/config/database");



connectDb().then(() => {
  console.log("Database connection successful");

  require("./src/jobs/autoResolveLostAndFound");

  app.listen(process.env.PORT, () => {
    console.log("Server Started Successfully");
  })
}
).catch(err => {
  console.log(err)
});