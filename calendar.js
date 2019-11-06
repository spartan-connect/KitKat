let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = ["January", "Feburary", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];

let calendarHeader = document.getElementById('calendar-header');

function renderCalendar(month, year) {
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-cells");

    tbl.innerHTML = "";

    calendarHeader.innerHTML = months[month] + " " + year;

    let date = 1;

    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            date++;
        }
        tbl.appendChild(row);
    }
}

function previous() {
    if (currentMonth === 0) {
        currentYear = currentYear;
    } else {
        currentYear--;
    }

    if (currentMonth === 0) {
        currentMonth = 11;
    } else {
        currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
}

function next() {
    if (currentMonth === 11) {
        currentYear++;
    }

    currentMonth = (currentMonth + 1) % 12;
    renderCalendar(currentMonth, currentYear);
}
renderCalendar(currentMonth, currentYear);