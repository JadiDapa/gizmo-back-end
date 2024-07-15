import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Route Imports
import AccountRouter from './routes/route.account';
import ProductRouter from './routes/route.product';
import CategoryRouter from './routes/route.category';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

// Base Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/images', express.static('images'));

// Routes
app.use('/api', AccountRouter);
app.use('/api', ProductRouter);
app.use('/api', CategoryRouter);

// App Port Listener
app.listen(port, () => {
  console.log('Server Activated');
  console.log(`http://localhost:${port}`);
});
