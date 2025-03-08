// Load data from local storage when the page loads
function loadDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('bikeData')) || [];
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    data.forEach((item, index) => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = item.date;
        newRow.insertCell(1).innerText = item.time;
        newRow.insertCell(2).innerText = item.startKM.toFixed(2);
        newRow.insertCell(3).innerText = item.stopKM.toFixed(2);
        newRow.insertCell(4).innerText = item.distance.toFixed(2);

        // Create Edit button
        const editCell = newRow.insertCell(5);
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.onclick = function() {
            editData(index);
        };
        editCell.appendChild(editButton);

        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
            deleteData(index);
        };
        editCell.appendChild(deleteButton);
    });
}

// Function to edit data
function editData(index) {
    const data = JSON.parse(localStorage.getItem('bikeData')) || [];
    const item = data[index];

    // Prompt user for new values
    const newStartKM = prompt("Enter new Start KM:", item.startKM);
    const newStopKM = prompt("Enter new Stop KM:", item.stopKM);

    if (newStartKM !== null && newStopKM !== null) {
        item.startKM = parseFloat(newStartKM);
        item.stopKM = parseFloat(newStopKM);
        item.distance = item.stopKM - item.startKM; // Recalculate distance
        localStorage.setItem('bikeData', JSON.stringify(data));
        location.reload(); // Reload the page to reflect changes
    }
}

// Function to delete data
function deleteData(index) {
    const data = JSON.parse(localStorage.getItem('bikeData')) || [];
    data.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('bikeData', JSON.stringify(data));
    location.reload(); // Reload the page to reflect changes
}

// Call loadData function on page load
window.onload = loadDataFromLocalStorage;

// Back button functionality
document.getElementById('backBtn').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirect to the main page
});
