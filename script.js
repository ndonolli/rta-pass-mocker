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
    const formatted = `${month} ${day}, ${year}, ${hour}:${minute} ${ampm}`
    console.log(formatted)
    return formatted;
}

let expiryDateString = createDateString(now);
const expiryDate = document.getElementById('expiry-date-string');
expiryDate.innerText = expiryDateString;
