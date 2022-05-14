//const { response } = require("express");

// -1- Add a new note.. 
function openAddModal() {
    var modal = document.getElementById("addNoteModal");
    var closeAdd = document.getElementById("closeAdd");
    var cancelAddNoteBtn = document.getElementById("cancelAddNoteBtn");
    clearaddModel();
    modal.style.display = "block";
    closeAdd.onclick = () => {
        modal.style.display = "none";
    }

    cancelAddNoteBtn.onclick = () => {

        modal.style.display = "none";

    }
}

function saveNewNote() {
    var titleStr = document.getElementById("addTitle").value;
    var contentStr = document.getElementById("addContent").value;
    const addObjectNote = {title: titleStr, content: contentStr};
    addNote(addObjectNote).then(response => {
        if (response.ok) {
            var modal = document.getElementById("addNoteModal");
            modal.style.display = "none";
            response.json().then(json =>
                {
                    var newNoteId = json["_id"];
                    updateNotesTable(newNoteId);
                });
            
        }
        else {
            response.text().then(error => {
                document.getElementById("addError").innerHTML= error;
            })
        }

    })
        .catch(error => {
            console.log(error);
            document.getElementById("addError").innerHTML = error;
        })


}

 function clearaddModel() {
    document.getElementById("addTitle").value ="";
    document.getElementById("addContent").value ="";
    document.getElementById("addError").innerHTML = "";
 }


 function editNoteModel(noteId) {
    var modal_edit = document.getElementById("editNoteModal");
    var closeAdd_edit = document.getElementById("closeEdit");
    var cancelAddNoteBtn_edit = document.getElementById("cancelEditNoteBtn");
    modal_edit.style.display = "block";
    closeAdd_edit.onclick = () => {
        modal_edit.style.display = "none";
    }

    cancelAddNoteBtn_edit.onclick = () => {

        modal_edit.style.display = "none";

    }
    loadNotedata(noteId);
}

function loadNotedata(noteId){
    var modal_edit = document.getElementById("editNoteModal");
    var noteIdAttribute = document.createAttribute("noteid");
    noteIdAttribute.value = noteId;
    modal_edit.setAttributeNode(noteIdAttribute); // setAttributeNode not setAttribute
    getNoteById(noteId).then(data=>{
        document.getElementById("editTitle").value = data["title"];
     document.getElementById("editContent").value = data["content"];
    });
}

function saveEditNote(){
    var modal_edit = document.getElementById("editNoteModal");
    const noteId = modal_edit.getAttribute("noteid")
    const titleStr_edit = document.getElementById("editTitle").value;
    const contentStr_edit = document.getElementById("editContent").value;
    const noteData = { _id :noteId , title :titleStr_edit, content:contentStr_edit};
    updateNote(noteData).then(response =>{
        if (response.ok) {
            var modal_edit = document.getElementById("editNoteModal");
            modal_edit.style.display = "none";
            updateNotesTable(noteId);
        }
        else {
            response.text().then(error => {
                document.getElementById("editError").innerHTML= error;
            })
        }
    }).catch(error =>{
        document.getElementById("editError").innerHTML= error;
    })
}