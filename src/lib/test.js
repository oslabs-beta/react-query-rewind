// using javascript to test because it's easier to simply start the server

import express from 'express';
const app = express();
const PORT = 3030;
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dummy data
const dummyData = { message: 'npm package' };

app.get('/get-data', (req, res) => {
  res.json(dummyData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
