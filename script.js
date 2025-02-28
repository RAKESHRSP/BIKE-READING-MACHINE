// Real-time clock function
function updateClock() {
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    let dateString = now.toLocaleDateString();
    
    let clockElement = document.getElementById("clock");
    clockElement.innerText = `${dateString} - ${timeString}`;
}
setInterval(updateClock, 1000);
updateClock();

// KM Calculation Function
document.getElementById("calculate-btn").addEventListener("click", function() {
    let startKM = parseFloat(document.getElementById("start-km").value);
    let stopKM = parseFloat(document.getElementById("stop-km").value);
    let totalKMElement = document.getElementById("total-km");

    if (isNaN(startKM) || isNaN(stopKM) || startKM >= stopKM) {
        alert("⚠️ Please enter valid KM readings.");
        return;
    }

    let totalKM = stopKM - startKM;
    totalKMElement.innerText = totalKM.toFixed(1);
});

// Biometric Attendance with Manual Fingerprint Upload
document.getElementById("biometric-btn").addEventListener("click", function() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let fingerprintInput = document.getElementById("fingerprint-upload");

    if (name === "" || phone === "" || email === "" || fingerprintInput.files.length === 0) {
        alert("⚠️ Please enter all details and upload your fingerprint.");
        return;
    }

    let file = fingerprintInput.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        document.getElementById("fingerprint-image").src = event.target.result;
        document.getElementById("user-name").innerText = name;
        document.getElementById("user-phone").innerText = phone;
        document.getElementById("user-email").innerText = email;
        document.getElementById("arrival-time").innerText = new Date().toLocaleString();
        
        document.getElementById("arrival-info").classList.remove("hidden");
    };

    reader.readAsDataURL(file);
});
