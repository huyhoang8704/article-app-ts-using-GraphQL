import express , { Express , Request , Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";

import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs";
import {resolvers} from "./resolvers/index.resolvers";
import { requireAuth } from "./middlewares/auth.middleware";




const app : Express  = express()
const port : number | string = process.env.PORT || 3001;

dotenv.config();
database.connect();

// GraphQL
const startServer = async () => {
    app.use("/graphql",requireAuth); // Call API nó sẽ chạy qua middleware
    
    const apollpServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true, // Gợi ý hàm trên online
        context : ({req}) => {
            return {...req};
        }
    })
    await apollpServer.start();
    apollpServer.applyMiddleware({
        app : app,
        path : '/graphql'
    })

    app.listen(port , () =>{
        console.log(`App listening on port ${port}`);
    })
}

//! "hello": "Hello World" (key : value)

startServer();


