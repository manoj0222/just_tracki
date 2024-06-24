const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


const start = async () => {
    try {
        await mongoose.connect(connectionString,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        app.listen(port, () => console.log("Server started on port " + port)); // Corrected port variable
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();


