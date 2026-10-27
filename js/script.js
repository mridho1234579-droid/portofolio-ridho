/* ==========================================================
   KONTAK: isi data di bawah. Tombol hanya muncul kalau diisi.
   Contoh:
     email:     "ridho@gmail.com"
     whatsapp:  "6285774204590"   (format 62..., tanpa + atau spasi)
     github:    "https://github.com/usernamekamu"
     instagram: "https://instagram.com/usernamekamu"
     linkedin:  "https://linkedin.com/in/usernamekamu"
   ========================================================== */
// Pesan yang otomatis terisi saat orang menekan tombol WhatsApp
const PESAN_WA = "Halo Ridho, aku lihat portofoliomu dan ingin berkenalan.";

const KONTAK = {
  email: "",
  whatsapp: "6285774204590",
  github: "",
  instagram: "https://instagram.com/555.dh05a",
  linkedin: ""
};

/* ---------- Kontak ---------- */
(function renderKontak() {
  const box = document.getElementById("contactLinks");
  const note = document.getElementById("contactNote");
  const items = [
    ["email", "Email", v => "mailto:" + v],
    ["whatsapp", "WhatsApp", v => "https://wa.me/" + v.replace(/\D/g, "") + "?text=" + encodeURIComponent(PESAN_WA)],
    ["github", "GitHub", v => v],
    ["instagram", "Instagram", v => v],
    ["linkedin", "LinkedIn", v => v]
  ];
  let count = 0;
  items.forEach(([key, label, href]) => {
    const val = (KONTAK[key] || "").trim();
    if (!val) return;
    const a = document.createElement("a");
    a.href = href(val);
    a.textContent = label;
    if (key !== "email") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    box.appendChild(a);
    count++;
  });
  if (!count) box.hidden = true;
  const wa = (KONTAK.whatsapp || "").trim();
  if (wa) {
    const f = document.getElementById("waFloat");
    f.href = "https://wa.me/" + wa.replace(/\D/g, "") + "?text=" + encodeURIComponent(PESAN_WA);
    f.hidden = false;
  }
})();

/* ---------- Foto profil: tampilkan inisial kalau file belum ada ---------- */
(function foto() {
  const img = document.getElementById("profilePhoto");
  const frame = img.closest(".photo-frame");
  const gagal = () => frame.classList.add("no-photo");
  img.addEventListener("error", gagal);
  if (img.complete && img.naturalWidth === 0) gagal();
})();

/* ---------- Navigasi mobile ---------- */
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});
links.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

/* ---------- Tandai menu sesuai bagian yang sedang dilihat ---------- */
const sections = [...document.querySelectorAll("main section[id]")];
const menu = [...links.querySelectorAll("a:not(.nav-cta)")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      menu.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));

/* ---------- Lightbox gambar ---------- */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
document.querySelectorAll(".shot").forEach(btn => {
  btn.addEventListener("click", () => {
    lbImg.src = btn.dataset.full;
    lbImg.alt = btn.querySelector("img").alt;
    lbCap.textContent = btn.dataset.cap || "";
    lb.showModal();
  });
});
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });

/* ---------- Detail PKL ---------- */
const pkl = document.getElementById("pklDialog");
document.getElementById("pklOpen").addEventListener("click", () => pkl.showModal());
pkl.addEventListener("click", e => { if (e.target === pkl) pkl.close(); });

/* ---------- Tahun di footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
