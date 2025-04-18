
import config from "../config/config";
import {initializeApp} from 'firebase/app';
import { getFirestore, collection, setDoc, doc, updateDoc, deleteDoc, getDoc, getDocs, query, where } from "firebase/firestore";

import { createClient } from '@supabase/supabase-js'


 export class Service{

    firebaseConfig = {
        apiKey: config.firebaseApiKey,
        authDomain: config.firebaseAuthDomain ,
        projectId: config.firebaseProjectId,
        storageBucket: config.firebaseStorageBucket ,
        messagingSenderId: config.firebaseMessagingSenderId,
        appId: config.firebaseAppId
      };
        app;
        db;
        supabase;
        storage;

    constructor(){
        
        this.app = initializeApp(this.firebaseConfig);
        
        this.db = getFirestore(this.app);
        
        this.supabase = createClient(config.supabaseProjectUrl, config.supabaseAnonKey);

        this.storage = this.supabase.storage.from(config.supabaseBucketName);

        
    }

    async createPost({title, slug, content, featuredImage, status, userId, publicPost}) {
       
        
        try {

            const docInfo = await getDoc(doc(this.db, config.firebaseCollectionId, slug));
        
            
            if (docInfo.exists()) {
             throw error;
            } else {


              // let postObj = {
              //   title,
              //   content,
              //   status,
              //   featuredImage,
              //   userId
              // };

              // if(public){
              //   postObj.public = public
              // }

                
               await setDoc(doc(this.db, config.firebaseCollectionId, slug), {
                title,
                content,
                status,
                featuredImage,
                userId,
                publicPost
              });

              return true;
            }
  
        } catch (error) {
            console.log('Firebase service:: createPost error:: error', error);

            
            if (error.message == 'error is not defined') {
              return 'same slug error'
            }
            
            return false;
        }

    }


    

    async updatePost(slug,{title,  content, featuredImage, status}) {
        
        try {

            const data = featuredImage ? {
                title,
                content,
                status,
                featuredImage
              } 
              : {
                title,
                content,
                status
              };

             await updateDoc(doc(this.db, config.firebaseCollectionId, slug ),data);

            return true;
           
        } catch (error) {
            console.log('Firebase service:: createPost error:: error', error);
            
        }

    }

    
    async deletePost(slug) {
        
        try {

            await deleteDoc(doc(this.db, config.firebaseCollectionId, slug ));
            

            return true;
        } catch (error) {
            console.log('Firebase service:: deletePost error:: error', error);
            return false;
            
        }

    }



    async getPost(slug) {

        try {
            const docInfo = await getDoc(doc(this.db, config.firebaseCollectionId, slug));
        
            
            if (docInfo.exists()) {
             return {
               $id: docInfo.id,
               ...docInfo.data()
             } 
            } else {
                console.log('No such document');
              return false
            }
             
          }  catch (error) {
            console.log('Firebase service:: getPost error:: error', error);
            return false;
            
        }

    }


    

    async getPosts(queries = [where('status', '==', 'active')]){

        try {

            const q = query(collection(this.db, config.firebaseCollectionId), ...queries );
          
            
          const allDocs = await getDocs(q);

        let dataArr = allDocs.docs.map((doc) => {
 
          return {
            $id: doc.id,
            ...doc.data()
          };
         }
         );

         return dataArr;
        
         
 
        } catch (error) {
            console.log('Firebase service:: getPosts error:: error', error);
            return false;
            
        }
    }

 


    //file upload services


    async uploadFile(file){
        try {

             // let deleteConfirm = await this.deleteFile(file.name);

            //DeleteFile Does not give an error even if file does not exists which works in this case cause if file exists delete it

            // if(deleteConfirm === false){
            //   throw new Error('Error in deleteFile');
            // }

            let fileName = file.name;
            let subName = fileName.slice(fileName.lastIndexOf('.'));

            fileName = crypto.randomUUID() + subName;
         
             const fileObj = await this.storage.upload(fileName, file)
             
             
             if(fileObj.data ){
                return fileName;
             }

             throw new Error(fileObj.error.message);

           
        } catch (error) {
            console.log('Firebase service:: uploadFile error:: error', error);
            return false;
            
        }
    }

    async deleteFile(fileId){
        try {
            const  fileObj  = await this.storage.remove([fileId]);
            
            if(fileObj.data){
            return true;
            }

            throw new Error(fileObj.error.message);
            
        } catch (error) {
            console.log('Firebase service:: deleteFile error:: error', error);
            return false;
        }
    }


    

    getFilePreview(fileId,quality = undefined){

        if(quality){
  
        quality = {
         transform:{
           quality: quality
         }
        }
     }

      const fileObj  = this.storage.getPublicUrl(fileId, quality );
     
      

      return fileObj.data.publicUrl;
     

    }

 }

  const service = new Service();


export default service;