declare global {
  namespace Express {
    interface Request {
      body: Record<string, unknown>;
    }
  }
}

export {};
