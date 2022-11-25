import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NewRecipeIngredients } from './newRecipeIngredients';
import { NewRecipeInstructions } from './newRecipeInstructions';

export const NewRecipe = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveRecipe = () => {
    // todo
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder='Receipe Name'
          placeholderTextColor='gray'
        />
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder='Description (optional)'
          placeholderTextColor='gray'
        />
        <Text style={styles.label}>Ingredients:</Text>
        <NewRecipeIngredients />
        <Text style={styles.label}>Instructions:</Text>
        <NewRecipeInstructions />
      </ScrollView>
      <Pressable style={styles.save} onPress={saveRecipe}>
        <AntDesign name='check' size={20} color='#5F0B65' />
        <Text style={{ color: '#5F0B65', paddingLeft: 5 }}>Save and Close Recipe</Text>
      </Pressable>
      <View style={styles.bottomPadding}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    fontSize: 30
  },
  label: {
    paddingLeft: 10,
    paddingBottom: 0,
    fontSize: 18,
    marginTop: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    borderColor: '#999'
  },
  bottomPadding: {
    height: 85
  },
  save: {
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
