import { Message } from "@/model/User";

export interface ApiRespose{
    success:boolean;
    message:string;
    isAccestingMessage?:boolean;
    messages?:Array<Message>
}