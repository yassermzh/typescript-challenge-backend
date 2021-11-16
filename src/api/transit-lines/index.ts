import { Router } from 'express'
import { getLine } from './get-line'
import { deleteStopFromLine } from './delete-stop-from-line'
import { validateLineId } from './validate-lineid'

export const transitLinesRouter = Router()

transitLinesRouter.get('/:lineId', validateLineId, getLine)

// TODO add CRUD methods
transitLinesRouter.delete('/:lineId/stops/:stopId', validateLineId, deleteStopFromLine)
