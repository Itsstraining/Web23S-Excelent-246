import { AuthModel } from "./auth.model";

export interface RoomModel{
    id: string;
    users: AuthModel[];
    
}