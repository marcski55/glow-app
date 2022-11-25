// tutorial to have dynamic forms: https://javascript.plainenglish.io/creating-dynamic-input-fields-in-react-native-514a3e8444fa

import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const NewRecipeIngredients = () => {
  // this will be attached with each input onChangeText
  const [ingredientTextValue, setIngredientTextValue] = useState('');
  const [ingredientAmountValue, setIngredientAmountValue] = useState('');
  // our number of inputs, we can add the length or decrease
  const [numIngredients, setNumIngredients] = useState(1);
  // all our input fields are tracked with this array
  const refIngredients = useRef<string[]>([ingredientTextValue]);
  const refAmounts = useRef<string[]>([ingredientAmountValue]);

  const setIngredientValue = (index: number, value: string) => {
    const inputs = refIngredients.current;
    inputs[index] = value;
    setIngredientTextValue(value);
  };

  const setIngredientAmount = (index: number, value: string) => {
    const inputs = refAmounts.current;
    inputs[index] = value;
    setIngredientAmountValue(value);
  };

  const addIngredient = () => {
    refIngredients.current.push('');
    refAmounts.current.push('');
    setNumIngredients((value) => value + 1);
  };

  const removeIngredient = (i: number) => {
    refIngredients.current.splice(i, 1)[0];
    refAmounts.current.splice(i, 1)[0];
    setNumIngredients((value) => value - 1);
  };

  const ingredients: JSX.Element[] = [];
  for (let i = 0; i < numIngredients; i++) {
    ingredients.push(
      <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.label}>{i + 1}.</Text>
        <TextInput
          style={{ ...styles.input, marginRight: 0, width: '30%' }}
          onChangeText={(value) => setIngredientAmount(i, value)}
          value={refAmounts.current[i]}
          placeholder='amount'
          placeholderTextColor='gray'
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setIngredientValue(i, value)}
          value={refIngredients.current[i]}
          placeholder='ingredient'
          placeholderTextColor='gray'
        />
        <Pressable onPress={() => removeIngredient(i)} style={{ marginLeft: 5 }}>
          <AntDesign name='minuscircleo' size={20} color='red' />
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      {ingredients}
      <Pressable onPress={addIngredient} style={styles.addButton}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Add another ingredient</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 30
  },
  label: {
    paddingLeft: 10,
    paddingBottom: 0,
    fontSize: 18
  },
  input: {
    height: 40,
    width: '48%',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    borderColor: '#999'
  },
  addButton: {
    alignSelf: 'center',
    backgroundColor: '#5F0B65',
    padding: 10,
    borderRadius: 10,
    marginTop: 5
  }
});
