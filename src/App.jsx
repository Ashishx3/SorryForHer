import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageWrapper = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-b from-white to-zinc-50 text-zinc-900 flex items-center justify-center p-4">
    <div className="w-full max-w-3xl">
      <div className="bg-white/80 backdrop-blur shadow-xl rounded-2xl border border-zinc-200 p-6 md:p-8">
        {children}
      </div>
    </div>
  </div>
);

const Nav = ({ current, total, onPrev, onNext }) => (
  <div className="mt-6 flex items-center justify-between gap-3">
    <button
      onClick={onPrev}
      disabled={current === 0}
      className="px-4 py-2 rounded-xl border border-zinc-300 disabled:opacity-40 hover:bg-zinc-50 transition"
    >
      ← Previous
    </button>
    <div className="text-sm text-zinc-500">{current + 1} / {total}</div>
    <button
      onClick={onNext}
      disabled={current + 1 === total}
      className="px-4 py-2 rounded-xl bg-zinc-900 text-white disabled:opacity-40 hover:bg-zinc-800 transition"
    >
      Next →
    </button>
  </div>
);

const Section = ({ title, subtitle, children }) => (
  <div>
    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
    {subtitle && <p className="mt-2 text-zinc-600 leading-relaxed">{subtitle}</p>}
    {children && <div className="mt-5 space-y-3 text-zinc-800 leading-relaxed">{children}</div>}
  </div>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border border-zinc-200 p-5 bg-white/70">{children}</div>
);

const Divider = () => <div className="my-6 h-px bg-zinc-200" />;

// Simple Audio Player Component
const AudioPlayer = ({ src, label }) => (
  <div className="space-y-2">
    <p className="text-sm text-zinc-600">{label}</p>
    <audio controls className="w-full">
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
);

const pages = [
  {
    key: "welcome",
    title: "Hey Sonam 💛",
    content: (
      <>
        <p>
          Yeh page maine sirf tere liye banaya hai. Mere words kabhi-kabhi chat me bigad jate hain, isliye maine socha ki ek chhota sa digital letter likhu—clear, honest aur bina pressure ke.
        </p>
      </>
    )
  },
  {
    key: "sorry",
    title: "3 Things I Need to Say Clearly",
    content: (
      <>
        <ul className="list-decimal pl-6 space-y-4 text-zinc-700">
          <li>
            <span className="font-medium">I’m sorry.</span> Darr ki wajah se maine fake ID use ki. Tujhe hurt karna kabhi intention nahi tha.
          </li>
          <li>
            <span className="font-medium">I miss the real you.</span> Tere awws, explanations, aur jo emotions tu share karti thi—unhe khud se door kar diya maine apne jhooth se. Aur mujhe sabse zyada yeh cheez khati hai.
            <Divider />
            <AudioPlayer src="/audio/aww.mp3" label="Her cute 'aww' I miss 💛" />
            <AudioPlayer src="/audio/explanation.mp3" label="Her sweet explanations I regret killing with lies" />
          </li>
          <li>
            <span className="font-medium">I promise honesty & respect.</span> Ab koi mask nahi, bas real me jo hu wahi. Aur agar tujhe space chahiye ho toh main hamesha respect karunga.
          </li>
        </ul>
      </>
    )
  },
  {
    key: "note",
    title: "A small note for you ✍️",
    content: (
      <>
        <p>
          Tu “failed as a friend” nahi hai. Galti meri thi. Jo bhi confusion hua, woh mere fear ki wajah se hua. Teri kindness ke liye genuinely thankful hoon.
        </p>
        <Card>
          <p className="italic">
            "Agar kabhi hum dobara start karein, to iss baar bina mask ke. Aur agar na bhi karein, to bhi tera respect hamesha rahega."
          </p>
        </Card>
      </>
    )
  }
];

export default function SonamPage() {
  const [i, setI] = useState(0);
  const total = pages.length;

  const goPrev = () => setI((v) => Math.max(0, v - 1));
  const goNext = () => setI((v) => Math.min(total - 1, v + 1));

  const current = useMemo(() => pages[i], [i]);

  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
        >
          <Section title={current.title}>
            {current.content}
          </Section>
          <Nav current={i} total={total} onPrev={goPrev} onNext={goNext} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => { try { window.print(); } catch(e) {} }}
              className="px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-50 transition"
            >
              Print / Save as PDF
            </button>
            <a
              href={typeof window !== 'undefined' ? window.location.href : '#'}
              className="px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-50 transition"
            >
              Share Link
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </PageWrapper>
  );
}
