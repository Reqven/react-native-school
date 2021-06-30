import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LessonCardListItem from '../components/LessonCardListItem';
import { loadLessons } from '../../stores/lesson/actions';
import { delay } from '../../utils/helper';


export default function LessonsScreen() {
  const { data, loading, initialized } = useSelector(({ lessons }) => lessons);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  const onRefresh = () => {
    setRefreshing(true);
    delay(500)
      .then(() => dispatch(loadLessons()))
      .finally(() => setRefreshing(false));
  }
  const renderLessonItem = ({ item, index }) => {
    return <LessonCardListItem style={styles.item} lesson={item} />
  }

  React.useEffect(() => {
    dispatch(loadLessons());
  }, []);

  return (
    <View style={styles.container}>
      {loading && !initialized
        ? <ActivityIndicator animating />
        : (error ? <Text>Error</Text>
            : <FlatList
                data={data}
                style={styles.list}
                onRefresh={onRefresh}
                refreshing={refreshing}
                renderItem={renderLessonItem}
                keyExtractor={(item) => item._id}
              />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    alignSelf: 'stretch'
  },
  item: {
    borderRadius: 0
  }
});

