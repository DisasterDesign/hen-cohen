export interface Project {
  slug: string;
  title: { he: string; en: string };
  description: { he: string; en: string };
  synopsis: { he: string; en: string };
  category: { he: string; en: string };
  year: number;
  thumbnail: string;
  heroImage: string;
  videoEmbedUrl?: string;
  credits?: { he: string; en: string }[];
}

export const projects: Project[] = [
  {
    slug: "mia-alhalel-biohacking",
    title: {
      he: "מסע הביו-האקינג של מיה אלחלל",
      en: "Mia Alhalel's Biohacking Journey",
    },
    description: {
      he: "ממחלה מיסתורית להחלמה ופיתוח פרוטוקול לחוסן בריאותי",
      en: "From mysterious illness to recovery and a health resilience protocol",
    },
    synopsis: {
      he: "הסרט עוקב אחרי מיה אלחלל במסע האישי שלה — ממחלה מיסתורית שהפכה את חייה, דרך תהליך החלמה עצמאי, ועד לפיתוח פרוטוקול ייחודי לחוסן בריאותי. סיפור על גוף, רצון וביו-האקינג.",
      en: "The film follows Mia Alhalel on her personal journey — from a mysterious illness that upended her life, through an independent recovery process, to developing a unique health resilience protocol. A story about body, will, and biohacking.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/GzucmfaxtoA/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/GzucmfaxtoA/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/GzucmfaxtoA",
    credits: [
      { he: "במאית וצלמת: חן אופיר כהן", en: "Director & Cinematographer: Hen Ofir Cohen" },
      { he: "עריכה: חן אופיר כהן", en: "Editing: Hen Ofir Cohen" },
    ],
  },
  {
    slug: "the-working-cowboy",
    title: {
      he: "The Working Cowboy: מורשת של חינוך",
      en: "The Working Cowboy: A Legacy of Education",
    },
    description: {
      he: "מורשת של חינוך דרך עבודה עם סוסים",
      en: "A legacy of education through working with horses",
    },
    synopsis: {
      he: "סיפורו של קאובוי עובד שהפך את אהבתו לסוסים ולעבודת האדמה למורשת חינוכית. הסרט חושף עולם של ערכים, קשר לטבע וחינוך דרך עשייה — מורשת שעוברת מדור לדור.",
      en: "The story of a working cowboy who turned his love for horses and the land into an educational legacy. The film reveals a world of values, connection to nature, and education through action — a legacy passed down through generations.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/uXQ5kOPrT_o/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/uXQ5kOPrT_o/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/uXQ5kOPrT_o",
    credits: [
      { he: "במאית וצלמת: חן אופיר כהן", en: "Director & Cinematographer: Hen Ofir Cohen" },
      { he: "עריכה: חן אופיר כהן", en: "Editing: Hen Ofir Cohen" },
    ],
  },
  {
    slug: "hava-and-ariel-wedding",
    title: {
      he: "חוה ואריאל: החתונה",
      en: "Hava & Ariel: The Wedding",
    },
    description: {
      he: "סיפור אהבה ביום המיוחד",
      en: "A love story on their special day",
    },
    synopsis: {
      he: "תיעוד קולנועי של החתונה של חוה ואריאל — רגעים של אהבה, משפחה וחגיגה. הסרט מלווה את הזוג לאורך היום המיוחד שלהם, ולוכד את הרגשות, הפרטים הקטנים והרגעים שמגדירים את תחילת החיים המשותפים.",
      en: "A cinematic documentation of Hava and Ariel's wedding — moments of love, family, and celebration. The film follows the couple throughout their special day, capturing the emotions, small details, and moments that define the beginning of a shared life.",
    },
    category: {
      he: "סרט חתונה",
      en: "Wedding Film",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/WtJ1QdWV7Tg/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/WtJ1QdWV7Tg/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/WtJ1QdWV7Tg",
    credits: [
      { he: "צילום ועריכה: חן אופיר כהן", en: "Cinematography & Editing: Hen Ofir Cohen" },
    ],
  },
  {
    slug: "yaaleh-or-synergetic-architecture",
    title: {
      he: "יעלה אור: המהות של אדריכלות סינרגית",
      en: "Yaaleh Or: The Essence of Synergetic Architecture",
    },
    description: {
      he: "המהות של אדריכלות סינרגית",
      en: "The essence of synergetic architecture",
    },
    synopsis: {
      he: "הסרט חוקר את עולמה של יעלה אור ואת הגישה הייחודית שלה לאדריכלות סינרגית — אדריכלות שמחברת בין אדם, מרחב וטבע. מבט מעמיק על תהליך היצירה, הפילוסופיה והמבנים שנולדים ממנה.",
      en: "The film explores the world of Yaaleh Or and her unique approach to synergetic architecture — architecture that connects people, space, and nature. An in-depth look at the creative process, philosophy, and structures born from it.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/8ClVr2IFkrk/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/8ClVr2IFkrk/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/8ClVr2IFkrk",
    credits: [
      { he: "במאית וצלמת: חן אופיר כהן", en: "Director & Cinematographer: Hen Ofir Cohen" },
      { he: "עריכה: חן אופיר כהן", en: "Editing: Hen Ofir Cohen" },
    ],
  },
  {
    slug: "simply-being-yom-kippur-retreat",
    title: {
      he: "פשוט להיות: רגעים של נשימה בריטריט יום כיפור",
      en: "Simply Being: Moments of Breath in a Yom Kippur Retreat",
    },
    description: {
      he: "רגעים של נשימה בריטריט יום כיפור | אלאיה",
      en: "Moments of breath in a Yom Kippur retreat | Alaia",
    },
    synopsis: {
      he: "הסרט מתעד ריטריט יום כיפור של אלאיה — חוויה של שקט, נשימה והתבוננות פנימית. בין מדיטציה לתנועה, המשתתפים מוצאים רגעים של חיבור לעצמם ולרגע הנוכחי. סרט על פשטות, נוכחות ומשמעות.",
      en: "The film documents an Alaia Yom Kippur retreat — an experience of silence, breath, and inner reflection. Between meditation and movement, participants find moments of connection to themselves and the present. A film about simplicity, presence, and meaning.",
    },
    category: {
      he: "סרט דוקומנטרי קצר",
      en: "Short Documentary",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/3K37gbk25oY/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/3K37gbk25oY/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/3K37gbk25oY",
    credits: [
      { he: "במאית, צלמת ועורכת: חן אופיר כהן", en: "Director, Cinematographer & Editor: Hen Ofir Cohen" },
    ],
  },
  {
    slug: "the-medical-mission",
    title: {
      he: "המשימה הרפואית: BFL מארחת מנתחים מהעולם למען ותיקים קטועי גפיים",
      en: "The Medical Mission: BFL Hosting World Surgeons for Amputee Veterans",
    },
    description: {
      he: "משימה רפואית בינלאומית למען ותיקים קטועי גפיים",
      en: "An international medical mission for amputee veterans",
    },
    synopsis: {
      he: "הסרט מתעד משימה רפואית ייחודית שבה ארגון BFL מארח מנתחים מובילים מרחבי העולם כדי לטפל בחיילים ותיקים קטועי גפיים. סיפור על תקווה, רפואה ושיתוף פעולה בינלאומי.",
      en: "The film documents a unique medical mission in which BFL hosts leading surgeons from around the world to treat amputee veterans. A story of hope, medicine, and international collaboration.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/fao56-bSsd0/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/fao56-bSsd0/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/fao56-bSsd0",
    credits: [
      { he: "במאית וצלמת: חן אופיר כהן", en: "Director & Cinematographer: Hen Ofir Cohen" },
      { he: "עריכה: חן אופיר כהן", en: "Editing: Hen Ofir Cohen" },
    ],
  },
  {
    slug: "the-jewish-soul",
    title: {
      he: "הנשמה היהודית",
      en: "The Jewish Soul",
    },
    description: {
      he: "מסע אל עומק הנשמה היהודית",
      en: "A journey into the depth of the Jewish soul",
    },
    synopsis: {
      he: "הסרט מתעד מסע אל עומק הנשמה היהודית — חיבור בין מסורת, זהות ורוחניות. דרך דמויות ורגעים, הסרט חוקר את השאלות הגדולות של שייכות, אמונה ומשמעות.",
      en: "The film documents a journey into the depth of the Jewish soul — a connection between tradition, identity, and spirituality. Through characters and moments, the film explores the big questions of belonging, faith, and meaning.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/BOs1EbcyPx0/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/BOs1EbcyPx0/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/BOs1EbcyPx0",
    credits: [
      { he: "במאית וצלמת: חן אופיר כהן", en: "Director & Cinematographer: Hen Ofir Cohen" },
      { he: "עריכה: חן אופיר כהן", en: "Editing: Hen Ofir Cohen" },
    ],
  },
  {
    slug: "bfl-vienna-marathon",
    title: {
      he: "BFL מרתון וינה",
      en: "BFL Vienna Marathon",
    },
    description: {
      he: "מרתון וינה עם לוחמי BFL",
      en: "Vienna Marathon with BFL warriors",
    },
    synopsis: {
      he: "הסרט מלווה את לוחמי BFL במרתון וינה — מסע של התגברות, נחישות וכוח רצון. מהאימונים ועד קו הסיום, הסרט מתעד את הרגעים שבהם הגוף והנפש נפגשים באתגר.",
      en: "The film follows BFL warriors at the Vienna Marathon — a journey of overcoming, determination, and willpower. From training to the finish line, the film captures the moments where body and spirit meet the challenge.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/VDUG0eCMfuw/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/VDUG0eCMfuw/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/VDUG0eCMfuw",
    credits: [
      { he: "במאית וצלמת: חן אופיר כהן", en: "Director & Cinematographer: Hen Ofir Cohen" },
      { he: "עריכה: חן אופיר כהן", en: "Editing: Hen Ofir Cohen" },
    ],
  },
  {
    slug: "bfl-warriors-weightless",
    title: {
      he: "לוחמי BFL — חסרי משקל",
      en: "BFL Warriors - Weightless",
    },
    description: {
      he: "לוחמים שמתעלים מעל המגבלות",
      en: "Warriors who rise above limitations",
    },
    synopsis: {
      he: "הסרט עוקב אחרי לוחמי BFL בחוויה ייחודית של חוסר משקל — רגע שבו הגוף משתחרר מהמגבלות הפיזיות. סיפור על חופש, כוח פנימי והיכולת להתעלות מעל כל מכשול.",
      en: "The film follows BFL warriors in a unique weightless experience — a moment where the body is freed from physical limitations. A story about freedom, inner strength, and the ability to rise above every obstacle.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2025,
    thumbnail: "https://img.youtube.com/vi/tBv7n15X9as/maxresdefault.jpg",
    heroImage: "https://img.youtube.com/vi/tBv7n15X9as/maxresdefault.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/tBv7n15X9as",
    credits: [
      { he: "במאית וצלמת: חן אופיר כהן", en: "Director & Cinematographer: Hen Ofir Cohen" },
      { he: "עריכה: חן אופיר כהן", en: "Editing: Hen Ofir Cohen" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
