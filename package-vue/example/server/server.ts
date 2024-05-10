import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  // console.log(`Server is listening on port ${PORT}`);
});

export default express;
