//if user adds a note then add it to local storage
//showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addTxt");
    let addTitleTxt = document.getElementById("addTxtTitle");
    let notes = localStorage.getItem("notes");
    let blankHtml = "";
    if (notes == null) {
        notesAr = [];
    }
    else {
        notesAr = JSON.parse(notes);
    }
    let myObj =
    {
        text: addtxt.value,
        title: addTitleTxt.value
    };
    notesAr.push(myObj);
    console.log(myObj)
    localStorage.setItem("notes", JSON.stringify(notesAr));
    addtxt.value = "";
    addTitleTxt.value = "";
    if (myObj.text != "" && myObj.title != "") {
        alertBox('success', "Your notes has been successfully submitted");
    }
    else {
        alertBox('danger', "Sorry note can't be blank");
    }
   // showNotes();

});


//function to show alert

function alertBox(type, message) {
    let alertElement = document.getElementById('alert');
    blankHtml = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
     <strong>${message}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
    alertElement.innerHTML = blankHtml;
    setTimeout(() => {
        alertElement.innerHTML = '';
    }, 2000);
}
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
        if (element.title != "" && element.text != "") {
            html +=
                `
            <div class="card">
              <div class="card-header" id="heading${index}">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                    ${element.title}
                  </button>
                </h2>
              </div>
          
              <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#notes">
                <div class="card-body">
                  ${element.text}
                </div>
                <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                 <button onclick="dictateNote('${element.text}');" class="btn btn-primary">Dictate Note</button>
              </div>
            </div>`;
        }
    });


    let notesElm = document.getElementById('notes');
    let nottTitle = document.getElementById("divTitle");
    if (notesAr.length != 0) {

        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Please add a note`;
    }

}

function dictateNote(text) {
     responsiveVoice.speak(text);
    // responsiveVoice.speak(text, "UK English Male")
    console.log(text);

}

function deleteNote(index) {
    let yesOrNo = confirm("Do you want to delete this note?");  //for confirmation from the user
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

//function to view the note

let viewBtn=document.getElementById('viewBtn');
viewBtn.addEventListener('click',()=>
{
    let notesElm = document.getElementById('notes');
    if(notesElm.style.display!='inline' && viewBtn.innerText!="Hide Note")
    {

        showNotes();
        viewBtn.innerText="Hide Note"
        notesElm.style.display='inline';
    }
    else{
        notesElm.style.display='none';
        viewBtn.innerText="View Note"
    }
})
