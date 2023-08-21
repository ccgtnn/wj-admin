import moment from 'moment'

/**
 * Возвращает текущее время в unix timestamp
 * @returns unix timestamp
 */
export function now() {
  return moment().unix()
}

/**
 * Возвращает текущее время dmyhi
 */
export function nowFormat() {
  return moment().format('DD.MM.YYYY HH:mm')
}

/**
 * Преобразует timestamp в дату DD.MM.YYYY
 * @param {bigint | string} unix timestamp
 * @returns строку DD.MM.YYYY
 */
export function dmy(unix) {
  return moment(unix).format('DD.MM.YYYY')
}

/**
 * Преобразует timestamp в дату DD.MM.YYYY HH:mm
 * @param {bigint | string} unix timestamp
 * @returns строку DD.MM.YYYY HH:mm
 */
export function dmyhi(unix) {
  return moment(unix).format('DD.MM.YYYY HH:mm')
}

/**
 * Преобразует строку DD.MM.YYYY в unix timestamp
 * @param {string} dmy
 * @returns unix timestamp
 */
export function unixFromDmy(dmy) {
  return moment(dmy, 'DD.MM.YYYY').unix()
}

/**
 * Считает количество дней до даты
 * @param {bigint | string}  unix timestamp
 * @returns строку: количество дней (пример: 123 дн.)
 */
export function countdownDays(unix) {
  const _now = now()
  if (_now > unix / 1000) return false
  const d = Math.ceil((unix / 1000 - _now) / 86400)
  return d + ' дн. '
}

/**
 * Дата в формате: сегодня, вчера...
 * @param {*} unix timestamp
 */
export function textDate(unix) {
  if (moment().format('DD.MM.YYYY') == moment(unix).format('DD.MM.YYYY'))
    return 'СЕГОДНЯ'
  return ''
}

/**
 * Возвращает массив дат [{dmy, unix}] до текущей даты
 * @param {number} n количество дней
 * @param {number} shift сдвиг стартового дня (+1 - день в будущее, -1 - день в прошлое)
 * @returns массив дат [{dmy, unix}] длинной n
 */
export function lastDays(n = 7, shift = 0) {
  const day = moment().add(shift, 'days')
  const res = []
  for (let i = 0; i < n; i++) {
    res.push({
      dmy: day.format('DD.MM.YYYY'),
      unix: day.unix(),
    })
    day.subtract(1, 'days')
  }
  return res
}

export function minsec(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60

  let res = ''
  if (h > 0) res += h + ':'

  // Если есть часы, всегда добавляем минуты, даже если это 0.
  // Иначе добавляем минуты только если они больше 0.
  if (h > 0 || m > 0) res += (m < 10 && h > 0 ? '0' : '') + m + ':'

  // Добавляем секунды, дополняя нулями, если они меньше 10.
  res += (s < 10 ? '0' : '') + s

  return res
}
