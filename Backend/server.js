import express from 'express';
import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;


const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is Listening at port ${port}`);
});