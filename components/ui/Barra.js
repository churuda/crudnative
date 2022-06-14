import React from 'react'
import { Button } from 'react-native-paper'
const BarraSuperior = ({navigation, route}) => {

    const handlePress =()=>{
        navigation.navigate('NuevoCliente')
    }

  return (
    <Button
        onPress={()=> handlePress()}
        // color='#FFFF'
        // icon="plus-circle"
    >
        {/* Cliente */}
    </Button>
  )
}

export default BarraSuperior