gsap.registerPlugin(ScrollTrigger);

// Career 카드 가로 스크롤
// PC에서만 섹션을 고정하고 카드가 옆으로 흐르게. 모바일/모션 최소화 설정은 CSS 가로 스와이프 그대로 둔다.
function initCareerScroll() {
  const wrap = document.querySelector(".career-scroll-wrap");
  if (!wrap) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const bar = document.querySelector(".career-progress > span");

  ScrollTrigger.matchMedia({
    "(min-width: 800px)": function () {
      wrap.style.overflow = "visible";
      const distance = () => wrap.scrollWidth - wrap.clientWidth;

      gsap.to(wrap, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".main-section3",
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (bar) bar.style.width = self.progress * 100 + "%";
          },
        },
      });

      return () => {
        wrap.style.overflow = "";
      };
    },
  });
}

document.addEventListener("DOMContentLoaded", initCareerScroll);

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
