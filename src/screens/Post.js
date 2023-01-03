import { StyleSheet, View, Button } from 'react-native';
import React, { useState } from 'react';
import { Input } from '@rneui/themed'
import { AuthContext } from '../providers/AuthProvider';
import { Card } from '@rneui/themed';


const Post = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eligibilities, setEligibilities] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [deadline, setDeadline] = useState('');
    const [officialMail, setOfficialMail] = useState('');
    const [companyRepresentativeMail, setCompanyRepresentativeMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = () => {
        console.log(title, description, eligibilities, image, type, deadline, officialMail, companyRepresentativeMail, phoneNumber, name);
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
                            <Input style={styles.input} placeholder="Title" onChangeText={setTitle} />
                            <Input style={styles.input} placeholder="Description" onChangeText={setDescription} />
                            {/* {
                                console.log(auth.isLoggedIn)
                            } */}
                            <Input style={styles.input} placeholder="Eligibilities" onChangeText={setEligibilities} />
                            <Input style={styles.input} placeholder="Image" onChangeText={setImage} />
                            <Input style={styles.input} placeholder="Type" onChangeText={setType} />
                            <Input style={styles.input} placeholder="Deadline" onChangeText={setDeadline} />
                            <Input style={styles.input} placeholder="Official Mail" onChangeText={setOfficialMail} />
                            <Input style={styles.input} placeholder="Company Representative Mail" onChangeText={setCompanyRepresentativeMail} />
                            <Input style={styles.input} placeholder="Phone Number" onChangeText={setPhoneNumber} />
                            <Input style={styles.input} placeholder="Name" onChangeText={setName} />
                            <Button onPress={handleSubmit}>Submit</Button>
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
        backgroundColor: '#0f102d'
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'ash',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: '#0f102d',
        fontSize: 18,
        borderBottomColor: '#f09053',
    }
});

export default Post;