import express from 'express'
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/auth.middleware.js'
dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(authMiddleware);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


export default app;
