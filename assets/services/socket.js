import socketIOClient from "socket.io-client"
import Bdd from '../API/Bdd'
import io from "socket.io-client"


export class SocketService{
    socket

    constructor(namespace){
        let server  = `${Bdd.socket_url}/${namespace}`
        this.socket = io(server)
    }


    emitEvent = (event, data) => {
        this.socket.emit(event,data)
    }

   
    onSamaritainListChange =  (callback) =>{
        this.socket.on("samaritain_list_changed", (data)=> callback(data))
    }

    onNewSamaritainRequest = (callback) =>{
        this.socket.on("samaritain_request",(data) =>callback(data))
    }



}


// export const _setSocket = (namespace) =>{
//     socket = socketIOClient(`${Bdd.socket_url}/${namespace}`)
// }

// export const _emitEvent = (event, data) => {
//     socket.emit(event, data)
// }

// export const onSamaritainListChange =  (callback) =>{
//     socket.on("samaritain_list_changed", (data) => callback(data))
// }