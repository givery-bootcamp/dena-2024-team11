import { BoardElement } from "./BoardElement"

export type ModalInfo = {
    post: BoardElement | null,
    position: {
        top: number,
        left: number,
    }
}