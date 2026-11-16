import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Code2,
  Database,
  Flag,
  GitBranch,
  Info,
  Layers3,
  Moon,
  NotebookPen,
  RotateCcw,
  Sparkles,
  Sun,
  Target,
  TestTube2,
  Workflow,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * تبسيط «نظام مداري للتعلّم»: الخارطة جذر وفروع، والتأشير هو التفاعل المركزي.
 * كل خطوة قابلة للإنجاز تحفظ محليًا كي يعود المتعلم إلى تقدمه على الجهاز نفسه.
 */

type Branch = {
  id: string;
  number: string;
  weeks: string;
  title: string;
  summary: string;
  project: string;
  projectIdeas: { title: string; ai: string }[];
  steps: string[];
  color: string;
  icon: LucideIcon;
};

type StepExplanation = {
  what: string;
  outcome: string;
};

type FontSize = "small" | "normal" | "large";

const branches: Branch[] = [
  {
    id: "setup",
    number: "0",
    weeks: "الأسبوع 1",
    title: "التهيئة والطرفية",
    summary: "جهّز بيئة عمل بسيطة، وافهم الملفات والطرفية قبل أن تتراكم عليك الأدوات.",
    project: "المخرج: مساحة تعلم مرتبة مع أول برنامج Python وأول commit.",
    projectIdeas: [
      { title: "مُنظّم ملفات التدريب", ai: "اطلب من AI تقسيم الفكرة إلى أوامر آمنة، ثم نفّذها داخل مجلد تجريبي فقط." },
      { title: "مولّد README بسيط", ai: "اطلب من AI قائمة أسئلة عن المشروع، ثم اكتب README بنفسك وأطلب مراجعة وضوحه." },
      { title: "مشغّل تمارين Python", ai: "اطلب من AI اقتراح بنية مجلدات، ثم أنشئ الملفات والـ commits يدويًا." },
    ],
    steps: [
      "ثبّت Python وتأكد من ظهور الإصدار في الطرفية.",
      "أنشئ مجلدًا لمسار التعلم وافتحه في محرر الكود.",
      "أنشئ بيئة افتراضية باسم .venv وفعلها.",
      "أنشئ مستودع Git واكتب أول commit وREADME.",
      "تدرّب على أوامر الطرفية: pwd وls وcd وmkdir وcp وmv.",
      "افهم المسارات والملفات والمجلدات دون تثبيت أدوات إضافية بلا حاجة.",
    ],
    color: "#9AAEBA",
    icon: GitBranch,
  },
  {
    id: "python",
    number: "1",
    weeks: "الأسابيع 2–4",
    title: "أساسيات Python والتفكير البرمجي",
    summary: "حوّل مشكلة صغيرة إلى برنامج واضح، واقرأ الكود وتتعامل مع أخطائه بدل نسخه فقط.",
    project: "المخرج: أداة CLI صغيرة تحفظ بياناتها وتتعامل مع الإدخال غير الصالح.",
    projectIdeas: [
      { title: "مدير مهام نصّي", ai: "اطلب تلميحات لتقسيم الإضافة والعرض والحذف، ولا تطلب البرنامج كاملًا." },
      { title: "محول وحدات أو عملات", ai: "اطلب من AI اقتراح حالات الإدخال الخاطئة، ثم اكتب التحويلات واختبرها." },
      { title: "دفتر مصروفات أولي", ai: "اطلب مراجعة تصميم البيانات وJSON، مع إبقاء كتابة الدوال عندك." },
    ],
    steps: [
      "استخدم المتغيرات والأنواع والإدخال والإخراج في برنامج صغير.",
      "اكتب شرطًا يعالج مدخلًا صحيحًا ومدخلًا غير صالح.",
      "استخدم الحلقات لمعالجة قائمة أو نص.",
      "قسّم الحل إلى دوال قصيرة تستعمل return بوضوح.",
      "احفظ البيانات في JSON أو CSV واقرأها من جديد.",
      "ابنِ أداة CLI صغيرة دون نسخ مشروع كامل من AI.",
    ],
    color: "#45E0C1",
    icon: Code2,
  },
  {
    id: "workflow",
    number: "2",
    weeks: "الأسبوع 5",
    title: "Git وسير العمل البرمجي",
    summary: "اجعل التقدم قابلًا للتتبع، وتعلم كيف تجرب تغييرًا دون إفساد النسخة المستقرة.",
    project: "المخرج: مستودع منظم بفرع ميزة وREADME يشرح طريقة العمل.",
    projectIdeas: [
      { title: "موقع توثيق محلي للمشروع", ai: "اطلب من AI اقتراح عناوين التوثيق، ثم نفّذ تغييرات صغيرة في فروع منفصلة." },
      { title: "سجل تغييرات لبرنامج CLI", ai: "اطلب مراجعة رسائل commit، ولا تسمح له بتنفيذ Git بدلًا منك." },
      { title: "نسخة تجريبية بميزة بحث", ai: "اطلب خطة فرع واختبارات قبل الدمج، ثم نفّذ الخطة وراجع diff." },
    ],
    steps: [
      "استخدم status وdiff وlog لفهم حالة المستودع.",
      "أنشئ branch لميزة صغيرة ثم ادمجه بعد اختبارها.",
      "تدرّب على حل تعارض بسيط وفهم سبب حدوثه.",
      "اكتب رسائل commit قصيرة تصف التغيير الحقيقي.",
      "ارفع مستودعًا إلى GitHub وتحقق من إعادة تشغيله من نسخة جديدة.",
    ],
    color: "#7CC7B8",
    icon: GitBranch,
  },
  {
    id: "algorithms",
    number: "3",
    weeks: "الأسابيع 6–7",
    title: "علوم الحاسوب وهياكل البيانات والخوارزميات",
    summary: "افهم كيف تمثل البيانات وكيف تنمو تكلفة الحلول، مع ربط النظرية بتمارين Python.",
    project: "المخرج: محرك بحث نصي محلي مع مقارنة بين أكثر من طريقة للحل.",
    projectIdeas: [
      { title: "محرك بحث داخل ملفات نصية", ai: "اطلب مقارنة بين البحث الخطي والفهرس، ثم قِس عدد المقارنات بنفسك." },
      { title: "محلل تكرار الكلمات", ai: "اطلب حالات اختبار لملفات فارغة وكبيرة، ثم اختر الخوارزمية المناسبة." },
      { title: "طابور مهام بسيط", ai: "اطلب شرح FIFO وLIFO بمثال، ثم نفّذ Stack أو Queue دون نسخ الحل." },
    ],
    steps: [
      "استخدم list وtuple وdict وset في أمثلة مختلفة.",
      "نفّذ stack أو queue في تمرين عملي صغير.",
      "قارن البحث الخطي بالبحث الثنائي على بيانات مرتبة.",
      "اكتب مثال recursion بسيطًا وتتبّع حالاته.",
      "اشرح Big O لحلين مختلفين للمشكلة نفسها.",
      "أنشئ فهرسًا للكلمات للبحث في ملفات نصية محلية.",
      "افهم الفرق بين الذاكرة والتخزين والبرنامج والعملية.",
      "خذ فكرة عامة عن الملفات والعمليات والشبكات دون دخول في تطوير الويب.",
    ],
    color: "#9AB5FF",
    icon: Layers3,
  },
  {
    id: "oop",
    number: "4",
    weeks: "الأسبوع 8",
    title: "OOP والتصميم",
    summary: "نظّم حالة البرنامج وسلوكه في كائنات ذات مسؤوليات مفهومة، دون استخدام التعقيد لمجرد استخدامه.",
    project: "المخرج: نظام مكتبة أو مخزون محلي مصمم بكائنات واضحة.",
    projectIdeas: [
      { title: "نظام مكتبة", ai: "اطلب من AI اقتراح مسؤوليات Book وMember وLoan، ثم ارسم العلاقات قبل الكود." },
      { title: "مخزون منزلي", ai: "اطلب نقدًا لتصميم الكائنات، وليس إعادة كتابة المشروع كاملًا." },
      { title: "حساب عادات شخصي", ai: "اطلب حالات اختبار لسلوك الكائنات، ثم اكتب الاختبارات وتحقق من النتائج." },
    ],
    steps: [
      "أنشئ class وinstances مع __init__ وattributes واضحة.",
      "أضف methods تتعامل مع سلوك الكائن لا مع الطباعة فقط.",
      "صمّم ثلاثة كائنات مرتبطة في نظام مكتبة أو مخزون.",
      "استخدم composition قبل inheritance عندما تكون العلاقة احتواءً.",
      "اكتب اختبارًا لسلوك ناجح وآخر فاشل في الكائنات.",
    ],
    color: "#B9A3FF",
    icon: Workflow,
  },
  {
    id: "quality",
    number: "5",
    weeks: "الأسبوع 9",
    title: "هندسة الكود والاختبارات",
    summary: "اجعل المشروع قابلًا للقراءة والتشغيل والاختبار والتعديل بدل أن يبقى ملفًا واحدًا هشًا.",
    project: "المخرج: أداة أتمتة للملفات مع tests وREADME واضح.",
    projectIdeas: [
      { title: "منظّم ملفات آمن", ai: "اطلب مراجعة الحالات الخطرة قبل التشغيل، واجعل AI يقترح اختبارات لا أوامر حذف." },
      { title: "مدقق ملفات مكررة", ai: "اطلب أفكارًا لاختبارات الحواف، ثم اكتب التنفيذ وقِس سلوكه." },
      { title: "محلل سجل نصّي", ai: "اطلب مراجعة تقسيم modules ورسائل logging، ثم شغّل المشروع من README جديد." },
    ],
    steps: [
      "قسّم المشروع إلى modules لها مسؤوليات واضحة.",
      "استخدم pathlib لقراءة الملفات وكتابتها بأمان.",
      "اكتب اختبارات pytest لحالة نجاح وفشل وحالة حدية.",
      "استخدم logging أو رسائل خطأ مفهومة لتتبع المشكلة.",
      "أعد ترتيب جزء من الكود من دون تغيير السلوك.",
      "شغّل المشروع من مستودع جديد باتباع README فقط.",
    ],
    color: "#B2D5C8",
    icon: TestTube2,
  },
  {
    id: "database",
    number: "6",
    weeks: "الأسبوع 10",
    title: "SQL وقواعد البيانات المحلية",
    summary: "صمّم بياناتك في جداول مترابطة وقيود تمنع الأخطاء قبل أن تحدث.",
    project: "المخرج: مدير مصروفات أو مكتبة بقاعدة SQLite.",
    projectIdeas: [
      { title: "مدير مصروفات SQLite", ai: "اطلب مراجعة الجداول والقيود، ثم اكتب الاستعلامات باستخدام placeholders." },
      { title: "كتالوج كتب محلي", ai: "اطلب أسئلة تساعدك على اختيار العلاقات وJOIN، ولا تطلب قاعدة البيانات كاملة." },
      { title: "متتبع مخزون", ai: "اطلب حالات اختبار للكمية والصلاحيات المنطقية، ثم نفّذ CRUD واختبره." },
    ],
    steps: [
      "أنشئ جدولًا واستخدم INSERT وSELECT وUPDATE وDELETE.",
      "أضف PRIMARY KEY وNOT NULL وUNIQUE حيث تحتاجها.",
      "صمّم علاقة بين جدولين باستخدام FOREIGN KEY.",
      "اكتب JOIN وGROUP BY لإجابة سؤال حقيقي عن البيانات.",
      "استخدم sqlite3 وplaceholders بدل تركيب SQL كنص.",
      "انقل مشروعك المحلي من الملفات إلى SQLite.",
    ],
    color: "#F2A37A",
    icon: Database,
  },
  {
    id: "ai",
    number: "7",
    weeks: "بالتوازي من الأسبوع 2",
    title: "التعلم البرمجي في عصر AI",
    summary: "استخدم الذكاء الاصطناعي كمدرس ومراجع ومختبر، لا كبديل عن التفكير والكتابة.",
    project: "المخرج: سجل تعلم يوضح ما كتبته بنفسك وما راجعه AI وكيف تحققت منه.",
    projectIdeas: [
      { title: "مراجع كود شخصي", ai: "اطلب من AI أسئلة مراجعة ثابتة، ثم سجّل الأخطاء التي اكتشفتها بنفسك." },
      { title: "مولّد تمارين مخصص", ai: "اطلب تمرينًا واحدًا يناسب مستواك مع تلميح اختياري، لا حلًا كاملًا." },
      { title: "دفتر تجارب prompts", ai: "قارن بين طلب غامض وطلب واضح، وسجّل النتيجة وطريقة التحقق." },
    ],
    steps: [
      "اطلب من AI شرح المفهوم بمثال صغير ثم أعد كتابته من ذاكرتك.",
      "استخدم AI لتوليد حالات اختبار وأسئلة تكشف فهمك.",
      "اطلب مراجعة جزء محدد من الكود، وتحقق من كل اقتراح بالتجربة والتوثيق.",
      "أنشئ قاعدة شخصية للتعلم: حاول أولًا، اسأل عن تلميح، ثم راجع الحل.",
    ],
    color: "#D7A8E8",
    icon: Sparkles,
  },
  {
    id: "capstone",
    number: "8",
    weeks: "الأسابيع 11–12",
    title: "المشروع النهائي",
    summary: "اجمع مهاراتك في مشروع محلي مفيد تستطيع تشغيله وشرحه واختباره وتحسينه.",
    project: "المخرج: مشروع مكتمل موثق ومختبر مع قرار تصميم تشرحه بوضوح.",
    projectIdeas: [
      { title: "مدير مصروفات متكامل", ai: "استخدم AI لتقسيم المتطلبات واقتراح حالات الاختبار، ونفّذ كل ميزة على حدة." },
      { title: "أرشيف وبحث في الملفات", ai: "اطلب مراجعة تصميم modules وSQLite، ثم تحقق من الأداء والأخطاء بنفسك." },
      { title: "نظام مكتبة محلي", ai: "اطلب محاكاة مراجعة كود وأسئلة فهم، ولا تقبل أي تغيير لا تستطيع شرحه." },
    ],
    steps: [
      "اختر مشكلة واحدة واكتب مواصفاتها في صفحة واحدة.",
      "ارسم modules وclasses والجداول قبل البدء بالكود.",
      "نفّذ المسار الأساسي للمستخدم في نسخة صغيرة تعمل.",
      "أضف اختبارات للحالات المهمة والأخطاء المتوقعة.",
      "اكتب README يشرح التشغيل والوظائف وقرارات التصميم.",
      "أعد بناء ميزة مصغرة دون AI، ثم راجع ما يحتاجه المشروع.",
    ],
    color: "#FF7D72",
    icon: Target,
  },
];

const stepExplanations: Record<string, StepExplanation> = {
  "setup:0": {
    what: "نزّل Python من المصدر الرسمي أو مدير الحزم، ثم افتح الطرفية واكتب python --version. إن لم يظهر رقم الإصدار، صحّح مسار التثبيت قبل أن تبدأ أي درس.",
    outcome: "تظهر لك نسخة Python في الطرفية ويمكنك تشغيل python أو python3 دون خطأ.",
  },
  "setup:1": {
    what: "أنشئ مجلدًا باسم واضح مثل programming-path، وافتحه في VS Code أو محرر مناسب. اجعل كل تمرين أو مشروع فرعيًا في مجلد منفصل داخله.",
    outcome: "لديك مساحة عمل مرتبة، ويمكنك إنشاء ملف مثل app.py وحفظه وتشغيله من المجلد الصحيح.",
  },
  "setup:2": {
    what: "من داخل مجلد المشروع أنشئ البيئة بالأمر python -m venv .venv، ثم فعّلها. الهدف هو عزل حزم هذا المشروع عن بقية الجهاز.",
    outcome: "يظهر اسم البيئة في الطرفية، ويوجد مجلد .venv داخل المشروع، ويستخدم pip الخاص بها فقط.",
  },
  "setup:3": {
    what: "شغّل git init، أنشئ README يصف المشروع، ثم أضف الملفات وسجّلها في commit برسالة مفهومة. لا تضع .venv أو ملفات أسرار ضمن التتبع.",
    outcome: "يعرض git log أول commit، ويشرح README ما المشروع وكيف يُشغّل.",
  },
  "python:0": {
    what: "اكتب برنامجًا يعرّف متغيرات نصية ورقمية ومنطقية، ويقرأ قيمة من input ثم يطبع نتيجة باستخدام f-string. راقب نوع كل قيمة عبر type عند الحاجة.",
    outcome: "تشغّل الملف وتدخل قيمة من الطرفية، ثم ترى مخرجًا صحيحًا وواضحًا يستخدم هذه القيم.",
  },
  "python:1": {
    what: "استخدم if وelif وelse للتحقق من المدخل قبل استعماله. جرّب حالة مقبولة، وحالة فارغة أو غير صالحة، واكتب رسالة مفيدة بدل أن يتوقف البرنامج.",
    outcome: "يتصرف البرنامج بشكل مختلف وصحيح لكل مدخل، ولا ينهار عند تجربة قيمة خاطئة متوقعة.",
  },
  "python:2": {
    what: "أنشئ قائمة مهام أو أسماء، ثم عالج عناصرها باستخدام for. بعد ذلك جرّب while في مثال يعتمد على شرط توقف، مثل طلب كلمة مرور بعدد محاولات محدود.",
    outcome: "تستطيع شرح متى تستخدم for ومتى تستخدم while، ويطبع البرنامج النتيجة المتوقعة من دون حلقة لا نهائية.",
  },
  "python:3": {
    what: "اختر عملية صغيرة مثل حساب مجموع الفاتورة، وضعها في دالة لها اسم واضح ومدخلات محددة وتعيد نتيجة عبر return. اجعل الطباعة خارج الدالة ما أمكن.",
    outcome: "يمكنك استدعاء الدالة بقيم مختلفة، وتعيد النتيجة الصحيحة بدل الاعتماد على متغيرات عامة.",
  },
  "python:4": {
    what: "أنشئ قاموسًا أو قائمة، واحفظها في ملف JSON باستخدام json.dump، ثم اقرأها بـ json.load. جرّب أيضًا كتابة ملف CSV بسيط وقراءته.",
    outcome: "بعد إغلاق البرنامج وتشغيله ثانيةً، تعود البيانات من الملف كما حفظتها.",
  },
  "python:5": {
    what: "اختر أداة صغيرة مثل دفتر جهات اتصال أو محول وحدات. ابدأ بخطة من ثلاث وظائف فقط، ثم اكتبها بنفسك، واستخدم AI لاحقًا لشرح خطأ أو مراجعة جزء محدد فقط.",
    outcome: "لديك برنامج يعمل من الطرفية، منظم إلى دوال، ويعالج إدخال المستخدم بطريقة مفهومة.",
  },
  "algorithms:0": {
    what: "مثّل نفس البيانات بأربع صور: list للترتيب، tuple للقيم الثابتة، dict للربط بالمفتاح، وset لمنع التكرار. نفّذ عملية مناسبة على كل واحدة.",
    outcome: "تستطيع اختيار البنية المناسبة وشرح سبب اختيارك بدل استعمال list في كل موقف.",
  },
  "algorithms:1": {
    what: "نفّذ stack باستخدام list وعمليات append وpop، ونفّذ queue باستخدام collections.deque وpopleft. اربط كل واحدة بمثال مثل سجل تراجع أو طابور مهام.",
    outcome: "تضيف عناصر وتزيلها بالترتيب الصحيح، وتستطيع التمييز بين LIFO وFIFO في التطبيق.",
  },
  "algorithms:2": {
    what: "اكتب دالة بحث خطي تمر على العناصر واحدةً واحدة، ودالة بحث ثنائي تعمل على قائمة مرتبة. اطبع عدد المقارنات أو تتبع الخطوات يدويًا.",
    outcome: "ترى أن البحث الثنائي يحتاج قائمة مرتبة ويقلل عدد الخطوات على البيانات الكبيرة.",
  },
  "algorithms:3": {
    what: "ابدأ بمثال صغير مثل factorial أو جمع قائمة بشكل تكراري. اكتب حالة أساسية صريحة، ثم تتبع على الورق ما يحدث في كل استدعاء.",
    outcome: "تعمل الدالة بلا RecursionError، ويمكنك تحديد الحالة الأساسية ولماذا ستصل إليها.",
  },
  "algorithms:4": {
    what: "خذ حلين للمشكلة نفسها، مثل البحث في قائمة أو استخدام dict، وعدّ العمليات تقريبًا عند زيادة عدد العناصر. ركّز على النمو لا على زمن جهازك الحالي.",
    outcome: "تكتب بوضوح أن حلًا ما O(n) والآخر O(1) في المتوسط، وتشرح أثر ذلك عمليًا.",
  },
  "algorithms:5": {
    what: "اقرأ ملفات نصية محلية، وحوّل الكلمات إلى صيغة موحدة، ثم ابنِ dict يربط كل كلمة بالملفات أو المواضع التي ظهرت فيها. أضف بحثًا بكلمة واحدة.",
    outcome: "تكتب كلمة في الطرفية فيرجع البرنامج بالملفات ذات الصلة، مع التعامل مع الكلمات المكررة.",
  },
  "oop:0": {
    what: "أنشئ class مثل Book أو Product، وعرّف __init__ لاستقبال البيانات الأساسية. أنشئ أكثر من instance وتأكد أن كل كائن يحتفظ بحالته الخاصة.",
    outcome: "تطبع أو تفحص كائنين بقيم مختلفة، ولا تتداخل بيانات أحدهما مع الآخر.",
  },
  "oop:1": {
    what: "انقل الأفعال المرتبطة بالكائن إلى methods، مثل borrow أو change_price. اجعل الدالة تعدّل الحالة أو تعيد معلومة بدل أن تكون مجرد print.",
    outcome: "يستطيع الكائن تنفيذ سلوك مفهوم، وتلاحظ أثره في attributes الخاصة به.",
  },
  "oop:2": {
    what: "صمّم ثلاثة كائنات في مجال واحد، مثل Book وMember وLoan. اكتب العلاقة بينها قبل الكود: من يحتفظ بمن، وما البيانات التي يحتاجها كل كائن.",
    outcome: "يتفاعل نظامك مع سيناريو صغير، مثل استعارة كتاب وربطه بعضو وسجل استعارة.",
  },
  "oop:3": {
    what: "استخدم composition عندما يحتوي كائن على كائنات أخرى، مثل Library التي تملك قائمة Books. لا تستخدم inheritance إلا إذا كانت العلاقة فعلًا نوعًا من النوع الآخر.",
    outcome: "الكود يعبر عن علاقة احتواء واضحة، ويمكنك إضافة مكونات من دون تشعب وراثة غير ضروري.",
  },
  "oop:4": {
    what: "اكتب اختبارًا ينشئ كائنًا ويفحص سلوكًا صحيحًا، ثم اختبارًا يتوقع رفض حالة غير صالحة مثل استعارة كتاب غير متاح. شغّل الاختبار بعد كل تعديل.",
    outcome: "تظهر نتيجة pytest ناجحة للحالة الصحيحة، وفشل متوقع أو استثناء واضح للحالة غير المسموحة.",
  },
  "quality:0": {
    what: "افصل منطق القراءة أو الحساب أو العرض في ملفات مستقلة، ثم استوردها من ملف تشغيل رئيسي صغير. لا تنقل الملف الواحد إلى عدة ملفات بلا سبب؛ افصل حسب المسؤولية.",
    outcome: "يمكنك معرفة وظيفة كل module من اسمه وتشغيل المشروع من ملف رئيسي واحد.",
  },
  "quality:1": {
    what: "استخدم pathlib.Path بدل تركيب المسارات كنصوص. جرّب إنشاء ملف وقراءته ونسخه أو ترتيب ملفات في مجلد تجريبي فقط.",
    outcome: "يتعامل البرنامج مع المسارات بوضوح ويعطي رسالة مفهومة إن لم يوجد الملف.",
  },
  "quality:2": {
    what: "اكتب ثلاث دوال اختبار على الأقل: سلوك طبيعي، إدخال خاطئ، وحالة حدية مثل قائمة فارغة. اجعل كل اختبار قصيرًا واسمُه يشرح ما يتحقق منه.",
    outcome: "ينفذ pytest الاختبارات، وتستطيع جعل أحدها يفشل عمدًا للتأكد من أنه يلتقط الخطأ.",
  },
  "quality:3": {
    what: "ضع رسائل logging عند بدء عملية أو فشل قراءة ملف أو تجاوز شرط مهم. لا تسجل كلمات مرور أو بيانات حساسة، ولا تعتمد على print لتتبع مشروع كبير.",
    outcome: "عند حدوث مشكلة تعرف من السجل أين توقفت العملية وما المدخل أو الحالة المرتبطة بها.",
  },
  "quality:4": {
    what: "اختر دالة طويلة أو اسمًا مبهمًا، وحسّنه تدريجيًا مع تشغيل الاختبارات بعد كل تغيير. لا تغيّر التصميم والسلوك معًا حتى تعرف سبب الخطأ إن وقع.",
    outcome: "يتحسن تنظيم الكود أو وضوحه، وتبقى نتائج الاختبارات كما كانت قبل إعادة الترتيب.",
  },
  "quality:5": {
    what: "انسخ المستودع إلى مجلد جديد أو اطلب من شخص آخر اتباع README. ابدأ من الصفر: أنشئ البيئة وثبّت الاعتماديات وشغّل الاختبارات والتطبيق.",
    outcome: "يعمل المشروع بالاعتماد على README فقط، وتكتشف أي خطوة ناقصة في التوثيق.",
  },
  "database:0": {
    what: "أنشئ قاعدة SQLite تجريبية وجدولًا صغيرًا، ثم أدخل سجلات واقرأها وعدّل سجلًا واحذفه. نفذ العمليات واحدةً واحدة لتفهم دورة CRUD.",
    outcome: "تستطيع رؤية التغييرات في الجدول بعد كل عملية وتعرف الفرق بين INSERT وUPDATE وDELETE.",
  },
  "database:1": {
    what: "أضف PRIMARY KEY لتعريف السجل، وNOT NULL للحقول الإلزامية، وUNIQUE للقيم التي لا ينبغي تكرارها مثل البريد. جرّب إدخال قيمة تخالف القيد.",
    outcome: "ترفض القاعدة السجل غير الصحيح بدل أن تسمح ببيانات مكررة أو ناقصة.",
  },
  "database:2": {
    what: "قسّم البيانات بين جدولين مترابطين، مثل expenses وcategories أو books وmembers. أضف FOREIGN KEY وتأكد من ربط السجل بمفتاح موجود.",
    outcome: "يمكنك ربط سجل بآخر بطريقة منظمة، ولا تقبل القاعدة مرجعًا لا وجود له عند تفعيل القيود.",
  },
  "database:3": {
    what: "اكتب استعلام JOIN يجمع بيانات جدولين، ثم GROUP BY للإجابة عن سؤال مثل إجمالي مصروف كل فئة. ابدأ من سؤال واضح ثم اكتب الاستعلام.",
    outcome: "ترجع النتيجة تقريرًا مفيدًا، لا مجرد صفوف خام، وتفهم أي جداول شاركت في النتيجة.",
  },
  "database:4": {
    what: "افتح قاعدة SQLite من Python عبر sqlite3، ومرر القيم بعلامات ? داخل execute بدل لصقها في نص SQL. نفذ commit بعد التعديل وتعامل مع الأخطاء.",
    outcome: "يتعامل البرنامج مع قيم المستخدم بأمان أكبر، وتبقى الاستعلامات واضحة وقابلة لإعادة الاستخدام.",
  },
  "database:5": {
    what: "اختر بيانات كنت تحفظها في JSON أو CSV، وصمّم جداولها ثم اكتب دوال القراءة والكتابة من جديد باستخدام SQLite. انقل جزءًا صغيرًا أولًا ثم وسّع.",
    outcome: "يعمل المشروع السابق بعد إعادة تشغيله مع قاعدة بيانات محلية بدل ملفات بيانات مبعثرة.",
  },
  "capstone:0": {
    what: "اكتب صفحة تحدد المستخدم والمشكلة والوظائف الأساسية وحدود النسخة الأولى. تجنب قائمة ضخمة؛ اختر مشكلة واحدة يمكن إنهاؤها خلال الأسابيع المتاحة.",
    outcome: "لديك وصف مختصر يمكنك عرضه على شخص آخر فيفهم ما سيفعله المشروع وما لن يفعله.",
  },
  "capstone:1": {
    what: "قبل الكود، ارسم مربعات للـ modules أو classes، والجداول عند وجود بيانات. حدد تدفقًا واحدًا رئيسيًا من إدخال المستخدم إلى تخزين النتيجة.",
    outcome: "تملك مخططًا بسيطًا يمنعك من البدء عشوائيًا، ويمكن تعديله قبل أن يصبح الكود كبيرًا.",
  },
  "capstone:2": {
    what: "ابنِ أقل مسار مفيد أولًا: إدخال واحد، معالجة واحدة، ونتيجة واحدة. لا تضف الميزات الثانوية قبل أن يعمل هذا المسار من البداية إلى النهاية.",
    outcome: "تستطيع تشغيل نسخة أولية تحقق وعد المشروع الأساسي ولو كانت واجهتها بسيطة.",
  },
  "capstone:3": {
    what: "حدد أهم الحالات التي قد تكسر المشروع، مثل إدخال فارغ أو سجل غير موجود، ثم اكتب اختبارات لها. شغّلها قبل كل تغيير كبير.",
    outcome: "تكشف الاختبارات أعطال الميزات الأساسية مبكرًا بدل اكتشافها بعد إضافة وظائف كثيرة.",
  },
  "capstone:4": {
    what: "اكتب README يبدأ بالهدف ثم التثبيت والتشغيل والأمثلة والاختبارات. أضف فقرة قصيرة تشرح أهم قرار تصميم اتخذته ولماذا.",
    outcome: "يستطيع شخص جديد تشغيل المشروع وفهمه من المستودع دون سؤال مباشر منك.",
  },
  "capstone:5": {
    what: "اختر ميزة صغيرة كتصفية نتائج أو إضافة سجل، وأعد كتابتها في ملف تجريبي من ذاكرتك. بعد ذلك فقط قارنها بالمشروع واطلب مراجعة AI إن احتجت.",
    outcome: "تثبت لنفسك أنك تفهم مبدأ الميزة، لا أنك تعتمد على كود مولد لا تستطيع شرحه.",
  },

  "setup:4": {
    what: "نفّذ أوامر pwd وls وcd وmkdir وcp وmv داخل مجلد تجريبي. لا تحذف شيئًا خارج مجلد التدريب، وراقب كيف يتغير المسار الحالي.",
    outcome: "تستطيع إنشاء مجلد وملف، الانتقال بين المجلدات، ونسخ ملف أو نقله من الطرفية دون الاعتماد على واجهة رسومية فقط.",
  },
  "setup:5": {
    what: "افهم الفرق بين المسار المطلق والنسبي، وميّز بين الملف والمجلد والبيئة الافتراضية. طبّق ذلك داخل مشروع التعلم فقط.",
    outcome: "تستطيع تحديد مكان مشروعك وملفاته، وتفهم لماذا يجب تجاهل .venv في Git.",
  },
  "workflow:0": {
    what: "غيّر ملفًا صغيرًا ثم استخدم git status وgit diff لرؤية ما تغير، وبعدها اقرأ git log لمراجعة تاريخ المشروع.",
    outcome: "تستطيع معرفة الملفات المعدلة وما الذي سيُحفظ قبل تنفيذ commit.",
  },
  "workflow:1": {
    what: "أنشئ فرعًا باسم feature/search، أضف ميزة صغيرة، اختبرها، ثم عد إلى الفرع الرئيسي وادمجها.",
    outcome: "تستطيع تجربة ميزة في فرع مستقل ودمجها دون فقد التغييرات.",
  },
  "workflow:2": {
    what: "أنشئ تعارضًا بسيطًا في السطر نفسه بين فرعين، ثم افتح الملف واختر النسخة الصحيحة واحفظ commit الدمج.",
    outcome: "تفهم أن التعارض ليس خطأ غامضًا، بل اختلاف يحتاج قرارًا بشريًا واضحًا.",
  },
  "workflow:3": {
    what: "اكتب commit مثل: add expense validation بدل رسالة عامة مثل update. اجعل كل commit يصف وحدة تغيير قابلة للفهم.",
    outcome: "يستطيع شخص آخر قراءة السجل وفهم تطور المشروع دون فتح كل الملفات.",
  },
  "workflow:4": {
    what: "ارفع مشروعًا تجريبيًا إلى GitHub، ثم استنسخه في مجلد جديد وأنشئ البيئة وشغّل الاختبارات اعتمادًا على README.",
    outcome: "تتأكد أن مشروعك قابل للنقل وليس مرتبطًا بمجلد جهازك الحالي فقط.",
  },
  "algorithms:6": {
    what: "ارسم مثالًا يوضح أن الملف محفوظ في التخزين بينما العملية تستخدم الذاكرة أثناء التشغيل. لا تحتاج حفظ تفاصيل نظام التشغيل الآن.",
    outcome: "تستطيع تفسير سبب اختلاف البيانات المحفوظة عن حالة البرنامج أثناء التشغيل.",
  },
  "algorithms:7": {
    what: "تعرّف على الملف والعملية وطلب الشبكة بصورة مفاهيمية، واقرأ مثالًا بسيطًا لطلب HTTP دون بناء واجهة أو خادم.",
    outcome: "تستطيع وصف ما يحدث من تشغيل برنامج إلى قراءة ملف أو انتظار استجابة، دون التشتت في تطوير الويب.",
  },
  "ai:0": {
    what: "اطلب شرحًا لمفهوم مثل القواميس مع مثال قصير، ثم أغلق الإجابة واكتب المثال بنفسك وغيّر مدخلاته.",
    outcome: "تفهم الفكرة وتستطيع تطبيقها دون نسخ إجابة AI حرفيًا.",
  },
  "ai:1": {
    what: "اطلب من AI اقتراح حالات عادية وخاطئة وحدية لدالة كتبتها، ثم اختر الحالات المناسبة واكتب الاختبارات بنفسك.",
    outcome: "تكتشف حالات لم تفكر فيها وتفهم لماذا يختبر كل اختبار سلوكًا مهمًا.",
  },
  "ai:2": {
    what: "شارك جزءًا صغيرًا من الكود واطلب ملاحظات محددة عن الوضوح أو الخطأ، ثم تحقق من كل اقتراح بالتشغيل وقراءة التوثيق.",
    outcome: "تستفيد من المراجعة دون إدخال أسرار أو قبول تغييرات لا تستطيع شرحها.",
  },
  "ai:3": {
    what: "استخدم قاعدة المحاولة ثم التلميح ثم المراجعة: لا تطلب الحل الكامل قبل أن تكتب تصورك وتجربتك الأولى.",
    outcome: "يبقى القرار البرمجي والفهم عندك، ويصبح AI أداة تسريع لا عكازًا دائمًا.",
  },
};

const logo = "/assets/orbit-mark_ba16bbdd.png";
const heroBackground = "/assets/orbital-hero_b5be19ed.jpg";
const mapBackground = "/assets/orbital-map-texture_ac95fcc4.jpg";
const storageKey = "madar-learning-checked-steps-v2";
const fontSizeStorageKey = "madar-learning-font-size-v1";
const notesStorageKey = "madar-learning-step-notes-v1";

const fontSizes: { id: FontSize; label: string; className: string }[] = [
  { id: "small", label: "حجم خط صغير", className: "is-small" },
  { id: "normal", label: "حجم خط افتراضي", className: "is-normal" },
  { id: "large", label: "حجم خط كبير", className: "is-large" },
];

function stepKey(branchId: string, index: number) {
  return `${branchId}:${index}`;
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [activeId, setActiveId] = useState("python");
  const [openStep, setOpenStep] = useState<string | null>(null);
  const [openNote, setOpenNote] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = window.localStorage.getItem(fontSizeStorageKey);
    return saved === "small" || saved === "large" || saved === "normal" ? saved : "normal";
  });
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  });
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = window.localStorage.getItem(notesStorageKey);
      const parsed = saved ? JSON.parse(saved) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    window.localStorage.setItem(fontSizeStorageKey, fontSize);
  }, [fontSize]);

  useEffect(() => {
    window.localStorage.setItem(notesStorageKey, JSON.stringify(notes));
  }, [notes]);

  const activeBranch = useMemo(
    () => branches.find((branch) => branch.id === activeId) ?? branches[1],
    [activeId],
  );
  const totalSteps = useMemo(() => branches.reduce((sum, branch) => sum + branch.steps.length, 0), []);
  const finishedSteps = Object.values(checked).filter(Boolean).length;
  const totalProgress = Math.round((finishedSteps / totalSteps) * 100);
  const activeFinished = activeBranch.steps.filter((_, index) => checked[stepKey(activeBranch.id, index)]).length;
  const activeProgress = Math.round((activeFinished / activeBranch.steps.length) * 100);

  const toggleStep = (key: string) => {
    setChecked((current) => ({ ...current, [key]: !current[key] }));
  };

  const selectBranch = (branchId: string) => {
    setActiveId(branchId);
    setOpenStep(null);
    setOpenNote(null);
  };

  const updateNote = (key: string, value: string) => {
    setNotes((current) => ({ ...current, [key]: value }));
  };

  const resetAll = () => setChecked({});
  const resetBranch = () => {
    setChecked((current) => {
      const next = { ...current };
      activeBranch.steps.forEach((_, index) => delete next[stepKey(activeBranch.id, index)]);
      return next;
    });
  };

  return (
    <main className="simple-map-app" data-font-size={fontSize}>
      <header className="simple-header">
        <a className="brand-lockup" href="#root-map" aria-label="العودة إلى جذر الخارطة">
          <img src={logo} alt="" />
          <span><b>مدار</b> التعلّم<small>خارطة خطوات البرمجة</small></span>
        </a>
        <div className="header-actions">
          <div className="font-size-controls" role="group" aria-label="التحكم بحجم الخط">
            <span className="font-size-label">حجم الخط</span>
            {fontSizes.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`font-size-button ${option.className} ${fontSize === option.id ? "is-active" : ""}`}
                onClick={() => setFontSize(option.id)}
                aria-label={option.label}
                aria-pressed={fontSize === option.id}
                title={option.label}
              >
                أ
              </button>
            ))}
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"}
            aria-pressed={theme === "light"}
            title={theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === "dark" ? "نهاري" : "ليلي"}</span>
          </button>
          <div className="global-progress" aria-label={`تقدمك الإجمالي ${totalProgress}%`}>
            <span>{finishedSteps} / {totalSteps} خطوة</span>
            <div className="global-track"><i style={{ width: `${totalProgress}%` }} /></div>
            <strong>{totalProgress}%</strong>
            {finishedSteps > 0 && <button type="button" onClick={resetAll} title="إعادة ضبط كل التقدم"><RotateCcw size={15} /></button>}
          </div>
        </div>
      </header>

      <section className="simple-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,14,16,.96), rgba(5,14,16,.68)), url(${heroBackground})` }}>
        <div>
          <p><Sparkles size={15} /> خارطة عملية قابلة للتأشير</p>
          <h1>خطة مركزة من 12 أسبوعًا: اختر مرحلة ثم ضع صح أمام كل خطوة تنجزها.</h1>
          <span>لا تنتقل للفرع التالي إلا بعد إنهاء مشروع الفرع وخطواته الأساسية.</span>
        </div>
      </section>

      <section className="root-map" id="root-map" style={{ backgroundImage: `linear-gradient(rgba(6,17,19,.80), rgba(6,17,19,.93)), url(${mapBackground})` }} aria-labelledby="map-heading">
        <div className="map-title">
          <p><GitBranch size={15} /> الجذر والفروع</p>
          <h2 id="map-heading">مسار تعلم البرمجة</h2>
          <span>اضغط على أي فرع لفتح خطواته. المدة مرنة؛ الإنجاز والفهم أهم من التاريخ.</span>
        </div>

        <div className="root-node">
          <img src={logo} alt="" />
          <b>الجذر</b>
          <span>خطة 12 أسبوعًا: Python + علوم الحاسوب + ممارسة واعية مع AI</span>
        </div>

        <div className="branch-grid" aria-label="فروع المسار">
          {branches.map((branch) => {
            const done = branch.steps.filter((_, index) => checked[stepKey(branch.id, index)]).length;
            const progress = Math.round((done / branch.steps.length) * 100);
            const isActive = branch.id === activeBranch.id;
            const Icon = branch.icon;
            return (
              <button
                type="button"
                key={branch.id}
                className={`branch-node ${isActive ? "is-active" : ""}`}
                onClick={() => selectBranch(branch.id)}
                style={{ "--branch": branch.color } as CSSProperties}
                aria-pressed={isActive}
              >
                <span className="branch-icon"><Icon size={19} /></span>
                <span className="branch-copy"><small>مرحلة {branch.number} · {branch.weeks}</small><b>{branch.title}</b></span>
                <span className="branch-done">{done}/{branch.steps.length}</span>
                <span className="branch-bar"><i style={{ width: `${progress}%` }} /></span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="steps-section" id="steps" aria-live="polite">
        <div className="steps-intro" style={{ "--active": activeBranch.color } as CSSProperties}>
          <div className="active-stage-icon"><activeBranch.icon size={22} /></div>
          <div>
            <p>المرحلة {activeBranch.number} · {activeBranch.weeks}</p>
            <h2>{activeBranch.title}</h2>
            <span>{activeBranch.summary}</span>
          </div>
          <div className="branch-score"><b>{activeFinished}</b><span>من {activeBranch.steps.length}</span></div>
        </div>

        <article className="task-list-card">
          <div className="task-list-head">
            <div>
              <h3>خطوات الإنجاز</h3>
              <p>اضغط نص الخطوة لشرحها، واضغط مربع الصح فقط عند إتمامها. يُحفظ تقدمك تلقائيًا على هذا الجهاز.</p>
            </div>
            <div className="stage-progress"><span>{activeProgress}%</span><i><b style={{ width: `${activeProgress}%` }} /></i></div>
          </div>

          <div className="task-list">
            {activeBranch.steps.map((step, index) => {
              const key = stepKey(activeBranch.id, index);
              const isChecked = Boolean(checked[key]);
              const isOpen = openStep === key;
              const isNoteOpen = openNote === key;
              const explanation = stepExplanations[key];
              const note = notes[key] ?? "";
              const hasNote = note.trim().length > 0;
              return (
                <div key={key} className={`task-item ${isChecked ? "is-checked" : ""} ${isOpen ? "is-open" : ""} ${isNoteOpen ? "has-open-note" : ""}`}>
                  <div className="task-top">
                    <button
                      type="button"
                      className="task-complete"
                      onClick={() => toggleStep(key)}
                      aria-pressed={isChecked}
                      aria-label={isChecked ? `إلغاء إنجاز الخطوة ${index + 1}` : `وضع علامة إنجاز للخطوة ${index + 1}`}
                      title={isChecked ? "إلغاء علامة الإنجاز" : "وضع علامة إنجاز"}
                    >
                      {isChecked ? <Check size={16} /> : <Circle size={16} />}
                    </button>
                    <button
                      type="button"
                      className="task-explain"
                      onClick={() => setOpenStep((current) => current === key ? null : key)}
                      aria-expanded={isOpen}
                      aria-controls={`explanation-${key}`}
                    >
                      <span className="task-number">{String(index + 1).padStart(2, "0")}</span>
                      <span className="task-text">{step}</span>
                      <span className="explain-trigger"><Info size={14} /><b>الشرح</b><ChevronDown size={15} /></span>
                    </button>
                    <button
                      type="button"
                      className={`task-notes-toggle ${hasNote ? "has-note" : ""}`}
                      onClick={() => setOpenNote((current) => current === key ? null : key)}
                      aria-label={hasNote ? `فتح أو تعديل ملاحظتك للخطوة ${index + 1}` : `إضافة ملاحظة شخصية للخطوة ${index + 1}`}
                      aria-expanded={isNoteOpen}
                      aria-controls={`note-${key}`}
                      title={hasNote ? "تعديل ملاحظتك" : "أضف ملاحظتك"}
                    >
                      <NotebookPen size={15} />
                      <span>ملاحظة</span>
                    </button>
                    {isChecked && <CheckCircle2 className="row-done" size={17} />}
                  </div>
                  {isOpen && explanation && (
                    <div className="task-detail" id={`explanation-${key}`}>
                      <div className="detail-block">
                        <Info size={16} />
                        <div><b>ماذا تفعل؟</b><p>{explanation.what}</p></div>
                      </div>
                      <div className="detail-block detail-outcome">
                        <Target size={16} />
                        <div><b>كيف تعرف أنك أنجزتها؟</b><p>{explanation.outcome}</p></div>
                      </div>
                    </div>
                  )}
                  {isNoteOpen && (
                    <div className="task-note-panel" id={`note-${key}`}>
                      <div className="note-panel-head">
                        <div><NotebookPen size={16} /><span><b>ملاحظتك الشخصية</b><small>تُحفظ تلقائيًا على هذا الجهاز.</small></span></div>
                        {hasNote && <i>لديك ملاحظة محفوظة</i>}
                      </div>
                      <textarea
                        value={note}
                        onChange={(event) => updateNote(key, event.target.value)}
                        placeholder="اكتب ما تعلمته، رابط تمرينك، خطأ واجهته، أو ما تريد مراجعته لاحقًا..."
                        aria-label={`ملاحظتك الشخصية للخطوة ${index + 1}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <section className="project-ideas" aria-labelledby={`ideas-${activeBranch.id}`}>
            <div className="project-ideas-head">
              <div>
                <p><Sparkles size={15} /> اقتراحات تطبيقية</p>
                <h3 id={`ideas-${activeBranch.id}`}>أفكار مشاريع صغيرة لهذه المرحلة</h3>
              </div>
              <span>نفّذ فكرة واحدة فقط، واستخدم AI للتخطيط والمراجعة لا للنسخ.</span>
            </div>
            <div className="project-ideas-grid">
              {activeBranch.projectIdeas.map((idea) => (
                <article className="project-idea" key={idea.title}>
                  <h4>{idea.title}</h4>
                  <p><b>طريقة استخدام AI:</b> {idea.ai}</p>
                </article>
              ))}
            </div>
          </section>

          <footer className="task-footer">
            <div className="project-note"><Flag size={17} /><span><b>مشروع الفرع:</b> {activeBranch.project.replace("المخرج: ", "")}</span></div>
            <button type="button" className="clear-branch" onClick={resetBranch} disabled={activeFinished === 0}><RotateCcw size={15} /> إعادة خطوات الفرع</button>
          </footer>
        </article>

        <aside className="study-tip">
          <Sparkles size={19} />
          <div><b>قاعدة استخدام AI</b><span>حاول بنفسك أولًا، ثم اطلب تلميحًا واحدًا أو مراجعة؛ لا تطلب بناء الخطوة كاملةً نيابةً عنك.</span></div>
        </aside>
      </section>
    </main>
  );
}
