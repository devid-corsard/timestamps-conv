import './App.css';
import React from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import youtubeTimestampsToChapterText from './convert/to_ffmetadata';
import AlbumInfo from './components/AlbumInfo';
import OutFormat from './dto/outformat';
import Schemas from './dto/songNameSchemas';
import Tags from './dto/tags';
import youtubeTimestampsToCue from './convert/to_cue';


function App() {
    const [timestamps, setTimestapms] = useState('');
    const [format, setFormat] = useState(OutFormat.Cue);
    const [data, setData] = useState('');
    const [tags, setTags] = useState<Tags>({
        date: '2023',
        genre: 'Pop',
        albumName: 'Mix',
        performer: 'Various Artists',
        filename: 'file.m4a',
        comment: '',
        schema: Schemas.D,
    });

    const handleClick = () => {
        if (format === 'cue') {
            const res = youtubeTimestampsToCue({ timestamps, ...tags });
            setData(res);
        } else if (format === 'ffmetadata') {
            const res = youtubeTimestampsToChapterText(timestamps);
            setData(res);
        }
    };

    const handleFormat = (e: ChangeEvent<HTMLSelectElement>) =>
        setFormat(e.currentTarget.value === OutFormat.Cue ? OutFormat.Cue : OutFormat.Ffmetadata);

    return (
        <div className="App" >
            <h1>Simple youtube timestamps converter </h1>
            <textarea
                cols={50}
                rows={10}
                className="inputText"
                placeholder="paste timestamps here..."
                onChange={(e) => setTimestapms(e.target.value)
                }
            ></textarea>
            <label> Output format:
                <select name="formats" id="formats" onChange={handleFormat} >
                    <option value={OutFormat.Cue}>CUE</option>
                    <option value={OutFormat.Ffmetadata}>ffmetadata</option>
                </select>
            </label>
            {format === "cue" && <AlbumInfo tags={tags} setTags={setTags} />}
            <button className="sendButton" onClick={handleClick} >
                Convert
            </button>
            <textarea
                className="outputText"
                cols={50}
                rows={10}
                placeholder="conversion result should be here..."
                defaultValue={data}
                readOnly
            ></textarea>
            <a
                download={`${tags.filename.split('.').slice(0, -1).join('.')}.${format}`}
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(data)}`}>
                Download {format} File
            </a>
            {
                format === 'ffmetadata' && <>
                    <p>Example: </p>
                    <code>
                        ffmpeg - i file.mp4 - i file.ffmetadata - map_metadata 1 file_with_metadata.mp4
                    </code>
                </>
            } {
                format === 'cue' && <>
                    <p>Download to the same directory as music file </p>
                </>
            }
        </div>
    );
}

export default App;
