import {z} from "zod"

export const signUInSchema = z.object({
    code:z.string(),
    password:z.string()
})