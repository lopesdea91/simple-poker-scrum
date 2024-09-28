export const sleep = async (time: number = 500) => {
  return await new Promise((res) => setTimeout(res, time))
}
