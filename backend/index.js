import express from 'express';
import { connectDB } from './db_conection/connectDB.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'


dotenv.config();


const app = express();
const PORT= process.env.PORT || 4000;
// middleware for parsing json data in incoming requests    
app.use(express.json()); // allow us to parse inocoming requsert: req.body.json


app.get('/', (req, res) => {
    console.log("Hello world");
    res.send("Hello world"); // Send a response to the client
});






app.use("/api/auth",authRoutes)






app.listen(PORT, () => {
    connectDB()
    console.log(`"Server is listen to port ${PORT}`);
  });
  