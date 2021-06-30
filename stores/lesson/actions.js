import Firebase from 'firebase/app';
import 'firebase/database';


const refPath = '/lessons';
const createUniqueKey = () => Firebase.database().ref('/').push().key;

const types = {
  ADD: 'LESSONS_ADD',
  REMOVE: 'LESSONS_REMOVE',
  LOADING: 'LESSONS_LOADING',
  LOADING_SUCCESS: 'LESSONS_LOADING_SUCCESS',
  LOADING_FAILURE: 'LESSONS_LOADING_FAILURE'
}

const loading = () => {
  return { type: types.LOADING };
};
const loadingSuccess = (data) => {
  return { type: types.LOADING_SUCCESS, payload: { data }};
};
const loadingFailure = (error) => {
  return { type: types.LOADING_FAILURE, payload: { error }};
};

export const loadLessons = () => {

  const onSuccess = (dispatch, snapshot, resolve) => {
    const entries = Object.entries(snapshot.val() || {});
    const data = entries.map(([_id, lesson]) => ({...lesson, _id}));
    dispatch(loadingSuccess(data));
    resolve(data);
  }
  const onFailure = (dispatch, error, reject) => {
    dispatch(loadingFailure(error));
    reject(error);
  }

  return dispatch => {
    return new Promise((resolve, reject) => {
      try {
        dispatch(loading());
        Firebase.database().ref(refPath).once('value',
          (snapshot) => onSuccess(dispatch, snapshot, resolve),
          (error) => onFailure(dispatch, error, reject)
        );
      } catch (error) {
        reject(error);
      }
    });
  }
};

export const addLesson = lesson => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      try {
        const _id = createUniqueKey();
        const data = { _id, ...lesson };

        Firebase.database().ref(refPath).child(_id).set(lesson, (error) => {
          if (error) return reject(error);
          dispatch({ type: types.ADD, payload: {data} });
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const removeLesson = id => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      try {
        Firebase.database().ref(refPath).child(id).remove((error) => {
          if (error) return reject(error);
          dispatch({ type: types.REMOVE, payload: {id} })
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default { loadLessons, addLesson, removeLesson };
export const actionTypes = types;
