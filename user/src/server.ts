import app from './app';
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('Port is not defined in .env file');
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});