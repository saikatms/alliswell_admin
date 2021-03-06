import { firestore } from "../../firebase";

export const loadCategories = (onSuccess, onError) => {
  return (dispatch, getState) => {
    firestore
      .collection("CATEGORIES")
      .orderBy("index")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        if (!querySnapshot.empty) {
          let categories = [];
          querySnapshot.forEach((doc) => {
            categories.push(doc.data());
          });
          dispatch({ type: "LOAD_CATEGORIES", payload: categories });
          onSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        onError();
      });
  };
};
