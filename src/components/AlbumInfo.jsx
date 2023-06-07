const AlbumInfo = ({ tags, setTags }) => {
  const handleTags = (e) => {
    const { name, value } = e.target;
    setTags((prevData) => ({ ...prevData, [name]: value }));
  };
  return <div className="albumInfo">
    <label>
      Select schema:
      <select name="schema" id="schema" onChange={handleTags}>
        <option value="time artist - title">time artist - title</option>
        <option value="time title">time title</option>
        <option value="time - title">time - title</option>
        <option value="time - artist - title">time - atrist - title</option>
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
