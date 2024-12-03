import express from 'express';
import { connectDB } from './db_conection/connectDB.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'


dotenv.config();


const app = express();
const PORT= process.env.PORT || 4000;
app.use(express.json());



app.get('/', (req, res) => {
    console.log("  text for tesitng the request to http  ");
    res.send("Hello world its working for now and i want to be "); // Send a response to the client
});


app.use("/api/auth",authRoutes)
app.use("api/addordders",authRoutes)





app.listen(PORT, () => {
    connectDB()
    console.log(`"Server is listen to port ${PORT}`);
  });
  