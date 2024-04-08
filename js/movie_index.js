import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDy2-_qLegwN6JeEwv9I0Q6MT2F98MsPmk",
    authDomain: "movierank-a6de4.firebaseapp.com",
    projectId: "movierank-a6de4",
    storageBucket: "movierank-a6de4.appspot.com",
    messagingSenderId: "596989656968",
    appId: "1:596989656968:web:90abf8428fcc424f94c43d",
    measurementId: "G-RH5EV4QVKS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let docs = await getDocs(collection(db, "movies"));
docs.forEach(doc => {
    let row = doc.data();
    let title = row['title'];
    let detail_id = row['detail_id'];
    let poster = row['poster'];

    let temp_html = `
    <section class="4u"><a href="#" class="image featured"><img src="${poster}" alt=""
                        width="400" height="600"></a>
                <div class="box">
                    <p>${title}</p>
                    <a href="movie_detail.html?detail_id=${detail_id}" class="button">Read More</a>
                </div>
    </section>
    `
    $('#movies').append(temp_html);
});