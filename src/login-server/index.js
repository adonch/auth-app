import express from 'express';
import 'dotenv/config';
import { client } from './utils/db.js';
import { User } from './models/User.model.js';
import { authRouter, userRouter } from './api/routers/router.js';
import cors from 'cors';
const PORT = process.env.SERVER_PORT;
const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
);

app.use(express.json());
app.use('/', authRouter);
app.use('/users', userRouter);
app.use((req, res) => {
  res.status(404).send({
    message: 'Route not found',
  });
});

async function start() {
  try {
    await client.authenticate();
    await User.sync({ alter: true });
    // await Expense.sync();
    // await client.sync({ alter: true });

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
  }
}

start();
