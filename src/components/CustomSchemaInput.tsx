import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { CustomSchema } from "../dto/customSchemaType";
import { SongName } from "../dto/songName";
import Tags from "../dto/tags";
import { Typography } from "@material-tailwind/react";

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
            <Typography variant="h5" color="gray" className="ml-auto mr-auto w-56">Schema constructor:</Typography>
            <div className="flex gap-1 text-md justify-center">
                <input
                    type="text"
                    value={customSchema.prefix}
                    name="prefix"
                    onChange={handleChange}
                    className="border-2 border-blue-gray-100 w-[2rem] text-black text-center p-1"
                />
                <select
                    name="arg1"
                    onChange={handleChange}
                    value={customSchema.arg1}
                    className="border-2 border-blue-gray-100 w-[4rem] text-black bg-blue-gray-50 text-center p-0"
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
                    className="border-2 border-blue-gray-100 w-[2rem] text-black text-center p-1"
                />
                <select
                    name="arg2"
                    onChange={handleChange}
                    value={customSchema.arg2}
                    className="border-2 border-blue-gray-100 w-[4rem] text-black bg-blue-gray-50 text-center p-0"
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
                    className="border-2 border-blue-gray-100 w-[2rem] text-black text-center p-1"
                />
                <select
                    name="arg3"
                    onChange={handleChange}
                    value={customSchema.arg3}
                    className="border-2 border-blue-gray-100 w-[4rem] text-black bg-blue-gray-50 text-center p-0"
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
                    className="border-2 border-blue-gray-100 w-[2rem] text-black text-center p-1"
                />
            </div>
        </div>
    )
}

export default CustomSchemaInput;

