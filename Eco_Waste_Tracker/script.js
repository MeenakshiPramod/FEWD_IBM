let wasteData = {
    Plastic: 0,
    Paper: 0,
    Organic: 0,
    Glass: 0,
    Metal: 0
};

function logWaste() {
    const type = document.getElementById('waste-type').value;
    const quantity = parseFloat(document.getElementById('waste-quantity').value);

    if (!isNaN(quantity) && quantity > 0) {
        wasteData[type] += quantity;
        updateCharts();
        checkTotalWaste();
    } else {
        alert('Please enter a valid quantity');
    }

    document.getElementById('waste-form').reset();
}

function updateCharts() {
    const barCtx = document.getElementById('waste-bar-chart').getContext('2d');
    const pieCtx = document.getElementById('waste-pie-chart').getContext('2d');
    
    if (window.barChart) {
        window.barChart.destroy();
    }
    if (window.pieChart) {
        window.pieChart.destroy();
    }

    window.barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(wasteData),
            datasets: [{
                label: 'Waste Logged (kg)',
                data: Object.values(wasteData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    window.pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(wasteData),
            datasets: [{
                data: Object.values(wasteData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

function checkTotalWaste() {
    const totalWaste = Object.values(wasteData).reduce((acc, curr) => acc + curr, 0);
    if (totalWaste > 30) {
        alert('The total waste has exceeded 30 kg. Please contact the caretaker for waste collection.');
    }
}

function shareMessage() {
    const message = document.getElementById('community-message').value;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerText = message;
    document.getElementById('community-messages').appendChild(messageDiv);
    document.getElementById('community-form').reset();
}

function setGoal() {
    const goal = document.getElementById('goal').value;
    const goalDiv = document.createElement('div');
    goalDiv.className = 'goal';
    goalDiv.innerText = goal;
    document.getElementById('goal-list').appendChild(goalDiv);
    document.getElementById('goal-form').reset();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCharts();
});
