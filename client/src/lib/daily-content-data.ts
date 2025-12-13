import { type DailyContent } from "./daily-content";

// Helper to create a multi-lingual entry
// For this mockup, we are primarily populating AR and EN.
// Other languages will fallback to EN or can be added later.
export const DAILY_CONTENT_DATA: DailyContent[] = [
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

الدرس العظيم هنا هو أن الصدق، وإن كان صعباً في بدايته، إلا أن عاقبته حميدة ومنجاة في الدنيا والآخرة. وقد خلد الله قصتهم في القرآن لتكون نبراساً للمؤمنين في أهمية الصدق والاعتراف بالخطأ كأول خطوات التصحيح، وأن الله يقبل التوبة عن عباده الصادقين.`,
          source: "موقع الشيخ ابن باز",
          sourceUrl: "https://binbaz.org.sa"
        },
        hadith: {
          text: "أَعْطُوا الأَجِيرَ أَجْرَهُ قَبْلَ أَنْ يَجِفَّ عَرَقُهُ",
          narrator: "عبد الله بن عمر",
          title: "قصة الثلاثة أصحاب الغار",
          story: `يرتبط هذا المعنى بقصة عجيبة رواها النبي ﷺ عن ثلاثة نفر ممن كان قبلنا، آواهم المبيت إلى غار، فانحدرت صخرة من الجبل فسدت عليهم الغار. أيقنوا بالهلاك، فقالوا: "إنه لا ينجيكم من هذه الصخرة إلا أن تدعوا الله بصالح أعمالكم".

فدعا كل واحد منهم بأرجى عمل له عند الله. أما الشاهد في حديثنا، فقد كان ثالثهم، الذي قال: "اللهم إنه كان لي أجير عمل لي عملاً، فلما فرغ طلب أجره، فرغبت عنه (أي تأخرت قليلاً أو ما شابه)، فتركه وذهب. فثمرت أجره حتى كثرت منه الأموال".

وبعد سنين، عاد الأجير يطلب حقه القديم. فقال له الرجل: "كل ما ترى من الإبل والبقر والغنم والرقيق هو أجرك". فاستغرب الأجير وقال: "يا عبد الله لا تستهزئ بي!"، فأكد له أنه حقه، فأخذه كله ولم يترك شيئاً.

فقال الرجل: "اللهم إن كنت فعلت ذلك ابتغاء وجهك فافرج عنا ما نحن فيه"، فانفرجت الصخرة وخرجوا يمشون.

هذه القصة تعلمنا عظم الأمانة، وأن حفظ حقوق الناس وتنميتها وردها إليهم كاملة، حتى بعد مرور الزمن، هو من أعظم القربات التي تنجي العبد من كربات الدنيا والآخرة.`,
          source: "موقع الشيخ ابن باز",
          sourceUrl: "https://binbaz.org.sa"
        },
        prophetStory: {
          title: "حلم يوسف وتحققه",
          prophet: "يوسف",
          story: `تبدأ قصة يوسف عليه السلام برؤيا، وتنتهي بتأويلها، وبين البداية والنهاية رحلة طويلة من الابتلاءات التي تصهر المعادن. رأى يوسف وهو صغير أحد عشر كوكباً والشمس والقمر له ساجدين، فكانت بشارة بنبوة وملك.

لكن الطريق لم يكن مفروشاً بالورود؛ فقد بدأ بمحنة حسد إخوته وإلقائه في غيابات الجب وحيداً، ثم بيعه بثمن بخس، ثم محنة فتنة امرأة العزيز التي راودته عن نفسه فاستعصم واختار السجن على المعصية، فلبث فيه بضع سنين مظلوماً.

في كل هذه المحطات، لم يفقد يوسف ثقته بالله، ولم يتخلى عن إحسانه، حتى وهو في السجن كان يدعو إلى الله ويعبر الرؤى. شاءت إرادة الله أن يخرج من السجن عزيزاً على مصر، ومككيناً في الأرض، ليجمع الله شمله بأهله ويتحقق حلمه القديم.

تعلمنا القصة أن تدبير الله دقيق ولطيف، وأنه "غالب على أمره ولكن أكثر الناس لا يعلمون". تعلمنا أن المحنة قد تكون باطنها منحة، وأن الصبر والتقوى هما مفتاح التمكين والنصر.`,
          quranReference: "وَرَفَعَ أَبَوَيْهِ عَلَى الْعَرْشِ وَخَرُّوا لَهُ سُجَّدًا ۖ وَقَالَ يَا أَبَتِ هَٰذَا تَأْوِيلُ رُؤْيَايَ مِن قَبْلُ قَدْ جَعَلَهَا رَبِّي حَقًّا",
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
          title: "The Story of Ka'b bin Malik's Repentance",
          story: `This verse was revealed in the context of the moving story of the companion Ka'b bin Malik (RA) and his two companions who stayed behind from the Battle of Tabuk. It was a time of intense heat and ripe fruits, so Ka'b procrastinated until the army left.

When the Prophet ﷺ returned, those who stayed behind came making excuses and swearing oaths. The Prophet accepted their public excuses and left their inner thoughts to Allah. But Ka'b chose truthfulness and said: "O Messenger of Allah, if I were sitting before anyone else of the people of the world, I would have thought that I would get out of his anger with an excuse... but by Allah, I have no excuse."

The Prophet ordered the companions to boycott Ka'b and his two companions. People avoided them for fifty nights until the earth, vast as it is, seemed narrow to them, and their souls felt constricted. Then, relief came from above the seven heavens with their repentance accepted.

The great lesson here is that truthfulness, even if difficult at first, leads to a good outcome and salvation in this world and the Hereafter. Allah immortalized their story in the Quran to be a beacon for believers on the importance of honesty and admitting mistakes as the first step to correction.`,
          source: "BinBaz.org.sa",
          sourceUrl: "https://binbaz.org.sa"
        },
        hadith: {
          text: "Give the worker his wages before his sweat dries.",
          narrator: "Abdullah ibn Umar",
          title: "The Three Men in the Cave",
          story: `This meaning is connected to a wondrous story narrated by the Prophet ﷺ about three men from those before us who took shelter in a cave for the night. A rock fell from the mountain and blocked the cave entrance. They were certain of death and said: "Nothing will save you from this rock except invoking Allah by your good deeds."

Each invoked Allah by his most hopeful deed. The witness in our discussion is the third one, who said: "O Allah, I had hired a worker who worked for me. When he finished, he asked for his wages, but I withheld them (or he left them). I invested his wages until they became abundant wealth."

Years later, the worker returned asking for his old right. The man told him: "Everything you see of camels, cows, sheep, and slaves is your wage." The worker was astonished and said: "O servant of Allah, do not mock me!" The man assured him it was his right, so he took it all and left nothing.

The man said: "O Allah, if I did this seeking Your Face, then relieve us from what we are in." The rock moved, and they walked out.

This story teaches us the greatness of trustworthiness (Amanah), and that preserving people's rights, growing them, and returning them fully is one of the greatest acts of worship that saves a servant from the distresses of this world and the Hereafter.`,
          source: "BinBaz.org.sa",
          sourceUrl: "https://binbaz.org.sa"
        },
        prophetStory: {
          title: "Joseph's Dream and Its Fulfillment",
          prophet: "Joseph (Yusuf)",
          story: `The story of Joseph (peace be upon him) begins with a dream and ends with its interpretation. Between the beginning and the end is a long journey of trials that refine character. As a child, Joseph saw eleven stars, the sun, and the moon prostrating to him - a glad tiding of prophethood and kingship.

But the path was not easy; it began with the trial of his brothers' envy and being thrown into the well alone, then being sold for a cheap price, then the trial of the Aziz's wife attempting to seduce him. He chose prison over sin and remained there for several years, unjustly.

In all these stations, Joseph never lost his trust in Allah nor abandoned his excellence (Ihsan). Even in prison, he called to Allah and interpreted dreams. Allah willed for him to leave prison as a noble authority in Egypt, empowered in the land, to eventually reunite with his family and see his old dream fulfilled.

The story teaches us that Allah's planning is precise and subtle, and "Allah is predominant over His affair, but most of the people do not know." It teaches that a trial may have a gift hidden within it, and that patience and piety are the keys to empowerment and victory.`,
          quranReference: "And he raised his parents upon the throne, and they bowed to him in prostration. And he said, 'O my father, this is the explanation of my vision of before. My Lord has made it reality.'",
          quranCitation: "Surah Yusuf: 100",
          source: "General Presidency",
          sourceUrl: "https://www.alifta.gov.sa"
        }
      }
    }
  },
  {
    id: "2",
    locales: {
      ar: {
        ayah: {
          text: "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ",
          surah: "الحشر",
          verseNumber: 9,
          title: "قصة ضيف الأنصاري",
          story: `نزلت هذه الآية الكريمة تخليداً لموقف بطولي في الكرم والإيثار لرجل من الأنصار وزوجته. جاء رجل جائع إلى النبي ﷺ، فلم يجد النبي في بيوته شيئاً يطعمه، فقال: "من يضيف هذا الليلة رحمه الله؟".

فقام رجل من الأنصار وقال: "أنا يا رسول الله". انطلق الرجل إلى بيته، وسأل زوجته: "هل عندك شيء؟"، قالت: "لا إلا قوت صبياني". هنا ظهر معدن الإيمان الحقيقي، حيث اتفقا على خطة عجيبة لإكرام ضيف رسول الله.

قالت المرأة: "علليهم بشيء ونوميهم، فإذا دخل الضيف فأطفئي السراج وأريه أنا نأكل". فجلسوا في الظلام، وجعل الضيف يأكل، وهما يحركان أفواههما كأنهما يأكلان معه، وباتا تلك الليلة جائعين هما وأطفالهما، من أجل إشباع ضيفهما.

فلما أصبح الرجل وغدا إلى النبي ﷺ، استقبله النبي بوجه متهلل وقال: "لقد عجب الله من صنيعكما بضيفكما الليلة".

هذه القصة تعلمنا أن الإيثار ليس مجرد كرم بالزائد، بل هو تقديم حاجة أخيك على حاجة نفسك الضرورية، وهي ذروة سنام الأخوة الإيمانية التي امتدحها الله في كتابه.`,
          source: "موقع الشيخ ابن باز",
          sourceUrl: "https://binbaz.org.sa"
        },
        hadith: {
          text: "وَاللَّهِ لاَ يُؤْمِنُ... الَّذِي لاَ يَأْمَنُ جَارُهُ بَوَائِقَهُ",
          narrator: "أبو هريرة",
          title: "أهمية حق الجار",
          story: `في مشهد مهيب، يقف النبي ﷺ ويقسم بالله العظيم ثلاث مرات، مما جعل الصحابة يشرئبون بأعناقهم ليعرفوا من هذا الخاسر الذي نفى النبي عنه الإيمان. فقالوا: "خاب وخسر يا رسول الله! من هو؟". قال: "الذي لا يأمن جاره بوائقه".

والبوائق هي الشرور، والغوائل، والخيانات. هذا الحديث الشريف يضع قاعدة اجتماعية صارمة في الإسلام: الأمان هو أساس الجيرة.

والسبب في هذا التشديد العظيم هو طبيعة العلاقة بين الجيران؛ فالجار مطلع على عورات جاره، قريب من داره، عالم بمدخله ومخرجه. فإذا لم يكن الجار أميناً، تحولت حياة جاره إلى جحيم وقلق دائم.

ليس المطلوب فقط كف الأذى، بل إن شعور الجار بالأمان منك هو المقياس. فإذا كان جارك يعيش قلقاً من لسانك، أو يدك، أو نظرك، فقد نقص إيمانك بنص الحديث. الإسلام يريد مجتمعاً مترابطاً، واللبنة الأولى لهذا الترابط هي الثقة والأمان بين البيوت المتجاورة.`,
          source: "موقع الشيخ ابن باز",
          sourceUrl: "https://binbaz.org.sa"
        },
        prophetStory: {
          title: "موسى والخضر",
          prophet: "موسى",
          story: `قصة رحلة موسى عليه السلام في طلب العلم من الخضر هي مدرسة في التواضع والأدب مع الله. قام موسى خطيباً في بني إسرائيل، فسُئل: "أي الناس أعلم؟"، فقال: "أنا"، فعاتبه الله إذ لم يرد العلم إليه، وأوحى إليه أن عبداً من عبادنا عند مجمع البحرين هو أعلم منك.

لم يتكبر موسى، وهو كليم الله وأحد أولي العزم من الرسل، بل شد الرحال في سفر شاق وطويل ليتعلم. وعندما لقي الخضر، طلب منه الصحبة بأدب التلميذ: "هل أتبعك على أن تعلمن مما علمت رشداً؟".

شهدت الرحلة أحداثاً عجيبة ظاهرها المنكر وباطنها الرحمة والحكمة: خرق السفينة لإنقاذها من غصب الملك، وقتل الغلام لإنقاذ والديه من الطغيان، وبناء الجدار لحفظ كنز اليتيمين.

تعلمنا القصة أن علم البشر مهما اتسع فهو قطرة في بحر علم الله، وأن أقدار الله التي قد نراها مؤلمة أو غير مفهومة، تحمل في طياتها حكماً بالغة ولطفاً خفياً، وأن التسليم لأمر الله وحكمته هو جوهر العبودية.`,
          quranReference: "قَالَ لَهُ مُوسَىٰ هَلْ أَتَّبِعُكَ عَلَىٰ أَن تُعَلِّمَنِ مِمَّا عُلِّمْتَ رُشْدًا",
          quranCitation: "سورة الكهف: 66",
          source: "الرئاسة العامة",
          sourceUrl: "https://www.alifta.gov.sa"
        }
      },
      en: {
        ayah: {
          text: "And they give preference over themselves, even though they are in privation.",
          surah: "Al-Hashr",
          verseNumber: 9,
          title: "The Story of the Ansari Host",
          story: `This noble verse was revealed to immortalize a heroic stance of generosity and altruism (Ithar) by a man from the Ansar and his wife. A hungry man came to the Prophet ﷺ, but the Prophet found nothing in his houses to feed him. He asked: "Who will host this man tonight, may Allah have mercy on him?"

A man from the Ansar stood up and said: "I will, O Messenger of Allah." The man went to his house and asked his wife: "Do you have anything?" She said: "No, except food for my children." Here, the true metal of faith appeared, as they agreed on an amazing plan to honor the Prophet's guest.

The woman said: "Distract them with something and put them to sleep. When the guest enters, extinguish the lamp and show him that we are eating." They sat in the dark, the guest ate, while they moved their mouths as if eating with him. They and their children spent that night hungry to satisfy their guest.

In the morning, the man went to the Prophet ﷺ, who received him with a beaming face and said: "Allah has wondered at your action with your guest last night."

This story teaches us that altruism (Ithar) is not just generosity with surplus, but offering the need of your brother over your own essential need. It is the peak of brotherhood praised by Allah in His Book.`,
          source: "BinBaz.org.sa",
          sourceUrl: "https://binbaz.org.sa"
        },
        hadith: {
          text: "By Allah, he does not believe... he whose neighbor is not safe from his harm.",
          narrator: "Abu Hurairah",
          title: "The Importance of Neighbor's Rights",
          story: `In a solemn scene, the Prophet ﷺ stood and swore by Allah the Almighty three times, making the companions stretch their necks to know who this loser was whom the Prophet denied faith. They asked: "Who is ruined and lost, O Messenger of Allah?" He said: "The one whose neighbor is not safe from his harm (Bawaiq)."

Bawaiq means evils, calamities, and treacheries. This noble Hadith sets a strict social rule in Islam: Safety is the foundation of neighborhood.

The reason for this great emphasis is the nature of the relationship between neighbors; a neighbor is aware of his neighbor's privacy, close to his home, knowing his entry and exit. If the neighbor is not trustworthy, his neighbor's life turns into hell and constant anxiety.

It is not just about refraining from harm, but the neighbor's feeling of safety from you is the measure. If your neighbor lives in anxiety from your tongue, hand, or look, your faith is deficient according to the Hadith. Islam wants a cohesive society, and the first brick of this cohesion is trust and safety between neighboring homes.`,
          source: "BinBaz.org.sa",
          sourceUrl: "https://binbaz.org.sa"
        },
        prophetStory: {
          title: "Moses and Khidr",
          prophet: "Moses (Musa)",
          story: `The story of Moses' (peace be upon him) journey to seek knowledge from Khidr is a school in humility and manners with Allah. Moses stood preaching to the Children of Israel and was asked: "Who is the most knowledgeable of people?" He said: "I am." Allah admonished him because he did not attribute knowledge to Him, and revealed to him that a servant of Ours at the junction of the two seas is more knowledgeable than you.

Moses, being the one who spoke to Allah (Kalimullah) and one of the Messengers of Strong Will (Ulu al-Azm), did not become arrogant. Instead, he set out on a difficult and long journey to learn. When he met Khidr, he asked for companionship with the manners of a student: "May I follow you on [the condition] that you teach me from what you have been taught of right guidance?"

The journey witnessed amazing events that appeared wrong on the surface but held mercy and wisdom within: damaging the ship to save it from a king's seizure, killing the boy to save his parents from tyranny, and building the wall to preserve the orphans' treasure.

The story teaches us that human knowledge, no matter how vast, is a drop in the ocean of Allah's knowledge. It teaches that Allah's decrees, which we may see as painful or incomprehensible, carry profound wisdom and hidden kindness, and that submission to Allah's command and wisdom is the essence of servitude.`,
          quranReference: "Moses said to him, 'May I follow you on [the condition] that you teach me from what you have been taught of right guidance?'",
          quranCitation: "Surah Al-Kahf: 66",
          source: "General Presidency",
          sourceUrl: "https://www.alifta.gov.sa"
        }
      }
    }
  }
];
