let startTime = 0;
let isRunning = false;
let interval;
let lapCounter = 1;

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = startTime || Date.now();
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    isRunning = false;
    startTime = 0;
    lapCounter = 1;
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (isRunning) {
        const lapTime = calculateTime(startTime);
        const lapList = document.getElementById("laps");
        const li = document.createElement("li");
        li.className = "lap-time";
        li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(li);
    }
}

function calculateTime(startTime) {
    const currentTime = Date.now();
    const elapsedTime = new Date(currentTime - startTime);
    return elapsedTime.toISOString().substr(11, 8);
}

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = new Date(currentTime - startTime);
    document.getElementById("display").textContent = elapsedTime.toISOString().substr(11, 8);
}

document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
