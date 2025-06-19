import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export function createJsonHandlers<T = any>(relativeJsonPath: string) {
  const filePath = path.join(process.cwd(), relativeJsonPath);

  async function readAll(): Promise<T[]> {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  async function writeAll(items: T[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(items, null, 2));
  }

  return {
    async GET() {
      try {
        const items = await readAll();
        return NextResponse.json(items);
      } catch (error) {
        return NextResponse.json({ error: 'Error leyendo datos.' }, { status: 500 });
      }
    },

    async POST(request: Request) {
      try {
        const items = await readAll();
        const body = await request.json();
        const newItem = { ...body, id: Date.now() };
        items.push(newItem);
        await writeAll(items);
        return NextResponse.json(newItem, { status: 201 });
      } catch (error) {
        return NextResponse.json({ error: 'Error creando.' }, { status: 500 });
      }
    },

    async PUT(request: Request) {
      try {
        const items = await readAll();
        const updated = await request.json();
        const idx = items.findIndex((i: any) => i.id === updated.id);
        if (idx === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
        items[idx] = updated;
        await writeAll(items);
        return NextResponse.json(updated);
      } catch (error) {
        return NextResponse.json({ error: 'Error actualizando.' }, { status: 500 });
      }
    },

    async DELETE(request: Request) {
      try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        let items = await readAll();
        items = items.filter((i: any) => i.id !== Number(id));
        await writeAll(items);
        return new NextResponse(null, { status: 204 });
      } catch (error) {
        return NextResponse.json({ error: 'Error borrando.' }, { status: 500 });
      }
    }
  };
}