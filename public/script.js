var msgbox = document.getElementById('message-box');
var username = '';

var socket = null;
$(function(){
    socket = io.connect('http://localhost:3000');

    socket.on('new_message',(data) => {
        if(data.username === username)
            return;
        let template = getTemplate(data.message,data.username);
        $('#message-box').append(template);
        msgbox.scrollTop = msgbox.scrollHeight;
    });
})

$('#username-display').hide();

$('#message-form').on('submit',function(e){
    e.preventDefault();
    let value = $('#message-txt').val();
    $('#message-txt').val('');
    if(!value)
        return;
    socket.emit('message',{username : username, message : value});
    let template = '<div class="row"><h6 class="message-style-left left">' + value + '</h6><div>';
    $('#message-box').append(template);
    msgbox.scrollTop = msgbox.scrollHeight;
});

$('#username-form').on('submit',function(e){
    e.preventDefault();
    username = $('#username-txt').val();
    $('#username-txt').val('');
    if(!!username){
        $('#username').append(username);
        $('#username-display').show();
        $('#username-input').hide();
        socket.emit('change_username',{'username':username});
    }
});

function getTemplate(message,username){
    return (`<div class="row">
        <h6 class="message-style-right right">
            ${message}
        </h6><br/><br/>
        <span class="right" style="margin-right:10px;">${username}</span>
    </div>`);
}