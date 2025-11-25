/*
 * @Author: serendipity 2843306836@qq.com
 * @Date: 2025-11-25 20:01:30
 * @LastEditors: serendipity 2843306836@qq.com
 * @LastEditTime: 2025-11-25 20:01:39
 * @FilePath: \mini-ad-wall-api\src\data-source.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 3306),
  username: configService.get('DB_USERNAME', 'admin'),
  password: configService.get('DB_PASSWORD', '123456'),
  database: configService.get('DB_DATABASE', 'ad_wall'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
