"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!container.current || !headline.current) return;

    const scale = 5;

    const dimensions = headline.current.getBoundingClientRect();
    const width = dimensions.width * scale;
    const height = dimensions.height * scale;

    const x = (window.innerWidth - width) / 2;
    const y = (window.innerHeight - height) / 2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        markers: true,
        scrub: 0,
        start: "top top",
        end: "bottom bottom",
      },
    });

    tl.to(
      headline.current,
      {
        scale: 5,
      },
      0
    )
      .to(
        container.current,
        {
          background: "blue",
        },
        0
      )
      .to(
        headline.current,
        {
          x: -x,
        },
        1
      )
      .to(
        container.current,
        {
          background: "red",
        },
        1
      )
      .to(
        headline.current,
        {
          y: -y,
        },
        2
      )
      .to(container.current, { background: "green" }, 2)
      .to(
        headline.current,
        {
          x: x,
        },
        3
      )
      .to(container.current, { background: "cyan" }, 3)
      .to(
        headline.current,
        {
          y: y,
          x: -x,
        },
        4
      )
      .to(container.current, { background: "purple" }, 4);
  }, [container, headline]);

  return (
    <>
      <div className="w-full h-[100vh]">test</div>
      <div ref={container} className="w-full h-[900vh] relative ">
        <div className="sticky left-0 top-1/2 flex justify-center translate-y-1/2">
          <h1 ref={headline} className="tracking-[0.3em] font-bold w-fit ">
            Let's scroll!
          </h1>
        </div>
      </div>
    </>
  );
}
