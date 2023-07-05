import { io } from "socket.io-client";

import { SOCKET_URL } from "../tools/config";

export default class Socket {

    #_socket = null;

    constructor(boardIdentifier, initShapes, onDraw, onDelete){
        this.#_socket = io(SOCKET_URL);

        this.#_socket.on("connect", () => {
            this.#_socket.emit("joinToRoom", boardIdentifier);

            this.#_socket.on("newShape", shape => onDraw && onDraw(shape));
            this.#_socket.on("deleteShape", shape => onDelete && onDelete(shape));
            this.#_socket.on("initShapes", shapes => initShapes(shapes));
        });
    }

    deleteShape(shape){
        this.#_socket.emit("deleteShape", shape);
    }

    deleteAllShapes(shapes){
        this.#_socket.emit("deleteAllShapes", shapes);
    }

    sendShape(shape){
        this.#_socket.emit("draw", shape);
    }

    sendShapes(shapes){
        this.#_socket.emit("allShapes", shapes);
    }
}
