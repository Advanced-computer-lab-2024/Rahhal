import { Response } from 'express';

class SSEService {
  private clients: Map<string, Response> = new Map();

  registerClient(userId: string, res: Response) {
    // Close any existing connection for this user
    const existingClient = this.clients.get(userId);
    if (existingClient) {
      existingClient.end();
    }

    // Setup SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-open'
    });

    // Send initial heartbeat
    res.write('event: connected\ndata: Connected to notification stream\n\n');

    this.clients.set(userId, res);
  }

  sendNotification(userId: string, notification: any) {
    const client = this.clients.get(userId);
    if (client) {
      client.write(`event: notification\ndata: ${JSON.stringify(notification)}\n\n`);
    }
  }

  removeClient(userId: string) {
    const client = this.clients.get(userId);
    if (client) {
      client.end();
      this.clients.delete(userId);
    }
  }
}

export default new SSEService();
