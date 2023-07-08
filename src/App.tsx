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
        if (format === OutFormat.Cue) {
            const res = youtubeTimestampsToCue({ timestamps, ...tags });
            setData(res);
        } else if (format === 'ffmetadata') {
            const res = youtubeTimestampsToChapterText(timestamps);
            setData(res);
        }
    };

    return (
        <div className='flex flex-col gap-4 p-2 md:max-w-3xl md:mx-auto text-lg dark:text-slate-300'>
            <h1 className="bg-gradient-to-br from-lime-500 to-orange-500 bg-clip-text text-transparent \
            text-center text-4xl font-bold border-2 p-3 border-lime-500" >
                Simple youtube timestamps converter
            </h1>
            <textarea
                placeholder="paste timestamps here..."
                onChange={(e) => setTimestapms(e.target.value)}
                className='h-[10rem] text-md border-2 p-2 border-lime-300 outline-lime-500 \
                dark:text-slate-300 dark:bg-slate-900'
            ></textarea>
            <div className='grid grid-cols-[2fr_3fr] items-center md:grid-cols-2'>
                <p>Select output format:</p>
                <select
                    value={format}
                    onChange={e => setFormat(e.target.value as OutFormat)}
                    className='bg-lime-500 text-white text-center p-2 \
                    h-12 dark:bg-lime-500/75'
                >
                    <option value={OutFormat.Cue}>CUE</option>
                    <option value={OutFormat.Ffmetadata}>ffmetadata</option>
                </select>
            </div>
            {format === OutFormat.Cue && <AlbumInfo tags={tags} setTags={setTags} />}
            <button
                onClick={handleClick}
                className='bg-gradient-to-r from-lime-500 to-orange-500 rounded-md \
                w-32 m-2 mx-auto text-white font-bold p-2 shadow-lime-300 shadow-md \
                dark:shadow-lime-800'
            >
                Convert
            </button>
            <textarea
                placeholder="conversion result should be here..."
                value={data}
                readOnly
                className='h-[10rem] text-md border-2 p-2 border-lime-300 outline-lime-500 \
                dark:text-slate-300 dark:bg-slate-900'
            ></textarea>
            <button className='bg-gradient-to-r from-lime-500 to-orange-500 rounded-md \
            w-64 mx-auto bg-lime-500 text-white font-bold p-2 shadow-lime-300 shadow-md \
            dark:shadow-lime-800'>
                <a
                    download={`${tags.filename.split('.').slice(0, -1).join('.')}.${format}`}
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(data)}`}>
                    Download {format} File *
                </a>
            </button>
            {
                format === OutFormat.Ffmetadata && <>
                    <h5 className="mb-2">* Example: </h5>
                    <code>
                        ffmpeg - i file.mp4 - i file.ffmetadata - map_metadata 1 file_with_metadata.mp4
                    </code></>
            } {
                format === 'cue' && <>
                    <h5 >* Download to the same directory as music file </h5>
                </>
            }
        </div>
    );
}

export default App;
