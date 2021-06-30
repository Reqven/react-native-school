import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentById } from '../../stores/student/selectors';
import { loadStudent } from '../../stores/student/actions';
import { loadLessons } from '../../stores/lesson/actions';
import { StudentProfileCard } from '../components';
import { Centered } from '../../utils/helper';


export default function StudentProfileScreen({ route, navigation }) {
  const studentId = route.params._id;

  const student = useSelector(state => getStudentById(state, studentId));
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  const initialLoad = () => {
    Promise.all([
      dispatch(loadLessons()),
      dispatch(loadStudent(studentId))
    ])
    .catch(alert)
    .finally(() => setLoading(false));
  }
  const updateNavigationBar = () => {
    const title = student?.name;
    navigation.setOptions({ title });
  }

  React.useEffect(() => initialLoad(), []);
  React.useEffect(() => updateNavigationBar(), [student]);


  return (
    <View style={styles.container}>
      {loading
        ? <Centered><ActivityIndicator animating /></Centered>
        : (student ? <StudentProfileCard student={student} /> : <></>)
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 }
});
