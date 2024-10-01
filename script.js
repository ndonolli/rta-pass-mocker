let createDateString = () => {
    let date = new Date();
    date.setHours(date.getHours() + 24) // tomorrow
    const dateStr = date.toString()
    const dateTokens = dateStr.split(' ');
    const month = dateTokens[1];
    const day = date.getDate();
    const year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes().toString();
    const isPM = hour >= 12;

    if (minute.length === 1) {
        minute = '0' + minute;
    }
    const ampm = isPM ? 'PM' : 'AM';
    hour = isPM ? hour - 12 : hour;
    const formatted = `${month} ${day}, ${year}, ${hour}:${minute} ${ampm}`;
    return formatted;
}

let createTimeString = () => {
    const date = new Date();
    let hour = date.getHours();
    const isPM = hour >= 12;

    let minute = date.getMinutes().toString();
    if (minute.length === 1) {
        minute = '0' + minute;
    }
    let second = date.getSeconds().toString();
    if (second.length === 1) {
        second = '0' + second;
    }
    const ampm = isPM ? 'PM' : 'AM';

    hour = isPM ? hour - 12 : hour;
    const formatted = `${hour}:${minute}:${second} ${ampm}`;
    return formatted;
}

let setClock = () => {
    let timeString = createTimeString();
    let clock = document.getElementById('clock');
    clock.innerText = timeString;
}


const expiryDateString = createDateString();
setClock();

const expiryDate = document.getElementById('expiry-date-string');
expiryDate.innerText = expiryDateString;

setInterval(setClock, 1000)
