/** @format */

export function sleep(timeout: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
