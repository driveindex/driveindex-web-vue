function paddingZero(num: number): string {
  return num > 9 ? num.toString() : `0${num}`
}
export function timeFormat(timestamp: number): string {
  const time = new Date(timestamp)
  return time.getFullYear() + '-' + paddingZero(time.getMonth() + 1) +
    '-' + paddingZero(time.getDate()) +
    ' ' + paddingZero(time.getHours()) + ':' +
    paddingZero(time.getMinutes())
}

export function sizeFormat(size: number): string{
  if (size < 1024) {
    return size + 'B'
  }
  if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  }
  if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'MB'
  }
  return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
}
