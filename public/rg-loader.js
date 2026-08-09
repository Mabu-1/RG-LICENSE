(function() {
  window.RGInit = function(settings) {
    var sid = settings.sectionId;
    var safeSid = settings.safeSid;
    var domain = settings.domain;
    var csvUrl = settings.csvUrl;
    var starColor = settings.starColor || '#FFC107';
    var verifiedColor = settings.verifiedColor || '#4CAF50';

    var gridEl         = document.getElementById('rg-grid-' + sid);
    var loadingEl      = document.getElementById('rg-loading-' + sid);
    var emptyEl        = document.getElementById('rg-empty-' + sid);
    var headerEl       = document.getElementById('rg-header-' + sid);
    var loadMoreBtn    = document.getElementById('rg-load-more-' + sid);
    var avgRatingEl    = document.getElementById('rg-avg-' + sid);
    var reviewCountEl  = document.getElementById('rg-count-' + sid);
    var displayStarsEl = document.getElementById('rg-display-stars-' + sid);
    var sortSelect     = document.getElementById('rg-sort-' + sid);
    var searchInput    = document.getElementById('rg-search-' + sid);
    var modal          = document.getElementById('ReviewModal');
    var modalMediaWrap = document.getElementById('modal-media-wrap');
    var modalCap       = document.getElementById('modal-caption');
    var closeBtn       = document.getElementById('rg-close-btn');
    var prevBtn        = document.getElementById('rg-prev-btn');
    var nextBtn        = document.getElementById('rg-next-btn');

    var allReviews = [], filteredReviews = [], lightboxImages = [], currentSlide = 0, currentLimit = 0;

    var apiUrl = 'https://rg-license.vercel.app/api/gallery?domain=' + encodeURIComponent(settings.domain) + '&csv=' + encodeURIComponent(settings.csvUrl);

    fetch(apiUrl)
      .then(function(r) { return r.json(); })
      .then(function(json) {
        if (json.error) {
          if (loadingEl) loadingEl.style.display = 'none';
          if (gridEl) gridEl.innerHTML = '<div class="rg-message">' + json.error + '</div>';
          return;
        }
        allReviews = json.reviews || [];
        if (loadingEl) loadingEl.style.display = 'none';
        if (allReviews.length > 0) {
          calculateAverageRating();
          filteredReviews = allReviews.slice();
          applySorting();
          currentLimit = settings.initialLoad;
          renderReviews();
          if (headerEl) headerEl.style.display = 'flex';
        } else {
          if (emptyEl) emptyEl.style.display = 'block';
        }
      })
      .catch(function() {
        if (loadingEl) loadingEl.style.display = 'none';
        if (gridEl) gridEl.innerHTML = '<div class="rg-message">Error loading reviews.</div>';
      });

    function calculateAverageRating() {
      var total = allReviews.reduce(function(sum, r) { return sum + r.rating; }, 0);
      var avg = (total / allReviews.length).toFixed(1);
      if (avgRatingEl) avgRatingEl.textContent = avg;
      if (reviewCountEl) reviewCountEl.textContent = allReviews.length;
      if (displayStarsEl) {
        var avgNum = parseFloat(avg);
        var fullStars = Math.floor(avgNum);
        var remainder = parseFloat((avgNum - fullStars).toFixed(1));
        var partialPct = 0;
        if (remainder >= 0.1 && remainder <= 0.4) partialPct = 30;
        else if (remainder === 0.5) partialPct = 50;
        else if (remainder >= 0.6 && remainder <= 0.9) partialPct = 70;
        var html = '';
        for (var i = 0; i < 5; i++) {
          if (i < fullStars) {
            html += '<span style="color:' + starColor + ';font-size:28px;">★</span>';
          } else if (i === fullStars && partialPct > 0) {
            html += '<span style="position:relative;display:inline-block;font-size:28px;">' +
              '<span style="color:#ddd;">★</span>' +
              '<span style="position:absolute;top:0;left:0;overflow:hidden;white-space:nowrap;width:' + partialPct + '%;color:' + starColor + ';">★</span>' +
              '</span>';
          } else {
            html += '<span style="color:#ddd;font-size:28px;">★</span>';
          }
        }
        displayStarsEl.innerHTML = html;
      }
    }

    function applySorting() {
      var v = sortSelect ? sortSelect.value : 'recent';
      filteredReviews.sort(function(a, b) {
        if (v === 'recent') return a.id - b.id;
        if (v === 'highest') return b.rating - a.rating;
        if (v === 'lowest') return a.rating - b.rating;
        return 0;
      });
    }

    function renderReviews() {
      lightboxImages = [];
      var html = '';
      var imgCounter = 0;
      var toShow = filteredReviews.slice(0, currentLimit);
      if (toShow.length === 0) {
        if (emptyEl) emptyEl.style.display = 'block';
        if (gridEl) gridEl.innerHTML = '';
        if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
        return;
      }
      if (emptyEl) emptyEl.style.display = 'none';
      toShow.forEach(function(review) {
        if (review.hasMedia) {
          lightboxImages.push({
            src: review.photoUrl,
            videoSrc: review.videoUrl,
            name: review.author,
            text: review.body,
            rating: review.rating,
            date: review.date,
            variant: review.variant,
            isVerified: review.isVerified
          });
        }
        var stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        var mediaHtml = '';
        if (review.hasMedia) {
          var idx = imgCounter;
          if (review.videoUrl) {
            mediaHtml = '<div class="rg-image-wrap" onclick="RGOpenModal_' + safeSid + '(' + idx + ')" style="cursor:pointer;">' +
              '<video src="' + review.videoUrl + '#t=0.1" preload="metadata" muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;"></video>' +
              '<div class="rg-video-icon-small">▶</div>' +
              '<div class="rg-zoom-icon">🔍</div></div>';
          } else if (review.photoUrl) {
            mediaHtml = '<div class="rg-image-wrap" onclick="RGOpenModal_' + safeSid + '(' + idx + ')" style="cursor:pointer;">' +
              '<img src="' + review.photoUrl + '" alt="Review photo" loading="lazy">' +
              '<div class="rg-zoom-icon">🔍</div></div>';
          }
          imgCounter++;
        }
        var verifiedHtml = (settings.showVerifiedBadge && review.isVerified) ?
          '<span class="rg-verified"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>Verified</span>' : '';
        html += '<div class="rg-card" data-rating="' + review.rating + '">' +
          mediaHtml +
          '<div class="rg-content">' +
          '<div class="rg-header">' +
          '<div class="rg-author-line">' +
          '<div class="rg-author">' + review.author + '</div>' +
          verifiedHtml +
          '</div>' +
          '<div class="rg-date">' + formatDate(review.date) + '</div>' +
          '</div>' +
          '<div class="rg-stars">' + stars + '</div>' +
          '<div class="rg-body">' + review.body + '</div>' +
          (review.variant ? '<div class="rg-meta"><strong>Item:</strong> ' + review.variant + '</div>' : '') +
          '</div></div>';
      });
      if (gridEl) gridEl.innerHTML = html;
      if (settings.cardLayout === 'masonry') applyMasonryLayout();
      if (loadMoreBtn) {
        if (currentLimit < filteredReviews.length) loadMoreBtn.classList.remove('hidden');
        else loadMoreBtn.classList.add('hidden');
      }
    }

    function applyMasonryLayout() {
      var cards = gridEl.querySelectorAll('.rg-card');
      if (!cards.length) return;
      var gap = 12;
      var cols = window.innerWidth >= 1024 ? settings.columnsDesktop : (window.innerWidth >= 768 ? parseInt(settings.columnsMobile) : 1);
      var w = (gridEl.offsetWidth - (gap * (cols - 1))) / cols;
      var heights = Array(cols).fill(0);
      cards.forEach(function(card) {
        var col = heights.indexOf(Math.min.apply(null, heights));
        card.style.left = (col * (w + gap)) + 'px';
        card.style.top = heights[col] + 'px';
        card.style.width = w + 'px';
        heights[col] += card.offsetHeight + gap;
      });
      gridEl.style.height = Math.max.apply(null, heights) + 'px';
    }

    if (settings.cardLayout === 'masonry') {
      var resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          if (gridEl && gridEl.querySelectorAll('.rg-card').length) applyMasonryLayout();
        }, 250);
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
        currentLimit += settings.loadMoreCount;
        renderReviews();
      });
    }

    document.querySelectorAll('.rg-filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.rg-filter-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        var f = this.dataset.filter;
        filteredReviews = f === 'all' ? allReviews.slice() : allReviews.filter(function(r) { return r.rating === parseInt(f); });
        if (searchInput && searchInput.value) {
          var t = searchInput.value.toLowerCase();
          filteredReviews = filteredReviews.filter(function(r) {
            return r.body.toLowerCase().includes(t) || r.author.toLowerCase().includes(t);
          });
        }
        applySorting(); currentLimit = settings.initialLoad; renderReviews();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', function() { applySorting(); renderReviews(); });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        var t = e.target.value.toLowerCase();
        var activeFilter = document.querySelector('.rg-filter-btn.active');
        var f = activeFilter ? activeFilter.dataset.filter : 'all';
        filteredReviews = allReviews.filter(function(r) {
          var matchSearch = r.body.toLowerCase().includes(t) || r.author.toLowerCase().includes(t) || r.variant.toLowerCase().includes(t);
          var matchStar = (f === 'all') || (r.rating === parseInt(f));
          return matchSearch && matchStar;
        });
        applySorting(); currentLimit = settings.initialLoad; renderReviews();
      });
    }

    window['RGOpenModal_' + safeSid] = function(index) {
      if (!modal) return;
      currentSlide = index;
      updateModal();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (modalMediaWrap) {
        var v = modalMediaWrap.querySelector('video');
        if (v) v.pause();
        modalMediaWrap.innerHTML = '';
      }
    }

    function changeSlide(step) {
      if (!lightboxImages.length) return;
      currentSlide = (currentSlide + step + lightboxImages.length) % lightboxImages.length;
      updateModal();
    }

    function updateModal() {
      if (!lightboxImages.length) return;
      var d = lightboxImages[currentSlide];
      var mediaHtml = '';
      if (d.videoSrc && d.videoSrc.length > 0) {
        mediaHtml = '<video src="' + d.videoSrc + '" controls autoplay muted loop playsinline class="rg-modal-video"></video>';
      } else {
        mediaHtml = '<img src="' + d.src + '" class="rg-modal-img" alt="Review photo">';
      }
      if (modalMediaWrap) modalMediaWrap.innerHTML = mediaHtml;
      var stars = '★'.repeat(d.rating) + '☆'.repeat(5 - d.rating);
      var verBadge = d.isVerified ? '<span class="rg-verified"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>Verified</span>' : '';
      if (modalCap) modalCap.innerHTML =
        '<div class="rg-caption-header">' +
        '<div class="rg-caption-author">' + d.name + ' ' + verBadge + '</div>' +
        '<div class="rg-caption-date">' + formatDate(d.date) + '</div>' +
        '</div>' +
        '<div class="rg-caption-stars">' + stars + '</div>' +
        '<div class="rg-caption-body">' + d.text + '</div>' +
        (d.variant ? '<div style="margin-top:20px;padding-top:15px;border-top:1px solid #eee;font-size:13px;color:#888;"><strong>Item:</strong> ' + d.variant + '</div>' : '');
    }

    if (closeBtn) closeBtn.onclick = closeModal;
    if (prevBtn) prevBtn.onclick = function() { changeSlide(-1); };
    if (nextBtn) nextBtn.onclick = function() { changeSlide(1); };
    if (modal) {
      modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
    }
    document.addEventListener('keydown', function(e) {
      if (!modal || !modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') changeSlide(-1);
      if (e.key === 'ArrowRight') changeSlide(1);
    });

    function formatDate(dateStr) {
      if (!dateStr) return '';
      try {
        var d = new Date(dateStr);
        return String(d.getMonth() + 1).padStart(2, '0') + '/' + String(d.getDate()).padStart(2, '0') + '/' + d.getFullYear();
      } catch(e) { return dateStr; }
    }
  };
})();
