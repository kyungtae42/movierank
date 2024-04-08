const urlParams = new URL(location.href).searchParams;
const detail_id = urlParams.get('detail_id');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
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
let docs_sum = doc(db, "movies", sum_id);
let temp_html = `
    <div id="sidebar" class="4u">
        <section>
            <header class="major">
                <h2>예고편</h2>
                <iframe width="320" height="240"
                src="${link}"
                    frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </header>
        </section>

    </div>

    <div id="content" class="8u skel-cell-important">
        <section>
            <header class="major">
                <h2>${title}</h2>
                <span class="byline">${date}</span>
            </header>
            <img src="${poster}" alt=""
                    width="400" height="600">
            <p>${director}</p>
            <hr>
            <p>${actor}</p>
            <hr>
            <button type="button" id="updatebtn" class="btn btn-primary">Update</button>
            <button type="button" id="deletebtn" class="btn btn-primary">Delete</button>
        </section>
    </div>
`
$('#detail').append(temp_html);

$("#updatebtn").click(async function () {
    window.location.href = "movie_update.html?detail_id=" + detail_id;
})
$("#deletebtn").click(async function () {
    if(confirm("삭제하시겠습니까?")) {
        await deleteDoc(docs);
        await deleteDoc(docs_sum);
        window.location.href = "index.html";
    }
})