import { SongName } from "./songName";

interface Song {
    [SongName.Time]: string;
    [SongName.Title]: string;
    [SongName.Artist]?: string;
}
export default Song;
