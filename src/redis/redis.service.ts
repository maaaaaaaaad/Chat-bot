import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisInterface } from './interface/redis.interface';

@Injectable()
export class RedisService implements RedisInterface {
  constructor(@Inject(CACHE_MANAGER) private readonly redis: Cache) {}

  async get(key: string): Promise<string> {
    return await this.redis.get<string>(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.redis.set<string>(key, value, { ttl });
  }
}
