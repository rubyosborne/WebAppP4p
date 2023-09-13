import React from "react";
import styles from "./auth.module.css";
import videoSource from './Video.mp4'; // Import the video
import { BiLeaf } from 'react-icons/bi';


import { auth, googleProvider } from "../config/firebase";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(auth);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.background}>
           <div className={styles.logoContainer}>
    <span className={styles.logoText}>Eden</span>
    <BiLeaf className={styles.logoIcon} />
</div>


    <video autoPlay loop muted className={styles.videoBackground}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
            <div className={styles.cover}>
                <h1>Login</h1>
                <input
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Password..."
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={styles.LoginBtn} onClick={signIn}>Login</div>

                <p className={styles.text}> Or login using</p>

                <div className={styles.altLogin}>
                    <div className={styles.Google} onClick={signInWithGoogle}> </div>
                </div>

            </div>
        </div>
    );
};
export default Auth;
