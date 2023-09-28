import { Handlers } from "$fresh/server.ts";

interface Log {
    id: number,
    date: Date,
    amount: number | string,
    type: string,
}

export const handler: Handlers<Log | null> = {
    async POST(req, _ctx) {
      const kv = await Deno.openKv();
      const log = (await req.json()) as Log;
      const logKey = ["log", log.id];
      const ok = await kv.atomic().set(logKey, log).commit();
      if (!ok) throw new Error("Something went wrong.");
      return new Response(JSON.stringify(log));
    },

    async GET(_req, ctx) {
      const kv = await Deno.openKv();
      const entries = kv.list({ prefix: ["log"] });
      return new Response(JSON.stringify(entries));
    },
  };