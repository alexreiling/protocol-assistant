import { sendToMain } from "../../util/electronHelpers";

export default function ipcMessage(message,params){
  params.store = 'conversations'
  sendToMain(message,params)
}