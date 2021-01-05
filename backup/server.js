//socket io server id side and will handle connection
const io=require("socket.io")(3000)
 const users = {};
 
 //connection establishing statement
 io.on('connection', socket=>{
    console.log('We are now connected');
    //ab connection k baad krna kya h
    socket.on('new-user-joined',name=>{
        //ye user k andar naam append kr dega
        users[socket.id]= name;
        //ab joined logo ko  btane k liye ksis ne join kiya we will emit a event
        socket.broadcast.emit('user-joined',name);
    });
    //ab connection k baad jb message krna ho user ko 
    socket.on('send',message=>{
        //ab jo message h use broadcast krvao
        socket.broadcast.emit('recieve',{message:message, name:users[socket.id]})
    });
})





//to check script execution
console.log("Server side executed")