import FFMetaData from "../dto/ffmetadata";

const timeToSeconds = (time: string): string =>
  time.split(':').reduce((acc, time) => String(60 * Number(acc) + Number(time)));

const parseStartEndTitle = (input: string): FFMetaData[] => {
  const arrayFromTxt = input.split('\n').filter((string) => string.length);

  const arrTimeAndTitle = arrayFromTxt.map((string) => {
    const [time, ...title] = string.split(' ').filter((word) => word !== '-');
    return [time, title.join(' ')];
  });

  const arrOfObjects: FFMetaData[] = arrTimeAndTitle.map(
    ([startTime, title], index, array) => {
      const start = timeToSeconds(startTime);

      const next = index + 1;

      const endTime = next !== array.length ? array[next][0] : undefined;

      const end = endTime ? timeToSeconds(endTime) : start + 10;

      return { start, end, title };
    }
  );

  return arrOfObjects;
};

const metaChapterScheme = (data: FFMetaData): string =>
  `[CHAPTER]\nTIMEBASE=1/1\nSTART=${data.start}\nEND=${data.end}\ntitle=${data.title}\n`;

const youtubeTimestampsToChapterText = (inputData: string) => {
  const chaptersText: string = parseStartEndTitle(inputData)
    .map(metaChapterScheme)
    .join('');

  const outputText = ';FFMETADATA1\n' + chaptersText;

  return outputText;
};

export default youtubeTimestampsToChapterText;
