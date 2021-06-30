import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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

export const delay = (ms = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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
