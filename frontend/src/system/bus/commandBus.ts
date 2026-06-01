export interface Command<Payload = unknown> {
  type: string;
  payload: Payload;
}

export type HandlerFunction<Payload = unknown, Result = unknown> = (
  payload: Payload,
) => Result;

class CommandBus {
  private handlers = new Map<string, HandlerFunction<unknown, unknown>>();

  register(type: string, handler: HandlerFunction) {
    this.handlers.set(type, handler);
  }

  exucute<Payload = unknown>(type: string, payload: Payload) {
    const handler = this.handlers.get(type);
    if (!handler) {
      throw new Error("Command not found");
    }
    handler(payload);
  }
}

export const commandBus = new CommandBus();
