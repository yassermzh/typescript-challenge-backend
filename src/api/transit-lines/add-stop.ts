import { Request, Response } from 'express'
import { lineService } from 'src/services/lineService'

/**
 * Get a line from the store
 */
export async function addStop(req: Request & { lineId: string }, res: Response) {
  const { currentStopId } = req.body as { currentStopId: string }
  lineService.addStop(req.lineId, undefined, currentStopId, 'after')
  const theLine = lineService.getLine(req.lineId)
  res.status(200).send(theLine)
}
