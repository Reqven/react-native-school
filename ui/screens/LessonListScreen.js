import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import { loadLessons } from '../../stores/lesson/actions';
import { LessonCardListItem } from '../components';
import { Centered } from '../../utils/helper';


export default function LessonListScreen() {

  const { data, loading, initialized } = useSelector(({ lessons }) => lessons);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();


  const onLoad = () => {
    return dispatch(loadLessons()).catch(alert);
  }
  const onRefresh = () => {
    setRefreshing(true);
    onLoad().finally(() => setRefreshing(false));
  }

  React.useEffect(() => { onLoad(); }, []);


  return (
    <View style={styles.container}>
      {loading && !initialized
        ? <Centered><ActivityIndicator animating /></Centered>
        : <FlatList
            data={data}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <LessonCardListItem lesson={item} /> }
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

