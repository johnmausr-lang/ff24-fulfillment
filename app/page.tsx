import Image from "next/image";

import AboutFF24 from "@/components/landing/AboutFF24";
import HowFF24Works from "@/components/landing/HowFF24Works";
import ContactFF24 from "@/components/landing/ContactFF24";

export default function HomePage() {
  return (
    <main>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#040406]">

        {/* Worker */}
        <Image
          src="/illustrations/worker-ff24.png"
          alt="FF24 Worker"
          width={600}
          height={800}
          className="absolute bottom-0 left-10 z-10 animate-float-slow pointer-events-none"
        />

        {/* Boxes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="box box1" />
          <div className="box box2" />
          <div className="box box3" />
          <div className="box box4" />
        </div>

        {/* Text */}
        <div className="relative z-20 max-w-4xl ml-auto mr-20">
          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            FF24 <br />
            <span className="text-[#d6ff00]">Fulfillment</span>
          </h1>
          <p className="text-xl text-white/70 max-w-xl">
            Премиальная складская инфраструктура для бизнеса,
            который работает на масштаб.
          </p>
        </div>

      </section>

      {/* ================= ABOUT ================= */}
      <AboutFF24 />

      {/* ================= HOW IT WORKS ================= */}
      <HowFF24Works />

      {/* ================= CONTACT ================= */}
      <ContactFF24 />

    </main>
  );
}
