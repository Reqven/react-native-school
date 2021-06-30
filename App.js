import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StudentsScreen from './ui/screens/StudentsScreen';
import StudentScreen from './ui/screens/StudentScreen';
import LessonsScreen from './ui/screens/LessonsScreen';
import studentsReducer from './stores/student/reducer';
import lessonsReducer from './stores/lesson/reducer';
import Firebase from './utils/firebase';
import { TabIcon } from './utils/helper';
import Theme from './utils/theme';


const reducer = combineReducers({
  students: studentsReducer,
  lessons: lessonsReducer
});
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
      <Stack.Screen name="Students" component={StudentsScreen} />
      <Stack.Screen name="Student" component={StudentScreen} />
    </Stack.Navigator>
  );
}

const LessonsTab = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Lessons">
      <Stack.Screen name="Lessons" component={LessonsScreen} />
    </Stack.Navigator>
  );
}
