import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, doc, getDocs, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

const movies = collection(db, "movies");
const movie_detail = collection(db, "movie_detail")
$("#savebtn").click(async function () {
    let title = $('#title').val();
    let poster = $('#poster').val();
    let link = $('#link').val();
    let date = $('#date').val();
    let director = $('#director').val();
    let actor = $('#actor').val();

    let movie_info = {
        'title': title,
        'poster': poster,
        'link': link,
        'date': date,
        'director': director,
        'actor': actor
    }
    let generated_movie = await addDoc(collection(db, "movie_detail"), movie_info);
    
    let movie_sum = {
        'title': title,
        'poster': poster,
        'detail_id': generated_movie.id 
    }
    let generated_movie_sum = await addDoc(collection(db, "movies"), movie_sum);
    await updateDoc(doc(movie_detail, generated_movie.id), {'sum_id' : generated_movie_sum.id})
    window.location.href = "index.html";
})