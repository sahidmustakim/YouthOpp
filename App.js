import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './src/screens/Signup';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Signin from './src/screens/Signin';
import { AuthContext, AuthProvider } from './src/providers/AuthProvider';
import Home from './src/screens/Home';
import Post from './src/screens/Post';

const authStack = createStackNavigator()
const homeStack = createStackNavigator()

const HomeStack = () => {
  return (
    <homeStack.Navigator initialRouteName='Home'>
      <homeStack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <homeStack.Screen name="Post" component={Post} options={{ headerShown: false }}/>
    </homeStack.Navigator>
  )
}


const AuthStack = () => {
  return (
    <authStack.Navigator initialRouteName='Signin'>
      <authStack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
      <authStack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    </authStack.Navigator>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {
          (auth) => (
            <NavigationContainer>
              {
                auth.isLoggedIn ? <HomeStack /> : <AuthStack />
              }
            </NavigationContainer>
          )
        }
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
