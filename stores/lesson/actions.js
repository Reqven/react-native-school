import { Database, createUniqueKey } from '../../utils/firebase';


const refPath = '/lessons';
const lessonsRef = () => Database.ref(refPath);

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

export const loadLessons = () => dispatch => {
  return new Promise(async (resolve, reject) => {

    const onSuccess = (snapshot) => {
      const entries = Object.entries(snapshot.val() || {});
      const data = entries.map(([_id, lesson]) => ({...lesson, _id}));
      dispatch(loadingSuccess(data));
      resolve(data);
    }
    const onFailure = (error) => {
      dispatch(loadingFailure(error));
      reject(error);
    }

    try {
      dispatch(loading());
      await lessonsRef().once('value', onSuccess, onFailure);
    } catch (error) {
      reject(error);
    }
  });
};

export const addLesson = lesson => dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      const _id = createUniqueKey();
      const data = { _id, ...lesson };

      await lessonsRef().child(_id).set(lesson, (error) => {
        if (error) return reject(error);
        dispatch({ type: types.ADD, payload: {data} });
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const removeLesson = id => dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      await lessonsRef().child(id).remove((error) => {
        if (error) return reject(error);
        dispatch({ type: types.REMOVE, payload: {id} })
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default { loadLessons, addLesson, removeLesson };
export const actionTypes = types;
