const express = require('express');


const app = express();

//Set Template engine as ejs
app.set('view engine','ejs');

//Middle ware setting the folder as public
app.use(express.static('public'));

//routes
app.get('/', (req,res) => {
    res.render('index');
})

server = app.listen(3000);

var sockets = {};

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('User is connected');

    socket.username = 'Anonymous';

    socket.on('change_username',(data) => {
        socket.username = data.username;
        sockets[data.username] = socket;
    });

    socket.on('message',(data) => {
        let keys = Object.keys(sockets);
        console.log(keys);
        keys.forEach(key => {
            let socket = sockets[key];
            socket.emit('new_message',data);
        })
    });

})
