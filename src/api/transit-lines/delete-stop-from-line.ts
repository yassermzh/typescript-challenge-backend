import { NextFunction, Request, Response } from 'express'
import { lineService } from 'src/services/lineService'

/**
 * Get a line from the store
 */
export async function deleteStopFromLine(req: Request & { lineId: string }, res: Response, next: NextFunction) {
  const stopId = req.params.stopId as string | undefined
  if (!stopId || typeof stopId !== 'string') {
    res.sendStatus(404)
    return
  }
  const newLine = lineService.deleteStop(req.lineId, stopId)
  res.status(200).send(newLine)
}
