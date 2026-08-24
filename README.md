# TopAlternativesTo MCP server

Give your AI assistant verified software comparisons: pricing read from the
vendor's own page and dated, and a ranked verdict on what to switch to.

Backed by [TopAlternativesTo](https://topalternatives.to), an independent
software comparison site covering 359 tools across 59 categories with 358
ranked alternatives guides.

Free, read-only, no auth, no API key.

## Install

### Claude Code

```bash
claude mcp add --transport http topalternativesto https://topalternatives.to/api/mcp/mcp
```

### Claude Desktop, Cursor, VS Code

Add the server to the client's MCP config:

```json
{
  "mcpServers": {
    "topalternativesto": {
      "type": "http",
      "url": "https://topalternatives.to/api/mcp/mcp"
    }
  }
}
```

### stdio clients

Clients that only speak stdio can run this package, which proxies the hosted
server:

```bash
npx topalternativesto-mcp
```

## Tools

| Tool | Parameters | Returns |
|---|---|---|
| `search_tools` | `query`, `category`, `free_tier`, `max_price`, `limit` | Filtered catalogue. Matches on name, category, tagline and features, best match first |
| `get_tool` | `slug` | One tool in full: what it is, pricing with the vendor page it was read from and the date, who it suits and who it does not |
| `get_alternatives` | `slug` | The ranked alternatives, with the verdict on which one fits which kind of buyer |

Every response carries the page URL, so the full reasoning and the date it was
checked stay one click away.

## What you can ask

- "What should we move to instead of Zendesk? We are eight people."
- "Find project management tools with a free plan under $15 a seat."
- "What does Notion actually cost, and when was that checked?"

## About the data

Pricing is read from each vendor's own pricing page, and every price is
returned with that source URL and the date it was checked. Treat it as the
vendor's list price on that date rather than as live pricing; enterprise
pricing is negotiated.

The catalogue and the method behind it are documented at
[topalternatives.to/methodology](https://topalternatives.to/methodology).
There is also a [REST API](https://topalternatives.to/developers) for bulk
access, and [full MCP docs](https://topalternatives.to/mcp).

## Licence

Code MIT. The data is CC BY 4.0: reuse it, including commercially, with a
visible link back to [topalternatives.to](https://topalternatives.to).
