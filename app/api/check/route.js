import { supabase } from '@/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')?.toLowerCase().replace('www.', '')

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  if (!domain) return Response.json({ active: false }, { headers })

  const { data, error } = await supabase
    .from('sites')
    .select('active, expires_at')
    .eq('domain', domain)
    .single()

  if (error || !data) return Response.json({ active: false }, { headers })

  const expired = data.expires_at ? new Date(data.expires_at) < new Date() : false
  const active = data.active && !expired

  return Response.json({ active }, { headers })
}
