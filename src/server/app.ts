import { config } from 'dotenv'
import express, { Application, json, urlencoded } from 'express'
import connectDB from './db/config'
import customerRoute from './router/customer.route'

config() // init environment configuration

connectDB() // start db connection

const app : Application = express() // init express app

// start body parsing process
app.use(json())
app.use(urlencoded({extended : false}))

app.use('/api/customer', customerRoute) // customer apis

const PORT : string | number = process.env.PORT || 8080
app.listen(PORT, () : string => `server running at localhost:${PORT}`)