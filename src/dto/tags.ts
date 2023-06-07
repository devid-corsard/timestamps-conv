import Schemas from "./songNameSchemas";

export default interface Tags {
  timestamps: string;
  date: string;
  genre: string;
  albumName: string;
  performer: string;
  filename: string;
  comment: string;
  schema: Schemas;
}
