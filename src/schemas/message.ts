import {z} from "zod"

export const messageSchema = z.object({
    content:z.string()
    .min(10,{message:'Message must be at lest 10 characters'})
    .max(300,{message:'Message must be no more then 300 characters'})
})