import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { Card, Input } from '@rneui/themed'
import { AuthContext } from '../providers/AuthProvider';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { TextInput } from "@react-native-material/core";


const Signin = ({ navigation }) => {

    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const onSubmit = (authcontext) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                authcontext.setIsLoggedIn(true)
                authcontext.setCurrentUser(userCredential.user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    return (
        <AuthContext.Consumer>
            {(authcontext) => (
                <SafeAreaView style={styles.container}>
                    <Card>
                        <Card.Title style={styles.cardTitle} >Sign In</Card.Title>
                        <Card.Divider />
                        <TextInput label = "Email" variant="outlined" value={email} onChangeText={setEmail} dense />
                        <TextInput label = "Password"  variant="outlined" value={password} onChangeText={setPassword} secureTextEntry={true} dense style={styles.input}/>
                        <TouchableOpacity style={styles.signInButton} onPress={() => { onSubmit(authcontext) }}>
                            <Text style={styles.signInButtonText}>Sign In</Text>
                        </TouchableOpacity>
                        <View style={styles.secondView}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                                <Text style={styles.signUpButton}> Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </SafeAreaView>
            )}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e6e7e8'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7605ff',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'serif'
    },
    input: {
       marginTop: 15,
    },
    signInButton: {
        backgroundColor: '#7605ff',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        color: 'white',
        fontFamily: 'serif',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35
    },
    secondView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    signUpButton: {
        color: '#7605ff',
        fontFamily: 'erif',
        fontSize: 15,
        fontWeight: 'bold',
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Signin;