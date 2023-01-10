import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Linking, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from '@rneui/themed';

const PostCard = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Card style={styles.card}>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <SafeAreaView style={styles.cardContainer}>
                    <Image
                        source={require('../../assets/cardOpp.png')}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.post.title}</Text>
                        <Text style={styles.type}>{props.post.type}</Text>
                    </View>
                </SafeAreaView>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <Card>
                        <Image
                            source={require('../../assets/cardOpp.png')}
                            style={styles.innerImage}
                        />
                        <View style={styles.innerTextContainer}>
                            <Text style={styles.innerTitle}>Title: </Text>
                            <Text style={styles.innerDescription}>{props.post.title}</Text>
                            <Text style={styles.innerTitle}>Description: </Text>
                            <Text style={styles.innerDescription}>{props.post.description}</Text>
                            <Text style={styles.innerTitle}>Type: </Text>
                            <Text style={styles.innerDescription}>{props.post.type}</Text>
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL(props.post.officialLink)}>
                            <Text style={[styles.innerLink, styles.button]}>Official Link</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={[styles.closeButton, styles.button]}>Close</Text>
                        </TouchableOpacity>
                    </Card>
                </SafeAreaView>
            </Modal>
            
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'serif',
    },
    type: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'serif',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbd9de',
    },
    innerImage: {
        width: '100%',
        height: 200,
    },
    innerTextContainer: {
        padding: 20,
    },
    innerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    innerDescription: {
        fontSize: 14,
        fontFamily: 'serif',
    },
    button: {
        backgroundColor: '#7605ff',
        marginTop: 20,
        borderColor: '#7605ff',
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'center',
        flex: 1,
        color: '#fff',
        fontFamily: 'serif',
    },
    innerLink: {
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 5.35,
        fontSize: 14,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        fontSize: 18,
    },
});

export default PostCard;

