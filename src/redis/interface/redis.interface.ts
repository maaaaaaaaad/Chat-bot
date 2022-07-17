export interface RedisInterface {
  readonly get: (key: string) => Promise<string>;
  readonly set: (key: string, value: string, ttl: number) => Promise<void>;
}
