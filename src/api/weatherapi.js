export const weatherInfo=async(area)=>{
  const weatherdata=await fetch(`${process.env.REACT_APP_BASE_URL}/weather?q=${area}&appid=${process.env.REACT_APP_OPENWEATHER_API}`)
  const weatherinfo=await weatherdata.json()
  return await weatherinfo
}