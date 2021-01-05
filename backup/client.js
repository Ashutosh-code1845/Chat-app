const socket= io('http://loacalhost:3000');

const form=document.getElementById('myform');
const messageInput=document.getElementById('tosend')
const messageContainer=document.querySelector(".container")

//socket ko event emit kiya aur uname diy
const append=(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    if(message!=''){
    append(`${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
    }
})

//ab joined user kya krega
const name=prompt("Welcome!! Enter your name: ");
socket.emit('new-user-joined',name)

 socket.on('user-joined',name=>{
     append(`${name} joined the chat.`,'mid')
 })


 
 socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`,'left')
});









 //to check script execution
console.log("Client Side script executed");