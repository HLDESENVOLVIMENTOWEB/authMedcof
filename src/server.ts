import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));