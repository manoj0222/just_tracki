const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRouter= require('./routes/Userroute'); 
const urlRouter =require("./routes/Urlroute");
const visiteduser = require("./routes/VisitedUsersroute")


const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.CONNECTION_STRING;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/users', userRouter); 
app.use("/dashboard",urlRouter);
app.use("/visitedusers",visiteduser);

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure code
  });
