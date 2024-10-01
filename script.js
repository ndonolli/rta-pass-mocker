const now = new Date();

let createDateString = date => {
    const dateStr = date.toString()
    const dateTokens = dateStr.split(' ');
    const month = dateTokens[1];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formatted = `${month} ${day}, ${year}, ${hour}:${minute} ${ampm}`;
    return formatted;
}

let createTimeString = () => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formatted = `${hour}:${minute}:${second} ${ampm}`;
    return formatted;
}

let setClock = () => {
    let timeString = createTimeString();
    let clock = document.getElementById('clock');
    clock.innerText = timeString;
}


const expiryDateString = createDateString(now);
setClock();

const expiryDate = document.getElementById('expiry-date-string');
expiryDate.innerText = expiryDateString;

setInterval(setClock, 1000)
