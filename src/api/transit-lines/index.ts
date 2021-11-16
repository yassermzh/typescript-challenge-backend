import { Router } from 'express'
import { getLine } from './get-line'
import { addStop } from './add-stop'
import { deleteStopFromLine } from './delete-stop-from-line'
import { validateLineId } from './validate-lineid'

export const transitLinesRouter = Router()

transitLinesRouter.get('/:lineId', validateLineId, getLine)

// TODO add CRUD methods
transitLinesRouter.delete('/:lineId/stops/:stopId', validateLineId, deleteStopFromLine)
transitLinesRouter.post('/:lineId/stops', validateLineId, addStop)
