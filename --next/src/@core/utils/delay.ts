export default async function delay(time = 1000) {
  return await new Promise((res) => setTimeout(res, time));
}
