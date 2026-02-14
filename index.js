// ===== 基本設定 =====
const slider = document.getElementById("slider");
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));

let current = 0;
let timer = null;
const AUTOPLAY_MS = 5500;

// 年份
document.getElementById("year").textContent = new Date().getFullYear();

// 平滑捲動
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

// 手機選單
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;
  const isOpen = menu.style.display === "block";
  menu.style.display = isOpen ? "none" : "block";
}

// 表單送出（前端示意）
function submitForm(e) {
  e.preventDefault();
  alert("已送出！此為示意表單，如需真正收信請串接表單服務或後端。");
  return false;
}

// ===== 輪播控制 =====
function setActive(index) {
  current = (index + slides.length) % slides.length;

  slides.forEach((s, i) => {
    s.classList.toggle("is-active", i === current);
  });
  dots.forEach((d, i) => {
    d.classList.toggle("is-active", i === current);
  });
}

function nextSlide() {
  setActive(current + 1);
  restartAutoplay();
}

function prevSlide() {
  setActive(current - 1);
  restartAutoplay();
}

function goToSlide(i) {
  setActive(i);
  restartAutoplay();
}

function startAutoplay() {
  stopAutoplay();
  timer = setInterval(() => setActive(current + 1), AUTOPLAY_MS);
}

function stopAutoplay() {
  if (timer) clearInterval(timer);
  timer = null;
}

function restartAutoplay() {
  startAutoplay();
}

// 滑鼠移入暫停（桌機比較像企業官網）
slider?.addEventListener("mouseenter", stopAutoplay);
slider?.addEventListener("mouseleave", startAutoplay);

// 初始化
setActive(0);
startAutoplay();

// 鍵盤左右切換（加分）
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});
