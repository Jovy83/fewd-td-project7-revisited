/* ============================================= */
/*              DOM variables                    */
/* ============================================= */
const $alertSection = $("#alert");
const $trafficChartElement = $("#traffic-chart");
const $dailyChartElement = $("#daily-chart");
const $platformChartElement = $("#platform-chart");

/* ============================================= */
/*              Alert banner                     */
/* ============================================= */

const alertHtml = `
<div class="alert-banner">
    <p class="alert-banner-message text-primary"><strong>Alert:</strong> You have <strong>6</strong> overdue tasks
    to complete</p>
    <span class="alert-banner-close">x</span>
</div>
`;

$alertSection.html(alertHtml);
$alertSection.on("click", (event) => {
    if ($(event.target).hasClass(`alert-banner-close`)) {
        // $(event.target).parent().fadeOut().delay(5000).hide();
        $alertSection.fadeOut();
    }
});

/* ============================================= */
/*              Chart JS                         */
/* ============================================= */

const trafficData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July",
    "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
        label: "Traffic",
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
        2500, 2000],
        backgroundColor: "rgba(226, 227, 244, 0.5)",
        borderColor: "rgba(115, 121, 186, 1)",
        borderWidth: 1,
        pointBackgroundColor: "#fff",
        lineTension: 0
    }]
};

const trafficOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
};

let trafficChart = new Chart($trafficChartElement, {
    type: "line",
    data: trafficData,
    options: trafficOptions
});

const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: "Daily Traffic",
        data: [75, 100, 175, 125, 225, 200, 75],
        backgroundColor: 'rgba(104, 108, 183, 1)',
        borderColor: 'rgba(115, 121, 186, 1)',
        borderWidth: 1,
    }]
}

const dailyOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
};

let dailyChart = new Chart($dailyChartElement, {
    type: "bar",
    data: dailyData,
    options: dailyOptions
});

const platformData = {
    labels: ["Phones", "Tablets", "Desktop"],
    datasets: [{
        label: "Users",
        data: [25, 10, 65],
        backgroundColor: ["rgba(103, 168, 183, 1)", "rgba(118, 194, 132, 1)", "rgba(104, 108, 183, 1)"],
        borderWidth: 1,
    }]
};

const platformOptions = {
    legend: {
        position: "right",
        labels: {
            boxWidth: 20,
            fontStyle: "bold"
        }
    }
};

let platformChart = new Chart($platformChartElement, {
    type: "doughnut",
    data: platformData,
    options: platformOptions
});