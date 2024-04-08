import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import productsRouter from './routes/products.js';
import errorHandler from './middleware/error-handler.js';
import notFoundHandler from './middleware/not-found.js';
// import Product from './models/product.js'

// Initialization
const app = express();
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/products">products route</a>')
})



app.use('/api/products', productsRouter);




app.use(errorHandler);
app.use(notFoundHandler)




app.listen(3000, () => {
  console.log('server started');
})
// Connecting to the database
mongoose.connect(process.env['MONGO_URI'])
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })
