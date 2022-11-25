import React from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { IRecipe } from '../../data/types/recipes';

export const OpenRecipe = ({ navigation, route }) => {
  const recipe: IRecipe = route.params;

  // extract instruction list and put in correct order
  let instructions: string[] = [];
  const ordered = Object.keys(recipe.instructions)
    .sort()
    .reduce((obj, key) => {
      obj[key] = recipe.instructions[key];
      return obj;
    }, {});
  for (const [key, value] of Object.entries(ordered)) {
    instructions.push(`${key}. ${value}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.label}>Ingredients:</Text>
      <View>
        <FlatList
          data={recipe.ingredients}
          renderItem={(item) => (
            <Text style={styles.listItem}>
              {item.item.amount} {item.item.name}
            </Text>
          )}
          keyExtractor={(item, index) => String(index)}
          style={styles.list}
        />
      </View>
      <Text style={styles.label}>Instructions:</Text>
      <View>
        <FlatList
          data={instructions}
          renderItem={(item) => <Text style={styles.listItem}>{item.item}</Text>}
          keyExtractor={(item, index) => String(index)}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    fontSize: 30
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    padding: 10
  },
  label: {
    paddingLeft: 10,
    fontSize: 22
  },
  list: {
    padding: 15
  },
  listItem: {
    fontSize: 16,
    paddingBottom: 4
  }
});
