import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080; //


app.use(cors);

app.use(express.json());

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
