const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/transactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  sold: Boolean,
  dateOfSale: String,
});
const Product = mongoose.model('Product', productSchema);


const app = express();


app.get('/api/initialize', async (req, res) => {
  try {
    const apiUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

    
    const response = await axios.get(apiUrl);
    const products = response.data;

    
    await Product.deleteMany();

    
    await Product.insertMany(products);

    res.send({ message: 'Database initialized with seed data' });
  } catch (error) {
    console.error('Error initializing database:', error.message);
    res.status(500).send({ error: 'Failed to initialize database' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
