// services/MessageService.ts
import { io, Socket } from "socket.io-client";

class MessageService {
  private socket: Socket;

  constructor() {
    this.socket = io("https://messenger-elhy.onrender.com/");
  }

  public on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  public off(event: string): void {
    this.socket.off(event);
  }
}

export default new MessageService();
