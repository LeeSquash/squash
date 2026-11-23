import { createServer } from "node:http";
import { readFile } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const contentTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
};

createServer((request, response) => {
  const requestedPath = decodeURIComponent(
    new URL(request.url, "http://localhost").pathname,
  ).slice(1);
  const filePath = path.resolve(root, requestedPath || "index.html");

  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Unable to read file");
      return;
    }

    response.writeHead(200, {
      "Content-Type": `${contentTypes[path.extname(filePath)] || "application/octet-stream"}; charset=utf-8`,
    });
    response.end(content);
  });
}).listen(8000, "127.0.0.1", () => {
  console.log("The Squash Community preview: http://localhost:8000");
});
