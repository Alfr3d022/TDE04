import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Index() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerSetup}>
        <Text style={styles.text}>Escreva os itens que deseja salvar!</Text>
        <TextInput
            style={styles.input}
            onChangeText={(newText) => setText(newText)}
            placeholder="Digite algo..."
          />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29E18B'
  },
  containerSetup:{
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 40,
    alignItems: 'center',
  },
  text:{
    fontSize: 15,
    marginBottom: 20
  },
  input:{
    borderWidth: 1,
    width: 250,
    height: 40
  },
  button:{
    marginTop: 15,
    backgroundColor: '#57D93B',
    padding: 10,
    borderRadius: 40
  },
  btnText:{ 
    fontSize: 15,
    margin: 5,
    marginHorizontal: 20
  }
  
});