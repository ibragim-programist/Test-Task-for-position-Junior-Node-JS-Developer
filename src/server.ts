import express from 'express';
import cors from 'cors';
import json from 'express';
import cookieParser from 'cookie-parser';
import { routes } from './routes/getRoutes.js';
import { loginMiddleware } from './middlewares/loginMiddleware.js';
import { registerMiddleware } from './middlewares/registerMiddleware.js';
import { getUserMiddleware } from './middlewares/getUserMiddleware.js';
import { getUsersMiddleware } from './middlewares/getUsersMiddleware.js';
import { blockUserMiddleware } from './middlewares/blockUserMiddleware.js';
import dotenv from 'dotenv'
import { errorMiddleware } from './middlewares/errorMiddleware.js';
dotenv.config();


const app = express();

app.use(json());
app.use(cookieParser())
app.use(cors());


// Middlewares для разных эндпоинтов

// login
app.post('/login', loginMiddleware);

// register
app.post('/register', registerMiddleware);

// get User by Email (Admin or User)
app.post('/getUser', getUserMiddleware);

// get Users (Only Admin)
app.get('/getUsers', getUsersMiddleware);

// block user (can block everybody only Admin
// or block yourself User )
app.post('/blockUser', blockUserMiddleware);

// Routes
app.use(routes)

// Error Middleware
app.use(errorMiddleware);



app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`)
})



