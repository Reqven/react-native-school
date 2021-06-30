import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native'


export const sortStudentsByAverage = (students, asc) => {
  return students
    .map(item => ({ _: getAverage(item.notes), item }))
    .sort(({_:a},{_:b}) => asc ? a-b : b-a)
    .map(({ item }) => item);
}

export const getAverage = values => {
  return (values.reduce((a,b) => a+b, 0) / values.length)
    .toFixed(2)
    .toString();
}

export const getInitials = (str, count = 1) => {
  return str
    .split(' ')
    .filter(Boolean)
    .map(a => a.charAt(0))
    .splice(0, count).join('');
}

export const handleError = (error) => {
  if (error) console.log(error);
}

export const snapshotItemWithId = (snapshot, id) => {
  if (!snapshot.exists()) return null;
  return { _id: id, ...snapshot.val() };
}

export const snapshotListWithId = (snapshot) => {
  const entries = Object.entries(snapshot.val() || {});
  return entries.map(([_id, obj]) => ({ _id, ...obj }));
}

export const TabIcon = ({ color, size }, icon) => (
  <MaterialCommunityIcons name={icon} color={color} size={size} />
)

export const Centered = ({ children }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {children}
  </View>
)
