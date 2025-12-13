export interface DailyContent {
  ayah: {
    text: string;
    surah: string;
    verseNumber: number;
    translation: string;
    tafsir: string;
    source: string;
  };
  hadith: {
    text: string;
    narrator: string;
    source: string; // e.g., Sahih Bukhari 123
    context: string;
    lesson: string;
  };
  prophetStory: {
    title: string;
    prophet: string;
    story: string;
    lesson: string;
    source: string;
  };
}

export const DAILY_CONTENT: DailyContent[] = [
  {
    ayah: {
      text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْqayyūm ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
      surah: "البقرة",
      verseNumber: 255,
      translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
      tafsir: "آية الكرسي هي أعظم آية في كتاب الله، تدل على وحدانية الله وقيوميته وعظمته التي لا تحدها حدود.",
      source: "مجمع الملك فهد لطباعة المصحف الشريف"
    },
    hadith: {
      text: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      narrator: "أنس بن مالك",
      source: "صحيح البخاري 13",
      context: "حديث عظيم يبين ركيزة أساسية في الإيمان وتماسك المجتمع المسلم.",
      lesson: "الإيثار وحب الخير للناس من كمال الإيمان، وهو طريق لنشر المحبة والسلام في المجتمع."
    },
    prophetStory: {
      title: "صبر أيوب عليه السلام",
      prophet: "أيوب",
      story: "كان أيوب عليه السلام غاية في الصبر، فقد ابتلاه الله في ماله وولده وجسده، فصبر واحتسب ولم يزدد إلا حمداً لله، حتى كشف الله ضره وأبدله خيراً.",
      lesson: "الصبر مفتاح الفرج، وأن الله يبتلي عباده الصالحين ليرفع درجاتهم.",
      source: "قصص الأنبياء لابن كثير"
    }
  },
  {
    ayah: {
      text: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
      surah: "طه",
      verseNumber: 114,
      translation: "And say, 'My Lord, increase me in knowledge.'",
      tafsir: "أمر الله نبيه بطلب الزيادة في العلم، ولم يأمره بطلب الزيادة في شيء من الدنيا إلا العلم، لما فيه من الخير والرفعة.",
      source: "مجمع الملك فهد لطباعة المصحف الشريف"
    },
    hadith: {
      text: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      narrator: "عمر بن الخطاب",
      source: "صحيح البخاري 1",
      context: "هذا الحديث هو ميزان الأعمال الباطنة، وعليه مدار الإسلام.",
      lesson: "وجوب إخلاص النية لله في كل عمل، وأن العبرة في القبول بما وقر في القلب."
    },
    prophetStory: {
      title: "سفينة نوح عليه السلام",
      prophet: "نوح",
      story: "دعا نوح قومه ألف سنة إلا خمسين عاماً، فكذبوه وسخروا منه، فأمره الله ببناء السفينة في الصحراء، لتكون نجاة للمؤمنين وهلاكاً للكافرين بالطوفان.",
      lesson: "الثبات على الحق مهما طال الزمن وكثر المعاندون، وأن العاقبة للمتقين.",
      source: "قصص الأنبياء لابن كثير"
    }
  },
  {
    ayah: {
      text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
      surah: "البقرة",
      verseNumber: 153,
      translation: "Indeed, Allah is with the patient.",
      tafsir: "معية الله الخاصة للصابرين بالتأييد والنصر والتوفيق، وهي تسلية للمؤمنين عند المصائب.",
      source: "مجمع الملك فهد لطباعة المصحف الشريف"
    },
    hadith: {
      text: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
      narrator: "أبو ذر الغفاري",
      source: "سنن الترمذي (حسن صحيح)",
      context: "تشجيع على مكارم الأخلاق وحسن المعاملة بأيسر الطرق.",
      lesson: "فعل الخير لا يقتصر على المال، بل يشمل الكلمة الطيبة والوجه البشوش."
    },
    prophetStory: {
      title: "حلم إبراهيم عليه السلام",
      prophet: "إبراهيم",
      story: "رأى إبراهيم في المنام أنه يذبح ابنه إسماعيل، فاستجاب الاثنان لأمر الله، وفداه الله بذبح عظيم، لتصبح سنة الأضحية.",
      lesson: "تمام التسليم لأمر الله وطاعته، وأن من ترك شيئاً لله عوضه الله خيراً منه.",
      source: "قصص الأنبياء لابن كثير"
    }
  }
];

export function getDailyContent(): DailyContent {
  // Deterministic rotation based on day of year
  const startOfYear = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date().getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  return DAILY_CONTENT[dayOfYear % DAILY_CONTENT.length];
}
