import React from 'react'
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function findWordInstances(text,words){
  if (!words.length) return []
  let term = words.reduce((result,current) => result + escapeRegExp(current) + '|','\\b(?:')
  const regex = new RegExp(term.substr(0, term.length - 1) + ')\\b',"g")
  let match
  let markup = []
  while ((match = regex.exec(text)) !== null) { 
    markup.push({
      index: match['index'], 
      word: match[0],
      length: match[0].length
    });
  }
  return markup
}

export function markUpText(
  text,
  markUpDict, 
  defaultMarkup = (text) => <b>text</b>,
  standardMarkup = (text) => text
) {
  let wordInstances = findWordInstances(text,Object.keys(markUpDict)).map(instance => {
    instance.markup = markUpDict[instance.word].markUp
    return instance
  })
  wordInstances.sort((a,b) => a.index - b.index)
  let markedUpText = []
  let offset = 0
  wordInstances.forEach((instance,i) => {
    let cutoff = instance.index - offset
    if (cutoff < 0 || cutoff + instance.length > text.length) throw new Error('oops')
    let left = text.substr(0, cutoff)
    if(left) markedUpText.push(standardMarkup(left, (instance.index - 1).toString()))
    const markUpFunc = markUpDict[instance.word].markUpFunc || defaultMarkup
    markedUpText.push(markUpFunc(instance.word,instance.index.toString()))
    text = text.substr(cutoff + instance.length)
    offset = instance.index + instance.length
  })
  if (text) markedUpText.push(standardMarkup(text, 'last'))
  return markedUpText;
}