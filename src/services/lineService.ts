import { LINES } from 'constants/lines'
import { TransitLine } from 'types/line'
import { TransitStop } from 'types/stop'

export class LineService {
  private lines: { [lineId: string]: TransitLine }

  constructor() {
    this.lines = LINES // populate initial lines
  }

  /**
   * Check wehter a line exists
   * @param lineId Id of the line to be checked
   */
  hasLine(lineId: string): boolean {
    return !!this.lines[lineId]
  }

  /**
   * Get a line by it's id
   * @param lineId Id of the line
   */
  getLine(lineId: string): TransitLine {
    return this.lines[lineId]
  }

  /**
   * Add a new line
   * @param newLineId New id of the line. Cannot be an id that already exists
   * @param stops Array of stops for the new line. Note: A line needs a minimum of two stops.
   */
  addLine(newLineId: string, stops: TransitStop[]): void {
    // TODO
  }

  /**
   * Add a stop to a line
   * @param lineId Id of the line
   * @param stop the stop you want to add
   * @param reference id of a reference stop
   * @param position defines if the new stop is added before or after the existing stop
   */
  addStop(lineId: string, stop: TransitStop, reference: string, position: 'before' | 'after' = 'after'): void {
    // TODO
  }

  /**
   * Delete a stop from a line
   * @param lineId Id of the line
   * @param stopId Id of the stop to delete
   */
  deleteStop(lineId: string, stopId: string) {
    const line = this.lines[lineId]
    const stopIndex = line.findIndex((stop) => stop.stopId === stopId)
    const currentStop = line[stopIndex]
    const nextStop = line.find((stop) => stop.stopId === currentStop.nextStopId)
    const prevStop = line.find((stop) => stop.stopId === currentStop.prevStopId)
    if (nextStop) {
      nextStop.prevStopId = prevStop ? prevStop.stopId : null
    }
    if (prevStop) {
      prevStop.nextStopId = nextStop ? nextStop.stopId : null
    }
    const newLine = [...line.slice(0, stopIndex), ...line.slice(stopIndex + 1)]
    this.lines[lineId] = newLine
    return this.getLine(lineId)
  }
}

export const lineService = new LineService()
