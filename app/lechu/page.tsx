import type { Metadata } from "next";

// Unlisted page: not in the nav, the sitemap or search results.
export const metadata: Metadata = {
  title: "lechu",
  robots: { index: false, follow: false },
};

type Source = {
  title: string;
  find: string[];
  describe: string;
  interpret: string[];
  limit: string[];
};

const SOURCES: Source[] = [
  {
    title: "Vaping prevalence",
    find: [
      "29.9% ever vaped, 15.7% vaped in past month (2022-23).",
      "Past-month vaping rose from 2.2% (2017) to 10.6% for 12-15 year olds, and from 3.0% to 17.4% for 16-17 year olds.",
    ],
    describe: "Vaping among Aus secondary students rose sharply from 2017 to 2022-23. Older students vape more.",
    interpret: [
      "Vaping is now common, not rare, so it's a big issue for young people's physical health (lungs, nicotine).",
      "Older teens have more access and peer exposure (social).",
    ],
    limit: [
      "Self-reported survey, so students may under- or over-report.",
      "\"Ever vaped\" doesn't mean they still vape.",
      "Past-month use doesn't mean regular use or addiction.",
      "Doesn't explain why rates rose.",
    ],
  },
  {
    title: "Health effects",
    find: [
      "Vapes can expose young people to toxic chemicals, may damage lungs, contain addictive nicotine, affect developing brains.",
      "Withdrawal symptoms exist.",
    ],
    describe: "Lists physical and mental health risks of vaping for young people.",
    interpret: [
      "Physical: lung damage, shortness of breath, worse sport performance.",
      "Mental/emotional: nicotine addiction, withdrawal (irritability, anxiety), brain development affecting learning and concentration.",
    ],
    limit: [
      "Uses \"can\" and \"may\", so not every person who vapes will get these harms.",
      "No statistics on how often harms happen.",
      "Long-term effects are still being researched.",
    ],
  },
  {
    title: "Why young people vape",
    find: [
      "Reasons: fitting in, socialising, managing stress/anxiety, experimenting/rebelling, taste/fun.",
      "WA study of 92 teens: sharing vapes was a key influence; first use often at parties, school bathrooms, with friends.",
    ],
    describe: "Vaping is driven mainly by social and emotional factors.",
    interpret: [
      "Social health: peer pressure and wanting to belong.",
      "Mental health: using vapes to cope with stress, which can lead to dependence.",
      "Explains why prevention needs to address peers and coping skills, not just facts.",
    ],
    limit: [
      "WA study is small (92 teens) and from one state, so can't generalise to all Aus teens.",
      "Not everyone vapes for the same reason.",
      "Reasons are self-reported.",
    ],
  },
  {
    title: "School responses",
    find: [
      "Vic Dept of Education advises wellbeing and non-punitive responses before discipline, exploring why a student vapes, contacting parents, quitting support.",
      "Suspension is a serious measure; alternatives must be considered.",
    ],
    describe: "Schools should support students first and punish only for complex or repeated incidents.",
    interpret: [
      "Matches Source 3: if students vape because of stress or peer pressure, punishment alone doesn't fix the cause.",
      "Support helps mental and social health and connects to Source 6 (quitting support).",
    ],
    limit: [
      "It's guidance/policy, not research evidence that it works.",
      "Only applies to Victorian government schools.",
      "Doesn't show results.",
    ],
  },
  {
    title: "School vaping education (OurFutures)",
    find: [
      "RCT, 40 schools, 5,157 Year 7-8 students.",
      "Four online lessons led to 65% lower odds of past-12-month vaping after one year (odds ratio 0.35).",
      "Higher knowledge about vaping and tobacco.",
    ],
    describe: "A short school program reduced vaping compared with usual health education.",
    interpret: [
      "Education in Year 7-8 can prevent vaping before it starts, protecting physical health and avoiding addiction.",
      "Strong evidence because it was randomised and large.",
    ],
    limit: [
      "\"65% lower odds\" is not the same as \"65% fewer students vape\".",
      "Only followed for one year, so long-term effect unknown.",
      "Self-reported vaping.",
      "Shows prevention, not quitting.",
    ],
  },
  {
    title: "Quitting support (text message program)",
    find: [
      "RCT, 1,503 adolescents aged 13-17 who wanted to quit.",
      "After 7 months, 37.8% of program group hadn't vaped in 30 days vs 28.0% of control (about 10 percentage points higher).",
    ],
    describe: "Text message support helped more teens quit than no program.",
    interpret: [
      "Support helps with nicotine addiction and withdrawal (Source 2), improving physical and mental health.",
      "Backs up Source 4's recommendation to give quitting support.",
    ],
    limit: [
      "Only teens who wanted to quit, so may not work for others.",
      "Most of the program group (about 62%) were still vaping.",
      "30 days without vaping isn't permanent quitting.",
      "Self-reported.",
      "Study was US-based (Graham et al., JAMA), not Australian, so results may differ here.",
    ],
  },
];

const ROWS: { key: keyof Omit<Source, "title">; label: string }[] = [
  { key: "find", label: "Find" },
  { key: "describe", label: "Describe" },
  { key: "interpret", label: "Interpret + health link" },
  { key: "limit", label: "Limit" },
];

export default function Lechu() {
  return (
    <article className="max-w-3xl pt-14 sm:pt-20">
      <p className="font-mono text-xs text-low">
        <span className="text-mid">$</span> cat lechu.md
      </p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight">Vaping: notes on all six sources</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-mid">
        Note form only, since the sheet says no prepared paragraphs. The back of the sheet likely has rows for 4 to 6.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {SOURCES.map((s, i) => (
          <section key={s.title} className="rounded-lg border border-line bg-raised p-5">
            <h2 className="flex items-baseline gap-3 text-[15px] font-medium tracking-tight">
              <span className="font-mono text-[11px] text-low">SOURCE {i + 1}</span>
              {s.title}
            </h2>
            <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-[10rem_1fr]">
              {ROWS.map(({ key, label }) => {
                const v = s[key];
                return (
                  <div key={key} className="contents">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-low sm:pt-0.5">{label}</dt>
                    <dd className="text-sm leading-relaxed text-mid">
                      {Array.isArray(v) ? (
                        <ul className="flex flex-col gap-1.5">
                          {v.map((t) => (
                            <li key={t} className="relative pl-4">
                              <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2 bg-low" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
      </div>

      <section className="mt-10 border-t border-line pt-6">
        <h2 className="text-sm font-medium">Possible links for the unseen prompt</h2>
        <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-mid">
          <li>Sources 1 + 2 show the problem.</li>
          <li>Source 3 explains the causes.</li>
          <li>Sources 4 + 5 + 6 show responses (prevention, support over punishment, quitting help).</li>
        </ul>
      </section>
    </article>
  );
}
