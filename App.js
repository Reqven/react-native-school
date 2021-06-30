import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StudentListScreen, StudentProfileScreen, LessonListScreen } from './ui/screens';
import students from './stores/student/reducer';
import lessons from './stores/lesson/reducer';
import { TabIcon } from './utils/helper';
import Firebase from './utils/firebase';
import Theme from './utils/theme';


const reducer = combineReducers({ students, lessons });
const store = createStore(reducer, applyMiddleware(thunk));


export default function App() {
  return (
    <PaperProvider theme={Theme}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Nav />
      </Provider>
    </PaperProvider>
  );
}

const Nav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Students"
          component={StudentsTab}
          options={{ tabBarIcon: (props) => TabIcon(props, 'account-supervisor') }}
        />
        <Tab.Screen
          name="Lessons"
          component={LessonsTab}
          options={{ tabBarIcon: (props) => TabIcon(props, 'book-open-variant') }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const StudentsTab = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Students">
      <Stack.Screen name="Students" component={StudentListScreen} />
      <Stack.Screen name="Student" component={StudentProfileScreen} />
    </Stack.Navigator>
  );
}
const LessonsTab = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Lessons">
      <Stack.Screen name="Lessons" component={LessonListScreen} />
    </Stack.Navigator>
  );
}
