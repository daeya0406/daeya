#!/usr/bin/env node
/**
 * Smoke harness
 * - always: 30-min slot self-check
 * - if SMOKE_BASE_URL set (or server already up on :3000): HTTP checks
 *
 *   npm run build && npm run start   # other terminal
 *   SMOKE_BASE_URL=http://127.0.0.1:3000 npm run smoke
 *
 * Or: npm run smoke:local  (builds, starts, checks, stops)
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

await import("./check-slots.mjs");

const BASE = process.env.SMOKE_BASE_URL ?? null;
const startOwn = process.argv.includes("--start");

async function fetchStatus(base, path) {
  const res = await fetch(`${base}${path}`, { redirect: "manual" });
  return { status: res.status, location: res.headers.get("location") };
}

async function waitReady(base, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(base);
      if (res.status > 0) return;
    } catch {
      // retry
    }
    await sleep(400);
  }
  throw new Error(`Server not ready at ${base}`);
}

async function runHttp(base) {
  const home = await fetchStatus(base, "/");
  assert.equal(home.status, 200, `home expected 200 got ${home.status}`);

  const login = await fetchStatus(base, "/login");
  assert.equal(login.status, 200, `login expected 200 got ${login.status}`);

  const protectedRoute = await fetchStatus(base, "/meetings/new");
  assert.ok(
    [200, 302, 303, 307, 308].includes(protectedRoute.status),
    `protected unexpected ${protectedRoute.status}`,
  );
  if ([302, 303, 307, 308].includes(protectedRoute.status)) {
    assert.ok(
      protectedRoute.location?.includes("/login"),
      `expected login redirect, got ${protectedRoute.location}`,
    );
  }

  const bogusRespond = await fetchStatus(base, "/m/smoke-token-missing");
  assert.ok(
    [404, 200, 500].includes(bogusRespond.status),
    `respond route reachable, got ${bogusRespond.status}`,
  );

  console.log("smoke http ok", {
    base,
    home: home.status,
    login: login.status,
    meetingsNew: protectedRoute.status,
    respondMissing: bogusRespond.status,
  });
}

if (!BASE && !startOwn) {
  console.log("smoke ok (slots only). HTTP: SMOKE_BASE_URL=... npm run smoke");
  process.exit(0);
}

const base = BASE ?? "http://127.0.0.1:3000";
let child;
if (startOwn) {
  child = spawn("npx", ["next", "start", "-p", "3000"], {
    stdio: "ignore",
    cwd: new URL("..", import.meta.url).pathname,
    env: process.env,
  });
}

try {
  await waitReady(base);
  await runHttp(base);
} finally {
  if (child) child.kill("SIGTERM");
}
