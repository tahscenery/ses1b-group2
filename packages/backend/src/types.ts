import { ObjectId } from "mongodb";

export interface Identifiable {
  id: string | ObjectId;
}

export type Ref<T extends Identifiable> = T | ObjectId;
