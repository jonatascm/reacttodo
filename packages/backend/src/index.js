import express from 'express';
import cors from 'cors';
import http from 'http';
import * as controller from './controllers';

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use('/user',controller.userController);
app.use('/auth',controller.authController);
app.use('/todo',controller.todoController);

server.listen(1337, '0.0.0.0');