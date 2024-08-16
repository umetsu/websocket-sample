import { onUnmounted } from "vue"

export function useWebSocket(
  url: string,
  onMessage: (message: MessageEvent) => void,
) {
  const ws = new WebSocket(url)

  ws.onopen = () => {
    console.log("Connected to server!")
  }
  ws.onclose = () => {
    console.log("Disconnected from server!")
  }
  ws.onmessage = (message) => {
    console.log(`Received message form server => ${message.data}`)

    onMessage(message)
  }

  onUnmounted(() => {
    ws.close()
  })

  function send(data: object | string) {
    ws.send(JSON.stringify(data))
  }

  return { send }
}
