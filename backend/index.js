import express from 'express';
import { connectDB } from './db_conection/connectDB.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'


dotenv.config();


const app = express();

app.get('/', (req, res) => {
    console.log("Hello world");
    res.send("Hello world"); // Send a response to the client
});



app.use("/api/auth",authRoutes)


app.listen(4000, () => {
    connectDB()
    console.log("Server is listen to port 4000!");
  });
  