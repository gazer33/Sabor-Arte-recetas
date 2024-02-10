import Image from "next/image";
import styles from "./page.module.css";
import {AuthForm} from "./auth-form";
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { cookies } from 'next/headers'
import { createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import Link from "next/link";


export default async function Home() {

const cookieStore = cookies();
const supabase = createServerComponentClient({cookies: () => cookieStore});

const {data: {user}} = await supabase.auth.getUser() 

console.log({user})

if (!user) {
return(
<main className={styles.main}>
<Link href={'/login'}> 
    
You are not logged in. Click here to go login.
</Link>

</main>
)
}

return (
    <div className="row">
    <div className="col-6">
      <h1 className="header">Supabase Auth + Storage</h1>
      <p>
        Experience our Auth and Storage through a simple profile management example. Create a user
        profile and upload an avatar image. Fast, simple, secure.
      </p>
    </div>
    <div className="col-6 auth-widget">
       
    </div>
  </div>
  );
}
