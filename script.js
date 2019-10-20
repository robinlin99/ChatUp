const socket = io("http://localhost:3000")
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const userNav = document.getElementById('user_nav')
const name = prompt("What is your name?")
appendMessage('I Joined!')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(data.name+": "+ data.message)
})

socket.on('user-connected', name => {
    appendMessage(name+" Joined!")
    appendUser(name)
})

socket.on('user-disconnected', name => {
    appendMessage(name+" Disconnected!")
    removeUser(name)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage('Me'+": "+message)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

function appendUser(name) {
    const listElement = document.createElement('div')
    listElement.innerText = name
    userNav.append(listElement)
}

function removeUser(name) {
    const listElement = document.createElement('div')
    listElement.innerText = name
    userNav.remove(listElement)
}