/* ============================================================
   SCRIPT.JS — renders data.js onto the page and powers all
   interactions. You should not need to edit this file.
   Edit data.js instead.
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "anchor_portfolio_custom_events_v2";
  const PALETTE = ["#FF3E7F", "#7C4DFF", "#00C2A8", "#FF7A45", "#FFC93C", "#3E8EFF"];

  function categoryColor(category) {
    let hash = 0;
    for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash);
    return PALETTE[Math.abs(hash) % PALETTE.length];
  }

  function getCustomEvents() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveCustomEvents(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

  let allEvents = [...EVENTS, ...getCustomEvents()].sort((a, b) => new Date(b.date) - new Date(a.date));
  let activeCategory = "All";

  /* ---------- PROFILE ---------- */
  function renderProfile() {
    document.getElementById("navName").textContent = PROFILE.name;
    document.getElementById("heroName").innerHTML = PROFILE.name.split(" ").join("<br>");
    document.getElementById("heroTitle").textContent = PROFILE.title;
    document.getElementById("heroTagline").textContent = PROFILE.tagline;
    document.getElementById("heroInitials").textContent = PROFILE.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

    if (PROFILE.photo) {
      const ph = document.getElementById("heroPhoto");
      ph.style.backgroundImage = `url('${PROFILE.photo}')`;
      ph.style.backgroundSize = "cover";
      ph.style.backgroundPosition = "center";
      document.getElementById("heroInitials").style.display = "none";
    }

    document.getElementById("profileBio").textContent = PROFILE.bio;
    document.getElementById("profileLocation").textContent = PROFILE.location;
    const emailEl = document.getElementById("profileEmail");
    emailEl.textContent = PROFILE.email;
    emailEl.href = `mailto:${PROFILE.email}`;
    document.getElementById("profilePhone").textContent = PROFILE.phone;

    document.getElementById("skillsRow").innerHTML = PROFILE.skills
      .map(s => `<span class="skill-chip">${escapeHTML(s)}</span>`).join("");

    document.getElementById("statsGrid").innerHTML = PROFILE.stats.map(s => `
      <div class="stat-card reveal">
        <div class="stat-number">${escapeHTML(s.number)}</div>
        <div class="stat-label">${escapeHTML(s.label)}</div>
      </div>`).join("");

    const phoneEl = document.getElementById("contactPhone");
    if (PROFILE.phone) {
      phoneEl.innerHTML = `<a href="tel:${PROFILE.phone.replace(/\s+/g, "")}">📞 ${escapeHTML(PROFILE.phone)}</a>`;
    } else {
      phoneEl.style.display = "none";
    }

    document.getElementById("socialsRow").innerHTML = Object.entries(PROFILE.socials || {})
      .filter(([, url]) => url)
      .map(([name, url]) => `<a href="${url}" target="_blank" rel="noopener">${capitalize(name)}</a>`)
      .join("");

    document.getElementById("footerYear").textContent = new Date().getFullYear();
    document.getElementById("footerName").textContent = PROFILE.name;
  }

  /* ---------- LINEUP ---------- */
  function renderFilters() {
    const cats = ["All", ...new Set(allEvents.map(e => e.category))];
    const row = document.getElementById("filterRow");
    row.innerHTML = cats.map(c =>
      `<button class="filter-chip${c === activeCategory ? " active" : ""}" data-cat="${escapeAttr(c)}">${escapeHTML(c)}</button>`
    ).join("");
    row.querySelectorAll(".filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.cat;
        renderFilters();
        renderLineup();
      });
    });
  }

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  }

  function renderLineup() {
    const grid = document.getElementById("lineupGrid");
    const list = allEvents.filter(e => activeCategory === "All" || e.category === activeCategory);

    if (!list.length) {
      grid.innerHTML = `<p class="gallery-empty">No events in this category yet.</p>`;
      return;
    }

    grid.innerHTML = list.map(ev => {
      const color = categoryColor(ev.category);
      return `
      <div class="event-card reveal" style="--cat-color:${color}" data-id="${escapeAttr(ev.id)}">
        <div class="event-card-body">
          <span class="event-cat-pill">${escapeHTML(ev.category)}</span>
          <div class="event-title">${escapeHTML(ev.title)}</div>
          <div class="event-meta">
            <!-- <span>📅 ${formatDate(ev.date)}</span> -->
            <span>📍 ${escapeHTML(ev.venue || "—")}</span>
          </div>
          <div class="event-expand-hint" id="hint-${escapeAttr(ev.id)}">Tap to see photos &amp; story ↓</div>
        </div>
        <div class="event-detail" id="detail-${escapeAttr(ev.id)}">
          <div class="event-detail-inner">
            <p>${escapeHTML(ev.description || "")}</p>
            <div class="event-detail-media">
              ${(ev.media || []).map((m, i) => mediaThumb(m, i)).join("") || `<span style="color:var(--muted); font-size:13px;">No media added yet.</span>`}
            </div>
          </div>
        </div>
      </div>`;
    }).join("");

    list.forEach(ev => {
      const card = grid.querySelector(`.event-card[data-id="${ev.id}"]`);
      if (!card) return;

      card.addEventListener("click", () => {
        const detail = document.getElementById(`detail-${ev.id}`);
        const hint = document.getElementById(`hint-${ev.id}`);
        const opening = !detail.classList.contains("open");
        detail.classList.toggle("open");
        hint.textContent = opening ? "Tap to collapse ↑" : "Tap to see photos & story ↓";
      });

      card.querySelectorAll(".detail-thumb[data-media-index]").forEach(thumb => {
        thumb.addEventListener("click", (e) => {
          e.stopPropagation();
          const i = Number(thumb.dataset.mediaIndex);
          const m = (ev.media || [])[i];
          if (m) openLightbox(m);
        });
      });
    });

    observeReveals();
  }

  function mediaThumb(m, index) {
    if (m.type === "video" && m.src) return `<div class="detail-thumb" data-media-index="${index}"><video src="${m.src}" muted></video></div>`;
    if (m.type === "image" && m.src) return `<div class="detail-thumb" data-media-index="${index}"><img src="${m.src}" alt="${escapeAttr(m.caption || "")}"></div>`;
    return `<div class="detail-thumb">${m.type === "video" ? "VIDEO" : "PHOTO"}<br>add file</div>`;
  }

  /* ---------- PHOTO WALL / GALLERY ---------- */
  function renderPhotoWall() {
    const wall = document.getElementById("photoWall");
    const items = [];
    allEvents.forEach(ev => (ev.media || []).forEach(m => items.push({ ...m, eventTitle: ev.title, color: categoryColor(ev.category) })));

    if (!items.length) {
      wall.innerHTML = `<p class="gallery-empty">No photos or videos yet — add your first event to fill this wall.</p>`;
      return;
    }

    wall.innerHTML = items.map((m, i) => {
      const tilt = (Math.sin(i * 12.9) * 6).toFixed(1);
      return `
      <div class="wall-item reveal" style="--tilt:${tilt}deg" data-index="${i}">
        <span class="wall-pin" style="background:${m.color}"></span>
        ${m.src
          ? (m.type === "video" ? `<video src="${m.src}" muted></video>` : `<img src="${m.src}" alt="${escapeAttr(m.caption || m.eventTitle)}">`)
          : `<div class="wall-placeholder">${escapeHTML(m.type === "video" ? "🎬" : "📷")}<br>${escapeHTML(m.eventTitle)}</div>`}
        <div class="wall-caption">${escapeHTML(m.caption || m.eventTitle)}</div>
      </div>`;
    }).join("");

    wall.querySelectorAll(".wall-item").forEach((el, i) => {
      el.addEventListener("click", () => openLightbox(items[i]));
    });

    observeReveals();
  }

  function openLightbox(item) {
    if (!item.src) return;
    const lb = document.getElementById("lightbox");
    const content = document.getElementById("lightboxContent");
    content.innerHTML = item.type === "video"
      ? `<video src="${item.src}" controls autoplay></video>`
      : `<img src="${item.src}" alt="${escapeAttr(item.caption || "")}">`;
    lb.classList.add("open");
  }
  function setupLightbox() {
    const lb = document.createElement("div");
    lb.className = "lightbox"; lb.id = "lightbox";
    lb.innerHTML = `<button class="lightbox-close" id="lightboxClose">&times;</button><div class="lightbox-content" id="lightboxContent"></div>`;
    document.body.appendChild(lb);
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  }
  function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
    document.getElementById("lightboxContent").innerHTML = "";
  }

  /* ---------- CONFETTI (hero ambient) ---------- */
  function spawnConfetti() {
    const field = document.getElementById("confettiField");
    const colors = PALETTE;
    for (let i = 0; i < 24; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = 8 + Math.random() * 8 + "s";
      piece.style.animationDelay = -(Math.random() * 10) + "s";
      piece.style.opacity = 0.4 + Math.random() * 0.4;
      piece.style.width = piece.style.height = 6 + Math.random() * 6 + "px";
      field.appendChild(piece);
    }
  }

  /* ---------- SCROLL REVEAL ---------- */
  let observer;
  function observeReveals() {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.12 });
    }
    document.querySelectorAll(".reveal:not(.in)").forEach(el => observer.observe(el));
  }

  /* ---------- ADMIN: ADD EVENT ---------- */
  // function setupAdmin() {
  //   const backdrop = document.getElementById("modalBackdrop");
  //   document.getElementById("adminToggle").addEventListener("click", () => backdrop.classList.add("open"));
  //   document.getElementById("modalClose").addEventListener("click", () => backdrop.classList.remove("open"));
  //   backdrop.addEventListener("click", (e) => { if (e.target === backdrop) backdrop.classList.remove("open"); });

  //   document.getElementById("addEventForm").addEventListener("submit", async (e) => {
  //     e.preventDefault();
  //     const form = e.target;
  //     const fd = new FormData(form);
  //     const files = fd.getAll("media").filter(f => f && f.size > 0);
  //     const media = await Promise.all(files.map(fileToMedia));

  //     const newEvent = {
  //       id: "ev-" + Date.now(),
  //       title: fd.get("title"),
  //       category: fd.get("category") || "General",
  //       date: fd.get("date") || new Date().toISOString().slice(0, 10),
  //       venue: fd.get("venue"),
  //       description: fd.get("description"),
  //       media
  //     };

  //     const custom = getCustomEvents();
  //     custom.push(newEvent);
  //     saveCustomEvents(custom);

  //     allEvents = [...EVENTS, ...custom].sort((a, b) => new Date(b.date) - new Date(a.date));

  //     renderFilters();
  //     renderLineup();
  //     renderPhotoWall();

  //     form.reset();
  //     backdrop.classList.remove("open");
  //   });
  // }

  // function fileToMedia(file) {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve({
  //       type: file.type.startsWith("video") ? "video" : "image",
  //       src: reader.result,
  //       caption: file.name
  //     });
  //     reader.readAsDataURL(file);
  //   });
  // }

  /* ---------- utils ---------- */
  function escapeHTML(str) {
    return String(str ?? "").replace(/[&<>"']/g, s => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[s]));
  }
  function escapeAttr(str) { return escapeHTML(str); }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
    renderFilters();
    renderLineup();
    renderPhotoWall();
    setupLightbox();
    // setupAdmin();
    spawnConfetti();
    observeReveals();
  });
})();