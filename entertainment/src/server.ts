import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

// Load environment variables
dotenv.config();

// print every environment variable
console.log(process.env);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
