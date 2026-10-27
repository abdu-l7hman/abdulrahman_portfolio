import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Mail, Copy, Check, FileText, Github, Linkedin, X, Menu } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { projects, moments, experience, awards, skills, t, links, asset, type Lang, type L, type Cat, type Project } from "@/data/content";

const KEY = "am-lang";

function useLang() {
  const [lang, setLang] = useState<Lang>(() => (typeof localStorage !== "undefined" && localStorage.getItem(KEY) === "en" ? "en" : "ar"));
  useEffect(() => {
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = lang === "ar" ? "عبدالرحمن ممدوح | ملف الأعمال" : "Abdulrhman Mamdoh | Portfolio";
  }, [lang]);
  return [lang, setLang] as const;
}

function Cover({ p, lang, className = "" }: { p: Project; lang: Lang; className?: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `hsl(${p.hue})` }}>
      {p.image && !err ? (
        <img src={asset(p.image)} alt={p.name[lang]} loading="lazy" onError={() => setErr(true)} className={`h-full w-full object-cover ${p.shot ? "object-top" : ""} transition-transform duration-700 group-hover:scale-[1.04]`} />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(38 40% 97% / .5) 0 1px, transparent 1px 14px)" }} />
          <span className="font-display relative px-6 text-center text-4xl font-extrabold text-[hsl(38_40%_97%)] md:text-5xl">{p.name[lang]}</span>
        </div>
      )}
    </div>
  );
}

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [lang, setLang] = useLang();
  const tr = (x: L) => x[lang];
  const [cat, setCat] = useState<"all" | Cat>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState(false);
  const reduce = useReducedMotion();
  const list = useMemo(() => (cat === "all" ? projects : projects.filter((p) => p.cat.includes(cat))), [cat]);
  const navItems = (["intro", "work", "exp", "awards", "contact"] as const);
  const count = (c: "all" | Cat) => (c === "all" ? projects.length : projects.filter((p) => p.cat.includes(c)).length);

  const copy = async () => {
    try { await navigator.clipboard.writeText(links.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${links.email}`; }
  };

  const LangBtn = (
    <button data-testid="button-lang" onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className="font-mono-x rounded-full border border-foreground/20 px-3 py-1.5 text-xs font-semibold transition hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-primary">
      {lang === "ar" ? "EN" : "عربي"}
    </button>
  );

  return (
    <div className="min-h-[100dvh] overflow-x-clip">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[70] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">{lang === "ar" ? "تخطَّ إلى المشاريع" : "Skip to work"}</a>

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-foreground/10 bg-background/80 px-4 py-2 backdrop-blur-md md:px-6 mx-3 md:mx-auto">
          <a href="#intro" data-testid="link-home" className="flex items-center gap-2 font-display text-lg font-extrabold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm text-primary-foreground">{lang === "ar" ? "ع" : "A"}</span>
            <span className="hidden sm:inline">{tr(t.name)}</span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((k) => (
              <a key={k} href={`#${k}`} data-testid={`link-nav-${k}`} className="rounded-full px-3 py-1.5 text-sm text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground">{tr(t.nav[k])}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {LangBtn}
            <a href={links.cv} download data-testid="link-cv-nav" className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-background transition hover:bg-primary sm:flex"><Download className="h-3.5 w-3.5" />CV</a>
            <button className="md:hidden p-1.5" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)} data-testid="button-menu">{menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mx-3 mt-2 rounded-3xl border border-foreground/10 bg-background p-3 md:hidden">
              {navItems.map((k) => (
                <a key={k} href={`#${k}`} onClick={() => setMenu(false)} className="font-display block rounded-2xl px-4 py-3 text-2xl font-bold hover:bg-muted">{tr(t.nav[k])}</a>
              ))}
              <a href={links.cv} download className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground"><Download className="h-4 w-4" />{tr(t.cv)}</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* INTRO */}
        <section id="intro" className="grid-lines relative flex min-h-[100dvh] items-end px-5 pb-14 pt-32 md:px-10">
          <div aria-hidden className="pointer-events-none absolute -end-40 top-16 h-[34rem] w-[34rem] rounded-full border-[1px] border-dashed border-primary/40 spin-slow" />
          <div aria-hidden className="pointer-events-none absolute -end-16 top-40 h-72 w-72 rounded-full bg-primary/10 mix-blend-multiply md:h-96 md:w-96 md:bg-primary/90" />
          <div className="relative mx-auto w-full max-w-6xl">
            <motion.p key={lang + "h"} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="font-mono-x mb-6 inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1 text-xs text-background">
              <span className="h-2 w-2 rounded-full bg-primary" />{tr(t.hello)} · {tr(t.based)}
            </motion.p>
            <h1 className="font-display text-[clamp(3rem,11vw,9.5rem)] font-extrabold leading-[0.92] tracking-tight">
              {[t.hero1, t.hero2, t.hero3].map((x, i) => (
                <motion.span key={lang + i} className={`block ${i === 1 ? "text-primary" : ""} ${i === 2 ? "italic font-semibold text-foreground/80" : ""}`}
                  initial={reduce ? false : { opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>
                  {tr(x)}
                </motion.span>
              ))}
            </h1>
            <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl" data-testid="text-intro">{tr(t.intro)}</motion.p>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href="#work" data-testid="link-see-work" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:-translate-y-0.5">{tr(t.seeWork)}<ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45 rtl:-scale-x-100" /></a>
                <a href={links.cv} download data-testid="link-cv-hero" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3 font-semibold transition hover:bg-foreground hover:text-background"><Download className="h-4 w-4" />{tr(t.cv)}</a>
              </div>
            </div>
          </div>
        </section>

        {/* STATS + MARQUEE */}
        <section aria-label="Highlights" className="bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
            {t.stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.06} className="border-background/15 p-6 md:p-8 [&:not(:last-child)]:border-e">
                <div className="font-display text-4xl font-extrabold text-primary md:text-5xl" dir="ltr">{s.v}</div>
                <div className="mt-1 text-sm text-background/70">{tr(s.l)}</div>
              </Reveal>
            ))}
          </div>
          <div className="overflow-hidden border-t border-background/15 py-4" aria-hidden>
            <div className="marquee flex w-max gap-10 whitespace-nowrap font-mono-x text-sm uppercase tracking-widest text-background/60" dir="ltr">
              {Array.from({ length: 2 }).flatMap((_, k) => ["Python", "LLMs", "RAG", "AWS Bedrock", "Core ML", "Swift", "Quantum ML", "NLP", "Feasibility", "Product", "Agile", "SQL", "Figma"].map((w) => <span key={k + w}>{w} <span className="text-primary">/</span></span>))}
            </div>
          </div>
        </section>

        {/* EDUCATION strip */}
        <section className="px-5 py-16 md:px-10">
          <Reveal className="mx-auto flex max-w-6xl flex-col justify-between gap-6 border-y-2 border-foreground py-8 md:flex-row md:items-center">
            <div>
              <p className="font-mono-x text-xs uppercase tracking-widest text-primary">{tr(t.degreeWhen)}</p>
              <p className="font-display mt-2 text-2xl font-bold md:text-3xl">{tr(t.degree)}</p>
              <p className="text-foreground/70">{lang === "ar" ? "تخصص الذكاء الاصطناعي وعلم البيانات" : "AI & Data Science track"}</p>
            </div>
            <div className="flex items-baseline gap-2"><span className="font-display text-6xl font-extrabold" dir="ltr">3.87</span><span className="text-foreground/60">/ 4 {tr(t.gpa)}</span></div>
          </Reveal>
        </section>

        {/* WORK */}
        <section id="work" className="px-5 py-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono-x text-xs uppercase tracking-widest text-primary">01 — {tr(t.nav.work)}</p>
                <h2 className="font-display mt-2 text-5xl font-extrabold md:text-7xl">{tr(t.workTitle)}</h2>
                <p className="mt-3 max-w-md text-foreground/70">{tr(t.workSub)}</p>
              </div>
              <div role="tablist" aria-label="Filter" className="flex flex-wrap gap-2">
                {(["all", "ai", "venture", "research", "product"] as const).map((c) => (
                  <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} data-testid={`button-filter-${c}`}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === c ? "border-foreground bg-foreground text-background" : "border-foreground/20 hover:border-foreground"}`}>
                    {tr(t.cats[c])} <span className="font-mono-x text-xs opacity-60">{count(c)}</span>
                  </button>
                ))}
              </div>
            </Reveal>

            <motion.div layout className="mt-12 grid gap-5 md:grid-cols-6">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => {
                  const big = i % 5 === 0;
                  return (
                    <motion.button layout key={p.id} initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}
                      onClick={() => setOpen(p)} data-testid={`card-project-${p.id}`}
                      className={`group flex flex-col overflow-hidden rounded-[1.75rem] border border-card-border bg-card text-start transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_hsl(var(--foreground)/.35)] focus-visible:outline-2 focus-visible:outline-primary ${big ? "md:col-span-4" : "md:col-span-2"} ${i % 5 === 1 ? "md:col-span-2" : ""}`}>
                      <Cover p={p} lang={lang} className={big ? "aspect-[16/9]" : "aspect-[4/3]"} />
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-x text-[11px] uppercase tracking-wider text-foreground/60">{tr(p.tag)}</span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-primary transition group-hover:rotate-45 rtl:-scale-x-100" />
                        </div>
                        <h3 className="font-display text-2xl font-bold">{tr(p.name)}</h3>
                        <p className="line-clamp-2 text-sm text-foreground/70">{tr(p.summary)}</p>
                        <span className="mt-auto pt-2 text-xs font-semibold" style={{ color: `hsl(${p.hue})` }}>{tr(p.status)}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="exp" className="bg-secondary px-5 py-24 text-secondary-foreground md:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="font-mono-x text-xs uppercase tracking-widest text-primary">02 — {tr(t.nav.exp)}</p>
              <h2 className="font-display mt-2 text-5xl font-extrabold md:text-7xl">{tr(t.expTitle)}</h2>
            </Reveal>
            <ol className="mt-12">
              {experience.map((e, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <li className="group grid gap-3 border-t border-background/15 py-7 md:grid-cols-[180px_1fr_1.4fr] md:gap-8">
                    <span className="font-mono-x text-sm text-background/60">{tr(e.when)}</span>
                    <div>
                      <h3 className="font-display text-2xl font-bold transition group-hover:text-primary">{tr(e.org)}</h3>
                      <p className="text-background/70">{tr(e.role)}</p>
                    </div>
                    <p className="leading-relaxed text-background/80">{tr(e.text)}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* AWARDS + SKILLS */}
        <section id="awards" className="px-5 py-24 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.3fr_1fr]">
            <div>
              <Reveal>
                <p className="font-mono-x text-xs uppercase tracking-widest text-primary">03 — {tr(t.nav.awards)}</p>
                <h2 className="font-display mt-2 text-5xl font-extrabold">{tr(t.awardsTitle)}</h2>
              </Reveal>
              <div className="mt-10 space-y-4">
                {awards.map((a, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="flex items-center gap-5 rounded-3xl border border-card-border bg-card p-5" data-testid={`card-award-${i}`}>
                      <span className="font-display min-w-[5.5rem] text-3xl font-extrabold text-primary" dir="ltr">{a.k}</span>
                      <div><p className="font-bold">{tr(a.t)}</p><p className="text-sm text-foreground/70">{tr(a.d)}</p></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <Reveal><h2 className="font-display text-5xl font-extrabold">{tr(t.skillsTitle)}</h2></Reveal>
              <div className="mt-10 space-y-8">
                {skills.map((s, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="font-mono-x mb-3 text-xs uppercase tracking-widest text-accent">{tr(s.g)}</p>
                    <div className="flex flex-wrap gap-2">{s.i.map((x) => <span key={x} dir="ltr" className="rounded-full border border-foreground/20 px-3 py-1.5 text-sm transition hover:border-primary hover:bg-primary hover:text-primary-foreground">{x}</span>)}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MOMENTS */}
        <section aria-label="Moments" className="px-5 pb-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal><h2 className="font-display text-4xl font-extrabold md:text-5xl">{lang === "ar" ? "لحظات من الطريق" : "Moments along the way"}</h2></Reveal>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {moments.map((m, i) => (
                <Reveal key={m.src} delay={i * 0.05} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                  <figure className="group h-full overflow-hidden rounded-3xl bg-muted">
                    <img src={asset(m.src)} alt={tr(m.c)} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i === 0 ? "aspect-[4/3] md:h-full" : "aspect-square"}`} />
                    <figcaption className="p-3 text-sm text-foreground/70">{tr(m.c)}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative overflow-hidden bg-primary px-5 py-24 text-primary-foreground md:px-10 md:py-32">
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -start-40 h-[30rem] w-[30rem] rounded-full border-[40px] border-primary-foreground/10" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal>
              <p className="font-mono-x text-xs uppercase tracking-widest opacity-80">04 — {tr(t.nav.contact)}</p>
              <h2 className="font-display mt-3 max-w-4xl text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.95]">{tr(t.contactTitle)}</h2>
              <p className="mt-6 max-w-xl text-lg opacity-90">{tr(t.contactSub)}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-3">
              <a href={`mailto:${links.email}`} data-testid="link-email" className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 font-semibold text-secondary-foreground transition hover:-translate-y-0.5"><Mail className="h-4 w-4" /><span dir="ltr">{links.email}</span></a>
              <button onClick={copy} data-testid="button-copy-email" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/70 px-5 py-3 font-semibold transition hover:bg-primary-foreground hover:text-primary">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? tr(t.copied) : tr(t.copy)}</button>
              <a href={links.linkedin} target="_blank" rel="noreferrer" data-testid="link-linkedin" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/70 px-5 py-3 font-semibold transition hover:bg-primary-foreground hover:text-primary"><Linkedin className="h-4 w-4" />LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer" data-testid="link-github" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/70 px-5 py-3 font-semibold transition hover:bg-primary-foreground hover:text-primary"><Github className="h-4 w-4" />GitHub</a>
              <a href={links.cv} download data-testid="link-cv-contact" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/70 px-5 py-3 font-semibold transition hover:bg-primary-foreground hover:text-primary"><Download className="h-4 w-4" />{tr(t.cv)}</a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-secondary px-5 py-8 text-sm text-secondary-foreground/70 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 md:flex-row">
          <span>{tr(t.name)} · {tr(t.based)}</span>
          <span className="font-mono-x" dir="ltr">© {new Date().getFullYear()}</span>
        </div>
      </footer>

      {/* DIALOG */}
      <DialogPrimitive.Root open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-secondary/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content dir={lang === "ar" ? "rtl" : "ltr"} className="fixed inset-x-3 bottom-3 top-12 z-[90] mx-auto max-w-3xl overflow-y-auto rounded-[2rem] bg-background shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-8 md:inset-x-6 md:top-16 md:bottom-auto md:max-h-[85dvh]">
            {open && (
              <>
                <Cover p={open} lang={lang} className="aspect-[16/8]" />
                <DialogPrimitive.Close data-testid="button-close-dialog" aria-label={lang === "ar" ? "إغلاق" : "Close"} className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 transition hover:bg-primary hover:text-primary-foreground"><X className="h-5 w-5" /></DialogPrimitive.Close>
                <div className="p-6 md:p-10">
                  <p className="font-mono-x text-xs uppercase tracking-widest" style={{ color: `hsl(${open.hue})` }}>{tr(open.tag)}</p>
                  <DialogPrimitive.Title className="font-display mt-2 text-4xl font-extrabold md:text-5xl">{tr(open.name)}</DialogPrimitive.Title>
                  <p className="mt-1 font-semibold text-foreground/70">{tr(open.role)} · {tr(open.status)}</p>
                  <DialogPrimitive.Description className="mt-6 text-lg leading-relaxed">{tr(open.summary)}</DialogPrimitive.Description>
                  <ul className="mt-6 space-y-3">
                    {open.details.map((d, i) => <li key={i} className="flex gap-3"><span className="mt-2.5 h-1.5 w-4 shrink-0 rounded-full bg-primary" /><span className="text-foreground/80">{tr(d)}</span></li>)}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">{open.stack.map((s) => <span key={s} dir="ltr" className="font-mono-x rounded-full bg-muted px-3 py-1 text-xs">{s}</span>)}</div>
                  {open.gallery && <div className="mt-8 grid grid-cols-3 gap-3">{open.gallery.map((g) => <img key={g} src={asset(g)} alt={tr(open.name)} loading="lazy" className="aspect-[9/16] w-full rounded-2xl border border-border object-cover object-top" />)}</div>}
                  <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
                    {open.files?.map((f) => (
                      <a key={f.href} href={f.href} target="_blank" rel="noreferrer" data-testid={`link-file-${open.id}`} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-semibold text-background transition hover:bg-primary"><FileText className="h-4 w-4" />{tr(f.label)}</a>
                    ))}
                    {open.url && <a href={open.url} target="_blank" rel="noreferrer" data-testid={`link-visit-${open.id}`} className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2.5 font-semibold transition hover:bg-foreground hover:text-background">{tr(t.visit)}<ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" /></a>}
                    {!open.files && !open.url && <p className="text-sm text-foreground/60">{tr(t.noFiles)}</p>}
                  </div>
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
