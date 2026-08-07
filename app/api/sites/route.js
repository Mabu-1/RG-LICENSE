import { supabase } from '@/lib/supabase'

function checkAuth(request) {
  const auth = request.headers.get('x-admin-password')
  return auth === process.env.ADMIN_PASSWORD
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
    domain: body.domain.toLowerCase().replace('www.', ''),
    label: body.label || '',
    active: true,
    expires_at: body.expires_at || null
  }).select().single()
  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json(data)
}

export async function PATCH(request) {
  if (!checkAuth(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { data } = await supabase.from('sites').update({ active: body.active }).eq('id', body.id).select().single()
  return Response.json(data)
}

export async function DELETE(request) {
  if (!checkAuth(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  await supabase.from('sites').delete().eq('id', id)
  return Response.json({ success: true })
}
