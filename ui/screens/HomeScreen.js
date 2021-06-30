import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { resetAllAttendance } from '../../stores/student/actions'
import { useDispatch } from 'react-redux'
import StudentsScreen from './StudentsScreen'
import LessonsScreen from './LessonsScreen'
import { BottomNavigation, IconButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import StudentScreen from './StudentScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



const HomeScreen = ({ navigation })  => {
  const dispatch = useDispatch();

  const btn = () => {
    dispatch(resetAllAttendance())
      .then(console.log)
      .catch(console.log);
  }

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    { key: 'students', title: 'Students', icon: 'home',  component: StudentsTab  },
    { key: 'lessons',  title: 'Lessons',  icon: 'album', component: LessonsTab   },
  ]);

  const renderScene = BottomNavigation.SceneMap(
    routes.reduce((scene, { key, component }) => {
      scene[key] = component; return scene;
    }, {})
  );

  /*React.useEffect(() => {
    navigation.setOptions({
      title: routes[index].title
    });
  }, [index]);*/

  return (
    <NavigationContainer>
      <BottomTabs/>
    </NavigationContainer>
  );

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Students" onPress={() => navigation.navigate('Students')} />
      <Button title="Lessons" onPress={() => navigation.navigate('Lessons')} />
      <Button title="Alice" onPress={() => navigation.navigate('Student', { _id: 'de' })} />
      <Button title="Reset All" onPress={btn} />
    </View>
  );
}
export default HomeScreen;


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

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Students"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        component={StudentsTab} />
      <Tab.Screen
        name="Lessons"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={LessonsTab} />
    </Tab.Navigator>
  );

  return (
    <Tab.Navigator
      initialRouteName="Students"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Students"
        component={StudentsTab}
        options={{
          tabBarIcon: 'home-account',
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsTab}
        options={{
          tabBarIcon: 'bell-outline',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

