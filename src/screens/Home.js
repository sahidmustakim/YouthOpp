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
                    <View>
                        <Text>{auth.currentUser.email}</Text>
                        <Button title='Logout' onPress={() => logOut(auth)} />
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}

export default Home