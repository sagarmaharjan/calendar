const currentDate = document.querySelector('.current-date'),
    daysTag = document.querySelector('.days'),
    prevNextIcons = document.querySelectorAll('.icons span');

// getting new date, current year and month
let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth(); // starts from 0

const months = [
    'January',
    'Febraury',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(), // the first day of the month
        lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(), // getting last date of month
        lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay(), // getting last day of the month
        lastDateOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate(); // getting last date of previous month 
    let liTag = '';

    for (let i = firstDayOfMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateOfPreviousMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month and year matched
        const isToday = i === date.getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear() ? 'active' : '';
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;

    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar();

prevNextIcons.forEach(icon => { // adding click event on both icons
    icon.addEventListener('click', () => {
        // if clicked icon is previous icon then decrement current month by one else increment it by 1
        currentMonth = icon.id === 'next' ? currentMonth + 1 : currentMonth - 1;

        if (currentMonth < 0 || currentMonth > 11) {
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        } else {
            date = new Date();
        }

        renderCalendar();
    })
})
