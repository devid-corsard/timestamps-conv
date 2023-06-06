import './App.css';
import { useState } from 'react';
import { youtubeTimestrampsToChapterText } from './convert/to_ffmetadata';
import { youtubeTimestrampsToCue } from './convert/to_cue';
import AlbumInfo from './components/AlbumInfo';

function App() {
  const [timestamps, setTimestapms] = useState('');
  const [format, setFormat] = useState('cue');
  const [data, setData] = useState(null);
  const [tags, setTags] = useState({
    date: '2023',
    genre: 'Pop',
    albumName: 'Mix',
    performer: 'Various Artists',
    filename: 'file.m4a',
    comment: '',
    schema: 'time artist - title'
  });

  const handleClick = () => {
    if (format === 'cue') {
      const res = youtubeTimestrampsToCue({ timestamps, ...tags });
      setData(res);
    } else if (format === 'ffmetadata') {
      const res = youtubeTimestrampsToChapterText(timestamps);
      setData(res);
    }
  };

  return (
    <div className="App">
      <h1>Simple youtube timestamps converter</h1>
      <textarea
        cols="50"
        rows="10"
        className="inputText"
        placeholder="paste timestamps here..."
        onChange={(e) => setTimestapms(e.target.value)}
      ></textarea>
      <label>Output format:
        <select name="formats" id="formats" onChange={e => setFormat(e.currentTarget.value)}>
          <option value="cue">CUE</option>
          <option value="ffmetadata">ffmetadata</option>
        </select>
      </label>
      {format === "cue" && <AlbumInfo tags={tags} setTags={setTags} />}
      <button className="sendButton" onClick={handleClick}>
        Convert
      </button>
      <textarea
        className="outputText"
        cols="50"
        rows="10"
        placeholder="conversion result should be here..."
        defaultValue={data}
        readOnly
      ></textarea>
      <a
        download={`${tags.filename.split('.').slice(0, -1).join('.')}.${format}`}
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(data)}`}>
        Download {format} File
      </a>
      {format === 'ffmetadata' && <>
        <p>Example:</p>
        <code>
          ffmpeg -i file.mp4 -i file.ffmetadata -map_metadata 1 file_with_metadata.mp4
        </code>
      </>
      }{format === 'cue' && <>
        <p>Download to the same directory as music file</p>
      </>
      }
    </div>
  );
}

export default App;
