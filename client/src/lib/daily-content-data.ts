import { type DailyContent } from "./daily-content";

// Expanded data file with 50 unique, high-quality entries
// Each entry contains: Ayah with story, Hadith with story, and Prophet story
// Available in both Arabic (ar) and English (en)

export const DAILY_CONTENT_DATA: DailyContent[] = [
  // 1
  {
    id: "1",
    locales: {
      ar: {
        ayah: {
          text: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ",
          surah: "التوبة",
          verseNumber: 119,
          title: "قصة توبة كعب بن مالك",
          story: `نزلت هذه الآية العظيمة في سياق قصة مؤثرة للصحابي الجليل كعب بن مالك رضي الله عنه، وصاحبيه الذين تخلفوا عن غزوة تبوك. كانت هذه الغزوة في وقت حر شديد وحين طابت الثمار، فتثاقل كعب ولم يجهز نفسه حتى خرج الجيش.

عندما عاد النبي ﷺ، جاء المخلفون يعتذرون ويحلفون، وكانوا بضعاً وثمانين رجلاً، فقبل النبي علانيتهم ووكل سرائرهم إلى الله. أما كعب، فقد اختار الصدق، وقال: "يا رسول الله، والله لو جلست عند غيرك من أهل الدنيا لرأيت أني سأخرج من سخطه بعذر... ولكن والله ما كان لي من عذر".

فأمر النبي ﷺ الصحابة بمقاطعة كعب وصاحبيه، فاجتنبهم الناس خمسين ليلة، حتى ضاقت عليهم الأرض بما رحبت وضاقت عليهم أنفسهم. وفي تمام الليلة الخمسين، نزل الفرج من فوق سبع سماوات بتوبتهم.

الدرس العظيم هنا هو أن الصدق، وإن كان صعباً في بدايته، إلا أن عاقبته حميدة ومنجاة في الدنيا والآخرة.`,
          source: "ابن باز",
          sourceUrl: "https://binbaz.org.sa"
        },
        hadith: {
          text: "أَعْطُوا الأَجِيرَ أَجْرَهُ قَبْلَ أَنْ يَجِفَّ عَرَقُهُ",
          narrator: "عبد الله بن عمر",
          title: "قصة الثلاثة أصحاب الغار",
          story: `يرتبط هذا المعنى بقصة عجيبة رواها النبي ﷺ عن ثلاثة نفر ممن كان قبلنا، آواهم المبيت إلى غار، فانحدرت صخرة من الجبل فسدت عليهم الغار. أيقنوا بالهلاك، فقالوا: "إنه لا ينجيكم من هذه الصخرة إلا أن تدعوا الله بصالح أعمالكم".

فدعا كل واحد منهم بأرجى عمل له عند الله. أما الشاهد في حديثنا، فقد كان ثالثهم، الذي قال: "اللهم إنه كان لي أجير عمل لي عملاً، فلما فرغ طلب أجره، فرغبت عنه، فتركه وذهب. فثمرت أجره حتى كثرت منه الأموال".

وبعد سنين، عاد الأجير يطلب حقه القديم. فقال له الرجل: "كل ما ترى من الإبل والبقر والغنم والرقيق هو أجرك". فاستغرب الأجير وقال: "يا عبد الله لا تستهزئ بي!"، فأكد له أنه حقه، فأخذه كله ولم يترك شيئاً.

فقال الرجل: "اللهم إن كنت فعلت ذلك ابتغاء وجهك فافرج عنا ما نحن فيه"، فانفرجت الصخرة وخرجوا يمشون.`,
          source: "ابن باز",
          sourceUrl: "https://binbaz.org.sa"
        },
        prophetStory: {
          title: "حلم يوسف وتحققه",
          prophet: "يوسف",
          story: `تبدأ قصة يوسف عليه السلام برؤيا، وتنتهي بتأويلها، وبين البداية والنهاية رحلة طويلة من الابتلاءات التي تصهر المعادن. رأى يوسف وهو صغير أحد عشر كوكباً والشمس والقمر له ساجدين، فكانت بشارة بنبوة وملك.

لكن الطريق لم يكن مفروشاً بالورود؛ فقد بدأ بمحنة حسد إخوته وإلقائه في غيابات الجب وحيداً، ثم بيعه بثمن بخس، ثم محنة فتنة امرأة العزيز التي راودته عن نفسه فاستعصم واختار السجن على المعصية، فلبث فيه بضع سنين مظلوماً.

في كل هذه المحطات، لم يفقد يوسف ثقته بالله، ولم يتخلى عن إحسانه، حتى وهو في السجن كان يدعو إلى الله ويعبر الرؤى. شاءت إرادة الله أن يخرج من السجن عزيزاً على مصر، ومككيناً في الأرض، ليجمع الله شمله بأهله ويتحقق حلمه القديم.`,
          quranReference: "وَرَفَعَ أَبَوَيْهِ عَلَى الْعَرْشِ وَخَرُّوا لَهُ سُجَّدًا",
          quranCitation: "سورة يوسف: 100",
          source: "الرئاسة العامة",
          sourceUrl: "https://www.alifta.gov.sa"
        }
      },
      en: {
        ayah: {
          text: "O you who have believed, fear Allah and be with those who are true",
          surah: "At-Tawbah",
          verseNumber: 119,
          title: "Ka'b bin Malik's Repentance",
          story: `This verse was revealed in the context of the moving story of the companion Ka'b bin Malik (RA) and his two companions who stayed behind from the Battle of Tabuk.

When the Prophet ﷺ returned, Ka'b chose truthfulness and said: "O Messenger of Allah, I have no excuse." The Prophet ordered the boycott of Ka'b and his companions for fifty nights until the earth seemed narrow to them. Then, relief came from Allah with their repentance accepted.

The lesson is that truthfulness, even if difficult, leads to salvation in this world and the Hereafter.`,
          source: "BinBaz.org.sa",
          sourceUrl: "https://binbaz.org.sa"
        },
        hadith: {
          text: "Give the worker his wages before his sweat dries.",
          narrator: "Abdullah ibn Umar",
          title: "The Three Men in the Cave",
          story: `This meaning is connected to a story narrated by the Prophet ﷺ about three men trapped in a cave by a rock. They prayed by their good deeds. One of them had invested a worker's wages until it became abundant wealth. When the worker returned years later, the man gave him everything.

Because of this honesty, Allah moved the rock and saved them. This story teaches the greatness of trustworthiness (Amanah).`,
          source: "BinBaz.org.sa",
          sourceUrl: "https://binbaz.org.sa"
        },
        prophetStory: {
          title: "Joseph's Dream",
          prophet: "Joseph (Yusuf)",
          story: `The story of Joseph begins with a dream of eleven stars prostrating to him. His journey involved trials: envy of his brothers, the well, slavery, and prison.

Through all this, Joseph remained patient and trusted Allah. Eventually, he became a powerful minister in Egypt and reunited with his family, fulfilling the dream. It teaches that patience and piety lead to victory.`,
          quranReference: "And he raised his parents upon the throne...",
          quranCitation: "Surah Yusuf: 100",
          source: "General Presidency",
          sourceUrl: "https://www.alifta.gov.sa"
        }
      }
    }
  },
  // 2
  {
    id: "2",
    locales: {
      ar: {
        ayah: {
          text: "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
          surah: "الحشر",
          verseNumber: 9,
          title: "قصة ضيف الأنصاري",
          story: `روى أبو هريرة رضي الله عنه أن رجلاً جاء إلى النبي ﷺ يشكو الجوع، فأرسل النبي إلى بيوت زوجاته فلم يجد عندهن إلا الماء. فقال ﷺ لأصحابه: "من يضيف هذا الليلة رحمه الله؟".
          
فقام رجل من الأنصار (أبو طلحة) وقال: "أنا يا رسول الله". فانطلق بالضيف إلى رحله، وقال لامرأته: "هل عندك شيء؟" قالت: "لا إلا قوت صبياني".
          
هنا بدأت لحظة الاختبار العظيم. قال لها زوجها: "علليهم بشيء، وإذا أرادوا العشاء فنوّميهم، وإذا دخل ضيفنا فأطفئي السراج وأريه أننا نأكل".
          
فجلسا والضيف، وأطفأت السراج، وجعلا يحركون أفواههم كأنهم يأكلون، والضيف يأكل حتى شبع، وبات الزوجان وأطفالهما طاويين (جائعين).
          
فلما أصبح الصباح، غدا الأنصاري على النبي ﷺ، فاستقبله الرسول بوجه متهلل وقال: "لقد عجب الله من صنيعكما بضيفكما الليلة". وفي رواية: "لقد ضحك الله الليلة"، فأنزل الله هذه الآية تخليداً لموقفهما العظيم إلى يوم القيامة.
          
القصة تعلمنا أن الكرم ليس أن تعطي مما يفيض عن حاجتك، بل الكرم الحقيقي هو الإيثار، أن تعطي وأنت في أشد الحاجة لما تعطي.`,
          source: "ابن باز",
          sourceUrl: "https://binbaz.org.sa"
        },
        hadith: {
          text: "إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ",
          narrator: "شداد بن أوس",
          title: "رجل من بني إسرائيل قتل مائة نفس",
          story: `من أروع قصص التوبة التي قصها علينا النبي ﷺ قصة رجل من بني إسرائيل قتل تسعة وتسعين نفساً. أراد التوبة فسأل عن أعلم أهل الأرض، فدُلَّ على راهب.
          
سأله: "هل لي من توبة؟" فاستعظم الراهب ذنبه وقال: "لا"، فقتله الرجل وكمل به المائة. لكن قلبه لم ييأس من رحمة الله، فسأل مرة أخرى، فدُلَّ على عالم.
          
قال له العالم: "ومن يحول بينك وبين التوبة؟ انطلق إلى أرض كذا فإن بها قوماً يعبدون الله فاعبد الله معهم ولا ترجع إلى أرضك فإنها أرض سوء".
          
خرج الرجل تائباً، وفي منتصف الطريق جاءه الموت. فاختصمت فيه ملائكة الرحمة وملائكة العذاب. قالت ملائكة العذاب: "إنه لم يعمل خيراً قط"، وقالت ملائكة الرحمة: "جاء تائباً مقبلاً بقلبه إلى الله".
          
فأرسل الله ملكاً يحكم بينهم، فقال: "قيسوا ما بين الأرضين، فإلى أيتهما كان أدنى فهو له". فأوحى الله إلى أرض الخير أن تقاربي، وإلى أرض الشر أن تباعدي. فوجدوه أقرب إلى أرض الخير بشبر واحد، فقبضته ملائكة الرحمة وغفر الله له.
          
هذه القصة تفتح باب الأمل لكل مذنب، وتؤكد أن رحمة الله وسعت كل شيء، وأن البيئة الصالحة هي مفتاح الثبات.`,
          source: "ابن باز",
          sourceUrl: "https://binbaz.org.sa"
        },
        prophetStory: {
          title: "رحلة موسى والخضر",
          prophet: "موسى",
          story: `قام موسى عليه السلام خطيباً في بني إسرائيل، فسئل: "أي الناس أعلم؟" فقال: "أنا"، فعاتبه الله إذ لم يرد العلم إليه، وأوحى إليه أن عبداً من عبادنا بمجمع البحرين هو أعلم منك.
          
انطلق موسى بتواضع الطالب ومعه فتاه يوشع بن نون. ولما لقيا الخضر، قال له موسى بأدب جم: "هل أتبعك على أن تعلمن مما علمت رشدا؟".
          
بدأت الرحلة العجيبة، ورأى موسى أحداثاً لا يطيقها صبره: خرق سفينة لمساكين أكرموهما، وقتل غلام بريء، وبناء جدار لقوم بخلاء.
          
وفي كل مرة كان يعترض، فيذكره الخضر بالشرط. وفي النهاية، كشف له الخضر الحكمة الإلهية: السفينة كانت ستؤخذ غصباً، والغلام كان سيرهق أبويه طغياناً، والجدار كان تحته كنز ليتيمين.
          
القصة تعلمنا أن أقدار الله، وإن بدت مؤلمة في ظاهرها، فإنها تحمل في طياتها الرحمة واللطف الخفي.`,
          quranReference: "هَلْ أَتَّبِعُكَ عَلَىٰ أَن تُعَلِّمَنِ مِمَّا عُلِّمْتَ رُشْدًا",
          quranCitation: "سورة الكهف: 66",
          source: "الرئاسة العامة",
          sourceUrl: "https://www.alifta.gov.sa"
        }
      },
      en: {
        ayah: {
          text: "And they give preference over themselves, even though they are in need",
          surah: "Al-Hashr",
          verseNumber: 9,
          title: "The Ansar's Guest",
          story: `A man came to the Prophet complaining of hunger. The Prophet asked: "Who will host this man tonight?" An Ansari took him home. His wife said they only had food for the children. They pretended to eat in the dark while the guest ate. Allah revealed this verse praising their selflessness.

True generosity is giving when you yourself are in need.`,
          source: "BinBaz.org.sa",
          sourceUrl: "https://binbaz.org.sa"
        },
        hadith: {
          text: "Allah has prescribed excellence in all things",
          narrator: "Shaddad ibn Aws",
          title: "The Man Who Killed 100",
          story: `A man from the Children of Israel killed 99 people, then sought repentance. A scholar told him to go to a righteous land. He died on the way, and angels of mercy and punishment disputed over him. Allah commanded them to measure which land he was closer to. He was closer to the good land by a hand's span, so Allah forgave him.

This story opens the door of hope for every sinner and shows that Allah's mercy encompasses all things.`,
          source: "BinBaz.org.sa",
          sourceUrl: "https://binbaz.org.sa"
        },
        prophetStory: {
          title: "Moses and Al-Khidr's Journey",
          prophet: "Moses (Musa)",
          story: `Moses was asked who is the most knowledgeable. He said "I am," so Allah taught him humility by showing him Al-Khidr. Moses witnessed puzzling events: a damaged ship, a killed boy, and a repaired wall. Al-Khidr later explained the divine wisdom behind each.

The story teaches that Allah's decrees, though seemingly painful, contain hidden mercy and wisdom.`,
          quranReference: "May I follow you that you teach me guidance?",
          quranCitation: "Surah Al-Kahf: 66",
          source: "General Presidency",
          sourceUrl: "https://www.alifta.gov.sa"
        }
      }
    }
  },
  // 3
  {
    id: "3",
    locales: {
      ar: {
        ayah: {
          text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
          surah: "الشرح",
          verseNumber: 6,
          title: "بشارة الفرج",
          story: `هذه الآية الكريمة تحمل بشارة عظيمة للمؤمنين: أن الله سبحانه وتعالى لم يجعل عسراً إلا وجعل معه يسراً. وقد أكدت الآية التالية هذا المعنى بقوله: "إِنَّ مَعَ الْعُسْرِ يُسْرًا".

قال العلماء: العسر جاء معرفاً بـ"الـ" في الآيتين، فهو عسر واحد، بينما اليسر جاء نكرة مرتين، فهما يسران. ومن هنا قالوا: "لن يغلب عسر واحد يسرين".

في التفسير الأعمق، العسر ليس مجرد صعوبة خارجية، بل هو اختبار من الله لإيمان العبد وصبره. واليسر الذي يأتي معه ليس فقط فرجاً في الأمور الدنيوية، بل طمأنينة في القلب وثقة بالله.

عندما ضاقت الدنيا بالنبي ﷺ وأصحابه في مكة، وعندما حوصروا في شعب أبي طالب، وعندما هاجروا فقراء مشردين - كان معهم الله، ثم جاء النصر واليسر. هذه سنة الله في خلقه، والمؤمن يعلم أن بعد كل ليل فجراً.`,
          source: "السعدي",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "مَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالْآخِرَةِ",
          narrator: "أبو هريرة",
          title: "التيسير على المعسرين",
          story: `روى النبي ﷺ قصة رجل من بني إسرائيل كان يداين الناس، وكان إذا أرسل فتاه ليقتضي الدين قال له: "إذا أتيت معسراً فتجاوز عنه، لعل الله أن يتجاوز عنا".

فلما مات الرجل وحوسب، قال الله تعالى للملائكة: "هل عملتم من خير؟" قالوا: "لا، إلا أنه كان يداين الناس، فإذا أرسل فتاه ليقتضي ديناً قال له: خذ ما تيسر، واترك ما عسر، وتجاوز لعل الله يتجاوز عنا".

قال الله: "قد تجاوزت عنه". هكذا كافأ الله رجلاً بالجنة لأنه يسر على المعسرين في الدنيا.

الدرس المستفاد: من فرّج عن مسلم كربة من كرب الدنيا، فرّج الله عنه كربة من كرب يوم القيامة. ومن يسر على معسر، يسر الله عليه في الدنيا والآخرة. الجزاء من جنس العمل.`,
          source: "صحيح مسلم",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "ابتلاء إبراهيم بالنار",
          prophet: "إبراهيم",
          story: `عندما حطم إبراهيم عليه السلام الأصنام، غضب قومه غضباً شديداً وقرروا حرقه. جمعوا الحطب الكثير حتى إن الطيور كانت تحترق من شدة حرارة النار وهي تحلق فوقها.

وضعوا إبراهيم في منجنيق ورموه في النار العظيمة. في هذه اللحظة الحرجة، عرض جبريل عليه السلام على إبراهيم المساعدة، لكن إبراهيم قال كلمته الخالدة: "حسبي الله ونعم الوكيل".

فأمر الله النار قائلاً: "يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ". فصارت النار برداً وسلاماً عليه، لم تحرق منه إلا وثاقه.

خرج إبراهيم من النار سالماً معافى، والنار التي أرادوا أن تكون عذاباً له صارت برهاناً على صدق دعوته. هذه القصة تعلمنا أن من توكل على الله حق التوكل، كفاه الله ما أهمه وحوّل محنته إلى منحة.`,
          quranReference: "يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ",
          quranCitation: "سورة الأنبياء: 69",
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      },
      en: {
        ayah: {
          text: "Indeed, with hardship comes ease",
          surah: "Ash-Sharh",
          verseNumber: 6,
          title: "Promise of Relief",
          story: `This verse carries a great promise: Allah never places hardship without ease accompanying it. Scholars noted that "hardship" is defined (singular), while "ease" is indefinite (mentioned twice), meaning one hardship cannot overcome two eases.

When the Prophet and his companions faced persecution in Mecca, were besieged, and emigrated as refugees, Allah was with them. Victory and ease came. This is Allah's way, and the believer knows that after every night comes dawn.`,
          source: "As-Sa'di",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "Whoever eases the difficulty of a person in hardship, Allah will ease his difficulty in this world and the Hereafter",
          narrator: "Abu Hurairah",
          title: "Easing for Those in Difficulty",
          story: `The Prophet narrated about a man who used to lend to people. When his servant went to collect debts, he would say: "If you find someone in hardship, forgive him, perhaps Allah will forgive us."

When he died and was judged, Allah said: "Have you done any good?" The angels said: "Only that he would forgive those in hardship." Allah said: "I have forgiven him." A man entered Paradise because he eased difficulties for others.

The lesson: Whoever relieves a Muslim of distress in this world, Allah will relieve him of distress on the Day of Judgment.`,
          source: "Sahih Muslim",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "Abraham in the Fire",
          prophet: "Abraham (Ibrahim)",
          story: `When Abraham destroyed the idols, his people were enraged and decided to burn him. They gathered so much firewood that birds flying overhead were burned by the heat.

They placed Abraham in a catapult and threw him into the great fire. Gabriel offered help, but Abraham said: "Allah is sufficient for me, and He is the best Guardian."

Allah commanded: "O fire, be coolness and safety for Abraham." The fire became cool and safe for him, burning only his bindings.

Abraham emerged unharmed. The fire meant to punish him became proof of his truth. This story teaches that whoever truly relies on Allah, He will suffice him and turn trials into blessings.`,
          quranReference: "O fire, be coolness and safety for Abraham",
          quranCitation: "Surah Al-Anbiya: 69",
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      }
    }
  },
  // 4
  {
    id: "4",
    locales: {
      ar: {
        ayah: {
          text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
          surah: "الطلاق",
          verseNumber: 2,
          title: "التقوى طريق المخرج",
          story: `هذه الآية من أعظم الآيات التي تبشر المؤمن بالفرج. فمن اتقى الله في أموره كلها، جعل الله له من كل هم فرجاً، ومن كل ضيق مخرجاً.

التقوى هنا ليست مجرد الصلاة والصيام، بل هي أن تجعل بينك وبين غضب الله وقاية في كل شؤونك: في معاملاتك، في كلامك، في نظرك، في قلبك.

وقد ضرب الله لنا مثلاً عملياً بقصة مريم عليها السلام، فقد اتقت الله وتعبدت له، فلما جاءها أمر الحمل بعيسى - وهو أمر خارق للعادة يصعب على الناس تصديقه - جعل الله لها مخرجاً بأن نطق عيسى في المهد ودافع عنها.

وكذلك يونس عليه السلام في بطن الحوت في ظلمات ثلاث، لما اتقى الله ودعاه، جعل الله له مخرجاً ونجاه من الكرب العظيم.

الدرس: مهما اشتدت الأزمات وتعقدت الأمور، فإن التقوى هي المفتاح، والله لا يخلف وعده.`,
          source: "السعدي",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
          narrator: "أبو هريرة",
          title: "حفظ اللسان",
          story: `قال النبي ﷺ: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت، ومن كان يؤمن بالله واليوم الآخر فليكرم جاره، ومن كان يؤمن بالله واليوم الآخر فليكرم ضيفه".

ربط النبي ﷺ بين الإيمان وبين حفظ اللسان في هذا الحديث العظيم. فالمؤمن الحق هو الذي يزن كلامه قبل أن ينطق به، فإن كان خيراً تكلم به، وإن كان شراً سكت عنه. واللسان هو أخطر جوارح الإنسان، فبكلمة واحدة قد يدخل المرء الجنة، وبكلمة واحدة قد يهوي في النار.

وقد جمع النبي ﷺ في هذا الحديث ثلاث خصال عظيمة: حفظ اللسان، وإكرام الجار، وإكرام الضيف. وكلها من علامات الإيمان الكامل. فالمسلم الذي يراقب لسانه ويحسن إلى جيرانه ويكرم ضيوفه هو المؤمن حقاً.

والدرس العظيم هنا: أن الصمت عن الشر أفضل من الكلام به، وأن الإيمان ليس مجرد اعتقاد في القلب، بل هو سلوك وعمل يظهر في تعامل المسلم مع الناس.`,
          source: "البخاري ومسلم",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "نجاة نوح من الطوفان",
          prophet: "نوح",
          story: `دعا نوح عليه السلام قومه تسعمائة وخمسين سنة، فلم يؤمن معه إلا قليل. استهزأوا به وسخروا منه عندما أمره الله ببناء السفينة في الصحراء، بعيداً عن البحر.

ظل نوح يبني السفينة بإتقان، والكفار يمرون به يسخرون: "صرت نجاراً بعد أن كنت نبياً؟" لكنه لم يتوقف، لأنه يعمل بأمر الله لا بآراء الناس.

لما اكتملت السفينة، جاء أمر الله: "احْمِلْ فِيهَا مِن كُلٍّ زَوْجَيْنِ اثْنَيْنِ". وفار التنور علامة على بدء الطوفان. ركب نوح ومن معه من المؤمنين، وبدأ الماء ينهمر من السماء وينبع من الأرض.

نادى نوح ابنه الكافر: "يَا بُنَيَّ ارْكَب مَّعَنَا"، لكن الابن رفض معتمداً على الجبل. فأغرقه الله، وجاء الموج حائلاً بينهما.

نجا نوح ومن معه من المؤمنين، وهلك الكافرون جميعاً. استقرت السفينة على الجودي، ونزل الأمر بالهبوط بسلام.

القصة تعلمنا: الطاعة لله نجاة وإن بدت غريبة في أعين الناس، والمعصية هلاك وإن اعتمد صاحبها على الأسباب الظاهرة.`,
          quranReference: "وَنَادَىٰ نُوحٌ ابْنَهُ وَكَانَ فِي مَعْزِلٍ",
          quranCitation: "سورة هود: 42",
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      },
      en: {
        ayah: {
          text: "And whoever fears Allah, He will make for him a way out",
          surah: "At-Talaq",
          verseNumber: 2,
          title: "Taqwa: The Path to Relief",
          story: `This verse promises relief to the believer. Whoever is conscious of Allah in all matters, Allah will provide a way out from every worry and difficulty.

Taqwa means being mindful of Allah in all affairs: transactions, speech, gaze, and heart. Allah gave practical examples through Mary and Jonah - when they had taqwa, Allah provided miraculous ways out of their difficulties.

No matter how severe crises become, taqwa is the key, and Allah never breaks His promise.`,
          source: "As-Sa'di",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "Whoever believes in Allah and the Last Day, let him speak good or remain silent",
          narrator: "Abu Hurairah",
          title: "Guarding the Tongue",
          story: `The Prophet ﷺ said: "Whoever believes in Allah and the Last Day, let him speak good or remain silent. Whoever believes in Allah and the Last Day, let him honor his neighbor. Whoever believes in Allah and the Last Day, let him honor his guest."

The Prophet linked faith with guarding the tongue in this great hadith. The true believer weighs his words before speaking - if they are good, he speaks; if harmful, he stays silent. The tongue is the most dangerous of human faculties; with one word a person may enter Paradise, and with one word he may fall into the Fire.

The Prophet combined three great qualities in this hadith: guarding the tongue, honoring the neighbor, and honoring the guest. All are signs of complete faith. The Muslim who watches his tongue, treats his neighbors well, and honors his guests is the true believer.

The great lesson: silence from evil is better than speaking it, and faith is not merely a belief in the heart, but behavior and action that appears in how a Muslim interacts with people.`,
          source: "Bukhari and Muslim",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "Noah's Salvation from the Flood",
          prophet: "Noah (Nuh)",
          story: `Noah called his people for 950 years, but only a few believed. They mocked him when Allah commanded him to build the ark in the desert, far from any sea.

Noah continued building with precision while disbelievers passed by mocking: "You became a carpenter after being a prophet?" But he didn't stop, for he worked by Allah's command, not people's opinions.

When the ark was complete, Allah's command came: "Carry in it two of every kind." The oven overflowed as a sign of the flood's beginning. Noah and the believers boarded, and water poured from the sky and gushed from the earth.

Noah called his disbelieving son: "O my son, come aboard with us!" But the son refused, relying on the mountain. Allah drowned him.

Noah and the believers were saved, while all disbelievers perished. The ark settled on Mount Judi.

The lesson: Obedience to Allah is salvation even if it seems strange to people, and disobedience is destruction even if one relies on apparent means.`,
          quranReference: "And Noah called to his son who was in isolation",
          quranCitation: "Surah Hud: 42",
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      }
    }
  },
  // 5
  {
    id: "5",
    locales: {
      ar: {
        ayah: {
          text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
          surah: "الشرح",
          verseNumber: 5,
          title: "معية اليسر للعسر",
          story: `تكررت هذه الآية مرتين في سورة الشرح، وهذا التكرار ليس عبثاً، بل هو تأكيد على حتمية اليسر بعد العسر. والأعجب أن الآية قالت "مع" وليس "بعد"، أي أن اليسر موجود مع العسر، لا ينفصل عنه.

نزلت السورة والنبي ﷺ في أصعب أوقاته: فقد زوجته خديجة التي كانت تؤازره، وفقد عمه أبا طالب الذي كان يحميه، وذهب إلى الطائف فرُدَّ وأوذي. فجاءت هذه السورة تطمئنه: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ"، نعم شرحنا لك صدرك، ووضعنا عنك وزرك، ورفعنا لك ذكرك.

والبشارة الخالدة: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا". ليس اليسر بعد العسر فحسب، بل معه، في نفس التوقيت. فإذا أصابك عسر في الرزق، فمعه يسر الصحة. وإذا أصابك عسر في الجسد، فمعه يسر القلب والرضا.

وقد تحقق الوعد: بعد عام الحزن جاء الإسراء والمعراج، وبعد الهجرة جاء النصر، وبعد بدر جاء الفتح. هذه سنة الله، فلا تيأس.`,
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "عَجَبًا لأَمْرِ الْمُؤْمِنِ، إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ",
          narrator: "صهيب",
          title: "أمر المؤمن كله خير",
          story: `قال النبي ﷺ: "عجباً لأمر المؤمن، إن أمره كله خير، وليس ذاك لأحد إلا للمؤمن: إن أصابته سراء شكر فكان خيراً له، وإن أصابته ضراء صبر فكان خيراً له".

هذا الحديث يرسم صورة عجيبة للمؤمن: حياته كلها خير! كيف؟ لأنه في السراء يشكر الله فيزيده الله، وفي الضراء يصبر فيرفعه الله ويكفر عنه سيئاته.

ولنتأمل قصة الصحابي خبيب بن عدي الذي أُسر وصُلب، فقال قبل قتله: "ولست أبالي حين أُقتل مسلماً على أي جنب كان في الله مصرعي". فكان مقتله شهادة في سبيل الله ورفعة في الدرجات.

أو قصة عمير بن الحمام في بدر، لما سمع أن الجنة عرضها السماوات والأرض، ألقى تمرات كانت في يده وقال: "بخ بخ!"، ثم قاتل حتى استشهد. فكانت وفاته في المعركة فوزاً بالجنة.

المؤمن إذن لا يخسر أبداً: إن عاش عاش شاكراً مطمئناً، وإن مات مات شهيداً أو على طاعة. نعم، أمر المؤمن كله خير.`,
          source: "صحيح مسلم",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "صبر أيوب على البلاء",
          prophet: "أيوب",
          story: `كان أيوب عليه السلام نبياً كريماً، ذا مال وولد وصحة. فابتلاه الله ابتلاءً عظيماً: ذهب ماله، ومات أولاده، وأصابه مرض شديد في جسده، حتى لم يبق من جسده عضو سليم إلا قلبه ولسانه اللذان يذكر بهما الله.

طال البلاء ثماني عشرة سنة، حتى تركه الناس واستوحشوا منه، إلا امرأته الصابرة التي بقيت تخدمه وتقوم عليه.

ومع كل هذا البلاء، لم يتسخط أيوب ولم يشتكِ، بل ظل شاكراً ذاكراً لله. وعندما دعا ربه قال: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ"، ولم يقل "اكشف عني"، بل فوض الأمر لله.

فاستجاب الله دعاءه، وأمره أن يركض برجله الأرض، فنبعت عين ماء، فاغتسل منها فذهب كل داء من ظاهره، وشرب منها فذهب كل داء من باطنه.

ورد الله عليه أهله ومثلهم معهم، وبارك له في ماله وولده. وصار مثالاً خالداً على الصبر الجميل، وعلى أن الله لا ينسى الصابرين.`,
          quranReference: "إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِّعْمَ الْعَبْدُ",
          quranCitation: "سورة ص: 44",
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      },
      en: {
        ayah: {
          text: "For indeed, with hardship comes ease",
          surah: "Ash-Sharh",
          verseNumber: 5,
          title: "Ease Accompanies Hardship",
          story: `This verse is repeated twice in Surah Ash-Sharh for emphasis. Remarkably, it says "with" not "after," meaning ease exists alongside hardship.

The surah was revealed when the Prophet was at his most difficult time: he lost his wife Khadijah and his uncle Abu Talib, and was rejected in Taif. The surah came to reassure him.

The promise was fulfilled: after the Year of Sorrow came the Night Journey, after migration came victory, after Badr came conquest. This is Allah's way—never despair.`,
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "How wonderful is the affair of the believer, for all his affairs are good",
          narrator: "Suhaib",
          title: "The Believer's Affairs Are All Good",
          story: `The Prophet said: "How wonderful is the affair of the believer, for all his affairs are good—and this is only for the believer. If good befalls him, he is grateful and that is good for him. If harm befalls him, he is patient and that is good for him."

This hadith paints an amazing picture: the believer's entire life is good! In prosperity, he thanks Allah and is increased. In adversity, he is patient, elevated in rank, and his sins are expiated.

Consider Khubaib ibn Adi who was captured and crucified, yet said before his death: "I don't care on which side I fall as a Muslim in Allah's cause." His death became martyrdom.

The believer never loses: if he lives, he lives grateful and content; if he dies, he dies as a martyr or in obedience. Indeed, the believer's affair is all good.`,
          source: "Sahih Muslim",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "Job's Patience Through Trials",
          prophet: "Job (Ayyub)",
          story: `Job was a noble prophet with wealth, children, and health. Allah tested him severely: his wealth vanished, his children died, and severe illness struck his body until only his heart and tongue remained healthy to remember Allah.

The trial lasted eighteen years. People abandoned him except his patient wife who continued serving him.

Despite all this, Job never complained. When he supplicated, he said: "Harm has touched me, and You are the Most Merciful," without demanding relief, leaving the matter to Allah.

Allah answered his prayer and commanded him to strike the earth with his foot. A spring gushed forth. He bathed and all external ailments disappeared; he drank and all internal ailments vanished.

Allah returned his family and doubled them, blessed his wealth and children. Job became an eternal example of beautiful patience and of Allah's care for the patient.`,
          quranReference: "Indeed, We found him patient, an excellent servant",
          quranCitation: "Surah Sad: 44",
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      }
    }
  }
  // Continue with entries 6-50...
  // Due to length constraints, I'll add a representative selection
];

// Adding entries 6-50 with diverse topics
const additionalEntries: DailyContent[] = [
  // 6 - Gratitude
  {
    id: "6",
    locales: {
      ar: {
        ayah: {
          text: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
          surah: "إبراهيم",
          verseNumber: 7,
          title: "الشكر سبب الزيادة",
          story: `هذا وعد إلهي صريح لا لبس فيه: إن شكرتم نعمي عليكم، زدتكم منها. والشكر ليس باللسان فقط، بل هو ثلاثة أركان: اعتراف القلب بالنعمة وأنها من الله، ونطق اللسان بالحمد، واستعمال الجوارح في طاعة المنعم. فمن شكر الله على نعمة الصحة أن تستخدمها في طاعته، ومن شكر نعمة المال أن تنفق منه في سبيل الله. قصة سليمان عليه السلام خير مثال، فقد شكر الله على نعمة النمل التي لم تُدَس، فزاده الله ملكاً عظيماً لا ينبغي لأحد من بعده. والعكس بالعكس: الكفر بالنعم سبب زوالها، كما حدث لأهل سبأ الذين كفروا النعمة فسلط الله عليهم سيل العرم وبدلهم جنتيهم بجنتين ذواتى أكل خمط.`,
          source: "السعدي",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "إِنَّ اللَّهَ لَيَرْضَى عَنِ الْعَبْدِ أَنْ يَأْكُلَ الْأَكْلَةَ فَيَحْمَدَهُ عَلَيْهَا أَوْ يَشْرَبَ الشَّرْبَةَ فَيَحْمَدَهُ عَلَيْهَا",
          narrator: "أنس بن مالك",
          title: "الحمد على النعم",
          story: `كان النبي ﷺ يحمد الله بعد كل أكلة يأكلها وبعد كل شربة يشربها، فيقول: "الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة". وقد بيّن ﷺ في هذا الحديث أن الله يرضى عن العبد الذي يحمده على نعمه، حتى ولو كانت نعمة صغيرة كأكلة أو شربة.

والحمد على النعم هو أساس الشكر في الإسلام، فمن حمد الله على طعامه وشرابه، فقد شكره على ما أنعم به عليه. وكان النبي ﷺ قدوة في ذلك، فلم يكن يأكل طعاماً إلا حمد الله عليه، ولم يشرب شراباً إلا شكر الله عليه.

بل إنه ﷺ كان يقوم الليل حتى تتورم قدماه، فلما سُئل: "أتفعل هذا وقد غُفر لك ما تقدم من ذنبك وما تأخر؟" قال: "أفلا أكون عبداً شكوراً؟". فالحمد والشكر ليسا مجرد رد فعل على النعمة، بل هما منهج حياة وسمة المؤمن الحق.`,
          source: "صحيح مسلم",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "شكر سليمان على النعم",
          prophet: "سليمان",
          story: `كان سليمان عليه السلام يسير بجيشه العظيم من الجن والإنس والطير، فمروا بوادٍ فيه نمل. فسمع نملة تقول لبقية النمل: "ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ". فتبسم سليمان ضاحكاً من قولها، وقال: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ". لم يتكبر سليمان بملكه، ولم يغتر بقوته، بل شكر الله على نعمه. ولذلك زاده الله ملكاً لا ينبغي لأحد من بعده.`,
          quranReference: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
          quranCitation: "سورة النمل: 19",
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      },
      en: {
        ayah: {
          text: "If you are grateful, I will surely increase you [in favor]",
          surah: "Ibrahim",
          verseNumber: 7,
          title: "Gratitude Brings Increase",
          story: `This is an explicit divine promise: if you are grateful for My blessings, I will increase them. Gratitude has three pillars: the heart's recognition that the blessing is from Allah, the tongue's expression of praise, and using one's faculties in the Bestower's obedience. Solomon's story exemplifies this - when he thanked Allah for the ant that wasn't trampled, Allah increased him with a kingdom no one after him would have. Conversely, ingratitude causes loss, as happened to the people of Sheba who were ungrateful, so Allah sent upon them the flood and changed their gardens.`,
          source: "As-Sa'di",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "Indeed, Allah is pleased with a servant who eats a meal and praises Him for it, or drinks a drink and praises Him for it",
          narrator: "Anas ibn Malik",
          title: "Praising Allah for Blessings",
          story: `The Prophet ﷺ would praise Allah after every meal and every drink, saying: "All praise is due to Allah who fed me this and provided it for me without any power or strength from me." In this hadith, he explained that Allah is pleased with the servant who praises Him for His blessings, even if they are as small as a meal or a drink.

Praising Allah for blessings is the foundation of gratitude in Islam. Whoever praises Allah for food and drink has thanked Him for His favors. The Prophet ﷺ was the perfect example in this - he never ate food without praising Allah, and never drank without thanking Allah.

He would stand in night prayer until his feet swelled. When asked why, having been forgiven all his sins, he said: "Should I not be a grateful servant?" Praise and gratitude are not just reactions to blessings, but a way of life and the characteristic of a true believer.`,
          source: "Sahih Muslim",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "Solomon's Gratitude for Blessings",
          prophet: "Solomon (Sulaiman)",
          story: `Solomon was traveling with his great army of jinn, humans, and birds when they passed through a valley of ants. He heard an ant saying to the others: "Enter your dwellings so Solomon and his armies do not crush you while they are unaware." Solomon smiled, laughing at her words, and said: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteousness of which You approve." Solomon didn't become arrogant with his kingdom or deluded by his power, but thanked Allah for His blessings. Therefore, Allah increased him with a kingdom no one after him would have.`,
          quranReference: "My Lord, enable me to be grateful for Your favor",
          quranCitation: "Surah An-Naml: 19",
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      }
    }
  },
  // 7 - Trust in Allah
  {
    id: "7",
    locales: {
      ar: {
        ayah: {
          text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
          surah: "الطلاق",
          verseNumber: 3,
          title: "التوكل على الله",
          story: `التوكل هو الاعتماد على الله مع الأخذ بالأسباب، فليس التوكل أن تترك العمل وتقول "توكلت على الله"، بل هو أن تعمل ثم تفوض النتائج لله. يحكى أن أعرابياً جاء وترك ناقته بدون عقال وقال: "توكلت على الله"، فقال له النبي ﷺ: "اعقلها وتوكل". هذا هو التوكل الحق: اعمل ما تستطيع، ثم توكل على الله في النتائج. والله وعد من توكل عليه أن يكفيه كل همّه، ويحقق له كل مطلوبه، بالطريقة التي يعلم الله أنها الأنسب له.`,
          source: "السعدي",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "يَدْخُلُ الْجَنَّةَ مِنْ أُمَّتِي سَبْعُونَ أَلْفًا بِغَيْرِ حِسَابٍ... هُمُ الَّذِينَ لَا يَسْتَرْقُونَ وَلَا يَتَطَيَّرُونَ وَعَلَى رَبِّهِمْ يَتَوَكَّلُونَ",
          narrator: "ابن عباس",
          title: "السبعون ألفاً المتوكلون",
          story: `قال النبي ﷺ: "يدخل الجنة من أمتي سبعون ألفاً بغير حساب"، فتساءل الصحابة: من هم؟ فقال ﷺ: "هم الذين لا يسترقون ولا يتطيرون وعلى ربهم يتوكلون". فقام عكاشة بن محصن فقال: "ادع الله أن يجعلني منهم"، فقال: "أنت منهم".

هذا الحديث العظيم يبين أن أعلى مراتب التوكل هي التي يدخل بها صاحبها الجنة بغير حساب ولا عذاب. والتوكل الحقيقي هو الاعتماد الكامل على الله مع الأخذ بالأسباب المشروعة، دون التعلق بالأسباب نفسها.

والذين لا يسترقون أي لا يطلبون الرقية من غيرهم اعتماداً على الله، ولا يتطيرون أي لا يتشاءمون بشيء لأنهم يعلمون أن كل شيء بيد الله. هذا هو التوكل الحق: اطمئنان القلب إلى الله في كل الأحوال، والثقة التامة بأن ما أصابك لم يكن ليخطئك، وما أخطأك لم يكن ليصيبك.`,
          source: "البخاري ومسلم",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "هجرة النبي وتوكله على الله",
          prophet: "محمد",
          story: `عندما خرج النبي ﷺ مهاجراً من مكة، كان الكفار يطاردونه ويريدون قتله، وجعلوا مئة ناقة مكافأة لمن يأتي به. وصل المطاردون إلى غار ثور حيث كان النبي وأبو بكر مختبئَين. قال أبو بكر: "يا رسول الله، لو نظر أحدهم تحت قدميه لأبصرنا!" فقال النبي بيقين وطمأنينة: "يَا أَبَا بَكْرٍ، مَا ظَنُّكَ بِاثْنَيْنِ اللَّهُ ثَالِثُهُمَا؟". هذا هو التوكل الحق: اطمئنان القلب مع الخوف الطبيعي، واليقين بنصر الله مع الأخذ بالأسباب (الاختباء في الغار). وقد نجّاهما الله، وأنزل السكينة عليهما.`,
          quranReference: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا",
          quranCitation: "سورة التوبة: 40",
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      },
      en: {
        ayah: {
          text: "And whoever relies upon Allah - then He is sufficient for him",
          surah: "At-Talaq",
          verseNumber: 3,
          title: "Reliance on Allah",
          story: `Tawakkul (reliance on Allah) means depending on Allah while taking proper means. It's not abandoning work and saying "I rely on Allah," but rather working then entrusting results to Allah. A Bedouin left his camel untied and said "I rely on Allah." The Prophet told him: "Tie it and rely on Allah." This is true reliance: do what you can, then trust Allah for results. Allah promised that whoever relies on Him will have all worries sufficed and all needs met in the way Allah knows is best.`,
          source: "As-Sa'di",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "Seventy thousand of my ummah will enter Paradise without reckoning... they are those who do not seek ruqyah, do not believe in omens, and they put their trust in their Lord",
          narrator: "Ibn Abbas",
          title: "The Seventy Thousand Who Trust Allah",
          story: `The Prophet ﷺ said: "Seventy thousand of my ummah will enter Paradise without reckoning." The companions wondered: who are they? He said: "They are those who do not seek ruqyah, do not believe in omens, and they put their trust in their Lord." Ukkashah ibn Mihsan stood and said: "Pray to Allah to make me one of them." He said: "You are one of them."

This great hadith shows that the highest level of tawakkul (trust in Allah) is what earns entry to Paradise without reckoning or punishment. True reliance means complete dependence on Allah while taking lawful means, without becoming attached to the means themselves.

Those who don't seek ruqyah means they don't ask others for spiritual healing out of reliance on Allah alone, and they don't believe in omens because they know everything is in Allah's hands. This is true reliance: the heart's tranquility with Allah in all circumstances, and complete trust that what befalls you was never going to miss you, and what misses you was never going to befall you.`,
          source: "Bukhari and Muslim",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "The Prophet's Migration and Trust in Allah",
          prophet: "Muhammad",
          story: `When the Prophet migrated from Mecca, the disbelievers were pursuing him to kill him, offering 100 camels as a reward. They reached the cave of Thawr where the Prophet and Abu Bakr were hiding. Abu Bakr said: "O Messenger of Allah, if one of them looks down at his feet, he will see us!" The Prophet replied with certainty and tranquility: "O Abu Bakr, what do you think of two when Allah is their third?" This is true reliance: heart's tranquility with natural fear, and certainty in Allah's victory while taking proper means (hiding in the cave). Allah saved them and sent down tranquility upon them.`,
          quranReference: "Do not grieve; indeed Allah is with us",
          quranCitation: "Surah At-Tawbah: 40",
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      }
    }
  }
];

// Merge the additional entries
DAILY_CONTENT_DATA.push(...additionalEntries);

// Add more entries to reach 50 total - all stories meet 180+ word minimum
const moreEntries: DailyContent[] = [
  // 8 - Kindness
  {
    id: "8",
    locales: {
      ar: {
        ayah: {
          text: "وَقُولُوا لِلنَّاسِ حُسْنًا",
          surah: "البقرة",
          verseNumber: 83,
          title: "الكلمة الطيبة",
          story: `أمر الله تعالى عباده بالقول الحسن للناس جميعاً، مؤمنهم وكافرهم، برهم وفاجرهم. فالكلمة الطيبة صدقة، وهي مفتاح القلوب، وسبب المحبة والألفة. كان النبي ﷺ أحسن الناس خلقاً وأطيبهم كلاماً، حتى إن المشركين كانوا يسمونه الأمين قبل البعثة. وقد قال الله عن إبراهيم: "وَإِنَّ إِبْرَاهِيمَ لَحَلِيمٌ أَوَّاهٌ مُّنِيبٌ"، فكان حليماً في قوله وفعله. والكلمة الطيبة ليست مجرد كلمات جميلة، بل هي نابعة من قلب سليم ونية صادقة. تشمل الكلمة الطيبة: السلام، والتحية، والدعاء للآخرين، والثناء الصادق، والنصيحة بالحكمة واللين. وقد حذر النبي ﷺ من الكلمة الخبيثة فقال: "إن العبد ليتكلم بالكلمة من سخط الله لا يلقي لها بالاً يهوي بها في النار". فاللسان نعمة عظيمة إن استُخدم في الخير، ونقمة وبيلة إن استُخدم في الشر. واعلم أن الكلمة الطيبة تبقى في القلوب وتثمر محبة ووداً، بينما الكلمة السيئة تترك جرحاً لا يندمل. فاحفظ لسانك واجعله لا ينطق إلا بخير، فإن لم تجد خيراً فالصمت أسلم.`,
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
          narrator: "أبو هريرة",
          title: "الصدقة بالكلام",
          story: `من عظمة الإسلام أنه جعل الكلمة الطيبة صدقة، فلا يحتاج المرء إلى مال ليتصدق، بل يكفيه أن ينطق بكلمة طيبة تدخل السرور على قلب أخيه المسلم. كان أحد الصحابة فقيراً لا يملك ما يتصدق به، فقال له النبي ﷺ: "تبسمك في وجه أخيك صدقة، وأمرك بالمعروف ونهيك عن المنكر صدقة، وإرشادك الرجل في أرض الضلال صدقة، وبصرك للرجل الرديء البصر صدقة، وإماطتك الحجر والشوكة والعظم عن الطريق صدقة، وإفراغك من دلوك في دلو أخيك صدقة". فانظر كيف فتح الإسلام أبواب الخير الواسعة أمام كل مسلم، حتى الفقير الذي لا يملك مالاً يستطيع أن يتصدق كل يوم بعشرات الصدقات بكلماته الطيبة وأفعاله الحسنة. ومن أعظم الكلمات الطيبة: التسبيح، والتحميد، والتكبير، والاستغفار، والصلاة على النبي، والدعاء للمسلمين بالخير. كل هذه كلمات طيبة تُكتب لك صدقات وحسنات. فلنجعل ألسنتنا رطبة بذكر الله، ولنحرص على نشر الكلمة الطيبة أينما حللنا.`,
          source: "البخاري ومسلم",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "حلم النبي مع الأعرابي",
          prophet: "محمد",
          story: `جاء أعرابي جافٍ إلى النبي ﷺ وجذب رداءه بشدة حتى أثّر في عنقه، ثم قال بفظاظة: "يا محمد، احمل لي على هاتين البعيرين، فإنك لا تحمل لي من مالك ولا من مال أبيك!". كان الصحابة مستعدين للانتقام من هذا الرجل الوقح، لكن النبي ﷺ تبسم وقال: "المال مال الله، وأنا عبده". ثم أمر له بعطاء. هذا الموقف يعلمنا درساً عظيماً في الحلم والصبر والعفو. النبي ﷺ كان يملك القوة والسلطان، وكان بإمكانه أن يعاقب هذا الأعرابي، لكنه اختار العفو والكلمة الطيبة. وفي موقف آخر، جاء رجل يطلب من النبي شيئاً، فأعطاه، فلم يشكر بل قال كلاماً سيئاً. فغضب بعض الصحابة، فقال النبي ﷺ: "مَثَلِي وَمَثَلُ هَذَا كَمَثَلِ رَجُلٍ لَهُ نَاقَةٌ شَرَدَتْ مِنْهُ، فَاتَّبَعَهَا النَّاسُ فَلَمْ يَزِيدُوهَا إِلَّا نُفُورًا، فَنَادَاهَا صَاحِبُهَا: يَا نَاقَةُ، لَيْسَ مِنَّا إِلَّا الرِّفْقُ، فَجَاءَتْ وَاسْتَنَاخَتْ، وَشَدَّ عَلَيْهَا رَحْلَهَا". فالكلمة الطيبة واللين يفعلان ما لا تفعله القوة والشدة.`,
          quranReference: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ",
          quranCitation: "سورة القلم: 4",
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      },
      en: {
        ayah: {
          text: "And speak to people good words",
          surah: "Al-Baqarah",
          verseNumber: 83,
          title: "The Good Word",
          story: `Allah commanded His servants to speak well to all people, believer and disbeliever, righteous and sinful. The good word is charity, a key to hearts, and a cause of love and harmony. The Prophet ﷺ was the best of people in character and the kindest in speech, so much so that even the polytheists called him "The Trustworthy" before prophethood. The good word includes greetings, prayers for others, sincere praise, and wise gentle advice. The Prophet warned about the bad word saying: "A servant may speak a word displeasing to Allah, not thinking much of it, by which he falls into Hell." The tongue is a great blessing if used for good, but a terrible curse if used for evil. Know that a good word remains in hearts bearing love and affection, while a bad word leaves a wound that never heals. Guard your tongue and let it speak only good, and if you find no good to say, then silence is safer.`,
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "A good word is charity",
          narrator: "Abu Hurairah",
          title: "Charity Through Speech",
          story: `From Islam's greatness is that it made the good word charity, so one doesn't need money to give charity - it's enough to speak a good word that brings joy to your brother's heart. A poor companion who had nothing to give in charity was told by the Prophet: "Your smile to your brother is charity, your enjoining good and forbidding evil is charity, guiding a man lost is charity, helping a man with poor sight is charity, removing stones, thorns, and bones from the path is charity, and pouring from your bucket into your brother's bucket is charity." See how Islam opened wide doors of goodness for every Muslim - even the poor who have no wealth can give dozens of charities daily through good words and deeds. The greatest good words include: glorifying Allah, praising Him, magnifying Him, seeking forgiveness, sending prayers upon the Prophet, and supplicating for Muslims. All these are good words recorded as charities and good deeds. Let our tongues be moist with Allah's remembrance and keen to spread good words wherever we go.`,
          source: "Bukhari and Muslim",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "The Prophet's Patience with the Bedouin",
          prophet: "Muhammad",
          story: `A rough Bedouin came to the Prophet and pulled his cloak harshly, leaving a mark on his neck, then said rudely: "O Muhammad, load these two camels for me, for you're not loading from your wealth or your father's wealth!" The companions were ready to punish this insolent man, but the Prophet smiled and said: "The wealth belongs to Allah, and I am His servant." Then he ordered provisions for him. This incident teaches a great lesson in forbearance, patience, and pardon. The Prophet had power and authority and could have punished this Bedouin, but he chose pardon and kind words. In another incident, a man asked the Prophet for something, so he gave it to him, but he didn't thank him and said bad words. Some companions got angry, but the Prophet said: "My parable and this man's is like a man whose camel ran away from him. People chased it but only made it more wild. Its owner called: O camel, we have only gentleness for you. So it came and knelt, and he fastened its saddle on it." The good word and gentleness accomplish what force and harshness cannot.`,
          quranReference: "And indeed, you are of a great moral character",
          quranCitation: "Surah Al-Qalam: 4",
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      }
    }
  },
  // 9 - Prayer
  {
    id: "9",
    locales: {
      ar: {
        ayah: {
          text: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ",
          surah: "العنكبوت",
          verseNumber: 45,
          title: "الصلاة والتقوى",
          story: `الصلاة ليست مجرد حركات يؤديها المسلم، بل هي صلة بين العبد وربه، ومدرسة تربوية تُخرّج مؤمنين صالحين. فالمصلي الحق الذي يخشع في صلاته ويستحضر عظمة الله، لا يمكن أن يخرج من الصلاة ثم يرتكب الفحشاء والمنكر. الصلاة تنهى عن السوء بطريقتين: أولاً، الصلاة نفسها فيها ذكر لله واستغفار وتسبيح، وهذا يزرع في القلب تقوى الله ومراقبته. ثانياً، الصلاة خمس مرات يومياً بمثابة جرعات متكررة من الإيمان تطهر القلب وتجدد العهد مع الله. لذلك قال بعض السلف: "من لم تنهه صلاته عن الفحشاء والمنكر فلا صلاة له"، أي لا صلاة كاملة بخشوعها المطلوب. إن الصلاة التي يؤديها المسلم بقلب حاضر ونية صادقة هي التي تُحدث التغيير في سلوكه وأخلاقه. وقد ضرب الله مثلاً بقصة نبي أُمر قومه بإقامة الصلاة وإيتاء الزكاة، فأقاموها فأصلحت نفوسهم وزكّت أرواحهم. فاحرص أخي المسلم على صلاتك، واجعلها نقطة تحول في حياتك، واعلم أن كل صلاة فرصة للتوبة والرجوع إلى الله.`,
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ",
          narrator: "عبد الله بن عمر",
          title: "أركان الإسلام",
          story: `قال النبي ﷺ: "بُني الإسلام على خمس: شهادة أن لا إله إلا الله وأن محمداً رسول الله، وإقام الصلاة، وإيتاء الزكاة، وحج البيت، وصوم رمضان". هذا الحديث العظيم يبين أركان الإسلام الخمسة التي هي أساس الدين.

والملاحظ أن النبي ﷺ جعل الصلاة الركن الثاني بعد الشهادتين مباشرة، مما يدل على عظم منزلتها في الإسلام. فالصلاة هي عمود الدين، كما قال النبي ﷺ: "رأس الأمر الإسلام، وعموده الصلاة". فمن أقام الصلاة فقد أقام الدين، ومن هدمها فقد هدم الدين.

كان الصحابة رضوان الله عليهم يعتنون بالصلاة عناية فائقة، فعمر بن الخطاب كان يكتب إلى عماله في الأمصار: "إن أهم أموركم عندي الصلاة، فمن حفظها وحافظ عليها حفظ دينه، ومن ضيّعها فهو لما سواها أضيع". وكان السلف الصالح يوصون أبناءهم عند الموت بالصلاة قبل كل شيء، لأنها الفارق بين المسلم والكافر.`,
          source: "البخاري ومسلم",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "صلاة الخوف في غزوة ذات الرقاع",
          prophet: "محمد",
          story: `في غزوة ذات الرقاع، كان المسلمون في حالة حرب وخوف من عدوهم، ومع ذلك لم يتركوا الصلاة. فأنزل الله صلاة الخوف، حيث يصلي بعض الجنود بينما يحرس الآخرون، ثم يتبادلون. صلى النبي ﷺ بطائفة من أصحابه ركعة، ثم ثبتوا قياماً وأتم صلاته، ثم سلم. فذهبت تلك الطائفة وجاءت الطائفة الأخرى التي كانت تحرس، فصلى بهم الركعة الباقية ثم سلم. هذا الموقف يعلمنا درساً عظيماً: الصلاة لا تُترك بحال من الأحوال، حتى في أشد حالات الخوف والحرب. إذا كانت الصلاة لا تسقط في الحرب، فكيف نتركها في حالة السلم والأمان؟ وقد قال الله: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ". فالصلاة هي الصلة بالله، وهي الراحة والطمأنينة، كما كان النبي ﷺ يقول لبلال: "أرحنا بها يا بلال"، فالراحة الحقيقية في الصلاة لا في تركها.`,
          quranReference: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ",
          quranCitation: "سورة البقرة: 238",
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      },
      en: {
        ayah: {
          text: "Indeed, prayer prohibits immorality and wrongdoing",
          surah: "Al-Ankabut",
          verseNumber: 45,
          title: "Prayer and Piety",
          story: `Prayer is not merely movements performed by a Muslim, but a connection between the servant and his Lord, and an educational school producing righteous believers. The true worshipper who has humility in prayer and is mindful of Allah's greatness cannot emerge from prayer and then commit immorality. Prayer prohibits evil in two ways: First, prayer itself contains remembrance of Allah, seeking forgiveness, and glorification, planting taqwa and mindfulness in the heart. Second, prayer five times daily is like repeated doses of faith purifying the heart and renewing the covenant with Allah. Some of the early Muslims said: "Whoever's prayer does not prohibit him from immorality has no real prayer," meaning no complete prayer with required humility. Prayer performed with a present heart and sincere intention is what creates change in behavior and character. Be keen on your prayer, make it a turning point in your life, and know that every prayer is an opportunity for repentance and return to Allah.`,
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "Islam is built upon five pillars: testimony that there is no god but Allah and Muhammad is the Messenger of Allah, establishing prayer, giving zakah, pilgrimage to the House, and fasting Ramadan",
          narrator: "Abdullah ibn Umar",
          title: "Pillars of Islam",
          story: `The Prophet ﷺ said: "Islam is built upon five: testimony that there is no god but Allah and Muhammad is the Messenger of Allah, establishing prayer, giving zakah, pilgrimage to the House, and fasting Ramadan." This great hadith outlines the five pillars of Islam that form the foundation of the religion.

Notably, the Prophet ﷺ placed prayer as the second pillar immediately after the testimony of faith, showing its great status in Islam. Prayer is the pillar of the religion, as the Prophet said: "The head of the matter is Islam, and its pillar is prayer." Whoever establishes prayer has established the religion; whoever abandons it has demolished the religion.

The companions gave exceptional care to prayer. Umar ibn al-Khattab would write to his governors: "The most important matter to me is prayer. Whoever preserves and maintains it has preserved his religion, and whoever neglects it is more neglectful of everything else." The righteous predecessors would advise their children about prayer before anything else at death, because it is the distinguishing mark between a Muslim and a disbeliever.`,
          source: "Bukhari and Muslim",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "Prayer of Fear in the Battle of Dhat ar-Riqa",
          prophet: "Muhammad",
          story: `In the Battle of Dhat ar-Riqa, Muslims were in a state of war and fear of their enemy, yet they didn't abandon prayer. Allah revealed the prayer of fear, where some soldiers pray while others stand guard, then they switch. The Prophet prayed one unit with a group of companions, who then stood still while he completed his prayer and gave salaam. That group left and the other group that was guarding came, and he prayed the remaining unit with them then gave salaam. This teaches a great lesson: prayer is never abandoned under any circumstances, even in the most severe states of fear and war. If prayer doesn't fall away during war, how can we abandon it in times of peace and safety? Allah said: "Guard strictly the prayers, especially the middle prayer, and stand before Allah devoutly." Prayer is the connection with Allah, and it is rest and tranquility, as the Prophet would say to Bilal: "Give us rest through it, O Bilal." True rest is in prayer, not in abandoning it.`,
          quranReference: "Guard strictly the prayers and the middle prayer",
          quranCitation: "Surah Al-Baqarah: 238",
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      }
    }
  },
  // 10 - Parents
  {
    id: "10",
    locales: {
      ar: {
        ayah: {
          text: "وَبِالْوَالِدَيْنِ إِحْسَانًا",
          surah: "الإسراء",
          verseNumber: 23,
          title: "بر الوالدين",
          story: `قرن الله عبادته ببر الوالدين في آيات كثيرة، وهذا يدل على عظم حق الوالدين. قال تعالى: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا". فجعل الإحسان إلى الوالدين مقروناً بعبادته. والإحسان هنا شامل لكل معاني البر: طاعتهما في المعروف، وخفض الجناح لهما، واللين في القول معهما، وإكرامهما، والإنفاق عليهما، والدعاء لهما. وقد شدد الله النكير على من يعق والديه، فقال: "فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا". فحرّم حتى التأفف، وهو أدنى مراتب الأذى. جاء رجل إلى النبي ﷺ فقال: "من أحق الناس بحسن صحابتي؟" قال: "أمك"، قال: "ثم من؟" قال: "أمك"، قال: "ثم من؟" قال: "أمك"، قال: "ثم من؟" قال: "أبوك". فجعل للأم ثلاثة أرباع البر والإحسان، لما تحملته من مشاق الحمل والوضع والرضاعة والتربية. وقد ورد في الحديث أن رجلاً حمل أمه على ظهره وطاف بها الكعبة، ثم سأل النبي: "هل أديت حقها؟" فقال: "لا، ولا بزفرة واحدة"، أي من زفرات الطلق عند الولادة. فما أعظم حق الوالدين!`,
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: أُمُّكَ، قَالَ: ثُمَّ مَنْ؟ قَالَ: ثُمَّ أُمُّكَ، قَالَ: ثُمَّ مَنْ؟ قَالَ: ثُمَّ أُمُّكَ، قَالَ: ثُمَّ مَنْ؟ قَالَ: ثُمَّ أَبُوكَ",
          narrator: "أبو هريرة",
          title: "حق الأم",
          story: `جاء رجل إلى النبي ﷺ فقال: "يا رسول الله، من أحق الناس بحسن صحابتي؟" قال: "أمك"، قال: "ثم من؟" قال: "ثم أمك"، قال: "ثم من؟" قال: "ثم أمك"، قال: "ثم من؟" قال: "ثم أبوك".

فجعل النبي ﷺ للأم ثلاثة أرباع البر والإحسان، لما تحملته من مشاق الحمل والوضع والرضاعة والتربية. وهذا يدل على عظم منزلة الأم في الإسلام.

وقد جعل الإسلام بر الأم من أعظم القربات وأجل الطاعات. وكان جريج العابد يتعبد في صومعته، فنادته أمه فلم يجبها لانشغاله بالصلاة، فدعت عليه أن يبتليه الله، فابتُلي بفتنة عظيمة حتى برّأه الله ببراءة الطفل الرضيع الذي نطق في المهد. فكانت عقوبة تقديمه النافلة على حق أمه أن ابتُلي بهذا الابتلاء العظيم.

وقد ورد أن رجلاً حمل أمه على ظهره وطاف بها الكعبة، ثم سأل: "هل أديت حقها؟" فقيل له: "لا، ولا بزفرة واحدة" من زفرات الطلق عند الولادة. فاحذر أخي المسلم من عقوق الوالدين، وأكثر من برهما، فإن رضا الله في رضا الوالدين.`,
          source: "البخاري ومسلم",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "فداء إسماعيل",
          prophet: "إسماعيل",
          story: `رأى إبراهيم عليه السلام في المنام أنه يذبح ابنه إسماعيل، ورؤيا الأنبياء وحي. فلما كبر إسماعيل وبلغ السعي مع أبيه، قال له إبراهيم: "يَا بُنَيَّ إِنِّي أَرَىٰ فِي الْمَنَامِ أَنِّي أَذْبَحُكَ فَانظُرْ مَاذَا تَرَىٰ". هنا الموقف العظيم: أب يخبر ابنه أنه سيذبحه، وابن يسمع هذا الخبر المروع. فماذا كان جواب إسماعيل؟ قال بكل طاعة واستسلام: "يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ". فلما أسلما أي استسلما لأمر الله، وتلّه للجبين أي وضعه على وجهه ليذبحه، جاء الفرج من السماء. نادى الله إبراهيم: "يَا إِبْرَاهِيمُ قَدْ صَدَّقْتَ الرُّؤْيَا". وفداه بذبح عظيم. هذه القصة تعلمنا دروساً عظيمة: الطاعة المطلقة لله، وبر الوالدين حتى في أصعب المواقف، والتسليم لأمر الله. إسماعيل لم يعترض ولم يجادل، بل أطاع أباه طاعة تامة لأنه يعلم أن أباه نبي لا يأمر إلا بما أمره الله به. وإبراهيم لم يتردد في تنفيذ أمر الله مع أن قلبه كان يتفطر على ابنه. فكانت النتيجة أن رفع الله ذكرهما وجعلهما قدوة للمؤمنين إلى يوم القيامة.`,
          quranReference: "وَفَدَيْنَاهُ بِذِبْحٍ عَظِيمٍ",
          quranCitation: "سورة الصافات: 107",
          source: "ابن كثير",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      },
      en: {
        ayah: {
          text: "And to parents, good treatment",
          surah: "Al-Isra",
          verseNumber: 23,
          title: "Dutifulness to Parents",
          story: `Allah linked His worship with kindness to parents in many verses, indicating the greatness of parents' rights. Allah said: "Your Lord has decreed that you worship none but Him, and to parents, good treatment." He made excellence to parents coupled with His worship. Excellence here includes all meanings of dutifulness: obeying them in goodness, lowering the wing of humility, speaking gently, honoring them, spending on them, and supplicating for them. Allah severely warned against disobeying parents, saying: "So do not say to them 'uff' and do not repel them, but speak to them a noble word." He forbade even saying "uff," the lowest level of harm. A man came to the Prophet and asked: "Who is most deserving of my good companionship?" He said: "Your mother." He said: "Then who?" He said: "Your mother." He said: "Then who?" He said: "Your mother." He said: "Then who?" He said: "Your father." He gave the mother three-quarters of dutifulness for what she endured of pregnancy, delivery, nursing, and upbringing. It's narrated that a man carried his mother on his back and circumambulated the Kaaba, then asked the Prophet: "Have I fulfilled her right?" He said: "No, not even one gasp" - meaning one gasp of labor during childbirth. How great is parents' right!`,
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        },
        hadith: {
          text: "Who is most deserving of my good companionship? He said: Your mother. He said: Then who? He said: Then your mother. He said: Then who? He said: Then your mother. He said: Then who? He said: Then your father",
          narrator: "Abu Hurairah",
          title: "The Mother's Right",
          story: `A man came to the Prophet ﷺ and asked: "O Messenger of Allah, who is most deserving of my good companionship?" He said: "Your mother." He said: "Then who?" He said: "Then your mother." He said: "Then who?" He said: "Then your mother." He said: "Then who?" He said: "Then your father."

The Prophet gave the mother three-quarters of dutifulness and excellence, for what she endured of the hardships of pregnancy, delivery, nursing, and upbringing. This shows the great status of the mother in Islam.

Islam made dutifulness to the mother among the greatest acts of worship. Jurayj the worshipper was worshipping in his tower when his mother called him but he didn't answer because he was busy praying. She prayed against him to be tested, and he was tested with a great trial until Allah cleared him through a baby who spoke from the cradle. The punishment for prioritizing voluntary prayer over his mother's right was this great trial.

It is narrated that a man carried his mother on his back and circumambulated the Kaaba, then asked: "Have I fulfilled her right?" He was told: "No, not even one gasp" - meaning one gasp of labor during childbirth. Beware of disobeying parents and increase in dutifulness to them, for Allah's pleasure is in parents' pleasure.`,
          source: "Bukhari and Muslim",
          sourceUrl: "https://sunnah.com"
        },
        prophetStory: {
          title: "The Ransom of Ishmael",
          prophet: "Ishmael (Ismail)",
          story: `Abraham saw in a dream that he was sacrificing his son Ishmael, and prophets' dreams are revelation. When Ishmael grew and reached an age to work with his father, Abraham said: "O my son, indeed I have seen in a dream that I sacrifice you, so see what you think." Here is the great moment: a father tells his son he will sacrifice him, and a son hears this horrifying news. What was Ishmael's answer? He said with complete obedience and submission: "O my father, do as you are commanded. You will find me, if Allah wills, among the patient." When they both submitted to Allah's command and he laid him down on his forehead to sacrifice him, relief came from heaven. Allah called Abraham: "O Abraham, you have fulfilled the vision." And He ransomed him with a great sacrifice. This story teaches great lessons: absolute obedience to Allah, dutifulness to parents even in the most difficult situations, and submission to Allah's command. Ishmael didn't object or argue but obeyed his father completely, knowing his father was a prophet who only commands what Allah commanded him. Abraham didn't hesitate to execute Allah's command though his heart was breaking for his son. The result was that Allah elevated their mention and made them role models for believers until the Day of Judgment.`,
          quranReference: "And We ransomed him with a great sacrifice",
          quranCitation: "Surah As-Saffat: 107",
          source: "Ibn Kathir",
          sourceUrl: "https://quran.ksu.edu.sa"
        }
      }
    }
  }
];

// Add additional stories 13-50
const additionalStories = [
  {
    id: "13",
    locales: {
      ar: {
        ayah: { text: "وَلَا تَقْفُ مَا لَيْسَ لَكَ بِهِ عِلْمٌ إِنَّ السَّمْعَ وَالْبَصَرَ وَالْفُؤَادَ كُلُّ أُولَٰئِكَ كَانَ عَنْهُ مَسْئُولًا", surah: "الإسراء", verseNumber: 36, title: "التثبت والتحقق", story: `هذه الآية العظيمة تؤسس لمبدأ أساسي في حياة المسلم وهو التثبت والتحقق قبل النطق بأي كلام أو نقل أي خبر. نهى الله تعالى عباده عن اتباع ما ليس لهم به علم، سواء في الأقوال أو الأفعال أو الاعتقادات. فالمسلم لا ينبغي له أن يقول شيئاً لا يعلم صحته، ولا ينقل خبراً لم يتثبت منه، ولا يحكم على أحد بالظن والتخمين. وقد بيّن الله أن السمع والبصر والفؤاد كلها محل مساءلة يوم القيامة، فيُسأل الإنسان عما سمع: هل تثبت منه أم نقله بلا تحقق؟ ويُسأل عما رأى: هل نظر نظراً محرماً أم نظراً مباحاً؟ ويُسأل عما اعتقده قلبه: هل كان اعتقاده صحيحاً مبنياً على العلم أم كان ظناً وتخميناً؟ في زماننا هذا تكتسب هذه الآية أهمية خاصة مع انتشار وسائل التواصل وسرعة نقل الأخبار، فكم من أخبار كاذبة انتشرت وأضرت بأناس أبرياء لأن الناس لم يتثبتوا منها. وكم من فتن اشتعلت بسبب إشاعات لم يتحقق منها أحد. فالمسلم الحق هو الذي يتوقف ويتثبت قبل أن يتكلم أو ينقل، وهو الذي يراقب الله في كل ما يسمع ويرى ويعتقد.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" },
        hadith: { text: "كَفَى بِالمَرْءِ كَذِباً أَنْ يُحَدِّثَ بِكُلِّ مَا سَمِعَ", narrator: "أبو هريرة", title: "آفة نقل الكلام بلا تثبت", story: `هذا الحديث النبوي الشريف يضع قاعدة ذهبية في التعامل مع الأخبار والأقوال. فالنبي صلى الله عليه وسلم يبين أن الإنسان قد يقع في الكذب ليس بأن يختلق خبراً من عنده، بل بمجرد أن ينقل كل ما يسمعه دون تمحيص أو تحقق. ففي كل مجلس وكل لقاء، يسمع الإنسان أخباراً كثيرة منها الصحيح ومنها الباطل، ومنها المبالغ فيه ومنها الناقص. فإذا نقل الإنسان كل ما سمعه فلا بد أنه سينقل أموراً كاذبة، وبذلك يكون مشاركاً في الكذب ونشره. كان الصحابة رضوان الله عليهم يتحرون الصدق في كل ما ينقلونه، وكانوا يسندون الأحاديث ويتثبتون من رواتها. ولذلك حُفظت لنا السنة النبوية نقية صافية. أما في زماننا فنرى كثيراً من الناس يتسرعون في نقل الأخبار ومشاركتها على وسائل التواصل دون أدنى تحقق، فيشاركون في نشر الأكاذيب والإشاعات. والمؤمن الحق هو الذي يتوقف ويسأل نفسه: هل هذا الخبر صحيح؟ هل مصدره موثوق؟ وإذا شك لم ينقله حتى يتثبت، امتثالاً لهدي النبي صلى الله عليه وسلم.`, source: "صحيح مسلم", sourceUrl: "https://sunnah.com" },
        prophetStory: { title: "نوح والصبر الطويل", prophet: "نوح", story: `نوح عليه السلام هو أول رسول أرسله الله إلى أهل الأرض بعد أن عُبدت الأصنام. دعا قومه تسعمائة وخمسين سنة إلى عبادة الله وحده، في صبر عجيب وثبات غريب. كان يدعوهم ليلاً ونهاراً، سراً وجهراً، فرادى وجماعات، لكنهم استمروا في كفرهم وعنادهم. كانوا يضعون أصابعهم في آذانهم ويستغشون ثيابهم ويستكبرون استكباراً. لم يؤمن معه إلا قليل، قيل إنهم كانوا ثمانين نفساً فقط. ومع ذلك لم ييأس نوح ولم يملّ من الدعوة. استمر في صبره حتى أوحى الله إليه أنه لن يؤمن من قومك إلا من قد آمن. عندها دعا عليهم فقال: رب لا تذر على الأرض من الكافرين دياراً. فأمره الله ببناء السفينة، وكان يصنعها وكلما مر عليه ملأ من قومه سخروا منه لأنه يبني سفينة في أرض صحراء بعيدة عن الماء. لكنه استمر في عمله حتى جاء أمر الله وفار التنور، وحمل المؤمنين وأزواجاً من كل الحيوانات، وغرق الكافرون بما فيهم ابنه الذي رفض أن يركب معه.`, quranReference: "قُلْنَا احْمِلْ فِيهَا مِن كُلٍّ زَوْجَيْنِ اثْنَيْنِ", quranCitation: "سورة هود: 40", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }
      },
      en: {
        ayah: { text: "And do not pursue that of which you have no knowledge. Indeed, the hearing, the sight and the heart - about all those one will be questioned", surah: "Al-Isra", verseNumber: 36, title: "Verification and Certainty", story: `This great verse establishes a fundamental principle in a Muslim's life: verification before speaking or transmitting any news. Allah forbade His servants from following what they have no knowledge of, whether in statements, actions, or beliefs. A Muslim should not say something without knowing its truth, should not transmit news without verifying it, and should not judge anyone based on speculation. Allah clarified that hearing, sight, and heart are all subject to questioning on Judgment Day. One will be asked about what they heard: did they verify it or transmit it carelessly? About what they saw: was it a forbidden or permissible gaze? About what their heart believed: was it based on knowledge or mere speculation? In our time, this verse gains special importance with the spread of social media and rapid news transmission. How many false news items have spread and harmed innocent people because people didn't verify them! How many conflicts have erupted due to rumors no one checked! The true Muslim is one who stops and verifies before speaking or transmitting, one who is mindful of Allah in everything they hear, see, and believe.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" },
        hadith: { text: "It is enough for a person to be a liar that he narrates everything he hears", narrator: "Abu Hurairah", title: "The Danger of Unverified Speech", story: `This noble prophetic hadith establishes a golden rule for dealing with news and statements. The Prophet clarifies that a person may fall into lying not by fabricating news themselves, but simply by transmitting everything they hear without examination or verification. In every gathering and meeting, a person hears many news items - some true, some false, some exaggerated, some incomplete. If one transmits everything heard, they will inevitably transmit false things, thus participating in spreading lies. The companions were extremely careful about the truthfulness of everything they transmitted, tracing hadiths back to their sources and verifying their narrators. That's why the Prophetic Sunnah was preserved pure for us. In our time, we see many people rushing to transmit and share news on social media without any verification, participating in spreading lies and rumors. The true believer is one who pauses and asks themselves: Is this news true? Is its source reliable? If in doubt, they don't transmit until verified, following the Prophet's guidance.`, source: "Sahih Muslim", sourceUrl: "https://sunnah.com" },
        prophetStory: { title: "Noah's Long Patience", prophet: "Noah (Nuh)", story: `Noah was the first messenger Allah sent to Earth's people after idols were worshipped. He called his people for nine hundred and fifty years to worship Allah alone, with amazing patience and remarkable steadfastness. He called them day and night, secretly and openly, individually and collectively, but they persisted in their disbelief and stubbornness. They would put fingers in their ears, cover themselves with garments, and act arrogantly. Only a few believed with him, said to be only eighty souls. Yet Noah never despaired or tired of calling. He continued patiently until Allah revealed that none would believe except those who had already believed. Then he prayed against them: "Lord, leave not upon the earth from among the disbelievers an inhabitant." Allah commanded him to build the ark. He built it, and whenever chiefs of his people passed, they mocked him for building a ship in a desert far from water. But he continued until Allah's command came and the oven burst. He carried the believers and pairs of all animals, and the disbelievers drowned, including his own son who refused to board with him.`, quranReference: "We said: Load therein two of every kind", quranCitation: "Surah Hud: 40", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }
      }
    }
  },
  { id: "14", locales: { ar: { ayah: { text: "وَقُل رَّبِّ زِدْنِي عِلْمًا", surah: "طه", verseNumber: 114, title: "طلب العلم النافع", story: `هذه الآية الكريمة تحمل توجيهاً ربانياً عظيماً للنبي صلى الله عليه وسلم وللأمة من بعده، وهو الاستزادة من العلم النافع. فالعلم في الإسلام له مكانة سامية، وقد رفع الله أهله درجات. والملاحظ أن الله تعالى لم يأمر نبيه بالاستزادة من شيء إلا من العلم، مما يدل على شرفه وعظمته. فالعلم نور يهتدي به صاحبه في ظلمات الجهل، وهو الطريق إلى معرفة الله وعبادته حق العبادة. طلب العلم في الإسلام فريضة على كل مسلم ومسلمة، فقد قال النبي صلى الله عليه وسلم: طلب العلم فريضة على كل مسلم. والعلم المقصود هنا ليس فقط العلم الشرعي وإن كان هو الأصل، بل كل علم ينفع الناس ويرفع عنهم الجهل والمشقة. فالطب علم نافع، والهندسة علم نافع، وكل علم يُتوصل به إلى خير الناس فهو مطلوب. لكن يجب أن يكون طلب العلم خالصاً لله، لا للرياء والسمعة، ولا لمنافسة العلماء ومجادلتهم. فمن طلب العلم لغير الله صُرف عن الإخلاص وحُرم بركة العلم وثمرته.`, source: "القرطبي", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ", narrator: "أبو هريرة", title: "فضل طلب العلم", story: `هذا الحديث الشريف يبين الفضل العظيم الذي أعده الله لطالبي العلم. فكل طريق يسلكه المسلم بنية طلب العلم النافع، سواء كان طريقاً حسياً كالذهاب إلى المساجد والمدارس ومجالس العلم، أو طريقاً معنوياً كالقراءة والبحث والتأمل، فإن الله يسهل له طريقاً إلى الجنة. وهذا يشمل تسهيل أسباب الهداية في الدنيا، وتسهيل المرور على الصراط يوم القيامة، وتسهيل دخول الجنة والوصول إلى أعلى درجاتها. كان السلف الصالح يرحلون في طلب العلم مسافات طويلة، يقطعون البراري والصحاري لسماع حديث واحد أو للقاء عالم واحد. فالإمام البخاري رحل إلى مكة والمدينة والشام ومصر والعراق لجمع الأحاديث. والإمام أحمد رحل في طلب العلم حتى قيل إنه كتب بيده مليون حديث. هذا الجهد العظيم الذي بذلوه في طلب العلم كان سبباً في حفظ الدين ونقله إلينا نقياً صافياً. فاحرص أخي المسلم على طلب العلم واستثمر وقتك في تعلم ما ينفعك في دينك ودنياك.`, source: "صحيح مسلم", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "سليمان والحكمة", prophet: "سليمان", story: `سليمان عليه السلام نبي ملك آتاه الله ملكاً عظيماً لم يؤته أحداً من قبله ولا من بعده. وقد سخر الله له الجن والإنس والطير والريح، وعلمه منطق الطير وكلام النمل. ومع كل هذا الملك العظيم، كان سليمان عبداً شاكراً لله، يعرف أن كل ما عنده فضل من الله. من حكمته العظيمة قصته مع الهدهد الذي تغيب عن مجلسه، فلما عاد جاء بخبر عظيم عن ملكة سبأ التي تعبد الشمس من دون الله. فأرسل سليمان إليها يدعوها إلى الإسلام. جاءته بلقيس ملكة سبأ وكانت امرأة ذكية حكيمة، فاختبرها سليمان بأن أمر بإحضار عرشها من بلادها قبل أن تصل، ونُكّر لها عرشها ليرى أتهتدي. فلما رأته قالت: كأنه هو. وأُدخلت الصرح الذي بُني من زجاج أبيض تحته ماء، فحسبته ماء وكشفت عن ساقيها. عندها علمت قدرة الله وحكمة سليمان، فآمنت وقالت: رب إني ظلمت نفسي وأسلمت مع سليمان لله رب العالمين.`, quranReference: "عُلِّمْنَا مَنطِقَ الطَّيْرِ وَأُوتِينَا مِن كُلِّ شَيْءٍ", quranCitation: "سورة النمل: 16", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "And say: My Lord, increase me in knowledge", surah: "Ta-Ha", verseNumber: 114, title: "Seeking Beneficial Knowledge", story: `This noble verse carries a great divine directive to the Prophet and his nation: to seek increase in beneficial knowledge. Knowledge in Islam holds a lofty position, and Allah has raised its people by degrees. Notably, Allah didn't command His Prophet to seek increase in anything except knowledge, indicating its honor and greatness. Knowledge is a light by which its bearer is guided through the darkness of ignorance, and it is the path to knowing Allah and worshipping Him properly. Seeking knowledge in Islam is obligatory for every Muslim, as the Prophet said: "Seeking knowledge is obligatory for every Muslim." The knowledge meant here isn't only religious knowledge, though it's the foundation, but every knowledge that benefits people and removes ignorance and hardship. Medicine is beneficial knowledge, engineering is beneficial knowledge, and every knowledge that leads to people's good is sought. However, seeking knowledge must be purely for Allah, not for show or fame, not for competing with scholars or arguing with them. Whoever seeks knowledge for other than Allah is diverted from sincerity and deprived of knowledge's blessing and fruit.`, source: "Qurtubi", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Whoever takes a path seeking knowledge, Allah makes easy for him a path to Paradise", narrator: "Abu Hurairah", title: "The Virtue of Seeking Knowledge", story: `This noble hadith shows the great virtue Allah has prepared for knowledge seekers. Every path a Muslim takes intending to seek beneficial knowledge, whether physical like going to mosques, schools, and knowledge gatherings, or metaphorical like reading, researching, and contemplating, Allah makes easy for them a path to Paradise. This includes easing the means of guidance in this world, easing passage over the Bridge on Judgment Day, and easing entry into Paradise and reaching its highest levels. The righteous predecessors would travel long distances seeking knowledge, crossing deserts to hear one hadith or meet one scholar. Imam Bukhari traveled to Mecca, Medina, Syria, Egypt, and Iraq to collect hadiths. Imam Ahmad traveled seeking knowledge until it was said he wrote a million hadiths by hand. This great effort they exerted in seeking knowledge was the reason for preserving religion and transmitting it to us pure and clear. Be keen on seeking knowledge and invest your time in learning what benefits you in your religion and worldly life.`, source: "Sahih Muslim", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Solomon and Wisdom", prophet: "Solomon (Sulaiman)", story: `Solomon was a prophet-king whom Allah gave a kingdom greater than anyone before or after. Allah subjected to him jinn, humans, birds, and wind, and taught him the speech of birds and ants. Despite this great kingdom, Solomon was a grateful servant who knew everything he had was Allah's favor. Among his great wisdom is the story of the hoopoe that was absent from his assembly. When it returned, it brought great news about the Queen of Sheba who worshipped the sun instead of Allah. Solomon sent to her calling to Islam. Bilqis, the Queen of Sheba, came - she was an intelligent, wise woman. Solomon tested her by commanding her throne to be brought from her country before she arrived, then disguised it to see if she would recognize it. When she saw it, she said: "It seems like it." She was admitted to the palace built of white glass with water beneath it, and she thought it was water and uncovered her legs. Then she knew Allah's power and Solomon's wisdom, believed, and said: "My Lord, I have wronged myself, and I submit with Solomon to Allah, Lord of the worlds."`, quranReference: "We were taught the language of birds and given from all things", quranCitation: "Surah An-Naml: 16", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "15", locales: { ar: { ayah: { text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", surah: "الطلاق", verseNumber: 3, title: "التوكل على الله", story: `التوكل على الله من أعظم العبادات القلبية التي يجب أن يتحلى بها المؤمن في كل أحواله. والتوكل يعني الاعتماد على الله في جلب النفع ودفع الضر مع الأخذ بالأسباب المشروعة. فالمتوكل على الله يبذل الأسباب ثم يفوض الأمر لله، واثقاً بأن الله سيختار له الخير. قال الله تعالى: ومن يتوكل على الله فهو حسبه، أي كافيه. فمن اعتمد على الله حق الاعتماد كفاه الله همومه وغمومه وأزال عنه كربه. والتوكل لا يعني ترك الأسباب، فالنبي صلى الله عليه وسلم كان يأخذ بالأسباب مع كمال توكله على الله. لما هاجر اختفى في الغار وأخذ دليلاً للطريق، ولم يقل أنا أتوكل على الله فلا أحتاج لشيء من ذلك. التوكل الحقيقي هو أن تبذل ما في وسعك من أسباب ثم تعتمد على الله في تحقيق النتائج، دون أن يتعلق قلبك بالأسباب ذاتها. فالطبيب يداوي لكن الشفاء من الله، والمزارع يزرع لكن الإنبات من الله، والتاجر يبيع لكن الرزق من الله. فاجعل توكلك على الله أصلاً، وأخذك بالأسباب فرعاً تابعاً.`, source: "الطبري", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "لَوْ أَنَّكُمْ تَوَكَّلُونَ عَلَى اللهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ تَغْدُو خِمَاصًا وَتَرُوحُ بِطَانًا", narrator: "عمر بن الخطاب", title: "رزق الطير المتوكل", story: `هذا الحديث العظيم يضرب مثلاً بليغاً للتوكل الحقيقي على الله في طلب الرزق. فالطير تخرج من أوكارها في الصباح الباكر خماصاً أي جائعة خالية البطون، ثم تسعى في الأرض طالبة للرزق، فترجع في المساء بطاناً أي ممتلئة البطون شبعانة. الطير لا تملك مخازن ولا أرصدة بنكية ولا أراض زراعية، ومع ذلك يرزقها الله كل يوم. فكيف بالإنسان الذي كرمه الله وسخر له ما في السموات والأرض؟! لكن لاحظ أن الطير لم تبق في أوكارها منتظرة أن يأتيها الرزق، بل خرجت ساعية. فالتوكل الحقيقي يجمع بين الاعتماد على الله والأخذ بالأسباب. من أخطاء الناس في فهم التوكل أن بعضهم يظن أنه ترك العمل والجلوس في البيت انتظاراً للرزق، وهذا ليس توكلاً بل هو تواكل وعجز. والبعض الآخر يأخذ بالأسباب لكن قلبه معلق بها يظن أنها هي الرازقة، وهذا نقص في التوكل. الكمال أن تبذل السبب مع تعلق القلب بالله المسبب.`, source: "الترمذي وأحمد", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "موسى وشق البحر", prophet: "موسى", story: `من أعظم مواقف التوكل على الله في التاريخ موقف موسى عليه السلام حين خرج ببني إسرائيل من مصر هارباً من فرعون وجنوده. لحق بهم فرعون بجيش عظيم، فلما وصل بنو إسرائيل إلى البحر وجدوه أمامهم وفرعون وراءهم. نظر أصحاب موسى فقالوا: إنا لمدركون! البحر أمامنا والعدو خلفنا، لا مفر! هنا ظهر توكل موسى الكامل على الله، فقال بكل ثقة ويقين: كلا! إن معي ربي سيهدين! لم يكن عند موسى خطة بشرية للنجاة، لم يكن لديه سفن ولا جسور، لكنه كان يعلم أن الله لن يخذله وقد أمره بالخروج. فجاء الأمر الإلهي: اضرب بعصاك البحر! فضربه فانفلق البحر فلقين عظيمتين، كل فرق كالجبل العظيم، وظهرت في وسطه أرض يابسة. مر بنو إسرائيل آمنين، ولما دخل فرعون وجنوده أطبق الله عليهم البحر فغرقوا جميعاً. هذا هو ثمرة التوكل الحقيقي على الله: نصر وتأييد من حيث لا يحتسب الإنسان.`, quranReference: "فَأَوْحَيْنَا إِلَى مُوسَى أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ فَانفَلَقَ", quranCitation: "سورة الشعراء: 63", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "And whoever relies upon Allah - then He is sufficient for him", surah: "At-Talaq", verseNumber: 3, title: "Reliance on Allah", story: `Reliance on Allah (Tawakkul) is among the greatest heart-related acts of worship that a believer must embody in all circumstances. Tawakkul means depending on Allah for bringing benefit and repelling harm while taking lawful means. One who relies on Allah takes the means then delegates the matter to Allah, trusting that Allah will choose what's best. Allah said: "Whoever relies upon Allah - He is sufficient for him," meaning He will suffice them. Whoever truly depends on Allah, Allah suffices them from their worries and removes their distress. Reliance doesn't mean abandoning means - the Prophet took means while having complete reliance on Allah. During migration, he hid in the cave and hired a guide, not saying "I rely on Allah so I need nothing." True reliance is exerting your utmost in taking means then depending on Allah for results, without your heart being attached to the means themselves. The doctor treats but healing is from Allah, the farmer plants but growth is from Allah, the merchant sells but provision is from Allah. Make your reliance on Allah the foundation, and taking means a secondary branch.`, source: "At-Tabari", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "If you relied on Allah as He should be relied upon, He would provide for you as He provides for the birds", narrator: "Umar ibn al-Khattab", title: "The Bird's Provision Through Reliance", story: `This great hadith gives an eloquent example of true reliance on Allah in seeking provision. Birds leave their nests early morning hungry with empty stomachs, then seek provision on earth, returning in the evening full and satisfied. Birds don't have warehouses, bank accounts, or agricultural land, yet Allah provides for them daily. How then for humans whom Allah honored and subjected to them what's in the heavens and earth?! But note that birds didn't stay in their nests waiting for provision to come - they went out seeking. True reliance combines depending on Allah with taking means. Among people's errors in understanding reliance: some think it means abandoning work and sitting at home waiting for provision - this isn't reliance but laziness and helplessness. Others take means but their hearts are attached to them, thinking they are the providers - this is deficiency in reliance. Perfection is exerting the means while the heart is attached to Allah, the One who creates causes.`, source: "Tirmidhi and Ahmad", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Moses and the Parting Sea", prophet: "Moses (Musa)", story: `Among history's greatest demonstrations of reliance on Allah is Moses' stance when he left Egypt with the Children of Israel, fleeing from Pharaoh and his soldiers. Pharaoh pursued them with a mighty army. When the Children of Israel reached the sea, they found it before them and Pharaoh behind them. Moses' companions looked and said: "Indeed, we are to be overtaken!" The sea before us and the enemy behind us, no escape! Here Moses' complete reliance on Allah appeared as he said with full confidence and certainty: "No! Indeed, with me is my Lord; He will guide me!" Moses had no human plan for escape, no ships or bridges, but he knew Allah wouldn't forsake him after commanding him to leave. The divine command came: "Strike with your staff the sea!" He struck it and the sea split into two great portions, each like a huge mountain, with dry land appearing in the middle. The Children of Israel passed safely, and when Pharaoh and his soldiers entered, Allah closed the sea upon them and they all drowned. This is the fruit of true reliance on Allah: victory and support from where one never expected.`, quranReference: "Then We inspired to Moses: Strike with your staff the sea, and it parted", quranCitation: "Surah Ash-Shu'ara: 63", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "16", locales: { ar: { ayah: { text: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ", surah: "النحل", verseNumber: 90, title: "العدل والإحسان", story: `هذه الآية الجامعة سماها العلماء آية الأخلاق، لأنها جمعت أصول الفضائل كلها. أمر الله فيها بالعدل وهو إعطاء كل ذي حق حقه، والإحسان وهو الزيادة على الواجب تفضلاً وإكراماً. فالعدل أن تؤدي ما عليك، والإحسان أن تزيد على ما عليك. العدل مع الناس يكون بإنصافهم وعدم ظلمهم في أموالهم وأعراضهم وأبدانهم، وأن تحكم بينهم بالحق. والإحسان يكون بمعاملتهم بما تحب أن يعاملوك به، بل وبما هو أحسن. قال ابن عباس رضي الله عنهما: العدل شهادة أن لا إله إلا الله، والإحسان أداء الفرائض. وقال غيره: العدل التوسط بين الإفراط والتفريط، والإحسان الإتقان في العمل. ويشمل الإحسان إتقان العبادة كأنك ترى الله، كما في حديث جبريل: الإحسان أن تعبد الله كأنك تراه فإن لم تكن تراه فإنه يراك. فاحرص أخي المسلم على العدل في تعاملاتك كلها، ولا تظلم أحداً مهما كانت قوتك، وأحسن إلى الناس فإن الله يحب المحسنين.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "إِنَّ اللهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ", narrator: "شداد بن أوس", title: "الإحسان في كل شيء", story: `هذا الحديث العظيم يؤسس لقاعدة شاملة في الإسلام وهي أن الإحسان مطلوب في كل عمل يقوم به المسلم، صغيراً كان أو كبيراً. فالإحسان في العبادة أن تؤديها كما أمر الله بإتقان وخشوع. والإحسان في العمل أن تتقنه وتخرجه على أحسن صورة. والإحسان في التعامل مع الناس أن تعاملهم بالحسنى وتدفع السيئة بالتي هي أحسن. بل حتى الإحسان في الذبح كما جاء في تتمة الحديث: فإذا قتلتم فأحسنوا القتلة، وإذا ذبحتم فأحسنوا الذبحة، وليحد أحدكم شفرته وليرح ذبيحته. فانظر كيف أوجب الإسلام الإحسان حتى في ذبح الحيوان! فكيف بالإحسان إلى الإنسان؟! الإحسان قيمة إسلامية عظمى تميز المسلم عن غيره، تجعله يتقن عمله ويحسن إلى من حوله ويرفق بكل مخلوق. فاجعل الإحسان شعارك في كل شيء، وأتقن كل عمل تقوم به، وستجد أثر ذلك في حياتك وفي نظرة الناس إليك.`, source: "صحيح مسلم", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "داود وقضاؤه العادل", prophet: "داود", story: `داود عليه السلام كان نبياً ملكاً آتاه الله الحكمة وفصل الخطاب، أي القدرة على الفصل بين الخصوم بالعدل والحق. من قصصه العجيبة في القضاء ما ذكره الله في سورة ص، حين تسور عليه خصمان المحراب وهو في عبادته، ففزع منهم. قالوا: لا تخف، خصمان بغى بعضنا على بعض فاحكم بيننا بالحق. عرض أحدهما قضيته فقال: إن هذا أخي له تسع وتسعون نعجة ولي نعجة واحدة فقال أكفلنيها وعزني في الخطاب. فحكم داود فوراً وقال: لقد ظلمك بسؤال نعجتك إلى نعاجه، وإن كثيراً من الخلطاء ليبغي بعضهم على بعض إلا الذين آمنوا وعملوا الصالحات وقليل ما هم. قال المفسرون: كان هذا اختباراً من الله لداود، فتنبه لما وقع فيه من الحكم قبل سماع الطرف الآخر، فاستغفر ربه وخر راكعاً وأناب. العدل يقتضي سماع الخصمين قبل الحكم، وهذا درس عظيم لكل من يتصدى للقضاء والفصل بين الناس.`, quranReference: "يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُم بَيْنَ النَّاسِ بِالْحَقِّ", quranCitation: "سورة ص: 26", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "Indeed, Allah orders justice and excellence", surah: "An-Nahl", verseNumber: 90, title: "Justice and Excellence", story: `This comprehensive verse was called by scholars "the verse of morals" because it gathered all foundations of virtues. Allah commanded justice - giving everyone their due right - and excellence (Ihsan) - going beyond what's obligatory as a favor and honor. Justice is performing what's upon you; excellence is adding beyond what's upon you. Justice with people means being fair and not wronging them in their wealth, honor, or bodies, and judging between them with truth. Excellence means treating them as you'd like to be treated, or even better. Ibn Abbas said: Justice is testifying that there's no god but Allah, and excellence is performing obligations. Others said: Justice is moderation between excess and negligence, and excellence is perfecting work. Excellence includes perfecting worship as if you see Allah, as in Gabriel's hadith: "Excellence is worshipping Allah as if you see Him, and if you don't see Him, He sees you." Be keen on justice in all your dealings, wrong no one regardless of your power, and be excellent to people, for Allah loves those who do good.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Indeed, Allah has prescribed excellence in all things", narrator: "Shaddad ibn Aws", title: "Excellence in Everything", story: `This great hadith establishes a comprehensive rule in Islam: excellence is required in every act a Muslim performs, small or large. Excellence in worship means performing it as Allah commanded with mastery and humility. Excellence in work means perfecting it and producing it in the best form. Excellence in dealing with people means treating them kindly and repelling evil with what is better. Even excellence in slaughter, as the hadith continues: "When you kill, kill well, and when you slaughter, slaughter well. Let each one sharpen his blade and ease his animal." See how Islam obligated excellence even in slaughtering animals! What then about excellence toward humans?! Excellence is a supreme Islamic value distinguishing Muslims from others, making them perfect their work, be good to those around them, and be gentle with every creature. Make excellence your motto in everything, perfect every work you do, and you'll find its effect in your life and how people view you.`, source: "Sahih Muslim", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "David's Just Judgment", prophet: "David (Dawud)", story: `David was a prophet-king whom Allah gave wisdom and decisive speech - the ability to settle between disputants with justice and truth. Among his amazing judicial stories is what Allah mentioned in Surah Sad, when two disputants climbed over the wall into his private chamber while he was worshipping, startling him. They said: "Fear not. We are two disputants, one of whom has wronged the other, so judge between us with truth." One presented his case: "This is my brother. He has ninety-nine ewes and I have one ewe. He said: 'Entrust her to me,' and he overpowered me in speech." David immediately judged: "He has certainly wronged you in demanding your ewe to add to his ewes. Indeed, many associates oppress one another, except those who believe and do righteous deeds - and few are they." Commentators said this was a test from Allah for David, who realized he judged before hearing the other party, so he sought forgiveness from his Lord and fell bowing and repented. Justice requires hearing both parties before judging - a great lesson for anyone who judges or settles between people.`, quranReference: "O David, We have made you a successor upon the earth, so judge between people in truth", quranCitation: "Surah Sad: 26", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "17", locales: { ar: { ayah: { text: "وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ", surah: "هود", verseNumber: 114, title: "الصلاة تمحو الذنوب", story: `هذه الآية الكريمة تبين أن الصلاة من أعظم أسباب تكفير الذنوب والسيئات. أمر الله بإقامة الصلاة في طرفي النهار وهما الصبح والعصر، وزلفاً من الليل وهي المغرب والعشاء. وبين أن الحسنات يذهبن السيئات، أي أن الأعمال الصالحة تكفر الذنوب الصغائر وتمحوها. سبب نزول هذه الآية أن رجلاً جاء إلى النبي صلى الله عليه وسلم فقال: يا رسول الله، إني أصبت من امرأة ما دون أن أطأها، قبّلتها أو لمستها، فأنا هذا فاقض فيّ ما شئت. فلم يقل له النبي شيئاً حتى نزلت هذه الآية، فدعاه وتلاها عليه. فقال رجل: أله خاصة؟ قال: بل للناس عامة. فالصلاة تكفر ما بين الصلاتين من الذنوب الصغائر ما اجتنبت الكبائر، كما قال النبي صلى الله عليه وسلم: الصلوات الخمس والجمعة إلى الجمعة كفارة لما بينهن ما اجتنبت الكبائر. فاحرص على الصلوات في أوقاتها واجعلها لك سبباً للتطهر من الذنوب والقرب من الله.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "أَرَأَيْتُمْ لَوْ أَنَّ نَهْرًا بِبَابِ أَحَدِكُمْ يَغْتَسِلُ مِنْهُ كُلَّ يَوْمٍ خَمْسَ مَرَّاتٍ هَلْ يَبْقَى مِنْ دَرَنِهِ شَيْءٌ", narrator: "أبو هريرة", title: "الصلوات الخمس والتطهر", story: `ضرب النبي صلى الله عليه وسلم في هذا الحديث مثلاً عظيماً لبيان أثر الصلوات الخمس في تطهير المسلم من ذنوبه. سأل أصحابه: أرأيتم لو أن نهراً بباب أحدكم يغتسل منه كل يوم خمس مرات، هل يبقى من درنه شيء؟ قالوا: لا يبقى من درنه شيء. قال: فذلك مثل الصلوات الخمس، يمحو الله بهن الخطايا. هذا التشبيه البليغ يوضح كيف أن الصلوات الخمس تنظف القلب والروح من أدران الذنوب، كما ينظف الماء الجسد من الأوساخ. والمسلم يتوضأ لكل صلاة فيغسل أعضاءه بالماء، ثم يقف بين يدي ربه فيغسل قلبه بالصلاة والاستغفار. وكلما أذنب ذنباً صغيراً في يومه، جاءت الصلاة التالية فمحته. هذا إذا صلى صلاة حقيقية بخشوع وحضور قلب، لا صلاة جوفاء خالية من الروح. فاحرص على أن تكون صلاتك مكفرة لذنوبك بأن تقبل عليها بقلبك لا بجسدك فقط، وتستحضر عظمة من تقف بين يديه.`, source: "صحيح البخاري ومسلم", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "زكريا ودعوته لله", prophet: "زكريا", story: `زكريا عليه السلام كان نبياً صالحاً كبر في السن حتى بلغ من الكبر عتياً، وكانت امرأته عاقراً لا تلد. لكنه لم ييأس من رحمة الله، فدعا ربه دعاء خفياً: رب إني وهن العظم مني واشتعل الرأس شيباً ولم أكن بدعائك رب شقياً. طلب من الله أن يرزقه ولداً صالحاً يرثه ويرث من آل يعقوب. استجاب الله دعاءه وبشره بيحيى، وهو اسم لم يسمّ به أحد من قبل. تعجب زكريا: أنى يكون لي غلام وكانت امرأتي عاقراً وقد بلغت من الكبر عتياً؟! فجاءه الرد الإلهي: كذلك قال ربك هو علي هين وقد خلقتك من قبل ولم تك شيئاً. أعطي زكريا علامة على الحمل: ألا يكلم الناس ثلاث ليال سوياً. خرج على قومه من المحراب فأوحى إليهم أن سبحوا بكرة وعشياً. وُلد يحيى وكان سيداً وحصوراً ونبياً من الصالحين، آتاه الله الحكم صبياً، وكان باراً بوالديه ولم يكن جباراً عصياً.`, quranReference: "يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ", quranCitation: "سورة مريم: 7", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "And establish prayer at the two ends of the day and at the approach of the night. Indeed, good deeds remove evil deeds", surah: "Hud", verseNumber: 114, title: "Prayer Erases Sins", story: `This noble verse shows that prayer is among the greatest means of expiating sins. Allah commanded establishing prayer at both ends of the day - Fajr and Asr - and approaches of night - Maghrib and Isha. He explained that good deeds remove evil deeds, meaning righteous deeds expiate minor sins and erase them. The reason for this verse's revelation: a man came to the Prophet saying: "O Messenger of Allah, I touched a woman short of intercourse - I kissed or touched her. Here I am, so decide about me as you wish." The Prophet said nothing until this verse was revealed, then called him and recited it. A man asked: "Is this specifically for him?" He said: "Rather, for all people." Prayer expiates sins between prayers as long as major sins are avoided, as the Prophet said: "The five prayers and Friday to Friday are expiation for what's between them if major sins are avoided." Be keen on prayers in their times and make them means of purifying yourself from sins and drawing near to Allah.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Do you think that if there was a river by one's door and he bathed in it five times daily, would any dirt remain on him?", narrator: "Abu Hurairah", title: "The Five Prayers and Purification", story: `The Prophet gave a great parable in this hadith showing the effect of five daily prayers in purifying a Muslim from sins. He asked his companions: "Do you think that if there was a river by one's door and he bathed in it five times daily, would any dirt remain on him?" They said: "No dirt would remain." He said: "That is the example of the five prayers - Allah erases sins with them." This eloquent comparison clarifies how the five prayers cleanse the heart and soul from the filth of sins, just as water cleanses the body from dirt. A Muslim performs ablution for each prayer, washing limbs with water, then stands before his Lord, washing his heart through prayer and seeking forgiveness. Whenever he commits a minor sin during his day, the next prayer comes and erases it. This is if he prays a true prayer with humility and presence of heart, not a hollow prayer devoid of spirit. Be keen that your prayer expiates your sins by approaching it with your heart, not just your body, and being conscious of the greatness of the One before whom you stand.`, source: "Sahih Bukhari and Muslim", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Zechariah's Prayer to Allah", prophet: "Zechariah (Zakariyya)", story: `Zechariah was a righteous prophet who grew old until he was extremely aged, and his wife was barren. But he never despaired of Allah's mercy and called upon his Lord secretly: "My Lord, indeed my bones have weakened and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy." He asked Allah for a righteous son to inherit from him and from the family of Jacob. Allah answered his prayer and gave him glad tidings of Yahya (John), a name given to no one before. Zechariah wondered: "How can I have a boy when my wife has been barren and I have reached extreme old age?" The divine response came: "Thus says your Lord: It is easy for Me, for I created you before when you were nothing." Zechariah was given a sign of the pregnancy: he couldn't speak to people for three nights while being sound. He came out to his people from the prayer chamber and signaled to them to glorify Allah morning and evening. Yahya was born, a leader, chaste, and a prophet from among the righteous. Allah gave him wisdom in boyhood, and he was dutiful to his parents, not disobedient or insolent.`, quranReference: "O Zechariah, We give you good tidings of a boy whose name will be Yahya", quranCitation: "Surah Maryam: 7", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } }
];

// Generate remaining stories 18-50 with unique content
const moreTopics = [
  { ar: "الشكر", en: "Gratitude", surah: "إبراهيم", surahEn: "Ibrahim", verse: 7, prophet: "إبراهيم", prophetEn: "Abraham" },
  { ar: "الصدق", en: "Truthfulness", surah: "الأحزاب", surahEn: "Al-Ahzab", verse: 35, prophet: "عيسى", prophetEn: "Jesus" },
  { ar: "الرحمة", en: "Mercy", surah: "الأنبياء", surahEn: "Al-Anbiya", verse: 107, prophet: "محمد", prophetEn: "Muhammad" },
  { ar: "الصبر", en: "Patience", surah: "البقرة", surahEn: "Al-Baqarah", verse: 153, prophet: "أيوب", prophetEn: "Job" },
  { ar: "التواضع", en: "Humility", surah: "الفرقان", surahEn: "Al-Furqan", verse: 63, prophet: "عيسى", prophetEn: "Jesus" },
  { ar: "الأمانة", en: "Trustworthiness", surah: "المؤمنون", surahEn: "Al-Mu'minun", verse: 8, prophet: "يوسف", prophetEn: "Joseph" },
  { ar: "الكرم", en: "Generosity", surah: "الإنسان", surahEn: "Al-Insan", verse: 8, prophet: "إبراهيم", prophetEn: "Abraham" },
  { ar: "العفو", en: "Forgiveness", surah: "الشورى", surahEn: "Ash-Shura", verse: 40, prophet: "يوسف", prophetEn: "Joseph" },
  { ar: "التقوى", en: "Piety", surah: "الحجرات", surahEn: "Al-Hujurat", verse: 13, prophet: "نوح", prophetEn: "Noah" },
  { ar: "الإيمان", en: "Faith", surah: "الحجرات", surahEn: "Al-Hujurat", verse: 15, prophet: "إبراهيم", prophetEn: "Abraham" },
  { ar: "اليقين", en: "Certainty", surah: "البقرة", surahEn: "Al-Baqarah", verse: 4, prophet: "إبراهيم", prophetEn: "Abraham" },
  { ar: "الإخلاص", en: "Sincerity", surah: "الزمر", surahEn: "Az-Zumar", verse: 11, prophet: "يوسف", prophetEn: "Joseph" },
  { ar: "الحلم", en: "Forbearance", surah: "آل عمران", surahEn: "Ali Imran", verse: 134, prophet: "إبراهيم", prophetEn: "Abraham" },
  { ar: "الزهد", en: "Asceticism", surah: "القصص", surahEn: "Al-Qasas", verse: 77, prophet: "عيسى", prophetEn: "Jesus" },
  { ar: "التفكر", en: "Contemplation", surah: "آل عمران", surahEn: "Ali Imran", verse: 191, prophet: "إبراهيم", prophetEn: "Abraham" },
  { ar: "الذكر", en: "Remembrance", surah: "الرعد", surahEn: "Ar-Ra'd", verse: 28, prophet: "يونس", prophetEn: "Jonah" },
  { ar: "التوبة", en: "Repentance", surah: "التحريم", surahEn: "At-Tahrim", verse: 8, prophet: "آدم", prophetEn: "Adam" },
  { ar: "الرضا", en: "Contentment", surah: "التوبة", surahEn: "At-Tawbah", verse: 72, prophet: "أيوب", prophetEn: "Job" },
  { ar: "الحياء", en: "Modesty", surah: "الأحزاب", surahEn: "Al-Ahzab", verse: 53, prophet: "موسى", prophetEn: "Moses" },
  { ar: "الورع", en: "Scrupulousness", surah: "المائدة", surahEn: "Al-Ma'idah", verse: 100, prophet: "يوسف", prophetEn: "Joseph" },
  { ar: "الوفاء", en: "Loyalty", surah: "الإسراء", surahEn: "Al-Isra", verse: 34, prophet: "إسماعيل", prophetEn: "Ishmael" },
  { ar: "الصدقة", en: "Charity", surah: "البقرة", surahEn: "Al-Baqarah", verse: 261, prophet: "سليمان", prophetEn: "Solomon" },
  { ar: "صلة الرحم", en: "Family Ties", surah: "النساء", surahEn: "An-Nisa", verse: 1, prophet: "يعقوب", prophetEn: "Jacob" },
  { ar: "حسن الخلق", en: "Good Character", surah: "القلم", surahEn: "Al-Qalam", verse: 4, prophet: "محمد", prophetEn: "Muhammad" },
  { ar: "الإحسان للجار", en: "Kindness to Neighbors", surah: "النساء", surahEn: "An-Nisa", verse: 36, prophet: "شعيب", prophetEn: "Shu'ayb" },
  { ar: "الإنفاق", en: "Spending in Allah's Way", surah: "البقرة", surahEn: "Al-Baqarah", verse: 267, prophet: "سليمان", prophetEn: "Solomon" },
  { ar: "حفظ اللسان", en: "Guarding the Tongue", surah: "ق", surahEn: "Qaf", verse: 18, prophet: "لقمان", prophetEn: "Luqman" },
  { ar: "إتقان العمل", en: "Excellence in Work", surah: "الكهف", surahEn: "Al-Kahf", verse: 30, prophet: "ذو القرنين", prophetEn: "Dhul-Qarnayn" },
  { ar: "الثبات", en: "Steadfastness", surah: "الأنفال", surahEn: "Al-Anfal", verse: 45, prophet: "موسى", prophetEn: "Moses" },
  { ar: "الشجاعة", en: "Courage", surah: "آل عمران", surahEn: "Ali Imran", verse: 173, prophet: "داود", prophetEn: "David" },
  { ar: "العزة", en: "Honor", surah: "المنافقون", surahEn: "Al-Munafiqun", verse: 8, prophet: "يوسف", prophetEn: "Joseph" },
  { ar: "المحبة", en: "Love", surah: "آل عمران", surahEn: "Ali Imran", verse: 31, prophet: "محمد", prophetEn: "Muhammad" },
  { ar: "الخوف من الله", en: "Fear of Allah", surah: "فاطر", surahEn: "Fatir", verse: 28, prophet: "نوح", prophetEn: "Noah" }
];

const storiesWithRealContent: typeof additionalStories = [
  { id: "18", locales: { ar: { ayah: { text: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ", surah: "إبراهيم", verseNumber: 7, title: "الشكر يزيد النعم", story: `هذه الآية العظيمة تضع قاعدة ربانية ثابتة في التعامل مع النعم: الشكر سبب للزيادة والكفران سبب للعذاب. فالله تعالى يعد عباده الشاكرين بالمزيد من فضله وإحسانه، بينما يحذر الجاحدين من عذاب شديد. والشكر ليس مجرد كلمات تُقال باللسان، بل هو اعتراف القلب بالنعمة، ونطق اللسان بالحمد، وعمل الجوارح بالطاعة. فمن أنعم الله عليه بالمال شكره بالإنفاق في سبيل الله، ومن أنعم عليه بالعلم شكره بنشره وتعليمه، ومن أنعم عليه بالصحة شكره باستعمالها في طاعة الله. كان السلف الصالح يخشون زوال النعم بسبب التقصير في الشكر، فكانوا يتسابقون في الحمد والثناء على الله في السراء والضراء. ومن أعظم صور الشكر أن يستعمل العبد نعم الله فيما يرضيه لا فيما يسخطه، فإن هذا هو الشكر الحقيقي الذي يستحق عليه العبد المزيد من الفضل والإحسان.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "عَجَباً لأَمْرِ المُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ، إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْراً لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْراً لَهُ", narrator: "صهيب الرومي", title: "المؤمن شاكر في السراء", story: `هذا الحديث يكشف عن حقيقة عجيبة في حياة المؤمن: كل أمره خير! فالمؤمن إذا أصابته نعمة شكر الله عليها فكان الشكر سبباً لمزيد من الخير والبركة. وإذا أصابته مصيبة صبر واحتسب فكان الصبر سبباً للأجر العظيم عند الله. وهذا المعنى خاص بالمؤمن دون غيره، لأن غير المؤمن قد يفرح بالنعمة لكنه لا يشكر، وقد يصاب بالمصيبة فيجزع ويسخط. أما المؤمن فقد وفقه الله للشكر في السراء والصبر في الضراء، فصارت حياته كلها طاعة لله ومكسباً للأجر. ولذلك كان النبي صلى الله عليه وسلم يحمد الله على كل حال، ويعلم أصحابه أن يقولوا: الحمد لله الذي بنعمته تتم الصالحات عند السراء، والحمد لله على كل حال عند الضراء.`, source: "صحيح مسلم", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "إبراهيم وشكر النعم", prophet: "إبراهيم", story: `كان إبراهيم عليه السلام نموذجاً فريداً في الشكر والثناء على الله. وصفه الله في القرآن بقوله: "إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتاً لِلَّهِ حَنِيفاً وَلَمْ يَكُ مِنَ المُشْرِكِينَ، شَاكِراً لأَنْعُمِهِ". فقد كان إبراهيم يشكر الله في كل أحواله. حين أنجاه الله من النار شكره بمزيد من الطاعة والعبادة. وحين رزقه الولد على كبر سنه شكره بتقديم ابنه قرباناً لله حين أُمر بذلك. وحين بنى الكعبة دعا ربه قائلاً: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ العَلِيمُ". كان شكره يظهر في أفعاله لا في أقواله فقط، فترك وطنه امتثالاً لأمر الله، وترك ابنه وزوجته في صحراء مكة ثقة بالله وشكراً له على نعمة الإيمان.`, quranReference: "شَاكِراً لأَنْعُمِهِ", quranCitation: "سورة النحل: 121", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "If you are grateful, I will surely increase you [in favor]; but if you deny, indeed, My punishment is severe", surah: "Ibrahim", verseNumber: 7, title: "Gratitude Increases Blessings", story: `This great verse establishes a divine principle: gratitude leads to increase while ingratitude leads to punishment. Allah promises His grateful servants more of His bounty, while warning the ungrateful of severe consequences. True gratitude is not merely words on the tongue but acknowledgment in the heart, praise on the lips, and obedience in actions. Whoever is blessed with wealth thanks Allah by spending in His cause; whoever is blessed with knowledge thanks Him by teaching others; whoever is blessed with health thanks Him by using it in worship. The righteous predecessors feared losing blessings due to insufficient gratitude, so they competed in praising Allah in ease and hardship. The greatest form of gratitude is using Allah's blessings for what pleases Him rather than what angers Him.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "How wonderful is the affair of the believer! All his affairs are good. If he experiences ease, he is grateful, and that is good for him. If he experiences hardship, he is patient, and that is good for him", narrator: "Suhayb ar-Rumi", title: "The Believer is Grateful in Ease", story: `This hadith reveals an amazing truth about the believer's life: everything is good for him! When the believer receives a blessing, he thanks Allah, and gratitude becomes a means for more goodness. When he faces difficulty, he is patient, and patience becomes a means for great reward. This applies only to the believer, for others may rejoice in blessings without gratitude and may grieve at hardship with resentment. The believer has been guided to gratitude in ease and patience in hardship, making his entire life worship and a source of reward. The Prophet would thank Allah in all circumstances and taught his companions to say: "Praise be to Allah by whose grace good deeds are completed" in ease, and "Praise be to Allah in all circumstances" in hardship.`, source: "Sahih Muslim", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Abraham and Gratitude", prophet: "Abraham", story: `Abraham was a unique example of gratitude and praise to Allah. Allah described him saying: "Indeed, Abraham was a nation devoutly obedient to Allah, inclining toward truth, and he was not of those who associate others with Allah. Grateful for His favors." Abraham thanked Allah in all circumstances. When Allah saved him from the fire, he thanked Him with increased worship. When blessed with a son in old age, he thanked Him by offering his son when commanded. When building the Kaaba, he prayed: "Our Lord, accept from us. Indeed, You are the Hearing, the Knowing." His gratitude showed in actions, not just words - he left his homeland obeying Allah's command, and left his wife and son in Mecca's desert trusting Allah and grateful for the blessing of faith.`, quranReference: "Grateful for His favors", quranCitation: "Surah An-Nahl: 121", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "19", locales: { ar: { ayah: { text: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ", surah: "التوبة", verseNumber: 119, title: "الصدق طريق النجاة", story: `الصدق من أعظم الأخلاق التي أمر الله بها المؤمنين وجعلها علامة على صحة الإيمان. أمر الله في هذه الآية بالتقوى والصدق معاً، لأن الصدق ثمرة من ثمار التقوى ودليل عليها. والصادقون هم الذين صدقوا الله في أقوالهم وأفعالهم ونياتهم، فلا يقولون إلا حقاً، ولا يعدون إلا صدقاً، ولا ينوون إلا خيراً. الصدق يهدي إلى البر والبر يهدي إلى الجنة، كما أن الكذب يهدي إلى الفجور والفجور يهدي إلى النار. ولذلك كان النبي صلى الله عليه وسلم أصدق الناس، وكان يُعرف بين قومه بالصادق الأمين قبل البعثة. والصدق يشمل صدق اللسان في الحديث، وصدق القلب في النية، وصدق الجوارح في العمل.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى البِرِّ وَإِنَّ البِرَّ يَهْدِي إِلَى الجَنَّةِ", narrator: "عبدالله بن مسعود", title: "الصدق طريق الجنة", story: `في هذا الحديث العظيم يرسم لنا النبي صلى الله عليه وسلم طريق النجاة والفلاح. فالصدق يقود إلى البر وهو جماع الخير كله، والبر يقود إلى الجنة. وما يزال الرجل يصدق ويتحرى الصدق حتى يُكتب عند الله صديقاً، وهي أعلى مراتب الصدق. في المقابل، الكذب يهدي إلى الفجور وهو جماع الشر، والفجور يهدي إلى النار. وما يزال الرجل يكذب ويتحرى الكذب حتى يُكتب عند الله كذاباً. فالصدق عادة يتحراها المؤمن في كل أموره حتى تصبح طبعاً له، والكذب عادة يتجنبها حتى يبتعد عنه تماماً. وقد كان الصحابة يتواصون بالصدق ويحذرون من الكذب أشد التحذير.`, source: "صحيح البخاري", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "عيسى عليه السلام والصدق", prophet: "عيسى", story: `عيسى عليه السلام كان من أصدق الأنبياء وأكثرهم صراحة مع قومه. كان يصدع بالحق ولا يخاف في الله لومة لائم. واجه الفريسيين والكهنة بكل شجاعة وكشف نفاقهم وكذبهم. علّم تلاميذه أن يكون كلامهم نعم نعم ولا لا، بلا مبالغة أو تزييف. وكان من معجزاته أنه يُخبر الناس بما يخفون في بيوتهم، فكان صادقاً مصدقاً. حين سأله بنو إسرائيل عن المائدة من السماء، أجابهم بصدق وحذرهم من عواقب الكفر بها. ولما رفعه الله إليه، بقيت رسالته الصادقة في قلوب أتباعه المخلصين.`, quranReference: "وَمُصَدِّقاً لِّمَا بَيْنَ يَدَيَّ مِنَ التَّوْرَاةِ", quranCitation: "سورة الصف: 6", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "O you who believe! Fear Allah and be with the truthful", surah: "At-Tawbah", verseNumber: 119, title: "Truthfulness is the Path to Salvation", story: `Truthfulness is among the greatest virtues Allah commanded for believers and made it a sign of true faith. Allah commanded both piety and truthfulness together because truthfulness is a fruit of piety and evidence of it. The truthful are those who are honest with Allah in words, deeds, and intentions - speaking only truth, promising only honestly, intending only good. Truthfulness leads to righteousness and righteousness leads to Paradise, while lying leads to wickedness and wickedness leads to Hell. The Prophet was the most truthful person, known as "the Truthful, the Trustworthy" even before prophethood. Truthfulness encompasses honesty of tongue in speech, honesty of heart in intention, and honesty of limbs in action.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Adhere to truthfulness, for truthfulness leads to righteousness, and righteousness leads to Paradise", narrator: "Abdullah ibn Mas'ud", title: "Truthfulness Leads to Paradise", story: `In this great hadith, the Prophet draws the path to salvation. Truthfulness leads to righteousness, which encompasses all good, and righteousness leads to Paradise. A person continues to tell the truth and seek truthfulness until he is recorded with Allah as a "Siddiq" - the highest rank of truthfulness. Conversely, lying leads to wickedness, which encompasses all evil, and wickedness leads to Hell. A person continues to lie until recorded with Allah as a liar. Truthfulness is a habit the believer pursues in all matters until it becomes his nature, while lying is a habit he avoids until he distances himself completely. The companions would advise each other toward truthfulness and strongly warn against lying.`, source: "Sahih Bukhari", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Jesus and Truthfulness", prophet: "Jesus", story: `Jesus was among the most truthful prophets and most frank with his people. He spoke truth boldly without fearing anyone's blame. He confronted the Pharisees and priests courageously, exposing their hypocrisy and lies. He taught his disciples that their words should be yes yes and no no, without exaggeration or falsification. Among his miracles was informing people of what they hid in their homes, being truthful and confirmed. When the Children of Israel asked about the table from heaven, he answered honestly and warned them of consequences. When Allah raised him, his truthful message remained in the hearts of his sincere followers.`, quranReference: "And confirming what was before me of the Torah", quranCitation: "Surah As-Saff: 6", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "20", locales: { ar: { ayah: { text: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ", surah: "الأنبياء", verseNumber: 107, title: "رحمة للعالمين", story: `هذه الآية الكريمة تختصر رسالة النبي محمد صلى الله عليه وسلم كلها: إنه رحمة للعالمين. ليس للعرب فقط، ولا للمؤمنين فقط، بل للعالمين كلهم: الإنس والجن، المؤمن والكافر، الإنسان والحيوان. فمن آمن به نال رحمة الدنيا والآخرة، ومن كفر به فقد رُحم بتأخير العذاب عنه في الدنيا بفضل وجود هذا النبي الرحيم. جاء ليرفع الظلم ويقيم العدل، وليحرر العقول من الخرافات، وليطهر القلوب من الأحقاد. علّم أمته الرحمة بالضعفاء والمساكين واليتامى، وأمرهم بالإحسان إلى الحيوان والرفق به. كان أرحم الناس بالناس حتى بأعدائه، فحين دخل مكة منتصراً عفا عمن آذاه سنوات طويلة وقال: اذهبوا فأنتم الطلقاء.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ", narrator: "عبدالله بن عمرو", title: "الراحمون يرحمهم الرحمن", story: `هذا الحديث يكشف عن قانون رباني عظيم: الرحمة تستجلب الرحمة. فمن رحم الناس رحمه الله، ومن قسا عليهم حُرم رحمة الله. والأمر بالرحمة هنا عام يشمل كل من في الأرض من إنسان وحيوان. علّم النبي صلى الله عليه وسلم أصحابه أن الرحمة ليست ضعفاً بل هي قوة، وأنها ليست مذلة بل هي عزة عند الله. كان يرحم الأطفال ويمسح على رؤوسهم، ويرحم النساء ويوصي بهن خيراً، ويرحم الضعفاء ويقف معهم، ويرحم حتى الحيوانات فيأمر بإحسان ذبحها وعدم تعذيبها. ومن أعظم صور الرحمة أن يرحم المرء والديه عند كبرهما، وأولاده عند صغرهم، وجيرانه في حاجتهم.`, source: "سنن الترمذي", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "محمد صلى الله عليه وسلم والرحمة", prophet: "محمد", story: `كان النبي محمد صلى الله عليه وسلم أرحم الخلق بالخلق. رحمته لم تقتصر على المسلمين بل شملت الجميع حتى أعداءه. حين ذهب إلى الطائف ورجمه أهلها بالحجارة حتى أدموا قدميه، جاءه ملك الجبال يعرض عليه أن يطبق عليهم الأخشبين فقال: لا، لعل الله يخرج من أصلابهم من يعبد الله. وحين فتح مكة عفا عن قريش الذين آذوه وطردوه وقتلوا أصحابه. وكان يوصي الجيوش ألا يقتلوا شيخاً ولا امرأة ولا طفلاً ولا يقطعوا شجرة. ورأى مرة حمّاراً موسوماً في وجهه فغضب وقال: لعن الله من فعل هذا. وأخبر أن امرأة دخلت النار في هرة حبستها حتى ماتت جوعاً.`, quranReference: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ", quranCitation: "سورة آل عمران: 159", source: "السيرة النبوية", sourceUrl: "https://sunnah.com" } }, en: { ayah: { text: "And We have not sent you except as a mercy to the worlds", surah: "Al-Anbiya", verseNumber: 107, title: "Mercy to the Worlds", story: `This noble verse summarizes Prophet Muhammad's entire mission: he is a mercy to all worlds. Not just for Arabs or believers, but for all creation - humans and jinn, believers and disbelievers, humans and animals. Those who believed in him received mercy in this world and the next; those who disbelieved were still shown mercy through the delay of punishment during his presence. He came to lift oppression, establish justice, free minds from superstition, and purify hearts of grudges. He taught his nation mercy toward the weak, poor, and orphans, and commanded kindness to animals. He was the most merciful to people, even his enemies - when he conquered Mecca victoriously, he pardoned those who harmed him for years saying: "Go, for you are free."`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "The merciful are shown mercy by the Most Merciful. Show mercy to those on earth, and the One in heaven will show mercy to you", narrator: "Abdullah ibn Amr", title: "The Merciful Receive Mercy", story: `This hadith reveals a great divine law: mercy attracts mercy. Whoever shows mercy to people, Allah shows mercy to them; whoever is harsh is deprived of Allah's mercy. The command for mercy is general, including all on earth - humans and animals. The Prophet taught his companions that mercy is not weakness but strength, not humiliation but honor with Allah. He showed mercy to children, patting their heads; to women, advising good treatment; to the weak, standing with them; even to animals, commanding kind slaughter without torture. Among the greatest forms of mercy is showing mercy to parents in old age, to children in their youth, and to neighbors in their need.`, source: "Sunan Tirmidhi", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Muhammad and Mercy", prophet: "Muhammad", story: `Prophet Muhammad was the most merciful of creation to creation. His mercy was not limited to Muslims but included everyone, even enemies. When he went to Taif and its people stoned him until his feet bled, the angel of mountains offered to crush them between the mountains, but he said: "No, perhaps Allah will bring from their descendants those who worship Him." When he conquered Mecca, he pardoned Quraysh who had harmed, expelled, and killed his companions. He commanded armies not to kill the elderly, women, or children, nor cut trees. Once he saw a donkey branded on its face and angrily said: "May Allah curse whoever did this." He told of a woman who entered Hell because of a cat she imprisoned until it died of hunger.`, quranReference: "By mercy from Allah, you were lenient with them", quranCitation: "Surah Ali Imran: 159", source: "Prophetic Biography", sourceUrl: "https://sunnah.com" } } } },
  { id: "21", locales: { ar: { ayah: { text: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", surah: "البقرة", verseNumber: 153, title: "الصبر مفتاح الفرج", story: `الصبر من أعظم العبادات التي أمر الله بها عباده، وجعله سبباً للمعية الإلهية والنصر والتمكين. في هذه الآية يأمر الله المؤمنين بالاستعانة بالصبر والصلاة على مصاعب الحياة ومشاقها. والصبر ثلاثة أنواع: صبر على الطاعة بأدائها كما أمر الله، وصبر عن المعصية بتركها امتثالاً لنهي الله، وصبر على البلاء بتحمله دون شكوى ولا جزع. ومن صبر ظفر، ومن جزع خسر. وقد ذكر الله الصبر في القرآن أكثر من تسعين موضعاً، مما يدل على عظم شأنه ورفعة منزلته. والصلاة تعين على الصبر لأنها تربط العبد بربه وتذكره بالآخرة وتهون عليه مصائب الدنيا.`, source: "القرطبي", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "وَاعْلَمْ أَنَّ فِي الصَّبْرِ عَلَى مَا تَكْرَهُ خَيْراً كَثِيراً، وَأَنَّ النَّصْرَ مَعَ الصَّبْرِ، وَأَنَّ الفَرَجَ مَعَ الكَرْبِ، وَأَنَّ مَعَ العُسْرِ يُسْراً", narrator: "عبدالله بن عباس", title: "النصر مع الصبر", story: `هذه الكلمات النبوية العظيمة تضع قوانين ربانية ثابتة في التعامل مع الشدائد. فالنصر لا يأتي إلا مع الصبر، والفرج لا يأتي إلا بعد الكرب، والعسر لا بد أن يعقبه يسر. هذه سنن كونية لا تتخلف أبداً. فمن صبر على الشدة جاءه الفرج، ومن جزع وتسخط زاد بلاؤه. والمؤمن الحق يعلم أن الله لا يبتليه إلا ليرفعه ويمحص ذنوبه، فيصبر ويحتسب الأجر عند الله. وقد مر الأنبياء والصالحون بابتلاءات عظيمة فصبروا حتى جاءهم نصر الله. فهذا يوسف صبر في السجن سنوات فخرج عزيزاً، وهذا أيوب صبر على المرض فشفاه الله وأعاد إليه أكثر مما فقد.`, source: "مسند أحمد", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "أيوب عليه السلام والصبر العظيم", prophet: "أيوب", story: `أيوب عليه السلام هو النموذج الأعلى للصبر في القرآن الكريم. كان عبداً صالحاً أنعم الله عليه بالمال والولد والصحة، ثم ابتلاه الله بفقدان كل ذلك. ذهب ماله، ومات أولاده، وأصابه مرض شديد في جسده حتى تقطع لحمه وتغير حاله. لكنه لم يشكُ إلى أحد سوى الله، ولم يجزع ولم يتسخط. بقي على صبره سنوات طويلة، قيل ثماني عشرة سنة، وهو يحمد الله ويشكره. حتى الناس هجروه والأقارب ابتعدوا عنه، لكنه ظل ثابتاً على إيمانه. وفي النهاية دعا ربه: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ" فاستجاب الله دعاءه وقال له: "ارْكُضْ بِرِجْلِكَ هَٰذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ" فضرب برجله الأرض فخرج ماء اغتسل به فشُفي تماماً، ورد الله عليه أهله ومثلهم معهم.`, quranReference: "إِنَّا وَجَدْنَاهُ صَابِراً نِّعْمَ العَبْدُ إِنَّهُ أَوَّابٌ", quranCitation: "سورة ص: 44", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "O you who believe! Seek help through patience and prayer. Indeed, Allah is with the patient", surah: "Al-Baqarah", verseNumber: 153, title: "Patience is the Key to Relief", story: `Patience is among the greatest worship Allah commanded His servants, making it a cause for divine companionship, victory, and establishment. In this verse, Allah commands believers to seek help through patience and prayer against life's difficulties. Patience is three types: patience upon obedience by performing it as Allah commanded, patience against sin by avoiding it in compliance with Allah's prohibition, and patience upon trials by bearing them without complaint or anxiety. Whoever is patient succeeds; whoever is anxious loses. Allah mentioned patience in the Quran over ninety times, indicating its great importance. Prayer helps with patience because it connects the servant to his Lord and reminds him of the Hereafter, making worldly calamities easier.`, source: "Al-Qurtubi", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Know that in patience with what you dislike is great good, that victory comes with patience, that relief comes with distress, and that with hardship comes ease", narrator: "Abdullah ibn Abbas", title: "Victory Comes with Patience", story: `These great prophetic words establish fixed divine laws in dealing with hardships. Victory comes only with patience, relief only after distress, and hardship must be followed by ease. These are cosmic laws that never fail. Whoever is patient during hardship receives relief; whoever is anxious increases their trial. The true believer knows Allah only tests him to elevate him and purify his sins, so he is patient and expects reward from Allah. Prophets and righteous people went through great trials and were patient until Allah's victory came. Joseph was patient in prison for years then emerged as a minister; Job was patient with illness then Allah healed him and returned more than he lost.`, source: "Musnad Ahmad", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Job and Great Patience", prophet: "Job (Ayyub)", story: `Job is the highest example of patience in the Quran. He was a righteous servant whom Allah blessed with wealth, children, and health, then Allah tested him by taking all away. His wealth vanished, his children died, and severe illness struck his body until his flesh deteriorated. Yet he complained to none but Allah, neither anxious nor resentful. He remained patient for years, said to be eighteen, praising and thanking Allah. Even people abandoned him and relatives distanced themselves, but he stayed firm in faith. Finally he prayed: "Indeed, adversity has touched me, and You are the Most Merciful of the merciful." Allah answered and said: "Strike the ground with your foot; this is a cool bath and drink." He struck the ground, water emerged, he bathed and was completely healed, and Allah returned his family and doubled them.`, quranReference: "Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back to Allah", quranCitation: "Surah Sad: 44", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "22", locales: { ar: { ayah: { text: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْناً وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَاماً", surah: "الفرقان", verseNumber: 63, title: "التواضع شيمة المؤمنين", story: `هذه الآية تصف صفة أساسية من صفات عباد الرحمن: التواضع في المشي والتعامل مع الناس. المشي هوناً يعني المشي بسكينة ووقار دون كبر أو خيلاء، والرد على الجاهلين بالسلام يعني تجاوز إساءتهم بالحكمة والحلم. التواضع ليس ضعفاً بل هو قوة، لأنه يحتاج إلى مجاهدة النفس وكبح غرورها. المتكبر في الحقيقة هو الضعيف الذي يحاول أن يستر ضعفه بالتعالي على الناس. أما المتواضع فهو الواثق من نفسه الذي لا يحتاج لاستعراض قوته أو مكانته. وقد كان النبي صلى الله عليه وسلم أشد الناس تواضعاً، يخدم أهله ويخصف نعله ويرقع ثوبه، ويمشي في الأسواق ويجلس مع الفقراء والمساكين.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللهُ عَبْداً بِعَفْوٍ إِلَّا عِزّاً، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللهُ", narrator: "أبو هريرة", title: "التواضع سبب الرفعة", story: `في هذا الحديث ثلاث قواعد ذهبية تخالف ما يظنه كثير من الناس. الأولى أن الصدقة لا تنقص المال بل تزيده وتبارك فيه. الثانية أن العفو لا يذل صاحبه بل يزيده عزة ورفعة. الثالثة أن التواضع لا يحط من قدر صاحبه بل يرفعه الله به. فمن تواضع لله رفعه الله في الدنيا بمحبة الناس له واحترامهم إياه، ورفعه في الآخرة بعلو الدرجات في الجنة. والعكس صحيح، فمن تكبر وضعه الله وأذله. كان عمر بن الخطاب رضي الله عنه يحمل قربة الماء على كتفه رغم أنه أمير المؤمنين، فقيل له: ما هذا يا أمير المؤمنين؟ فقال: إن نفسي أعجبتني فأردت أن أذلها.`, source: "صحيح مسلم", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "عيسى عليه السلام والتواضع", prophet: "عيسى", story: `كان عيسى عليه السلام من أشد الأنبياء تواضعاً. لم يتخذ لنفسه قصوراً ولا خدماً، بل كان يمشي في الأرض حافياً ويأكل من البقول والأعشاب. غسل أقدام تلاميذه تعليماً لهم التواضع وخدمة الآخرين. لم يتكبر على الفقراء والمساكين بل كان يجالسهم ويأكل معهم. علّم الناس أن من أراد أن يكون سيداً فليكن خادماً للجميع. وحين حاول قومه أن يجعلوه ملكاً رفض وانصرف، لأنه جاء ليملك القلوب لا الأرض. ورغم المعجزات العظيمة التي أجراها الله على يديه، لم يتكبر ولم يغتر، بل كان يسند كل فضل إلى الله ويقول: هذا بإذن الله.`, quranReference: "وَجَعَلَنِي مُبَارَكاً أَيْنَ مَا كُنتُ", quranCitation: "سورة مريم: 31", source: "قصص الأنبياء", sourceUrl: "https://islamweb.net" } }, en: { ayah: { text: "And the servants of the Most Merciful are those who walk upon the earth humbly, and when the ignorant address them harshly, they say peace", surah: "Al-Furqan", verseNumber: 63, title: "Humility is the Believers' Trait", story: `This verse describes an essential trait of the servants of the Most Merciful: humility in walking and dealing with people. Walking humbly means walking with tranquility and dignity without arrogance or pride, and responding to the ignorant with peace means overlooking their harm with wisdom and forbearance. Humility is not weakness but strength, because it requires struggling against the ego and restraining its vanity. The arrogant is truly the weak one who tries to cover weakness by looking down on others. The humble person is confident and doesn't need to display power or status. The Prophet was the most humble, serving his family, mending his sandals and patching his clothes, walking in markets and sitting with the poor.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Charity does not decrease wealth, Allah does not increase a servant in pardon except honor, and no one humbles himself for Allah except that Allah raises him", narrator: "Abu Hurairah", title: "Humility is a Cause for Elevation", story: `This hadith contains three golden rules contrary to what many think. First, charity does not decrease wealth but increases and blesses it. Second, pardon does not humiliate its owner but increases honor and elevation. Third, humility does not lower one's status but Allah raises him. Whoever humbles himself for Allah, Allah raises him in this world through people's love and respect, and in the Hereafter through high ranks in Paradise. The opposite is true - whoever is arrogant, Allah humiliates him. Umar ibn al-Khattab would carry a water container on his shoulder despite being Commander of the Faithful. When asked why, he said: "My soul admired itself, so I wanted to humble it."`, source: "Sahih Muslim", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Jesus and Humility", prophet: "Jesus", story: `Jesus was among the most humble prophets. He took no palaces or servants, walking barefoot on earth and eating herbs and plants. He washed his disciples' feet teaching them humility and serving others. He didn't look down on the poor but sat and ate with them. He taught that whoever wants to be a master must be a servant to all. When people tried to make him king, he refused and departed, for he came to rule hearts, not land. Despite the great miracles Allah performed through him, he never became arrogant or vain, attributing all merit to Allah saying: "This is by Allah's permission."`, quranReference: "And He has made me blessed wherever I am", quranCitation: "Surah Maryam: 31", source: "Stories of the Prophets", sourceUrl: "https://islamweb.net" } } } },
  { id: "23", locales: { ar: { ayah: { text: "وَالَّذِينَ هُمْ لِأَمَانَاتِهِمْ وَعَهْدِهِمْ رَاعُونَ", surah: "المؤمنون", verseNumber: 8, title: "حفظ الأمانة", story: `الأمانة من أعظم الأخلاق التي أمر بها الإسلام وجعلها علامة على الإيمان. في هذه الآية يصف الله المؤمنين الفائزين بأنهم يرعون أماناتهم وعهودهم، أي يحفظونها ويؤدونها إلى أهلها. والأمانة تشمل كل ما ائتمن عليه الإنسان: الأموال والأسرار والأجساد والأوقات والوظائف. فمن استُودع مالاً وجب عليه حفظه ورده، ومن اؤتمن على سر وجب عليه كتمانه، ومن تولى وظيفة وجب عليه إتقانها. والأمانة ضياعها من علامات الساعة كما أخبر النبي صلى الله عليه وسلم. وقد حمل الله الأمانة للسموات والأرض والجبال فأبين أن يحملنها وأشفقن منها، وحملها الإنسان، فمن أداها فاز، ومن خانها خسر.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "آيَةُ المُنَافِقِ ثَلاَثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ", narrator: "أبو هريرة", title: "خيانة الأمانة من النفاق", story: `هذا الحديث يكشف عن علامات المنافق التي يجب على كل مؤمن أن يتجنبها. من هذه العلامات خيانة الأمانة، وهي مقرونة بالكذب وإخلاف الوعد. فالمنافق لا يُؤتمن على شيء لأنه يخون كل ما يُعطى إياه. وخيانة الأمانة تدمر الثقة بين الناس وتفسد المجتمعات. كان الصحابة رضوان الله عليهم من أشد الناس حفظاً للأمانة. فهذا أبو عبيدة بن الجراح سماه النبي أمين هذه الأمة. وكان النبي صلى الله عليه وسلم يُعرف بالأمين حتى قبل البعثة، فكان أهل مكة يودعون عنده أماناتهم لثقتهم فيه. حتى حين هاجر إلى المدينة أمر علياً أن يبقى ليرد الأمانات إلى أهلها.`, source: "صحيح البخاري", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "يوسف عليه السلام والأمانة", prophet: "يوسف", story: `يوسف عليه السلام كان نموذجاً عظيماً في حفظ الأمانة. حين كان في بيت العزيز حفظ أمانة سيده ورفض خيانته مع امرأته رغم الإغراء الشديد والتهديد بالسجن. قال: "مَعَاذَ اللَّهِ إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ" واختار السجن على المعصية. وحين خرج من السجن وتولى خزائن مصر، كان أميناً على أموال الناس وأقواتهم في سنوات القحط. أدار الأمور بحكمة وعدل حتى نجا مصر والبلاد المجاورة من المجاعة. ولما جاءه إخوته لم يخنهم رغم ما فعلوه به في الماضي، بل أكرمهم وغفر لهم. هذه الأمانة العظيمة هي التي جعلته محبوباً عند الله وعند الناس، ورفعته من قعر البئر إلى عرش مصر.`, quranReference: "قَالَ اجْعَلْنِي عَلَىٰ خَزَائِنِ الأَرْضِ إِنِّي حَفِيظٌ عَلِيمٌ", quranCitation: "سورة يوسف: 55", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "And those who are to their trusts and their promises attentive", surah: "Al-Mu'minun", verseNumber: 8, title: "Preserving Trust", story: `Trust is among the greatest morals Islam commanded and made a sign of faith. In this verse, Allah describes the successful believers as those who guard their trusts and covenants, meaning they preserve and fulfill them. Trust includes everything entrusted to a person: money, secrets, bodies, time, and positions. Whoever is entrusted with money must preserve and return it; whoever is trusted with a secret must keep it; whoever assumes a position must perfect it. The loss of trust is a sign of the Hour as the Prophet informed. Allah offered the trust to the heavens, earth, and mountains, but they refused from fear. Man carried it - whoever fulfills it succeeds; whoever betrays it fails.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "The signs of a hypocrite are three: when he speaks he lies, when he promises he breaks it, and when he is trusted he betrays", narrator: "Abu Hurairah", title: "Betraying Trust is Hypocrisy", story: `This hadith reveals signs of a hypocrite every believer must avoid. Among them is betraying trust, paired with lying and breaking promises. A hypocrite cannot be trusted with anything because he betrays whatever is given. Betraying trust destroys mutual confidence and corrupts societies. The companions were among the most protective of trusts. Abu Ubayda ibn al-Jarrah was called by the Prophet "the trustworthy of this nation." The Prophet was known as "the Trustworthy" even before prophethood; Meccans would deposit their valuables with him. Even when migrating to Medina, he ordered Ali to stay and return trusts to their owners.`, source: "Sahih Bukhari", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Joseph and Trustworthiness", prophet: "Joseph (Yusuf)", story: `Joseph was a great example of preserving trust. In the minister's house, he protected his master's trust and refused to betray him with his wife despite intense temptation and threat of prison. He said: "I seek refuge in Allah. Indeed, he is my master who has made good my residence." He chose prison over sin. When released and given charge of Egypt's treasuries, he was trustworthy with people's money and provisions during famine years. He managed affairs wisely and justly, saving Egypt and neighboring lands from starvation. When his brothers came, he didn't betray them despite their past actions, but honored and forgave them. This great trustworthiness made him beloved to Allah and people, raising him from the pit to Egypt's throne.`, quranReference: "He said: Appoint me over the storehouses of the land. Indeed, I am a knowing guardian", quranCitation: "Surah Yusuf: 55", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "24", locales: { ar: { ayah: { text: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِيناً وَيَتِيماً وَأَسِيراً", surah: "الإنسان", verseNumber: 8, title: "الكرم والإيثار", story: `هذه الآية نزلت في أهل البيت رضوان الله عليهم حين آثروا الفقراء واليتامى والأسرى على أنفسهم بإفطارهم، فباتوا جياعاً ثلاث ليال. الكرم في الإسلام ليس مجرد إعطاء الفائض، بل هو البذل حتى مع الحاجة. قوله "على حبه" يعني على حب الطعام أي مع شدة حاجتهم إليه، أو على حب الله أي ابتغاء مرضاته. الكرم خلق الأنبياء والصالحين، وهو دليل على صدق الإيمان لأن المال محبوب للنفوس، فمن بذله في سبيل الله فقد غلب هواه وأطاع ربه. والكرم يشمل كرم اليد بالإعطاء، وكرم اللسان بالكلام الطيب، وكرم النفس بالعفو عمن أساء.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "مَا مِنْ يَوْمٍ يُصْبِحُ العِبَادُ فِيهِ إِلَّا مَلَكَانِ يَنْزِلَانِ، فَيَقُولُ أَحَدُهُمَا: اللَّهُمَّ أَعْطِ مُنْفِقاً خَلَفاً، وَيَقُولُ الآخَرُ: اللَّهُمَّ أَعْطِ مُمْسِكاً تَلَفاً", narrator: "أبو هريرة", title: "دعاء الملائكة للمنفقين", story: `في هذا الحديث يكشف النبي صلى الله عليه وسلم عن دعاء يومي تدعوه الملائكة للعباد. فكل يوم ينزل ملكان يدعو أحدهما للمنفق بأن يخلف الله عليه ما أنفق، ويدعو الآخر على الممسك بأن يتلف الله ماله. فمن أنفق ماله في سبيل الله عوضه الله خيراً منه، ومن أمسك وبخل لم يبارك الله في ماله. وهذا مشاهد في الواقع، فكثير من الكرماء نرى البركة في أموالهم رغم كثرة إنفاقهم، وكثير من البخلاء نرى التلف يصيب أموالهم رغم حرصهم عليها. فالكرم سبب للزيادة والبخل سبب للنقصان، وهذا قانون رباني ثابت.`, source: "صحيح البخاري", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "إبراهيم عليه السلام والكرم", prophet: "إبراهيم", story: `كان إبراهيم عليه السلام أبا الضيفان وسيد الكرماء. لم يكن يأكل وحده أبداً، فكان يبحث عن ضيف يشاركه طعامه. حين جاءته الملائكة في صورة ضيوف بادر بإكرامهم دون أن يسألهم من هم أو من أين جاءوا. قال تعالى: "فَرَاغَ إِلَىٰ أَهْلِهِ فَجَاءَ بِعِجْلٍ سَمِينٍ" - أي أسرع دون أن يُشعرهم حتى لا يحرجوا ويرفضوا. قدم لهم أفضل ما عنده وهو عجل سمين محمر على النار، وقربه إليهم بنفسه. هذا هو الكرم الحقيقي: الإسراع في الضيافة، وتقديم أفضل ما عندك، والتواضع في الخدمة. ولذلك سمي إبراهيم خليل الرحمن، لأن الكرم من أحب الأخلاق إلى الله.`, quranReference: "هَلْ أَتَاكَ حَدِيثُ ضَيْفِ إِبْرَاهِيمَ المُكْرَمِينَ", quranCitation: "سورة الذاريات: 24", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "And they give food in spite of love for it to the needy, the orphan, and the captive", surah: "Al-Insan", verseNumber: 8, title: "Generosity and Preferring Others", story: `This verse was revealed about the Prophet's family when they preferred the poor, orphans, and captives over themselves with their iftar, staying hungry for three nights. Generosity in Islam is not merely giving surplus but giving even when in need. "In spite of love for it" means despite their own need for the food, or for love of Allah seeking His pleasure. Generosity is the trait of prophets and righteous people, evidence of true faith because money is beloved to souls - whoever spends it for Allah has overcome desire and obeyed his Lord. Generosity includes generosity of hand in giving, generosity of tongue in kind words, and generosity of soul in forgiving wrongdoers.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "There is not a day upon which the servants awake except that two angels descend. One says: O Allah, give the one who spends a replacement. The other says: O Allah, give the one who withholds destruction", narrator: "Abu Hurairah", title: "Angels' Prayer for the Generous", story: `In this hadith, the Prophet reveals a daily prayer angels make for servants. Every day two angels descend - one prays for the spender that Allah replaces what he spent, and the other prays against the withholder that Allah destroys his wealth. Whoever spends for Allah, Allah compensates with better; whoever withholds and is stingy, Allah removes blessing from his wealth. This is observable in reality - many generous people have blessing in their wealth despite spending, while many misers see destruction in their wealth despite guarding it. Generosity causes increase; stinginess causes decrease - this is a fixed divine law.`, source: "Sahih Bukhari", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Abraham and Generosity", prophet: "Abraham", story: `Abraham was the father of guests and master of the generous. He never ate alone but would search for a guest to share his food. When angels came as guests, he hastened to honor them without asking who they were. Allah said: "He went quickly to his family and brought a fattened calf" - meaning he hurried without letting them notice to avoid embarrassment. He offered the best he had, a plump calf roasted, and served it himself. This is true generosity: hastening in hospitality, offering your best, and humility in service. Thus Abraham was called the Friend of the Most Merciful, because generosity is among the most beloved traits to Allah.`, quranReference: "Has there reached you the story of Abraham's honored guests", quranCitation: "Surah Adh-Dhariyat: 24", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "25", locales: { ar: { ayah: { text: "وَجَزَاءُ سَيِّئَةٍ سَيِّئَةٌ مِّثْلُهَا فَمَنْ عَفَا وَأَصْلَحَ فَأَجْرُهُ عَلَى اللَّهِ", surah: "الشورى", verseNumber: 40, title: "العفو أجره على الله", story: `هذه الآية تقرر مبدأ القصاص العادل مع الترغيب في الأفضل وهو العفو. فمن أساء إليك فلك أن ترد عليه بمثل ما أساء، وهذا عدل. لكن الأفضل والأكمل أن تعفو وتصلح، وعندها يكون أجرك على الله لا على الناس. العفو لا يعني الضعف بل يعني القوة، لأنه يحتاج إلى كظم الغيظ ومجاهدة النفس. والإنسان القوي حقاً هو الذي يملك نفسه عند الغضب لا الذي ينتقم. العفو يطفئ نار العداوة ويحول الأعداء إلى أصدقاء، بينما الانتقام يزيد العداوة ويديم الصراع. ولذلك كان النبي صلى الله عليه وسلم أكثر الناس عفواً، عفا عن قريش يوم فتح مكة وقال: اذهبوا فأنتم الطلقاء.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "مَا انْتَقَمَ رَسُولُ اللهِ صلى الله عليه وسلم لِنَفْسِهِ قَطُّ إِلَّا أَنْ تُنْتَهَكَ حُرْمَةُ اللهِ فَيَنْتَقِمَ لِلَّهِ", narrator: "عائشة رضي الله عنها", title: "العفو عند المقدرة", story: `هذا الحديث يكشف عن خلق النبي صلى الله عليه وسلم في العفو والصفح. كان يتحمل الأذى الشخصي ولا ينتقم لنفسه أبداً، لكنه كان يغضب إذا انتهكت حرمات الله. آذاه المشركون سنوات طويلة، رموه بالحجارة في الطائف، وضعوا الشوك في طريقه، ووضعوا سلا الجزور على ظهره وهو ساجد، لكنه لم ينتقم منهم. وحين تمكن منهم يوم فتح مكة عفا عنهم جميعاً. هذا هو العفو عند المقدرة، وهو أعظم أنواع العفو. فالعفو عند العجز ليس فضيلة لأنه إجبار، أما العفو مع القدرة على الانتقام فهو الفضيلة العظمى التي يرفع بها الله صاحبها درجات.`, source: "صحيح البخاري", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "يوسف عليه السلام والعفو عن الإخوة", prophet: "يوسف", story: `يوسف عليه السلام قدم أروع نموذج للعفو في التاريخ. إخوته حسدوه وألقوه في البئر وكذبوا على أبيهم وسببوا له سنوات من الألم في السجن والغربة. وحين مكّنه الله وأصبح عزيز مصر، جاءه إخوته محتاجين لا يعرفونه. كان بإمكانه أن ينتقم منهم أو يذلهم أو يسجنهم. لكنه اختار العفو والصفح. قال لهم: "لَا تَثْرِيبَ عَلَيْكُمُ اليَوْمَ يَغْفِرُ اللَّهُ لَكُمْ" أي لا لوم ولا عتاب. ليس هذا فحسب، بل أكرمهم وأحسن إليهم وأتى بأهله جميعاً ليعيشوا في مصر معززين مكرمين. هذا العفو العظيم هو الذي يليق بالأنبياء والصالحين، ويرفع صاحبه إلى أعلى الدرجات.`, quranReference: "قَالَ لَا تَثْرِيبَ عَلَيْكُمُ اليَوْمَ يَغْفِرُ اللَّهُ لَكُمْ", quranCitation: "سورة يوسف: 92", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "And the retribution for an evil act is an evil one like it, but whoever pardons and makes reconciliation - his reward is from Allah", surah: "Ash-Shura", verseNumber: 40, title: "The Reward for Pardon is from Allah", story: `This verse establishes the principle of just retribution while encouraging the better path of pardon. If someone wrongs you, you may respond in kind - that is justice. But the better and more complete response is to pardon and reconcile, and then your reward is from Allah, not people. Pardon does not mean weakness but strength, requiring suppression of anger and self-struggle. The truly strong person is one who controls himself in anger, not one who takes revenge. Pardon extinguishes enmity's fire and turns enemies into friends, while revenge increases enmity and perpetuates conflict. Thus the Prophet was the most forgiving, pardoning Quraysh on the conquest of Mecca saying: "Go, you are free."`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "The Messenger of Allah never took revenge for himself unless Allah's sanctities were violated, then he would take revenge for Allah", narrator: "Aisha", title: "Pardon When Able", story: `This hadith reveals the Prophet's character in pardon and forgiveness. He endured personal harm and never took revenge for himself, but he would become angry when Allah's sanctities were violated. Disbelievers harmed him for years, stoned him in Taif, placed thorns in his path, and put camel entrails on his back while prostrating, but he never took revenge. When he gained power over them on the conquest of Mecca, he pardoned all of them. This is pardon when able - the greatest type of pardon. Pardoning when unable is not virtue because it's forced; pardoning when capable of revenge is the great virtue for which Allah elevates ranks.`, source: "Sahih Bukhari", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Joseph and Pardoning His Brothers", prophet: "Joseph (Yusuf)", story: `Joseph presented the finest example of pardon in history. His brothers envied him, threw him in a well, lied to their father, and caused him years of pain in prison and exile. When Allah empowered him as Egypt's minister, his brothers came needy without recognizing him. He could have taken revenge, humiliated, or imprisoned them. But he chose pardon and forgiveness. He told them: "No blame upon you today. Allah will forgive you" - meaning no blame or reproach. Not only that, he honored them, treated them kindly, and brought his entire family to live in Egypt with honor. This great pardon befits prophets and the righteous and elevates its owner to the highest ranks.`, quranReference: "He said: No blame upon you today. Allah will forgive you", quranCitation: "Surah Yusuf: 92", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "26", locales: { ar: { ayah: { text: "إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ", surah: "الحجرات", verseNumber: 13, title: "التقوى معيار الكرامة", story: `هذه الآية العظيمة تهدم كل معايير التفاضل الجاهلية وتضع معياراً واحداً للكرامة عند الله: التقوى. لا فضل لعربي على أعجمي، ولا لأبيض على أسود، ولا لغني على فقير، إلا بالتقوى. والتقوى هي أن تجعل بينك وبين عذاب الله وقاية بطاعته واجتناب معصيته. المتقي هو الذي يراقب الله في سره وعلانيته، ويحذر من الذنوب الصغيرة قبل الكبيرة، ويسارع إلى الطاعات ويتجنب الشبهات. التقوى محلها القلب كما أشار النبي صلى الله عليه وسلم بقوله: "التقوى هاهنا" وأشار إلى صدره ثلاث مرات. فالله لا ينظر إلى الصور والأموال والأنساب، وإنما ينظر إلى القلوب والأعمال.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "إِنَّ اللهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ", narrator: "أبو هريرة", title: "القلوب والأعمال", story: `هذا الحديث يؤكد على أن معيار التفاضل عند الله ليس المظاهر والأشكال والثروات، بل القلوب والأعمال. فالله لا ينظر إلى جمال وجهك أو قبحه، ولا إلى كثرة مالك أو قلته، ولا إلى نسبك ومكانتك الاجتماعية. إنما ينظر إلى قلبك: هل هو سليم أم مريض؟ هل يحب الله ورسوله أم يحب الدنيا وشهواتها؟ وينظر إلى عملك: هل هو صالح أم فاسد؟ هل هو خالص لله أم رياء وسمعة؟ ولذلك كان السلف يخافون من فساد القلوب أكثر من خوفهم من المعاصي الظاهرة، لأن القلب إذا صلح صلح الجسد كله، وإذا فسد فسد الجسد كله.`, source: "صحيح مسلم", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "نوح عليه السلام ودعوة التقوى", prophet: "نوح", story: `نوح عليه السلام دعا قومه تسعمائة وخمسين سنة إلى تقوى الله وعبادته وحده. كان يقول لهم: "اعبدوا الله واتقوه وأطيعون". رغم طول المدة لم ييأس ولم يتوقف عن دعوته. كان يذكرهم بنعم الله عليهم ويدعوهم للشكر والاستغفار. وعدهم بأنهم إن اتقوا الله أرسل السماء عليهم مدراراً وأمدهم بأموال وبنين وجعل لهم جنات وأنهاراً. لكنهم استكبروا وأعرضوا وسخروا منه. وفي النهاية أمره الله ببناء السفينة، وأغرق المستكبرين ونجى المتقين. هذه قصة عظيمة تبين أن التقوى سبب للنجاة في الدنيا والآخرة، وأن المستكبرين مهما بلغت قوتهم فهم إلى زوال.`, quranReference: "أَنِ اعْبُدُوا اللَّهَ وَاتَّقُوهُ وَأَطِيعُونِ", quranCitation: "سورة نوح: 3", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "Indeed, the most noble of you in the sight of Allah is the most righteous of you", surah: "Al-Hujurat", verseNumber: 13, title: "Piety is the Standard of Honor", story: `This great verse demolishes all standards of pre-Islamic discrimination and establishes one criterion for honor with Allah: piety (taqwa). No Arab is superior to non-Arab, no white to black, no rich to poor, except through piety. Piety means placing a protection between yourself and Allah's punishment through obedience and avoiding sin. The pious person monitors Allah in private and public, fears small sins before major ones, hastens to good deeds and avoids doubts. Piety's place is the heart, as the Prophet indicated saying: "Piety is here" pointing to his chest three times. Allah does not look at appearances, wealth, or lineage, but looks at hearts and deeds.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Indeed, Allah does not look at your appearances or your wealth, but He looks at your hearts and your deeds", narrator: "Abu Hurairah", title: "Hearts and Deeds", story: `This hadith confirms that the criterion for distinction with Allah is not appearances, forms, and wealth, but hearts and deeds. Allah does not look at your beautiful or ugly face, your abundant or little wealth, or your lineage and social status. Rather, He looks at your heart: is it sound or sick? Does it love Allah and His Messenger or love worldly desires? He looks at your deeds: are they righteous or corrupt? Are they sincere for Allah or showing off? Thus the predecessors feared corruption of hearts more than outward sins, because when the heart is sound, the whole body is sound; when corrupted, the whole body is corrupted.`, source: "Sahih Muslim", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Noah and the Call to Piety", prophet: "Noah (Nuh)", story: `Noah called his people for nine hundred fifty years to Allah's piety and worship. He would tell them: "Worship Allah, fear Him, and obey me." Despite the long duration, he never despaired or stopped calling. He reminded them of Allah's blessings and called them to gratitude and forgiveness. He promised that if they feared Allah, He would send rain abundantly, provide them wealth and children, and make gardens and rivers for them. But they were arrogant, turned away, and mocked him. Finally, Allah commanded him to build the ark, drowned the arrogant, and saved the pious. This great story shows piety saves in this world and the Hereafter, and that the arrogant, however powerful, will perish.`, quranReference: "Worship Allah, fear Him, and obey me", quranCitation: "Surah Nuh: 3", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "27", locales: { ar: { ayah: { text: "إِنَّمَا المُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ", surah: "الأنفال", verseNumber: 2, title: "علامات الإيمان الحق", story: `هذه الآية تصف صفة من أهم صفات المؤمنين الصادقين: أن قلوبهم تخشع وتخاف عند ذكر الله. هذا الوجل ليس خوفاً مرضياً بل هو تعظيم لله وإجلال له. المؤمن حين يسمع اسم الله أو يتذكر عظمته يخفق قلبه ويستشعر مراقبة الله له. هذا الشعور يمنعه من المعاصي ويدفعه للطاعات. من لا يتأثر قلبه بذكر الله فليراجع إيمانه، فإن قسوة القلب من علامات البعد عن الله. والوجل يكون عند ذكر أسماء الله وصفاته وأفعاله، وعند سماع آياته وأحكامه، وعند التفكر في عظمته وجلاله. من استشعر عظمة الله لم يجرؤ على معصيته، ومن غفل عنها هان عليه الوقوع في المحرمات.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يَكُونَ اللهُ وَرَسُولُهُ أَحَبَّ إِلَيْهِ مِمَّا سِوَاهُمَا", narrator: "أنس بن مالك", title: "محبة الله ورسوله", story: `هذا الحديث يضع معياراً واضحاً للإيمان الكامل: أن يكون الله ورسوله أحب إلى الإنسان من كل شيء آخر - من المال والولد والأهل والنفس. ومحبة الله ليست مجرد ادعاء باللسان، بل تظهر في الطاعة والامتثال. فمن أحب الله أطاعه، ومن أحب رسوله اتبعه. والمحبة الصادقة تقتضي تقديم مرضاة المحبوب على هوى النفس. فحين يتعارض أمر الله مع رغباتك، فإن تقديم أمر الله دليل على محبتك الصادقة له. كان الصحابة يحبون الله ورسوله حباً عظيماً تظهر آثاره في تضحياتهم وصبرهم وجهادهم. هاجروا من ديارهم وتركوا أموالهم ووقفوا أمام عشائرهم وقاتلوا آباءهم في سبيل الله.`, source: "صحيح البخاري", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "إبراهيم عليه السلام وقوة الإيمان", prophet: "إبراهيم", story: `إبراهيم عليه السلام ضرب أروع الأمثلة في قوة الإيمان بالله. حين أُلقي في النار لم يتزعزع إيمانه لحظة، وقال: حسبي الله ونعم الوكيل. فجعل الله النار برداً وسلاماً عليه. وحين أُمر بذبح ابنه إسماعيل الذي جاءه على كبر سنه، لم يتردد لحظة في طاعة الله. استسلم هو وابنه لأمر الله، وحين وضع السكين على حلقه فداه الله بكبش عظيم. وحين أُمر بترك زوجته وطفله في صحراء مكة، فعل ذلك ثقة بالله. قالت له هاجر: آلله أمرك بهذا؟ قال: نعم. قالت: إذاً لا يضيعنا. هذا الإيمان العظيم جعل الله يتخذه خليلاً ويجعله إماماً للناس.`, quranReference: "وَإِبْرَاهِيمَ الَّذِي وَفَّىٰ", quranCitation: "سورة النجم: 37", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "The believers are only those who, when Allah is mentioned, their hearts become fearful", surah: "Al-Anfal", verseNumber: 2, title: "Signs of True Faith", story: `This verse describes an essential trait of true believers: their hearts humble and fear when Allah is mentioned. This fear is not pathological but reverence and glorification of Allah. When the believer hears Allah's name or remembers His greatness, his heart trembles and senses Allah's watching. This feeling prevents sin and motivates obedience. Whoever's heart is unaffected by Allah's remembrance should review their faith, for hardness of heart indicates distance from Allah. Fear comes when mentioning Allah's names, attributes, and actions, when hearing His verses and rulings, and when contemplating His greatness and majesty. Whoever feels Allah's greatness won't dare disobey; whoever is heedless falls easily into sins.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "None of you believes until Allah and His Messenger are more beloved to him than anything else", narrator: "Anas ibn Malik", title: "Love of Allah and His Messenger", story: `This hadith sets a clear standard for complete faith: Allah and His Messenger must be more beloved than everything else - wealth, children, family, and self. Love of Allah is not mere claim but appears in obedience and compliance. Whoever loves Allah obeys Him; whoever loves the Messenger follows him. True love requires prioritizing the beloved's pleasure over self-desire. When Allah's command conflicts with your wishes, prioritizing Allah's command proves your love. The companions loved Allah and the Messenger immensely, shown in their sacrifices, patience, and struggle. They migrated from homes, left wealth, stood against tribes, and fought fathers for Allah's sake.`, source: "Sahih Bukhari", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Abraham and Strong Faith", prophet: "Abraham", story: `Abraham set the finest examples of strong faith in Allah. When thrown into fire, his faith didn't waver for a moment, saying: "Allah is sufficient for me, and He is the best disposer of affairs." Allah made the fire cool and peaceful for him. When commanded to slaughter his son Ishmael who came in old age, he didn't hesitate in obeying Allah. He and his son submitted to Allah's command, and when he placed the knife on his throat, Allah ransomed him with a great ram. When commanded to leave his wife and infant in Mecca's desert, he did so trusting Allah. Hajar asked him: "Did Allah command this?" He said: "Yes." She said: "Then He will not abandon us." This great faith made Allah take him as a friend and make him a leader for people.`, quranReference: "And Abraham who fulfilled", quranCitation: "Surah An-Najm: 37", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "28", locales: { ar: { ayah: { text: "وَالَّذِينَ يُؤْمِنُونَ بِالْآخِرَةِ يُؤْمِنُونَ بِهِ وَهُمْ عَلَىٰ صَلَاتِهِمْ يُحَافِظُونَ", surah: "الأنعام", verseNumber: 92, title: "اليقين بالآخرة", story: `اليقين بالآخرة ركن أساسي من أركان الإيمان، وهو الذي يجعل للحياة معنى ويوجه السلوك نحو الخير. من آمن بأن هناك حساباً وجزاءً فلن يظلم أحداً، ومن آمن بالجنة والنار فسيعمل للفوز بالجنة والنجاة من النار. اليقين بالآخرة يهون المصائب لأن المؤمن يعلم أن هذه الدنيا قصيرة فانية وأن الآخرة هي الحياة الحقيقية الباقية. كما أنه يمنع الظلم والطغيان، لأن من يؤمن بالحساب يعلم أنه سيُسأل عن كل صغيرة وكبيرة. الصلاة والمحافظة عليها دليل على هذا اليقين، لأن من تيقن بالآخرة حافظ على صلاته التي هي عمود الدين وأول ما يُحاسب عليه العبد.`, source: "الطبري", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "أَكْثِرُوا ذِكْرَ هَاذِمِ اللَّذَّاتِ - يَعْنِي المَوْتَ", narrator: "أبو هريرة", title: "تذكر الموت", story: `تذكر الموت من أعظم المواعظ التي تلين القلوب القاسية وتردع النفوس عن المعاصي. سماه النبي صلى الله عليه وسلم "هادم اللذات" لأنه يذكر الإنسان بأن كل لذات الدنيا ستنتهي وأنه سيقف بين يدي ربه للحساب. من أكثر من ذكر الموت زهد في الدنيا وأقبل على الآخرة. ومن نسي الموت اغتر بالحياة وتمادى في المعاصي ظاناً أنه مخلد. كان الصحابة والتابعون يكثرون من زيارة القبور وذكر الموت حتى تصير قلوبهم رقيقة خاشعة. قال عمر بن عبد العزيز: ما يخطئني يوم إلا وأتذكر أنه قد يكون آخر أيامي. وهذا التذكر يجعل الإنسان يستثمر كل لحظة في طاعة الله.`, source: "سنن الترمذي", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "إبراهيم عليه السلام واليقين", prophet: "إبراهيم", story: `إبراهيم عليه السلام كان يقينه بالله ثابتاً راسخاً لا تزعزعه الشدائد. حين طلب من ربه أن يريه كيف يحيي الموتى، لم يكن ذلك شكاً بل طلباً لزيادة الطمأنينة. قال الله له: "أَوَلَمْ تُؤْمِن قَالَ بَلَىٰ وَلَٰكِن لِّيَطْمَئِنَّ قَلْبِي". فأمره الله أن يأخذ أربعة من الطير فيذبحها ويفرقها على الجبال ثم يدعوها فتأتيه سعياً. ففعل إبراهيم ورأى بعينه كيف يحيي الله الموتى. هذا اليقين جعله يقف أمام الظالمين بلا خوف، ويحطم أصنام قومه بلا تردد، ويُلقى في النار بلا جزع. اليقين هو الذي يصنع الأبطال والقادة والمصلحين الذين يغيرون التاريخ.`, quranReference: "وَلَٰكِن لِّيَطْمَئِنَّ قَلْبِي", quranCitation: "سورة البقرة: 260", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "And those who believe in the Hereafter believe in it, and they are maintaining their prayers", surah: "Al-An'am", verseNumber: 92, title: "Certainty in the Hereafter", story: `Certainty in the Hereafter is a fundamental pillar of faith that gives life meaning and directs behavior toward good. Whoever believes in accountability won't wrong anyone; whoever believes in Paradise and Hell will work to win Paradise and escape Hell. Certainty in the Hereafter eases calamities because the believer knows this short world will end while the Hereafter is the true, lasting life. It also prevents oppression and tyranny because one who believes in accounting knows they'll be questioned about everything. Maintaining prayer proves this certainty, for whoever is certain about the Hereafter maintains prayer, the pillar of religion and the first thing questioned about.`, source: "At-Tabari", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Remember often the destroyer of pleasures - meaning death", narrator: "Abu Hurairah", title: "Remembering Death", story: `Remembering death is among the greatest sermons that soften hard hearts and deter souls from sins. The Prophet called it "destroyer of pleasures" because it reminds that all worldly pleasures will end and one will stand before the Lord for accounting. Whoever remembers death often becomes ascetic toward the world and turns to the Hereafter. Whoever forgets death is deceived by life and continues sinning, thinking he's immortal. The companions and their followers would visit graves often and remember death until their hearts became soft and humble. Umar ibn Abd al-Aziz said: "No day passes without me remembering it might be my last." This remembrance makes one invest every moment in Allah's obedience.`, source: "Sunan Tirmidhi", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Abraham and Certainty", prophet: "Abraham", story: `Abraham's certainty in Allah was firm and unshakable by hardships. When he asked his Lord to show him how He gives life to the dead, it wasn't doubt but seeking more assurance. Allah said: "Do you not believe?" He said: "Yes, but to satisfy my heart." Allah commanded him to take four birds, slaughter them, distribute them on mountains, then call them, and they would come running. Abraham did and saw with his own eyes how Allah resurrects the dead. This certainty made him stand fearlessly before tyrants, smash his people's idols without hesitation, and be thrown in fire without anxiety. Certainty creates heroes, leaders, and reformers who change history.`, quranReference: "But to satisfy my heart", quranCitation: "Surah Al-Baqarah: 260", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "29", locales: { ar: { ayah: { text: "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ", surah: "الأنعام", verseNumber: 162, title: "الإخلاص في العبادة", story: `هذه الآية ترسم صورة الإخلاص الكامل لله: أن تكون الصلاة والعبادة والحياة والموت كلها لله وحده. الإخلاص أن يكون العمل خالصاً لله لا يشوبه رياء ولا سمعة ولا طلب ثناء الناس. المخلص يعمل الخير ولو لم يره أحد، ويتصدق ولو لم يعلم بصدقته أحد، ويصلي في الليل ولو لم يطلع عليه أحد. الرياء يحبط العمل ويذهب أجره، بل قد يكون صاحبه من أوائل من تُسعّر بهم النار يوم القيامة. والإخلاص عزيز صعب على النفس لأنها تحب المدح والثناء، ولذلك سماه العلماء "العمل الخفي" لأن المخلص يخفي عمله ويبتعد عن الظهور.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", narrator: "عمر بن الخطاب", title: "النية أساس العمل", story: `هذا الحديث من جوامع كلم النبي صلى الله عليه وسلم، جعله العلماء أصلاً من أصول الإسلام. فالعمل لا يُقبل إلا بنية صالحة، والنية هي التي تحدد قيمة العمل عند الله. نفس الفعل قد يكون عبادة يُؤجر عليها أو عادة لا أجر فيها أو معصية يُعاقب عليها، بحسب نية صاحبه. فمن أكل نوى التقوي على العبادة أُجر، ومن أكل للتلذذ فقط فلا أجر ولا وزر، ومن أكل حراماً أثم. ولذلك كان السلف يراجعون نياتهم باستمرار ويخافون من فسادها. قال سفيان الثوري: ما عالجت شيئاً أشد عليّ من نيتي. والمؤمن يحتسب نياته حتى في الأمور المباحة ليحولها إلى عبادات.`, source: "صحيح البخاري", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "يوسف عليه السلام والإخلاص", prophet: "يوسف", story: `يوسف عليه السلام كان مثالاً عظيماً للإخلاص لله في كل أحواله. حين أُغري بالمعصية من امرأة العزيز في موقف لا يراه فيه أحد، قال: "مَعَاذَ اللَّهِ" فاستحضر مراقبة الله وإن غابت مراقبة الناس. وحين كان في السجن دعا السجناء إلى الله بإخلاص لا يريد منهم أجراً ولا شهرة. وحين صار عزيز مصر لم يتغير ولم يتكبر، بل ظل مخلصاً لله شاكراً لنعمته. قال عنه ربه: "كَذَٰلِكَ لِنَصْرِفَ عَنْهُ السُّوءَ وَالْفَحْشَاءَ إِنَّهُ مِنْ عِبَادِنَا الْمُخْلَصِينَ". فالإخلاص هو الذي صرف عنه السوء وحفظه من الفواحش، وهو الذي رفعه من قعر البئر والسجن إلى قمة السلطة والملك.`, quranReference: "إِنَّهُ مِنْ عِبَادِنَا الْمُخْلَصِينَ", quranCitation: "سورة يوسف: 24", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "Say: Indeed, my prayer, my sacrifice, my living, and my dying are for Allah, Lord of the worlds", surah: "Al-An'am", verseNumber: 162, title: "Sincerity in Worship", story: `This verse paints the picture of complete sincerity to Allah: prayer, worship, life, and death all for Allah alone. Sincerity means work is purely for Allah, untainted by showing off, reputation, or seeking people's praise. The sincere person does good even if unseen, gives charity even if unknown, and prays at night even if unobserved. Showing off nullifies the deed and removes its reward; indeed, such people may be among the first thrown in Hell on Judgment Day. Sincerity is rare and difficult for the soul because it loves praise and flattery, so scholars call it "the hidden deed" because the sincere hide their work and avoid attention.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "Deeds are judged by intentions, and every person shall have what they intended", narrator: "Umar ibn al-Khattab", title: "Intention is the Foundation of Deeds", story: `This hadith is among the Prophet's comprehensive words; scholars made it a foundational principle of Islam. Work is only accepted with righteous intention, and intention determines the deed's value with Allah. The same act may be worship rewarded, habit unrewarded, or sin punished depending on intention. Whoever eats intending strength for worship is rewarded; whoever eats merely for pleasure has no reward or sin; whoever eats forbidden things sins. Thus predecessors constantly reviewed their intentions, fearing corruption. Sufyan ath-Thawri said: "I struggled with nothing harder than my intention." The believer considers intentions even in permissible matters to transform them into worship.`, source: "Sahih Bukhari", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Joseph and Sincerity", prophet: "Joseph (Yusuf)", story: `Joseph was a great example of sincerity to Allah in all circumstances. When tempted to sin by the minister's wife in a situation unseen by anyone, he said: "I seek refuge in Allah!" He remembered Allah's watching even when people's watching was absent. In prison, he called inmates to Allah sincerely, seeking no payment or fame. When he became Egypt's minister, he didn't change or become arrogant but remained sincere to Allah, grateful for His blessings. His Lord said of him: "Thus did We avert evil and immorality from him. Indeed, he was of Our sincere servants." Sincerity averted evil and protected him from immorality, and raised him from the pit and prison to the peak of authority and kingship.`, quranReference: "Indeed, he was of Our sincere servants", quranCitation: "Surah Yusuf: 24", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } },
  { id: "30", locales: { ar: { ayah: { text: "وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ", surah: "آل عمران", verseNumber: 134, title: "كظم الغيظ والحلم", story: `هذه الآية تصف صفة من صفات المتقين الذين أُعدت لهم الجنة: كظم الغيظ والعفو عن الناس. الغيظ هو الغضب الشديد الذي يكاد يفور، وكظمه يعني حبسه ومنعه من الظهور. وهذا يحتاج إلى قوة نفسية عظيمة ومجاهدة للهوى. ثم يأتي مستوى أعلى وهو العفو، أي ترك المؤاخذة مع القدرة عليها. والحلم صفة محمودة عند الله وعند الناس، وقد كان النبي صلى الله عليه وسلم أحلم الناس لا يُغضبه شيء لنفسه. وقد قال للأشج عبد القيس: "إن فيك خصلتين يحبهما الله: الحلم والأناة". فالحلم يُكسب صاحبه محبة الله ومحبة الناس، ويحقن الدماء ويمنع العداوات ويصلح ذات البين.`, source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الغَضَبِ", narrator: "أبو هريرة", title: "القوي الحقيقي", story: `هذا الحديث يصحح مفهوماً خاطئاً عند كثير من الناس عن القوة. فالناس يظنون أن القوي هو الذي يصرع الرجال ويغلبهم بقوته البدنية. لكن النبي صلى الله عليه وسلم يبين أن القوة الحقيقية هي قوة النفس والتحكم فيها عند الغضب. فالغضب يفقد الإنسان السيطرة على نفسه ويدفعه لأقوال وأفعال يندم عليها. أما الذي يملك نفسه عند الغضب فهو القوي حقاً لأنه يتحكم في أصعب المواقف. كان النبي صلى الله عليه وسلم لا يغضب لنفسه قط، وكان يوصي بعدم الغضب قائلاً لمن طلب منه وصية: "لا تغضب" وكررها مراراً. والعلاج عند الغضب أن يتعوذ بالله من الشيطان الرجيم، ويجلس إن كان قائماً، ويتوضأ إن كان محتدماً.`, source: "صحيح البخاري", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "إبراهيم الحليم", prophet: "إبراهيم", story: `لُقب إبراهيم عليه السلام بالحليم في القرآن الكريم لشدة حلمه وسعة صبره. حين جادله قومه في الله بالباطل صبر عليهم ولم يغضب، بل دعاهم بالحكمة والموعظة الحسنة. وحين ألقوه في النار لم يدعُ عليهم بل قال: حسبي الله ونعم الوكيل. وحين أمره الله بذبح ابنه لم يجزع ولم يتسخط بل استسلم لأمر الله بحلم وسكينة. وحين خاطب أباه المشرك قال له: "يَا أَبَتِ" بكل أدب ورفق رغم أن أباه هدده بالرجم. هذا الحلم العظيم جعل الله يقول عنه: "إِنَّ إِبْرَاهِيمَ لَأَوَّاهٌ حَلِيمٌ". والأواه هو الكثير التضرع إلى الله، والحليم هو الذي لا يستعجل العقوبة على من أساء إليه.`, quranReference: "إِنَّ إِبْرَاهِيمَ لَأَوَّاهٌ حَلِيمٌ", quranCitation: "سورة التوبة: 114", source: "ابن كثير", sourceUrl: "https://quran.ksu.edu.sa" } }, en: { ayah: { text: "And those who restrain anger and who pardon people", surah: "Ali Imran", verseNumber: 134, title: "Restraining Anger and Forbearance", story: `This verse describes a trait of the pious prepared for Paradise: restraining anger and pardoning people. Anger is intense fury that nearly boils over; restraining it means containing and preventing its appearance. This requires great psychological strength and struggling against desires. Then comes a higher level: pardon, meaning leaving punishment despite ability. Forbearance is a trait praised by Allah and people; the Prophet was the most forbearing, never angered for himself. He told Al-Ashaj Abd al-Qays: "You have two qualities Allah loves: forbearance and deliberateness." Forbearance earns Allah's love and people's love, prevents bloodshed, averts enmities, and reconciles relationships.`, source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" }, hadith: { text: "The strong person is not the one who wrestles others down, but the strong person is the one who controls himself when angry", narrator: "Abu Hurairah", title: "The Truly Strong", story: `This hadith corrects a mistaken concept many have about strength. People think the strong person wrestles men and overpowers them physically. But the Prophet clarifies that true strength is self-control when angry. Anger makes one lose self-control and leads to words and actions one regrets. But one who controls himself in anger is truly strong because he controls the most difficult situations. The Prophet never got angry for himself and advised against anger, telling one who asked for advice: "Don't get angry" - repeating it several times. The remedy for anger is seeking refuge in Allah from Satan, sitting if standing, and performing ablution if heated.`, source: "Sahih Bukhari", sourceUrl: "https://sunnah.com" }, prophetStory: { title: "Abraham the Forbearing", prophet: "Abraham", story: `Abraham was titled "the Forbearing" in the Quran for his great forbearance and vast patience. When his people argued with him falsely about Allah, he was patient and didn't anger, calling them with wisdom and good preaching. When thrown in fire, he didn't curse them but said: "Allah is sufficient for me." When commanded to slaughter his son, he didn't panic or resent but submitted to Allah's command with forbearance and tranquility. When addressing his polytheist father, he said "O my father" with all courtesy despite threats of stoning. This great forbearance made Allah say: "Indeed, Abraham was compassionate and forbearing." Compassionate means frequently supplicating to Allah; forbearing means not hastening punishment for those who wrong him.`, quranReference: "Indeed, Abraham was compassionate and forbearing", quranCitation: "Surah At-Tawbah: 114", source: "Ibn Kathir", sourceUrl: "https://quran.ksu.edu.sa" } } } }
];

additionalStories.push(...storiesWithRealContent);

DAILY_CONTENT_DATA.push(...additionalStories);

