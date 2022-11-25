// tutorial to have dynamic forms: https://javascript.plainenglish.io/creating-dynamic-input-fields-in-react-native-514a3e8444fa

import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const NewRecipeInstructions = () => {
  // this will be attached with each input onChangeText
  const [instructionTextValue, setInstructionTextValue] = useState('');
  // our number of inputs, we can add the length or decrease
  const [numInstructions, setNumInstructions] = useState(1);
  // all our input fields are tracked with this array
  const refInstructions = useRef<string[]>([instructionTextValue]);

  const setInstructionValue = (index: number, value: string) => {
    const inputs = refInstructions.current;
    inputs[index] = value;
    setInstructionTextValue(value);
  };

  const addInstruction = () => {
    refInstructions.current.push('');
    setNumInstructions((value) => value + 1);
  };

  const removeInstruction = (i: number) => {
    refInstructions.current.splice(i, 1)[0];
    setNumInstructions((value) => value - 1);
  };

  const instructions: JSX.Element[] = [];
  for (let i = 0; i < numInstructions; i++) {
    instructions.push(
      <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.label}>{i + 1}.</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setInstructionValue(i, value)}
          value={refInstructions.current[i]}
          placeholder='next step'
          placeholderTextColor='gray'
        />
        <Pressable onPress={() => removeInstruction(i)} style={{ marginLeft: 5 }}>
          <AntDesign name='minuscircleo' size={20} color='red' />
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      {instructions}
      <Pressable onPress={addInstruction} style={styles.addButton}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Add another instruction</Text>
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
    width: '80%',
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
