// This File has all the functions to call all the API.
/**
 * @function fetch :  is a built in  fun to call API with their API 
 * @param url + an @object that describs the API
 * @param headers to describe the type or format of the data that  i want to send to the API -> in our case : @json
 * @param body to send the note that we want to add ..
 * th note is an object hast to params (title+ content) but we use this function @function JSON.stringify()
 * @function JSON.stringify() : is a bulit in fun  to change from object to string  but string in JSON
 * await : to call the functions that returns promises
 */ 

//const baseUrl = "http://localhost:3000"
const baseUrl = "https://notaty-app-first.herokuapp.com"
async function addNote(noteData) {
    const response  = await  fetch(`${baseUrl}/notes`,
    { method:"POST", 
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(noteData)
    });
    return response;
}


async function updateNote(noteData) {
    const response  = await  fetch(`${baseUrl}/notes`,
    { method:"PUT", 
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(noteData)
    });
    return response;
}

async function deleteNote(noteId) {
    const response  = await  fetch(`${baseUrl}/notes/${noteId}`,
    { method:"DELETE", 
       // BECAUSE I HAVE NO INPUT BY DELETE
      //headers: {"Content-Type" : "application/json"},
      //body: JSON.stringify(noteData)
    });
    return response;
}

async function getNoteById(noteId) {
    const response  = await  fetch(`${baseUrl}/notes/${noteId}`);
    // BECAUSE GET IS DEFAULT WE DONT HAVE TO ADD IT
    //method:"GET"
    return response.json();
}

/*
ALD VERSION!!! WITHOUT FILTERING WITH THE TITLE !!!
async function getNotes() {
    const response  = await  fetch(`${baseUrl}/notes`);
    return response.json;
}

*/
// in case the filtering to specific note -> searching with title
 async function getNotes(noteTitle) {
    let url = `${baseUrl}/notes`;
    // if : in case the title is defind or given -> return this note with this title
    if(noteTitle){
        url +=`/?title=${noteTitle}`;
    }
    // else : default case -> return all the notes
    const response  = await  fetch(url);
    return response.json();
} 

