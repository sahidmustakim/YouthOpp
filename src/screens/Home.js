import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text,SafeAreaView } from 'react-native'
import { Divider } from '@react-native-material/core';
import { Card } from 'react-native-elements';
import { db } from '../firebase/firebase';
import { collection, query, getDocs } from "firebase/firestore";


import PostCard from '../components/PostCard';
import HomeBar from '../components/HomeBar';
import { AuthContext } from '../providers/AuthProvider'

const Home = (props) => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        const q = query(collection(db, 'posts'))
        const querySnapshot = getDocs(q)
        querySnapshot.then((querySnapshot) => {
            const posts = []
            querySnapshot.forEach((doc) => {
                posts.push(doc.data())
            })
            setPosts(posts)
        })
    }, [posts])


    const renderPosts = () => {
        return posts.map((post) => {
            return (
                <PostCard post={post} />
            )
        })
    }

    const homeBar = () => {
        return (
            <HomeBar navigation={props.navigation} />
        )
    }


    return (
        <AuthContext.Consumer>
            {
                (auth) => (
                    <SafeAreaView style={styles.container}>

                        {
                            homeBar()
                        }
                        <Divider style={styles.divider} />
                        <Card>
                            <Text style={styles.appName}>Youth Opportunity</Text>
                            <Card.Divider />
                            <Text style={styles.slogan}>Unleashing the boundless potential of the next generation.</Text>
                        </Card>
                        
                        <View>
                            {
                                renderPosts()
                            }
                        </View>
                    </SafeAreaView>
                )
            }
        </AuthContext.Consumer>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e7e8',
    },
    divider: {
        backgroundColor: '#7605ff',
        height: 1,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        alignSelf: 'center',
        fontFamily: 'Cochin',
    },
    slogan: {
        flex: 1,
        fontSize: 18,
        fontFamily: 'Cochin',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Home