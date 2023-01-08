import { View } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { db } from '../firebase/firebase';
import { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import PostCard from '../components/PostCard';
import HomeBar from '../components/HomeBar';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';


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
        backgroundColor: '#0f102d',
    },
    Divider: {
        backgroundColor: '#f09053',
        height: 5,
    },
    divider: {
        height: 1,
        width: '20%',
        backgroundColor: '#f09053'
    },

})

export default Home