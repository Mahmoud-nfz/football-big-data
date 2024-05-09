import next from "next";
import { createServer } from "node:http";
import { parse } from "node:url";
import type { Socket } from "net";
import {
  CreateWSSContextFnOptions,
  applyWSSHandler,
} from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { getSession } from "next-auth/react";
import "dotenv/config";

import { appRouter } from "./server/api/root";
import { env } from "./env";

const createContext = async (opts: CreateWSSContextFnOptions) => {
  const session = await getSession(opts);
  const headers = new Headers();

  console.log("createContext for", session?.user?.name ?? "unknown user");

  return {
    session,
    headers,
  };
};

const app = next({ dev: env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

void app.prepare().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const server = createServer(async (req, res) => {
    if (!req.url) return;
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  });
  const wss = new WebSocketServer({ noServer: true });
  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext,
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM");
    handler.broadcastReconnectNotification();
  });

  server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket as Socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  // Keep the next.js upgrade handler from being added to our custom server
  // so sockets stay open even when not HMR.
  const originalOn = server.on.bind(server);
  server.on = function (event, listener) {
    return event !== "upgrade" ? originalOn(event, listener) : server;
  };
  server.listen(env.NEXT_PUBLIC_WS_PORT);

  console.log(
    `> Server listening at ${env.NEXT_PUBLIC_WS_PORT} as ${env.NODE_ENV}`,
  );
});
