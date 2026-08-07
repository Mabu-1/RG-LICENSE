import { supabase } from '@/lib/supabase'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')?.toLowerCase().replace('www.', '')
  const csvUrl = searchParams.get('csv')

  if (!domain || !csvUrl || !supabase) {
    return Response.json({ error: 'Missing params' }, { status: 400, headers })
  }

  // License check
  const { data, error } = await supabase
    .from('sites')
    .select('active, expires_at')
    .eq('domain', domain)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Unlicensed' }, { status: 403, headers })
  }

  const expired = data.expires_at ? new Date(data.expires_at) < new Date() : false
  if (!data.active || expired) {
    return Response.json({ error: 'License inactive' }, { status: 403, headers })
  }

  // Fetch CSV
  try {
    const cacheBuster = (csvUrl.includes('?') ? '&' : '?') + 't=' + Date.now()
    const csvRes = await fetch(csvUrl + cacheBuster)
    const csvText = await csvRes.text()
    const reviews = parseCSV(csvText)
    return Response.json({ reviews }, { headers })
  } catch (e) {
    return Response.json({ error: 'CSV fetch failed' }, { status: 500, headers })
  }
}

function parseCSV(text) {
  const rows = csvToArray(text)
  const reviews = []
  if (rows.length > 0) rows.shift()

  rows.forEach((row, idx) => {
    if (row.length < 3) return
    const rawMediaUrl = row[6] ? row[6].trim() : ''
    let finalPhotoUrl = '', finalVideoUrl = ''
    if (rawMediaUrl.length > 5) {
      const isVideo = rawMediaUrl.includes('.mp4') || rawMediaUrl.includes('.mov') || rawMediaUrl.includes('/videos/')
      if (isVideo) { finalVideoUrl = rawMediaUrl } else { finalPhotoUrl = rawMediaUrl }
    }
    const rawVerified = row[7] ? row[7].trim().toUpperCase() : ''
    reviews.push({
      id: idx,
      productHandle: row[0] || '',
      rating: parseInt(row[1]) || 5,
      author: row[2] || 'Customer',
      body: row[4] || '',
      date: row[5] || '',
      photoUrl: finalPhotoUrl,
      videoUrl: finalVideoUrl,
      hasMedia: (finalPhotoUrl !== '' || finalVideoUrl !== ''),
      isVerified: (rawVerified === 'TRUE' || rawVerified === '1'),
      variant: row[8] ? row[8].trim() : ''
    })
  })
  return reviews
}

function csvToArray(text) {
  let p = '', row = [''], ret = [row], i = 0, r = 0, s = true, l
  for (l of text) {
    if ('"' === l) { if (s && l === p) row[i] += l; s = !s }
    else if (',' === l && s) l = row[++i] = ''
    else if ('\n' === l && s) { if ('\r' === p) row[i] = row[i].slice(0, -1); row = ret[++r] = [l = '']; i = 0 }
    else row[i] += l
    p = l
  }
  return ret
}
