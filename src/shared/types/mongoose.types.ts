import type { FlattenMaps, Types } from 'mongoose';

/**
 * Represents a lean document in Mongoose.
 *
 * A LeanDocument is a simplified version of a Mongoose document, which removes
 * the Mongoose methods and returns a plain JavaScript object. This can improve
 * performance when you only need the data without the full Mongoose model features.
 *
 * @template T - The type of the document schema.
 * @typedef {FlattenMaps<T> & {_id: Types.ObjectId}} LeanDocument
 */
export type LeanDocument<T> = FlattenMaps<T> & {
  _id: Types.ObjectId;
};
