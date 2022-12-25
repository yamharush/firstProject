import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import body_parser from 'body-parser'
app.use(body_parser.urlencoded({ extended: true, limit: '1mb' }))
app.use(body_parser.json())

import mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL) //{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => { console.error(error) })
db.once('open', () => { console.log('connected to mongo DB') })

import postRouter from './routes/post_route.js'
app.use('/post', postRouter)

import authRouter from './routes/auth_route.js'
app.use('/auth', authRouter)


import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

if (process.env.NODE_ENV == "development") {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Web Dev 2022 REST API",
                version: "1.0.0",
                description: "REST server including authentication using JWT",
            },
            servers: [{ url: "http://localhost:3000", },],
        },
        apis: ["./src/routes/*.ts"]
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}


export = app
