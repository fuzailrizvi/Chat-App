const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const {Server}=require('socket.io');
const io=new Server(server);
const path=require('path');
const PORT=process.env.PORT || 5500;

app.use(express.static(path.join(__dirname,'public')));
const users={};


io.on('connection',(socket)=>{
   

    socket.on('set-username',(data)=>{
        users[socket.id]=data.username;
    })
    
    socket.on('new-message',(data)=>{
        io.emit('new-message',{
            ...data,
            socketId:socket.id,
            username:users[socket.id]
        })
        
    })

})



server.listen(PORT,()=>{
    console.log('Server is up at',PORT);
    
})

