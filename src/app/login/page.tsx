'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import styles from './page.module.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) 

    const supabase = createClientComponentClient() ;


    useEffect(() => {
        async function getUser(){
            const {data: {user}} = await supabase.auth.getUser() 
            setUser(user)
            setLoading(false)

        }
        getUser();
        
    })

    const handleSignUp = async () => {
      const res =  await supabase.auth.signUp({
            email, 
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        }) 
        setUser(res.data.user )
        router.refresh()
        setEmail('')
        setPassword('')
    }

    const handleSignIn = async () => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password
        })
        setUser(res.data.user)
        router.refresh();
        setEmail('')
        setPassword('')
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
        setUser(null)
    }

    console.log({loading, user});
    
    if(loading) {
        return <h1>loading..</h1>
    }


    if (user) {
        return (
            <div className={styles.main}>
                <div className ={styles.inputs}>
                    <h1>You are already logged in</h1>
                    <button onClick={handleLogout}
                    className = {styles.btnContainer}
                    >

                        Logout
                    </button>
                </div>
            </div>
        )
    }

    return(
     <main className={styles.main}>
        <div className={styles.container}>
            <div className={styles.inputContainer}>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} 
        className={styles.inputs}  />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputs} />
        </div>
        <div className={styles.btnContainer}>
        <button onClick={handleSignUp}>Sign up</button>
        <button onClick={handleSignIn}>Sign In</button>
        </div>
    </div>

     </main>   
    )
}