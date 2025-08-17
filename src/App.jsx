import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageWrapper = ({ children }) => (
  <div className="min-h-screen  w-full flex items-center justify-center p-4 relative overflow-hidden">
    {/* Pulsating background */}
    <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-red-300 to-pink-400 opacity-90 animate-[pulse_2s_ease-in-out_infinite]"></div>

    {/* Content */}
    <div className="relative w-full mt-[30%] max-w-3xl">
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
          Yeh page maine sirf tumhare liye banaya hai. Mere words kabhi-kabhi chat me bigad jate hain, isliye maine socha ki ek chhota sa digital letter likhu—clear, honest aur pura truth mummy ki kasam.
          PLS Pura dekhna....
        </p>
      </>
    )
  },
  {
  key: "sorry",
  title: "3 Things I Need to Say Clearly",
  content: (
    <ul className="list-decimal pl-5 space-y-3 md:space-y-5 text-zinc-700 text-sm md:text-base leading-snug md:leading-relaxed">
      <li>
        <span className="font-medium">I’m sorry.&nbsp;</span>  
         Maine fake ID use ki. Darr tha mujhe kii tumne face se tou frndship nii kii but i was wrong. You were pure hearted, Tume hurt karna kabhi intention nahi tha.
      </li>

      <li>
        <span className="font-medium">BCZ of me I miss the real you.</span>  
        Tumhare awws, explanations, aur jo emotions tum share karti thi—unhe khud se door kar diya maine apne jhooth se.  
        <Divider />
        <AudioPlayer src="/aww.mp3" label="Your cute 'aww' 💛" />
        <AudioPlayer src="/explanation.mp3" label="Your sweet explanations 🎧" />
      </li>

      <li>
        <span className="font-medium">I promise honesty & respectfully.</span>  
        Vo bohot badi glti thi maine tume imp nhi smjha btana m chtya tha kuki, bas real me jo hu wahi hu ab.
      </li>
    </ul>
  )
}
,
  {
    key: "note",
    title: "A small note for you ✍️ pls pura padhna ",
    content: (
      <>
        <p>
          Tum “failed as a friend” nahi ho naa kbhi hogi . Galti meri thi. Jo bhi confusion hua, woh mere fear ki wajah se hua. Tumhari kindness ke liye genuinely thankful hoon.
        </p>
        <p>
And haan tum apne dosto ko btaugi u will share it ik. aur vo seedha khenge block him ik. tumhe aur close krenege vo as a frnd ya jo bhi tumhara h but i dont think like that
</p>
        <Card>
          <p className="italic">
            "Agar iske baad tum mujhe maaf kr skti ho atleast one time. agar na bhi karna chaho baat , tou bas sad mat hona meri wajah se."
          </p>
        </Card>
        <Card>
          <p className="italic">
           and agr tum abhi bhi dost manti ho tou bas ek voice note mei mujhe full gali aur feelings ke sath reply krna aur nhi krna chahti tou then u have ur frnds the best one kick me out i dont want u to cry now...
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
    <div>
       <img
      src="/labubu.gif"
      alt="Animated background"
      className="absolute inset-0 w-full object-cover"
    />
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
         
        </motion.div>
       
      </AnimatePresence>
    </PageWrapper>
    </div>
  );
}



































































































