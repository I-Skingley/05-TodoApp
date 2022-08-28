import { db } from "../../db"

export default defineEventHandler((e) => {
    const method = e.req.method;
    if(method==="GET"){
        console.log("GET")
        return db.todos;
    }
    else if(method==="POST"){
        console.log("POST")
    }
})