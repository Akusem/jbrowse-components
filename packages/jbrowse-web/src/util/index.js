import fromEntries from 'object.fromentries'

if (!Object.fromEntries) {
  fromEntries.shim()
}

export function assembleLocString({ refName, start, end }) {
  return `${refName}:${start + 1}-${end}`
}

export function clamp(val, min, max) {
  if (val < min) return min
  if (val > max) return max
  return val
}

function roundToNearestPointOne(num) {
  return Math.round(num * 10) / 10
}

export function bpToPx(bp, region, bpPerPx, flipped = false) {
  if (flipped) {
    return roundToNearestPointOne((region.end - bp) / bpPerPx)
  }
  return roundToNearestPointOne((bp - region.start) / bpPerPx)
}

export function featureSpanPx(feature, region, bpPerPx, flipped = false) {
  const start = bpToPx(feature.get('start'), region, bpPerPx, flipped)
  const end = bpToPx(feature.get('end'), region, bpPerPx, flipped)
  return flipped ? [end, start] : [start, end]
}

export const objectFromEntries = Object.fromEntries.bind(Object)

// do an array map of an iterable
export function iterMap(iterable, func, sizeHint) {
  const results = sizeHint ? new Array(sizeHint) : []
  let counter = 0
  for (const item of iterable) {
    results[counter] = func(item)
    counter += 1
  }
  return results
}

/**
 * properly check if the given AbortSignal is aborted.
 * per the standard, if the signal reads as aborted,
 * this function throws either a DOMException AbortError, or a regular error
 * with a `code` attribute set to `ERR_ABORTED`.
 *
 * for convenience, passing `undefined` is a no-op
 *
 * @param {AbortSignal} [signal]
 * @returns nothing
 */
export function checkAbortSignal(signal) {
  if (!signal) return

  if (!(signal instanceof AbortSignal)) {
    throw new TypeError('must pass an AbortSignal')
  }

  if (signal.aborted) {
    if (typeof DOMException !== 'undefined')
      throw new DOMException('aborted', 'AbortError')
    else {
      const e = new Error('aborted')
      e.code = 'ERR_ABORTED'
      throw e
    }
  }
}

/**
 * check if the given exception was caused by an operation being intentionally aborted
 * @param {Error} exception
 * @returns {boolean}
 */
export function isAbortException(exception) {
  return (
    // DOMException
    exception.name === 'AbortError' ||
    // standard-ish non-DOM abort exception
    exception.code === 'ERR_ABORTED' ||
    // stringified DOMException
    exception.message === 'AbortError: aborted'
  )
}

export const inDevelopment =
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_ENV === 'development'

export const inProduction = !inDevelopment
