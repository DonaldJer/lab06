function initialize() {
    let status = "* Offline *";
    if (navigator.onLine) {
        status = "* Online *";
        retrieveContacts();
    } else {
        const localStorage = window.localStorage;
        if (localStorage) {
            const contacts = localStorage.getItem("contacts");
            if (contacts) {
                displayContacts(JSON.parse(contacts));
            }
        }
    }

    document.getElementById("status").innerHTML = status;

    document.body.addEventListener(
            "online",
            function () {
                document.getElementById("status").innerHTML = "Online";
            },
            false
            );
    document.body.addEventListener(
            "offline",
            function () {
                document.getElementById("status").innerHTML = "Offline";
            },
            false
            );
}

function retrieveContacts() {
    const xhr = new XMLHttpRequest();
    const url = "contacts.json";

    // Downloading, parsing, and storing of the json
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var contacts = JSON.parse(xhr.response).contacts;
            displayContacts(contacts);

            // Store contact data to localstorage
            const localStorage = window.localStorage;
            if (localStorage) {
                localStorage.setItem("contacts", JSON.stringify(contacts));
            }
        }
    };

    xhr.open("get", url);
    xhr.send();
}

function displayContacts(contacts) {
    // Arrange each contact person to each of row of the page
    contacts.forEach(addRow);
}

function addRow(contact) { // Arrange each contact person to each of the row of the page
    // Access tcontent in html
    var tcontent = document.getElementById("tcontent"); 
    
    // Add one row to the tcontent
    var row = tcontent.insertRow(); 

    // Insert data to the 1st cell (Name) of the current table row
    var nameCell = row.insertCell();
    nameCell.setAttribute('data-label', "Name");
    nameCell.innerHTML = contact.name;

    // Insert data to the 2nd cell (Address) of the current table row
    var addressCell = row.insertCell();
    addressCell.setAttribute('data-label', "Address");
    addressCell.innerHTML = contact.address;

    // Insert data to the 3rd cell (Mobile) of the current table row
    var mobileCell = row.insertCell();
    mobileCell.setAttribute('data-label', "Mobile");
    mobileCell.innerHTML = contact.phone.mobile;
}