import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { getAverage } from '../../utils/helper';
import { StyleSheet } from 'react-native-web';


export default function StudentCardListItem({ student }) {

  const { _id, name, notes, url } = student;
  const average = getAverage(notes);
  const navigation = useNavigation();

  const onPress = () => {
    navigation.push('Student', { _id });
  }

  return (
    <Card onPress={onPress} style={styles.card}>
      <Card.Title
        title={name}
        subtitle={'Average: ' + average}
        left={props => <Avatar.Image source={{ uri: url }} {...props} />}
        right={props => <IconButton icon="chevron-right" {...props} />}
      />
    </Card>
  );
}


const styles = StyleSheet.create({
  card: { borderRadius: 0 }
});
