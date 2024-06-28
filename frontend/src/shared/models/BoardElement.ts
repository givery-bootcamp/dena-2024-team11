export type BoardElement = {
    id: number;
    user: {
        id: number;
        name: string;
        icon: string;
    };
    message: string;
    parentId: number;
    stamps: {
        name: string, 
        users: number[], 
        count: number
    }[];
    num_replies: number;
};