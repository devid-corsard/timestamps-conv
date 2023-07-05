import { CustomSchema } from "./customSchemaType";
import Schemas from "./songNameSchemas";

export default interface Tags {
    date: string;
    genre: string;
    albumName: string;
    performer: string;
    filename: string;
    comment: string;
    schema: Schemas;
    customSchema?: CustomSchema;
}
