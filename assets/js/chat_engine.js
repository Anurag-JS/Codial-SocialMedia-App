
class ChatEngine{
    constructor(chatBoxId, userEmail){

        this.chatBox= $(`#${chatBoxId}`);
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self =this;

        this.socket.on('connect', function(){
            console.log('Sockets Connection Established');

            self.socket.emit('join_room', {
                user_email : self.userEmail,
                chatroom : 'codial'
            });

            self.socket.on('user_joined', function(data){
                console.log('A user joined');
            });
        });

        // Send message on clicking the send button
        $('#send_message').click(function(){
            let msg = $('chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message : msg,
                    user_email : self.userEmail,
                    chatroom : 'codial'
                })
            }
        });

        self.socket.on('receive-message', function(data){
            console.log('Message received', data.message);

            let newMessage = $('<li>');
            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message'
            }

            newMessage.append($('<span>', {
                'html' : data.message
            }));

            newMessage.append($('<sub>', {
                'html' : data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}