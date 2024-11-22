let state = {
    showPass: false,
    type: 'rta'
}

let render = () => {
    let passContainer = document.getElementById('pass-container');
    let menuContainer = document.getElementById('menu-container');
    passContainer.style.display = 'none';
    menuContainer.style.display = 'none';

    if (state.showPass) {
        passContainer.style.display = '';
        renderPass(state.type);
    } else {
        menuContainer.style.display = '';
    }
}

let renderPass = (type) => {
    const quantityLabel = document.getElementById('quantity-label');
    quantityLabel.style.display = 'none';

    const expiryDateString = createDateString();

    const isRTA = type === 'rta';
    const headerInfoAgency = document.getElementById('header-info-agency');
    headerInfoAgency.innerText = isRTA ? 'RTA' : 'Jefferson Parish Transit'; 
    
    const logo = document.getElementById('logo');
    logo.src = isRTA ? 'rta_logo.webp' : 'jpt_logo.webp';

    const passInfoTitle = document.getElementById('pass-info-title');
    passInfoTitle.innerText = isRTA ? 'Adult Jazzy Pass 1 Day' : 'Adult Day';

    const passInfoLocation = document.getElementById('pass-info-location');
    passInfoLocation.innerText = isRTA ? 'New Orleans, LA' : 'Jefferson Parish, LA';
    
    setClock();

    const quantity = document.getElementById('quantity-selector');
    const quantityText = document.getElementById('quantity-label-amount');

    if (quantity.value !== '1') {
        quantityLabel.style.display = '';
    }
    quantityText.innerText = quantity.value;


    const expiryDate = document.getElementById('expiry-date-string');
    expiryDate.innerText = expiryDateString;

    setInterval(setClock, 1000)
}

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
    hour = (isPM && hour !== 12) ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;
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

    hour = (isPM && hour !== 12) ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;
    const formatted = `${hour}:${minute}:${second} ${ampm}`;
    return formatted;
}

let setClock = () => {
    let timeString = createTimeString();
    let clock = document.getElementById('clock');
    clock.innerText = timeString;
}

let headerClose = document.getElementById('header-close');
headerClose.addEventListener('click', () => {
    state.showPass = false;
    render();
});

let rtaPassButton = document.getElementById('rta-pass-btn');
rtaPassButton.addEventListener('click', () => {
    state.showPass = true;
    state.type = 'rta';
    render();
});

let jptPassButton = document.getElementById('jpt-pass-btn');
jptPassButton.addEventListener('click', () => {
    state.showPass = true;
    state.type = 'jpt';
    render();
});


render(state);