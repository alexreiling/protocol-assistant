import {toJS,isObservable} from 'mobx'
export default async function httpRequest(config,reqData,store){
  if (config.disabled) {
    console.log(`Request ${config} is disabled. Returning data without processing`)
    return reqData
  }
  store.unfreezeAllProps()
  if(config.afterPickup) await config.afterPickup(store)
  reqData = isObservable(reqData) ? toJS(reqData) : reqData
  reqData = await (config.preProcessor ? config.preProcessor(reqData) : reqData)
  config.init.body = JSON.stringify(reqData)
  let request = new Request(config.url, config.init)
  let response = await (config.override ? config.override(reqData,request) : fetch(request))
  let resData = await response.json()
  if (response.status >= 300) throw new Error(`response returned status ${response.status}`,response)
  return await(config.postProcessor ? config.postProcessor(resData, response, store) : resData)
}