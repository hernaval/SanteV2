import socketIOClient from "socket.io-client"
import Bdd from '../API/Bdd'
let socket = null


export const _setSocket = (namespace) =>{
    socket = socketIOClient(`${Bdd.socket_url}/${namespace}`)
}

export const _emitEvent = (event, data) => {
    socket.emit(event, data)
}

export const onSamaritainListChange = (callback) =>{
    socket.on("samaritain_list_changed", (data) => callback(data))
}