/*
 * @Author: niuwenzheng
 * @Date: 2020-04-16 20:00:30
 * @LastEditors: nevin
 * @LastEditTime: 2021-07-15 16:20:20
 * @Description: 缓存方法封装
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CacheService {
  public client;
  constructor(private redisService: RedisService) {
    this.getClient();
  }
  async getClient() {
    this.client = this.redisService.getClient();
  }

  /**
   * @description: 设置值的方法
   * @param {string} key
   * @param {any} value
   * @param {number} seconds 时间(毫米)
   * @return {void}
   */
  async set(key: string, value: any, seconds?: number) {
    value = JSON.stringify(value);
    if (!this.client) {
      await this.getClient();
    }
    if (!seconds) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value, 'EX', seconds);
    }
  }

  /**
   * @description: 获取值
   * @param {string} key
   * @return {object}
   */
  async get(key: string) {
    if (!this.client) {
      await this.getClient();
    }
    const data = await this.client.get(key);
    if (!data) return;
    return JSON.parse(data);
  }

  /**
   * @description: 清除值的方法
   * @param {string} key
   * @return {object}
   */
  async del(key: string) {
    if (!this.client) {
      await this.getClient();
    }
    const data = await this.client.del(key);
    if (!data) return;
    return JSON.parse(data);
  }
}
