import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ProjectGallery } from "@/components/project-gallery";
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
    <div className="min-h-screen overflow-x-clip">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-0">
          <a href="#intro" className="font-display text-lg font-bold">{name}</a>
          <button onClick={() => setLang(ar ? "en" : "ar")} data-testid="button-lang"
            aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
            className="rounded-full border border-foreground/20 px-5 py-2 text-sm font-semibold transition hover:bg-foreground hover:text-background">
            {ar ? "EN" : "عربي"}
          </button>
        </div>
      </header>

      <main>
        <section id="intro" className="grid-lines border-b border-foreground/10 px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-extrabold leading-tight tracking-tight">{name}<span className="text-primary">.</span></h1>
            <div className="mt-8 grid max-w-5xl gap-5 text-lg leading-[1.95] text-foreground/80 md:gap-6 md:text-xl">
              {biography[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section id="work" className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-4xl font-extrabold md:text-6xl">{ar ? "المشاريع الريادية" : "Entrepreneurial projects"}</h2>
            <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
              {ventures.map((project, i) => (
                <article key={project.id} data-testid={`card-project-${project.id}`}
                  className="overflow-hidden rounded-[1.75rem] border border-card-border bg-card">
                  <ProjectGallery images={galleries[project.id as keyof typeof galleries]} name={project.name[lang]} lang={lang} onExpand={() => setOpen(project)} />
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-3xl font-bold">{project.name[lang]}</h3>
                      <span className="font-mono-x text-xs text-foreground/45">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-primary">{project.tag[lang]}</p>
                    <p className="mt-4 leading-relaxed text-foreground/75">{project.summary[lang]}</p>
                    <button onClick={() => setOpen(project)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-semibold transition hover:bg-foreground hover:text-background">
                      {ar ? "استكشف المشروع" : "Explore project"}<ArrowUpRight size={16} className="rtl:-scale-x-100" />
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
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-foreground/75 backdrop-blur-sm" />
          <Dialog.Content dir={ar ? "rtl" : "ltr"} className="fixed inset-x-3 bottom-3 top-3 z-[90] mx-auto max-w-5xl overflow-y-auto rounded-3xl bg-background shadow-2xl outline-none md:inset-x-6 md:top-8 md:bottom-8">
            {open && (
              <>
                <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
                  <Dialog.Title className="font-display text-2xl font-bold">{open.name[lang]}</Dialog.Title>
                  <Dialog.Close aria-label={ar ? "إغلاق" : "Close"} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-foreground/20 hover:bg-muted"><X size={20} /></Dialog.Close>
                </div>
                <ProjectGallery key={open.id} images={galleries[open.id as keyof typeof galleries]} name={open.name[lang]} lang={lang} expanded />
                <div className="p-6 md:p-8">
                  <p className="text-sm font-semibold text-primary">{open.role[lang]} · {open.status[lang]}</p>
                  <Dialog.Description className="mt-4 text-lg leading-relaxed text-foreground/80">{open.summary[lang]}</Dialog.Description>
                  <ul className="mt-5 space-y-3">
                    {open.details.map((detail) => <li key={detail.en} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /><span className="leading-relaxed text-foreground/75">{detail[lang]}</span></li>)}
                  </ul>
                  {(open.files || open.url) && <div className="mt-7 flex flex-wrap gap-3 border-t border-foreground/10 pt-6">
                    {open.files?.map((file) => <a key={file.href} href={file.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-semibold text-background hover:bg-primary"><FileText size={17} />{file.label[lang]}</a>)}
                    {open.url && <a href={open.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 font-semibold hover:bg-muted">{ar ? "زيارة المشروع" : "Visit project"}<ArrowUpRight size={17} /></a>}
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
