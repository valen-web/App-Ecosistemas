const socket = io();

const start = document.querySelector('.start');
const namediv = document.querySelector('.name');
const options = document.querySelector('.options');
const qr = document.querySelector('.qr');

const startbtn = document.querySelector('.startbtn');
const nameinput = document.querySelector('.nameinput');
const namebtn = document.querySelector('.namebtn');

const optionsList = [
    ['Cake','vanilla', 'chocolate', 'strawberry', 'banana'],
    ['Icing', 'apple', 'banana', 'orange', 'grape'],
    ['Toppings', 'sprinkles', 'chocolate syrup', 'whipped cream', 'cherry']
];

let cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...'
}

startbtn.addEventListener('click', () => {
    start.style.display = 'none';
    namediv.style.display = 'block';
})

namebtn.addEventListener('click', () => {    
    cupcake.name = nameinput.value;
    socket.emit('update', (cupcake));

    namediv.style.display = 'none';
    options.style.display = 'block';
    displayOptions();
})

function displayOptions() {
    optionsList.forEach((list, i) => {
        const option = document.createElement('select');
        option.classList.add('option');
        option.addEventListener('change', () => {
            cupcake[Object.keys(cupcake)[i+1]] = option.value;
            socket.emit('update', (cupcake));
        })
        list.forEach((item) => {
            const opt = document.createElement('option');
            opt.value = item;
            opt.textContent = item;
            option.appendChild(opt);
        })
        options.appendChild(option);
    })
    const finishbtn = document.createElement('button');
    finishbtn.textContent = 'Finish';
    finishbtn.addEventListener('click', () => {
        options.style.display = 'none';
        qr.style.display = 'block';
        socket.emit('finishorder', (cupcake));
    })
}
    
    

