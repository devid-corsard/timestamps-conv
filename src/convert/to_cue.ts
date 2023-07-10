import { CustomSchema } from "../dto/customSchemaType";
import ParseData from "../dto/parseData";
import Song from "../dto/song";
import { SongName } from "../dto/songName";
import Schemas from "../dto/songNameSchemas";

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

const schemas = {
    [Schemas.A]: (string: string): Song => {
        const [time, ...title] = string.split(' ');
        return { time: timeFormat(time), title: title.join(' ').trim() };
    },
    [Schemas.B]: (string: string): Song => {
        const [time, ...title] = string.split(' ').filter(word => word !== '-');
        return { time: timeFormat(time), title: title.join(' ').trim() };
    },
    [Schemas.C]: (string: string): Song => {
        const [time, artist, ...title] = string.split(' - ').map(val => val.trim());
        return { time, artist, title: title.join(" - ").trim() };
    },
    [Schemas.D]: (string: string): Song => {
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
        .map(schemas[schema as Schemas.A | Schemas.B | Schemas.C | Schemas.D]);

const parseByCustomSchema = (input: string, customSchema: CustomSchema): Song[] =>
    input
        .split('\n')
        .filter((string) => string.length)
        .map(string => {
            const dividers = [
                customSchema.postfix,
                customSchema.prefix,
                customSchema.divider1,
                customSchema.divider2
            ]

            dividers
                .filter(div => div.length)
                .forEach(div => string = string.replace(div, '<fff>'));

            const songItems = string
                .split('<fff>')
                .filter(s => s.length);


            const song: Song = {
                time: '',
                title: '',
            };

            const args = [
                customSchema.arg1,
                customSchema.arg2,
                customSchema.arg3,
            ]
            args
                .filter(arg => arg !== SongName.None)
                .forEach((arg, i) => {
                    arg !== SongName.Skip && arg !== SongName.None
                        ? song[arg] = songItems[i]?.trim()
                        : 0;
                });

            song.time = timeFormat(song.time);

            return song
        });

const trackNumFromIdx = (idx: number): string => idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

const metaChapterScheme = (idx: number, data: Song): string => {
    if (data.artist) {
        return `  TRACK ${trackNumFromIdx(idx)} AUDIO\n    TITLE "${data.title}"\n    PERFORMER "${data.artist}"\n    INDEX 01 ${data.time}\n`
    } else {
        return `  TRACK ${trackNumFromIdx(idx)} AUDIO\n    TITLE "${data.title}"\n    INDEX 01 ${data.time}\n`;
    }
}
const youtubeTimestampsToCue = (inputData: ParseData): string => {
    const chapters = inputData.schema == Schemas.E && inputData.customSchema
        ? parseByCustomSchema(inputData.timestamps, inputData.customSchema)
        : parseByScema(inputData.timestamps, inputData.schema)

    const chaptersText = chapters
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

export default youtubeTimestampsToCue;
