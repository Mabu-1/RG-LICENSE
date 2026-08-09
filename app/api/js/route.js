import { supabase } from '@/lib/supabase'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request) {
  const jsHeaders = {
    'Content-Type': 'application/javascript',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*',
  }

  const { searchParams } = new URL(request.url)
  let domain = (searchParams.get('d') || '').toLowerCase()
  if (domain.startsWith('https://')) domain = domain.slice(8)
  if (domain.startsWith('http://'))  domain = domain.slice(7)
  if (domain.startsWith('www.'))     domain = domain.slice(4)
  if (domain.endsWith('/'))          domain = domain.slice(0,-1)

  if (!domain || !supabase) return new Response('/* error */', { status: 200, headers: jsHeaders })

  const { data, error } = await supabase
    .from('sites').select('active').eq('domain', domain).single()

  if (error || !data || !data.active) return new Response('/* unauthorized */', { status: 200, headers: jsHeaders })

  const script = readFileSync(join(process.cwd(), 'public', 'rg-loader.js'), 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n')

  return new Response(script, { status: 200, headers: jsHeaders })
}
