import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import connectDB from './db/connectDB.js'
import userRoute from './routes/user.route.js'
import restaurantRoute from './routes/restaurant.route.js'
import menuRoute from './routes/menu.route.js'
import orderRoute from './routes/order.route.js'
import path from 'path'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

const DIRNAME = path.resolve();

//default middleware
app.use(bodyParser.json({limit:'50mb'}))
app.use(express.urlencoded({extended : true , limit:'50mb'}))
app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//api
app.use('/api/v1/user', userRoute)
app.use('/api/v1/restaurant', restaurantRoute)
app.use('/api/v1/menu', menuRoute)
app.use('/api/v1/order', orderRoute)
    
app.use(express.static(path.join(DIRNAME,"/client/dist")));
app.use("*",(_,res) => {
    res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
});

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is listening on port ${PORT}`)
})

