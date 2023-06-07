import Song from "../dto/song";
import Schemas from "../dto/songNameSchemas";
import Tags from "../dto/tags";

const timeFormat = (time: string) => {
  // 06:32 shoud be 06:32:00
  // 1:06:32 should be 66:32:00
  let outTime = '00:00:00';
  const timeArr = time.split(':');
  if (timeArr.length === 3) {
    const [h, m, s] = timeArr;
    outTime = `${Number(h) * 60 + Number(m)}:${s}:00`;
  }
  if (timeArr.length === 2) {
    const [m, s] = timeArr;
    outTime = `${m}:${s}:00`;
  }
  return outTime;
};

type Parser = (value: string, index: number, array: string[]) => Song;

const schemas: { [key in Schemas]: Parser } = {
  'time title': (string: string): Song => {
    const [time, ...title] = string.split(' ');
    return { time: timeFormat(time), title: title.join(' ').trim() };
  },
  'time - title': (string: string): Song => {
    const [time, ...title] = string.split(' ').filter(word => word !== '-');
    return { time: timeFormat(time), title: title.join(' ').trim() };
  },
  'time - artist - title': (string: string): Song => {
    const [time, artist, ...title] = string.split(' - ').map(val => val.trim());
    return { time, artist, title: title.join(" - ").trim() };
  },
  'time artist - title': (string: string): Song => {
    const [time, ...artistTitle] = string.split(' ');
    const [artist, title] = artistTitle.join(' ').split(' - ').map(val => val.trim());

    return { time: timeFormat(time), title, artist };
  },
};

const parseByScema = (input: string, schema: Schemas): Song[] =>
  input
    .split('\n')
    .filter((string) => string.length)
    .map(string => string.trim())
    .map(schemas[schema]);

const trackNumFromIdx = (idx: number): string => idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

const metaChapterScheme = (idx: number, data: Song): string => {
  if (data.artist) {
    return `  TRACK ${trackNumFromIdx(idx)} AUDIO\n    TITLE "${data.title}"\n    PERFORMER "${data.artist}"\n    INDEX 01 ${data.time}\n`
  } else {
    return `  TRACK ${trackNumFromIdx(idx)} AUDIO\n    TITLE "${data.title}"\n    INDEX 01 ${data.time}\n`;
  }
}
const youtubeTimestrampsToCue = (inputData: Tags): string => {
  const chaptersText = parseByScema(inputData.timestamps, inputData.schema)
    .map((data, idx) => metaChapterScheme(idx, data))
    .join('');
  const genreStr = `REM GENRE "${inputData.genre}"\n`;
  const dateStr = `REM DATE "${inputData.date}"\n`;
  const commentStr = `REM COMMENT "${inputData.comment}"\n`;
  const performerStr = `PERFORMER "${inputData.performer}"\n`;
  const albumTitleStr = `TITLE "${inputData.albumName}"\n`;
  const filenameStr = `FILE "${inputData.filename}" WAVE\n`;



  const outputText = genreStr + dateStr + commentStr + performerStr + albumTitleStr + filenameStr + chaptersText;

  return outputText;
};

export default youtubeTimestrampsToCue;
