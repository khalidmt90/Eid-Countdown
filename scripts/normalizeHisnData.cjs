const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'client', 'src', 'data', 'hisn-raw.json');
const OUTPUT = path.join(__dirname, '..', 'client', 'src', 'data', 'hisn-al-muslim.json');

const raw = JSON.parse(fs.readFileSync(INPUT, 'utf8'));

function stripDiacritics(text) {
  return (text || '')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0610-\u061A]/g, '')
    .replace(/ـ/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const CATEGORY_MAP = {
  'استيقاظ': 'أذكار الاستيقاظ',
  'الصباح': 'أذكار الصباح',
  'المساء': 'أذكار المساء',
  'النوم': 'أذكار النوم',
  'تقلب ليلا': 'أذكار النوم',
  'الفزع في النوم': 'أذكار النوم',
  'الرؤيا': 'أذكار النوم',
  'قنوت الوتر': 'أذكار بعد الصلاة',
  'عقب السلام من الوتر': 'أذكار بعد الصلاة',
  'دخول المنزل': 'دعاء دخول المنزل',
  'دخول المسجد': 'أذكار الصلاة',
  'الخروج من المسجد': 'أذكار الصلاة',
  'الخروج من المنزل': 'دعاء الخروج من المنزل',
  'الخلاء': 'أدعية متنوعة',
  'الوضوء': 'أدعية متنوعة',
  'الاذان': 'أذكار الأذان',
  'الأذان': 'أذكار الأذان',
  'الاستفتاح': 'أذكار الصلاة',
  'الركوع': 'أذكار الصلاة',
  'السجود': 'أذكار الصلاة',
  'التشهد': 'أذكار الصلاة',
  'الصلاة على النبي': 'أذكار الصلاة',
  'قبل السلام': 'أذكار الصلاة',
  'بعد السلام': 'أذكار بعد الصلاة',
  'الاستخارة': 'أدعية متنوعة',
  'السفر': 'دعاء السفر',
  'الركوب': 'دعاء السفر',
  'دخول القرية': 'دعاء السفر',
  'دخول السوق': 'أدعية متنوعة',
  'الطعام': 'أذكار الطعام',
  'الفراغ من الطعام': 'أذكار الطعام',
  'الضيف': 'أذكار الطعام',
  'سقاه': 'أذكار الطعام',
  'افطار': 'أذكار الطعام',
  'إفطار': 'أذكار الطعام',
  'الصائم': 'أذكار الطعام',
  'باكورة': 'أذكار الطعام',
  'الهم': 'أدعية الهم والكرب',
  'الكرب': 'أدعية الهم والكرب',
  'العدو': 'أدعية متنوعة',
  'السلطان': 'أدعية متنوعة',
  'خاف': 'أدعية متنوعة',
  'شك': 'أدعية متنوعة',
  'الدين': 'أدعية متنوعة',
  'الوسوسة': 'أدعية متنوعة',
  'الشيطان': 'أدعية متنوعة',
  'اذنب': 'أدعية التوبة والاستغفار',
  'أذنب': 'أدعية التوبة والاستغفار',
  'المريض': 'دعاء المريض',
  'عيادة': 'دعاء المريض',
  'يئس': 'دعاء المريض',
  'المحتضر': 'أدعية متنوعة',
  'مصيبة': 'أدعية متنوعة',
  'الميت': 'أدعية متنوعة',
  'القبر': 'أدعية متنوعة',
  'التعزية': 'أدعية متنوعة',
  'الريح': 'أدعية متنوعة',
  'الرعد': 'أدعية متنوعة',
  'المطر': 'أدعية متنوعة',
  'الاستسقاء': 'أدعية متنوعة',
  'الهلال': 'أدعية متنوعة',
  'العطاس': 'أدعية متنوعة',
  'المتزوج': 'أدعية متنوعة',
  'الزوجة': 'أدعية متنوعة',
  'الغضب': 'أدعية متنوعة',
  'مبتلى': 'أدعية متنوعة',
  'المجلس': 'أدعية متنوعة',
  'الدجال': 'أدعية متنوعة',
  'الشرك': 'أدعية متنوعة',
  'الطيرة': 'أدعية متنوعة',
  'المولود': 'أدعية متنوعة',
  'الأولاد': 'أدعية متنوعة',
  'الثوب': 'أدعية متنوعة',
  'لبس': 'أدعية متنوعة',
};

function mapCategory(rawCatName) {
  const plain = stripDiacritics(rawCatName);
  
  if (plain.includes('استيقاظ')) return 'أذكار الاستيقاظ';
  if (plain.includes('الصباح')) return 'أذكار الصباح';
  if (plain.includes('المساء')) return 'أذكار المساء';
  if (plain.includes('النوم') || plain.includes('تقلب ليلا') || plain.includes('الفزع في النوم') || plain.includes('الرؤيا') || plain.includes('الحلم')) return 'أذكار النوم';
  if (plain.includes('دخول') && plain.includes('منزل')) return 'دعاء دخول المنزل';
  if (plain.includes('خروج') && plain.includes('منزل')) return 'دعاء الخروج من المنزل';
  if (plain.includes('السفر') || plain.includes('الركوب') || plain.includes('دخول القرية') || plain.includes('المركوب') || plain.includes('المسافر')) return 'دعاء السفر';
  if (plain.includes('الطعام') || plain.includes('افطار') || plain.includes('إفطار') || plain.includes('الصائم') || plain.includes('باكورة') || plain.includes('الضيف') || plain.includes('سقاه')) return 'أذكار الطعام';
  if (plain.includes('بعد السلام') || plain.includes('بعد الصلاة') || plain.includes('الوتر') || plain.includes('قنوت')) return 'أذكار بعد الصلاة';
  if (plain.includes('الاذان') || plain.includes('الأذان')) return 'أذكار الأذان';
  if (plain.includes('الصلاة') || plain.includes('الاستفتاح') || plain.includes('الركوع') || plain.includes('السجود') || plain.includes('التشهد') || plain.includes('النبي') || plain.includes('قبل السلام') || plain.includes('المسجد') || plain.includes('الجلسة بين')) return 'أذكار الصلاة';
  if (plain.includes('الهم') || plain.includes('الكرب') || plain.includes('الحزن')) return 'أدعية الهم والكرب';
  if (plain.includes('المريض') || plain.includes('عيادة') || plain.includes('يئس')) return 'دعاء المريض';
  if (plain.includes('الخلاء') || plain.includes('الوضوء')) return 'أذكار الطهارة';
  if (plain.includes('الثوب') || plain.includes('لبس')) return 'أدعية متنوعة';
  
  return 'أدعية متنوعة';
}

function isQuranOnly(text, reference) {
  if (!text) return false;
  const combined = text + ' ' + (reference || '');
  if (/سورة\s/.test(combined) && /آية/.test(combined)) return true;
  if (text.includes('صدق الله العظيم')) return true;
  if (/^[\s۝٠-٩\d\(\)\[\]﴿﴾]+$/.test(text.replace(/[\u0600-\u06FF\s]/g, ''))) return false;
  return false;
}

const results = [];
let id = 1;

for (const [catName, catData] of Object.entries(raw)) {
  const category = mapCategory(catName);
  const adhkarList = catData.Adhkar || [];
  
  for (const item of adhkarList) {
    const text = (item.Text || '').trim();
    const reference = (item.Reference || '').trim();
    const count = item.Count || 1;
    
    if (!text) continue;
    if (isQuranOnly(text, reference)) continue;
    
    results.push({
      id: `hisn-${id}`,
      category,
      title: stripDiacritics(catName),
      text,
      repeat: count,
      source: reference || '',
    });
    id++;
  }
}

fs.writeFileSync(OUTPUT, JSON.stringify(results, null, 2), 'utf8');

const catCounts = {};
results.forEach(r => catCounts[r.category] = (catCounts[r.category] || 0) + 1);
console.log('Total duas:', results.length);
console.log('Categories:', catCounts);
console.log('\nSample items:');
const seen = new Set();
for (const r of results) {
  if (!seen.has(r.category) && seen.size < 5) {
    seen.add(r.category);
    console.log(`\n[${r.category}] ${r.title}`);
    console.log(`  Text: ${r.text.substring(0, 80)}...`);
    console.log(`  Source: ${r.source}`);
    console.log(`  Repeat: ${r.repeat}`);
  }
}
