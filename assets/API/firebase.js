
export const firebaseConfig = {
    apiKey: "AIzaSyBCUEbVyhoEsQH-ZQzcwXbzuwAdcLQev3E",
    authDomain: "best4sante-61097.firebaseapp.com",
    databaseURL: "https://best4sante-61097.firebaseio.com",
    projectId: "best4sante-61097",
    storageBucket: "best4sante-61097.appspot.com",
    messagingSenderId: "76849620029",
    appId: "1:76849620029:web:2350de3aed95f25cbef654",
    measurementId: "G-R7JTYSVW52"
}

export const  uploadImageAsync = async(uri) =>{
    console.log("manombola")
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
    
      const ref = firebase
        .storage()
        .ref()
        .child("navalona");
      const snapshot = await ref.put(blob);
    
      // We're done with the blob, close and release it
      blob.close();
    console.log("viate")
      return await snapshot.ref.getDownloadURL();
}

export const saveInfo = async(id,uri)  => {
    try{
        await firebase.database().ref('profile').set({ 
            idUser: id,
            photoUri :uri
         });
    }catch(err) {

    }
    
}