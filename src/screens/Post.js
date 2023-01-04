import { StyleSheet, View, Button, Text, Image,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Input } from '@rneui/themed'
import { AuthContext } from '../providers/AuthProvider';
import { db } from '../firebase/firebase';
import { Card } from '@rneui/themed';

const Post = (props) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [officialMail, setOfficialMail] = useState('');
    const [companyRepresentativeMail, setCompanyRepresentativeMail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (title == '' || type == '' || officialMail == '' || companyRepresentativeMail == '' || name == '') {
            alert("Please fill all the fields")
        }
    }

    return (
        <AuthContext.Consumer>
            {
                (auth) => (
                    <View style={styles.container}>
                        {/* <Card>
                            <Card.Title>Post Opportunity</Card.Title>
                            <Card.Subtitle>Fill the form to post an opportunity</Card.Subtitle>
                            <Card.Divider /> */}
                        {/* headline */}
                        <View style={styles.titleContainer}>
                            <Image
                                source={require('../../assets/opportunity.png')}
                                style={styles.image}
                            />
                            <View style={styles.titleTextContainer}>
                                <Text style={styles.title}>Post Opportunity</Text> 
                                <Text style={styles.subtitle}>Fill the form to post an opportunity</Text> 
                            </View>
                        </View>
                        <View style={styles.spacer} />
                        <View style={styles.divider} />
                        <View style={styles.spacer} />
                        <Input style={styles.input} placeholder="Title" onChangeText={setTitle} />
                        <Input style={styles.input} placeholder="Type" onChangeText={setType} />
                        <Input style={styles.input} placeholder="Official Link" onChangeText={setOfficialMail} />
                        <Input style={styles.input} placeholder="Representative Name" onChangeText={setName} />
                        <Input style={styles.input} placeholder="Representative Mail" onChangeText={setCompanyRepresentativeMail} />
                        <View style={styles.divider} />
                        <View style={styles.spacer} />
                        <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                            <Text style={styles.postButton}>Post</Text>
                        </TouchableOpacity>
                        {/* <Button style = {styles.button} title='Post' onPress={handleSubmit} /> */}
                        {/* </Card> */}
                    </View>
                )
            }
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f102d',
        padding: 20,
        paddingTop: 50,
        paddingBottom: 50,
    },
    titleContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start'
    },
    image: {
      width: 55,
      height: 55,
      marginRight: 8,
      alignSelf: 'flex-start'
    },
    titleTextContainer: {
      alignSelf: 'flex-start'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'left'
    },
    subtitle: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'left'
    },
    spacer: {
      height: 25
    },
    divider: {
      height: 5,
      width: '100%',
      backgroundColor: '#f09053'
    },
    input: {
      width: 300,
      height: 50,
      borderWidth: 1,
      borderColor: '#f09053',
      borderRadius: 5,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      fontSize: 18,
      borderBottomColor: '#f09053',
      alignSelf: 'flex-start',
        color: '#fff',
    },
    button: {
        backgroundColor: '#f09053',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center'
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#f09053',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        color: '#fff',
    }
  });

export default Post;