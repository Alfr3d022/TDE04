import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Input } from "@/components/Input"
import { useProductDatabase, ProductDatabase } from "@/database/useProductDatabase"



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
    <View>
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
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText} onPress={create}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Listar</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001133'
  },
  containerSetup:{
    backgroundColor: '#E5E5E5',
    padding: 50,
    borderRadius: 30,
    alignItems: 'center',
  },
  title:{
    flexDirection: 'row'
  },
  txtTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6366F1',
  },
  text:{
    fontSize: 15,
    marginTop: 15,
    marginBottom: 4
  },
  iconTitle:{
    fontSize: 25,
    paddingHorizontal: 10,
    color: '#6366F1',
  },
  inputProduct:{
    borderRadius: 10,
    width: 250,
    height: 40,
    backgroundColor: 'white'
  },
  inputQuantity:{
    borderRadius: 10,
    width: 250,
    height: 40,
    backgroundColor: 'white'
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
    backgroundColor: '#6366F1',
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 5
  },
  btnText:{ 
    fontSize: 15,
    margin: 5,
    marginHorizontal: 20,
    color: 'white',
  }
  
});