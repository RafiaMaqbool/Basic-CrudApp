let objects = []; //object array
let objId = null;  //track the object being edited

/* local storage helper functions */
// save object array to local storage
function SavetoStorage() {
    localStorage.setItem('objects', JSON.stringify(objects));
}

// load objects array from local storage
function LoadfromStorage() {
    const storedObjects = localStorage.getItem('objects');
    if (storedObjects) {
        objects = JSON.parse(storedObjects);
    }
}

// add or update object in the objects array (displays to table)
function AddOrUpdate(name, email) {
    if (objId === null) {
        // add new object
        let newObject = {
            id: objects.length + 1,
            name: name,
            email: email
        };
        objects.push(newObject);
    } else {
        // update existing object
        const objectToUpdate = objects.find(object => object.id === objId);
        objectToUpdate.name = name;
        objectToUpdate.email = email;
        objId = null;  // reset id after updating
    }
    SavetoStorage();
    Display();
}

// display objects
function Display() {
    let List = '';
    objects.forEach(function(object) {
        List += '<tr>' +
                    '<td>' + object.name + '</td>' +
                    '<td>' + object.email + '</td>' +
                    '<td class="object-actions">' +
                        '<button onclick="Edit(' + object.id + ')">Edit</button>' +
                        '<button onclick="Delete(' + object.id + ')">Delete</button>' +
                    '</td>' +
                '</tr>';
    });
    document.querySelector("#List tbody").innerHTML = List;
}

// delete object by finding index in array and using splice method
function Delete(id) {
    const index = objects.findIndex(object => object.id === id);
    if (index !== -1) {
        objects.splice(index, 1);
        SavetoStorage();
        Display();
    }
}

// edit object by populating form fields with the object's data
function Edit(id) {
    const objectToUpdate = objects.find(object => object.id === id);
    document.getElementById("Name").value = objectToUpdate.name;
    document.getElementById("Email").value = objectToUpdate.email;
    objId = id;  // Set id to the current object's id
}

// load objects from local storage and display them when the page loads
LoadfromStorage();
Display();

// event listener for form submission
document.getElementById("CrudForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    AddOrUpdate(name, email);
    document.getElementById("CrudForm").reset();
});
