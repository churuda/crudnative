import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Headline,Text,Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
const DetallesCliente = ({navigation, route}) => {

  const {nombre, empresa, telefono, correo, id}=route.params.item;
  const {setConsultarAPI} = route.params

  const mostrarConfirmacion =()=>{
    Alert.alert(
      '¿Deseas eliminar este cliente?',
      'Un cliente eliminado no se puede recuperar',
      [
        {text:'OK', onPress:()=>eliminarContacto()},
        {text:'Cancelar', style: 'cancel'}
      ]

    )
  }

  const eliminarContacto =async ()=>{
    const url = `http://192.168.18.173:3000/clientes/${id}`
    try {
      await axios.delete(url)
      //Redireccionar
      navigation.navigate('Inicio')
      //Consultar de nuevo la API
      setConsultarAPI(true)
    } catch (error) {
      if(error){
        <Text>Error de red Intente otra vez</Text>
      }
    }
  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={{marginBottom:10,fontSize:18, fontWeight:'700'}}>Empresa: <Subheading>{empresa}</Subheading></Text>
      <Text style={{marginBottom:10,fontSize:18, fontWeight:'700'}}>Correo: <Subheading>{correo}</Subheading></Text>
      <Text style={{marginBottom:10,fontSize:18, fontWeight:'700'}}>Teléfono: <Subheading>{telefono}</Subheading></Text>
      <Button
        style={styles.boton}
        mode='contained'
        icon='cancel'
        onPress={()=>mostrarConfirmacion()}
      >ELIMINAR CLIENTE
      </Button>
      <FAB
        style={globalStyles.fab}
        icon='pencil'
        onPress={()=>navigation.navigate('NuevoCliente',{setConsultarAPI,cliente:route.params.item})}
      ></FAB>
    </View>
  )
}
const styles=StyleSheet.create({
  boton:{
    backgroundColor:'red',
    marginTop:100,
    borderRadius:20,
    marginHorizontal:'5%'
  }
})
export default DetallesCliente