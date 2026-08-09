'use client'
import { useState } from 'react'

const allCards = [
  { n:'Sarah M.',  s:5, b:'Absolutely love this product. Quality is amazing and it arrived perfectly packaged!' },
  { n:'James R.',  s:5, b:'Fast shipping and exactly as described. Will definitely order again soon.' },
  { n:'Priya K.',  s:4, b:'Great quality for the price. Beautiful packaging and fast delivery too.' },
  { n:'Tom W.',    s:5, b:'Second purchase, still the best. Top notch service every single time.' },
  { n:'Amy L.',    s:5, b:'Exceeded my expectations completely. Highly recommend to everyone!' },
  { n:'Mike D.',   s:4, b:'Good product, delivery was quick and the packaging was really nice.' },
  { n:'Lisa K.',   s:3, b:'Decent product but shipping took longer than expected. Would try again.' },
  { n:'Chris B.',  s:5, b:'Perfect in every way. Already told all my friends to order from here.' },
  { n:'Emma S.',   s:4, b:'Really happy with this purchase. Great value and fast shipping too.' },
  { n:'David L.',  s:3, b:'Product is okay, not quite what I expected but still usable overall.' },
  { n:'Nina P.',   s:5, b:'Outstanding quality. This is exactly what I was looking for. Love it!' },
  { n:'Ryan T.',   s:5, b:'Incredible product and the customer service was absolutely fantastic.' },
]

export default function SearchFilter() {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [sort, setSort]       = useState('recent')

  let results = [...allCards]

  if(search.trim()) {
    const t = search.toLowerCase()
    results = results.filter(c => c.b.toLowerCase().includes(t) || c.n.toLowerCase().includes(t))
  }

  if(filter !== 'all') {
    results = results.filter(c => c.s === parseInt(filter))
  }

  if(sort === 'highest') results.sort((a,b) => b.s - a.s)
  if(sort === 'lowest')  results.sort((a,b) => a.s - b.s)

  return (
    <>
      <style>{`
        .sf { padding: 100px 0; background: #fff; }
        .sf-split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
        .sf-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F59E0B; margin-bottom: 12px; }
        .sf-h2 { font-family: 'Fraunces', serif; font-size: clamp(28px,3.5vw,44px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; color: #0F172A; }
        .sf-p { font-size: 16px; line-height: 1.7; margin-bottom: 24px; color: #64748B; }
        .sf-list { list-style: none; margin-bottom: 0; }
        .sf-list li { font-size: 14px; padding: 9px 0; display: flex; align-items: center; gap: 10px; color: #334155; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .sf-list li::before { content: '★'; color: #F59E0B; font-size: 10px; flex-shrink: 0; }

        .sf-mock { background: #F8F7F4; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
        .sf-mock-controls { padding: 16px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 10px; }
        .sf-mock-input { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 13px; color: #0F172A; background: #F8F7F4; outline: none; transition: border 0.2s; box-sizing: border-box; font-family: inherit; }
        .sf-mock-input:focus { border-color: #F59E0B; background: #fff; }
        .sf-mock-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .sf-mock-btn { padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; border: 1px solid #e2e8f0; background: #fff; color: #64748B; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .sf-mock-btn:hover { border-color: #0F172A; color: #0F172A; }
        .sf-mock-btn.sf-active { background: #0F172A; color: #F59E0B; border-color: #0F172A; }
        .sf-mock-select { padding: 7px 12px; border-radius: 8px; font-size: 12px; border: 1px solid #e2e8f0; background: #fff; color: #64748B; cursor: pointer; font-family: inherit; margin-left: auto; }
        .sf-mock-select:focus { outline: none; border-color: #F59E0B; }

        .sf-results-bar { padding: 10px 16px; font-size: 12px; color: #64748B; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .sf-results-count { font-weight: 600; color: #0F172A; }

        .sf-cards-wrap { padding: 12px; max-height: 340px; overflow-y: auto; }
        .sf-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .sf-card { background: #fff; border-radius: 10px; padding: 12px; border: 1px solid #e2e8f0; transition: all 0.2s; }
        .sf-card:hover { border-color: #F59E0B; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .sf-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .sf-card-star { color: #F59E0B; font-size: 10px; }
        .sf-card-name { font-size: 11px; font-weight: 700; color: #0F172A; }
        .sf-card-body { font-size: 10px; color: #64748B; line-height: 1.5; }

        .sf-empty { text-align: center; padding: 40px 20px; color: #94a3b8; font-size: 14px; }
        .sf-empty-icon { font-size: 32px; margin-bottom: 8px; }

        @media (max-width: 900px) { .sf { padding: 70px 0; } .sf-split { grid-template-columns: 1fr; gap: 48px; } }
        @media (max-width: 480px) { .sf-cards { grid-template-columns: 1fr; } }
      `}</style>

      <section className="sf" id="feat-search">
        <div className="rgl-container">
          <div className="sf-split">

            <div>
              <div className="sf-eyebrow">Search, Filter & Sort</div>
              <h2 className="sf-h2">Customers find exactly what they need</h2>
              <p className="sf-p">Live search, one-click star filters, and sort controls all update in real time — no page reloads. Try it yourself on the right.</p>
              <ul className="sf-list">
                <li>Live keyword search across review text and author name</li>
                <li>Filter by star rating — 5★, 4★, 3★ or All</li>
                <li>Sort by original order, highest, or lowest rating</li>
                <li>All three controls work together simultaneously</li>
              </ul>
            </div>

            <div>
              <div className="sf-mock">
                <div className="sf-mock-controls">
                  <input
                    className="sf-mock-input"
                    placeholder="Search reviews..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <div className="sf-mock-row">
                    {['all','5','4','3'].map(f => (
                      <button
                        key={f}
                        className={'sf-mock-btn' + (filter===f?' sf-active':'')}
                        onClick={() => setFilter(f)}
                      >
                        {f==='all'?'All':f+' ★'}
                      </button>
                    ))}
                    <select
                      className="sf-mock-select"
                      value={sort}
                      onChange={e => setSort(e.target.value)}
                    >
                      <option value="recent">Original Order</option>
                      <option value="highest">Highest First</option>
                      <option value="lowest">Lowest First</option>
                    </select>
                  </div>
                </div>

                <div className="sf-results-bar">
                  <span>Showing results</span>
                  <span className="sf-results-count">{results.length} review{results.length!==1?'s':''}</span>
                </div>

                <div className="sf-cards-wrap">
                  {results.length > 0 ? (
                    <div className="sf-cards">
                      {results.map((c,i) => (
                        <div key={i} className="sf-card">
                          <div className="sf-card-top">
                            <div className="sf-card-name">{c.n}</div>
                            <div className="sf-card-star">{'★'.repeat(c.s)+'☆'.repeat(5-c.s)}</div>
                          </div>
                          <div className="sf-card-body">{c.b}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="sf-empty">
                      <div className="sf-empty-icon">🔍</div>
                      No reviews match your search.
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
