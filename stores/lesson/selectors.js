import { getStudentById } from '../student/selectors'

export const getLessons = ({ lessons }) => lessons.data;
export const getLessonById = (state, id) => {
  return getLessons(state).find(item => item._id === id);
}

export const getLessonsByStudentId = (state, id) => {
  const student = getStudentById(state, id);
  return getLessons(state).filter(x => student.lessons.includes(x._id));
}


