import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Input } from "@/components/Input"


export default function Index() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.containerSetup}>
        <Text style={styles.text}>Escreva os itens que deseja salvar!</Text>
        <Input
            style={styles.input}
            onChangeText={(newText) => setText(newText)}
            placeholder="Digite algo..."
          />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Listar</Text>
          </TouchableOpacity>
        </View>
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
  buttons:{
    flexDirection: 'row'
  },
  button:{
    marginTop: 15,
    backgroundColor: '#57D93B',
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 5
  },
  btnText:{ 
    fontSize: 15,
    margin: 5,
    marginHorizontal: 20
  }
  
});