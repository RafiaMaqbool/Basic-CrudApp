//initialize empty array
let objects = [];

//add new object to object array
function Add(name, email) {
    let newObject = {
        id: objects.length + 1,
        name: name,
        email: email
    };
    objects.push(newObject);
    Display();
}

//display objects
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


//delete object by finding index in array and using splice method
function Delete(id) {
    const index = objects.findIndex(object => object.id === id);
    if (index !== -1) {
        objects.splice(index, 1);
        Display();
    }
}

//edit object
function Edit(id) {
    const objectToEdit = objects.find(object => object.id === id);
    const newName = prompt("Enter new name:", objectToEdit.name);
    const newEmail = prompt("Enter new email:", objectToEdit.email);
    if (newName !== null && newEmail !== null) {
        objectToEdit.name = newName;
        objectToEdit.email = newEmail;
        Display();
    }
}

Display();

//event listener for form submission
document.getElementById("CrudForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    Add(name, email);
    document.getElementById("CrudForm").reset();
});
