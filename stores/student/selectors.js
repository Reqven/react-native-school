export const getStudents = ({ students }) => students.data;
export const getStudentById = (state, id) => {
  return getStudents(state).find(item => item._id === id);
}
