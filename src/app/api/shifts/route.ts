import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { type IShift, type IShiftExtended } from '@/interfaces/calendar.interface';
import { toShiftBase } from '@/libs/shift.transformer';

const filePath = path.join(process.cwd(), 'src', 'server', 'data', 'shifts.json');

async function readShifts(): Promise<IShift[]> {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data) as IShift[];
}

async function writeShifts(shifts: IShift[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(shifts, null, 2));
}

export async function GET() {
  try {
    const shifts = await readShifts();
    return NextResponse.json(shifts);
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de shifts.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const shifts = await readShifts();
    const shiftExtended: IShiftExtended = await request.json();
    const shiftData: IShift = toShiftBase(shiftExtended);
    const newShift: IShift = { ...shiftData, id: Date.now(), createdAt: new Date().toISOString() };
    shifts.push(newShift);
    await writeShifts(shifts);
    return NextResponse.json(newShift, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de shifts.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const shifts = await readShifts();
    const shiftExtended: IShiftExtended = await request.json();
    const idx = shifts.findIndex((s) => s.id === shiftExtended.id);
    if (idx === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    const shiftData: IShift = toShiftBase(shiftExtended);
    const updated: IShift = { ...shiftData, updatedAt: new Date().toISOString() };
    shifts[idx] = updated;
    await writeShifts(shifts);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de shifts.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let shifts = await readShifts();
    shifts = shifts.filter((s) => s.id !== Number(id));
    await writeShifts(shifts);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Error en la operación de shifts.' }, { status: 500 });
  }
}
