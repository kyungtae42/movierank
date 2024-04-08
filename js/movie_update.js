const urlParams = new URL(location.href).searchParams;
const detail_id = urlParams.get('detail_id');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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
const movie_update = collection(db, "movie_detail")

let docs = doc(db, "movie_detail", detail_id);
let movie_detail = await getDoc(docs);
let row = movie_detail.data();
let title = row['title'];
let poster = row['poster'];
let link = row['link'];
let date = row['date'];
let director = row['director'];
let actor = row['actor'];
let sum_id = row['sum_id'];
$('#title').val(title);
$('#poster').val(poster);
$('#link').val(link);
$('#date').val(date);
$('#director').val(director);
$('#actor').val(actor);

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
    let movie_sum = {
        'title': title,
        'poster': poster
    }
    await updateDoc(doc(movies, sum_id), movie_sum);
    await updateDoc(doc(movie_update, detail_id), movie_info);
    window.location.href = "index.html";
})