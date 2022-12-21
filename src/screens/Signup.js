import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
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
                // Signed in 
                const uid = userCredential.user.uid;

                // add 2 db
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
                // ...

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
    }


    return (
        <AuthContext.Consumer>
            {(authcontext) => (
                <View style={styles.container}>
                    <Card>
                        <Card.Title>Sign Up</Card.Title>
                        <Input style={styles.input} placeholder=" Enter your name" onChangeText={setName} />
                        <Input style={styles.input} placeholder=" Enter your email" onChangeText={setEmail} />
                        <Input style={styles.input} placeholder=" Enter your password" secureTextEntry={true} onChangeText={setPassword} />
                        <TouchableOpacity style={styles.button} onPress={() => {
                            onSubmit(authcontext)
                        }}>
                            <Text>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("Signin") }}>
                            <Text>Already have an account? Signin</Text>
                        </TouchableOpacity>
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

export default Signup;