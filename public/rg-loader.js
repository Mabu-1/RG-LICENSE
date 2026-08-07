(function () {
  const API_BASE = 'https://rg-license.vercel.app';

  function initGallery(settings) {
    const sid = settings.sectionId;
    const domain = window.location.hostname.replace('www.', '');
    const apiUrl = API_BASE + '/api/gallery?domain=' + encodeURIComponent(domain) + '&csv=' + encodeURIComponent(settings.csvUrl);

    const gridEl = document.getElementById('rg-grid-' + sid);
    const loadingEl = document.getElementById('rg-loading-' + sid);
    const emptyEl = document.getElementById('rg-empty-' + sid);
    const headerEl = document.getElementById('rg-header-' + sid);
    const loadMoreBtn = document.getElementById('rg-load-more-' + sid);
    const avgRatingEl = document.getElementById('rg-avg-' + sid);
    const reviewCountEl = document.getElementById('rg-count-' + sid);
    const displayStarsEl = document.getElementById('rg-display-stars-' + sid);
    const sortSelect = document.getElementById('rg-sort-' + sid);
    const searchInput = document.getElementById('rg-search-' + sid);

    let allReviews = [], filteredReviews = [], lightboxImages = [], currentSlide = 0, currentLimit = settings.initialLoad;

    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        if (loadingEl) loadingEl.style.display = 'none';
        if (!data.reviews || data.reviews.length === 0) {
          if (emptyEl) emptyEl.style.display = 'block';
          return;
        }
        allReviews = data.reviews;
        calculateAverageRating();
        filteredReviews = [...allReviews];
        applySorting();
        renderReviews();
        if (headerEl) headerEl.style.display = 'flex';
      })
      .catch(() => {
        if (loadingEl) loadingEl.style.display = 'none';
        if (gridEl) gridEl.innerHTML = '<div class="rg-message">Error loading reviews.</div>';
      });

    function calculateAverageRating() {
      const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
      const avg = (total / allReviews.length).toFixed(1);
      const fullStars = Math.floor(avg);
      const halfStar = (avg % 1) >= 0.5;
      if (avgRatingEl) avgRatingEl.textContent = avg;
      if (reviewCountEl) reviewCountEl.textContent = allReviews.length;
      let starsDisplay = '';
      for (let i = 0; i < 5; i++) {
        starsDisplay += (i < fullStars || (i === fullStars && halfStar)) ? '★' : '☆';
      }
      if (displayStarsEl) displayStarsEl.textContent = starsDisplay;
    }

    function applySorting() {
      const sortValue = sortSelect ? sortSelect.value : 'recent';
      filteredReviews.sort((a, b) => {
        if (sortValue === 'recent') return a.id - b.id;
        if (sortValue === 'highest') return b.rating - a.rating;
        if (sortValue === 'lowest') return a.rating - b.rating;
        return 0;
      });
    }

    function renderReviews() {
      lightboxImages = [];
      let html = '', imgCounter = 0;
      const reviewsToShow = filteredReviews.slice(0, currentLimit);
      if (reviewsToShow.length === 0) {
        if (emptyEl) emptyEl.style.display = 'block';
        if (gridEl) gridEl.innerHTML = '';
        if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
        return;
      }
      if (emptyEl) emptyEl.style.display = 'none';

      reviewsToShow.forEach(review => {
        if (review.hasMedia) {
          lightboxImages.push({ src: review.photoUrl, videoSrc: review.videoUrl, name: review.author, text: review.body, rating: review.rating, date: review.date, variant: review.variant, isVerified: review.isVerified });
        }
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        let mediaHtml = '';
        if (review.hasMedia) {
          if (review.photoUrl) {
            mediaHtml = `<div class="rg-image-wrap" onclick="RGOpen_${sid}(${imgCounter})"><img src="${review.photoUrl}" alt="Review photo"><div class="rg-zoom-icon">🔍</div></div>`;
          } else if (review.videoUrl) {
            mediaHtml = `<div class="rg-image-wrap" onclick="RGOpen_${sid}(${imgCounter})"><video src="${review.videoUrl}#t=0.1" preload="metadata" muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video><div class="rg-video-icon-small">▶</div><div class="rg-zoom-icon">🔍</div></div>`;
          }
          imgCounter++;
        }
        const verifiedHtml = (settings.showVerifiedBadge && review.isVerified)
          ? `<span class="rg-verified"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>Verified</span>` : '';

        html += `<div class="rg-card" data-rating="${review.rating}">
          ${mediaHtml}
          <div class="rg-content">
            <div class="rg-header">
              <div class="rg-author-line">
                <div class="rg-author">${review.author}</div>${verifiedHtml}
              </div>
              <div class="rg-date">${formatDate(review.date)}</div>
            </div>
            <div class="rg-stars">${stars}</div>
            <div class="rg-body">${review.body}</div>
            ${review.variant ? `<div class="rg-meta"><strong>Item:</strong> ${review.variant}</div>` : ''}
          </div>
        </div>`;
      });

      if (gridEl) gridEl.innerHTML = html;
      if (settings.cardLayout === 'masonry') applyMasonryLayout();
      if (loadMoreBtn) {
        currentLimit < filteredReviews.length ? loadMoreBtn.classList.remove('hidden') : loadMoreBtn.classList.add('hidden');
      }
    }

    function applyMasonryLayout() {
      const cards = gridEl.querySelectorAll('.rg-card');
      if (!cards.length) return;
      const gap = 12;
      const columns = window.innerWidth >= 1024 ? settings.columnsDesktop : (window.innerWidth >= 768 ? settings.columnsMobile : 1);
      const cardWidth = (gridEl.offsetWidth - (gap * (columns - 1))) / columns;
      const colHeights = Array(columns).fill(0);
      cards.forEach(card => {
        const col = colHeights.indexOf(Math.min(...colHeights));
        card.style.left = (col * (cardWidth + gap)) + 'px';
        card.style.top = colHeights[col] + 'px';
        card.style.width = cardWidth + 'px';
        colHeights[col] += card.offsetHeight + gap;
      });
      gridEl.style.height = Math.max(...colHeights) + 'px';
    }

    if (settings.cardLayout === 'masonry') {
      let t;
      window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { if (gridEl && gridEl.querySelectorAll('.rg-card').length) applyMasonryLayout(); }, 250); });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => { currentLimit += settings.loadMoreCount; renderReviews(); });
    }

    document.querySelectorAll('.rg-filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.rg-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        filteredReviews = filter === 'all' ? [...allReviews] : allReviews.filter(r => r.rating === parseInt(filter));
        if (searchInput && searchInput.value) {
          const term = searchInput.value.toLowerCase();
          filteredReviews = filteredReviews.filter(r => r.body.toLowerCase().includes(term) || r.author.toLowerCase().includes(term));
        }
        applySorting(); currentLimit = settings.initialLoad; renderReviews();
      });
    });

    if (sortSelect) sortSelect.addEventListener('change', () => { applySorting(); renderReviews(); });

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        const activeFilter = (document.querySelector('.rg-filter-btn.active') || {}).dataset?.filter || 'all';
        filteredReviews = allReviews.filter(r => {
          const matchSearch = r.body.toLowerCase().includes(term) || r.author.toLowerCase().includes(term) || r.variant.toLowerCase().includes(term);
          const matchStar = activeFilter === 'all' || r.rating === parseInt(activeFilter);
          return matchSearch && matchStar;
        });
        applySorting(); currentLimit = settings.initialLoad; renderReviews();
      });
    }

    // Lightbox
    const modal = document.getElementById('ReviewModal');
    const modalMediaWrap = document.getElementById('modal-media-wrap');
    const modalCap = document.getElementById('modal-caption');

    window['RGOpen_' + sid] = function (index) {
      if (!modal || !lightboxImages.length) return;
      currentSlide = index;
      updateModal();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      if (modalMediaWrap) modalMediaWrap.innerHTML = '';
    }

    function changeSlide(step) {
      currentSlide = (currentSlide + step + lightboxImages.length) % lightboxImages.length;
      updateModal();
    }

    function updateModal() {
      const d = lightboxImages[currentSlide];
      if (modalMediaWrap) modalMediaWrap.innerHTML = d.videoSrc
        ? `<video src="${d.videoSrc}" controls autoplay muted loop playsinline class="rg-modal-video"></video>`
        : `<img src="${d.src}" class="rg-modal-img" alt="Review photo">`;
      if (modalCap) modalCap.innerHTML = `
        <div class="rg-caption-header">
          <div class="rg-caption-author">${d.name}</div>
          <div class="rg-caption-date">${formatDate(d.date)}</div>
        </div>
        <div class="rg-caption-stars">${'★'.repeat(d.rating) + '☆'.repeat(5 - d.rating)}</div>
        <div class="rg-caption-body">${d.text}</div>
        ${d.variant ? `<div style="margin-top:20px;padding-top:15px;border-top:1px solid #eee;font-size:13px;color:#888;"><strong>Item:</strong> ${d.variant}</div>` : ''}`;
    }

    if (modal) {
      const closeBtn = modal.querySelector('.rg-close');
      const prevBtn = modal.querySelector('.rg-prev');
      const nextBtn = modal.querySelector('.rg-next');
      if (closeBtn) closeBtn.onclick = closeModal;
      if (prevBtn) prevBtn.onclick = () => changeSlide(-1);
      if (nextBtn) nextBtn.onclick = () => changeSlide(1);
      modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
      if (modal && modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
      }
    });
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return String(d.getMonth() + 1).padStart(2, '0') + '/' + String(d.getDate()).padStart(2, '0') + '/' + d.getFullYear();
    } catch (e) { return dateStr; }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => (window.RGConfigs || []).forEach(initGallery));
  } else {
    (window.RGConfigs || []).forEach(initGallery);
  }
})();
