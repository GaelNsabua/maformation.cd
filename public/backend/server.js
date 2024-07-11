const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const universiteRoutes = require('./routes/universites');
const faculteRoutes = require('./routes/facultes');
const recommendationRoutes = require('./routes/recommendation'); 
const feedbackRoutes = require('./routes/feedback');
const userRoutes = require('./routes/user');
const avisRoutes = require('./routes/avis');

app.use('/feedback', feedbackRoutes);
app.use('/universites', universiteRoutes);
app.use('/faculties', faculteRoutes);
app.use('/recommendation', recommendationRoutes);
app.use('/users', userRoutes);
app.use('/avis', avisRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
