    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
    import {
      getFirestore, collection, addDoc, serverTimestamp,
      onSnapshot, query, orderBy
    } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };

    const app = initializeApp(firebaseConfig);
    const db  = getFirestore(app);
    const form        = document.getElementById("commentForm");
    const commentsCol = collection(db, "comments");  
    let error = document.querySelector("#error");

    document.addEventListener("DOMContentLoaded", function() {
            const menuIcon = document.querySelector('.menu-icon');
            const navLinks = document.querySelector('.nav-links');

            menuIcon.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    if(window.innerWidth <= 768){
                        navLinks.classList.remove('active');
                    }
                });
            });
        });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const docData = {
        name:    form.name.value.trim(),
        email:   form.email.value.trim(),
        message: form.comment.value.trim(),
        created: serverTimestamp()
      };
      
      try {
        await addDoc(commentsCol, docData); 
        error.innerText = "Message sent successfully";
        form.reset();                         
      } catch (err) {
        console.error(err);
        error.innerText = "Error in sending the message"
      }
    });
    
    // const q = query(commentsCol, orderBy("created", "desc"));
    // onSnapshot(q, (snap) => {
    //     commentList.innerHTML = "";            // wipe & paint fresh
    //     snap.forEach((doc) => {
    //     const { name, message } = doc.data();
    //     // commentList.insertAdjacentHTML(
    //     //     "beforeend",
    //     //     `<div class="comment">
    //     //     <h4>${name}</h4>
    //     //     <p>${message}</p>
    //     //     </div>`
    //     // );
    //     });
    // });

    let date = document.querySelector("#date");
    let time = document.querySelector("#time");
    
    setInterval( () => {
        let d = new Date();
        time.innerHTML = d.toLocaleTimeString();
    }, 1000);
    
    setInterval( () => {
        let d = new Date();
        date.innerHTML = d.toLocaleDateString();
    }, 1000);