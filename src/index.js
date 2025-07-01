import express from 'express'
import { pool } from './db/db.js';
import bridge from './routes/bridge.routes.js'
import { PORT } from '../config.js';
import cors from 'cors'

const app=express();
app.listen(PORT);
console.log("Server running on port> " + PORT)

app.use(cors())


app.use(express.json())
app.use(bridge)






