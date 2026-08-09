cat << "EOF" >
  public / rg -
    loader.js(async () => {
      const domain = window.location.hostname.replace("www.", "");
      try {
        const res = await fetch(
          "https://rg-license.vercel.app/api/check?domain=" +
            encodeURIComponent(domain),
        );
        const json = await res.json();
        if (!json.active) return;
      } catch (e) {
        return;
      }

      function initAllGalleries() {
        (window.RGConfigs || []).forEach((cfg) => initGallery(cfg));
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAllGalleries);
      } else {
        initAllGalleries();
      }

      function initGallery(settings) {
        const sid = settings.sectionId;
        const COL_RATING = 0,
          COL_AUTHOR = 1,
          COL_EMAIL = 2,
          COL_BODY = 3,
          COL_DATE = 4,
          COL_PHOTO = 5,
          COL_VERIFIED = 6,
          COL_VARIANT = 7;

        const gridEl = document.getElementById("rg-grid-" + sid);
        const loadingEl = document.getElementById("rg-loading-" + sid);
        const emptyEl = document.getElementById("rg-empty-" + sid);
        const headerEl = document.getElementById("rg-header-" + sid);
        const loadMoreBtn = document.getElementById("rg-load-more-" + sid);
        const avgRatingEl = document.getElementById("rg-avg-" + sid);
        const reviewCountEl = document.getElementById("rg-count-" + sid);
        const displayStarsEl = document.getElementById(
          "rg-display-stars-" + sid,
        );
        const sortSelect = document.getElementById("rg-sort-" + sid);
        const searchInput = document.getElementById("rg-search-" + sid);

        let allReviews = [],
          filteredReviews = [],
          lightboxImages = [],
          currentSlide = 0,
          currentLimit = 0;

        if (settings.csvUrl) {
          const cb =
            (settings.csvUrl.includes("?") ? "&" : "?") + "t=" + Date.now();
          fetch(settings.csvUrl + cb)
            .then((r) => r.text())
            .then((text) => parseAndRender(text))
            .catch((e) => {
              if (loadingEl) loadingEl.style.display = "none";
              if (gridEl)
                gridEl.innerHTML =
                  '<div class="rg-message">Error loading reviews.</div>';
            });
        } else {
          if (loadingEl) loadingEl.style.display = "none";
          if (gridEl)
            gridEl.innerHTML =
              '<div class="rg-message">Please add a CSV link in Theme Editor.</div>';
        }

        function parseAndRender(csvText) {
          const rows = csvToArray(csvText);
          allReviews = [];
          if (rows.length > 0) rows.shift();
          rows.forEach((row, idx) => {
            if (row.length < 3) return;
            const rawMediaUrl = row[COL_PHOTO] ? row[COL_PHOTO].trim() : "";
            let finalPhotoUrl = "",
              finalVideoUrl = "";
            if (rawMediaUrl.length > 5) {
              const isVideo =
                rawMediaUrl.includes(".mp4") ||
                rawMediaUrl.includes(".mov") ||
                rawMediaUrl.includes("/videos/");
              if (isVideo) {
                finalVideoUrl = rawMediaUrl;
              } else {
                finalPhotoUrl = rawMediaUrl;
              }
            }
            const rawVerified = row[COL_VERIFIED]
              ? row[COL_VERIFIED].trim().toUpperCase()
              : "";
            const isVerified = rawVerified === "TRUE" || rawVerified === "1";
            allReviews.push({
              id: idx,
              rating: parseInt(row[COL_RATING]) || 5,
              author: row[COL_AUTHOR] || "Customer",
              body: row[COL_BODY] || "",
              date: row[COL_DATE] || "",
              dateObj: new Date(row[COL_DATE] || Date.now()),
              photoUrl: finalPhotoUrl,
              videoUrl: finalVideoUrl,
              hasMedia: finalPhotoUrl !== "" || finalVideoUrl !== "",
              isVerified: isVerified,
              variant: row[COL_VARIANT] ? row[COL_VARIANT].trim() : "",
            });
          });
          if (loadingEl) loadingEl.style.display = "none";
          if (allReviews.length > 0) {
            calculateAverageRating();
            filteredReviews = [...allReviews];
            applySorting();
            currentLimit = settings.initialLoad;
            renderReviews();
            if (headerEl) headerEl.style.display = "flex";
          } else {
            if (emptyEl) emptyEl.style.display = "block";
          }
        }

        function calculateAverageRating() {
          const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
          const avg = (total / allReviews.length).toFixed(1);
          const fullStars = Math.floor(avg);
          const halfStar = avg % 1 >= 0.5;
          if (avgRatingEl) avgRatingEl.textContent = avg;
          if (reviewCountEl) reviewCountEl.textContent = allReviews.length;
          let starsDisplay = "";
          for (let i = 0; i < 5; i++) {
            if (i < fullStars) starsDisplay += "★";
            else if (i === fullStars && halfStar) starsDisplay += "★";
            else starsDisplay += "☆";
          }
          if (displayStarsEl) displayStarsEl.textContent = starsDisplay;
        }

        function applySorting() {
          const sortValue = sortSelect ? sortSelect.value : "recent";
          filteredReviews.sort((a, b) => {
            if (sortValue === "recent") return a.id - b.id;
            if (sortValue === "highest") return b.rating - a.rating;
            if (sortValue === "lowest") return a.rating - b.rating;
            return 0;
          });
        }

        function renderReviews() {
          lightboxImages = [];
          let html = "";
          let imgCounter = 0;
          const reviewsToShow = filteredReviews.slice(0, currentLimit);
          if (reviewsToShow.length === 0) {
            if (emptyEl) emptyEl.style.display = "block";
            if (gridEl) gridEl.innerHTML = "";
            if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
            return;
          } else {
            if (emptyEl) emptyEl.style.display = "none";
          }
          reviewsToShow.forEach((review) => {
            if (review.hasMedia) {
              lightboxImages.push({
                src: review.photoUrl,
                videoSrc: review.videoUrl,
                name: review.author,
                text: review.body,
                rating: review.rating,
                date: review.date,
                variant: review.variant,
                isVerified: review.isVerified,
              });
            }
            const stars =
              "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
            let mediaHtml = "";
            if (review.hasMedia) {
              if (review.photoUrl) {
                mediaHtml = `<div class="rg-image-wrap" onclick="RGOpenModal_${sid}(${imgCounter})"><img src="${review.photoUrl}" alt="Review photo"><div class="rg-zoom-icon">🔍</div></div>`;
              } else if (review.videoUrl) {
                mediaHtml = `<div class="rg-image-wrap" onclick="RGOpenModal_${sid}(${imgCounter})"><video src="${review.videoUrl}#t=0.1" preload="metadata" muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video><div class="rg-video-icon-small">▶</div><div class="rg-zoom-icon">🔍</div></div>`;
              }
              imgCounter++;
            }
            const verifiedHtml =
              settings.showVerifiedBadge && review.isVerified
                ? `<span class="rg-verified"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>Verified</span>`
                : "";
            html += `
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
              ${review.variant ? `<div class="rg-meta"><strong>Item:</strong> ${review.variant}</div>` : ""}
            </div>
          </div>`;
          });
          if (gridEl) gridEl.innerHTML = html;
          if (settings.cardLayout === "masonry") applyMasonryLayout();
          if (loadMoreBtn) {
            if (currentLimit < filteredReviews.length) {
              loadMoreBtn.classList.remove("hidden");
            } else {
              loadMoreBtn.classList.add("hidden");
            }
          }
        }

        function applyMasonryLayout() {
          const cards = gridEl.querySelectorAll(".rg-card");
          if (cards.length === 0) return;
          const gap = 12;
          const columns =
            window.innerWidth >= 1024
              ? settings.columnsDesktop
              : window.innerWidth >= 768
                ? settings.columnsMobile
                : 1;
          const containerWidth = gridEl.offsetWidth;
          const cardWidth = (containerWidth - gap * (columns - 1)) / columns;
          const columnHeights = Array(columns).fill(0);
          cards.forEach((card) => {
            const shortestColumnIndex = columnHeights.indexOf(
              Math.min(...columnHeights),
            );
            card.style.left = shortestColumnIndex * (cardWidth + gap) + "px";
            card.style.top = columnHeights[shortestColumnIndex] + "px";
            card.style.width = cardWidth + "px";
            columnHeights[shortestColumnIndex] += card.offsetHeight + gap;
          });
          gridEl.style.height = Math.max(...columnHeights) + "px";
        }

        if (settings.cardLayout === "masonry") {
          let resizeTimer;
          window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              if (gridEl && gridEl.querySelectorAll(".rg-card").length > 0)
                applyMasonryLayout();
            }, 250);
          });
        }

        if (loadMoreBtn) {
          loadMoreBtn.addEventListener("click", function () {
            currentLimit += settings.loadMoreCount;
            renderReviews();
          });
        }

        document.querySelectorAll(".rg-filter-btn").forEach((btn) => {
          btn.addEventListener("click", function () {
            document
              .querySelectorAll(".rg-filter-btn")
              .forEach((b) => b.classList.remove("active"));
            this.classList.add("active");
            const filter = this.dataset.filter;
            if (filter === "all") {
              filteredReviews = [...allReviews];
            } else {
              filteredReviews = allReviews.filter(
                (r) => r.rating === parseInt(filter),
              );
            }
            if (searchInput && searchInput.value) {
              const term = searchInput.value.toLowerCase();
              filteredReviews = filteredReviews.filter(
                (r) =>
                  r.body.toLowerCase().includes(term) ||
                  r.author.toLowerCase().includes(term),
              );
            }
            applySorting();
            currentLimit = settings.initialLoad;
            renderReviews();
          });
        });

        if (sortSelect) {
          sortSelect.addEventListener("change", function () {
            applySorting();
            renderReviews();
          });
        }

        if (searchInput) {
          searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            filteredReviews = allReviews.filter((r) => {
              const matchesSearch =
                r.body.toLowerCase().includes(term) ||
                r.author.toLowerCase().includes(term) ||
                r.variant.toLowerCase().includes(term);
              const activeBtn = document.querySelector(".rg-filter-btn.active");
              const activeFilter = activeBtn ? activeBtn.dataset.filter : "all";
              const matchesStar =
                activeFilter === "all" || r.rating === parseInt(activeFilter);
              return matchesSearch && matchesStar;
            });
            applySorting();
            currentLimit = settings.initialLoad;
            renderReviews();
          });
        }

        const modal = document.getElementById("ReviewModal");
        const modalMediaWrap = document.getElementById("modal-media-wrap");
        const modalCap = document.getElementById("modal-caption");

        window["RGOpenModal_" + sid] = function (index) {
          if (!modal || lightboxImages.length === 0) return;
          currentSlide = index;
          updateModalContent();
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        };

        function closeModal() {
          if (!modal) return;
          modal.classList.remove("active");
          document.body.style.overflow = "auto";
          if (modalMediaWrap) modalMediaWrap.innerHTML = "";
        }

        function changeSlide(step) {
          currentSlide += step;
          if (currentSlide >= lightboxImages.length) currentSlide = 0;
          if (currentSlide < 0) currentSlide = lightboxImages.length - 1;
          updateModalContent();
        }

        function updateModalContent() {
          const data = lightboxImages[currentSlide];
          let mediaHtml = "";
          if (data.videoSrc && data.videoSrc.length > 0) {
            mediaHtml = `<video src="${data.videoSrc}" controls autoplay muted loop playsinline class="rg-modal-video"></video>`;
          } else {
            mediaHtml = `<img src="${data.src}" class="rg-modal-img" alt="Review photo">`;
          }
          if (modalMediaWrap) modalMediaWrap.innerHTML = mediaHtml;
          const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
          if (modalCap)
            modalCap.innerHTML = `
        <div class="rg-caption-header">
          <div class="rg-caption-author">${data.name}${data.isVerified ? `<span class="rg-verified"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>Verified</span>` : ""}</div>
          <div class="rg-caption-date">${formatDate(data.date)}</div>
        </div>
        <div class="rg-caption-stars">${stars}</div>
        <div class="rg-caption-body">${data.text}</div>
        ${data.variant ? `<div style="margin-top:20px;padding-top:15px;border-top:1px solid #eee;font-size:13px;color:#888;"><strong>Item:</strong> ${data.variant}</div>` : ""}`;
        }

        if (modal) {
          const closeBtn = modal.querySelector(".rg-close");
          const prevBtn = modal.querySelector(".rg-prev");
          const nextBtn = modal.querySelector(".rg-next");
          if (closeBtn) closeBtn.onclick = closeModal;
          if (prevBtn) prevBtn.onclick = () => changeSlide(-1);
          if (nextBtn) nextBtn.onclick = () => changeSlide(1);
          modal.addEventListener("click", function (e) {
            if (e.target === modal) closeModal();
          });
        }

        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") closeModal();
          if (modal && modal.classList.contains("active")) {
            if (e.key === "ArrowLeft") changeSlide(-1);
            if (e.key === "ArrowRight") changeSlide(1);
          }
        });
      }

      function formatDate(dateStr) {
        if (!dateStr) return "";
        try {
          const d = new Date(dateStr);
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          const year = d.getFullYear();
          return `${month}/${day}/${year}`;
        } catch (e) {
          return dateStr;
        }
      }

      function csvToArray(text) {
        let p = "",
          row = [""],
          ret = [row],
          i = 0,
          r = 0,
          s = !0,
          l;
        for (l of text) {
          if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
          } else if ("," === l && s) l = row[++i] = "";
          else if ("\n" === l && s) {
            if ("\r" === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [(l = "")];
            i = 0;
          } else row[i] += l;
          p = l;
        }
        return ret;
      }
    })();
EOF;
