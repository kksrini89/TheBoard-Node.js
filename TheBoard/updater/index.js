(function (updater) {
    
    var socketio = require('socket.io');

    updater.init = function (server) {
        var io = socketio.listen(server);
        io.sockets.on("connection", function (socket) {
            console.log("Socket was connected!");
            //socket.emit("showThis", "This is from the server!");
            
            socket.on('join category', function (category) {
                socket.join(category);
            });

            socket.on("newNote", function (msg){
                socket.broadcast.to(msg.category).emit("broadcast note", msg.note);
            })
        });
    }

})(module.exports);