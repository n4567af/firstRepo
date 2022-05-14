// This File has all the functions that refer to the HTML FILE .
// refer to, refernce - belong to - return to - relate to
/**
 * @fun onload="updateNotesTable()"  -> @onload is an event  to refresh and update the page wenn is loged in.
 * // to handle  with html we have to use @IDs in JS that belong to the HTML,
 * for that we use the @fun document.getElementById
 */

function updateNotesTable(noteId, searchInput_title) {
    var table = document.getElementById("notes-table");
    /**  now cann i handle with this table as ID in JS File to add or updete notes ..etc
     * @function getNotes return all the notes  to me as array -> i have to loop it ->
     *  for each is better than the normal loop
     * insertRow, insertCell : functions von <table>
     * 
    */
    var rowcount = table.rows.length;  // the number of the rows in a table ex=2
    while (--rowcount) {  //1   0  -1
        table.deleteRow(rowcount);  //delete 1   delete 0  stop
    }
    getNotes(searchInput_title).then(data => {
        data.forEach(note => {
            var row = table.insertRow(1);
            var idAttribute = document.createAttribute("id");
            idAttribute.value= note["_id"];
            row.setAttributeNode(idAttribute);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = note["title"];
            cell2.innerHTML = note["content"];
            cell3.innerHTML = note["updatedDate"];

            cell4.innerHTML = `<a onclick= 'editNoteModel("${note["_id"]}")' href='#'><img src='images/edit.png' style="width:22px;"></img></a>
                               <a onclick= 'confirmDeleteNote("${note["_id"]}")' href='#'><img src='images/delete.png' style="width:22px;"></img></a>`

        })
    }

    ).then(()=>{
    if(noteId){
        var row =document.getElementById(noteId);
        row.setAttribute("style", "animation: new-row 5s;");
    }
    });
}

function searchNotes() {
    var searchInput = document.getElementById("searchInput").value;
    updateNotesTable(undefined , searchInput);

}


function confirmDeleteNote(noteId) {
    var action = confirm("Are you sure you want to delete this note?");
    if (action == true) {
        deleteNote(noteId).then(() => {
            updateNotesTable()
        }
        )
    }

}
