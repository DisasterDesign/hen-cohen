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
    slug: "the-weight-of-silence",
    title: {
      he: "משקל השתיקה",
      en: "The Weight of Silence",
    },
    description: {
      he: "סיפור על חוסן מול אובדן",
      en: "A story of resilience in the face of loss",
    },
    synopsis: {
      he: "סרט דוקומנטרי שעוקב אחרי שלוש נשים מדורות שונות, כולן מתמודדות עם אובדן בדרכן הייחודית. הסרט חוקר כיצד שתיקה יכולה להיות מקור של כוח ושל כאב גם יחד — וכיצד שבירתה יכולה להוביל לריפוי.",
      en: "A documentary following three women from different generations, each dealing with loss in their own unique way. The film explores how silence can be both a source of strength and pain — and how breaking it can lead to healing.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2025,
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&h=900&fit=crop",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    credits: [
      { he: "במאית ומפיקה: חן כהן", en: "Director & Producer: Hen Cohen" },
      { he: "צילום: חן כהן", en: "Cinematography: Hen Cohen" },
      { he: "עריכה: חן כהן", en: "Editing: Hen Cohen" },
    ],
  },
  {
    slug: "between-the-lines",
    title: {
      he: "בין השורות",
      en: "Between the Lines",
    },
    description: {
      he: "מורים שמשנים הכל",
      en: "Teachers who change everything",
    },
    synopsis: {
      he: "מבט אינטימי על שלושה מורים בבתי ספר בפריפריה שמסרבים לוותר על התלמידים שלהם. הסרט חושף את הרגעים הקטנים שבהם מורה הופך למישהו שמשנה חיים — ושואל מה המחיר האישי של המסירות הזו.",
      en: "An intimate look at three teachers in underprivileged schools who refuse to give up on their students. The film reveals the small moments where a teacher becomes someone who changes lives — and asks what the personal cost of that devotion truly is.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2024,
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=900&fit=crop",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    credits: [
      { he: "במאית: חן כהן", en: "Director: Hen Cohen" },
      { he: "צילום: חן כהן", en: "Cinematography: Hen Cohen" },
      { he: "עריכה: חן כהן", en: "Editing: Hen Cohen" },
    ],
  },
  {
    slug: "roots",
    title: {
      he: "שורשים",
      en: "Roots",
    },
    description: {
      he: "זהות לאורך דורות",
      en: "Identity through generations",
    },
    synopsis: {
      he: "מסע בין שלושה דורות של משפחה אחת — סבתא, אם ובת — שכל אחת מהן מגדירה את הזהות שלה אחרת. הסרט בוחן כיצד מורשת תרבותית עוברת, משתנה ולפעמים נשברת בין דור לדור.",
      en: "A journey across three generations of one family — grandmother, mother, and daughter — each defining identity differently. The film examines how cultural heritage is passed down, transformed, and sometimes broken between generations.",
    },
    category: {
      he: "סרט דוקומנטרי",
      en: "Documentary Film",
    },
    year: 2023,
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&h=900&fit=crop",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    credits: [
      { he: "במאית ומפיקה: חן כהן", en: "Director & Producer: Hen Cohen" },
      { he: "צילום: חן כהן", en: "Cinematography: Hen Cohen" },
    ],
  },
  {
    slug: "still-moving",
    title: {
      he: "עדיין בתנועה",
      en: "Still Moving",
    },
    description: {
      he: "ריקוד כשפת ריפוי",
      en: "Dance as a language of healing",
    },
    synopsis: {
      he: "סרט על קבוצת נשים שמשתמשות בריקוד כדרך להתמודד עם טראומה. דרך התנועה, הן מוצאות דרך לבטא את מה שמילים לא מצליחות. הסרט מלווה אותן לאורך שנה של שינוי פנימי עמוק.",
      en: "A film about a group of women who use dance to cope with trauma. Through movement, they find a way to express what words cannot. The film follows them over a year of profound inner transformation.",
    },
    category: {
      he: "סרט דוקומנטרי קצר",
      en: "Short Documentary",
    },
    year: 2023,
    thumbnail: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=1600&h=900&fit=crop",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    credits: [
      { he: "במאית, צלמת ועורכת: חן כהן", en: "Director, Cinematographer & Editor: Hen Cohen" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
