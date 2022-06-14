import React,{useState,useEffect} from 'react'
import { View,StyleSheet } from 'react-native'
import { TextInput,Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'


const NuevoCliente = ({navigation, route}) => {

    //Campos del formulario
    const [nombre, setNombre]=useState('');
    const [telefono, setTelefono]=useState('');
    const [correo, setCorreo]=useState('');
    const [empresa, setEmpresa]=useState('');
    const [visible, setVisible]=useState(false);
    const {setConsultarAPI}=route.params;
    //Alerts
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    //Datos a traves de params
    const {cliente}=route.params;
  
    //Comprobar si se crea o se edita el formulario
    useEffect(() => {
        if (cliente){
            const {nombre, telefono, correo,empresa}=cliente;
            setNombre(nombre);
            setTelefono(telefono);
            setCorreo(correo);
            setEmpresa(empresa);
        }
    }, [])
    
    //Almacenar al cliente en la DB
    const guardarCliente = async () => {
        //validate
        if (nombre === '' || telefono === '' || correo === '' || empresa ===''){
          showModal();
            return
        }

        const cliente={nombre, telefono, correo,empresa};

        //guardar el cliente en la API
        if (route.params.cliente){
            const {id}=route.params.cliente;
            cliente.id=id
            const url=`http://192.168.18.173:3000/clientes/${id}`
            try {
                await axios.put(url,cliente)
            } catch (error) {
             console.log(error)
            }
        }else{
            try {
                await axios.post('http://192.168.18.173:3000/clientes/',cliente)
            } catch (error) {
                console.log(error)
            }
        }

        //redireccionar
        navigation.navigate('Inicio')
        //limpiar el formulario
        setNombre('');
        setTelefono('');
        setEmpresa('');
        setCorreo('');
        //cuando se agrega un nuevo cliente
        setConsultarAPI(true);     
    }

  return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
            <TextInput
                label="Nombre"
                placeholder="Nombres y Apellidos"
                style={styles.input}
                onChangeText={(text)=>setNombre(text)}
                value={nombre}
            />
             <TextInput
                label="Teléfono"
                placeholder="099xxx"
                style={styles.input}
                onChangeText={(text)=>setTelefono(text)}
                value={telefono}
            />
            
            <TextInput
                label="Correo"
                placeholder="correo@correo"
                style={styles.input}
                onChangeText={(text)=>setCorreo(text)}
                value={correo}
            />
            <TextInput
                label="Empresa"
                placeholder="Nombre de la empresa"
                style={styles.input}
                onChangeText={(text)=>setEmpresa(text)}
                value={empresa}
            />

            <Button
                icon='pencil-circle'
                mode='contained'
                style={styles.boton}
                onPress={()=>guardarCliente()}
            >
               {cliente ? 'guardar cambios': 'guardar cliente'}
            </Button>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={hideModal}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button style={{marginRight:20}} onPress={hideModal}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
  )
}
const styles = StyleSheet.create({
    input:{
        marginBottom:20,
        backgroundColor:"transparent"
    },
    boton:{
        borderRadius:20,
        marginHorizontal:'5%',
        marginTop:20
    }
})
export default NuevoCliente