import { View } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { db } from '../firebase/firebase';
import { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import PostCard from '../components/PostCard';
import HomeBar from '../components/HomeBar';
import { StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { Text } from 'react-native-web';

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
                    <View style={styles.container}>

                        {
                            homeBar()
                        }
                        <Divider style={styles.Divider} />
                        <Text style={styles.appName}>Youth Opportunity</Text>
                        <Text style={styles.slogan}>Unleashing the boundless potential of the next generation</Text>

                        <View>
                            {
                                renderPosts()
                            }
                        </View>
                    </View>
                )
            }
        </AuthContext.Consumer>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbd9de',
    },
    Divider: {
        backgroundColor: '#7605ff',
        height: 5,
    },
    divider: {
        height: 1,
        width: '20%',
        backgroundColor: '#7605ff'
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        alignSelf: 'center',
        fontFamily: 'serif',
    },
    slogan: {
        fontSize: 18,
        marginBottom: 10,
        alignSelf: 'center',
        fontFamily: 'serif',
        marginVertical: 10,
    },
})

export default Home