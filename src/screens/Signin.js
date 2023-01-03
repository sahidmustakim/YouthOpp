import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Card, Input } from '@rneui/themed'
import { AuthContext } from '../providers/AuthProvider';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

const Signin = ({ navigation }) => {

    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const onSubmit = (authcontext) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                authcontext.setIsLoggedIn(true)
                authcontext.setCurrentUser(userCredential.user)

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    const onSubmitWithGoogle = (authcontext) => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user) 

                authcontext.setIsLoggedIn(true)
                authcontext.setCurrentUser(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert(errorMessage)
                // ...
            });
    }



    return (
        <AuthContext.Consumer>
            {(authcontext) => (
                <View style={styles.container}>
                    <Image source={require('../../assets/opportunity.png')} style={styles.logo}/>
                    <Card style={styles.card}>
                        <Card.Title>Sign In</Card.Title>
                        <Input style={styles.input} placeholder=" Enter your email" onChangeText={setEmail} />
                        <Input style={styles.input} placeholder=" Enter your password" onChangeText={setPassword} secureTextEntry={true} />
                        {
                            console.log(authcontext.isLoggedIn)
                        }
                        <TouchableOpacity style={styles.signInButton} onPress={() => { onSubmit(authcontext) }}>
                            <Text>Sign In</Text>
                        </TouchableOpacity>
                        <View style={styles.secondView}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                                <Text style={styles.signUpButton}> Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    card:{
        width: 300,
        height: 300,
        backgroundColor: '#f09053',
        padding: 10,
        borderRadius: 5
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#0f102d'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#f09053',
        justifyContent: 'center'
    },
    input: {
        width: 200,
        height: 40
    },
    signInButton: {
        backgroundColor: '#f09053',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center'
    },
    secondView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
    signUpButton: {
        color: '#f09053'
    },
    bottomLine: {
        color: '#f09053',
        marginTop: 10,
        fontSize: 10,
        textAlign: 'center',
        fontSize: '10px',
        fontFamily: 'roboto',
        fontStyle: 'italic'
    }

});

export default Signin;