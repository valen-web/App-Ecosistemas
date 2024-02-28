
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const usersModule = require('./public-client/client.js'); // Corrección en la importación del módulo
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors')

app.use(express.urlencoded({extended :false}))
app.use(express.json()); // Middleware para procesar el cuerpo de la solicitud como JSON
app.use(express.static(path.join(__dirname, 'public-client')));
app.use(cors())

io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado`);

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

app.get('/SignUp', (req, res) => {
    res.sendFile(path.join(__dirname,'public-client' ,'screens', 'SignUp.html'));
  });

app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    const newUser = usersModule.addUser(username, email);
    if (newUser) {
        res.status(201).json(newUser); // Usuario agregado exitosamente
    } else {
        res.status(500).json({ error: 'No se pudo agregar el usuario.' }); // Error al agregar usuario
    }
});
  
  app.get('/api/users', (req, res) => {
    const allUsers = usersModule.getAllUsers();
    res.json(allUsers);
  });

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});