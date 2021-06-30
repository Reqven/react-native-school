import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Card, List, Switch } from 'react-native-paper';


const SortingCard = React.forwardRef(({ onSort }, ref) => {

  const [sortingEnabled, setSortingEnabled] = React.useState(false);
  const [sortingDirection, setSortingDirection] = React.useState(false);

  const sortingDirectionLabel = sortingDirection ? 'ASC' : 'DESC';
  const sortingDirectionIcon = sortingDirection ? 'sort-ascending' : 'sort-descending';

  const toggleSorting = () => setSortingEnabled(!sortingEnabled);
  const toggleSortingDirection = () => setSortingDirection(!sortingDirection);

  React.useImperativeHandle(ref, () => ({
    enabled: sortingEnabled,
    direction: sortingDirection
  }), [sortingEnabled, sortingDirection]);

  React.useEffect(() => {
    onSort?.(sortingEnabled, sortingDirection);
  }, [sortingEnabled, sortingDirection]);

  return (
    <Card style={styles.card}>
      <List.Section>
        <List.Item
          title="Enable sorting"
          description={sortingDirectionLabel}
          left={() => (
            <TouchableOpacity onPress={toggleSortingDirection}>
              <Avatar.Icon style={styles.icon} size={40} icon={sortingDirectionIcon} />
            </TouchableOpacity>
          )}
          right={() => (
            <Switch
              style={styles.switch}
              value={sortingEnabled}
              onValueChange={toggleSorting}
            />
          )}
        />
      </List.Section>
    </Card>
  )
});
export default SortingCard;


const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    marginBottom: 0.2,
    borderRadius: 0
  },
  icon: {
    marginHorizontal: 8
  },
  switch: {
    alignSelf: 'center'
  }
});
