import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

const filePath = path.join(process.cwd(), 'src', 'data', 'calendars.json');

async function readCalendars() {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

async function writeCalendars(calendars: any[]) {
  await fs.writeFile(filePath, JSON.stringify(calendars, null, 2));
}

async function handleGet(res: NextApiResponse) {
  const calendars = await readCalendars();
  return res.status(200).json(calendars);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const calendars = await readCalendars();
  const newCalendar = { ...req.body, id: Date.now() };
  calendars.push(newCalendar);
  await writeCalendars(calendars);
  return res.status(201).json(newCalendar);
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const calendars = await readCalendars();
  const updated = req.body;
  const idx = calendars.findIndex((c: any) => c.id === updated.id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  calendars[idx] = updated;
  await writeCalendars(calendars);
  return res.status(200).json(updated);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  let calendars = await readCalendars();
  calendars = calendars.filter((c: any) => c.id !== Number(id));
  await writeCalendars(calendars);
  return res.status(204).end();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') return await handleGet(res);
    if (req.method === 'POST') return await handlePost(req, res);
    if (req.method === 'PUT') return await handlePut(req, res);
    if (req.method === 'DELETE') return await handleDelete(req, res);

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    res.status(500).json({ error: 'Error en la operación de calendarios.' });
  }
}