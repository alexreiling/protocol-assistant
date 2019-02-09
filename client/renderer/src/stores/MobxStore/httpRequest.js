

export default async function httpRequest(request,body){
  let data = request.override ? await request.override(body) : await fetch()
  return request.postProcessor ? request.postProcessor(data) : data
}