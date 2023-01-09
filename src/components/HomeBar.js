import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { AuthContext } from '../providers/AuthProvider'
import { getAuth, signOut } from 'firebase/auth';
import { AppBar } from '@react-native-material/core';


const HomeBar = (props) => {
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

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                            <Image
                                source={require('../../assets/homeicon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Post')}>
                                <Image
                                    source={require('../../assets/posticon.png')}
                                    style={styles.image2}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => logOut(auth)}>
                                <Image
                                    source={require('../../assets/logouticon.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                )
            }
        </AuthContext.Consumer>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    buttons: {
        flexDirection: 'row',
    },
    image: {
        height: 40,
        width: 40,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 5,
    },
    opportunitiesText: {
        fontSize: 20,
        marginLeft: 10,
        color: '##7605ff',
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    image2: {
        height: 35,
        width: 35,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 5,
    },
})

export default HomeBar