import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { CustomSchema } from "../dto/customSchemaType";
import { SongName } from "../dto/songName";
import Tags from "../dto/tags";

const defaultCustomSchema: CustomSchema = {
    prefix: '',
    arg1: SongName.Time,
    divider1: '-',
    arg2: SongName.Artist,
    divider2: '-',
    arg3: SongName.Title,
    postfix: '',
};

type Props = {
    tags: Tags,
    setTags: Dispatch<SetStateAction<Tags>>
};

function CustomSchemaInput({ setTags, tags }: Props) {
    const [customSchema, setCustomScema] = useState<CustomSchema>(tags.customSchema || defaultCustomSchema);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const nextCustomSchema = { ...customSchema, [name]: value };
        setCustomScema(nextCustomSchema);
        setTags((prevData: Tags) => ({ ...prevData, customSchema: { ...nextCustomSchema } }));
    };
    return (
        <div>
            <h5 className="mx-auto w-56">Schema constructor:</h5>
            <div className="grid grid-cols-[2fr_4fr_2fr_4fr_2fr_4fr_2fr] gap-1 text-md justify-evenly mb-4">
                <input
                    type="text"
                    value={customSchema.prefix}
                    name="prefix"
                    onChange={handleChange}
                    className="w-full border-2 border-lime-300/75 outline-lime-500 text-black text-center p-1 \
                    dark:bg-slate-900 dark:text-slate-200"
                />
                <select
                    name="arg1"
                    onChange={handleChange}
                    value={customSchema.arg1}
                    className="w-full bg-lime-500 dark:bg-lime-500/75 text-white text-center p-0"
                >
                    <option value={SongName.Time}>{SongName.Time}</option>
                    <option value={SongName.Title}>{SongName.Title}</option>
                    <option value={SongName.Artist}>{SongName.Artist}</option>
                    <option value={SongName.None}>{SongName.None}</option>
                    <option value={SongName.Skip}>{SongName.Skip}</option>
                </select>
                <input
                    type="text"
                    value={customSchema.divider1}
                    name="divider1"
                    onChange={handleChange}
                    className="w-full border-2 border-lime-300/75 outline-lime-500 text-black text-center p-1 \
                    dark:bg-slate-900 dark:text-slate-200"
                />
                <select
                    name="arg2"
                    onChange={handleChange}
                    value={customSchema.arg2}
                    className="w-full bg-lime-500 dark:bg-lime-500/75 text-white text-center p-0"
                >
                    <option value={SongName.Time}>{SongName.Time}</option>
                    <option value={SongName.Title}>{SongName.Title}</option>
                    <option value={SongName.Artist}>{SongName.Artist}</option>
                    <option value={SongName.None}>{SongName.None}</option>
                    <option value={SongName.Skip}>{SongName.Skip}</option>
                </select>
                <input
                    type="text"
                    value={customSchema.divider2}
                    name="divider2"
                    onChange={handleChange}
                    className="w-full border-2 border-lime-300/75 outline-lime-500 text-black text-center p-1 \
                    dark:bg-slate-900 dark:text-slate-200"
                />
                <select
                    name="arg3"
                    onChange={handleChange}
                    value={customSchema.arg3}
                    className="w-full bg-lime-500 dark:bg-lime-500/75 text-white text-center p-0"
                >
                    <option value={SongName.Time}>{SongName.Time}</option>
                    <option value={SongName.Title}>{SongName.Title}</option>
                    <option value={SongName.Artist}>{SongName.Artist}</option>
                    <option value={SongName.None}>{SongName.None}</option>
                    <option value={SongName.Skip}>{SongName.Skip}</option>
                </select>
                <input
                    type="text"
                    value={customSchema.postfix}
                    name="postfix"
                    onChange={handleChange}
                    className="w-full border-2 border-lime-300/75 outline-lime-500 text-black text-center p-1 \
                    dark:bg-slate-900 dark:text-slate-200"
                />
            </div>
        </div>
    )
}

export default CustomSchemaInput;

