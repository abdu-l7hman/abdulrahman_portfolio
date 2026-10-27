export type Lang = "ar" | "en";
export type L = { ar: string; en: string };
export type Cat = "ai" | "venture" | "research" | "product";

export const BASE = import.meta.env.BASE_URL;
export const asset = (p: string) => `${BASE}${p}`;

export const links = {
  email: "abdulrhmanstd@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdulrhman-mokhaniq",
  github: "https://github.com/abdu-l7hman",
  cv: asset("files/abdulrhman-resume.pdf"),
};

export interface Project {
  id: string;
  cat: Cat[];
  name: L;
  role: L;
  tag: L;
  summary: L;
  details: L[];
  stack: string[];
  status: L;
  image?: string;
  files?: { label: L; href: string }[];
  url?: string;
  hue: string;
  gallery?: string[];
  shot?: boolean;
}

const pdf = (f: string) => ({ label: { ar: "عرض الملف PDF", en: "Open PDF" }, href: asset(`files/${f}`) });

export const projects: Project[] = [
  {
    id: "ghanatk", cat: ["venture", "ai"], hue: "11 86% 50%",
    name: { ar: "غناتك", en: "Ghanatk" },
    role: { ar: "شريك مؤسس ومدير تقني", en: "Co-founder & CTO" },
    tag: { ar: "وساطة عقارية بالذكاء الاصطناعي", en: "AI real-estate brokerage" },
    status: { ar: "نموذج أولي وعرض استثماري", en: "Prototype & business pitch" },
    summary: { ar: "منصة وساطة عقارية تؤتمت التقاط العملاء المحتملين وتأهيلهم ومطابقتهم مع العقارات المناسبة.", en: "A brokerage concept that automates lead capture, lead qualification and property matching end to end." },
    details: [
      { ar: "تصميم مسار آلي يلتقط الطلبات ويؤهلها ويطابقها مع العقارات.", en: "Designed an automated flow that captures, qualifies and matches inbound leads to listings." },
      { ar: "قيادة الجانب التقني ضمن فريق التأسيس.", en: "Led the technical side within the founding team." },
      { ar: "الأرقام الواردة في العرض أهداف متوقعة وليست نتائج محققة.", en: "Figures in the pitch are projected goals, not achieved outcomes." },
    ],
    stack: ["LLM", "Automation", "Lead scoring", "Product"],
    image: "images/ghanatk.jpg", files: [pdf("ghanatk.pdf")],
  },
  {
    id: "ysr", cat: ["venture", "product"], hue: "42 90% 45%",
    name: { ar: "يسر", en: "YSR" },
    role: { ar: "مفهوم منصة وعرض استثماري", en: "Marketplace concept & pitch deck" },
    tag: { ar: "سوق أنشطة الأطفال", en: "Kids' activities marketplace" },
    status: { ar: "مفهوم - مدعوم باستبيان 32 وليًّا", en: "Concept - validated with 32 parent responses" },
    summary: { ar: "سوق رقمي يساعد الأسر على اكتشاف أنشطة الأطفال (7-13 سنة) ومقارنتها وحجزها، مع سوق لمقدمي الأنشطة، يبدأ من الرياض.", en: "A marketplace helping families discover, compare and book activities for children aged 7-13, with a provider-side marketplace, starting in Riyadh." },
    details: [
      { ar: "استبيان شمل 32 وليّ أمر: 100% رأوا الحجز الموحد مفيدًا على الأقل، و50% مفيدًا جدًا.", en: "Survey of 32 parents: 100% found unified booking at least useful; 50% extremely useful." },
      { ar: "سوق للأسر ومقدمي الأنشطة في منصة واحدة.", en: "Two-sided: families and activity providers in one platform." },
      { ar: "خارطة الطريق والأرقام المالية توقعات توضيحية، وليست نتائج محققة.", en: "Roadmap and financials are illustrative projections, not realized traction." },
    ],
    stack: ["Marketplace", "Customer discovery", "Business model"],
    files: [{ label: { ar: "تحميل العرض PPTX", en: "Download PPTX" }, href: asset("files/ysr.pptx") }],
  },
  {
    id: "calix", cat: ["ai", "venture"], hue: "172 62% 30%",
    name: { ar: "كاليكس", en: "C.A.L.I.X" },
    role: { ar: "مشروع فائز في هاكاثون", en: "Hackathon-winning project" },
    tag: { ar: "مساعد سريري بتقنية RAG", en: "Clinical RAG assistant" },
    status: { ar: "ضمن أفضل 10 مشاريع فائزة في إنجاز سدايا", en: "Top 10 winning projects, SDAIA Enjaz" },
    summary: { ar: "مساعد سريري يعتمد الاسترجاع المعزز بالتوليد لأتمتة التوثيق الطبي مع مفهوم للتكامل مع السجلات الصحية الإلكترونية.", en: "A retrieval-augmented clinical assistant for automated documentation, with an EHR-integration concept." },
    details: [
      { ar: "اختير ضمن أفضل 10 مشاريع فائزة من أكثر من 90 ابتكارًا في هاكاثون إنجاز من سدايا.", en: "Selected among the top 10 winning projects from 90+ innovations at SDAIA's Enjaz hackathon." },
      { ar: "الجائزة المعلنة للمشاريع الفائزة: 150 ألف ريال.", en: "Award listed for winning projects: SAR 150K." },
      { ar: "التكامل مع السجلات الصحية مفهوم تصميمي.", en: "EHR integration is a design concept." },
    ],
    stack: ["RAG", "LLM", "Healthcare", "EHR"],
    image: "images/calix.jpg", files: [pdf("calix.pdf")],
  },
  {
    id: "taleeq", cat: ["ai", "product"], hue: "228 60% 45%",
    name: { ar: "طليق", en: "Taleeq" },
    role: { ar: "مطوّر iOS - أكاديمية Apple طويق", en: "iOS Developer - Apple x Tuwaiq" },
    tag: { ar: "تطبيق تدريب على النطق بالذكاء الاصطناعي", en: "AI speech-training iOS app" },
    status: { ar: "يوليو - أغسطس 2025", en: "Jul - Aug 2025" },
    summary: { ar: "تطبيق iOS لدعم الطلاقة في الكلام، مبني بنماذج Core ML مدربة على أكثر من 28,000 تسجيل صوتي.", en: "An iOS app supporting speech fluency, powered by Core ML models trained on 28,000+ speech recordings." },
    details: [
      { ar: "تدريب النماذج باستخدام Create ML وتشغيلها على الجهاز عبر Core ML.", en: "Trained models with Create ML and ran them on-device via Core ML." },
      { ar: "ساعد 30 مستخدمًا على تتبع طلاقتهم.", en: "Helped 30 users track their fluency." },
    ],
    stack: ["Swift", "SwiftUI", "Core ML", "Create ML"],
    image: "images/taleeq.jpg", files: [pdf("taleeq.pdf")],
  },
  {
    id: "arena", cat: ["ai", "venture"], hue: "350 70% 42%",
    name: { ar: "أرينا أوس", en: "Arena OS" },
    role: { ar: "مفهوم - Empowerthon 2030", en: "Concept - Empowerthon 2030" },
    tag: { ar: "ذكاء الملاعب الذكية", en: "Smart-stadium intelligence" },
    status: { ar: "مفهوم هاكاثون", en: "Hackathon concept" },
    summary: { ar: "نظام ذكي لإدارة الحشود والطوابير والتنقل داخل الملاعب.", en: "An intelligence layer for crowd flow, queues and wayfinding inside stadiums." },
    details: [
      { ar: "يغطي تدفق الحشود وأوقات الانتظار والتوجيه داخل الملعب.", en: "Covers crowd flow, queue times and in-venue navigation." },
      { ar: "نسب التحسين في العرض توقعات وليست نتائج محققة.", en: "Reductions shown in the deck are projections, not achieved results." },
    ],
    stack: ["Computer vision", "Forecasting", "IoT"],
    image: "images/arena-os.jpg", files: [pdf("arena-os.pdf")],
  },
  {
    id: "benefit", cat: ["venture"], hue: "95 45% 32%",
    name: { ar: "بنفت", en: "Benefit" },
    role: { ar: "مع عبدالملك الشنقيطي", en: "With Abdulmalik Alshanqity" },
    tag: { ar: "وجبات مدرسية صحية", en: "Healthy school meals" },
    status: { ar: "مفهوم مسابقة - المركز الرابع من 18 فريقًا", en: "Competition concept - 4th of 18 teams" },
    summary: { ar: "خطة عمل افتراضية لوجبات مدرسية صحية ضمن مسابقة خطط أعمال.", en: "A fictional business plan for healthy school meals, built for a business-plan competition." },
    details: [
      { ar: "المركز الرابع من 18 فريقًا من 8 جامعات.", en: "Placed 4th of 18 teams from 8 universities." },
      { ar: "نظمتها جامعة الأمير سلطان وبيتوين ومنشآت.", en: "Organized by PSU, Between and Monsha'at." },
      { ar: "مشروع مسابقة افتراضي، وليس شركة قائمة.", en: "A fictional competition concept, not an operating company." },
    ],
    stack: ["Business plan", "Financials", "Operations"],
    files: [pdf("benefit.pdf")],
  },
  {
    id: "mobdi", cat: ["product", "venture"], hue: "262 40% 42%",
    name: { ar: "مبدع", en: "Mobdi" },
    role: { ar: "منصة تعليمية", en: "Educational platform" },
    tag: { ar: "مواد ومراجعات وشرح طلابي", en: "Materials, revision, student explainers" },
    status: { ar: "منصة تعليمية", en: "Education platform" },
    summary: { ar: "منصة تعليمية تجمع المواد والمراجعات، وتستقطب طلابًا متميزين لتقديم الشروحات.", en: "An education platform for study materials and revision, recruiting student explainers to teach." },
    details: [
      { ar: "تنظيم المواد الدراسية ومحتوى المراجعة.", en: "Organized course materials and revision content." },
      { ar: "استقطاب طلاب شارحين لتقديم المحتوى.", en: "Recruited student explainers to deliver content." },
    ],
    stack: ["EdTech", "Community", "Content"],
    image: "images/mobdi.jpg", gallery: ["images/mobdi.jpg", "images/mobdi-goals.jpg", "images/mobdi-tutors.jpg"], shot: true,
  },
  {
    id: "malazim", cat: ["product", "venture"], hue: "28 75% 45%",
    name: { ar: "ملازم علّام", en: "Malazim Allam" },
    role: { ar: "متجر إلكتروني", en: "E-commerce store" },
    tag: { ar: "ملخصات تعليمية", en: "Educational summaries" },
    status: { ar: "متجر على سلة", en: "Live store on Salla" },
    summary: { ar: "متجر إلكتروني لبيع الملخصات التعليمية على منصة سلة.", en: "An online store selling educational study summaries, built on Salla." },
    details: [
      { ar: "إطلاق متجر للملخصات وتنظيم المنتجات.", en: "Launched a summaries store and organized its catalog." },
    ],
    stack: ["Salla", "E-commerce", "Content"],
    image: "images/malazim.jpg", shot: true, url: "https://salla.sa/malazim_allam",
  },
  {
    id: "reciter", cat: ["research", "ai"], hue: "172 62% 30%",
    name: { ar: "التعرف على القرّاء", en: "Reciter Identification" },
    role: { ar: "بحث", en: "Research" },
    tag: { ar: "تعلم عميق صوتي", en: "Audio deep learning" },
    status: { ar: "دقة تفوق 98%", en: "98%+ accuracy" },
    summary: { ar: "نموذج للتعرف على أكثر من 335 قارئًا بدقة تفوق 98%، مع بناء مجموعة بيانات عربية تغطي 58 مدينة في 19 دولة.", en: "A model identifying 335+ Quran reciters at 98%+ accuracy, plus an Arabic dataset spanning 58 cities across 19 countries." },
    details: [
      { ar: "أكثر من 335 قارئًا بدقة تفوق 98%.", en: "335+ reciters, 98%+ accuracy." },
      { ar: "مجموعة بيانات عربية من 58 مدينة و19 دولة.", en: "Arabic dataset from 58 cities, 19 countries." },
    ],
    stack: ["Python", "Deep learning", "Audio"],
  },
  {
    id: "quantum", cat: ["research", "ai"], hue: "228 60% 45%",
    name: { ar: "مصنف حركة مرور كمّي", en: "Quantum Traffic Classifier" },
    role: { ar: "بحث", en: "Research" },
    tag: { ar: "تعلم آلي كمّي", en: "Quantum machine learning" },
    status: { ar: "85% مقابل 83%", en: "85% vs 83%" },
    summary: { ar: "مصنف كمّي لحركة الشبكة حقق دقة 85% مقارنة بـ 83% لنموذج SVM التقليدي.", en: "A quantum classifier for network traffic reaching 85% accuracy versus 83% for a classical SVM." },
    details: [{ ar: "مقارنة مباشرة مع SVM تقليدي.", en: "Benchmarked directly against a classical SVM." }],
    stack: ["Quantum ML", "Python", "SVM"],
  },
  {
    id: "ajras", cat: ["ai"], hue: "11 86% 50%",
    name: { ar: "مساعد أجراس الذكي", en: "Ajras AI Assistant" },
    role: { ar: "تدريب هندسة برمجيات", en: "Software engineering intern" },
    tag: { ar: "روبوت محادثة للفحص والتسليم", en: "Inspection & handover chatbot" },
    status: { ar: "مايو - يونيو 2026", en: "May - Jun 2026" },
    summary: { ar: "روبوت محادثة للفحص والتسليم مبني على AWS Bedrock وS3 وGuardrails.", en: "An inspection and handover chatbot on AWS Bedrock, S3 and Guardrails." },
    details: [
      { ar: "خفض المعالجة اليدوية بنسبة 30%.", en: "Cut manual processing by 30%." },
      { ar: "خفض تراكم الاستفسارات بنسبة 20%.", en: "Reduced query backlog by 20%." },
    ],
    stack: ["AWS Bedrock", "S3", "Guardrails", "LLM"],
  },
  {
    id: "livedin", cat: ["ai"], hue: "42 90% 50%",
    name: { ar: "خط تأهيل العملاء - LivedIn", en: "LivedIn Lead Pipeline" },
    role: { ar: "تدريب ذكاء أعمال", en: "Business intelligence intern" },
    tag: { ar: "تأهيل العملاء بالذكاء الاصطناعي", en: "AI lead qualification" },
    status: { ar: "يناير - مارس 2026", en: "Jan - Mar 2026" },
    summary: { ar: "خط آلي لتأهيل العملاء المحتملين بالذكاء الاصطناعي.", en: "An AI pipeline that qualifies inbound leads automatically." },
    details: [{ ar: "خفض الوقت اليدوي بنسبة 50%.", en: "Cut manual time by 50%." }],
    stack: ["Python", "LLM", "BI"],
  },
];

export const experience = [
  { when: { ar: "يونيو - يوليو 2026", en: "Jun - Jul 2026" }, org: { ar: "الجدوى للاستشارات", en: "Aljdwa Consulting" }, role: { ar: "محلل أعمال (متدرب)", en: "Business Analyst Intern" },
    text: { ar: "دراسات جدوى في العقار والأغذية والمشروبات والتصنيع أسهمت في 3 قرارات مشاريع، وأبحاث بيانات حكومية في التعليم والصحة.", en: "Feasibility studies across real estate, F&B and manufacturing that informed 3 project decisions, plus government education and healthcare data research." } },
  { when: { ar: "مايو - يونيو 2026", en: "May - Jun 2026" }, org: { ar: "أجراس", en: "Ajras" }, role: { ar: "مهندس برمجيات (متدرب)", en: "Software Engineering Intern" },
    text: { ar: "روبوت محادثة على AWS Bedrock خفض المعالجة اليدوية 30% وتراكم الاستفسارات 20%.", en: "AWS Bedrock chatbot that cut manual processing 30% and query backlog 20%." } },
  { when: { ar: "يناير - مارس 2026", en: "Jan - Mar 2026" }, org: { ar: "LivedIn", en: "LivedIn" }, role: { ar: "ذكاء أعمال (متدرب)", en: "Business Intelligence Intern" },
    text: { ar: "تأهيل العملاء بالذكاء الاصطناعي خفض الوقت اليدوي 50%.", en: "AI lead qualification that cut manual time 50%." } },
  { when: { ar: "أكتوبر 2025 - أبريل 2026", en: "Oct 2025 - Apr 2026" }, org: { ar: "نادي طلابي - جامعة الأمير سلطان", en: "Student Club - PSU" }, role: { ar: "رئيس النادي", en: "President" },
    text: { ar: "قيادة أكثر من 90 عضوًا في 5 فرق وتنظيم أكثر من 5 فعاليات، منها لقاءات مع خالد السعيد (الاستشارات وريادة الأعمال ومقابلات الحالات) وسليمان اللهيب من Lean Business Services (مسارات تعلم الآلة والعمل الجماعي والتطبيقات الصحية).", en: "Led 90+ members across 5 teams and 5+ events, including speaker sessions with Khalid Alsaeed (consulting careers, startups, case interviews) and Sulaiman Alluhaib of Lean Business Services (ML careers, teamwork, health applications)." } },
  { when: { ar: "سبتمبر - نوفمبر 2025", en: "Sep - Nov 2025" }, org: { ar: "مختبر الروبوتات وإنترنت الأشياء", en: "Robotics & IoT Lab" }, role: { ar: "باحث ذكاء اصطناعي", en: "AI Researcher" },
    text: { ar: "بحث تطبيقي في الذكاء الاصطناعي ضمن المختبر.", en: "Applied AI research within the lab." } },
  { when: { ar: "يوليو - أغسطس 2025", en: "Jul - Aug 2025" }, org: { ar: "أكاديمية Apple طويق", en: "Apple Developer Academy - Tuwaiq" }, role: { ar: "مطوّر iOS", en: "iOS Developer" },
    text: { ar: "بناء تطبيق طليق باستخدام Core ML وCreate ML.", en: "Built Taleeq with Core ML and Create ML." } },
];

export const moments = [
  { src: "images/achievement.jpg", c: { ar: "تكريم المشاريع الفائزة", en: "Recognition with the winning teams" } },
  { src: "images/event-1.jpg", c: { ar: "جلسة متحدث ضمن فعاليات النادي", en: "Club speaker session" } },
  { src: "images/event-4.jpg", c: { ar: "لقاء الاستشارات مع خالد السعيد", en: "Consulting session with Khalid Alsaeed" } },
  { src: "images/event-3.jpg", c: { ar: "مسارات تعلم الآلة مع Lean Business Services", en: "ML careers with Lean Business Services" } },
  { src: "images/event-2.jpg", c: { ar: "من قاعة العروض", en: "From the presentation room" } },
];

export const awards = [
  { k: "Top 10", t: { ar: "إنجاز سدايا - CALIX", en: "SDAIA Enjaz - CALIX" }, d: { ar: "ضمن أفضل 10 مشاريع فائزة من أكثر من 90 ابتكارًا", en: "Top 10 winning projects among 90+ innovations" } },
  { k: "Top 10%", t: { ar: "IEEE Xtreme 18", en: "IEEE Xtreme 18" }, d: { ar: "عالميًا من أكثر من 8,700 فريق، والمركز 22 في السعودية", en: "Globally of 8,700+ teams; 22nd in Saudi Arabia" } },
  { k: "4 / 18", t: { ar: "مسابقة خطط الأعمال - بِنفت", en: "Business plan competition - Benefit" }, d: { ar: "18 فريقًا من 8 جامعات (مفهوم مسابقة)", en: "18 teams, 8 universities (competition concept)" } },
  { k: "2026", t: { ar: "UC Berkeley SCET", en: "UC Berkeley SCET" }, d: { ar: "معسكر ريادة الأعمال - أغسطس 2026", en: "Entrepreneurship bootcamp - Aug 2026" } },
  { k: "2026", t: { ar: "Udacity", en: "Udacity" }, d: { ar: "إدارة المنتجات - يوليو 2026", en: "Product Management - Jul 2026" } },
];

export const skills = [
  { g: { ar: "لغات", en: "Languages" }, i: ["Python", "SQL", "JavaScript", "Java", "Swift", "Dart"] },
  { g: { ar: "ذكاء اصطناعي وبيانات", en: "AI & Data" }, i: ["Machine Learning", "NLP", "LLMs", "Data Analysis"] },
  { g: { ar: "أعمال", en: "Business" }, i: ["Requirements", "Stakeholders", "Feasibility", "Agile / Scrum"] },
  { g: { ar: "أدوات", en: "Tools" }, i: ["Excel", "Figma", "Git"] },
];

export const t = {
  nav: { intro: { ar: "مقدمة", en: "Intro" }, work: { ar: "المشاريع", en: "Work" }, exp: { ar: "الخبرة", en: "Experience" }, awards: { ar: "الإنجازات", en: "Recognition" }, contact: { ar: "تواصل", en: "Contact" } },
  name: { ar: "عبدالرحمن ممدوح", en: "Abdulrhman Mamdoh" },
  hello: { ar: "مرحبًا، أنا عبدالرحمن.", en: "Hi, I'm Abdulrhman." },
  hero1: { ar: "أبني منتجات", en: "I build AI" },
  hero2: { ar: "ذكاء اصطناعي", en: "products" },
  hero3: { ar: "بعقلية مؤسس.", en: "like a founder." },
  intro: { ar: "طالب هندسة برمجيات (ذكاء اصطناعي وعلم بيانات) في الرياض. أربط بين الهندسة وريادة الأعمال والاستشارات: من نماذج تتعرف على أكثر من 335 قارئًا، إلى روبوتات محادثة على AWS، إلى دراسات جدوى تدعم قرارات حقيقية.", en: "Software engineering student (AI & Data Science) in Riyadh. I connect engineering, entrepreneurship and consulting: from models that identify 335+ reciters, to AWS chatbots, to feasibility studies that inform real decisions." },
  cv: { ar: "تحميل السيرة الذاتية", en: "Download CV" },
  seeWork: { ar: "استعرض المشاريع", en: "See the work" },
  based: { ar: "الرياض، السعودية", en: "Riyadh, Saudi Arabia" },
  gpa: { ar: "المعدل", en: "GPA" },
  degree: { ar: "بكالوريوس هندسة البرمجيات - جامعة الأمير سلطان", en: "B.S. Software Engineering - Prince Sultan University" },
  degreeWhen: { ar: "أغسطس 2022 - يناير 2027", en: "Aug 2022 - Jan 2027" },
  workTitle: { ar: "كل المشاريع", en: "Every project" },
  workSub: { ar: "منتجات، أبحاث، ومشاريع ريادية. اضغط على أي مشروع للتفاصيل والملفات.", en: "Products, research and ventures. Open any project for details and files." },
  cats: { all: { ar: "الكل", en: "All" }, ai: { ar: "ذكاء اصطناعي", en: "AI" }, venture: { ar: "ريادة", en: "Ventures" }, research: { ar: "أبحاث", en: "Research" }, product: { ar: "منتجات", en: "Products" } },
  open: { ar: "التفاصيل", en: "Details" },
  visit: { ar: "زيارة المتجر", en: "Visit store" },
  noFiles: { ar: "لا توجد ملفات عامة لهذا المشروع.", en: "No public files for this project." },
  expTitle: { ar: "أين عملت", en: "Where I've worked" },
  awardsTitle: { ar: "الإنجازات والشهادات", en: "Recognition" },
  skillsTitle: { ar: "الأدوات", en: "Toolkit" },
  contactTitle: { ar: "لنبنِ شيئًا حقيقيًا.", en: "Let's build something real." },
  contactSub: { ar: "متاح للتدريب والتعاون والمشاريع في الذكاء الاصطناعي والمنتجات والاستشارات.", en: "Open to internships, collaborations and projects across AI, product and consulting." },
  copy: { ar: "نسخ البريد", en: "Copy email" },
  copied: { ar: "تم النسخ", en: "Copied" },
  stats: [
    { v: "3.87", l: { ar: "المعدل من 4", en: "GPA / 4" } },
    { v: "335+", l: { ar: "قارئ في نموذج التعرف", en: "reciters identified" } },
    { v: "Top 10", l: { ar: "إنجاز سدايا", en: "SDAIA Enjaz" } },
    { v: "90+", l: { ar: "عضو بقيادتي", en: "club members led" } },
  ],
};
