/**
 * Transforms a string at positions defined in the specialMappings array. Remaining string chunks get transformed as defined in standardMapping
 * @param {string} text - The text to be chunked and mapped
 * @param {Array[]} specialMappings - <startIndex,length,mappingFn>
 * @param {Function} [standardMapping=(text,key) => text)] - (text,key)=>{} 
 */
export function chunkAndMap(text,specialMappings,standardMapping){
  if (!standardMapping) standardMapping = (text) => text
  specialMappings.sort((a,b) => a[0] - b[0])
  var chunks = []
  var offset = 0
  specialMappings.forEach((section,i) => {
    let cutoff = section[0] - offset
    if (cutoff < 0 || cutoff + section[1] > text.length) throw new Error('oops')
    let left = text.substr(0, cutoff)
    if(left) chunks.push(standardMapping(left,'std_' + i.toString()))
    let word = text.substr(cutoff,section[1])
    chunks.push(section[2](word,'spc_' + i.toString()))
    text = text.substr(cutoff + section[1])
    offset = section[0] + section[1]
  })
  if (text) chunks.push(standardMapping(text,'std_last'))
  return chunks;
}

export function convertFloat32ToInt16(buffer) {
  let l = buffer.length;
  let buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l])*0x7FFF;
  }
  return buf.buffer;
}