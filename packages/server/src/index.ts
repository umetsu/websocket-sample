import { WebSocket, WebSocketServer } from "ws"

const wsServer = new WebSocketServer({ port: 8080 })

wsServer.on("connection", (ws) => {
  console.log("Client connected!")

  ws.on("message", (buffer: Buffer) => {
    const message = buffer.toString()
    console.log(`Received message =>`, message)

    wsServer.clients.forEach((client) => {
      console.log(
        `Client readyState => ${client.readyState}`,
        "state is open? ",
        client.readyState === WebSocket.OPEN,
      )

      if (ws !== client && client.readyState === WebSocket.OPEN) {
        console.log(`Send message to client => ${message}`)
        client.send(message)
      }
    })

    ws.on("close", () => {
      console.log("Client disconnected!")
    })
  })
})
