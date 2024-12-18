const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Routes
const moviesRoute = require('./routes/movies');
const foodRoute = require('./routes/food');
const travelRoute = require('./routes/travel');
const groceriesRoute = require('./routes/groceries');
const clothesRoute = require('./routes/clothes');
const dealsRoute = require('./routes/deals');
const purchasesRoute = require('./routes/purchases');

// Create Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://naveen:Sumanth123@cluster0.2k7qtkf.mongodb.net/expenseTracker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

// Use Routes
app.use('/movies', moviesRoute);
app.use('/foods', foodRoute);
app.use('/travels', travelRoute);
app.use('/groceries', groceriesRoute);
app.use('/clothes', clothesRoute);
app.use('/deals', dealsRoute);
app.use('/purchases', purchasesRoute);

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});