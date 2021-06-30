import React from 'react';
import { StyleSheet } from 'react-native';
import { updateStudent } from '../../firebase/student';
import { Avatar, Caption, List, Button } from 'react-native-paper';
import { View, Text } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

export default function StudentAccordion(props) {
  const navigation = useNavigation();
  const { student } = props;
  const { accordionTitle } = styles;
  const { _id, name, notes, url } = student;

  const attendance = student.attendance.toString();
  const lessons = student.lessons.length.toString();
  const average = (notes.reduce((a,b) => a+b, 0) / notes.length)
    .toFixed(2)
    .toString();

  const avatar = () => renderAvatar(url);

  const handleError = error => {
    if (error) console.log(error);
  }

  return (
    <List.Accordion title={name} titleStyle={accordionTitle} left={avatar}>
      { renderItem('id', _id) }
      { renderItem('Attendance', attendance) }
      { renderItem('Lessons', lessons) }
      { renderItem('Average', average) }
      <Button onPress={() => navigation.push('Student', { _id })}>Profile</Button>
    </List.Accordion>
  )
}

const renderAvatar = (url) => {
  const { avatar } = styles;
  const src = { uri: url };
  return <Avatar.Image size={40} style={avatar} source={src} />
}

const renderItem = (title, value) => {
  const { item, itemTitle } = styles;
  const caption = () => renderCaption(value);
  return <List.Item style={item} titleStyle={itemTitle} title={title} right={caption} />
}

const renderCaption = (value) => {
  const { caption } = styles;
  return <Caption style={caption}>{value}</Caption>;
}



const styles = StyleSheet.create({
  accordionTitle: {
    color: 'black'
  },
  avatar: {
    marginHorizontal: 8
  },
  item: {
    marginVertical: 0,
    paddingVertical: 0,
    backgroundColor: '#f6f6f6'
  },
  itemTitle: {
    fontSize: 12
  },
  caption: {
    alignSelf: 'center',
    marginHorizontal: 8,
  }
});
