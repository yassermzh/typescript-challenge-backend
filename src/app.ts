import { json } from 'body-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import * as cors from 'cors'
import { transitLinesRouter } from 'src/api/transit-lines'

export const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(json())

app.use('/transit-lines', transitLinesRouter)
