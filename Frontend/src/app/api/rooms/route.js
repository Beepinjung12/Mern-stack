import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "rooms.json");

function readRooms() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return raw ? JSON.parse(raw) : [];
}

function writeRooms(rooms) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(rooms, null, 2));
}

export async function GET() {
  return NextResponse.json(readRooms());
}

export async function POST(req) {
  const body = await req.json();
  const newRoom = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };
  const rooms = readRooms();
  rooms.unshift(newRoom);
  writeRooms(rooms);
  return NextResponse.json(newRoom, { status: 201 });
}