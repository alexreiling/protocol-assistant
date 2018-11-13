import Conversation from "./Conversation";


class ConvStore {
  constructor(){
    this.convs = new Map()
  }
  createConv(){
    var conv = new Conversation();
    this.convs.set(conv.id,conv)
    return conv
  }
}


export default ConvStore