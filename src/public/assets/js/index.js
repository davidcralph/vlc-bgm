const socket = io.connect('http://localhost');

const updating = document.getElementById('updating');
const submitbtn = document.getElementById('submitbtn');
const modal = document.getElementsByClassName('modal')[0];
const subtitle = document.getElementsByClassName('subtitle')[0];

const showmodal = (type) => {
    document.getElementById('volume-title').innerText = type + ' Volume';
    window.type = type.toLowerCase();
    modal.style.display = 'block';
};

const hidemodal = () => {
    modal.style.display = 'none';
    updating.innerText = '';
    submitbtn.disabled = false;
};

socket.on('refresh', (data) => {
    subtitle.innerText = `Current status: ${data.status} @ volume ${data.volume}%`;
    hidemodal();
});

socket.on('refreshstats', (data) => {
    subtitle.innerText = `Current status: ${data.status} @ volume ${data.volume}%`;
});

document.getElementsByClassName('modal-background')[0].onclick = () => { 
    hidemodal();
}

const amount = document.getElementById('amount');
amount.oninput = () => { 
    document.getElementById('amountcurrent').innerText = `0 (${amount.value})`;
};

const speed = document.getElementById('speed');
speed.oninput = () => { 
    document.getElementById('speedcurrent').innerText = `0 (${speed.value})`;
};

const submitmodal = () => {
    socket.emit('changevolume', window.type, amount.value, speed.value);
    updating.innerText = 'Updating...';
    submitbtn.disabled = true;
};


document.getElementById('volumeslider').onchange = (e) => { 
    socket.emit('changevolumeexact', e.target.value);
}