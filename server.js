const app = require("./src/app")
const connectDb = require("./src/config/database");
const http = require("http");
const initializeSocket = require("./src/utils/socket");

const server = http.createServer(app);
initializeSocket(server);

connectDb().then(() => {
  console.log("Database connection successful");

  require("./src/jobs/autoResolveLostAndFound");

  server.listen(process.env.PORT, () => {
    console.log("Server Started Successfully");
  })
}
).catch(err => {
  console.log(err)
});