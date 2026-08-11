import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();
  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const token = Buffer.from(`${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`).toString("base64");
  return NextResponse.json({ token });
}

export async function GET(req) {
  const auth = req.headers.get("x-admin-token");
  const expected = Buffer.from(`${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`).toString("base64");
  if (auth !== expected) return NextResponse.json({ valid: false }, { status: 401 });
  return NextResponse.json({ valid: true });
}
