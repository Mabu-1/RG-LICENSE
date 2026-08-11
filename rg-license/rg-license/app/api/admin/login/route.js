import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  if (username !== validUser || password !== validPass) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = Buffer.from(`${username}:${password}:${process.env.ADMIN_PASSWORD}`).toString("base64");
  return NextResponse.json({ token });
}

export async function GET(req) {
  const auth = req.headers.get("x-admin-token");
  if (!auth) return NextResponse.json({ valid: false }, { status: 401 });
  const expected = Buffer.from(`${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}:${process.env.ADMIN_PASSWORD}`).toString("base64");
  if (auth !== expected) return NextResponse.json({ valid: false }, { status: 401 });
  return NextResponse.json({ valid: true });
}
