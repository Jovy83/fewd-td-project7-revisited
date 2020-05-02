/* ============================================= */
/*              DOM variables                    */
/* ============================================= */

const $bellButton = $(`#bellButton`);
const $newNotificationDot = $(`#dot`);
const $notificationsDiv = $(`#notifications`);
const $notificationEntryDivs = $(`.notification-entry`);
const $alertSection = $(`#alert`);
const $trafficNav = $(`.traffic-nav`);
const $trafficNavLinks = $(`.traffic-nav-link`);
const $trafficChartElement = $(`#traffic-chart`);
const $dailyChartElement = $(`#daily-chart`);
const $platformChartElement = $(`#platform-chart`);
const $searchUserInput = $(`#userField`);
const $messageTextarea = $(`#messageField`);
const $submitButton = $(`#send`);
const $settingsButtonDiv = $(`.settings-buttons`);
const $emailPrefsInputElement = $(`#email-prefs`);
const $profilePrefsInputElement = $(`#profile-prefs`);
const $timezoneSelectElement = $(`#timezone`);

/* ============================================= */
/*              Variables                        */
/* ============================================= */

let notificationsDivIsHidden = true;
let notificationsLeft = $notificationEntryDivs.length;

/* ============================================= */
/*               Notifications                   */
/* ============================================= */

// handler of show/hide of the notifications div
$bellButton.on(`click`, (event) => {
    // hide the newNotificationDot
    $newNotificationDot.hide();

    // show or hide the notificationsDiv
    if (notificationsDivIsHidden) {
        $notificationsDiv.show();
    } else {
        $notificationsDiv.hide();
    }

    notificationsDivIsHidden = !notificationsDivIsHidden;
});

// handler for dismissing notifications
$notificationsDiv.on(`click`, (event) => {

    // only handle close notification button click
    if ($(event.target).hasClass(`notification-entry-close`)) {
        // get the parent so we can hide it
        $(event.target).parent().hide();

        // also need to hide the notifications div if there are no more notification entries to show
        notificationsLeft--;
        console.log(`Notifications left: ${notificationsLeft}`);
        
        if (notificationsLeft <= 0) {
            $notificationsDiv.hide();
            notificationsDivIsHidden = true;
        }
    }

});

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
$alertSection.on(`click`, (event) => {
    if ($(event.target).hasClass(`alert-banner-close`)) {
        // $(event.target).parent().fadeOut().delay(5000).hide();
        $alertSection.fadeOut();
    }
});

/* ============================================= */
/*              Chart JS                         */
/* ============================================= */

const hourlyTrafficData = {
    labels: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `July`,
    `Aug`, `Sep`, `Oct`, `Nov`, `Dec`],
    datasets: [{
        label: `Traffic`,
        data: [50, 150, 25, 80, 200, 400, 0, 100, 20, 100,
        600, 50],
        backgroundColor: `rgba(226, 227, 244, 0.5)`,
        borderColor: `rgba(115, 121, 186, 1)`,
        borderWidth: 1,
        pointBackgroundColor: `#fff`,
        lineTension: 0
    }]
};

const dailyTrafficData = {
    labels: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `July`,
    `Aug`, `Sep`, `Oct`, `Nov`, `Dec`],
    datasets: [{
        label: `Traffic`,
        data: [100, 150, 200, 250, 200, 225, 150, 160, 300, 350,
        270, 225],
        backgroundColor: `rgba(226, 227, 244, 0.5)`,
        borderColor: `rgba(115, 121, 186, 1)`,
        borderWidth: 1,
        pointBackgroundColor: `#fff`,
        lineTension: 0
    }]
};

const weeklyTrafficData = {
    labels: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `July`,
    `Aug`, `Sep`, `Oct`, `Nov`, `Dec`],
    datasets: [{
        label: `Traffic`,
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
        2500, 2000],
        backgroundColor: `rgba(226, 227, 244, 0.5)`,
        borderColor: `rgba(115, 121, 186, 1)`,
        borderWidth: 1,
        pointBackgroundColor: `#fff`,
        lineTension: 0
    }]
};

const monthlyTrafficData = {
    labels: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `July`,
    `Aug`, `Sep`, `Oct`, `Nov`, `Dec`],
    datasets: [{
        label: `Traffic`,
        data: [800, 1500, 1250, 2250, 1750, 2000, 1500, 2000, 2500, 1750,
        2750, 2350],
        backgroundColor: `rgba(226, 227, 244, 0.5)`,
        borderColor: `rgba(115, 121, 186, 1)`,
        borderWidth: 1,
        pointBackgroundColor: `#fff`,
        lineTension: 0
    }]
};

const trafficOptions = {
    // aspectRatio: 2.5,
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
    type: `line`,
    data: weeklyTrafficData,
    options: trafficOptions
});

const updateTrafficChart = mode => {
    if (mode === `hourly`) {
        trafficChart = new Chart($trafficChartElement, {
            type: `line`,
            data: hourlyTrafficData,
            options: trafficOptions
        });
    } else if (mode === `daily`) {
        trafficChart = new Chart($trafficChartElement, {
            type: `line`,
            data: dailyTrafficData,
            options: trafficOptions
        });
    } else if (mode === `weekly`) {
        trafficChart = new Chart($trafficChartElement, {
            type: `line`,
            data: weeklyTrafficData,
            options: trafficOptions
        });
    } else {
        trafficChart = new Chart($trafficChartElement, {
            type: `line`,
            data: monthlyTrafficData,
            options: trafficOptions
        });
    }
}

// handle chart type change
$trafficNav.on(`click`, `li a` , (event) => {

    // need to remove selected class from all the li a
    const clicked = event.target;
    $trafficNavLinks.each((i, obj) => {
        $(obj).removeClass(`selected`);
    });

    // then need to add the selected class to whatever was selected
    $(clicked).addClass(`selected`);

    // finally, need to update the chart
    updateTrafficChart(clicked.id);
});

const dailyData = {
    labels: [`S`, `M`, `T`, `W`, `T`, `F`, `S`],
    datasets: [{
        label: `Daily Traffic`,
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
    type: `bar`,
    data: dailyData,
    options: dailyOptions
});

const platformData = {
    labels: [`Phones`, `Tablets`, `Desktop`],
    datasets: [{
        label: `Users`,
        data: [25, 10, 65],
        backgroundColor: [`rgba(103, 168, 183, 1)`, `rgba(118, 194, 132, 1)`, `rgba(104, 108, 183, 1)`],
        borderWidth: 1,
    }]
};

const platformOptions = {
    legend: {
        position: `right`,
        labels: {
            boxWidth: 20,
            fontStyle: `bold`
        }
    }
};

let platformChart = new Chart($platformChartElement, {
    type: `doughnut`,
    data: platformData,
    options: platformOptions
});

/* ============================================= */
/*              Helper functions                 */
/* ============================================= */

const convertStringToBoolean = string => {
    return (string === `true`);
}

/* ============================================= */
/*               Form area                       */
/* ============================================= */

$submitButton.on(`click`, (event) => {
    // prevent browser default
    event.preventDefault();

    // prevent user from submitting if fields are empty
    const userString = $searchUserInput.val();
    const messageString = $messageTextarea.val();

    if (userString === `` || messageString === ``) {
        alert(`Please fill out required fields!`);
    }
});

/* ============================================= */
/*              Local storage                    */
/* ============================================= */

const supportsLocalStorage = () => {
    try {
        return `localStorage` in window && window[`localStorage`] !== null;
    } catch (e) {
        return false;
    }
};

const loadPreference = () => {
    // load the user settings from the localStorage
    // we need to convert the string to boolean (for the sliders) first because localStorage stores data in strings
    const emailPrefs = convertStringToBoolean(localStorage.emailPrefs);
    const profilePrefs = convertStringToBoolean(localStorage.profilePrefs);
    const timezonePrefs = localStorage.timezonePrefs;

    $emailPrefsInputElement.prop(`checked`, emailPrefs);
    $profilePrefsInputElement.prop(`checked`, profilePrefs);
    $timezoneSelectElement.val(timezonePrefs).change();
};

const savePreference = () => {
    // check first if timezone is selected, if not, show alert
    if ($timezoneSelectElement.val() === null) {
        alert(`Please select timezone!`);
        return;
    }
    
    console.log($emailPrefsInputElement.prop(`checked`));
    console.log($profilePrefsInputElement.prop(`checked`));
    console.log($timezoneSelectElement.val());

    localStorage.emailPrefs = $emailPrefsInputElement.prop(`checked`);
    localStorage.profilePrefs = $profilePrefsInputElement.prop(`checked`);
    localStorage.timezonePrefs = $timezoneSelectElement.val();
    console.log(`Successfully saved preferences to localStorage`);
};

const deletePreference = () => {
    localStorage.emailPrefs = null;
    localStorage.profilePrefs = null;
    localStorage.timezonePrefs = null;

    $emailPrefsInputElement.prop(`checked`, false);
    $profilePrefsInputElement.prop(`checked`, false);
    $timezoneSelectElement.val(null).change();

    console.log(`Successfully deleted preferences to localStorage`);
}

$settingsButtonDiv.on(`click`, (event) => {
    if (event.target.id === `save`) {
        console.log(`Save button was clicked`);
        savePreference();
        alert(`Preference saved.`);
    } else if (event.target.id === `cancel`) {
        console.log(`Cancel button was clicked`);
        deletePreference()
        alert(`Preference deleted.`);
    }
});

// A $( document ).ready() block. This is fired when the page is completely loaded
$(document).ready( ()=> {
    loadPreference();
});


//TODO: user search