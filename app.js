import  express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Connect to MongoDB
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@shelby00.teqs2jk.mongodb.net/?retryWrites=true&w=majority`
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

module.exports = app;
