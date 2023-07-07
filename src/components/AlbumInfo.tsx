import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Tags from "../dto/tags";
import Schemas from "../dto/songNameSchemas";
import CustomSchemaInput from "./CustomSchemaInput";

type Props = {
    tags: Tags,
    setTags: Dispatch<SetStateAction<Tags>>
};

function AlbumInfo({ tags, setTags }: Props) {
    const handleTags = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTags((prevData: Tags) => ({ ...prevData, [name]: value }));
    };

    return <div className="flex flex-col">
        <div className="grid grid-cols-[2fr_3fr] mb-4 md:grid-cols-2">
            <p>Select parsing schema:</p>
            <select
                name="schema"
                onChange={handleTags}
                value={tags.schema}
                className='bg-lime-500 text-white text-center p-2 \
                h-12 dark:bg-lime-500/75'
            >
                <option value={Schemas.A}>{Schemas.A}</option>
                <option value={Schemas.B}>{Schemas.B}</option>
                <option value={Schemas.C}>{Schemas.C}</option>
                <option value={Schemas.D}>{Schemas.D}</option>
                <option value={Schemas.E}>{Schemas.E}</option>
            </select>
        </div>
        {tags.schema == Schemas.E && <CustomSchemaInput tags={tags} setTags={setTags} />}
        <div className="grid grid-cols-[1fr_3fr] grid-rows-1 gap-1">
            <span>Date:</span>
            <input
                type="text"
                name="date"
                value={tags.date}
                onChange={handleTags}
                className="border-2 border-lime-200/75 p-2 dark:bg-slate-900"
            />
            <span>Genre:</span>
            <input
                type="text"
                name="genre"
                value={tags.genre}
                onChange={handleTags}
                className="border-2 border-lime-200/75 p-2 dark:bg-slate-900"
            />
            Album:
            <input
                type="text"
                name="albumName"
                value={tags.albumName}
                onChange={handleTags}
                className="border-2 border-lime-200/75 p-2 dark:bg-slate-900"
            />
            <span> Artist: </span >
            <input
                type="text"
                name="performer"
                value={tags.performer}
                onChange={handleTags}
                className="border-2 border-lime-200/75 p-2 dark:bg-slate-900"
            />
            <span> Comment: </span>
            <input
                type="text"
                name="comment"
                value={tags.comment}
                onChange={handleTags}
                className="border-2 border-lime-200/75 p-2 dark:bg-slate-900"
            />
            <span> File name: </span>
            <input
                type="text"
                name="filename"
                value={tags.filename}
                onChange={handleTags}
                className="border-2 border-lime-200 p-2 dark:bg-slate-900"
            />
        </div>
    </div>
}

export default AlbumInfo;
