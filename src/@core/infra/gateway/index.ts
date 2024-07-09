import { IGeteway } from "./types";
import {
  DocumentData,
  QueryCompositeFilterConstraint,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@core/framework/lib/firebase/_config";

const Geteway = (): IGeteway => {
  let collectionName = "";

  return {
    setCollection: (name) => {
      collectionName = name;
    },
    get: async <T>(
      queryDoc: QueryCompositeFilterConstraint | QueryFieldFilterConstraint
    ) => {
      const roomsRef = collection(db, collectionName);
      const q = query(roomsRef, queryDoc as QueryCompositeFilterConstraint);

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs as T;

      // or(
      //   where("userOwnerId", "==", userId),
      //   where("userPlayersIds", "array-contains", userId)
      // )
    },
    getId: async <T>(id: string) => {
      const roomdRef = doc(db, collectionName + `/${id}`);

      const querySnapshot = await getDoc(roomdRef);
      return querySnapshot as T;
    },
    post: async <T>(payload: T) => {
      const querySnapshot = collection(db, collectionName);
      await addDoc(querySnapshot, payload as DocumentData);
    },
    put: async <T>(id: string, paylaod: T) => {
      const querySnapshot = doc(db, collectionName, id);
      await updateDoc(querySnapshot, paylaod as DocumentData);
    },
    delete: async (id: string) => {
      const querySnapshot = doc(db, `${collectionName}/${id}`);
      await deleteDoc(querySnapshot);
    },
    exist: async (key, value) => {
      const roomdRef = collection(db, collectionName);

      const q = query(roomdRef, where(key, "==", value));

      const querySnapshot = await getDocs(q);

      return !!querySnapshot.docs.length;
    },
    syncId: (id, callback) => {
      const roomdRef = doc(db, collectionName + `/${id}`);
      return onSnapshot(roomdRef, callback as (doc: DocumentData) => void);
    },
    syncList: (callback) => {
      const roomdRef = collection(db, collectionName);
      return onSnapshot(roomdRef, (querySnapshot) => {
        let docs: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
          docs.push(doc);
        });

        callback(docs);
      });
    },
  };
};

const geteway = Geteway();

export default geteway;
