import {server as WebSocketServer} from "websocket";
import http from 'http';

var server = http.createServer(function(request: any, response: any){
    console.log((new Date()) +'Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8080, function() {
    console.log((new Date()) + 'server is running on port 8080');
} );

const wsServer = new WebSocketServer ({
    httpServer: server,

    autoAcceptConnections: false
});

function originIsAllowed(origin: string) {

    return true;
}

wsServer.on('request', function(request){
    if(!originIsAllowed(request.origin)){
        request.reject();
        console.log((new Date()) + ' connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' connectioon accepted.');
    connection.on('message', function(message){
        if(message.type === 'utf8'){
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        } else if(message.type === 'binary') {
            console.log('Received Binary messgae of ' + message.binaryData.length + 'bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description){
         console.log((new Date())+ ' peer ' + connection.remoteAddress + ' disconnected.');
    });
});