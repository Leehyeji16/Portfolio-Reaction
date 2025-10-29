// ------------------------------------------------
// Lenis 전역 변수
// ------------------------------------------------
let lenis;
let lenisRAF;

// ------------------------------------------------
// GSAP 플러그인 등록 (전역)
// ------------------------------------------------
gsap.registerPlugin(ScrollTrigger, SplitText);

// ------------------------------------------------
// ScrollTrigger.matchMedia로 반응형 처리
// ------------------------------------------------
ScrollTrigger.matchMedia({

  // ===== PC 버전 (641px 이상) =====
  "(min-width: 641px)": function () {

    // Lenis 초기화
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true
    });

    // Lenis와 ScrollTrigger 연동
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      lenisRAF = requestAnimationFrame(raf);
    }
    lenisRAF = requestAnimationFrame(raf);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ------------------------------------------------
    // Section 1 : 글씨조각 애니메이션 + 이미지 이동
    // ------------------------------------------------
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

    gsap.timeline({
      scrollTrigger: {
        trigger: ".section1",
        start: "top top",
        end: "+=1300",
        scrub: true,
        onLeave: () => {
          const graphImg = document.querySelector(".graph_box img");
          if (graphImg) graphImg.src = "images/section2/graph2.png";
        },
        onEnterBack: () => {
          const graphImg = document.querySelector(".graph_box img");
          if (graphImg) graphImg.src = "images/section2/graph.png";
        }
      }
    }).to(".mainImgWrap", {
      marginLeft: -150,
      top: "145%",
      scale: 0.2,
      rotate: -50
    });

    // ------------------------------------------------
    // Section 2 : 이미지 추가 이동
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
    // Section 3 : Skill 영역
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
    // Section 4 : Web Design (SplitText)
    // ------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: ".section4",
        start: "top 50%",
        end: "+=500",
        scrub: true,
      }
    });

    gsap.utils.toArray(".one").forEach(one => {
      let circle = one.querySelector(".bg_circle");
      if (circle) {
        gsap.fromTo(circle,
          { opacity: 0 },
          {
            opacity: 0.3,
            duration: 1,
            scrollTrigger: {
              trigger: one,
              start: "top 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    document.querySelectorAll(".section4 .text").forEach((box) => {
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

    document.querySelectorAll(".section4 .one1, .section4 .one2, .section4 .one3, .section4 .one4, .section4 .one5, .section4 .one6")
      .forEach((oneBox) => {
        let computer = oneBox.querySelector(".computer");
        if (computer) {
          ScrollTrigger.create({
            trigger: oneBox,
            start: "top 70%",
            end: "bottom 30%",
            toggleClass: { targets: computer, className: "on" },
          });
        }
      });

    // ------------------------------------------------
    // Section 5 : Banner (가로 스크롤)
    // ------------------------------------------------
    let ul = document.querySelector(".section5 ul");
    if (ul) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".section5",
          start: "top top",
          end: () => "+=" + (ul.offsetWidth - window.innerWidth),
          scrub: true,
          pin: true
        }
      }).fromTo(".section5 ul",
        { x: "50%" },
        { x: () => -(ul.offsetWidth - window.innerWidth), ease: "none" }, 's5'
      ).to(".mainImgWrap", {
        marginLeft: -150,
        top: "1025%",
        scale: 20,
        rotate: 0
      }, 's5');
    }

    // ------------------------------------------------
    // Section 6 : App Design
    // ------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: ".section6",
        start: "top top",
        end: 'bottom top',
        scrub: true,
        pin: true
      }
    }).from(".section6 .app_img", {
      y: 100,
      autoAlpha: 0,
    }).from(".section6 .left_img .big_textbox", {
      x: -100,
      y: 50,
      autoAlpha: 0,
    }, 'bigtextbox')
      .from(".section6 .rigth_img .big_textbox", {
        x: 100,
        y: -50,
        autoAlpha: 0,
      }, 'bigtextbox')
      .to(".mainImgWrap", {
        marginLeft: -1050,
        top: "1500%",
        scale: 1,
        rotate: 0
      });

    // ------------------------------------------------
    // Section 7 : Collaborative Work
    // ------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: ".section7",
        start: "top 50%",
        end: 'bottom top',
        scrub: true,
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

    // ------------------------------------------------
    // Section 8 : Video
    // ------------------------------------------------
    const video8 = document.querySelector(".section8 video");
    if (video8) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".section8",
          start: "top top",
          end: 'bottom top',
          scrub: true,
          pin: true
        }
      })
        .to(video8, {
          scale: 1.8,
        });
    }

    // ------------------------------------------------
    // Section 9 : photo
    // ------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: ".section9",
        start: "top top",
        end: 'bottom top',
        scrub: true,
        pin: true
      }
    })
      .from(".photo1 img", { left: -100, top: -100, autoAlpha: 0 }, 'photoImg')
      .from(".photo2 img", { left: -150, top: -230, autoAlpha: 0 }, 'photoImg')
      .from(".photo3 img", { left: 0, top: -210, autoAlpha: 0 }, 'photoImg')
      .from(".photo4 img", { left: 30, top: -150, autoAlpha: 0 }, 'photoImg')
      .from(".photo5 img", { left: 100, top: -200, autoAlpha: 0 }, 'photoImg')
      .from(".photo6 img", { left: 50, top: 70, autoAlpha: 0 }, 'photoImg')
      .from(".photo7 img", { left: -100, top: -200, autoAlpha: 0 }, 'photoImg')
      .from(".photo8 img", { left: -100, top: 300, autoAlpha: 0 }, 'photoImg')
      .from(".photo9 img", { left: 350, top: -100, autoAlpha: 0 }, 'photoImg')
      .from(".photo10 img", { left: -150, top: 0, autoAlpha: 0 }, 'photoImg')
      .from(".photo11 img", { left: -150, top: 150, autoAlpha: 0 }, 'photoImg')
      .from(".photo12 img", { left: -150, top: 50, autoAlpha: 0 }, 'photoImg')
      .from(".photo13 img", { left: 200, top: 100, autoAlpha: 0 }, 'photoImg')
      .from(".photo14 img", { left: 300, top: 200, autoAlpha: 0 }, 'photoImg')
      .from(".photo15 img", { left: 300, top: 250, autoAlpha: 0 }, 'photoImg');

    // ⭐ cleanup 함수 (PC → 모바일로 전환될 때 실행됨)
    return () => {
      console.log("PC 모드 종료 - 정리 중...");

      // Lenis 정리
      if (lenisRAF) {
        cancelAnimationFrame(lenisRAF);
        lenisRAF = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }

      // GSAP ticker 정리
      gsap.ticker.remove(() => { });

      // SplitText 정리
      document.querySelectorAll('[class*="split"]').forEach(el => {
        if (el._splitText) {
          el._splitText.revert();
        }
      });
    };
  },

  // ===== 모바일 버전 (640px 이하) =====
  "(max-width: 640px)": function () {

    // Lenis 초기화
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true
    });

    // Lenis와 ScrollTrigger 연동
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      lenisRAF = requestAnimationFrame(raf);
    }
    lenisRAF = requestAnimationFrame(raf);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);




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


    gsap.timeline({
      scrollTrigger: {
        trigger: ".section1",
        start: "top top",
        end: "+=1300",
        scrub: true,
        onLeave: () => {
          const graphImg = document.querySelector(".graph_box img");
          if (graphImg) graphImg.src = "images/section2/graph2.png";
        },
        onEnterBack: () => {
          const graphImg = document.querySelector(".graph_box img");
          if (graphImg) graphImg.src = "images/section2/graph.png";
        }
      }
    }).to(".mainImgWrap", {
      marginLeft: 0,
      top: "205%",
      scale: 0.2,
      rotate: -50
    });






    gsap.timeline({
      scrollTrigger: {
        trigger: ".section2 .tbox2",
        start: "top top",
        end: "center top",
        scrub: true,
        onLeave: () => {
          const graphImg = document.querySelector(".graph_box img");
          if (graphImg) graphImg.src = "images/section2/graph2.png";
        },
        onEnterBack: () => {
          const graphImg = document.querySelector(".graph_box img");
          if (graphImg) graphImg.src = "images/section2/graph.png";
        }
      }
    }).from(".graph_box img", {
      scale: 0.2,
      rotate: -50
    });




    // ------------------------------------------------
    // Section 3 : Skill 영역
    // ------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: ".section3",
        start: "20% top",
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

    // // ------------------------------------------------
    // // Section 4 : Web Design (SplitText)
    // // ------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: ".section4",
        start: "top 50%",
        end: "+=500",
        scrub: true,
      }
    });

    // gsap.utils.toArray(".one").forEach(one => {
    //   let circle = one.querySelector(".bg_circle");
    //   if (circle) {
    //     gsap.fromTo(circle,
    //       { opacity: 0 },
    //       {
    //         opacity: 0.3,
    //         duration: 1,
    //         scrollTrigger: {
    //           trigger: one,
    //           start: "top 50%",
    //           toggleActions: "play none none reverse"
    //         }
    //       }
    //     );
    //   }
    // });

    gsap.utils.toArray(".section4 .content_box").forEach((box) => {
      gsap.from(box, {
        x: -100,  // 왼쪽에서 등장
        autoAlpha: 0,
        duration: 1,
        scrollTrigger: {
          trigger: box,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    document.querySelectorAll(".section4 .text, .section4 .rowFont").forEach((box) => {
      let split = SplitText.create(box, { type: "chars" });
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: box,
          start: "30% 80%",
          toggleActions: "play none none reverse"
        },
        x: -50,
        y: -50,
        rotateY: 190,
        autoAlpha: 0,
        rotate: 10,
        letterSpacing: "-0.2em",
        stagger: 0.05,
        duration: 1
      });
    });

    // document.querySelectorAll(".section4 .one1, .section4 .one2, .section4 .one3, .section4 .one4, .section4 .one5, .section4 .one6")
    //   .forEach((oneBox) => {
    //     let computer = oneBox.querySelector(".computer");
    //     if (computer) {
    //       ScrollTrigger.create({
    //         trigger: oneBox,
    //         start: "top 70%",
    //         end: "bottom 30%",
    //         toggleClass: { targets: computer, className: "on" },
    //       });
    //     }
    //   });

    // ------------------------------------------------
    // Section 5 : Banner (가로 스크롤)
    // ------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: ".section5",
        start: "top top",
        end: "center top",
        scrub: true,
      }
    }).from(".section5 li",
      {
        marginTop: 100,
        stagger: 0.05,
        duration: 1
      }
    )

    // ------------------------------------------------
    // Section 6 : App Design
    // ------------------------------------------------
    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".section6",
    //     start: "top top",
    //     end: 'bottom top',
    //     scrub: true,
    //     pin: true
    //   }
    // }).from(".section6 .app_img", {
    //   y: 100,
    //   autoAlpha: 0,
    // }).from(".section6 .left_img .big_textbox", {
    //   x: -100,
    //   y: 50,
    //   autoAlpha: 0,
    // }, 'bigtextbox')
    // .from(".section6 .rigth_img .big_textbox", {
    //   x: 100,
    //   y: -50,
    //   autoAlpha: 0,
    // }, 'bigtextbox')
    // .to(".mainImgWrap", {
    //   marginLeft: -1050,
    //   top: "1500%",
    //   scale: 1,
    //   rotate: 0
    // });

    // ------------------------------------------------
    // Section 7 : Collaborative Work
    // ------------------------------------------------
    gsap.timeline({
      scrollTrigger: {
        trigger: ".section7",
        start: "top 80%",
        end: 'bottom top',
        scrub: true,
      }
    }).from(".section7 .imgbox .top_img .big_textbox", {
      left: '-15%',
      y: 80
    }).from(".section7 .imgbox .bottom_img .big_textbox", {
      left: '-15%',
      y: 80
    })




    // ------------------------------------------------
    // Section 8 : Video
    // ------------------------------------------------

    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".section8",
    //     start: "top top",
    //     end: 'bottom top',
    //     scrub: true,
    //     pin: true
    //   }
    // })
    // .to("#video8", {
    //   scale: 0.8,
    // });

    // ------------------------------------------------
    // Section 9 : photo
    // ------------------------------------------------
    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".section9",
    //     start: "top top",
    //     end: 'center top',
    //     scrub: true,
    //   }
    // })
    // .from(".photo1 img", { left: -100, top: -100, autoAlpha: 0 }, 'photoImg')
    // .from(".photo2 img", { left: -150, top: -230, autoAlpha: 0 }, 'photoImg')
    // .from(".photo3 img", { left: 0, top: -210, autoAlpha: 0 }, 'photoImg')
    // .from(".photo4 img", { left: 30, top: -150, autoAlpha: 0 }, 'photoImg')
    // .from(".photo5 img", { left: 100, top: -200, autoAlpha: 0 }, 'photoImg')
    // .from(".photo6 img", { left: 50, top: 70, autoAlpha: 0 }, 'photoImg')
    // .from(".photo7 img", { left: -100, top: -200, autoAlpha: 0 }, 'photoImg')
    // .from(".photo8 img", { left: -100, top: 300, autoAlpha: 0 }, 'photoImg')
    // .from(".photo9 img", { left: 350, top: -100, autoAlpha: 0 }, 'photoImg')
    // .from(".photo10 img", { left: -150, top: 0, autoAlpha: 0 }, 'photoImg')
    // .from(".photo11 img", { left: -150, top: 150, autoAlpha: 0 }, 'photoImg')
    // .from(".photo12 img", { left: -150, top: 50, autoAlpha: 0 }, 'photoImg')
    // .from(".photo13 img", { left: 200, top: 100, autoAlpha: 0 }, 'photoImg')
    // .from(".photo14 img", { left: 300, top: 200, autoAlpha: 0 }, 'photoImg')
    // .from(".photo15 img", { left: 300, top: 250, autoAlpha: 0 }, 'photoImg');
    // console.log("모바일 모드 활성화");

    // 모바일 안내 메시지
    // const existingMsg = document.querySelector("#mobileNotice");
    // if (existingMsg) existingMsg.remove();

    // const notice = document.createElement("div");
    // notice.id = "mobileNotice";
    // notice.textContent = "📱 모바일 화면 (GSAP 비활성화됨)";
    // Object.assign(notice.style, {
    //   position: "fixed",
    //   top: "20px",
    //   left: "50%",
    //   transform: "translateX(-50%)",
    //   background: "#222",
    //   color: "#fff",
    //   padding: "10px 20px",
    //   borderRadius: "6px",
    //   zIndex: 9999,
    //   fontSize: "14px",
    //   opacity: 0.9
    // });
    // document.body.appendChild(notice);

    // ⭐ cleanup 함수 (모바일 → PC로 전환될 때 실행됨)
    return () => {
      console.log("모바일 모드 종료");
      const msg = document.querySelector("#mobileNotice");
      if (msg) msg.remove();
    };
  }

});