import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Input } from "@/components/Input"
import { useProductDatabase, ProductDatabase } from "@/database/useProductDatabase"
import { Product } from "@/components/Product";



export default function Index() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState<ProductDatabase[]>([]);

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

  async function list() {
    try {
      const response = await productDatabase.searchByName(search)
      setProducts(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    list()
  }, [search])

  return (
    <View >
      <View style={styles.containerSetup}>
        <Text style={styles.text}>Escreva os itens que deseja salvar!</Text>
        <Input
            style={styles.inputProduct}
            // onChangeText={(newId) => setId(newId)}
            placeholder=" Produto" onChangeText={setName} 
          />
          <Input
            style={styles.inputQuantity}
            // onChangeText={(newId) => setId(newId)}
            placeholder=" Quantidade" onChangeText={setQuantity} 
          />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText} onPress={create}>Salvar</Text>
          </TouchableOpacity>                      
        </View>
        <Input 
            style={styles.inputSearch}
            placeholder=" Pesquisar" onChangeText={setSearch} />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product
            data={item}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      />
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
  inputSearch:{
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