import React from 'react';
import { getInitials } from '../../utils/helper';
import { Avatar, Card } from 'react-native-paper';
import { StyleSheet } from 'react-native-web'


export default function LessonCardListItem ({ lesson }) {

  const { title } = lesson;
  const initials = getInitials(title, 2);

  return (
    <Card style={styles.card}>
      <Card.Title
        title={title}
        left={props => <Avatar.Text label={initials} {...props} />}
      />
    </Card>
  );
}


const styles = StyleSheet.create({
  card: { borderRadius: 0 }
});
