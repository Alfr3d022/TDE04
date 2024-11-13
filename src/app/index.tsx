import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SectionList } from "react-native";
import { useEffect, useState } from "react";
import { Input } from "@/components/Input"
import { useProductDatabase, ProductDatabase } from "@/database/useProductDatabase"
import { Ionicons } from "@expo/vector-icons";
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
    <View style={styles.container}>
      <View style={styles.title}>
        <Ionicons name="bag-handle-outline" style={styles.iconTitle}/>
        <Text style={styles.txtTitle}>Lista de Compras</Text>
      </View>
      <View>
        <Text style={styles.text}>Produto</Text>
        <Input
            style={styles.inputProduct}
            // onChangeText={(newId) => setId(newId)}
            placeholder="Digite o produto..." onChangeText={setName} 
          />
        <Text style={styles.text}>Quantidade</Text>
        <Input
            style={styles.inputQuantity}
            // onChangeText={(newId) => setId(newId)}
            placeholder="Digite a quantidade..." onChangeText={setQuantity} 
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="add-circle-outline" style={styles.iconButton}/>
          <Text style={styles.btnText} onPress={create}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="list-outline" style={styles.iconButton}/>
          <Text style={styles.btnText}>Listar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>Pesquisar produto</Text>
        <Input 
          style={styles.inputSearch}
          placeholder="Pesquisar..." onChangeText={setSearch} />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product 
            data={item}
          />
        )}        
        showsVerticalScrollIndicator={true}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 40,
    borderRadius: 30,
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
    marginBottom: 4,
  },
  iconTitle:{
    fontSize: 25,
    paddingHorizontal: 10,
    color: '#6366F1',
  },
  inputProduct:{
    padding: 5,
    borderRadius: 10,
    width: 250,
    height: 40,
    backgroundColor: 'white'
  },
  inputQuantity:{
    padding: 5,
    borderRadius: 10,
    width: 250,
    height: 40,
    backgroundColor: 'white'
  },
  inputSearch:{
    padding: 5,
    borderRadius: 10,
    width: 250,
    height: 40,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  buttons:{
    flexDirection: 'row'
  },
  button:{
    marginTop: 15,
    backgroundColor: '#6366F1',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 40,
    marginHorizontal: 5,
    flexDirection: 'row'
  },
  btnText:{ 
    fontSize: 15,
    margin: 5,
    marginHorizontal: 2,
    color: 'white',
  },
  iconButton:{
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  }
  
});