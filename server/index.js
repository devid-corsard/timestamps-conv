import express from 'express';
import { youtubeTimestrampsToChapterText } from './convert.js';

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.post('/api/v1/yt-ffmpeg', (req, res) => {
  const timestamps = req.body.timestamps;
  if (!timestamps) res.sendStatus(400);
  const ffmetadata = youtubeTimestrampsToChapterText(timestamps);
  res.send(ffmetadata);
});

app.get('/', (req, res) => {
  res.send('All is wokring!');
});

app.listen(port, () => {
  console.log('Listening port: ' + port);
});
