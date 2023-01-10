import React from 'react'
import { Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { AuthContext } from '../providers/AuthProvider'
import { getAuth, signOut } from 'firebase/auth';


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

                    <SafeAreaView style={styles.header}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                            <Image
                                source={require('../../assets/homeicon.png')}
                                style={styles.homeIcon}
                            />
                        </TouchableOpacity>
                        <SafeAreaView style={styles.buttons}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Post')}>
                                <Image
                                    source={require('../../assets/posticon.png')}
                                    style={styles.postIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => logOut(auth)}>
                                <Image
                                    source={require('../../assets/logouticon.png')}
                                    style={styles.logOutIcon}
                                />
                            </TouchableOpacity>
                        </SafeAreaView>
                    </SafeAreaView>


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
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttons: {
        flexDirection: 'row',
    },
    opportunitiesText: {
        fontSize: 20,
        marginLeft: 10,
        color: '##7605ff',
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    homeIcon: {
        height: 38,
        width: 38,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    postIcon: {
        height: 35,
        width: 35,
        marginTop: 15,
        marginBottom: 10
    },
    logOutIcon: {
        height: 43,
        width: 43,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
})

export default HomeBar