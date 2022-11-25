import React, { useEffect } from 'react';
import { Text, View, Alert, StyleSheet, FlatList, SafeAreaView, RefreshControl, Pressable } from 'react-native';
import { GetAllRecipes } from '../../data/actions/recipesActions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../data/hooks';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../data/store';
import { OpenRecipe } from './openRecipe';
import { NewRecipe } from './newRecipe';

const Stack = createNativeStackNavigator();

export const Recipes = () => {
  const [isFetching, setIsFetching] = React.useState(false);

  // The `state` arg is correctly typed as `RootState` already
  const recipeState = useAppSelector((state: RootState) => state.recipes);
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  const fetchData = () => {
    dispatch(GetAllRecipes());
    setIsFetching(false);
  };

  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: 'grey', marginHorizontal: 10 }} />;
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.item}>No receipes found</Text>
      </View>
    );
  };

  useEffect(fetchData, []);

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  const RecipeList = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={(e) => navigation.navigate('New Recipe')}>
          <Text style={[styles.item, styles.newItem].flat()}>Add new...</Text>
        </Pressable>
        {myItemSeparator()}
        <FlatList
          data={recipeState.recipes}
          renderItem={(item) => (
            <Pressable onPress={(e) => navigation.navigate('Recipe', item.item)}>
              <Text style={styles.item}>{item.item.title}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={myItemSeparator}
          ListEmptyComponent={myListEmpty}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={fetchData} />}
        />
      </SafeAreaView>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name='Recipe List' component={RecipeList} />
      <Stack.Screen name='Recipe' component={OpenRecipe} />
      <Stack.Screen name='New Recipe' component={NewRecipe} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    fontSize: 30
  },
  item: {
    padding: 20,
    marginTop: 5,
    fontSize: 15
  },
  newItem: {
    fontStyle: 'italic',
    color: 'gray'
  }
});
