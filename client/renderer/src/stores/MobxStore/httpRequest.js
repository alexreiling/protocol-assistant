export default async function httpRequest(config,reqData){
  if (config.disabled) {
    console.log(`Request ${config} is disabled. Returning data without processing`)
    return reqData
  }
  reqData = config.preProprocesser ? await config.preProprocesser(reqData) : reqData
  config.init.body = JSON.stringify(reqData)
  let request = new Request(config.url, config.init)
  let response = config.override ? await config.override(reqData,request) : await fetch(request)
  let resData = await response.json()
  return config.postProcessor ? await config.postProcessor(resData,response) : resData
}