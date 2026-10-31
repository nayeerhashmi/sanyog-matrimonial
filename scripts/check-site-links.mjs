#!/usr/bin/env node
/**
 * Sanyog static-site integrity checker.
 * Checks local HTML links, local assets, same-page anchors, and CSS url() assets.
 * Uses Node built-ins only; no install step is required.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", ".github"]);
const htmlFiles = [];
const cssFiles = [];
const errors = [];
const warnings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) walk(path.join(dir, entry.name));
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.name.endsWith(".html")) htmlFiles.push(full);
    if (entry.name.endsWith(".css")) cssFiles.push(full);
  }
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function decode(value) {
  try { return decodeURIComponent(value); } catch { return value; }
}

function getIds(html) {
  const ids = new Set();
  for (const match of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)) ids.add(match[1]);
  return ids;
}

function resolveLocal(fromFile, raw, label) {
  const value = decode(raw.trim());
  if (!value || value.startsWith("#") || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) return;
  const clean = value.split("#")[0].split("?")[0];
  if (!clean) return;
  const target = path.resolve(path.dirname(fromFile), clean);
  if (!target.startsWith(root + path.sep) && target !== root) {
    errors.push(`${relative(fromFile)}: ${label} escapes the repository: ${raw}`);
    return;
  }
  if (!fs.existsSync(target)) {
    errors.push(`${relative(fromFile)}: missing ${label}: ${raw}`);
    return;
  }
  return target;
}

walk(root);
const htmlCache = new Map(htmlFiles.map(file => [file, fs.readFileSync(file, "utf8")]));
const idCache = new Map([...htmlCache].map(([file, html]) => [file, getIds(html)]));

for (const [file, html] of htmlCache) {
  for (const match of html.matchAll(/\b(?:href|src|poster|action)\s*=\s*["']([^"']+)["']/gi)) {
    const raw = match[1];
    if (/^(?:mailto:|tel:|javascript:|data:|blob:)/i.test(raw)) continue;
    const target = resolveLocal(file, raw, "link or asset");
    if (!target) continue;
    const hashAt = raw.indexOf("#");
    if (hashAt >= 0 && raw.slice(hashAt + 1)) {
      const anchor = decode(raw.slice(hashAt + 1).split("?")[0]);
      if (target.endsWith(".html") && idCache.has(target) && !idCache.get(target).has(anchor)) {
        errors.push(`${relative(file)}: missing anchor #${anchor} in ${relative(target)}`);
      }
    }
  }
}

for (const file of cssFiles) {
  const css = fs.readFileSync(file, "utf8");
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    const raw = match[1].trim();
    if (/^(?:data:|https?:|\/\/|#)/i.test(raw)) continue;
    resolveLocal(file, raw, "CSS asset");
  }
}

for (const file of htmlFiles) {
  const html = htmlCache.get(file);
  if (!/<title\b/i.test(html)) warnings.push(`${relative(file)}: missing document title`);
}

console.log(`Checked ${htmlFiles.length} HTML files and ${cssFiles.length} CSS files.`);
if (warnings.length) {
  console.log("\nWarnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
}
if (errors.length) {
  console.error("\nBroken references:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("No broken local links, anchors, or referenced assets found.");
}
