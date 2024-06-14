/* eslint-disable no-undef */
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebaseConfig/firebase.config";
import toast from "react-hot-toast";

const firebaseApi = {
  uploadImageToFirebase(fileImg) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(
        storage,
        `social-media/${Date.now()}${fileImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, fileImg);
      uploadTask.on(
        "state_changed",
        () => {},
        (e) => {
          toast.error(e.message);
          reject(e.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            localStorage.setItem("profileUrl", downloadURL);
            return resolve(downloadURL);
          });
        }
      );
    });
  },
};

export default firebaseApi;
