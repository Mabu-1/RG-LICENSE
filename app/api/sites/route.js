import { supabase } from '@/lib/supabase'

function checkAuth(request) {
  const token = request.headers.get('x-admin-token')
  const password = request.headers.get('x-admin-password')
  const expectedToken = Buffer.from(`${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`).toString('base64')
  return token === expectedToken || password === process.env.ADMIN_PASSWORD
}

export async function GET(request) {
  if (!checkAuth(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { data } = await supabase.from('sites').select('*').order('created_at', { ascending: false })
  return Response.json(data)
}

export async function POST(request) {
  if (!checkAuth(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { data, error } = await supabase.from('sites').insert({
    domain: body.domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, ''),
    label: body.label || '',
    notes: body.notes || '',
    active: true
  }).select().single()
  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json(data)
}

export async function PATCH(request) {
  if (!checkAuth(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const updates = {}
  if (body.active !== undefined) updates.active = body.active
  if (body.domain !== undefined) updates.domain = body.domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
  if (body.label !== undefined) updates.label = body.label
  if (body.notes !== undefined) updates.notes = body.notes
  const { data } = await supabase.from('sites').update(updates).eq('id', body.id).select().single()
  return Response.json(data)
}

export async function DELETE(request) {
  if (!checkAuth(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  await supabase.from('sites').delete().eq('id', id)
  return Response.json({ success: true })
}
