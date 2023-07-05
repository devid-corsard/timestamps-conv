import React, { Dispatch, SetStateAction, useState } from "react";
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
    setTags: Dispatch<SetStateAction<Tags>>
};

function CustomSchemaInput({ setTags }: Props) {
    const [customSchema, setCustomScema] = useState<CustomSchema>(defaultCustomSchema);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const nextCustomSchema = { ...customSchema, [name]: value };
        setCustomScema(nextCustomSchema);
        setTags((prevData: Tags) => ({ ...prevData, customSchema: { ...nextCustomSchema } }));
    };
    return (
        <div>
            <h2>select own scema:</h2>
            <div className="customSchemaInput">
                <input type="text" value={customSchema.prefix} name="prefix" onChange={handleChange} />
                <select name="arg1" onChange={handleChange} value={customSchema.arg1}>
                    <option value={SongName.Time}>{SongName.Time}</option>
                    <option value={SongName.Title}>{SongName.Title}</option>
                    <option value={SongName.Artist}>{SongName.Artist}</option>
                    <option value={SongName.None}>{SongName.None}</option>
                </select>
                <input type="text" value={customSchema.divider1} name="divider1" onChange={handleChange} />
                <select name="arg2" onChange={handleChange} value={customSchema.arg2}>
                    <option value={SongName.Time}>{SongName.Time}</option>
                    <option value={SongName.Title}>{SongName.Title}</option>
                    <option value={SongName.Artist}>{SongName.Artist}</option>
                    <option value={SongName.None}>{SongName.None}</option>
                </select>
                <input type="text" value={customSchema.divider2} name="divider2" onChange={handleChange} />
                <select name="arg3" onChange={handleChange} value={customSchema.arg3}>
                    <option value={SongName.Time}>{SongName.Time}</option>
                    <option value={SongName.Title}>{SongName.Title}</option>
                    <option value={SongName.Artist}>{SongName.Artist}</option>
                    <option value={SongName.None}>{SongName.None}</option>
                </select>
                <input type="text" value={customSchema.postfix} name="postfix" onChange={handleChange} />
            </div>
        </div>
    )
}

export default CustomSchemaInput;

