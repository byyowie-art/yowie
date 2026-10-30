(() => {
  const C = window.YOWIE;
  const TEXT = window.YOWIE_TEXT;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const savedLang = (() => {
    try { return localStorage.getItem("lang"); } catch { return null; }
  })();
  const state = {
    color: C.colors.find((c) => c.code === C.defaultColor) || C.colors[0],
    size: null,
    lang: savedLang || ((navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en"),
  };

  const fill = (str, extra = {}) =>
    str
      .replace("{lead}", C.leadTime[state.lang])
      .replace("{price}", C.price)
      .replace(/\{(\w+)\}/g, (m, k) => (k in extra ? extra[k] : m));
  const t = (key, extra) => fill(TEXT[state.lang][key], extra);
  const colorLabel = (c) => (state.lang === "es" ? c.es || c.name : c.name);
  const byCode = (code) => C.colors.find((c) => c.code === code);

  $$("[data-instagram]").forEach((el) => (el.href = C.instagram));
  $$("[data-email]").forEach((el) => {
    el.href = `mailto:${C.email}`;
    el.textContent = C.email;
  });

  // Gallery
  const gallery = $("#gallery");
  C.gallery.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `YOWIE — photo ${i + 1}`;
    if (i > 0) img.loading = "lazy";
    gallery.appendChild(img);
  });

  // Thumbnails: click to jump to a photo; the one on screen is outlined
  const thumbs = $("#thumbs");
  C.gallery.forEach((src, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Photo ${i + 1}`);
    b.innerHTML = `<img src="${src}" alt="">`;
    b.onclick = () => gallery.scrollTo({ left: i * gallery.clientWidth, behavior: "smooth" });
    thumbs.appendChild(b);
  });

  // Slider arrows + progress bar
  const step = (dir) => gallery.scrollBy({ left: dir * gallery.clientWidth, behavior: "smooth" });
  $(".arrow.prev").onclick = () => step(-1);
  $(".arrow.next").onclick = () => step(1);
  const progress = $("#progress");
  const updateProgress = () => {
    const n = C.gallery.length;
    const i = Math.round(gallery.scrollLeft / gallery.clientWidth);
    progress.style.width = `${100 / n}%`;
    progress.style.marginLeft = `${(100 / n) * i}%`;
    thumbs.querySelectorAll("button").forEach((b, j) => b.setAttribute("aria-current", j === i));
  };
  gallery.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Details / size guide / care / shipping tabs
  const openTab = (name) => {
    $$("[data-tab]").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === name));
    $$("[data-panel]").forEach((p) => p.classList.toggle("off", p.dataset.panel !== name));
  };
  $$("[data-tab]").forEach((b) => (b.onclick = () => openTab(b.dataset.tab)));
  $$("[data-tab-open]").forEach((a) => a.addEventListener("click", () => openTab(a.dataset.tabOpen)));
  openTab("details");

  // Colour swatches — real yarn texture, hex underneath while it loads
  const swatches = $("#swatches");
  const selectColor = (color) => {
    state.color = color;
    $("#colorName").textContent = colorLabel(color);
    swatches.querySelectorAll(".swatch").forEach((b) =>
      b.setAttribute("aria-checked", b.dataset.code === color.code)
    );
    gallery.firstElementChild.src = color.image || C.gallery[0];
    thumbs.querySelector("img").src = color.image || C.gallery[0];
    gallery.scrollTo({ left: 0, behavior: "smooth" });
  };
  const swatchFill = (c) => `${c.hex} url(${c.yarn}) center/cover`;
  C.colors.forEach((color) => {
    const b = document.createElement("button");
    b.className = "swatch";
    b.type = "button";
    b.role = "radio";
    b.dataset.code = color.code;
    b.style.background = swatchFill(color);
    b.onclick = () => selectColor(color);
    swatches.appendChild(b);
  });

  // Palette section — clicking a colour jumps back up with it selected
  // Yarn circles for now; photo boxes once every colour has a photo of the shoe
  const palette = $("#palette");
  const photoBoxes = C.colors.every((c) => c.image);
  palette.classList.toggle("photos", photoBoxes);
  C.colors.forEach((color) => {
    const li = document.createElement("li");
    li.dataset.code = color.code;
    const fill = photoBoxes ? `${color.hex} url(${color.image}) center/cover` : swatchFill(color);
    li.innerHTML = `<div class="blob" style="background:${fill}"></div><span></span>`;
    li.onclick = () => {
      selectColor(color);
      $("#shop").scrollIntoView({ behavior: "smooth" });
    };
    palette.appendChild(li);
  });

  // Sizes, with foot length under each
  const sizes = $("#sizes");
  const buy = $("#buy");
  const updateBuy = () => {
    buy.disabled = !state.size;
    buy.textContent = state.size ? t("buy") : t("selectSize");
  };
  C.sizes.forEach((size) => {
    const b = document.createElement("button");
    b.className = "size";
    b.type = "button";
    b.role = "radio";
    b.innerHTML = `${size.eu}<small>${size.cm} cm</small>`;
    b.setAttribute("aria-checked", "false");
    b.onclick = () => {
      state.size = size;
      sizes.querySelectorAll(".size").forEach((x) => x.setAttribute("aria-checked", x === b));
      updateBuy();
    };
    sizes.appendChild(b);
  });

  const sizeTable = $("#sizeTable");
  const renderSizeTable = () => {
    sizeTable.innerHTML =
      `<tr><th>${t("tableEu")}</th><th>${t("tableCm")}</th></tr>` +
      C.sizes.map((s) => `<tr><td>${s.eu}</td><td>${s.cm} cm</td></tr>`).join("");
  };

  buy.onclick = () => {
    if (C.shopifyStore && state.size.variant) {
      // Straight to Shopify checkout with this size. Colour (and size, for clarity) ride along
      // as order attributes and show under "Additional details" on the order in Shopify admin.
      const url = new URL(`https://${C.shopifyStore}/cart/${state.size.variant}:1`);
      url.searchParams.set("attributes[Colour]", `${state.color.name} (${state.color.code})`);
      url.searchParams.set("attributes[Size]", `EU ${state.size.eu} (${state.size.cm} cm)`);
      window.location.href = url.toString();
    } else {
      const subject = t("orderSubject", {
        color: `${colorLabel(state.color)} (${state.color.code})`,
        size: `${state.size.eu} / ${state.size.cm} cm`,
      });
      window.location.href = `mailto:${C.email}?subject=${encodeURIComponent(subject)}`;
    }
  };

  const setLang = (lang) => {
    state.lang = lang;
    try { localStorage.setItem("lang", lang); } catch {}
    document.documentElement.lang = lang;
    document.title = t("title");
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
    $$("[data-price]").forEach((el) => (el.textContent = `€${C.price}`));
    $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    swatches.querySelectorAll(".swatch").forEach((b) => {
      const c = byCode(b.dataset.code);
      b.title = colorLabel(c);
      b.setAttribute("aria-label", colorLabel(c));
    });
    palette.querySelectorAll("li").forEach((li) => {
      li.querySelector("span").textContent = colorLabel(byCode(li.dataset.code));
    });
    $("#colorName").textContent = colorLabel(state.color);
    renderSizeTable();
    updateBuy();
  };
  $$("[data-lang]").forEach((b) => (b.onclick = () => setLang(b.dataset.lang)));

  setLang(state.lang);
  selectColor(state.color);
})();
