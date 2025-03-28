const config = {
    
    firebaseApiKey: String(import.meta.env.VITE_FIREBASE_API_KEY ) ,
    firebaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ),
    firebaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID ),
    firebaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET  ),
    firebaseMessagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ),
    firebaseAppId: String(import.meta.env.VITE_FIREBASE_APP_ID ),
    firebaseCollectionId: String(import.meta.env.VITE_FIREBASE_COLLECTION_ID ),
    supabaseProjectUrl: String(import.meta.env.VITE_SUPABASE_PROJECT_URL),
    supabaseAnonKey: String(import.meta.env.VITE_SUPABASE_ANON_KEY),
    supabaseBucketName: String(import.meta.env.VITE_SUPABASE_BUCKET_NAME),
    tinyMceApiKey : String(import.meta.env.VITE_TINYMCE_API_KEY)
    

};



export default config;