import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Input } from '@rneui/themed'
import { AuthContext } from '../providers/AuthProvider';
import { db } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { Picker } from 'react-native-web';
import { Divider } from "@react-native-material/core";

const Post = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('None');
  const [officialLink, setOfficialLink] = useState('');
  const [companyRepresentativeMail, setCompanyRepresentativeMail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (authcontext) => {
    if (title === '' || type === 'Type' || officialLink === '' || companyRepresentativeMail === '' || name === '') {
      alert('Please fill all the fields')
    } else {
      try {
        await addDoc(collection(db, "posts"), {
          title: title,
          description: description,
          type: type,
          officialLink: officialLink,
          companyRepresentativeMail: companyRepresentativeMail,
          name: name,
          uid: authcontext.currentUser.uid,
        });
        setName('')
        setDescription('')
        setTitle('')
        setType('None')
        setOfficialLink('')
        setCompanyRepresentativeMail('')
        alert('Post added successfully')
        props.navigation.navigate('Home')
      } catch (error) {
        alert(error)
      }

    }
  }

  const goToHome = () => {
    props.navigation.navigate('Home')
  }

  return (
    <AuthContext.Consumer>
      {
        (auth) => (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={goToHome}>
                <Image
                  source={require('../../assets/homeicon.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <View style={styles.titleTextContainer}>
                <Text style={styles.title}>Post Opportunity</Text>
                <Text style={styles.subtitle}>Fill the form to post an opportunity</Text>
              </View>
            </View>
            <View style={styles.spacer} />
            <Divider style={styles.divider} />
            <View style={styles.spacer} />
            <Input style={styles.input} placeholder="Title" onChangeText={setTitle} />
            <Input style={styles.input} placeholder="Description" onChangeText={setDescription} />
            <Picker style={styles.picker} selectedValue={type} onValueChange={(itemValue, itemIndex) => setType(itemValue)} >
              <Picker.Item label="None" value="Type" color="#000" />
              <Picker.Item label="Internship" value="Internship" color="#000"/>
              <Picker.Item label="Competition" value="Competition" color="#000" />
              <Picker.Item label="Scholarship" value="Scholarship" color="#000" />
              <Picker.Item label="Jobs" value="Jobs" color="#000" />
            </Picker>
            <Input style={styles.input} placeholder="Official Link" onChangeText={setOfficialLink} />
            <Input style={styles.input} placeholder="Representative Name" onChangeText={setName} />
            <Input style={styles.input} placeholder="Representative Mail" onChangeText={setCompanyRepresentativeMail} />
            <View style={styles.spacer} />
            <Divider style={styles.divider} />
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit(auth)}>
              <Text style={styles.postButton}>Post</Text>
            </TouchableOpacity>
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
    backgroundColor: '#dbd9de',
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  image: {
    width: 50,
    height: 50,
  },
  titleTextContainer: {
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'serif',
  },
  spacer: {
    height: 25
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'black'
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: .5,
    borderColor: '#d4b0ff',
    borderRadius: 5,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
    alignSelf: 'flex-start',
    color: '#fff',
    backgroundColor: 'white',

  },
  button: {
    backgroundColor: '#7605ff',
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35
  },
  postButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  picker: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#d4b0ff',
    color: 'black',
    backgroundColor: 'white',
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Post;