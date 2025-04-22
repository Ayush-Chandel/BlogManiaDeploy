
import config from "../config/config";



 import {initializeApp} from 'firebase/app';
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
 
 

export class AuthService{

    firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain ,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket ,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId
  };
    app;
    auth;
    unSub = null;

    constructor(){
        this.app = initializeApp(this.firebaseConfig);

        this.auth = getAuth(this.app);
    }

    async createAccount({email,password}){

        try {
          const userAccount = await createUserWithEmailAndPassword(this.auth, email, password);

          if (userAccount) {
            
           return this.login({email,password});
           } else {
            return userAccount;
           }
        } catch (error) { 
            throw error;
        }

    }

    async login({email, password}){
        
        try {
          return await signInWithEmailAndPassword(this.auth, email, password)
        } catch (error) {
            throw error;
        }

    }
    
    
     async getCurrentUser(){


           try {

           let userData = await new Promise((resolve, reject) => {

            
            this.unSub = onAuthStateChanged(this.auth, (userData) => {
                if(userData){
                    userData = {
                       uid:  userData.uid
                    }
                    resolve(userData);
                    
                    
                    
                }else{
                    reject('User is not signed in')
                }

            }

            )
            
           

           });
           
            this.unSub();

            return userData;
            
         } catch (error) {
            this.unSub();
            console.log('Firebase service :: getCurrentUser :: error' , error);
            return null;
         }
 
         
        
    }

   

    async logout(){
        try {
            await signOut(this.auth);
        } catch (error) {
            console.log('Firebase service :: logout :: error' , error);
        }
    }

}

const authService = new AuthService();



export default authService; 

