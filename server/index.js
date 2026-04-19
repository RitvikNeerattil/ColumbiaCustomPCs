import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withDatabase } from './db.js';
import { fallbackBuilds } from './data/fallbackBuilds.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(rootDir, 'public', 'images')));

app.get('/api/health', async (_request, response) => {
  let databaseConnected = false;

  try {
    databaseConnected = Boolean(
      await withDatabase(async (connection) => {
        await connection.query('SELECT 1');
        return true;
      })
    );
  } catch (_error) {
    databaseConnected = false;
  }

  response.json({
    ok: true,
    databaseConnected
  });
});

app.get('/api/builds', async (_request, response) => {
  try {
    const builds =
      (await withDatabase(async (connection) => {
        const rows = await connection.query(`
          SELECT
            id,
            name,
            category,
            price,
            specs,
            image_path AS imagePath,
            marketplace_url AS marketplaceUrl
          FROM builds
          WHERE is_active = 1
          ORDER BY price ASC
        `);

        return rows.map((row) => ({
          ...row,
          price: Number(row.price)
        }));
      })) || fallbackBuilds;

    response.json({ builds });
  } catch (error) {
    response.status(500).json({
      error: 'Unable to load builds.',
      details: error.message
    });
  }
});

app.post('/api/commissions', async (request, response) => {
  const { name, email, budget, preferences = '', useCase, timeline = '' } = request.body;

  if (!name || !email || !budget || !useCase) {
    response.status(400).json({
      error: 'Name, email, budget, and use case are required.'
    });
    return;
  }

  try {
    const result = await withDatabase(async (connection) => {
      const insert = await connection.query(
        `
          INSERT INTO commission_requests
            (name, email, budget, preferences, use_case, timeline)
          VALUES
            (?, ?, ?, ?, ?, ?)
        `,
        [name, email, budget, preferences, useCase, timeline]
      );

      return insert.insertId;
    });

    if (!result) {
      response.status(503).json({
        error: 'Database unavailable. Configure MariaDB credentials before accepting commission requests.'
      });
      return;
    }

    response.status(201).json({
      message: 'Commission request submitted successfully.',
      requestId: result,
      storedInDatabase: true
    });
  } catch (error) {
    response.status(500).json({
      error: 'Unable to submit commission request.',
      details: error.message
    });
  }
});

app.use(express.static(path.join(rootDir, 'dist')));

app.get('*', (_request, response) => {
  response.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Columbia Custom PCs server listening on http://localhost:${port}`);
});
