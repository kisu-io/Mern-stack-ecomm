const app = require("./app");
const connectDatabase = require("./config/database");
require("dotenv").config({ path: "backend/config/config.env" });

// Handling Uncaught Exceptions
process.on("uncaughtExceptions", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled promise rejection`);
  process.exit(1);
});

// Connect to databases
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejction", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
