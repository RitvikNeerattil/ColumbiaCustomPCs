import * as mariadb from 'mariadb';

let pool;

function getPool() {
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    return null;
  }

  if (!pool) {
    pool = mariadb.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
