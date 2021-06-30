import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Caption, Card, Chip, List, Title } from 'react-native-paper';
import { decrementAttendance, incrementAttendance, resetAttendance } from '../../stores/student/actions';
import { getLessonsByStudentId } from '../../stores/lesson/selectors';
import { getAverage } from '../../utils/helper';


export default function StudentProfileCard({ student }) {

  const { _id, name, attendance, notes, url } = student;
  const lessons = useSelector(state => getLessonsByStudentId(state, _id));
  const dispatch = useDispatch();

  const average = getAverage(notes);

  const increment = () => dispatch(incrementAttendance(_id)).catch(alert);
  const decrement = () => dispatch(decrementAttendance(_id)).catch(alert);
  const reset = () => dispatch(resetAttendance(_id)).catch(alert);


  return (
    <Card style={{ borderRadius: 0 }}>
      <Card.Content style={{ alignItems: 'center' }}>
        <Avatar.Image source={{ uri: url }} />
        <Title>{name}</Title>
        <Caption>{_id}</Caption>
      </Card.Content>

      <List.Section>
        <View style={styles.sectionHeader}>
          <List.Subheader>Attendance</List.Subheader>
          <Text style={styles.sectionHeaderDetail}>{attendance}</Text>
        </View>
        <Card.Actions style={{ paddingVertical: 0 }}>
          <Button onPress={decrement} disabled={attendance <= 0}>Decrement</Button>
          <Button onPress={increment}>Increment</Button>
          <Button onPress={reset}>Reset</Button>
        </Card.Actions>
      </List.Section>

      <List.Section>
        <View style={styles.sectionHeader}>
          <List.Subheader>Notes</List.Subheader>
          <Text style={styles.sectionHeaderDetail}>{average}</Text>
        </View>
        <View style={styles.chipList}>
          {notes.map((rating, idx) => {
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
  )
}


const styles = StyleSheet.create({
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

