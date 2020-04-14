//if user adds a note then add it to local storage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addTxt");
    let addTitleTxt=document.getElementById("addTxtTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesAr = [];
    }
    else {
        notesAr = JSON.parse(notes);
    }
    let myObj=
    {
        text:addtxt.value,
        title:addTitleTxt.value
    };

    notesAr.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesAr));
    addtxt.value = "";
    addTitleTxt.value="";




    showNotes();

});
//function to show elements
function showNotes() {
    let html = "";
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesAr = [];
        
    }
    else {
        notesAr = JSON.parse(notes);
    }

    notesAr.forEach(function (element, index) {
        html += `
        <div class="noteCrd my-2 card mx-2" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
              <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
              <button id=Imp_${index} onclick="markNote(this.id)" class="btn btn-primary">Mark Note</button>
            </div>
          </div>`;
    });


    let notesElm = document.getElementById('notes');
    let nottTitle=document.getElementById("divTitle");
    if (notesAr.length != 0) {

        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Please add a note`;
    }

}

function deleteNote(index) {
    let yesOrNo = confirm("Do yoo wanna delete the note?");  //for confirmation from the user
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesAr = [];
    }
    else {
        notesAr = JSON.parse(notes);
    }
    if (yesOrNo) {
        notesAr.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesAr));
        showNotes();
    }
}

let srchTxt = document.getElementById('searchTxt')
srchTxt.addEventListener('input', function (element) {
    let inputValue = srchTxt.value;
    let notesCard = document.getElementsByClassName('noteCrd');
    Array.from(notesCard).forEach(function (element) {
        let shownText = element.getElementsByTagName("p")[0].innerText;

        if (shownText.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
})

//function to mark important
    