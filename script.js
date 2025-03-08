document.getElementById('nextBtn').addEventListener('click', function() {
    const name = document.getElementById('employeeName').value;
    const phone = document.getElementById('employeePhone').value;

    if (name && phone) {
        const employeeDetails = document.getElementById('employeeDetails');
        employeeDetails.classList.remove('show');
        
        setTimeout(() => {
            employeeDetails.style.display = 'none';
            const biometricSection = document.getElementById('biometricSection');
            biometricSection.style.display = 'block';
            biometricSection.classList.add('show');
        }, 500);
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('registerBtn').addEventListener('click', function() {
    alert('Initiating biometric registration...');
});

document.getElementById('loginBtn').addEventListener('click', function() {
    alert('Initiating biometric login...');
});

// Show KM section after biometric registration
document.getElementById('registerBtn').addEventListener('click', function() {
    const biometricSection = document.getElementById('biometricSection');
    biometricSection.classList.remove('show');
    
    setTimeout(() => {
        biometricSection.style.display = 'none';
        const kmSection = document.getElementById('kmSection');
        kmSection.style.display = 'block';
        kmSection.classList.add('show');
    }, 500);
});

// Calculate distance
document.getElementById('calculateBtn').addEventListener('click', function() {
    const startKM = parseFloat(document.getElementById('startKM').value);
    const stopKM = parseFloat(document.getElementById('stopKM').value);

    if (!isNaN(startKM) && !isNaN(stopKM)) {
        const distance = stopKM - startKM;
        document.getElementById('result').innerText = `Distance traveled: ${distance} KM`;

        const now = new Date();
        const formattedTime = now.toLocaleTimeString('en-IN', { hour12: false }); // HH:MM:SS
        const formattedDate = now.toLocaleDateString('en-IN'); // DD/MM/YYYY

        document.getElementById('timestamp').innerText = `Date: ${formattedDate}, Time: ${formattedTime}`;

        // Add data to the table
        const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow();

        const dateCell = newRow.insertCell(0);
        const timeCell = newRow.insertCell(1);
        const startCell = newRow.insertCell(2);
        const stopCell = newRow.insertCell(3);
        const distanceCell = newRow.insertCell(4);
        const actionsCell = newRow.insertCell(5);

        dateCell.innerText = formattedDate;
        timeCell.innerText = formattedTime;
        startCell.innerText = startKM.toFixed(2);
        stopCell.innerText = stopKM.toFixed(2);
        distanceCell.innerText = distance.toFixed(2);

        // Create Edit button
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = function() {
            editData(newRow, startKM, stopKM, distance);
        };
        actionsCell.appendChild(editButton);

        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
            deleteData(newRow);
        };
        actionsCell.appendChild(deleteButton);

        // Save data to local storage
        saveDataToLocalStorage(formattedDate, formattedTime, startKM, stopKM, distance);
    } else {
        alert('Please enter valid KM values.');
    }
});

// Function to save data to local storage
function saveDataToLocalStorage(date, time, startKM, stopKM, distance) {
    let data = JSON.parse(localStorage.getItem('bikeData')) || [];
    data.push({ date, time, startKM, stopKM, distance });
    localStorage.setItem('bikeData', JSON.stringify(data));
}

// Function to edit data
function editData(row, startKM, stopKM, distance) {
    const newStartKM = prompt("Enter new Start KM:", startKM);
    const newStopKM = prompt("Enter new Stop KM:", stopKM);

    if (newStartKM !== null && newStopKM !== null) {
        const updatedStartKM = parseFloat(newStartKM);
        const updatedStopKM = parseFloat(newStopKM);
        const updatedDistance = updatedStopKM - updatedStartKM;

        row.cells[2].innerText = updatedStartKM.toFixed(2);
        row.cells[3].innerText = updatedStopKM.toFixed(2);
        row.cells[4].innerText = updatedDistance.toFixed(2);

        // Update local storage
        let data = JSON.parse(localStorage.getItem('bikeData')) || [];
        const index = Array.from(row.parentNode.children).indexOf(row);
        data[index] = {
            date: row.cells[0].innerText,
            time: row.cells[1].innerText,
            startKM: updatedStartKM,
            stopKM: updatedStopKM,
            distance: updatedDistance
        };
        localStorage.setItem('bikeData', JSON.stringify(data));
    }
}

// Function to delete data
function deleteData(row) {
    const index = Array.from(row.parentNode.children).indexOf(row);
    let data = JSON.parse(localStorage.getItem('bikeData')) || [];
    data.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('bikeData', JSON.stringify(data));
    row.remove(); // Remove the row from the table
}

// Load data from local storage when the page loads
function loadDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('bikeData')) || [];
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    data.forEach((item) => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = item.date;
        newRow.insertCell(1).innerText = item.time;
        newRow.insertCell(2).innerText = item.startKM.toFixed(2);
        newRow.insertCell(3).innerText = item.stopKM.toFixed(2);
        newRow.insertCell(4).innerText = item.distance.toFixed(2);

        // Create Edit button
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = function() {
            editData(newRow, item.startKM, item.stopKM, item.distance);
        };
        newRow.insertCell(5).appendChild(editButton);

        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
            deleteData(newRow);
        };
        newRow.insertCell(5).appendChild(deleteButton);
    });
}

// Call loadData function on page load
window.onload = loadDataFromLocalStorage;
