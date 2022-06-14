import axios from 'axios'
import React from 'react'
import { Text, View} from 'react-native'
import { useEffect , useState} from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Headline, List,FAB } from 'react-native-paper'
import globalStyles from '../styles/global'


const Inicio = ({navigation, route}) => {

  //state
  const [clientes,setClientes]=useState([]);
  const [consultarAPI, setConsultarAPI]=useState(true);

  useEffect(() => {
      const obtenerClientesAPI = async()=>{
        try {
          const resultado = await axios.get('http://192.168.18.173:3000/clientes');
          setClientes(resultado.data)
          setConsultarAPI(false);
        } catch (error) {
          console.log(error)
        }
      }
      if(consultarAPI){
        obtenerClientesAPI();
      }
    
    }, [consultarAPI])

  return (
    
        <View style={globalStyles.contenedor}>
          {clientes.length>0 ? <Headline style={globalStyles.titulo}>Clientes</Headline>:<Headline>No hay Clientes Registrados</Headline>}
              <FlatList
                data={clientes}
                keyExtractor={cliente => (cliente.id).toString()}
                renderItem={({item})=>(
                  <List.Item
                    title={item.nombre}
                    description={item.empresa}
                    onPress={()=> navigation.navigate('DetallesCliente',{item, setConsultarAPI})}
                  />
                )}
              /> 
          <FAB
            icon='plus'
            style={globalStyles.fab}
            onPress={()=> navigation.navigate('NuevoCliente',{setConsultarAPI})}
          />
        </View>
        
  )
}

export default Inicio