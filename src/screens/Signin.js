import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Card, Input } from '@rneui/themed'
import { AuthContext } from '../providers/AuthProvider';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from '@rneui/base';

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
                    <Card>
                        <Card.Title>Sign In</Card.Title>
                        <Input style={styles.input} placeholder=" Enter your email" onChangeText={setEmail} />
                        <Input style={styles.input} placeholder=" Enter your password" onChangeText={setPassword} secureTextEntry={true} />
                        <TouchableOpacity style={styles.button} onPress={() => { onSubmit(authcontext) }}>
                            <Text>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                            <Text>Don't have an accout? Signup</Text>
                        </TouchableOpacity>
                        {/* <Button title='Log in with Google' onPress={() => { onSubmitWithGoogle(authcontext) }} /> */}
                    </Card>
                </View>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        margin: 10,
        padding: 5
    },
    button: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center'
    }
});

export default Signin;