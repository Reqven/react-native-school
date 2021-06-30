import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { StudentCardListItem, SortingCard } from '../components';
import { Centered, sortStudentsByAverage } from '../../utils/helper';
import { loadStudents, resetAllAttendance } from '../../stores/student/actions';


export default function StudentListScreen({ navigation }) {

  const { data, loading, initialized } = useSelector(({ students }) => students);
  const [refreshing, setRefreshing] = React.useState(false);
  const [students, setStudents] = React.useState(data);

  const sortingRef = React.useRef();
  const dispatch = useDispatch();


  const onLoad = () => {
    return dispatch(loadStudents()).catch(alert);
  }
  const onRefresh = () => {
    setRefreshing(true);
    onLoad().finally(() => setRefreshing(false));
  }
  const sortStudents = () => {
    const { enabled, direction } = sortingRef?.current;
    if (!enabled) return setStudents(data);
    setStudents(sortStudentsByAverage(data, direction));
  }
  const updateNavigationBar = () => {
    navigation.setOptions({
      headerRight: () => <IconButton icon="sticker-remove-outline" onPress={() => {
        dispatch(resetAllAttendance()).catch(alert);
      }} />
    });
  }

  React.useEffect(() => { onLoad(); }, []);
  React.useEffect(() => { sortStudents(); }, [data]);
  React.useEffect(() => { updateNavigationBar() }, []);


  return (
    <View style={styles.container}>
      <SortingCard ref={sortingRef} onSort={sortStudents} />
      {loading && !initialized
        ? <Centered><ActivityIndicator animating /></Centered>
        : <FlatList
            data={students}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <StudentCardListItem student={item} /> }
          />
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  }
});
