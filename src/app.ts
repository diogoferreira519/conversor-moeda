import express from 'express'
import dotenv from 'dotenv';
import router from './routes/route.conversor.js';
import { authMiddleware } from './middleware/auth.middleware.js';
dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(authMiddleware);

app.get('/', (req, res) => {
  res.status(200).send('API funcionando!')
})

app.use('/api', router);

app.listen(port)


export default app;
