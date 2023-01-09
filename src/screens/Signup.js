import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import React, { useState } from 'react';
import { Card, Input } from '@rneui/themed'
import { db } from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from '../providers/AuthProvider';

const Signup = ({ navigation }) => {

    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const onSubmit = async (authcontext) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const uid = userCredential.user.uid;
                try {
                    const hashPassword = atob(password)
                    const docRef = await addDoc(collection(db, "users"), {
                        name,
                        email,
                        hashPassword,
                        uid
                    });
                    console.log("Document written with ID: ", docRef.id);
                    setName('')
                    setEmail('')
                    setPassword('')
                    navigation.navigate("Signin")
                } catch (e) {
                    alert("Error adding document: ", e);
                }
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
                <View style={styles.container}>
                    <Card style={styles.card}>
                        <Card.Title style={styles.cardTitle}>Sign Up</Card.Title>
                        <Card.Divider />
                        <TextInput label='Name'  variant="outlined" value={name} onChangeText={setName} dense />
                        <TextInput label='Email' variant="outlined" value={email} onChangeText={setEmail} dense style={styles.input}/>
                        <TextInput label='Password' variant="outlined" value={password} onChangeText={setPassword} dense style={styles.input}/>
                        <TouchableOpacity style={styles.button} onPress={() => { onSubmit(authcontext) }}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                        <View style={styles.secondView}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Signin") }}>
                                <Text style={styles.signInButton}> Signin</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: '#dbd9de'
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
    button: {
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
    signInButton: {
        color: '#7605ff',
        fontFamily: 'erif',
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Signup;