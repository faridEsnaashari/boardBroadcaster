import { io } from "socket.io-client";

import { API_URL } from "../tools/config";

export default class Socket {

    #_socket = null;
    #_boardIdentifier = "";

    constructor(onDraw, getShapes, initShapes, boardIdentifier){
        this.#_socket = io(API_URL);
        this.#_boardIdentifier = boardIdentifier;

        this.#_socket.on("connect", () => {
            this.#_socket.emit("joinToRoom", this.#_boardIdentifier);

            this.#_socket.on("newShape", shape => onDraw(shape));
            this.#_socket.on("getAllShapes", () => this.#getShapes(getShapes()));
            this.#_socket.on("initShapes", shapes => initShapes(shapes));
        });
    }

    sendShape(shape){
        this.#_socket.emit("draw", shape, this.#_boardIdentifier);
    }

    #getShapes(shapes){
        this.#_socket.emit("allShapes", shapes, this.#_boardIdentifier);
    }
}
