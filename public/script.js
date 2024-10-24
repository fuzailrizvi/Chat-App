const socket=io();

const sendBtn=document.getElementById('sendBtn');
const messageInput=document.getElementById('messageInput');
const chatBox=document.getElementById('chatBox');
const usernameContainer=document.querySelector('.set-username-container')
const chatContainer=document.querySelector('.chat-container');




sendBtn.addEventListener('click',(e)=>{
    const message=messageInput.value;
    messageInput.value="";
    sendMessage(message);
    
    
})

function sendMessage(message){
    socket.emit('new-message',{
        message,
    })
}

function main(){
    const inp=usernameContainer.children[0];
    const setUsernameBtn=usernameContainer.children[1];

    setUsernameBtn.addEventListener('click',()=>{
        const username=inp.value;
        
        
        inp.value="";
        if(username.length<2){
            return;
        }

        socket.emit('set-username',{
            username,
        })


        showChatBox();
    })
    
    
    
    
    socket.on('new-message',(data)=>{
        
      
       
        
        
        appendToChat(data);
    })
}

function appendToChat(data){
const div=document.createElement('div');
if(socket.id==data.socketId){
   div.classList.add('message','sent'); 
    
}
else{
   div.classList.add('message','received');
    
}
    div.innerHTML=`<p>${data.username} - ${data.message}</p>`

    chatBox.append(div);

}

function showChatBox(){
    chatContainer.style.display="block";
    usernameContainer.style.display="none";
}

main();