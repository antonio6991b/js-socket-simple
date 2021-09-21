const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8082});
let CLIENTS=[];
let id=0;

wss.on("connection", ws => {
    console.log("new client connected. id: " + id);
    CLIENTS[id] = ws;
    sendAll("new client connected", id)
    id++;

    ws.on("message", data => {
        let clientid = 0;
        for(i=0; i<CLIENTS.length;i++){
            if (ws===CLIENTS[i]){
                clientid = i;
            }

        }
        console.log('client '+clientid+' has sent us: ' + data);
        sendAll(data, clientid);
    });

    ws.on("close", () =>{
        let clientid = 0;
        for(i=0; i<CLIENTS.length;i++){
            if (ws===CLIENTS[i]){
                clientid = i;
            }
        }
        console.log("client " + clientid+" has disconnected");
    });

    function sendAll(msg, clientid){
        
        for(i=0; i < CLIENTS.length; i++){
            prefix = "client " + clientid + " said>> ";
            if(i===clientid){
                prefix = "i said>> ";
            }
            CLIENTS[i].send(prefix + msg);
        }
    }
});