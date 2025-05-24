gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let sections = gsap.utils.toArray(".overlay");
let currentPage = 0;

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".scrollContainer",
    pin: true,
    scrub: 1,
    snap: {
      snapTo: 1 / (sections.length - 1),
      duration: 0.3,
      delay: 0.1,
      ease: "power1.inOut"
    },
    end: () => "+=" + document.querySelector(".scrollContainer").offsetWidth,
    onUpdate: (self) => {
      const newPage = Math.round(self.progress * (sections.length - 1));
      if (newPage !== currentPage) {
        currentPage = newPage;
        updateDots();
      }
    }
  }
});

function scrollToSection(index) {
  let scrollContainer = document.querySelector(".scrollContainer");
  let totalScroll = scrollContainer.offsetWidth;
  let sectionScrollY = (index / (sections.length - 1)) * totalScroll;

  gsap.to(window, {
    scrollTo: sectionScrollY,
    duration: 1,
    ease: "power1.inOut"
  });
}

function updateDots() {
  const currentDot = document.getElementById("current");
  currentDot.removeAttribute("id");
  const dots = document.getElementsByClassName("dot");
  dots[currentPage].id = "current";
}

function expand() {
  let overlays = document.getElementsByClassName("overlay");
    if (overlays[currentPage].querySelector(".bandeau").style.width === "90vw") {
    console.log("expand");
    overlays[currentPage].querySelector(".bandeau").style.width = "35vw";
    overlays[currentPage].querySelector(".bandeau").style.height = "15vh";
    overlays[currentPage].querySelector(".bandeau").style.top = "80vh";
    overlays[currentPage].querySelector(".bandeau").style.left = "1%";
    overlays[currentPage].querySelector(".bandeau>.text>p").style.maskImage = "linear-gradient(to top, transparent 10%, black 125%)";
    overlays[currentPage].querySelector(".bandeau>.text>p").style["-webkit-mask-image"] = "linear-gradient(to top, transparent 10%, black 125%)";

  } else {
    overlays[currentPage].querySelector(".bandeau").style.width = "90vw";
    overlays[currentPage].querySelector(".bandeau").style.height = "85vh";
    overlays[currentPage].querySelector(".bandeau").style.top = "10vh";
    overlays[currentPage].querySelector(".bandeau").style.left = "15vw";
    overlays[currentPage].querySelector(".bandeau>.text>p").style.maskImage = "linear-gradient(to top, transparent 0%, black 0%)";
    overlays[currentPage].querySelector(".bandeau>.text>p").style["-webkit-mask-image"] = "linear-gradient(to top, transparent 0%, black 0%)";
  }

  
//   console.log(overlays);
//   overlays[currentPage].querySelector(".bandeau").style.width = "90vw";
//   overlays[currentPage].querySelector(".bandeau").style.height = "85vh";
//   overlays[currentPage].querySelector(".bandeau").style.top = "10vh";
//   overlays[currentPage].querySelector(".bandeau").style.left = "15vw";

  overlays[currentPage].querySelector(".bandeau").style.transition = "all 0.5s ease-in-out";
}
