import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import type { IEvent } from '@/interfaces/calendar.interface';

const filePath = path.join(process.cwd(), 'src', 'server', 'data', 'events.json');

async function readEvents(): Promise<IEvent[]> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data) as IEvent[];
}

async function writeEvents(events: IEvent[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(events, null, 2));
}

export async function GET() {
  try {
    const events = await readEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de eventos.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const events = await readEvents();
    const body = await request.json();
    const newEvent: IEvent = { ...body, id: Date.now() };
    events.push(newEvent);
    await writeEvents(events);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de eventos.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const events = await readEvents();
    const updated: IEvent = await request.json();
    const idx = events.findIndex((e) => e.id === updated.id);
    if (idx === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    events[idx] = updated;
    await writeEvents(events);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de eventos.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let events = await readEvents();
    events = events.filter((e) => e.id !== Number(id));
    await writeEvents(events);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de eventos.' }, { status: 500 });
  }
}