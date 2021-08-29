import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchData, fetchSuccess, fetchError } from "./Action";

const loadSportsData =
  (url: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    return new Promise(() => {
      axios
        .get(url)
        .then((response) => {
          dispatch(fetchSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchError(error));
        });
    });
  };

const actionCreator = {
  loadSportsData,
};
export default actionCreator;
