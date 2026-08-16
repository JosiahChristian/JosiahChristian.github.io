import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");

test("site contains one main landmark and a skip link", () => {
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.match(html, /class="skip" href="#main"/);
});

test("navigation targets resolve to page sections", () => {
  for (const id of ["top", "software", "live", "research", "stack"]) assert.match(html, new RegExp(`id="${id}"`));
});

test("featured repository links use the current GitHub account", () => {
  for (const repo of ["AutomatedPentestDashboard", "TelemetryPipelineJava", "AeroCPSSimulation", "AutonomousPathPlanner"]) assert.match(html, new RegExp(`https://github\\.com/JosiahChristian/${repo}`));
});

test("both live applications expose launch and repository links", () => {
  for (const repo of ["AeroCPSTelemetry", "BiomedicalTelemetryVisualizer"]) {
    assert.match(html, new RegExp(`https://josiahchristian\\.github\\.io/${repo}/`));
    assert.match(html, new RegExp(`https://github\\.com/JosiahChristian/${repo}`));
  }
});

test("canonical and social metadata identify the production URL", () => {
  assert.match(html, /rel="canonical" href="https:\/\/josiahchristian\.github\.io\/"/);
  assert.match(html, /property="og:url" content="https:\/\/josiahchristian\.github\.io\/"/);
});
