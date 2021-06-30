import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Chip, Avatar, List, Button, Title, Caption, ActivityIndicator } from 'react-native-paper';
import { getAverage } from '../../utils/helper';
import { decrementAttendance, incrementAttendance, loadStudent, resetAttendance } from '../../stores/student/actions';
import { getStudentById } from '../../stores/student/selectors';
import { getLessonsByStudentId } from '../../stores/lesson/selectors';
import { loadLessons } from '../../stores/lesson/actions';


const StudentScreen = ({ route, navigation }) => {
  const studentId = route.params._id;
  const student = useSelector(state => getStudentById(state, studentId));
  const lessons = useSelector(state => getLessonsByStudentId(state, studentId));

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const dispatch = useDispatch();

  const initialLoad = () => {
    Promise.all([
      dispatch(loadLessons()),
      dispatch(loadStudent(studentId))
    ])
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }
  const updateNavigationBar = () => {
    const title = student?.name;
    navigation.setOptions({ title });
  }
  const attendance = {
    increment: () => dispatch(incrementAttendance(studentId)).catch(handleError),
    decrement: () => dispatch(decrementAttendance(studentId)).catch(handleError),
    reset: () => dispatch(resetAttendance(studentId)).catch(handleError)
  }
  const handleError = error => {
    if (error) console.log(error);
  }

  React.useEffect(() => initialLoad(), []);
  React.useEffect(() => updateNavigationBar(), [student]);


  if (loading || error) return (
    <View style={styles.loadingContainer}>
      {loading
        ? <ActivityIndicator animating />
        : <Text>{error}</Text>
      }
    </View>
  )

  return (
    <View style={styles.container}>
      <Card style={{ borderRadius: 0 }}>
        <Card.Content style={{ alignItems: 'center' }}>
          <Avatar.Text label={student.name.charAt(0)} />
          <Title>{student.name}</Title>
          <Caption>{student._id}</Caption>
        </Card.Content>

        <List.Section>
          <View style={styles.sectionHeader}>
            <List.Subheader>Attendance</List.Subheader>
            <Text style={styles.sectionHeaderDetail}>{student.attendance}</Text>
          </View>
          <Card.Actions style={{ paddingVertical: 0 }}>
            <Button onPress={attendance.decrement} disabled={student.attendance <= 0}>Decrement</Button>
            <Button onPress={attendance.increment}>Increment</Button>
            <Button onPress={attendance.reset}>Reset</Button>
          </Card.Actions>
        </List.Section>

        <List.Section>
          <View style={styles.sectionHeader}>
            <List.Subheader>Notes</List.Subheader>
            <Text style={styles.sectionHeaderDetail}>{getAverage(student.notes)}</Text>
          </View>
          <View style={styles.chipList}>
            {student.notes.map((rating, idx) => {
              return <Chip key={idx} style={styles.chip}>{rating}</Chip>
            })}
          </View>
        </List.Section>

        <List.Section style={{ marginBottom: 16 }}>
          <List.Subheader>Lessons</List.Subheader>
          <View style={styles.chipList}>
            {lessons.map(({ title }, idx) => {
              return <Chip key={idx} style={styles.chip}>{title}</Chip>
            })}
          </View>
        </List.Section>
      </Card>
    </View>
  );
}
export default StudentScreen;


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    padding: 0,
    textAlign: 'center'
  },
  chipList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16
  },
  chip: {
    marginRight: 5
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sectionHeaderDetail: {
    flex: 1,
    marginRight: 16,
    textAlign: 'right'
  }
});
