import moment from 'moment';

export const detectStoppages = (gpsData, threshold) => {
  let stoppages = [];
  let isStopped = false;
  let stopStartTime = null;
  let stopStartPoint = null;

  gpsData.forEach((point, index) => {
    if (index === 0) return;

    const previousPoint = gpsData[index - 1];
    const timeDifference = moment(point.timestamp).diff(moment(previousPoint.timestamp), 'minutes');

    if (point.latitude === previousPoint.latitude && point.longitude === previousPoint.longitude) {
      if (!isStopped) {
        isStopped = true;
        stopStartTime = previousPoint.timestamp;
        stopStartPoint = previousPoint;
      }
    } else {
      if (isStopped) {
        const stopDuration = moment(point.timestamp).diff(moment(stopStartTime), 'minutes');
        if (stopDuration >= threshold) {
          stoppages.push({
            startTime: stopStartTime,
            endTime: previousPoint.timestamp,
            duration: stopDuration,
            location: stopStartPoint,
          });
        }
        isStopped = false;
        stopStartTime = null;
        stopStartPoint = null;
      }
    }
  });

  if (isStopped) {
    const stopDuration = moment(gpsData[gpsData.length - 1].timestamp).diff(moment(stopStartTime), 'minutes');
    if (stopDuration >= threshold) {
      stoppages.push({
        startTime: stopStartTime,
        endTime: gpsData[gpsData.length - 1].timestamp,
        duration: stopDuration,
        location: stopStartPoint,
      });
    }
  }

  return stoppages;
};
