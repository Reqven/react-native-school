import React from 'react';
import { getAverage, getInitials } from '../../utils/helper';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, IconButton } from 'react-native-paper';


const StudentCardListItem = ({ student }) => {
  const navigation = useNavigation();
  const { _id, name, notes, url } = student;

  const onPress = () => {
    navigation.push('Student', { _id });
  }

  return (
    <Card onPress={onPress} style={{ borderRadius: 0 }}>
      <Card.Title
        title={name}
        subtitle={'Average: ' + getAverage(notes)}
        left={props => <Avatar.Text label={getInitials(name, 2)} {...props} />}
        right={props => <IconButton icon="chevron-right" {...props} />}
      />
    </Card>
  );
}
export default StudentCardListItem;
