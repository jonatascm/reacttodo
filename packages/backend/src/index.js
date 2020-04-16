const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());

require('./controllers/index')(app);

server.listen(1337, '0.0.0.0');