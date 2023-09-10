import * as cookieParser from 'cookie-parser';

type WebSocketData = {
  createdAt: number;
  channelId: string;
  authToken: string;
};

// TypeScript: specify the type of `data`
Bun.serve<WebSocketData>({
  fetch(req, server) {
    // use a library to parse cookies
    const cookies = req.headers.get("Cookie");
    if (cookies != null) {
        server.upgrade(req, {
        // this object must conform to WebSocketData
        data: {
            createdAt: Date.now(),
            channelId: new URL(req.url).searchParams.get("channelId"),
            authToken: cookies["X-Token"],
        },
        })
    };
    if (cookies == null) {
        return new Response("No cookies :C 🍪")
    }
    return new Response(undefined);
  },
  websocket: {
    // handler called when a message is received
    async message(ws, message) {
      console.log(ws)
      const user = getUserFromToken(ws.data.authToken);

      await saveMessageToDatabase({
        channel: ws.data.channelId,
        message: String(message),
        userId: user.id,
      });
    },
  },
});
