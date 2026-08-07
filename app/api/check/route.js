import { supabase } from '@/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get('domain') || ''
  const domain = raw.toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')

  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  if (!domain || !supabase) return Response.json({ active: false }, { headers })

  const { data, error } = await supabase
    .from('sites').select('active, expires_at').eq('domain', domain).single()

  if (error || !data) return Response.json({ active: false }, { headers })

  const expired = data.expires_at ? new Date(data.expires_at) < new Date() : false
  return Response.json({ active: data.active && !expired }, { headers })
}
