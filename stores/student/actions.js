import Firebase from 'firebase/app';
import 'firebase/database';
import { snapshotItemWithId, snapshotListWithId } from '../../utils/helper'


const refPath = '/students';
const studentsRef = () => Firebase.database().ref(refPath);
const createUniqueKey = () => Firebase.database().ref('/').push().key;

const types = {
  ADD: 'STUDENTS_ADD',
  REMOVE: 'STUDENTS_REMOVE',
  UPDATE: 'STUDENTS_UPDATE',
  LOADING: 'STUDENTS_LOADING',
  LOADING_SUCCESS: 'STUDENTS_LOADING_SUCCESS',
  LOADING_FAILURE: 'STUDENTS_LOADING_FAILURE'
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

export const loadStudents = () => dispatch => {
  return new Promise((resolve, reject) => {

    const onSuccess = (snapshot) => {
      const data = snapshotListWithId(snapshot);
      dispatch(loadingSuccess(data));
      resolve(data);
    }
    const onFailure = (error) => {
      dispatch(loadingFailure(error));
      reject(error);
    }

    try {
      dispatch(loading());
      studentsRef().once('value', onSuccess, onFailure);
    } catch (error) {
      reject(error);
    }
  });
};

export const loadStudent = (id) => dispatch => {
  return new Promise((resolve, reject) => {

    const onSuccess = (snapshot) => {
      if (!snapshot.exists()) {
        return reject(new Error('Not found'));
      }
      const data = snapshotItemWithId(snapshot, id);
      dispatch({ type: types.UPDATE, payload: {data} });
      return resolve(data);
    }
    const onFailure = (error) => {
      reject(error);
    }

    try {
      studentsRef().child(id).once('value', onSuccess, onFailure);
    } catch (error) {
      reject(error);
    }
  });
}

export const addStudent = student => dispatch => {
  return new Promise((resolve, reject) => {
    try {
      const _id = createUniqueKey();
      const data = { _id, ...student };

      studentsRef().child(_id).set(student, (error) => {
        if (error) return reject(error);
        dispatch({ type: types.ADD, payload: {data} });
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const removeStudent = id => dispatch => {
  return new Promise((resolve, reject) => {
    try {
      studentsRef().child(id).remove((error) => {
        if (error) return reject(error);
        dispatch({ type: types.REMOVE, payload: {id} })
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const incrementAttendance = id => dispatch => {
  return new Promise((resolve, reject) => {

    try {
      const studentRef = studentsRef().child(id);

      studentRef.get().then(snapshot => {
        if (!snapshot.exists()) return reject();
        const data = { _id: id, ...snapshot.val() };

        studentRef
          .child('attendance')
          .set(Firebase.database.ServerValue.increment(1), (error) => {
            if (error) return reject(error);

            data.attendance++;
            dispatch({ type: types.UPDATE, payload: {data} });
            resolve(data);
          });
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const decrementAttendance = id => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const studentRef = studentsRef().child(id);
        const snapshot = await studentRef.get();

        if (!snapshot.exists()) return reject(new Error('Not found'));
        let { attendance } = snapshot.val();
        if (attendance === 0) return reject(new Error('Impossible'));

        studentRef
          .child('attendance')
          .set(Firebase.database.ServerValue.increment(-1), (error) => {
            if (error) return reject(error);
            attendance--;

            const data = { _id: id, ...snapshot.val(), attendance };
            dispatch({ type: types.UPDATE, payload: {data} });
            resolve(data);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const resetAttendance = id => dispatch => {
  const studentRef = studentsRef().child(id);

  const getStudent = snapshot => {
    if (!snapshot.exists()) return Promise.reject();
    const student = {...snapshotItemWithId(snapshot, id), attendance: 0};
    return Promise.resolve(student);
  }
  return studentRef.get()
    .then(getStudent)
    .then(data => {
      studentRef.child('attendance').set(0, (error) => {
        if (error) return Promise.reject(error);
        dispatch({ type: types.UPDATE, payload: {data} });
        return Promise.resolve(data);
      });
    });
}

export const resetAllAttendance = () => dispatch => {
  return new Promise((resolve, reject) => {

    const transactionUpdate = students => {
      if (!students) return null;
      Object.keys(students).forEach(id => students[id].attendance = 0);
      return students;
    }
    const onComplete = (error, committed, snapshot) => {
      if (error) return reject(error);
      if (committed && snapshot.exists()) {
        const data = snapshotListWithId(snapshot);
        dispatch(loadingSuccess(data));
        return resolve(data);
      }
      reject();
    }
    studentsRef().transaction(transactionUpdate, onComplete);
  });
}


export default { loadStudents, loadStudent, addStudent, incrementAttendance, decrementAttendance, resetAttendance, resetAllAttendance, removeStudent };
export const actionTypes = types;
