// Real-time clock function
function updateClock() {
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    let dateString = now.toLocaleDateString();
    
    let clockElement = document.getElementById("clock");
    clockElement.innerText = `${dateString} - ${timeString}`;
    
    clockElement.style.opacity = "0.5";
    setTimeout(() => { clockElement.style.opacity = "1"; }, 500);
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

// KM Calculation Function
function calculateKM() {
    let startKM = parseFloat(document.getElementById("start-km").value);
    let stopKM = parseFloat(document.getElementById("stop-km").value);
    let totalKMElement = document.getElementById("total-km");

    if (isNaN(startKM) || isNaN(stopKM) || startKM >= stopKM) {
        alert("Please enter valid KM readings.");
        return;
    }

    let totalKM = stopKM - startKM;
    
    // Smooth count-up animation
    let currentKM = 0;
    let increment = totalKM / 30;

    let counter = setInterval(() => {
        currentKM += increment;
        if (currentKM >= totalKM) {
            currentKM = totalKM;
            clearInterval(counter);
        }
        totalKMElement.innerText = currentKM.toFixed(1);
    }, 20);
}

// Biometric Scan Function
document.getElementById("biometric-btn").addEventListener("click", function() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    
    if (name === "" || phone === "" || email === "") {
        alert("⚠️ Please enter your details before scanning.");
        return;
    }

    // Simulated fingerprint scan success
    setTimeout(() => {
        alert("✅ Fingerprint scanned successfully!");

        // Display the arrival info
        document.getElementById("user-name").innerText = name;
        document.getElementById("user-phone").innerText = phone;
        document.getElementById("user-email").innerText = email;
        document.getElementById("arrival-time").innerText = new Date().toLocaleString();
        
        document.getElementById("arrival-info").classList.remove("hidden");
    }, 1500);
});
