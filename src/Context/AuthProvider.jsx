import { createContext, useEffect, useState } from 'react'
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth'
import app from '../Firebase/firebase.config'
import axios from 'axios'

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create user with email
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign in user with email
    const signInWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign in with facebook

    const provider = new FacebookAuthProvider()
    const signInFacebook = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const loggedEmail = { email: currentUser?.email }
            setUser(currentUser)
            setLoading(false)

            // if user exist then issue a token
            if (currentUser) {
                axios
                    .post('https://car-management-server-nine.vercel.app/jwt', loggedEmail, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log('token response:', res.data)
                    })
            } else {
                axios
                    .post('https://car-management-server-nine.vercel.app/logout', loggedEmail, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log('logout response:', res.data)
                    })
            }
        })
        return () => {
            return unSubscribe()
        }
    }, [user?.email])

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const userUpdateProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signInWithEmail,
        logOut,
        signInFacebook,
        signInWithGoogle,
        userUpdateProfile,
    }

    return (
        <AuthContext.Provider value={ authInfo }>{ children }</AuthContext.Provider>
    )
}

export default AuthProvider
