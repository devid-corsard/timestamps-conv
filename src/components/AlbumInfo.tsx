import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Tags from "../dto/tags";
import Schemas from "../dto/songNameSchemas";
import CustomSchemaInput from "./CustomSchemaInput";
import { Select, Option, Input } from "@material-tailwind/react";

type Props = {
    tags: Tags,
    setTags: Dispatch<SetStateAction<Tags>>
};

function AlbumInfo({ tags, setTags }: Props) {
    const handleTags = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTags((prevData: Tags) => ({ ...prevData, [name]: value }));
    };
    return <div className="flex flex-col gap-6 p-2">
        <Select
            label="Select schema"
            onChange={e => setTags({ ...tags, schema: e as Schemas })}
            value={tags.schema}
            color="lime"
        >
            <Option value={Schemas.A}>{Schemas.A}</Option>
            <Option value={Schemas.B}>{Schemas.B}</Option>
            <Option value={Schemas.C}>{Schemas.C}</Option>
            <Option value={Schemas.D}>{Schemas.D}</Option>
            <Option value={Schemas.E}>{Schemas.E}</Option>
        </Select>
        {tags.schema == Schemas.E && <CustomSchemaInput tags={tags} setTags={setTags} />}
        <Input
            type="text"
            label="Date"
            name="date"
            value={tags.date}
            onChange={handleTags}
            color="lime"
        />
        <Input
            type="text"
            label="Genre"
            name="genre"
            value={tags.genre}
            onChange={handleTags}
            color="lime"
        />
        <Input
            type="text"
            name="albumName"
            label="Album"
            value={tags.albumName}
            onChange={handleTags}
            color="lime"
        />
        <Input
            type="text"
            name="performer"
            label="Performer"
            value={tags.performer}
            onChange={handleTags}
            color="lime"
        />
        <Input
            type="text"
            name="comment"
            label="Comment"
            value={tags.comment}
            onChange={handleTags}
            color="lime"
        />
        <Input
            type="text"
            name="filename"
            label="Filename"
            value={tags.filename}
            onChange={handleTags}
            color="lime"
        />
    </div>
}

export default AlbumInfo;
