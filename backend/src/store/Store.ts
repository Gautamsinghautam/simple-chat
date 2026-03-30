
export type UserId = string

export interface Chat{
    id: string,
    userId: string,
    name: string,
    message: string,
    upvotes: UserId[],
}

export abstract class store {
    constructor() {

    }
    initRoom(roomId: string) {
        
    }

    getChats(room: string, limit: number, offset: number){

    }
    addChat(userId: UserId, name: string, roomId: string, message: string){

    }
    upvote(userId: UserId, room: string, chatId: string){

    }

}