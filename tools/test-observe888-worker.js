const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

async function loadWorker() {
  const workerPath = path.join(__dirname, "..", "cloudflare", "observe888-legacy-redirects.js");
  const source = fs.readFileSync(workerPath, "utf8");
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  return (await import(moduleUrl)).default;
}

async function main() {
  const worker = await loadWorker();
  const originalFetch = global.fetch;
  const calls = [];

  global.fetch = async (input, init = {}) => {
    const url = String(input);
    calls.push({ url, method: init.method });

    if (url.endsWith("/south")) {
      return new Response("not found", { status: 404 });
    }
    if (url.endsWith("/south/index.html")) {
      return new Response("<h1>South</h1>", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
    if (url.endsWith("/index.html")) {
      return new Response("<h1>Home</h1>", { status: 200 });
    }
    throw new Error(`unexpected upstream request: ${url}`);
  };

  try {
    const south = await worker.fetch(new Request("https://www.observe888.com/south"));
    assert.equal(south.status, 200);
    assert.equal(await south.text(), "<h1>South</h1>");
    assert.equal(south.headers.get("Content-Type"), "text/html; charset=utf-8");
    assert.equal(south.headers.get("X-Observe-Origin"), "github-raw-main");
    assert.equal(south.headers.get("X-Frame-Options"), "DENY");
    assert.deepEqual(
      calls.map((call) => call.url),
      [
        "https://raw.githubusercontent.com/paul800901/observe888-visit-hub/main/south",
        "https://raw.githubusercontent.com/paul800901/observe888-visit-hub/main/south/index.html",
      ],
    );
    assert.ok(calls.every((call) => call.method === "GET"));

    calls.length = 0;
    const head = await worker.fetch(new Request("https://www.observe888.com/", { method: "HEAD" }));
    assert.equal(head.status, 200);
    assert.equal(await head.text(), "");
    assert.equal(calls[0].url.endsWith("/index.html"), true);

    calls.length = 0;
    const apex = await worker.fetch(
      new Request("https://observe888.com/south/?gclid=readback&utm_source=google"),
    );
    assert.equal(apex.status, 301);
    assert.equal(
      apex.headers.get("Location"),
      "https://www.observe888.com/south/?gclid=readback&utm_source=google",
    );
    assert.equal(calls.length, 0);

    const legacy = await worker.fetch(
      new Request("https://www.observe888.com/index.php?utm_source=google&private=drop"),
    );
    assert.equal(legacy.status, 301);
    assert.equal(legacy.headers.get("Location"), "https://www.observe888.com/?utm_source=google");
  } finally {
    global.fetch = originalFetch;
  }

  console.log("Observe888 Worker tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
