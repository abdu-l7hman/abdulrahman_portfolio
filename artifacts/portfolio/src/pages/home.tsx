import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ProjectGallery } from "@/components/project-gallery";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects, type Lang, type Project } from "@/data/content";
import galleries from "@/data/galleries.json";

const projectIds = ["ghanatk", "ysr", "calix", "taleeq", "arena", "benefit", "mobdi", "malazim"] as const;
const ventures = projectIds.map((id) => projects.find((project) => project.id === id)!);
const biography = {
  ar: [
    "أنا عبدالرحمن ممدوح، طالب هندسة برمجيات متخصص في الذكاء الاصطناعي وعلم البيانات بجامعة الأمير سلطان. أجمع بين التفكير التقني وعقلية ريادة الأعمال لتحويل الأفكار إلى منتجات تعالج احتياجات حقيقية، من فهم المشكلة وبحث السوق إلى بناء الحل وتصميم نموذج العمل.",
    "تمتد مشاريعي إلى التقنية العقارية والصحية، وأنشطة الأطفال، والتعليم، وتجربة الجماهير في الملاعب. أستمتع ببناء حلول تجمع الذكاء الاصطناعي وتجربة المستخدم والقيمة التجارية، والعمل مع فرق متعددة التخصصات لنقل الفكرة من التصور إلى نموذج يمكن اختباره وتطويره.",
  ],
  en: [
    "I'm Abdulrhman Mamdoh, a Software Engineering student specializing in AI and Data Science at Prince Sultan University. I combine technical thinking with an entrepreneurial mindset to turn ideas into products that address real needs, from understanding the problem and researching the market to building the solution and shaping its business model.",
    "My projects span real estate technology, healthcare, children's activities, education and stadium experiences. I enjoy building solutions that connect artificial intelligence, user experience and business value, and collaborating with multidisciplinary teams to take an idea from a concept to a prototype that can be tested and developed.",
  ],
};

export default function Home() {
  const [lang, setLang] = useState<Lang>(() => {
    try { return localStorage.getItem("am-lang") === "en" ? "en" : "ar"; } catch { return "ar"; }
  });
  const [open, setOpen] = useState<Project | null>(null);
  const ar = lang === "ar";
  const name = ar ? "عبدالرحمن ممدوح" : "Abdulrhman Mamdoh";
  useEffect(() => {
    try { localStorage.setItem("am-lang", lang); } catch { /* Language still works without browser storage. */ }
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
    document.title = `${name} | ${ar ? "المشاريع الريادية" : "Entrepreneurial Projects"}`;
  }, [lang, ar, name]);

  return (
    <div className="portfolio-atmosphere min-h-screen overflow-x-clip">
      <header className="glass-header sticky top-0 z-50 border-b border-foreground/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#intro" className="flex items-center gap-3 text-[15px] font-medium tracking-tight"><span aria-hidden className="h-2 w-2 rounded-full bg-primary" />{name}</a>
          <div className="flex items-center gap-2">
          <ThemeToggle lang={lang} />
          <button onClick={() => setLang(ar ? "en" : "ar")} data-testid="button-lang"
            aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
            className="rounded-full border border-foreground/15 px-4 py-1.5 text-[13px] font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {ar ? "EN" : "عربي"}
          </button>
          </div>
        </div>
      </header>

      <main>
        <section id="intro" className="px-5 pb-20 pt-20 md:px-10 md:pb-28 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <h1 className="rise font-display text-[clamp(3.2rem,9vw,7.5rem)] leading-[1.02]">{name}<span className="text-primary">.</span></h1>
            <div className="rule rise mt-12 md:mt-16" style={{ animationDelay: "120ms" }} />
            <div className="rise mt-10 grid gap-6 text-[1.05rem] leading-[1.85] text-foreground/75 md:grid-cols-2 md:gap-14 md:text-lg" style={{ animationDelay: "220ms" }}>
              {biography[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section id="work" className="border-t border-foreground/10 px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-6 border-b border-foreground/12 pb-6">
              <h2 className="font-display text-4xl md:text-6xl">{ar ? "المشاريع الريادية" : "Entrepreneurial projects"}</h2>
              <span className="font-mono-x pb-2 text-xs text-foreground/45">{String(ventures.length).padStart(2, "0")}</span>
            </div>
            <div className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ventures.map((project, i) => (
                <article key={project.id} data-testid={`card-project-${project.id}`}
                  className="glass-panel card-lift flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-card-border">
                  <ProjectGallery images={galleries[project.id as keyof typeof galleries]} name={project.name[lang]} lang={lang} onExpand={() => setOpen(project)} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display min-w-0 text-[1.6rem] leading-tight [overflow-wrap:anywhere]">{project.name[lang]}</h3>
                      <span className="font-mono-x text-xs text-foreground/45">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-2 text-[13px] font-medium tracking-wide text-primary">{project.tag[lang]}</p>
                    <p className="mt-4 text-[15px] leading-[1.75] text-foreground/70">{project.summary[lang]}</p>
                    <div className="flex-1" aria-hidden="true" />
                    <button onClick={() => setOpen(project)} className="group mt-7 inline-flex self-start items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                      {ar ? "استكشف المشروع" : "Explore project"}<ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Dialog.Root open={!!open} onOpenChange={(isOpen) => !isOpen && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-[hsl(222_47%_10%/.72)] backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
          <Dialog.Content dir={ar ? "rtl" : "ltr"} className="glass-modal fixed inset-x-3 bottom-3 top-3 z-[90] mx-auto max-w-5xl overflow-y-auto rounded-2xl border border-foreground/10 shadow-[0_30px_80px_-30px_hsl(222_47%_8%/.5)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-bottom-4 duration-300 md:inset-x-6 md:top-8 md:bottom-8">
            {open && (
              <>
                <div className="glass-header sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-foreground/10 px-5 py-4 md:px-8">
                  <Dialog.Title className="font-display text-3xl">{open.name[lang]}</Dialog.Title>
                  <Dialog.Close aria-label={ar ? "إغلاق" : "Close"} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-foreground/15 transition-colors hover:bg-foreground hover:text-background"><X size={20} /></Dialog.Close>
                </div>
                <ProjectGallery key={open.id} images={galleries[open.id as keyof typeof galleries]} name={open.name[lang]} lang={lang} expanded />
                <div className="p-6 md:p-10">
                  <p className="eyebrow !text-primary">{open.role[lang]} · {open.status[lang]}</p>
                  <Dialog.Description className="mt-5 max-w-3xl text-lg leading-[1.8] text-foreground/80">{open.summary[lang]}</Dialog.Description>
                  <ul className="mt-7 max-w-3xl space-y-3.5">
                    {open.details.map((detail) => <li key={detail.en} className="flex gap-3"><span aria-hidden className="mt-[0.7rem] h-px w-4 shrink-0 bg-primary" /><span className="leading-relaxed text-foreground/75">{detail[lang]}</span></li>)}
                  </ul>
                  {(open.files || open.url) && <div className="mt-9 flex flex-wrap gap-3 border-t border-foreground/10 pt-7">
                    {open.files?.map((file) => <a key={file.href} href={file.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary"><FileText size={17} />{file.label[lang]}</a>)}
                    {open.url && <a href={open.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground">{ar ? "زيارة المشروع" : "Visit project"}<ArrowUpRight size={17} /></a>}
                  </div>}
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
