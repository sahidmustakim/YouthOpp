import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
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
                    <Image source={require('../../assets/opportunity.png')} style={styles.logo} />
                    <Card style={styles.card}>
                        <Card.Title>Sign Up</Card.Title>
                        <Input style={styles.input} placeholder=" Enter your name" onChangeText={setName} />
                        <Input style={styles.input} placeholder=" Enter your email" onChangeText={setEmail} />
                        <Input style={styles.input} placeholder=" Enter your password" secureTextEntry={true} onChangeText={setPassword} />
                        <TouchableOpacity style={styles.button} onPress={() => { onSubmit(authcontext) }}>
                            <Text>Signup</Text>
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
        backgroundColor: '#0f102d'
    },
    input: {
        borderColor: '#0f102d'
    },
    button: {
        backgroundColor: '#f09053',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#f09053',
        padding: 10,
        borderColor: '#f09053',
        borderWidth: 1,
        borderRadius: 5
    },
    secondView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
    signInButton: {
        color: '#f09053',
        marginLeft: 5
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
});

export default Signup;