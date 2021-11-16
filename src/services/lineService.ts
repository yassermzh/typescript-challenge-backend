import { LINES } from 'constants/lines'
import { TransitLine } from 'types/line'
import { TransitStop } from 'types/stop'
import { v4 as uuidv4 } from 'uuid'

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
  addStop(lineId: string, _stop: TransitStop | undefined, reference: string, position: 'before' | 'after' = 'after'): void {
    // TODO
    const line = this.lines[lineId]
    const referenceStopIndex = line.findIndex((stop) => stop.stopId === reference)
    const referenceStop = line[referenceStopIndex]
    const currentNextStop = line.find((stop) => stop.stopId === referenceStop.nextStopId)

    // pick next stop location based along current ones
    let lat = 0
    let lng = 0
    if (!currentNextStop) {
      const currentPrevStop = line.find((stop) => stop.stopId === referenceStop.prevStopId)
      const diffLng = referenceStop.lng - currentPrevStop.lng
      const diffLat = referenceStop.lat - currentPrevStop.lat
      const deltaLng = 1 * diffLng
      if (diffLng < 0.0001) {
        lat = diffLat + referenceStop.lat
      } else {
        lat = (diffLat / diffLng) * deltaLng + referenceStop.lat
      }
      lng = referenceStop.lng + deltaLng
    } else {
      lat = (referenceStop.lat + currentNextStop.lat) / 2
      lng = (referenceStop.lng + currentNextStop.lng) / 2
    }

    const newStop: TransitStop = {
      name: 'AFTER ' + referenceStop.name + ' [U]',
      stopId: uuidv4(),
      lat,
      lng,
      prevStopId: referenceStop.stopId,
      nextStopId: referenceStop.nextStopId,
      peopleOn: 0,
      peopleOff: 0,
      reachablePopulationWalk: 0,
      reachablePopulationBike: 0,
    }
    referenceStop.nextStopId = newStop.stopId
    if (currentNextStop) {
      currentNextStop.prevStopId = newStop.stopId
    }
    const newLine = [...line.slice(0, referenceStopIndex + 1), newStop, ...line.slice(referenceStopIndex + 1)]
    this.lines[lineId] = newLine
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
