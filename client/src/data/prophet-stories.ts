export interface ProphetStory {
  title: string;
  prophet: string;
  story: string;
  quranReference: string;
  quranCitation: string;
  source: string;
  sourceUrl: string;
}

export interface ProphetStoryEntry {
  id: string;
  ar: ProphetStory;
  en: ProphetStory;
}

export const PROPHET_STORIES: ProphetStoryEntry[] = [
  {
    "id": "1",
    "ar": {
      "title": "حلم يوسف وتحققه",
      "prophet": "يوسف",
      "story": "تبدأ قصة يوسف عليه السلام برؤيا، وتنتهي بتأويلها، وبين البداية والنهاية رحلة طويلة من الابتلاءات التي تصهر المعادن. رأى يوسف وهو صغير أحد عشر كوكباً والشمس والقمر له ساجدين، فكانت بشارة بنبوة وملك.\n\nلكن الطريق لم يكن مفروشاً بالورود؛ فقد بدأ بمحنة حسد إخوته وإلقائه في غيابات الجب وحيداً، ثم بيعه بثمن بخس، ثم محنة فتنة امرأة العزيز التي راودته عن نفسه فاستعصم واختار السجن على المعصية، فلبث فيه بضع سنين مظلوماً.\n\nفي كل هذه المحطات، لم يفقد يوسف ثقته بالله، ولم يتخلى عن إحسانه، حتى وهو في السجن كان يدعو إلى الله ويعبر الرؤى. شاءت إرادة الله أن يخرج من السجن عزيزاً على مصر، ومككيناً في الأرض، ليجمع الله شمله بأهله ويتحقق حلمه القديم.",
      "quranReference": "وَرَفَعَ أَبَوَيْهِ عَلَى الْعَرْشِ وَخَرُّوا لَهُ سُجَّدًا",
      "quranCitation": "سورة يوسف: 100",
      "source": "الرئاسة العامة",
      "sourceUrl": "https://www.alifta.gov.sa"
    },
    "en": {
      "title": "Joseph's Dream",
      "prophet": "Joseph (Yusuf)",
      "story": "The story of Joseph begins with a dream of eleven stars prostrating to him. His journey involved trials: envy of his brothers, the well, slavery, and prison.\n\nThrough all this, Joseph remained patient and trusted Allah. Eventually, he became a powerful minister in Egypt and reunited with his family, fulfilling the dream. It teaches that patience and piety lead to victory.",
      "quranReference": "And he raised his parents upon the throne...",
      "quranCitation": "Surah Yusuf: 100",
      "source": "General Presidency",
      "sourceUrl": "https://www.alifta.gov.sa"
    }
  },
  {
    "id": "2",
    "ar": {
      "title": "رحلة موسى والخضر",
      "prophet": "موسى",
      "story": "قام موسى عليه السلام خطيباً في بني إسرائيل، فسئل: \"أي الناس أعلم؟\" فقال: \"أنا\"، فعاتبه الله إذ لم يرد العلم إليه، وأوحى إليه أن عبداً من عبادنا بمجمع البحرين هو أعلم منك.\n          \nانطلق موسى بتواضع الطالب ومعه فتاه يوشع بن نون. ولما لقيا الخضر، قال له موسى بأدب جم: \"هل أتبعك على أن تعلمن مما علمت رشدا؟\".\n          \nبدأت الرحلة العجيبة، ورأى موسى أحداثاً لا يطيقها صبره: خرق سفينة لمساكين أكرموهما، وقتل غلام بريء، وبناء جدار لقوم بخلاء.\n          \nوفي كل مرة كان يعترض، فيذكره الخضر بالشرط. وفي النهاية، كشف له الخضر الحكمة الإلهية: السفينة كانت ستؤخذ غصباً، والغلام كان سيرهق أبويه طغياناً، والجدار كان تحته كنز ليتيمين.\n          \nالقصة تعلمنا أن أقدار الله، وإن بدت مؤلمة في ظاهرها، فإنها تحمل في طياتها الرحمة واللطف الخفي.",
      "quranReference": "هَلْ أَتَّبِعُكَ عَلَىٰ أَن تُعَلِّمَنِ مِمَّا عُلِّمْتَ رُشْدًا",
      "quranCitation": "سورة الكهف: 66",
      "source": "الرئاسة العامة",
      "sourceUrl": "https://www.alifta.gov.sa"
    },
    "en": {
      "title": "Moses and Al-Khidr's Journey",
      "prophet": "Moses (Musa)",
      "story": "Moses was asked who is the most knowledgeable. He said \"I am,\" so Allah taught him humility by showing him Al-Khidr. Moses witnessed puzzling events: a damaged ship, a killed boy, and a repaired wall. Al-Khidr later explained the divine wisdom behind each.\n\nThe story teaches that Allah's decrees, though seemingly painful, contain hidden mercy and wisdom.",
      "quranReference": "May I follow you that you teach me guidance?",
      "quranCitation": "Surah Al-Kahf: 66",
      "source": "General Presidency",
      "sourceUrl": "https://www.alifta.gov.sa"
    }
  },
  {
    "id": "3",
    "ar": {
      "title": "ابتلاء إبراهيم بالنار",
      "prophet": "إبراهيم",
      "story": "عندما حطم إبراهيم عليه السلام الأصنام، غضب قومه غضباً شديداً وقرروا حرقه. جمعوا الحطب الكثير حتى إن الطيور كانت تحترق من شدة حرارة النار وهي تحلق فوقها.\n\nوضعوا إبراهيم في منجنيق ورموه في النار العظيمة. في هذه اللحظة الحرجة، عرض جبريل عليه السلام على إبراهيم المساعدة، لكن إبراهيم قال كلمته الخالدة: \"حسبي الله ونعم الوكيل\".\n\nفأمر الله النار قائلاً: \"يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ\". فصارت النار برداً وسلاماً عليه، لم تحرق منه إلا وثاقه.\n\nخرج إبراهيم من النار سالماً معافى، والنار التي أرادوا أن تكون عذاباً له صارت برهاناً على صدق دعوته. هذه القصة تعلمنا أن من توكل على الله حق التوكل، كفاه الله ما أهمه وحوّل محنته إلى منحة.",
      "quranReference": "يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ",
      "quranCitation": "سورة الأنبياء: 69",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Abraham in the Fire",
      "prophet": "Abraham (Ibrahim)",
      "story": "When Abraham destroyed the idols, his people were enraged and decided to burn him. They gathered so much firewood that birds flying overhead were burned by the heat.\n\nThey placed Abraham in a catapult and threw him into the great fire. Gabriel offered help, but Abraham said: \"Allah is sufficient for me, and He is the best Guardian.\"\n\nAllah commanded: \"O fire, be coolness and safety for Abraham.\" The fire became cool and safe for him, burning only his bindings.\n\nAbraham emerged unharmed. The fire meant to punish him became proof of his truth. This story teaches that whoever truly relies on Allah, He will suffice him and turn trials into blessings.",
      "quranReference": "O fire, be coolness and safety for Abraham",
      "quranCitation": "Surah Al-Anbiya: 69",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "4",
    "ar": {
      "title": "نجاة نوح من الطوفان",
      "prophet": "نوح",
      "story": "دعا نوح عليه السلام قومه تسعمائة وخمسين سنة، فلم يؤمن معه إلا قليل. استهزأوا به وسخروا منه عندما أمره الله ببناء السفينة في الصحراء، بعيداً عن البحر.\n\nظل نوح يبني السفينة بإتقان، والكفار يمرون به يسخرون: \"صرت نجاراً بعد أن كنت نبياً؟\" لكنه لم يتوقف، لأنه يعمل بأمر الله لا بآراء الناس.\n\nلما اكتملت السفينة، جاء أمر الله: \"احْمِلْ فِيهَا مِن كُلٍّ زَوْجَيْنِ اثْنَيْنِ\". وفار التنور علامة على بدء الطوفان. ركب نوح ومن معه من المؤمنين، وبدأ الماء ينهمر من السماء وينبع من الأرض.\n\nنادى نوح ابنه الكافر: \"يَا بُنَيَّ ارْكَب مَّعَنَا\"، لكن الابن رفض معتمداً على الجبل. فأغرقه الله، وجاء الموج حائلاً بينهما.\n\nنجا نوح ومن معه من المؤمنين، وهلك الكافرون جميعاً. استقرت السفينة على الجودي، ونزل الأمر بالهبوط بسلام.\n\nالقصة تعلمنا: الطاعة لله نجاة وإن بدت غريبة في أعين الناس، والمعصية هلاك وإن اعتمد صاحبها على الأسباب الظاهرة.",
      "quranReference": "وَنَادَىٰ نُوحٌ ابْنَهُ وَكَانَ فِي مَعْزِلٍ",
      "quranCitation": "سورة هود: 42",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Noah's Salvation from the Flood",
      "prophet": "Noah (Nuh)",
      "story": "Noah called his people for 950 years, but only a few believed. They mocked him when Allah commanded him to build the ark in the desert, far from any sea.\n\nNoah continued building with precision while disbelievers passed by mocking: \"You became a carpenter after being a prophet?\" But he didn't stop, for he worked by Allah's command, not people's opinions.\n\nWhen the ark was complete, Allah's command came: \"Carry in it two of every kind.\" The oven overflowed as a sign of the flood's beginning. Noah and the believers boarded, and water poured from the sky and gushed from the earth.\n\nNoah called his disbelieving son: \"O my son, come aboard with us!\" But the son refused, relying on the mountain. Allah drowned him.\n\nNoah and the believers were saved, while all disbelievers perished. The ark settled on Mount Judi.\n\nThe lesson: Obedience to Allah is salvation even if it seems strange to people, and disobedience is destruction even if one relies on apparent means.",
      "quranReference": "And Noah called to his son who was in isolation",
      "quranCitation": "Surah Hud: 42",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "5",
    "ar": {
      "title": "صبر أيوب على البلاء",
      "prophet": "أيوب",
      "story": "كان أيوب عليه السلام نبياً كريماً، ذا مال وولد وصحة. فابتلاه الله ابتلاءً عظيماً: ذهب ماله، ومات أولاده، وأصابه مرض شديد في جسده، حتى لم يبق من جسده عضو سليم إلا قلبه ولسانه اللذان يذكر بهما الله.\n\nطال البلاء ثماني عشرة سنة، حتى تركه الناس واستوحشوا منه، إلا امرأته الصابرة التي بقيت تخدمه وتقوم عليه.\n\nومع كل هذا البلاء، لم يتسخط أيوب ولم يشتكِ، بل ظل شاكراً ذاكراً لله. وعندما دعا ربه قال: \"أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ\"، ولم يقل \"اكشف عني\"، بل فوض الأمر لله.\n\nفاستجاب الله دعاءه، وأمره أن يركض برجله الأرض، فنبعت عين ماء، فاغتسل منها فذهب كل داء من ظاهره، وشرب منها فذهب كل داء من باطنه.\n\nورد الله عليه أهله ومثلهم معهم، وبارك له في ماله وولده. وصار مثالاً خالداً على الصبر الجميل، وعلى أن الله لا ينسى الصابرين.",
      "quranReference": "إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِّعْمَ الْعَبْدُ",
      "quranCitation": "سورة ص: 44",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Job's Patience Through Trials",
      "prophet": "Job (Ayyub)",
      "story": "Job was a noble prophet with wealth, children, and health. Allah tested him severely: his wealth vanished, his children died, and severe illness struck his body until only his heart and tongue remained healthy to remember Allah.\n\nThe trial lasted eighteen years. People abandoned him except his patient wife who continued serving him.\n\nDespite all this, Job never complained. When he supplicated, he said: \"Harm has touched me, and You are the Most Merciful,\" without demanding relief, leaving the matter to Allah.\n\nAllah answered his prayer and commanded him to strike the earth with his foot. A spring gushed forth. He bathed and all external ailments disappeared; he drank and all internal ailments vanished.\n\nAllah returned his family and doubled them, blessed his wealth and children. Job became an eternal example of beautiful patience and of Allah's care for the patient.",
      "quranReference": "Indeed, We found him patient, an excellent servant",
      "quranCitation": "Surah Sad: 44",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "6",
    "ar": {
      "title": "شكر سليمان على النعم",
      "prophet": "سليمان",
      "story": "كان سليمان عليه السلام يسير بجيشه العظيم من الجن والإنس والطير، فمروا بوادٍ فيه نمل. فسمع نملة تقول لبقية النمل: \"ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ\". فتبسم سليمان ضاحكاً من قولها، وقال: \"رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ\". لم يتكبر سليمان بملكه، ولم يغتر بقوته، بل شكر الله على نعمه. ولذلك زاده الله ملكاً لا ينبغي لأحد من بعده.",
      "quranReference": "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
      "quranCitation": "سورة النمل: 19",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Solomon's Gratitude for Blessings",
      "prophet": "Solomon (Sulaiman)",
      "story": "Solomon was traveling with his great army of jinn, humans, and birds when they passed through a valley of ants. He heard an ant saying to the others: \"Enter your dwellings so Solomon and his armies do not crush you while they are unaware.\" Solomon smiled, laughing at her words, and said: \"My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteousness of which You approve.\" Solomon didn't become arrogant with his kingdom or deluded by his power, but thanked Allah for His blessings. Therefore, Allah increased him with a kingdom no one after him would have.",
      "quranReference": "My Lord, enable me to be grateful for Your favor",
      "quranCitation": "Surah An-Naml: 19",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "7",
    "ar": {
      "title": "هجرة النبي وتوكله على الله",
      "prophet": "محمد",
      "story": "عندما خرج النبي ﷺ مهاجراً من مكة، كان الكفار يطاردونه ويريدون قتله، وجعلوا مئة ناقة مكافأة لمن يأتي به. وصل المطاردون إلى غار ثور حيث كان النبي وأبو بكر مختبئَين. قال أبو بكر: \"يا رسول الله، لو نظر أحدهم تحت قدميه لأبصرنا!\" فقال النبي بيقين وطمأنينة: \"يَا أَبَا بَكْرٍ، مَا ظَنُّكَ بِاثْنَيْنِ اللَّهُ ثَالِثُهُمَا؟\". هذا هو التوكل الحق: اطمئنان القلب مع الخوف الطبيعي، واليقين بنصر الله مع الأخذ بالأسباب (الاختباء في الغار). وقد نجّاهما الله، وأنزل السكينة عليهما.",
      "quranReference": "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا",
      "quranCitation": "سورة التوبة: 40",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "The Prophet's Migration and Trust in Allah",
      "prophet": "Muhammad",
      "story": "When the Prophet migrated from Mecca, the disbelievers were pursuing him to kill him, offering 100 camels as a reward. They reached the cave of Thawr where the Prophet and Abu Bakr were hiding. Abu Bakr said: \"O Messenger of Allah, if one of them looks down at his feet, he will see us!\" The Prophet replied with certainty and tranquility: \"O Abu Bakr, what do you think of two when Allah is their third?\" This is true reliance: heart's tranquility with natural fear, and certainty in Allah's victory while taking proper means (hiding in the cave). Allah saved them and sent down tranquility upon them.",
      "quranReference": "Do not grieve; indeed Allah is with us",
      "quranCitation": "Surah At-Tawbah: 40",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "13",
    "ar": {
      "title": "نوح والصبر الطويل",
      "prophet": "نوح",
      "story": "نوح عليه السلام هو أول رسول أرسله الله إلى أهل الأرض بعد أن عُبدت الأصنام. دعا قومه تسعمائة وخمسين سنة إلى عبادة الله وحده، في صبر عجيب وثبات غريب. كان يدعوهم ليلاً ونهاراً، سراً وجهراً، فرادى وجماعات، لكنهم استمروا في كفرهم وعنادهم. كانوا يضعون أصابعهم في آذانهم ويستغشون ثيابهم ويستكبرون استكباراً. لم يؤمن معه إلا قليل، قيل إنهم كانوا ثمانين نفساً فقط. ومع ذلك لم ييأس نوح ولم يملّ من الدعوة. استمر في صبره حتى أوحى الله إليه أنه لن يؤمن من قومك إلا من قد آمن. عندها دعا عليهم فقال: رب لا تذر على الأرض من الكافرين دياراً. فأمره الله ببناء السفينة، وكان يصنعها وكلما مر عليه ملأ من قومه سخروا منه لأنه يبني سفينة في أرض صحراء بعيدة عن الماء. لكنه استمر في عمله حتى جاء أمر الله وفار التنور، وحمل المؤمنين وأزواجاً من كل الحيوانات، وغرق الكافرون بما فيهم ابنه الذي رفض أن يركب معه.",
      "quranReference": "قُلْنَا احْمِلْ فِيهَا مِن كُلٍّ زَوْجَيْنِ اثْنَيْنِ",
      "quranCitation": "سورة هود: 40",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Noah's Long Patience",
      "prophet": "Noah (Nuh)",
      "story": "Noah was the first messenger Allah sent to Earth's people after idols were worshipped. He called his people for nine hundred and fifty years to worship Allah alone, with amazing patience and remarkable steadfastness. He called them day and night, secretly and openly, individually and collectively, but they persisted in their disbelief and stubbornness. They would put fingers in their ears, cover themselves with garments, and act arrogantly. Only a few believed with him, said to be only eighty souls. Yet Noah never despaired or tired of calling. He continued patiently until Allah revealed that none would believe except those who had already believed. Then he prayed against them: \"Lord, leave not upon the earth from among the disbelievers an inhabitant.\" Allah commanded him to build the ark. He built it, and whenever chiefs of his people passed, they mocked him for building a ship in a desert far from water. But he continued until Allah's command came and the oven burst. He carried the believers and pairs of all animals, and the disbelievers drowned, including his own son who refused to board with him.",
      "quranReference": "We said: Load therein two of every kind",
      "quranCitation": "Surah Hud: 40",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "14",
    "ar": {
      "title": "سليمان والحكمة",
      "prophet": "سليمان",
      "story": "سليمان عليه السلام نبي ملك آتاه الله ملكاً عظيماً لم يؤته أحداً من قبله ولا من بعده. وقد سخر الله له الجن والإنس والطير والريح، وعلمه منطق الطير وكلام النمل. ومع كل هذا الملك العظيم، كان سليمان عبداً شاكراً لله، يعرف أن كل ما عنده فضل من الله. من حكمته العظيمة قصته مع الهدهد الذي تغيب عن مجلسه، فلما عاد جاء بخبر عظيم عن ملكة سبأ التي تعبد الشمس من دون الله. فأرسل سليمان إليها يدعوها إلى الإسلام. جاءته بلقيس ملكة سبأ وكانت امرأة ذكية حكيمة، فاختبرها سليمان بأن أمر بإحضار عرشها من بلادها قبل أن تصل، ونُكّر لها عرشها ليرى أتهتدي. فلما رأته قالت: كأنه هو. وأُدخلت الصرح الذي بُني من زجاج أبيض تحته ماء، فحسبته ماء وكشفت عن ساقيها. عندها علمت قدرة الله وحكمة سليمان، فآمنت وقالت: رب إني ظلمت نفسي وأسلمت مع سليمان لله رب العالمين.",
      "quranReference": "عُلِّمْنَا مَنطِقَ الطَّيْرِ وَأُوتِينَا مِن كُلِّ شَيْءٍ",
      "quranCitation": "سورة النمل: 16",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Solomon and Wisdom",
      "prophet": "Solomon (Sulaiman)",
      "story": "Solomon was a prophet-king whom Allah gave a kingdom greater than anyone before or after. Allah subjected to him jinn, humans, birds, and wind, and taught him the speech of birds and ants. Despite this great kingdom, Solomon was a grateful servant who knew everything he had was Allah's favor. Among his great wisdom is the story of the hoopoe that was absent from his assembly. When it returned, it brought great news about the Queen of Sheba who worshipped the sun instead of Allah. Solomon sent to her calling to Islam. Bilqis, the Queen of Sheba, came - she was an intelligent, wise woman. Solomon tested her by commanding her throne to be brought from her country before she arrived, then disguised it to see if she would recognize it. When she saw it, she said: \"It seems like it.\" She was admitted to the palace built of white glass with water beneath it, and she thought it was water and uncovered her legs. Then she knew Allah's power and Solomon's wisdom, believed, and said: \"My Lord, I have wronged myself, and I submit with Solomon to Allah, Lord of the worlds.\"",
      "quranReference": "We were taught the language of birds and given from all things",
      "quranCitation": "Surah An-Naml: 16",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "15",
    "ar": {
      "title": "موسى وشق البحر",
      "prophet": "موسى",
      "story": "من أعظم مواقف التوكل على الله في التاريخ موقف موسى عليه السلام حين خرج ببني إسرائيل من مصر هارباً من فرعون وجنوده. لحق بهم فرعون بجيش عظيم، فلما وصل بنو إسرائيل إلى البحر وجدوه أمامهم وفرعون وراءهم. نظر أصحاب موسى فقالوا: إنا لمدركون! البحر أمامنا والعدو خلفنا، لا مفر! هنا ظهر توكل موسى الكامل على الله، فقال بكل ثقة ويقين: كلا! إن معي ربي سيهدين! لم يكن عند موسى خطة بشرية للنجاة، لم يكن لديه سفن ولا جسور، لكنه كان يعلم أن الله لن يخذله وقد أمره بالخروج. فجاء الأمر الإلهي: اضرب بعصاك البحر! فضربه فانفلق البحر فلقين عظيمتين، كل فرق كالجبل العظيم، وظهرت في وسطه أرض يابسة. مر بنو إسرائيل آمنين، ولما دخل فرعون وجنوده أطبق الله عليهم البحر فغرقوا جميعاً. هذا هو ثمرة التوكل الحقيقي على الله: نصر وتأييد من حيث لا يحتسب الإنسان.",
      "quranReference": "فَأَوْحَيْنَا إِلَى مُوسَى أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ فَانفَلَقَ",
      "quranCitation": "سورة الشعراء: 63",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Moses and the Parting Sea",
      "prophet": "Moses (Musa)",
      "story": "Among history's greatest demonstrations of reliance on Allah is Moses' stance when he left Egypt with the Children of Israel, fleeing from Pharaoh and his soldiers. Pharaoh pursued them with a mighty army. When the Children of Israel reached the sea, they found it before them and Pharaoh behind them. Moses' companions looked and said: \"Indeed, we are to be overtaken!\" The sea before us and the enemy behind us, no escape! Here Moses' complete reliance on Allah appeared as he said with full confidence and certainty: \"No! Indeed, with me is my Lord; He will guide me!\" Moses had no human plan for escape, no ships or bridges, but he knew Allah wouldn't forsake him after commanding him to leave. The divine command came: \"Strike with your staff the sea!\" He struck it and the sea split into two great portions, each like a huge mountain, with dry land appearing in the middle. The Children of Israel passed safely, and when Pharaoh and his soldiers entered, Allah closed the sea upon them and they all drowned. This is the fruit of true reliance on Allah: victory and support from where one never expected.",
      "quranReference": "Then We inspired to Moses: Strike with your staff the sea, and it parted",
      "quranCitation": "Surah Ash-Shu'ara: 63",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "16",
    "ar": {
      "title": "داود وقضاؤه العادل",
      "prophet": "داود",
      "story": "داود عليه السلام كان نبياً ملكاً آتاه الله الحكمة وفصل الخطاب، أي القدرة على الفصل بين الخصوم بالعدل والحق. من قصصه العجيبة في القضاء ما ذكره الله في سورة ص، حين تسور عليه خصمان المحراب وهو في عبادته، ففزع منهم. قالوا: لا تخف، خصمان بغى بعضنا على بعض فاحكم بيننا بالحق. عرض أحدهما قضيته فقال: إن هذا أخي له تسع وتسعون نعجة ولي نعجة واحدة فقال أكفلنيها وعزني في الخطاب. فحكم داود فوراً وقال: لقد ظلمك بسؤال نعجتك إلى نعاجه، وإن كثيراً من الخلطاء ليبغي بعضهم على بعض إلا الذين آمنوا وعملوا الصالحات وقليل ما هم. قال المفسرون: كان هذا اختباراً من الله لداود، فتنبه لما وقع فيه من الحكم قبل سماع الطرف الآخر، فاستغفر ربه وخر راكعاً وأناب. العدل يقتضي سماع الخصمين قبل الحكم، وهذا درس عظيم لكل من يتصدى للقضاء والفصل بين الناس.",
      "quranReference": "يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُم بَيْنَ النَّاسِ بِالْحَقِّ",
      "quranCitation": "سورة ص: 26",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "David's Just Judgment",
      "prophet": "David (Dawud)",
      "story": "David was a prophet-king whom Allah gave wisdom and decisive speech - the ability to settle between disputants with justice and truth. Among his amazing judicial stories is what Allah mentioned in Surah Sad, when two disputants climbed over the wall into his private chamber while he was worshipping, startling him. They said: \"Fear not. We are two disputants, one of whom has wronged the other, so judge between us with truth.\" One presented his case: \"This is my brother. He has ninety-nine ewes and I have one ewe. He said: 'Entrust her to me,' and he overpowered me in speech.\" David immediately judged: \"He has certainly wronged you in demanding your ewe to add to his ewes. Indeed, many associates oppress one another, except those who believe and do righteous deeds - and few are they.\" Commentators said this was a test from Allah for David, who realized he judged before hearing the other party, so he sought forgiveness from his Lord and fell bowing and repented. Justice requires hearing both parties before judging - a great lesson for anyone who judges or settles between people.",
      "quranReference": "O David, We have made you a successor upon the earth, so judge between people in truth",
      "quranCitation": "Surah Sad: 26",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "17",
    "ar": {
      "title": "زكريا ودعوته لله",
      "prophet": "زكريا",
      "story": "زكريا عليه السلام كان نبياً صالحاً كبر في السن حتى بلغ من الكبر عتياً، وكانت امرأته عاقراً لا تلد. لكنه لم ييأس من رحمة الله، فدعا ربه دعاء خفياً: رب إني وهن العظم مني واشتعل الرأس شيباً ولم أكن بدعائك رب شقياً. طلب من الله أن يرزقه ولداً صالحاً يرثه ويرث من آل يعقوب. استجاب الله دعاءه وبشره بيحيى، وهو اسم لم يسمّ به أحد من قبل. تعجب زكريا: أنى يكون لي غلام وكانت امرأتي عاقراً وقد بلغت من الكبر عتياً؟! فجاءه الرد الإلهي: كذلك قال ربك هو علي هين وقد خلقتك من قبل ولم تك شيئاً. أعطي زكريا علامة على الحمل: ألا يكلم الناس ثلاث ليال سوياً. خرج على قومه من المحراب فأوحى إليهم أن سبحوا بكرة وعشياً. وُلد يحيى وكان سيداً وحصوراً ونبياً من الصالحين، آتاه الله الحكم صبياً، وكان باراً بوالديه ولم يكن جباراً عصياً.",
      "quranReference": "يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ",
      "quranCitation": "سورة مريم: 7",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Zechariah's Prayer to Allah",
      "prophet": "Zechariah (Zakariyya)",
      "story": "Zechariah was a righteous prophet who grew old until he was extremely aged, and his wife was barren. But he never despaired of Allah's mercy and called upon his Lord secretly: \"My Lord, indeed my bones have weakened and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy.\" He asked Allah for a righteous son to inherit from him and from the family of Jacob. Allah answered his prayer and gave him glad tidings of Yahya (John), a name given to no one before. Zechariah wondered: \"How can I have a boy when my wife has been barren and I have reached extreme old age?\" The divine response came: \"Thus says your Lord: It is easy for Me, for I created you before when you were nothing.\" Zechariah was given a sign of the pregnancy: he couldn't speak to people for three nights while being sound. He came out to his people from the prayer chamber and signaled to them to glorify Allah morning and evening. Yahya was born, a leader, chaste, and a prophet from among the righteous. Allah gave him wisdom in boyhood, and he was dutiful to his parents, not disobedient or insolent.",
      "quranReference": "O Zechariah, We give you good tidings of a boy whose name will be Yahya",
      "quranCitation": "Surah Maryam: 7",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "18",
    "ar": {
      "title": "إبراهيم وشكر النعم",
      "prophet": "إبراهيم",
      "story": "كان إبراهيم عليه السلام نموذجاً فريداً في الشكر والثناء على الله. وصفه الله في القرآن بقوله: \"إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتاً لِلَّهِ حَنِيفاً وَلَمْ يَكُ مِنَ المُشْرِكِينَ، شَاكِراً لأَنْعُمِهِ\". فقد كان إبراهيم يشكر الله في كل أحواله. حين أنجاه الله من النار شكره بمزيد من الطاعة والعبادة. وحين رزقه الولد على كبر سنه شكره بتقديم ابنه قرباناً لله حين أُمر بذلك. وحين بنى الكعبة دعا ربه قائلاً: \"رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ العَلِيمُ\". كان شكره يظهر في أفعاله لا في أقواله فقط، فترك وطنه امتثالاً لأمر الله، وترك ابنه وزوجته في صحراء مكة ثقة بالله وشكراً له على نعمة الإيمان.",
      "quranReference": "شَاكِراً لأَنْعُمِهِ",
      "quranCitation": "سورة النحل: 121",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Abraham and Gratitude",
      "prophet": "Abraham",
      "story": "Abraham was a unique example of gratitude and praise to Allah. Allah described him saying: \"Indeed, Abraham was a nation devoutly obedient to Allah, inclining toward truth, and he was not of those who associate others with Allah. Grateful for His favors.\" Abraham thanked Allah in all circumstances. When Allah saved him from the fire, he thanked Him with increased worship. When blessed with a son in old age, he thanked Him by offering his son when commanded. When building the Kaaba, he prayed: \"Our Lord, accept from us. Indeed, You are the Hearing, the Knowing.\" His gratitude showed in actions, not just words - he left his homeland obeying Allah's command, and left his wife and son in Mecca's desert trusting Allah and grateful for the blessing of faith.",
      "quranReference": "Grateful for His favors",
      "quranCitation": "Surah An-Nahl: 121",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "19",
    "ar": {
      "title": "عيسى عليه السلام والصدق",
      "prophet": "عيسى",
      "story": "عيسى عليه السلام كان من أصدق الأنبياء وأكثرهم صراحة مع قومه. كان يصدع بالحق ولا يخاف في الله لومة لائم. واجه الفريسيين والكهنة بكل شجاعة وكشف نفاقهم وكذبهم. علّم تلاميذه أن يكون كلامهم نعم نعم ولا لا، بلا مبالغة أو تزييف. وكان من معجزاته أنه يُخبر الناس بما يخفون في بيوتهم، فكان صادقاً مصدقاً. حين سأله بنو إسرائيل عن المائدة من السماء، أجابهم بصدق وحذرهم من عواقب الكفر بها. ولما رفعه الله إليه، بقيت رسالته الصادقة في قلوب أتباعه المخلصين.",
      "quranReference": "وَمُصَدِّقاً لِّمَا بَيْنَ يَدَيَّ مِنَ التَّوْرَاةِ",
      "quranCitation": "سورة الصف: 6",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Jesus and Truthfulness",
      "prophet": "Jesus",
      "story": "Jesus was among the most truthful prophets and most frank with his people. He spoke truth boldly without fearing anyone's blame. He confronted the Pharisees and priests courageously, exposing their hypocrisy and lies. He taught his disciples that their words should be yes yes and no no, without exaggeration or falsification. Among his miracles was informing people of what they hid in their homes, being truthful and confirmed. When the Children of Israel asked about the table from heaven, he answered honestly and warned them of consequences. When Allah raised him, his truthful message remained in the hearts of his sincere followers.",
      "quranReference": "And confirming what was before me of the Torah",
      "quranCitation": "Surah As-Saff: 6",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "20",
    "ar": {
      "title": "محمد صلى الله عليه وسلم والرحمة",
      "prophet": "محمد",
      "story": "كان النبي محمد صلى الله عليه وسلم أرحم الخلق بالخلق. رحمته لم تقتصر على المسلمين بل شملت الجميع حتى أعداءه. حين ذهب إلى الطائف ورجمه أهلها بالحجارة حتى أدموا قدميه، جاءه ملك الجبال يعرض عليه أن يطبق عليهم الأخشبين فقال: لا، لعل الله يخرج من أصلابهم من يعبد الله. وحين فتح مكة عفا عن قريش الذين آذوه وطردوه وقتلوا أصحابه. وكان يوصي الجيوش ألا يقتلوا شيخاً ولا امرأة ولا طفلاً ولا يقطعوا شجرة. ورأى مرة حمّاراً موسوماً في وجهه فغضب وقال: لعن الله من فعل هذا. وأخبر أن امرأة دخلت النار في هرة حبستها حتى ماتت جوعاً.",
      "quranReference": "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ",
      "quranCitation": "سورة آل عمران: 159",
      "source": "السيرة النبوية",
      "sourceUrl": "https://sunnah.com"
    },
    "en": {
      "title": "Muhammad and Mercy",
      "prophet": "Muhammad",
      "story": "Prophet Muhammad was the most merciful of creation to creation. His mercy was not limited to Muslims but included everyone, even enemies. When he went to Taif and its people stoned him until his feet bled, the angel of mountains offered to crush them between the mountains, but he said: \"No, perhaps Allah will bring from their descendants those who worship Him.\" When he conquered Mecca, he pardoned Quraysh who had harmed, expelled, and killed his companions. He commanded armies not to kill the elderly, women, or children, nor cut trees. Once he saw a donkey branded on its face and angrily said: \"May Allah curse whoever did this.\" He told of a woman who entered Hell because of a cat she imprisoned until it died of hunger.",
      "quranReference": "By mercy from Allah, you were lenient with them",
      "quranCitation": "Surah Ali Imran: 159",
      "source": "Prophetic Biography",
      "sourceUrl": "https://sunnah.com"
    }
  },
  {
    "id": "21",
    "ar": {
      "title": "أيوب عليه السلام والصبر العظيم",
      "prophet": "أيوب",
      "story": "أيوب عليه السلام هو النموذج الأعلى للصبر في القرآن الكريم. كان عبداً صالحاً أنعم الله عليه بالمال والولد والصحة، ثم ابتلاه الله بفقدان كل ذلك. ذهب ماله، ومات أولاده، وأصابه مرض شديد في جسده حتى تقطع لحمه وتغير حاله. لكنه لم يشكُ إلى أحد سوى الله، ولم يجزع ولم يتسخط. بقي على صبره سنوات طويلة، قيل ثماني عشرة سنة، وهو يحمد الله ويشكره. حتى الناس هجروه والأقارب ابتعدوا عنه، لكنه ظل ثابتاً على إيمانه. وفي النهاية دعا ربه: \"أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ\" فاستجاب الله دعاءه وقال له: \"ارْكُضْ بِرِجْلِكَ هَٰذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ\" فضرب برجله الأرض فخرج ماء اغتسل به فشُفي تماماً، ورد الله عليه أهله ومثلهم معهم.",
      "quranReference": "إِنَّا وَجَدْنَاهُ صَابِراً نِّعْمَ العَبْدُ إِنَّهُ أَوَّابٌ",
      "quranCitation": "سورة ص: 44",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Job and Great Patience",
      "prophet": "Job (Ayyub)",
      "story": "Job is the highest example of patience in the Quran. He was a righteous servant whom Allah blessed with wealth, children, and health, then Allah tested him by taking all away. His wealth vanished, his children died, and severe illness struck his body until his flesh deteriorated. Yet he complained to none but Allah, neither anxious nor resentful. He remained patient for years, said to be eighteen, praising and thanking Allah. Even people abandoned him and relatives distanced themselves, but he stayed firm in faith. Finally he prayed: \"Indeed, adversity has touched me, and You are the Most Merciful of the merciful.\" Allah answered and said: \"Strike the ground with your foot; this is a cool bath and drink.\" He struck the ground, water emerged, he bathed and was completely healed, and Allah returned his family and doubled them.",
      "quranReference": "Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back to Allah",
      "quranCitation": "Surah Sad: 44",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "22",
    "ar": {
      "title": "عيسى عليه السلام والتواضع",
      "prophet": "عيسى",
      "story": "كان عيسى عليه السلام من أشد الأنبياء تواضعاً. لم يتخذ لنفسه قصوراً ولا خدماً، بل كان يمشي في الأرض حافياً ويأكل من البقول والأعشاب. غسل أقدام تلاميذه تعليماً لهم التواضع وخدمة الآخرين. لم يتكبر على الفقراء والمساكين بل كان يجالسهم ويأكل معهم. علّم الناس أن من أراد أن يكون سيداً فليكن خادماً للجميع. وحين حاول قومه أن يجعلوه ملكاً رفض وانصرف، لأنه جاء ليملك القلوب لا الأرض. ورغم المعجزات العظيمة التي أجراها الله على يديه، لم يتكبر ولم يغتر، بل كان يسند كل فضل إلى الله ويقول: هذا بإذن الله.",
      "quranReference": "وَجَعَلَنِي مُبَارَكاً أَيْنَ مَا كُنتُ",
      "quranCitation": "سورة مريم: 31",
      "source": "قصص الأنبياء",
      "sourceUrl": "https://islamweb.net"
    },
    "en": {
      "title": "Jesus and Humility",
      "prophet": "Jesus",
      "story": "Jesus was among the most humble prophets. He took no palaces or servants, walking barefoot on earth and eating herbs and plants. He washed his disciples' feet teaching them humility and serving others. He didn't look down on the poor but sat and ate with them. He taught that whoever wants to be a master must be a servant to all. When people tried to make him king, he refused and departed, for he came to rule hearts, not land. Despite the great miracles Allah performed through him, he never became arrogant or vain, attributing all merit to Allah saying: \"This is by Allah's permission.\"",
      "quranReference": "And He has made me blessed wherever I am",
      "quranCitation": "Surah Maryam: 31",
      "source": "Stories of the Prophets",
      "sourceUrl": "https://islamweb.net"
    }
  },
  {
    "id": "23",
    "ar": {
      "title": "يوسف عليه السلام والأمانة",
      "prophet": "يوسف",
      "story": "يوسف عليه السلام كان نموذجاً عظيماً في حفظ الأمانة. حين كان في بيت العزيز حفظ أمانة سيده ورفض خيانته مع امرأته رغم الإغراء الشديد والتهديد بالسجن. قال: \"مَعَاذَ اللَّهِ إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ\" واختار السجن على المعصية. وحين خرج من السجن وتولى خزائن مصر، كان أميناً على أموال الناس وأقواتهم في سنوات القحط. أدار الأمور بحكمة وعدل حتى نجا مصر والبلاد المجاورة من المجاعة. ولما جاءه إخوته لم يخنهم رغم ما فعلوه به في الماضي، بل أكرمهم وغفر لهم. هذه الأمانة العظيمة هي التي جعلته محبوباً عند الله وعند الناس، ورفعته من قعر البئر إلى عرش مصر.",
      "quranReference": "قَالَ اجْعَلْنِي عَلَىٰ خَزَائِنِ الأَرْضِ إِنِّي حَفِيظٌ عَلِيمٌ",
      "quranCitation": "سورة يوسف: 55",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Joseph and Trustworthiness",
      "prophet": "Joseph (Yusuf)",
      "story": "Joseph was a great example of preserving trust. In the minister's house, he protected his master's trust and refused to betray him with his wife despite intense temptation and threat of prison. He said: \"I seek refuge in Allah. Indeed, he is my master who has made good my residence.\" He chose prison over sin. When released and given charge of Egypt's treasuries, he was trustworthy with people's money and provisions during famine years. He managed affairs wisely and justly, saving Egypt and neighboring lands from starvation. When his brothers came, he didn't betray them despite their past actions, but honored and forgave them. This great trustworthiness made him beloved to Allah and people, raising him from the pit to Egypt's throne.",
      "quranReference": "He said: Appoint me over the storehouses of the land. Indeed, I am a knowing guardian",
      "quranCitation": "Surah Yusuf: 55",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "24",
    "ar": {
      "title": "إبراهيم عليه السلام والكرم",
      "prophet": "إبراهيم",
      "story": "كان إبراهيم عليه السلام أبا الضيفان وسيد الكرماء. لم يكن يأكل وحده أبداً، فكان يبحث عن ضيف يشاركه طعامه. حين جاءته الملائكة في صورة ضيوف بادر بإكرامهم دون أن يسألهم من هم أو من أين جاءوا. قال تعالى: \"فَرَاغَ إِلَىٰ أَهْلِهِ فَجَاءَ بِعِجْلٍ سَمِينٍ\" - أي أسرع دون أن يُشعرهم حتى لا يحرجوا ويرفضوا. قدم لهم أفضل ما عنده وهو عجل سمين محمر على النار، وقربه إليهم بنفسه. هذا هو الكرم الحقيقي: الإسراع في الضيافة، وتقديم أفضل ما عندك، والتواضع في الخدمة. ولذلك سمي إبراهيم خليل الرحمن، لأن الكرم من أحب الأخلاق إلى الله.",
      "quranReference": "هَلْ أَتَاكَ حَدِيثُ ضَيْفِ إِبْرَاهِيمَ المُكْرَمِينَ",
      "quranCitation": "سورة الذاريات: 24",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Abraham and Generosity",
      "prophet": "Abraham",
      "story": "Abraham was the father of guests and master of the generous. He never ate alone but would search for a guest to share his food. When angels came as guests, he hastened to honor them without asking who they were. Allah said: \"He went quickly to his family and brought a fattened calf\" - meaning he hurried without letting them notice to avoid embarrassment. He offered the best he had, a plump calf roasted, and served it himself. This is true generosity: hastening in hospitality, offering your best, and humility in service. Thus Abraham was called the Friend of the Most Merciful, because generosity is among the most beloved traits to Allah.",
      "quranReference": "Has there reached you the story of Abraham's honored guests",
      "quranCitation": "Surah Adh-Dhariyat: 24",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "25",
    "ar": {
      "title": "يوسف عليه السلام والعفو عن الإخوة",
      "prophet": "يوسف",
      "story": "يوسف عليه السلام قدم أروع نموذج للعفو في التاريخ. إخوته حسدوه وألقوه في البئر وكذبوا على أبيهم وسببوا له سنوات من الألم في السجن والغربة. وحين مكّنه الله وأصبح عزيز مصر، جاءه إخوته محتاجين لا يعرفونه. كان بإمكانه أن ينتقم منهم أو يذلهم أو يسجنهم. لكنه اختار العفو والصفح. قال لهم: \"لَا تَثْرِيبَ عَلَيْكُمُ اليَوْمَ يَغْفِرُ اللَّهُ لَكُمْ\" أي لا لوم ولا عتاب. ليس هذا فحسب، بل أكرمهم وأحسن إليهم وأتى بأهله جميعاً ليعيشوا في مصر معززين مكرمين. هذا العفو العظيم هو الذي يليق بالأنبياء والصالحين، ويرفع صاحبه إلى أعلى الدرجات.",
      "quranReference": "قَالَ لَا تَثْرِيبَ عَلَيْكُمُ اليَوْمَ يَغْفِرُ اللَّهُ لَكُمْ",
      "quranCitation": "سورة يوسف: 92",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Joseph and Pardoning His Brothers",
      "prophet": "Joseph (Yusuf)",
      "story": "Joseph presented the finest example of pardon in history. His brothers envied him, threw him in a well, lied to their father, and caused him years of pain in prison and exile. When Allah empowered him as Egypt's minister, his brothers came needy without recognizing him. He could have taken revenge, humiliated, or imprisoned them. But he chose pardon and forgiveness. He told them: \"No blame upon you today. Allah will forgive you\" - meaning no blame or reproach. Not only that, he honored them, treated them kindly, and brought his entire family to live in Egypt with honor. This great pardon befits prophets and the righteous and elevates its owner to the highest ranks.",
      "quranReference": "He said: No blame upon you today. Allah will forgive you",
      "quranCitation": "Surah Yusuf: 92",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "26",
    "ar": {
      "title": "نوح عليه السلام ودعوة التقوى",
      "prophet": "نوح",
      "story": "نوح عليه السلام دعا قومه تسعمائة وخمسين سنة إلى تقوى الله وعبادته وحده. كان يقول لهم: \"اعبدوا الله واتقوه وأطيعون\". رغم طول المدة لم ييأس ولم يتوقف عن دعوته. كان يذكرهم بنعم الله عليهم ويدعوهم للشكر والاستغفار. وعدهم بأنهم إن اتقوا الله أرسل السماء عليهم مدراراً وأمدهم بأموال وبنين وجعل لهم جنات وأنهاراً. لكنهم استكبروا وأعرضوا وسخروا منه. وفي النهاية أمره الله ببناء السفينة، وأغرق المستكبرين ونجى المتقين. هذه قصة عظيمة تبين أن التقوى سبب للنجاة في الدنيا والآخرة، وأن المستكبرين مهما بلغت قوتهم فهم إلى زوال.",
      "quranReference": "أَنِ اعْبُدُوا اللَّهَ وَاتَّقُوهُ وَأَطِيعُونِ",
      "quranCitation": "سورة نوح: 3",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Noah and the Call to Piety",
      "prophet": "Noah (Nuh)",
      "story": "Noah called his people for nine hundred fifty years to Allah's piety and worship. He would tell them: \"Worship Allah, fear Him, and obey me.\" Despite the long duration, he never despaired or stopped calling. He reminded them of Allah's blessings and called them to gratitude and forgiveness. He promised that if they feared Allah, He would send rain abundantly, provide them wealth and children, and make gardens and rivers for them. But they were arrogant, turned away, and mocked him. Finally, Allah commanded him to build the ark, drowned the arrogant, and saved the pious. This great story shows piety saves in this world and the Hereafter, and that the arrogant, however powerful, will perish.",
      "quranReference": "Worship Allah, fear Him, and obey me",
      "quranCitation": "Surah Nuh: 3",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "27",
    "ar": {
      "title": "إبراهيم عليه السلام وقوة الإيمان",
      "prophet": "إبراهيم",
      "story": "إبراهيم عليه السلام ضرب أروع الأمثلة في قوة الإيمان بالله. حين أُلقي في النار لم يتزعزع إيمانه لحظة، وقال: حسبي الله ونعم الوكيل. فجعل الله النار برداً وسلاماً عليه. وحين أُمر بذبح ابنه إسماعيل الذي جاءه على كبر سنه، لم يتردد لحظة في طاعة الله. استسلم هو وابنه لأمر الله، وحين وضع السكين على حلقه فداه الله بكبش عظيم. وحين أُمر بترك زوجته وطفله في صحراء مكة، فعل ذلك ثقة بالله. قالت له هاجر: آلله أمرك بهذا؟ قال: نعم. قالت: إذاً لا يضيعنا. هذا الإيمان العظيم جعل الله يتخذه خليلاً ويجعله إماماً للناس.",
      "quranReference": "وَإِبْرَاهِيمَ الَّذِي وَفَّىٰ",
      "quranCitation": "سورة النجم: 37",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Abraham and Strong Faith",
      "prophet": "Abraham",
      "story": "Abraham set the finest examples of strong faith in Allah. When thrown into fire, his faith didn't waver for a moment, saying: \"Allah is sufficient for me, and He is the best disposer of affairs.\" Allah made the fire cool and peaceful for him. When commanded to slaughter his son Ishmael who came in old age, he didn't hesitate in obeying Allah. He and his son submitted to Allah's command, and when he placed the knife on his throat, Allah ransomed him with a great ram. When commanded to leave his wife and infant in Mecca's desert, he did so trusting Allah. Hajar asked him: \"Did Allah command this?\" He said: \"Yes.\" She said: \"Then He will not abandon us.\" This great faith made Allah take him as a friend and make him a leader for people.",
      "quranReference": "And Abraham who fulfilled",
      "quranCitation": "Surah An-Najm: 37",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "28",
    "ar": {
      "title": "إبراهيم عليه السلام واليقين",
      "prophet": "إبراهيم",
      "story": "إبراهيم عليه السلام كان يقينه بالله ثابتاً راسخاً لا تزعزعه الشدائد. حين طلب من ربه أن يريه كيف يحيي الموتى، لم يكن ذلك شكاً بل طلباً لزيادة الطمأنينة. قال الله له: \"أَوَلَمْ تُؤْمِن قَالَ بَلَىٰ وَلَٰكِن لِّيَطْمَئِنَّ قَلْبِي\". فأمره الله أن يأخذ أربعة من الطير فيذبحها ويفرقها على الجبال ثم يدعوها فتأتيه سعياً. ففعل إبراهيم ورأى بعينه كيف يحيي الله الموتى. هذا اليقين جعله يقف أمام الظالمين بلا خوف، ويحطم أصنام قومه بلا تردد، ويُلقى في النار بلا جزع. اليقين هو الذي يصنع الأبطال والقادة والمصلحين الذين يغيرون التاريخ.",
      "quranReference": "وَلَٰكِن لِّيَطْمَئِنَّ قَلْبِي",
      "quranCitation": "سورة البقرة: 260",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Abraham and Certainty",
      "prophet": "Abraham",
      "story": "Abraham's certainty in Allah was firm and unshakable by hardships. When he asked his Lord to show him how He gives life to the dead, it wasn't doubt but seeking more assurance. Allah said: \"Do you not believe?\" He said: \"Yes, but to satisfy my heart.\" Allah commanded him to take four birds, slaughter them, distribute them on mountains, then call them, and they would come running. Abraham did and saw with his own eyes how Allah resurrects the dead. This certainty made him stand fearlessly before tyrants, smash his people's idols without hesitation, and be thrown in fire without anxiety. Certainty creates heroes, leaders, and reformers who change history.",
      "quranReference": "But to satisfy my heart",
      "quranCitation": "Surah Al-Baqarah: 260",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "29",
    "ar": {
      "title": "يوسف عليه السلام والإخلاص",
      "prophet": "يوسف",
      "story": "يوسف عليه السلام كان مثالاً عظيماً للإخلاص لله في كل أحواله. حين أُغري بالمعصية من امرأة العزيز في موقف لا يراه فيه أحد، قال: \"مَعَاذَ اللَّهِ\" فاستحضر مراقبة الله وإن غابت مراقبة الناس. وحين كان في السجن دعا السجناء إلى الله بإخلاص لا يريد منهم أجراً ولا شهرة. وحين صار عزيز مصر لم يتغير ولم يتكبر، بل ظل مخلصاً لله شاكراً لنعمته. قال عنه ربه: \"كَذَٰلِكَ لِنَصْرِفَ عَنْهُ السُّوءَ وَالْفَحْشَاءَ إِنَّهُ مِنْ عِبَادِنَا الْمُخْلَصِينَ\". فالإخلاص هو الذي صرف عنه السوء وحفظه من الفواحش، وهو الذي رفعه من قعر البئر والسجن إلى قمة السلطة والملك.",
      "quranReference": "إِنَّهُ مِنْ عِبَادِنَا الْمُخْلَصِينَ",
      "quranCitation": "سورة يوسف: 24",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Joseph and Sincerity",
      "prophet": "Joseph (Yusuf)",
      "story": "Joseph was a great example of sincerity to Allah in all circumstances. When tempted to sin by the minister's wife in a situation unseen by anyone, he said: \"I seek refuge in Allah!\" He remembered Allah's watching even when people's watching was absent. In prison, he called inmates to Allah sincerely, seeking no payment or fame. When he became Egypt's minister, he didn't change or become arrogant but remained sincere to Allah, grateful for His blessings. His Lord said of him: \"Thus did We avert evil and immorality from him. Indeed, he was of Our sincere servants.\" Sincerity averted evil and protected him from immorality, and raised him from the pit and prison to the peak of authority and kingship.",
      "quranReference": "Indeed, he was of Our sincere servants",
      "quranCitation": "Surah Yusuf: 24",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  },
  {
    "id": "30",
    "ar": {
      "title": "إبراهيم الحليم",
      "prophet": "إبراهيم",
      "story": "لُقب إبراهيم عليه السلام بالحليم في القرآن الكريم لشدة حلمه وسعة صبره. حين جادله قومه في الله بالباطل صبر عليهم ولم يغضب، بل دعاهم بالحكمة والموعظة الحسنة. وحين ألقوه في النار لم يدعُ عليهم بل قال: حسبي الله ونعم الوكيل. وحين أمره الله بذبح ابنه لم يجزع ولم يتسخط بل استسلم لأمر الله بحلم وسكينة. وحين خاطب أباه المشرك قال له: \"يَا أَبَتِ\" بكل أدب ورفق رغم أن أباه هدده بالرجم. هذا الحلم العظيم جعل الله يقول عنه: \"إِنَّ إِبْرَاهِيمَ لَأَوَّاهٌ حَلِيمٌ\". والأواه هو الكثير التضرع إلى الله، والحليم هو الذي لا يستعجل العقوبة على من أساء إليه.",
      "quranReference": "إِنَّ إِبْرَاهِيمَ لَأَوَّاهٌ حَلِيمٌ",
      "quranCitation": "سورة التوبة: 114",
      "source": "ابن كثير",
      "sourceUrl": "https://quran.ksu.edu.sa"
    },
    "en": {
      "title": "Abraham the Forbearing",
      "prophet": "Abraham",
      "story": "Abraham was titled \"the Forbearing\" in the Quran for his great forbearance and vast patience. When his people argued with him falsely about Allah, he was patient and didn't anger, calling them with wisdom and good preaching. When thrown in fire, he didn't curse them but said: \"Allah is sufficient for me.\" When commanded to slaughter his son, he didn't panic or resent but submitted to Allah's command with forbearance and tranquility. When addressing his polytheist father, he said \"O my father\" with all courtesy despite threats of stoning. This great forbearance made Allah say: \"Indeed, Abraham was compassionate and forbearing.\" Compassionate means frequently supplicating to Allah; forbearing means not hastening punishment for those who wrong him.",
      "quranReference": "Indeed, Abraham was compassionate and forbearing",
      "quranCitation": "Surah At-Tawbah: 114",
      "source": "Ibn Kathir",
      "sourceUrl": "https://quran.ksu.edu.sa"
    }
  }
];

export interface ProphetGroup {
  prophetAr: string;
  prophetEn: string;
  storyIndices: number[];
}

export const PROPHET_GROUPS: ProphetGroup[] = [
  {
    "prophetAr": "يوسف",
    "prophetEn": "Joseph (Yusuf)",
    "storyIndices": [
      0,
      17,
      19,
      23
    ]
  },
  {
    "prophetAr": "موسى",
    "prophetEn": "Moses (Musa)",
    "storyIndices": [
      1,
      9
    ]
  },
  {
    "prophetAr": "إبراهيم",
    "prophetEn": "Abraham (Ibrahim)",
    "storyIndices": [
      2,
      12,
      18,
      21,
      22,
      24
    ]
  },
  {
    "prophetAr": "نوح",
    "prophetEn": "Noah (Nuh)",
    "storyIndices": [
      3,
      7,
      20
    ]
  },
  {
    "prophetAr": "أيوب",
    "prophetEn": "Job (Ayyub)",
    "storyIndices": [
      4,
      15
    ]
  },
  {
    "prophetAr": "سليمان",
    "prophetEn": "Solomon (Sulaiman)",
    "storyIndices": [
      5,
      8
    ]
  },
  {
    "prophetAr": "محمد",
    "prophetEn": "Muhammad",
    "storyIndices": [
      6,
      14
    ]
  },
  {
    "prophetAr": "داود",
    "prophetEn": "David (Dawud)",
    "storyIndices": [
      10
    ]
  },
  {
    "prophetAr": "زكريا",
    "prophetEn": "Zechariah (Zakariyya)",
    "storyIndices": [
      11
    ]
  },
  {
    "prophetAr": "عيسى",
    "prophetEn": "Jesus",
    "storyIndices": [
      13,
      16
    ]
  }
];
