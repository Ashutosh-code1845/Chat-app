const socket = io('http://localhost:3000')
const messageForm=document.getElementById('myform');
const messageInput=document.getElementById('tosend')
const messageContainer=document.querySelector(".container")
 var audio_get=new Audio('../mp3/get.mp3');
 var audio_put=new Audio('../mp3/put.mp3');
 var audio_grp=new Audio('../mp3/enter.mp3');

const appendMessage=(message, position)=>{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position=='left'){
    audio_get.play();
  }
  else if(position=='right'){
    audio_put.play();
  }
  else if(position=='mid'){
    audio_grp.play();
  }
}
const name = prompt('Hey!! Welcome, Eneter your name:')
appendMessage('You joined','mid')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`,'left')
})

socket.on('user-connected', name => {
  appendMessage(`${name} entered the chat.`,'mid')
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left the chat.`,'mid')
})

messageForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message=messageInput.value;
  if(message!=''){
  appendMessage(`${message}`,'right');
  socket.emit('send-chat-message',message);
  messageInput.value=''
  }
})
