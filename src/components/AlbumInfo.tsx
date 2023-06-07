import { ChangeEvent, Dispatch, SetStateAction } from "react";
import React from 'react';
import Tags from "../dto/tags";
import Schemas from "../dto/songNameSchemas";

const AlbumInfo = ({ tags, setTags }: { tags: Tags, setTags: Dispatch<SetStateAction<Tags>> }) => {
  const handleTags = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTags((prevData: Tags) => ({ ...prevData, [name]: value }));
  };
  return <div className="albumInfo">
    <label>
      Select schema:
      <select name="schema" id="schema" onChange={handleTags}>
        <option value={Schemas.A}>{Schemas.A}</option>
        <option value={Schemas.B}>{Schemas.B}</option>
        <option value={Schemas.C}>{Schemas.C}</option>
        <option value={Schemas.D}>{Schemas.D}</option>
      </select>
    </label>
    <label>
      Date:
      <input
        type="text"
        name="date"
        value={tags.date}
        onChange={handleTags}
      />
    </label>
    <label>
      Genre:
      <input
        type="text"
        name="genre"
        value={tags.genre}
        onChange={handleTags}
      />
    </label>
    <label>
      Album Name:
      <input
        type="text"
        name="albumName"
        value={tags.albumName}
        onChange={handleTags}
      />
    </label>
    <label>
      Performer:
      <input
        type="text"
        name="performer"
        value={tags.performer}
        onChange={handleTags}
      />
    </label>
    <label>
      Comment:
      <input
        type="text"
        name="comment"
        value={tags.comment}
        onChange={handleTags}
      />
    </label>
    <label>
      Filename:
      <input
        type="text"
        name="filename"
        value={tags.filename}
        onChange={handleTags}
      />
    </label>
  </div>
}

export default AlbumInfo;
