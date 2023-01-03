import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { Button } from '@rneui/base';
import { getAuth, signOut } from 'firebase/auth';


const Home = (props) => {

    const logOut = (authcontext) => {
        const auth = getAuth()
        signOut(auth)
            .then(res => {
                alert('Signed Out')
                authcontext.setIsLoggedIn(false)
                authcontext.setCurrentUser(null)
            })
            .catch(err => {
                alert(err.message)
            })
    }

    return (
        <AuthContext.Consumer>
            {
                (auth) => (
                    <View style = {styles.container}>
                        <Text  style ={styles.userInfo}>{auth.currentUser.name}</Text>
                        <Text  style ={styles.userInfo}>{auth.currentUser.email}</Text>
                        <Button style = {styles.logOutButton} title='Post' onPress={() => props.navigation.navigate('Post')} />
                        <Button style = {styles.logOutButton} title='Logout' onPress={() => logOut(auth)} /> 
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f102d'
    },
    userInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#f09053'
    },
    logOutButton: {
        backgroundColor: '#f09053',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center'
    }

}
export default Home