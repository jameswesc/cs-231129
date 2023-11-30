import { Vector3 } from 'three'

export 	function createCirclePoints(
    radius = 1,
    thetaStart = 0,
    thetaEnd = 2 * Math.PI,
    numberOfPoints = 360
) {
    const points = []
    const deltaTheta = (thetaEnd - thetaStart) / (numberOfPoints - 1)
    for (let i = 0; i < numberOfPoints; i++) {
        const theta = thetaStart + i * deltaTheta
        points.push(new Vector3(radius * Math.cos(theta), radius * Math.sin(theta), 0))
    }
    return points
}


