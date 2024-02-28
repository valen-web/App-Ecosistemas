const socket = io();

const order = document.querySelector('.order');

let cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...'
}

updateOptions(cupcake);

socket.on('update', (cupcake) => {
    cupcake = cupcake;
    updateOptions(cupcake);
})  

function updateOptions(cupcake) {  
    order.innerHTML = '';
    const text = document.createElement('p');
    text.textContent = `Name: ${cupcake.name}, Flavor: ${cupcake.flavor}, Icing: ${cupcake.icing}, Topping: ${cupcake.topping}`;
    order.appendChild(text);
}

socket.on('finishorder', (cupcake) => {
    
})

