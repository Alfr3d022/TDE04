import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Input } from "@/components/Input"
import { useProductDatabase } from "@/database/useProductDatabase"



export default function Index() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);

  const productDatabase = useProductDatabase ()
  

  async function create() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
      }

      const response = await productDatabase.create({
        name,
        quantity: Number(quantity),
      })

      Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSetup}>
        <Text style={styles.text}>Escreva os itens que deseja salvar!</Text>
        <Input
            style={styles.inputProduct}
            // onChangeText={(newId) => setId(newId)}
            placeholder="Produto" onChangeText={setName} 
          />
          <Input
            style={styles.inputQuantity}
            // onChangeText={(newId) => setId(newId)}
            placeholder="Quantidade" onChangeText={setQuantity} 
          />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText} onPress={create}>Salvar</Text>
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
  inputProduct:{
    borderWidth: 1,
    width: 250,
    height: 40
  },
  inputQuantity:{
    borderWidth: 1,
    width: 250,
    height: 40,
    marginTop: 15,
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