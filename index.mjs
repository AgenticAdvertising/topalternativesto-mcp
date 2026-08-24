#!/usr/bin/env node
/**
 * TopAlternativesTo MCP: stdio proxy.
 *
 * Re-exposes the hosted Streamable HTTP server over stdio so it installs with
 * npx and runs in clients and registries that expect a local process. All the
 * logic lives on the hosted endpoint; this file only forwards.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const REMOTE = process.env.TOPALTERNATIVESTO_MCP_URL || "https://topalternatives.to/api/mcp/mcp";

const client = new Client({ name: "topalternativesto-proxy", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(new URL(REMOTE)));

const server = new Server(
  { name: "topalternativesto", version: "1.0.0" },
  { capabilities: { tools: {} } },
);
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: (await client.listTools()).tools }));
server.setRequestHandler(CallToolRequestSchema, (req) =>
  client.callTool({ name: req.params.name, arguments: req.params.arguments ?? {} }),
);
await server.connect(new StdioServerTransport());
console.error("TopAlternativesTo MCP (stdio proxy) connected to", REMOTE);
