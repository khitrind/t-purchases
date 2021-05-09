import {TypeOrmModule} from '@nestjs/typeorm';
import {DynamicModule} from '@nestjs/common';

const commonOptions = {
  entities: [__dirname + '/models/*{.ts,.js}'],
  synchronize: true,
  logging: false,
};

const connections = {
  development: {
    type: 'postgres',
    database: 'dev.postgres',
    ...commonOptions,
  },
  test: {
    type: 'postgres',
    database: 'test.postgres',
    ...commonOptions,
  },
  production: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ...commonOptions,
  },
};

export const getConnection = (): DynamicModule => {
  const env = process.env.NODE_ENV || 'development';
  // @ts-ignore
  const connectionOptions = connections[env];

  return TypeOrmModule.forRoot(connectionOptions);
};
