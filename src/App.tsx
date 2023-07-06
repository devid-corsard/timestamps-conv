import { useState } from 'react';
import youtubeTimestampsToChapterText from './convert/to_ffmetadata';
import AlbumInfo from './components/AlbumInfo';
import OutFormat from './dto/outformat';
import Schemas from './dto/songNameSchemas';
import Tags from './dto/tags';
import youtubeTimestampsToCue from './convert/to_cue';
import { Button, Select, Textarea, Typography, Option } from '@material-tailwind/react';

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

    const handleFormat = (e?: string) => setFormat(e as OutFormat);

    return (
        <div className='flex flex-col gap-4 p-2 md:max-w-md md:mr-auto md:ml-auto'>
            <Typography
                variant='h4'
                color='deep-orange'
                textGradient
                className="text-center md:text-2xl"
            >
                Simple youtube timestamps converter
            </Typography>
            <div>
                <Textarea
                    label="paste timestamps here..."
                    size='lg'
                    color='lime'
                    onChange={(e) => setTimestapms(e.target.value)}
                    className='h-[10rem] dark:text-white text-md'
                    containerProps={{ className: "dark:bg-[#111]" }}
                ></Textarea>
            </div>
            <div className='w-72 ml-auto mr-auto'>
                <Select
                    label="Select output format"
                    color='lime'
                    value={format}
                    onChange={handleFormat}
                    className='dark:bg-[#111] dark:text-white'
                >
                    <Option value={OutFormat.Cue}>CUE</Option>
                    <Option value={OutFormat.Ffmetadata}>ffmetadata</Option>
                </Select>
            </div>
            {format === OutFormat.Cue && <AlbumInfo tags={tags} setTags={setTags} />}
            <Button onClick={handleClick} color='lime' className='w-32 m-2 ml-auto mr-auto' >
                Convert
            </Button>
            <div>
                <Textarea
                    label="conversion result should be here..."
                    value={data}
                    disabled
                    color='lime'
                    className='h-[10rem]'
                    resize={true}
                ></Textarea>
            </div>
            <Button className='w-64 ml-auto mr-auto' color='teal'>
                <a
                    download={`${tags.filename.split('.').slice(0, -1).join('.')}.${format}`}
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(data)}`}>
                    Download {format} File *
                </a>
            </Button>
            {
                format === OutFormat.Ffmetadata && <>
                    <Typography variant='h5' className="mb-2">* Example: </Typography>
                    <code>
                        ffmpeg - i file.mp4 - i file.ffmetadata - map_metadata 1 file_with_metadata.mp4
                    </code></>
            } {
                format === 'cue' && <>
                    <Typography variant='h5'>* Download to the same directory as music file </Typography>
                </>
            }
        </div>
    );
}

export default App;
