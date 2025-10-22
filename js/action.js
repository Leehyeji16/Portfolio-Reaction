
// ------------------------------------------------
// 01. 부드러운 스크롤 (Lenis)
// ------------------------------------------------
const lenis = new Lenis({
  smooth: true,
  lerp: 0.1, // 부드러움 정도
  duration: 1.2
});

// 애니메이션 프레임 루프
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ✅ 창 크기 변경 시 Lenis 다시 계산
window.addEventListener('resize', () => {
  setTimeout(() => lenis.resize(), 300); // 약간의 딜레이 후 다시 계산
});

// ------------------------------------------------
// 02. GSAP 플러그인 등록
// ------------------------------------------------
gsap.registerPlugin(ScrollTrigger, SplitText);


// ------------------------------------------------
// 03. Section 1 : 글씨조각 애니메이션 + 이미지 이동
// ------------------------------------------------

// 글씨 SplitText 애니메이션
document.fonts.ready.then(() => {
  let split1 = SplitText.create(".section1 .text_box", { type: "chars" });
  gsap.from(split1.chars, {
    x: 500,
    y: -50,
    rotateY: 190,
    autoAlpha: 0,
    rotate: 10,
    letterSpacing: "-0.2em",
    stagger: 0.05,
    duration: 1
  });
});

// 메인 이미지 이동 + 그래프 교체
gsap.timeline({
  scrollTrigger: {
    trigger: ".section1",
    start: "top top",
    end: "+=1300",
    scrub: true,
    onLeave: () => {
      document.querySelector(".graph_box img").src = "images/section2/graph2.png";
    },
    onEnterBack: () => {
      document.querySelector(".graph_box img").src = "images/section2/graph.png";
    }
  }
}).to(".mainImgWrap", {
  marginLeft: "7.8vw",
  top: "145%",
  scale: 0.2,
  rotate: -50
});


// ------------------------------------------------
// 04. Section 2 : 이미지 추가 이동
// ------------------------------------------------
gsap.timeline({
  scrollTrigger: {
    trigger: ".section2",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
}).to(".mainImgWrap", {
  marginLeft: -150,
  top: "225%",
  scale: 0.05,
  rotate: 0
});


// ------------------------------------------------
// 05. Section 3 : Skill 영역 (pin + 리스트 등장)
// ------------------------------------------------
gsap.timeline({
  scrollTrigger: {
    trigger: ".section3",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true
  }
})
  .to(".mainImgWrap", {
    marginLeft: -150,
    top: "225%",
    scale: 0.05,
    rotate: 0
  })
  .from(".skill-box li", {
    autoAlpha: 0,
    y: 100,
    backgroundColor: "purple",
    stagger: 0.2
  });


// ------------------------------------------------
// 06. Section 4 : Web Design (SplitText 각각 적용)
// ------------------------------------------------
gsap.timeline({
  scrollTrigger: {
    trigger: ".section4",
    start: "top 50%",
    end: "+=500",
    scrub: true,
    // pin: true,
    // markers: true,

    // onEnter: () => monitorAnim.restart(),      // 아래로 스크롤 시 restart()
    // onEnterBack: () => monitorAnim.restart(),  // 위로 스크롤 시 restart()
  }
})/* .to(".mainImgWrap", {
  marginLeft: 350,
  top: "425%",
  scale: 1,
  rotate: 0
}); */


// ------------------------------------------------
// 06. Section 4 : Web Design (SplitText 각각 적용)
// ------------------------------------------------
// 모든 .one 박스를 배열로 가져오기
gsap.utils.toArray(".one").forEach(one => {
  let circle = one.querySelector(".bg_circle");

  gsap.fromTo(circle,
    { opacity: 0 },   // 시작 상태
    {
      opacity: 0.3,     // 도착 시 상태
      duration: 1,
      scrollTrigger: {
        trigger: one,       // 각 .one 박스 기준으로
        start: "top 50%",   // 화면 아래쪽에서 80% 지점에 들어오면 시작
        toggleActions: "play none none reverse"
        // 다시 위로 올릴 때 원래대로 사라지게
      }
    }
  );
});







// .section4 안의 텍스트 각각 SplitText 적용
document.querySelectorAll(".section4 .text").forEach((box) => {
  document.fonts.ready.then(() => {
    let split = SplitText.create(box, { type: "chars" });
    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: box,
        start: "30% 80%",
        toggleActions: "play none none reverse"
      },
      x: 500,
      y: -50,
      rotateY: 190,
      autoAlpha: 0,
      rotate: 10,
      letterSpacing: "-0.2em",
      stagger: 0.05,
      duration: 1
    });
  });
});

//각 모니터

document.querySelectorAll(".section4 .one1, .section4 .one2, .section4 .one3, .section4 .one4, .section4 .one5, .section4 .one6")
  .forEach((oneBox) => {
    let computer = oneBox.querySelector(".computer");

    if (computer) {
      ScrollTrigger.create({
        trigger: oneBox,
        start: "top 70%",   // 화면 아래쪽에서 살짝 올라올 때 시작
        end: "bottom 30%", // 지나가면 해제
        toggleClass: { targets: computer, className: "on" },
        // markers: true   // 디버그용
      });
    }
  });



// ------------------------------------------------
// 07. Section 5 : Banner & Popup (가로 스크롤)
// ------------------------------------------------
function setupSection5Animation() {
  const ul = document.querySelector(".section5 ul");
  if (!ul) return;

  // 기존 ScrollTrigger 제거
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === ".section5") {
      trigger.kill();
    }
  });

  // 화면 크기에 따른 설정
  const isMobile = window.innerWidth <= 1200;
  
  // 가로 스크롤 애니메이션
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section5",
      start: "top top",
      end: () => "+=" + (ul.offsetWidth - window.innerWidth),
      scrub: true,
      pin: true,
      invalidateOnRefresh: true // 리사이즈 시 다시 계산
    }
  }).fromTo(".section5 ul",
    { x: isMobile ? "30%" : "50%" },  // 모바일에서는 덜 밀려있게
    { x: () => -(ul.offsetWidth - window.innerWidth), ease: "none" }, 's5'
  ).to(".mainImgWrap", {
    marginLeft: -150,
    top: "1025%",
    scale: 20,
    rotate: 0
  }, 's5');
}

// 최초 실행
setupSection5Animation();

// 리사이즈 대응
let resizeTimer5;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer5);
  resizeTimer5 = setTimeout(() => {
    setupSection5Animation();
    ScrollTrigger.refresh();
  }, 300);
});


// ------------------------------------------------
// 08. Section 6 : App Design
// ------------------------------------------------
function setupSection6Animation() {
  // 🔹 430px 이하에서는 애니메이션 완전 비활성화
  if (window.innerWidth <= 430) {
    // section6 관련 ScrollTrigger 제거
    if (window.ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && trigger.trigger.closest(".section6")) {
          trigger.kill();
        }
      });
    }

    // 즉시 표시 (이미지 + 텍스트박스)
    document.querySelectorAll(".section6 img, .section6 .big_textbox").forEach(el => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.transition = "none";
      el.style.animation = "none";
      el.style.position = "relative";  // ✅ 추가
    });

    // section6 강제로 표시 및 높이 조정
    const sec6 = document.querySelector(".section6");
    if (sec6) {
      sec6.style.opacity = "1";
      sec6.style.visibility = "visible";
      sec6.style.display = "block";
      sec6.style.minHeight = "auto";  // ✅ 추가
      sec6.style.height = "auto";     // ✅ 추가
    }

    return; // ✅ 더 이상 아래 코드 실행 안 함
  }

  // 🔹 기존 ScrollTrigger 중복 제거
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === ".section6") {
      trigger.kill();
    }
  });

  // 🔹 430px 초과 구간 (PC / 태블릿)
  const isMobile = window.innerWidth <= 1200;

  gsap.timeline({
    scrollTrigger: {
      trigger: ".section6",
      start: isMobile ? "top 70%" : "top top",
      end: isMobile ? "bottom 60%" : "bottom top",
      scrub: 1,
      pin: false, // ✅ pin 기능 완전 비활성화
      markers: false
    }
  })
    // 이미지 등장 - 속도 빠르게
    .from(".section6 .app_img", {
      y: isMobile ? 30 : 80,
      autoAlpha: 0,
      duration: isMobile ? 0.3 : 0.8,
      ease: "power2.out"
    })
    // 왼쪽 텍스트박스 등장 - 속도 빠르게
    .from(".section6 .left_img .big_textbox", {
      x: isMobile ? "-200px" : "-80vw",
      autoAlpha: 0,
      duration: isMobile ? 0.3 : 0.6,
      ease: "power2.out"
    }, isMobile ? "-=0.2" : "-=0.4")
    // 오른쪽 텍스트박스 등장 - 속도 빠르게
    .from(".section6 .rigth_img .big_textbox", {
      x: isMobile ? "200px" : "80vw",
      autoAlpha: 0,
      duration: isMobile ? 0.3 : 0.6,
      ease: "power2.out"
    }, isMobile ? "-=0.2" : "-=0.4")
    // 메인 이미지 이동 (공통)
    .to(".mainImgWrap", {
      marginLeft: -1050,
      top: "1500%",
      scale: 1,
      rotate: 0
    });
}

// 최초 실행
setupSection6Animation();

// 🔹 리사이즈 대응
let resizeTimer6;  // ✅ 변수명 변경 (다른 섹션과 충돌 방지)
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer6);
  resizeTimer6 = setTimeout(() => {
    setupSection6Animation();
    ScrollTrigger.refresh();
  }, 300);
});

// ------------------------------------------------
// 09. Section 7 : Collaborative Work
// ------------------------------------------------
function setupSection7Animation() {
  // 🔹 430px 이하에서는 애니메이션 완전 비활성화
  if (window.innerWidth <= 430) {
    // 즉시 표시 (텍스트박스)
    document.querySelectorAll(".section7 .big_textbox").forEach(el => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.left = "auto";
      el.style.right = "auto";
      el.style.transition = "none";
      el.style.animation = "none";
    });

    // section7 관련 ScrollTrigger 제거
    if (window.ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger && trigger.trigger.closest(".section7")) {
          trigger.kill();
        }
      });
    }

    return; // ✅ 더 이상 아래 코드 실행 안 함
  }

  // 🔹 기존 ScrollTrigger 중복 제거
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === ".section7") {
      trigger.kill();
    }
  });

  // 🔹 430px 초과 구간 (PC / 태블릿)
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section7",
      start: "top 50%",
      end: 'bottom top',
      scrub: true,
      pin: false // ✅ pin 기능 완전 비활성화
    }
  }).from(".section7 .imgbox .top_img .big_textbox", {
    left: '50%',
  }).from(".section7 .imgbox .bottom_img .big_textbox", {
    right: '50%',
  })
    .to(".mainImgWrap", {
      marginLeft: -1050,
      top: "1600%",
      x: 1900,
      scale: 1,
      rotate: 0
    });
}

// 최초 실행
setupSection7Animation();

// 🔹 리사이즈 대응
let resizeTimer7;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer7);
  resizeTimer7 = setTimeout(() => {
    setupSection7Animation();
    ScrollTrigger.refresh();
  }, 300);
});




// ------------------------------------------------
// 10. Section 8 : Video
// ------------------------------------------------
function setupSection8Animation() {
  const video8 = document.getElementById("video8");
  
  // 🔹 430px 이하에서는 GSAP 애니메이션 비활성화하고 영상 재생에 집중
  if (window.innerWidth <= 430) {
    // 기존 ScrollTrigger 제거
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && trigger.trigger.closest(".section8")) {
        trigger.kill();
      }
    });
    
    // 모바일에서 영상 즉시 표시 및 재생 강제
    if (video8) {
      gsap.set(video8, {
        scale: 1,
        transform: "none",
        opacity: 1,
        visibility: "visible"
      });
      
      // 모바일에서 영상 재생 강제 실행
      const playVideo = () => {
        video8.play().catch(e => {
          console.log("영상 자동재생 실패, 사용자 상호작용 필요:", e);
          // 자동재생 실패 시 사용자에게 알림 (선택사항)
        });
      };
      
      // 페이지 로드 후 영상 재생 시도
      setTimeout(playVideo, 500);
      
      // 섹션8이 화면에 보일 때 영상 재생 시도
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(document.querySelector(".section8"));
    }
    
    return; // ✅ 더 이상 아래 코드 실행 안 함
  }
  
  // 🔹 PC/태블릿 이상: 기존 GSAP 애니메이션 적용
  gsap.timeline({
    scrollTrigger: {
      trigger: ".section8",
      start: "top top",
      end: 'bottom top',
      scrub: true,
      pin: true
    }
  })
    .to("#video8", {
      scale: 1.8,
    });
}

// 최초 실행
setupSection8Animation();

// 🔹 리사이즈 대응
let resizeTimer8;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer8);
  resizeTimer8 = setTimeout(() => {
    setupSection8Animation();
    ScrollTrigger.refresh();
  }, 300);
});



// ------------------------------------------------
// 11. Section 9 : photo
// ------------------------------------------------
function setupSection9Animation() {
  const isMobile = window.innerWidth <= 430;

  // 기존 ScrollTrigger 제거
  ScrollTrigger.getAll().forEach(trigger => {
    const el = trigger.trigger;
    if (el && el.closest(".section9")) {
      trigger.kill();
    }
  });

  if (isMobile) {
    // 🔹 모바일(430px 이하): 애니메이션 제거 + 즉시 표시
    document.querySelectorAll(".section9 .photo img").forEach(img => {
      gsap.set(img, {
        opacity: 1,
        visibility: "visible",
        transform: "none",
        left: "auto",
        top: "auto",
        clearProps: "transform,opacity,left,top"
      });
    });

    document.querySelectorAll(".section9 .photo").forEach(photo => {
      photo.style.opacity = "1";
      photo.style.visibility = "visible";
      photo.style.transform = "none";
    });

  } else {
    // 🔹 PC/태블릿 이상: 애니메이션 적용
    document.querySelectorAll(".section9 .photo").forEach(photo => {
      const img = photo.querySelector("img");
      if (!img) return; // 이미지 없으면 무시

      gsap.from(img, {
        scrollTrigger: {
          trigger: photo,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
          // pin: true, // 필요 시 활성화
          // markers: true, // 디버깅용
        },
        autoAlpha: 0,
        x: 0, // 필요 시 조정
        y: 30, // 필요 시 조정
        duration: 1,
        ease: "power2.out"
      });
    });
  }
}

// 최초 실행
setupSection9Animation();

// 리사이즈 대응
let resizeTimer9;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer9);
  resizeTimer9 = setTimeout(() => {
    setupSection9Animation();
    ScrollTrigger.refresh();
  }, 300);
});
