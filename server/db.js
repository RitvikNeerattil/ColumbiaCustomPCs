import * as mariadb from 'mariadb';

let pool;

function getDatabaseConfigFromUrl() {
  const rawUrl = process.env.MYSQL_URL || process.env.DATABASE_URL || process.env.DB_URL;

  if (!rawUrl) {
    return null;
  }

  const parsed = new URL(rawUrl);

  return {
    host: parsed.hostname,
    port: Number(parsed.port || 3306),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, '')
  };
}

function getPool() {
  const urlConfig = getDatabaseConfigFromUrl();
  const splitConfig =
    process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME
      ? {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT || 3306),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        }
      : null;

  const config = urlConfig || splitConfig;

  if (!config) {
    return null;
  }

  if (!pool) {
    pool = mariadb.createPool({
      ...config,
      connectionLimit: 5
    });
  }

  return pool;
}

export async function withDatabase(action) {
  const activePool = getPool();
  if (!activePool) {
    return null;
  }

  let connection;

  try {
    connection = await activePool.getConnection();
    return await action(connection);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
