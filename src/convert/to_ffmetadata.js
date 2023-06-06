const timeToSeconds = (time) =>
  time.split(':').reduce((acc, time) => 60 * acc + +time);

const parseStartEndTitle = (input) => {
  const arrayFromTxt = input.split('\n').filter((string) => string.length);

  const arrTimeAndTitle = arrayFromTxt.map((string) => {
    const [time, ...title] = string.split(' ').filter((word) => word !== '-');
    return [time, title.join(' ')];
  });

  const arrOfObjects = arrTimeAndTitle.map(
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

const metaChapterScheme = (start, end, title) =>
  `[CHAPTER]\nTIMEBASE=1/1\nSTART=${start}\nEND=${end}\ntitle=${title}\n`;

export const youtubeTimestrampsToChapterText = (inputData) => {
  const chaptersText = parseStartEndTitle(inputData)
    .map(({ start, end, title }) => metaChapterScheme(start, end, title))
    .join('');

  const outputText = ';FFMETADATA1\n' + chaptersText;

  return outputText;
};
