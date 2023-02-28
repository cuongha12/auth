import express from 'express';
import connect from './config/connect';
import bodyParser from 'body-parser';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import authRouter from './routes/auth';
import cookieParser from 'cookie-parser';
import cors from 'cors'
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'));
connect()
productRouter(app)
categoryRouter(app)
authRouter(app)
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})