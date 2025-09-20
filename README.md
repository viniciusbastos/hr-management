# HR Management System

This is a comprehensive HR management system built with modern web technologies.

## Project Structure

The project includes:
- React frontend with TypeScript
- Modern UI components
- Authentication and authorization
- Dashboard and various HR management features

## MCP Server Integration

This project supports Model Context Protocol (MCP) servers for extended functionality.

### Time MCP Server Setup

The project has been configured to work with the time MCP server from:
https://github.com/modelcontextprotocol/servers/tree/main/src/time

This server provides time and timezone conversion capabilities.

## Available Features

- Employee management
- Vacation scheduling
- Weapon tracking (in military context)
- Course and training management
- Sick note handling
- Dashboard analytics

## Development Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## MCP Server Installation

To use the time MCP server, you can either:
1. Use uvx (recommended) - requires uv installation
2. Install via pip - `pip install mcp-server-time`

## Configuration

MCP servers are configured in the cline_mcp_settings.json file, which can be found at:
`~/Library/Application Support/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/mcp_settings.json`

## Contributing

This project is structured to support various HR management functionalities. Contributions are welcome for new features or improvements.
