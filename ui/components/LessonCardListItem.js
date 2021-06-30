import React from 'react';
import { getInitials } from '../../utils/helper';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, IconButton } from 'react-native-paper';


const LessonCardListItem = ({ lesson, style }) => {
  const navigation = useNavigation();
  const { _id, title } = lesson;

  const onPress = () => {
    // navigation.push('Lesson', { _id });
  }

  return (
    <Card style={style} onPress={onPress}>
      <Card.Title
        title={title}
        left={props => <Avatar.Text label={getInitials(title, 2)} {...props} />}
        // right={props => <IconButton icon="dots-vertical" {...props} />}
      />
    </Card>
  );
}
export default LessonCardListItem;
