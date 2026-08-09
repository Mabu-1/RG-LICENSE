(async () => {
  const domain = window.location.hostname.replace('www.', '');
  try {
    const res = await fetch('https://rg-license.vercel.app/api/check?domain=' + encodeURIComponent(domain));
    const json = await res.json();
    if (!json.active) return;
  } catch(e) { return; }

  function initAllGalleries() {
    (window.RGConfigs || []).forEach(cfg => initGallery(cfg));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllGalleries);
  } else {
    initAllGalleries();
  }

  function initGallery(settings) {
    const sid = settings.sectionId;
    const COL_RATING=0,COL_AUTHOR=1,COL_EMAIL=2,COL_BODY=3,COL_DATE=4,COL_PHOTO=5,COL_VERIFIED=6,COL_VARIANT=7;

    const gridEl         = document.getElementById('rg-grid-'+sid);
    const loadingEl      = document.getElementById('rg-loading-'+sid);
    const emptyEl        = document.getElementById('rg-empty-'+sid);
    const headerEl       = document.getElementById('rg-header-'+sid);
    const loadMoreBtn    = document.getElementById('rg-load-more-'+sid);
    const avgRatingEl    = document.getElementById('rg-avg-'+sid);
    const reviewCountEl  = document.getElementById('rg-count-'+sid);
    const displayStarsEl = document.getElementById('rg-display-stars-'+sid);
    const sortSelect     = document.getElementById('rg-sort-'+sid);
    const searchInput    = document.getElementById('rg-search-'+sid);
    const modal          = document.getElementById('ReviewModal');
    const modalMediaWrap = document.getElementById('modal-media-wrap');
    const modalCap       = document.getElementById('modal-caption');
    const closeBtn       = document.getElementById('rg-close-btn');
    const prevBtn        = document.getElementById('rg-prev-btn');
    const nextBtn        = document.getElementById('rg-next-btn');

    let allReviews=[],filteredReviews=[],lightboxImages=[],currentSlide=0,currentLimit=0;

    if(settings.csvUrl){
      const cb=(settings.csvUrl.includes('?')?'&':'?')+'t='+Date.now();
      fetch(settings.csvUrl+cb)
        .then(r=>r.text())
        .then(text=>parseAndRender(text))
        .catch(()=>{
          if(loadingEl)loadingEl.style.display='none';
          if(gridEl)gridEl.innerHTML='<div class="rg-message">Error loading reviews.</div>';
        });
    } else {
      if(loadingEl)loadingEl.style.display='none';
      if(gridEl)gridEl.innerHTML='<div class="rg-message">Please add a CSV link in Theme Editor.</div>';
    }

    function parseAndRender(csvText){
      const rows=csvToArray(csvText);
      allReviews=[];
      if(rows.length>0)rows.shift();
      rows.forEach((row,idx)=>{
        if(row.length<3)return;
        const rawMediaUrl=row[COL_PHOTO]?row[COL_PHOTO].trim():'';
        let finalPhotoUrl='',finalVideoUrl='';
        if(rawMediaUrl.length>5){
          const isVideo=rawMediaUrl.includes('.mp4')||rawMediaUrl.includes('.mov')||rawMediaUrl.includes('/videos/');
          if(isVideo){finalVideoUrl=rawMediaUrl;}else{finalPhotoUrl=rawMediaUrl;}
        }
        const rawVerified=row[COL_VERIFIED]?row[COL_VERIFIED].trim().toUpperCase():'';
        allReviews.push({
          id:idx,
          rating:parseInt(row[COL_RATING])||5,
          author:row[COL_AUTHOR]||'Customer',
          body:row[COL_BODY]||'',
          date:row[COL_DATE]||'',
          photoUrl:finalPhotoUrl,
          videoUrl:finalVideoUrl,
          hasMedia:(finalPhotoUrl!==''||finalVideoUrl!==''),
          isVerified:(rawVerified==='TRUE'||rawVerified==='1'),
          variant:row[COL_VARIANT]?row[COL_VARIANT].trim():''
        });
      });
      if(loadingEl)loadingEl.style.display='none';
      if(allReviews.length>0){
        calculateAverageRating();
        filteredReviews=[...allReviews];
        applySorting();
        currentLimit=settings.initialLoad;
        renderReviews();
        if(headerEl)headerEl.style.display='flex';
      } else {
        if(emptyEl)emptyEl.style.display='block';
      }
    }

    function calculateAverageRating(){
      const total=allReviews.reduce((sum,r)=>sum+r.rating,0);
      const avg=(total/allReviews.length).toFixed(1);
      if(avgRatingEl)avgRatingEl.textContent=avg;
      if(reviewCountEl)reviewCountEl.textContent=allReviews.length;
      let stars='';
      for(let i=0;i<5;i++) stars+=(i<Math.floor(avg))?'★':'☆';
      if(displayStarsEl)displayStarsEl.textContent=stars;
    }

    function applySorting(){
      const v=sortSelect?sortSelect.value:'recent';
      filteredReviews.sort((a,b)=>{
        if(v==='recent')return a.id-b.id;
        if(v==='highest')return b.rating-a.rating;
        if(v==='lowest')return a.rating-b.rating;
        return 0;
      });
    }

    function renderReviews(){
      lightboxImages=[];
      let html='';
      let imgCounter=0;
      const toShow=filteredReviews.slice(0,currentLimit);
      if(toShow.length===0){
        if(emptyEl)emptyEl.style.display='block';
        if(gridEl)gridEl.innerHTML='';
        if(loadMoreBtn)loadMoreBtn.classList.add('hidden');
        return;
      }
      if(emptyEl)emptyEl.style.display='none';

      toShow.forEach((review)=>{
        if(review.hasMedia){
          lightboxImages.push({
            src:review.photoUrl,
            videoSrc:review.videoUrl,
            name:review.author,
            text:review.body,
            rating:review.rating,
            date:review.date,
            variant:review.variant,
            isVerified:review.isVerified
          });
        }
        const stars='★'.repeat(review.rating)+'☆'.repeat(5-review.rating);
        let mediaHtml='';
        if(review.hasMedia){
          const idx=imgCounter;
          if(review.videoUrl){
            mediaHtml=`<div class="rg-image-wrap" onclick="RGOpenModal_${sid}(${idx})" style="cursor:pointer;">
              <video src="${review.videoUrl}#t=0.1" preload="metadata" muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;"></video>
              <div class="rg-video-icon-small">▶</div>
              <div class="rg-zoom-icon">🔍</div>
            </div>`;
          } else if(review.photoUrl){
            mediaHtml=`<div class="rg-image-wrap" onclick="RGOpenModal_${sid}(${idx})" style="cursor:pointer;">
              <img src="${review.photoUrl}" alt="Review photo" loading="lazy">
              <div class="rg-zoom-icon">🔍</div>
            </div>`;
          }
          imgCounter++;
        }
        const verifiedHtml=(settings.showVerifiedBadge&&review.isVerified)?
          `<span class="rg-verified"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>Verified</span>`:'';
        html+=`
          <div class="rg-card" data-rating="${review.rating}">
            ${mediaHtml}
            <div class="rg-content">
              <div class="rg-header">
                <div class="rg-author-line">
                  <div class="rg-author">${review.author}</div>
                  ${verifiedHtml}
                </div>
                <div class="rg-date">${formatDate(review.date)}</div>
              </div>
              <div class="rg-stars">${stars}</div>
              <div class="rg-body">${review.body}</div>
              ${review.variant?`<div class="rg-meta"><strong>Item:</strong> ${review.variant}</div>`:''}
            </div>
          </div>`;
      });

      if(gridEl)gridEl.innerHTML=html;
      if(settings.cardLayout==='masonry')applyMasonryLayout();
      if(loadMoreBtn){
        if(currentLimit<filteredReviews.length)loadMoreBtn.classList.remove('hidden');
        else loadMoreBtn.classList.add('hidden');
      }
    }

    function applyMasonryLayout(){
      const cards=gridEl.querySelectorAll('.rg-card');
      if(!cards.length)return;
      const gap=12;
      const cols=window.innerWidth>=1024?settings.columnsDesktop:(window.innerWidth>=768?parseInt(settings.columnsMobile):1);
      const w=(gridEl.offsetWidth-(gap*(cols-1)))/cols;
      const heights=Array(cols).fill(0);
      cards.forEach(card=>{
        const col=heights.indexOf(Math.min(...heights));
        card.style.left=(col*(w+gap))+'px';
        card.style.top=heights[col]+'px';
        card.style.width=w+'px';
        heights[col]+=card.offsetHeight+gap;
      });
      gridEl.style.height=Math.max(...heights)+'px';
    }

    if(settings.cardLayout==='masonry'){
      let t;
      window.addEventListener('resize',()=>{
        clearTimeout(t);
        t=setTimeout(()=>{ if(gridEl&&gridEl.querySelectorAll('.rg-card').length)applyMasonryLayout(); },250);
      });
    }

    if(loadMoreBtn){
      loadMoreBtn.addEventListener('click',()=>{ currentLimit+=settings.loadMoreCount; renderReviews(); });
    }

    document.querySelectorAll('.rg-filter-btn').forEach(btn=>{
      btn.addEventListener('click',function(){
        document.querySelectorAll('.rg-filter-btn').forEach(b=>b.classList.remove('active'));
        this.classList.add('active');
        const f=this.dataset.filter;
        filteredReviews=f==='all'?[...allReviews]:allReviews.filter(r=>r.rating===parseInt(f));
        if(searchInput&&searchInput.value){
          const t=searchInput.value.toLowerCase();
          filteredReviews=filteredReviews.filter(r=>r.body.toLowerCase().includes(t)||r.author.toLowerCase().includes(t));
        }
        applySorting(); currentLimit=settings.initialLoad; renderReviews();
      });
    });

    if(sortSelect){
      sortSelect.addEventListener('change',()=>{ applySorting(); renderReviews(); });
    }

    if(searchInput){
      searchInput.addEventListener('input',e=>{
        const t=e.target.value.toLowerCase();
        const activeFilter=document.querySelector('.rg-filter-btn.active');
        const f=activeFilter?activeFilter.dataset.filter:'all';
        filteredReviews=allReviews.filter(r=>{
          const matchSearch=r.body.toLowerCase().includes(t)||r.author.toLowerCase().includes(t)||r.variant.toLowerCase().includes(t);
          const matchStar=(f==='all')||(r.rating===parseInt(f));
          return matchSearch&&matchStar;
        });
        applySorting(); currentLimit=settings.initialLoad; renderReviews();
      });
    }

    /* ---- LIGHTBOX ---- */
    window['RGOpenModal_'+sid]=function(index){
      if(!modal)return;
      currentSlide=index;
      updateModal();
      modal.classList.add('active');
      document.body.style.overflow='hidden';
    };

    function closeModal(){
      if(!modal)return;
      modal.classList.remove('active');
      document.body.style.overflow='';
      if(modalMediaWrap){
        const v=modalMediaWrap.querySelector('video');
        if(v)v.pause();
        modalMediaWrap.innerHTML='';
      }
    }

    function changeSlide(step){
      if(!lightboxImages.length)return;
      currentSlide=(currentSlide+step+lightboxImages.length)%lightboxImages.length;
      updateModal();
    }

    function updateModal(){
      if(!lightboxImages.length)return;
      const d=lightboxImages[currentSlide];
      let mediaHtml='';
      if(d.videoSrc&&d.videoSrc.length>0){
        mediaHtml=`<video src="${d.videoSrc}" controls autoplay muted loop playsinline class="rg-modal-video"></video>`;
      } else {
        mediaHtml=`<img src="${d.src}" class="rg-modal-img" alt="Review photo">`;
      }
      if(modalMediaWrap)modalMediaWrap.innerHTML=mediaHtml;
      const stars='★'.repeat(d.rating)+'☆'.repeat(5-d.rating);
      const verBadge=d.isVerified?`<span class="rg-verified"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>Verified</span>`:'';
      if(modalCap)modalCap.innerHTML=`
        <div class="rg-caption-header">
          <div class="rg-caption-author">${d.name} ${verBadge}</div>
          <div class="rg-caption-date">${formatDate(d.date)}</div>
        </div>
        <div class="rg-caption-stars">${stars}</div>
        <div class="rg-caption-body">${d.text}</div>
        ${d.variant?`<div style="margin-top:20px;padding-top:15px;border-top:1px solid #eee;font-size:13px;color:#888;"><strong>Item:</strong> ${d.variant}</div>`:''}`;
    }

    if(closeBtn)closeBtn.onclick=closeModal;
    if(prevBtn)prevBtn.onclick=()=>changeSlide(-1);
    if(nextBtn)nextBtn.onclick=()=>changeSlide(1);
    if(modal){
      modal.addEventListener('click',e=>{ if(e.target===modal)closeModal(); });
    }
    document.addEventListener('keydown',e=>{
      if(!modal||!modal.classList.contains('active'))return;
      if(e.key==='Escape')closeModal();
      if(e.key==='ArrowLeft')changeSlide(-1);
      if(e.key==='ArrowRight')changeSlide(1);
    });
  }

  function formatDate(dateStr){
    if(!dateStr)return'';
    try{
      const d=new Date(dateStr);
      return String(d.getMonth()+1).padStart(2,'0')+'/'+String(d.getDate()).padStart(2,'0')+'/'+d.getFullYear();
    }catch(e){return dateStr;}
  }

  function csvToArray(text){
    let p='',row=[''],ret=[row],i=0,r=0,s=true,l;
    for(l of text){
      if('"'===l){if(s&&l===p)row[i]+=l;s=!s;}
      else if(','===l&&s)l=row[++i]='';
      else if('\n'===l&&s){if('\r'===p)row[i]=row[i].slice(0,-1);row=ret[++r]=[l=''];i=0;}
      else row[i]+=l;
      p=l;
    }
    return ret;
  }
})();
