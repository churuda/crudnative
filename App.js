import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {DefaultTheme,Provider as PaperProvider} from 'react-native-paper';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Views/Inicio';
import DetallesCliente from './Views/DetallesCliente';
import NuevoCliente from './Views/NuevoCliente';
import BarraSuperior from './components/ui/Barra';

const Stack=createStackNavigator();

const App= () => {

  // Definir el tema
  const theme ={
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      primary:'#1774F2'
    }
  }


  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerStyle:{
              backgroundColor:theme.colors.primary
            },
            headerTintColor:theme.colors.surface,
            headerTitleStyle:{
              fontWeight:'bold'
            },
            headerTitleAlign:'center'
          }}
        >
          <Stack.Screen
            component={Inicio}
            name='Inicio'
            options={({navigation,route})=>({
              headerLeft:(props)=> <BarraSuperior {...props}
                                      navigation={navigation}
                                      route={route}
                                  />
            })}
          />
          <Stack.Screen
            component={NuevoCliente}
            name='NuevoCliente'
            options={{
              title:'Nuevo Cliente'          
            }}
          />
          <Stack.Screen
            component={DetallesCliente}
            name='DetallesCliente'
            options={{
              title:'Detalles Cliente'          
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({


});

export default App;
