import React from 'react';
import { ActivityIndicator, Avatar, Card, Switch, List } from 'react-native-paper';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import StudentCardListItem from '../components/StudentCardListItem';
import { delay, getAverage } from '../../utils/helper';
import { loadStudents } from '../../stores/student/actions';
import { useDispatch, useSelector } from 'react-redux';


export default function StudentsScreen({ navigation }) {
  const { data, loading, initialized } = useSelector(({ students }) => students);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [students, setStudents] = React.useState(data);
  const dispatch = useDispatch();

  const [sortingEnabled, setSortingEnabled] = React.useState(false);
  const [sortingDirection, setSortingDirection] = React.useState(false);

  const sortingDirectionLabel = sortingDirection ? 'ASC' : 'DESC';
  const sortingDirectionIcon = sortingDirection ? 'sort-ascending' : 'sort-descending';

  const toggleSorting = () => setSortingEnabled(!sortingEnabled);
  const toggleSortingDirection = () => setSortingDirection(!sortingDirection);

  const onRefresh = () => {
    setRefreshing(true);
    delay(500)
      .then(() => dispatch(loadStudents()))
      .finally(() => setRefreshing(false));
  }
  const applySorting = () => {
    if (sortingEnabled) {
      setStudents([...data]
        .map(item => ({ _: getAverage(item.notes), item }))
        .sort(({_:a},{_:b}) => sortingDirection ? a-b : b-a)
        .map(({ item }) => item));
    } else {
      setStudents([...data]);
    }
  }

  React.useEffect(() => { dispatch(loadStudents()) }, []);
  React.useEffect(() => applySorting(), [data, sortingEnabled, sortingDirection]);

  return (
    <View style={styles.container}>
      {loading && !initialized
        ? <ActivityIndicator animating />
        : (error ? <Text>Error</Text>
          : <>
              <Card style={styles.options}>
                <List.Section>
                  <List.Item
                    title="Enable sorting"
                    description={sortingDirectionLabel}
                    left={() => (
                      <TouchableOpacity onPress={toggleSortingDirection}>
                        <Avatar.Icon style={styles.avatar} size={40} icon={sortingDirectionIcon} />
                      </TouchableOpacity>
                    )}
                    right={() => (
                      <Switch
                        //color="#147efb"
                        style={styles.switch}
                        value={sortingEnabled}
                        onValueChange={toggleSorting}
                      />
                    )}
                  />
                </List.Section>
              </Card>
              <FlatList
                data={students}
                style={styles.list}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <StudentCardListItem student={item} /> }
              />
            </>
          )
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    alignSelf: 'stretch',
    marginBottom: 0.2,
    borderRadius: 0
  },
  avatar: {
    marginHorizontal: 8
  },
  switch: {
    alignSelf: 'center'
  },
  list: {
    alignSelf: 'stretch'
  }
});
