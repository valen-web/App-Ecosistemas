const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use('/worker', express.static(__dirname + '/public-worker'));
app.use('/client', express.static(__dirname + '/public-client'));

io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado`);

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    })

    socket.on('update', (cupcake) => {
        io.emit('update', cupcake);
    })

    socket.on('finishorder', (cupcake) => {
        io.emit('finishorder', cupcake);

        //should send that info to somewhere ?
    })
})

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
})