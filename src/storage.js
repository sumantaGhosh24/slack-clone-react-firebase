import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

import {storage} from "./firebase";

export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
