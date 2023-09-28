import { Handlers } from "$fresh/server.ts";

interface Log {
    id: string | number | null,
    date: Date | string | null,
    amount: number | string | null,
    type: string | null,
}

export const handler: Handlers<Log | null> = {
    async POST(req, _ctx) {
      const kv = await Deno.openKv();
      const id = getPropertyFromUrl(req.url, "id");
      const date = getPropertyFromUrl(req.url, "date");
      const type = getPropertyFromUrl(req.url, "type");
      const amount = getPropertyFromUrl(req.url, "amount");

      const log: Log = {
        id,
        date,
        type,
        amount
      }

      const logKey = ["log", log.id];
      console.log('log', log)
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

  const getPropertyFromUrl = (url: string, property: string) => {
    const urlObject = new URL(url);
    return urlObject.searchParams.get(property);
  };