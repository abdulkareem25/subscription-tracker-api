import express from 'express';
import { PORT } from './config/env.js';
import connectToDb from './config/db.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subcriptionRouter from './routes/subscription.routes.js';
import morgan from 'morgan';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subcriptions', subcriptionRouter)


app.get('/', (req, res) => {
    res.send('Welcome to my first Backend Project')
})


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    connectToDb()
})


export default app;