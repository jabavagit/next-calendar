import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { ICalendar } from '@/interfaces/calendar.interface';

const filePath = path.join(process.cwd(), 'src', 'server', 'data', 'calendars.json');

async function readCalendars(): Promise<ICalendar[]> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data) as ICalendar[];
}

async function writeCalendars(calendars: ICalendar[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(calendars, null, 2));
}

export async function GET() {
  try {
    const calendars = await readCalendars();
    return NextResponse.json(calendars);
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de calendarios.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const calendars = await readCalendars();
    const body = await request.json();
    const newCalendar: ICalendar = { ...body, id: Date.now() };
    calendars.push(newCalendar);
    await writeCalendars(calendars);
    return NextResponse.json(newCalendar, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de calendarios.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const calendars = await readCalendars();
    const updated: ICalendar = await request.json();
    const idx = calendars.findIndex((c) => c.id === updated.id);
    if (idx === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    calendars[idx] = updated;
    await writeCalendars(calendars);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de calendarios.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let calendars = await readCalendars();
    calendars = calendars.filter((c) => c.id !== Number(id));
    await writeCalendars(calendars);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de calendarios.' }, { status: 500 });
  }
}
