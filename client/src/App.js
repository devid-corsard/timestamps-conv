import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState(null);

  const handleClick = async () => {
    const res = await axios.post('/api/v1/yt-ffmpeg', { timestamps: text });
    setData(res.data);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data);
  };

  return (
    <div className="App">
      <h1>Simple youtube timestamps to ffmpeg metadata converter</h1>
      <textarea
        cols="50"
        rows="10"
        className="inputText"
        placeholder="paste timestamps from youtube here..."
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className="sendButton" onClick={handleClick}>
        Convert
      </button>
      <textarea
        className="outputText"
        cols="50"
        rows="10"
        placeholder="ffmpeg metadata should be here..."
        defaultValue={data}
        readOnly
      ></textarea>
      <button className="copyButton" onClick={handleCopy}>
        Copy
      </button>
      <p>Example:</p>
      <code>
        ffmpeg -i file.mp4 -i tags.txt -map_metadata 1 file_with_metadata.mp4
      </code>
    </div>
  );
}

export default App;
