const express = require('express');
const connection = require('./models/db');

// routes
const userRoutes = require('./routes/user.route');

// app instance
const app = express();
const port = 5000;

// body parsing 
app.use(express.json())

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});