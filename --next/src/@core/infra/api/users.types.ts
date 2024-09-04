import { IUser } from "@core/domain/User";
import {
  QueryCompositeFilterConstraint,
  QueryFieldFilterConstraint,
} from "firebase/firestore";

export type IQueryPayload =
  | QueryCompositeFilterConstraint
  | QueryFieldFilterConstraint;

export interface ICreatePayload extends IUser {}

export interface IUpdatePayload extends IUser {}

export type IDeleteId = string;
