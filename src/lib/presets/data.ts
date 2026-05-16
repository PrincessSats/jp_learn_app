/* ─── Preset Data: JLPT + BJT Auto-Generated from JMDict Extended ───
 * 
 * Sources: JMDict Extended (vocab/kanji), handcrafted grammar, BJT keigo
 * Generated cards use real JLPT vocabulary with MCQ distractors.
 * Each preset mirrors real exam question formats.
 * ─── Cards: front=question/context, back=answer+explanation.
 */

import type { Card, Deck, TestType, PracticeMode } from "@/types";
import { initCardState } from "../fsrs";

// ─── Helpers ───

function uid(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

function makeCards(
  deckId: string,
  items: { front: string; back: string; tags: string[] }[],
): Card[] {
  const now = Date.now();
  return items.map((item, i) => ({
    id: uid(),
    deckId,
    front: item.front,
    back: item.back,
    tags: item.tags,
    ...initCardState(),
    due: now + i * 1000 * 60,
  }));
}

export interface PresetDeck {
  deck: Deck;
  cards: Card[];
}

// ═══════════════════════════════════════════
// N5・Vocabulary
// ═══════════════════════════════════════════

function n5_vocab(): PresetDeck {
  const id = "preset-n5-vocab";
  const deck: Deck = {
    id, name: "N5・Vocabulary", testType: "N5", practiceMode: "vocabulary", source: "preset",
    cardCount: 50, createdAt: Date.now(), description: "JLPT N5: Vocabulary multiple choice",
  };
  const cards = makeCards(id, [
    { front: "毎日\nまいにち\n\n意味は？\n① village\n② dark\n③ spare time\n④ every day", back: "④ every day\n毎日（まいにち）= every day", tags: ["N5", "vocab", "mcq"] },
    { front: "遠い\nとおい\n\n意味は？\n① far\n② hot (to the touch)\n③ to play (games, sports)\n④ cold (to the touch)", back: "① far\n遠い（とおい）= far", tags: ["N5", "vocab", "mcq"] },
    { front: "食べ物\nたべもの\n\n意味は？\n① to be shut\n② 9th day of the month\n③ food\n④ right", back: "③ food\n食べ物（たべもの）= food", tags: ["N5", "vocab", "mcq"] },
    { front: "店\nみせ\n\n意味は？\n① village\n② one\n③ store\n④ police officer", back: "③ store\n店（みせ）= store", tags: ["N5", "vocab", "mcq"] },
    { front: "赤い\nあかい\n\n意味は？\n① red\n② area\n③ below\n④ skillful", back: "① red\n赤い（あかい）= red", tags: ["N5", "vocab", "mcq"] },
    { front: "曇る\nくもる\n\n意味は？\n① umbrella\n② (wooden) pencil\n③ to get cloudy\n④ summer vacation", back: "③ to get cloudy\n曇る（くもる）= to get cloudy", tags: ["N5", "vocab", "mcq"] },
    { front: "帽子\nぼうし\n\n意味は？\n① crowd of people\n② doctor\n③ thin (of an object)\n④ hat", back: "④ hat\n帽子（ぼうし）= hat", tags: ["N5", "vocab", "mcq"] },
    { front: "夕方\nゆうがた\n\n意味は？\n① 10th day of the month\n② chicken meat\n③ every year\n④ early evening (usu. from 3pm to 6pm)", back: "④ early evening (usu. from 3pm to 6pm)\n夕方（ゆうがた）= early evening (usu. from 3pm to 6pm)", tags: ["N5", "vocab", "mcq"] },
    { front: "戸\nと\n\n意味は？\n① door (esp. Japanese-style)\n② photograph\n③ liking very much\n④ to go out (e.g. on an excursion or outing)", back: "① door (esp. Japanese-style)\n戸（と）= door (esp. Japanese-style)", tags: ["N5", "vocab", "mcq"] },
    { front: "家庭\nかてい\n\n意味は？\n① home\n② to come (spatially or temporally)\n③ thick\n④ car", back: "① home\n家庭（かてい）= home", tags: ["N5", "vocab", "mcq"] },
    { front: "使う\nつかう\n\n意味は？\n① year\n② painful\n③ myself\n④ to use (a tool, method, etc.)", back: "④ to use (a tool, method, etc.)\n使う（つかう）= to use (a tool, method, etc.)", tags: ["N5", "vocab", "mcq"] },
    { front: "木\nき\n\n意味は？\n① dirty\n② next week\n③ tree\n④ gate", back: "③ tree\n木（き）= tree", tags: ["N5", "vocab", "mcq"] },
    { front: "学生\nがくせい\n\n意味は？\n① dictionary\n② flower\n③ north\n④ student (esp. a university student)", back: "④ student (esp. a university student)\n学生（がくせい）= student (esp. a university student)", tags: ["N5", "vocab", "mcq"] },
    { front: "先週\nせんしゅう\n\n意味は？\n① to take off (clothes, shoes, etc.)\n② last week\n③ to lose (something)\n④ desk", back: "② last week\n先週（せんしゅう）= last week", tags: ["N5", "vocab", "mcq"] },
    { front: "並ぶ\nならぶ\n\n意味は？\n① song\n② to stop (moving)\n③ to line up\n④ noisy", back: "③ to line up\n並ぶ（ならぶ）= to line up", tags: ["N5", "vocab", "mcq"] },
    { front: "習う\nならう\n\n意味は？\n① near\n② to sing\n③ colour\n④ to take lessons in", back: "④ to take lessons in\n習う（ならう）= to take lessons in", tags: ["N5", "vocab", "mcq"] },
    { front: "木曜日\nもくようび\n\n意味は？\n① to raise\n② important\n③ Thursday\n④ 3rd day of the month", back: "③ Thursday\n木曜日（もくようび）= Thursday", tags: ["N5", "vocab", "mcq"] },
    { front: "右\nみぎ\n\n意味は？\n① pond\n② right\n③ to erase\n④ to ferry across (e.g. a river)", back: "② right\n右（みぎ）= right", tags: ["N5", "vocab", "mcq"] },
    { front: "果物\nくだもの\n\n意味は？\n① greengrocer\n② snow\n③ ear\n④ fruit", back: "④ fruit\n果物（くだもの）= fruit", tags: ["N5", "vocab", "mcq"] },
    { front: "秋\nあき\n\n意味は？\n① friend\n② 10,000\n③ to get up\n④ autumn", back: "④ autumn\n秋（あき）= autumn", tags: ["N5", "vocab", "mcq"] },
    { front: "重い\nおもい\n\n意味は？\n① to buy\n② weak\n③ heavy\n④ to cut", back: "③ heavy\n重い（おもい）= heavy", tags: ["N5", "vocab", "mcq"] },
    { front: "病院\nびょういん\n\n意味は？\n① hospital\n② to disappear\n③ (common) cold\n④ marriage", back: "① hospital\n病院（びょういん）= hospital", tags: ["N5", "vocab", "mcq"] },
    { front: "写真\nしゃしん\n\n意味は？\n① to use (a tool, method, etc.)\n② 3rd day of the month\n③ fruit\n④ photograph", back: "④ photograph\n写真（しゃしん）= photograph", tags: ["N5", "vocab", "mcq"] },
    { front: "少ない\nすくない\n\n意味は？\n① few\n② to lend\n③ hot (to the touch)\n④ Wednesday", back: "① few\n少ない（すくない）= few", tags: ["N5", "vocab", "mcq"] },
    { front: "時計\nとけい\n\n意味は？\n① back\n② clock\n③ hat\n④ newspaper", back: "② clock\n時計（とけい）= clock", tags: ["N5", "vocab", "mcq"] },
    { front: "夏休み\nなつやすみ\n\n意味は？\n① movie\n② brown\n③ summer vacation\n④ flower", back: "③ summer vacation\n夏休み（なつやすみ）= summer vacation", tags: ["N5", "vocab", "mcq"] },
    { front: "万\nまん\n\n意味は？\n① spring\n② 10,000\n③ bank\n④ black", back: "② 10,000\n万（まん）= 10,000", tags: ["N5", "vocab", "mcq"] },
    { front: "低い\nひくい\n\n意味は？\n① low (rank, degree, value, content, quality, etc.)\n② to open (a door, etc.)\n③ foot\n④ east", back: "① low (rank, degree, value, content, quality, etc.)\n低い（ひくい）= low (rank, degree, value, content, quality, etc.)", tags: ["N5", "vocab", "mcq"] },
    { front: "走る\nはしる\n\n意味は？\n① bicycle\n② to read\n③ to run\n④ to buy", back: "③ to run\n走る（はしる）= to run", tags: ["N5", "vocab", "mcq"] },
    { front: "夕飯\nゆうはん\n\n意味は？\n① evening meal\n② far\n③ dictionary\n④ every year", back: "① evening meal\n夕飯（ゆうはん）= evening meal", tags: ["N5", "vocab", "mcq"] },
    { front: "卵\nたまご\n\n意味は？\n① building\n② eggs\n③ disliking\n④ sky", back: "② eggs\n卵（たまご）= eggs", tags: ["N5", "vocab", "mcq"] },
    { front: "薄い\nうすい\n\n意味は？\n① cat (esp. the domestic cat, Felis catus)\n② business suit\n③ hot\n④ thin (of an object)", back: "④ thin (of an object)\n薄い（うすい）= thin (of an object)", tags: ["N5", "vocab", "mcq"] },
    { front: "男\nおとこ\n\n意味は？\n① to leave\n② man\n③ to open (a door, etc.)\n④ (public) park", back: "② man\n男（おとこ）= man", tags: ["N5", "vocab", "mcq"] },
    { front: "曇り\nくもり\n\n意味は？\n① flower\n② stamp (postage)\n③ one\n④ cloudiness", back: "④ cloudiness\n曇り（くもり）= cloudiness", tags: ["N5", "vocab", "mcq"] },
    { front: "咲く\nさく\n\n意味は？\n① birthday\n② to bloom\n③ heavy\n④ dark", back: "② to bloom\n咲く（さく）= to bloom", tags: ["N5", "vocab", "mcq"] },
    { front: "貸す\nかす\n\n意味は？\n① box\n② to lend\n③ coffee shop\n④ mouth", back: "② to lend\n貸す（かす）= to lend", tags: ["N5", "vocab", "mcq"] },
    { front: "先生\nせんせい\n\n意味は？\n① lukewarm\n② Wednesday\n③ to push\n④ teacher", back: "④ teacher\n先生（せんせい）= teacher", tags: ["N5", "vocab", "mcq"] },
    { front: "動物\nどうぶつ\n\n意味は？\n① animal\n② to polish\n③ bird\n④ stamp (postage)", back: "① animal\n動物（どうぶつ）= animal", tags: ["N5", "vocab", "mcq"] },
    { front: "料理\nりょうり\n\n意味は？\n① to sleep (lying down)\n② 20 years old\n③ morning\n④ cooking", back: "④ cooking\n料理（りょうり）= cooking", tags: ["N5", "vocab", "mcq"] },
    { front: "安い\nやすい\n\n意味は？\n① cheap\n② photograph\n③ student (esp. a university student)\n④ seven", back: "① cheap\n安い（やすい）= cheap", tags: ["N5", "vocab", "mcq"] },
    { front: "風邪\nかぜ\n\n意味は？\n① box\n② (common) cold\n③ family\n④ who", back: "② (common) cold\n風邪（かぜ）= (common) cold", tags: ["N5", "vocab", "mcq"] },
    { front: "鼻\nはな\n\n意味は？\n① convenient\n② fruit\n③ nose\n④ dirty", back: "③ nose\n鼻（はな）= nose", tags: ["N5", "vocab", "mcq"] },
    { front: "南\nみなみ\n\n意味は？\n① to open (e.g. doors)\n② who\n③ convenient\n④ south", back: "④ south\n南（みなみ）= south", tags: ["N5", "vocab", "mcq"] },
    { front: "鳥\nとり\n\n意味は？\n① food\n② bird\n③ this week\n④ to leave", back: "② bird\n鳥（とり）= bird", tags: ["N5", "vocab", "mcq"] },
    { front: "賑やか\nにぎやか\n\n意味は？\n① to be (of animate objects)\n② to wait\n③ bustling\n④ cold (e.g. weather)", back: "③ bustling\n賑やか（にぎやか）= bustling", tags: ["N5", "vocab", "mcq"] },
    { front: "駅\nえき\n\n意味は？\n① railway station\n② person\n③ coat\n④ car", back: "① railway station\n駅（えき）= railway station", tags: ["N5", "vocab", "mcq"] },
    { front: "鳴く\nなく\n\n意味は？\n① company\n② I\n③ unskillful\n④ to make sound (of an animal)", back: "④ to make sound (of an animal)\n鳴く（なく）= to make sound (of an animal)", tags: ["N5", "vocab", "mcq"] },
    { front: "五\nご\n\n意味は？\n① five\n② water (esp. cool or cold)\n③ cat (esp. the domestic cat, Felis catus)\n④ illness (usu. excluding minor ailments, e.g. common cold)", back: "① five\n五（ご）= five", tags: ["N5", "vocab", "mcq"] },
    { front: "水曜日\nすいようび\n\n意味は？\n① ashtray\n② heavy\n③ Wednesday\n④ west", back: "③ Wednesday\n水曜日（すいようび）= Wednesday", tags: ["N5", "vocab", "mcq"] },
    { front: "所\nところ\n\n意味は？\n① to take off (clothes, shoes, etc.)\n② place\n③ entrance\n④ friend", back: "② place\n所（ところ）= place", tags: ["N5", "vocab", "mcq"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N4・Vocabulary
// ═══════════════════════════════════════════

function n4_vocab(): PresetDeck {
  const id = "preset-n4-vocab";
  const deck: Deck = {
    id, name: "N4・Vocabulary", testType: "N4", practiceMode: "vocabulary", source: "preset",
    cardCount: 50, createdAt: Date.now(), description: "JLPT N4: Vocabulary multiple choice",
  };
  const cards = makeCards(id, [
    { front: "続ける\nつづける\n\n意味は？\n① to continue\n② not less than ...\n③ two-storied building\n④ finger", back: "① to continue\n続ける（つづける）= to continue", tags: ["N4", "vocab", "mcq"] },
    { front: "回る\nまわる\n\n意味は？\n① to turn\n② spirit\n③ to paint\n④ enjoyment", back: "① to turn\n回る（まわる）= to turn", tags: ["N4", "vocab", "mcq"] },
    { front: "細かい\nこまかい\n\n意味は？\n① small\n② to slide\n③ to compare\n④ condition", back: "① small\n細かい（こまかい）= small", tags: ["N4", "vocab", "mcq"] },
    { front: "見つける\nみつける\n\n意味は？\n① reservation\n② generally\n③ to find\n④ to hang up (e.g. a coat, a picture on the wall)", back: "③ to find\n見つける（みつける）= to find", tags: ["N4", "vocab", "mcq"] },
    { front: "進む\nすすむ\n\n意味は？\n① to shine\n② to advance\n③ beautiful\n④ to go to and from (a place)", back: "② to advance\n進む（すすむ）= to advance", tags: ["N4", "vocab", "mcq"] },
    { front: "血\nち\n\n意味は？\n① daughter\n② blood\n③ to dance (orig. a hopping dance)\n④ to be late", back: "② blood\n血（ち）= blood", tags: ["N4", "vocab", "mcq"] },
    { front: "点\nてん\n\n意味は？\n① rate\n② dot\n③ exhibition\n④ sad", back: "② dot\n点（てん）= dot", tags: ["N4", "vocab", "mcq"] },
    { front: "遠く\nとおく\n\n意味は？\n① far away\n② thief\n③ line\n④ complex", back: "① far away\n遠く（とおく）= far away", tags: ["N4", "vocab", "mcq"] },
    { front: "間\nあいだ\n\n意味は？\n① public employee\n② space (between)\n③ to copy\n④ back (of the body)", back: "② space (between)\n間（あいだ）= space (between)", tags: ["N4", "vocab", "mcq"] },
    { front: "理由\nりゆう\n\n意味は？\n① shallow\n② assembly hall\n③ to turn back (e.g. half-way)\n④ reason", back: "④ reason\n理由（りゆう）= reason", tags: ["N4", "vocab", "mcq"] },
    { front: "尋ねる\nたずねる\n\n意味は？\n① my dear\n② fire\n③ to ask\n④ selling area", back: "③ to ask\n尋ねる（たずねる）= to ask", tags: ["N4", "vocab", "mcq"] },
    { front: "変える\nかえる\n\n意味は？\n① auditorium\n② to help\n③ to continue\n④ to change", back: "④ to change\n変える（かえる）= to change", tags: ["N4", "vocab", "mcq"] },
    { front: "発音\nはつおん\n\n意味は？\n① pronunciation\n② newspaper company\n③ to shake\n④ review (of learned material)", back: "① pronunciation\n発音（はつおん）= pronunciation", tags: ["N4", "vocab", "mcq"] },
    { front: "喜ぶ\nよろこぶ\n\n意味は？\n① to be delighted\n② to increase\n③ (female) nurse\n④ to sound", back: "① to be delighted\n喜ぶ（よろこぶ）= to be delighted", tags: ["N4", "vocab", "mcq"] },
    { front: "教会\nきょうかい\n\n意味は？\n① church\n② baby\n③ driver\n④ to break", back: "① church\n教会（きょうかい）= church", tags: ["N4", "vocab", "mcq"] },
    { front: "移る\nうつる\n\n意味は？\n① end\n② to take (someone) with one\n③ to move (to another place or state)\n④ habit", back: "③ to move (to another place or state)\n移る（うつる）= to move (to another place or state)", tags: ["N4", "vocab", "mcq"] },
    { front: "音\nおと\n\n意味は？\n① branch\n② sound\n③ congratulation\n④ silk", back: "② sound\n音（おと）= sound", tags: ["N4", "vocab", "mcq"] },
    { front: "光\nひかり\n\n意味は？\n① to plant\n② light\n③ sand\n④ your house", back: "② light\n光（ひかり）= light", tags: ["N4", "vocab", "mcq"] },
    { front: "連絡\nれんらく\n\n意味は？\n① tender\n② church\n③ to put in order\n④ contacting", back: "④ contacting\n連絡（れんらく）= contacting", tags: ["N4", "vocab", "mcq"] },
    { front: "連れる\nつれる\n\n意味は？\n① to take (someone) with one\n② to die\n③ to grow cold\n④ kimono", back: "① to take (someone) with one\n連れる（つれる）= to take (someone) with one", tags: ["N4", "vocab", "mcq"] },
    { front: "謝る\nあやまる\n\n意味は？\n① to apologize (apologise)\n② to plant\n③ police\n④ circumstances", back: "① to apologize (apologise)\n謝る（あやまる）= to apologize (apologise)", tags: ["N4", "vocab", "mcq"] },
    { front: "噛む\nかむ\n\n意味は？\n① thread\n② fire\n③ to bite\n④ both", back: "③ to bite\n噛む（かむ）= to bite", tags: ["N4", "vocab", "mcq"] },
    { front: "通る\nとおる\n\n意味は？\n① to apologize (apologise)\n② to go by\n③ introduction\n④ to help", back: "② to go by\n通る（とおる）= to go by", tags: ["N4", "vocab", "mcq"] },
    { front: "比べる\nくらべる\n\n意味は？\n① match\n② to compare\n③ to notify\n④ attention", back: "② to compare\n比べる（くらべる）= to compare", tags: ["N4", "vocab", "mcq"] },
    { front: "指輪\nゆびわ\n\n意味は？\n① (finger) ring\n② novel\n③ to start\n④ to bite", back: "① (finger) ring\n指輪（ゆびわ）= (finger) ring", tags: ["N4", "vocab", "mcq"] },
    { front: "申す\nもうす\n\n意味は？\n① translation\n② feeling\n③ to say\n④ laboratory", back: "③ to say\n申す（もうす）= to say", tags: ["N4", "vocab", "mcq"] },
    { front: "僕\nぼく\n\n意味は？\n① pronunciation\n② I\n③ grandfather\n④ graduation", back: "② I\n僕（ぼく）= I", tags: ["N4", "vocab", "mcq"] },
    { front: "字\nじ\n\n意味は？\n① character (esp. kanji)\n② hobby\n③ to receive\n④ to get dirty", back: "① character (esp. kanji)\n字（じ）= character (esp. kanji)", tags: ["N4", "vocab", "mcq"] },
    { front: "非常に\nひじょうに\n\n意味は？\n① the old days\n② underwear\n③ very\n④ plans", back: "③ very\n非常に（ひじょうに）= very", tags: ["N4", "vocab", "mcq"] },
    { front: "驚く\nおどろく\n\n意味は？\n① harbour\n② rare\n③ to be surprised\n④ to step on", back: "③ to be surprised\n驚く（おどろく）= to be surprised", tags: ["N4", "vocab", "mcq"] },
    { front: "米\nこめ\n\n意味は？\n① to go to and from (a place)\n② novel\n③ (husked grains of) rice\n④ space (between)", back: "③ (husked grains of) rice\n米（こめ）= (husked grains of) rice", tags: ["N4", "vocab", "mcq"] },
    { front: "始める\nはじめる\n\n意味は？\n① deep\n② to start\n③ forest\n④ to pull out", back: "② to start\n始める（はじめる）= to start", tags: ["N4", "vocab", "mcq"] },
    { front: "付く\nつく\n\n意味は？\n① to part (usu. of people)\n② dot\n③ to be attached\n④ senior (at school, work, etc.)", back: "③ to be attached\n付く（つく）= to be attached", tags: ["N4", "vocab", "mcq"] },
    { front: "拾う\nひろう\n\n意味は？\n① to pick up\n② airport\n③ to slide\n④ to hang up (e.g. a coat, a picture on the wall)", back: "① to pick up\n拾う（ひろう）= to pick up", tags: ["N4", "vocab", "mcq"] },
    { front: "忘れ物\nわすれもの\n\n意味は？\n① lost article\n② to steal\n③ to apologize (apologise)\n④ to turn", back: "① lost article\n忘れ物（わすれもの）= lost article", tags: ["N4", "vocab", "mcq"] },
    { front: "寺\nてら\n\n意味は？\n① hurrying (to somewhere)\n② scenery\n③ newspaper company\n④ temple (Buddhist)", back: "④ temple (Buddhist)\n寺（てら）= temple (Buddhist)", tags: ["N4", "vocab", "mcq"] },
    { front: "釣る\nつる\n\n意味は？\n① danger\n② to fish\n③ article\n④ plans", back: "② to fish\n釣る（つる）= to fish", tags: ["N4", "vocab", "mcq"] },
    { front: "知らせる\nしらせる\n\n意味は？\n① to notify\n② review (of learned material)\n③ science\n④ thread", back: "① to notify\n知らせる（しらせる）= to notify", tags: ["N4", "vocab", "mcq"] },
    { front: "妻\nつま\n\n意味は？\n① to pay (e.g. money, bill)\n② (my) wife\n③ church\n④ my dear", back: "④ my dear\n妻（つま）= my dear", tags: ["N4", "vocab", "mcq"] },
    { front: "最初\nさいしょ\n\n意味は？\n① to step on\n② beginning\n③ your husband\n④ opinion", back: "② beginning\n最初（さいしょ）= beginning", tags: ["N4", "vocab", "mcq"] },
    { front: "毛\nけ\n\n意味は？\n① senior high school\n② seashore\n③ case\n④ hair", back: "④ hair\n毛（け）= hair", tags: ["N4", "vocab", "mcq"] },
    { front: "味噌\nみそ\n\n意味は？\n① miso\n② deep\n③ to transfer (trains)\n④ opposite side", back: "① miso\n味噌（みそ）= miso", tags: ["N4", "vocab", "mcq"] },
    { front: "紹介\nしょうかい\n\n意味は？\n① to lose\n② introduction\n③ lecture\n④ to bite", back: "② introduction\n紹介（しょうかい）= introduction", tags: ["N4", "vocab", "mcq"] },
    { front: "糸\nいと\n\n意味は？\n① thread\n② play\n③ this time\n④ on the way", back: "① thread\n糸（いと）= thread", tags: ["N4", "vocab", "mcq"] },
    { front: "特急\nとっきゅう\n\n意味は？\n① limited express (train for which a limited-express ticket is required)\n② conference room\n③ opposition\n④ to put on weight", back: "① limited express (train for which a limited-express ticket is required)\n特急（とっきゅう）= limited express (train for which a limited-express ticket is required)", tags: ["N4", "vocab", "mcq"] },
    { front: "空気\nくうき\n\n意味は？\n① far away\n② this evening\n③ senior high school student\n④ air", back: "④ air\n空気（くうき）= air", tags: ["N4", "vocab", "mcq"] },
    { front: "中々\nなかなか\n\n意味は？\n① always\n② to choose\n③ very\n④ to lose", back: "③ very\n中々（なかなか）= very", tags: ["N4", "vocab", "mcq"] },
    { front: "生活\nせいかつ\n\n意味は？\n① chance\n② life\n③ man\n④ return", back: "② life\n生活（せいかつ）= life", tags: ["N4", "vocab", "mcq"] },
    { front: "光る\nひかる\n\n意味は？\n① beginning\n② grass\n③ to shine\n④ fire", back: "③ to shine\n光る（ひかる）= to shine", tags: ["N4", "vocab", "mcq"] },
    { front: "お祝い\nおいわい\n\n意味は？\n① air conditioning\n② to change\n③ to cry\n④ congratulation", back: "④ congratulation\nお祝い（おいわい）= congratulation", tags: ["N4", "vocab", "mcq"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N3・Vocabulary
// ═══════════════════════════════════════════

function n3_vocab(): PresetDeck {
  const id = "preset-n3-vocab";
  const deck: Deck = {
    id, name: "N3・Vocabulary", testType: "N3", practiceMode: "vocabulary", source: "preset",
    cardCount: 60, createdAt: Date.now(), description: "JLPT N3: Vocabulary multiple choice",
  };
  const cards = makeCards(id, [
    { front: "迷子\nまいご\n\n意味は？\n① trace\n② lost child\n③ permission\n④ handle", back: "② lost child\n迷子（まいご）= lost child", tags: ["N3", "vocab", "mcq"] },
    { front: "人間\nにんげん\n\n意味は？\n① coincidence\n② really\n③ intelligence\n④ human being", back: "④ human being\n人間（にんげん）= human being", tags: ["N3", "vocab", "mcq"] },
    { front: "攻撃\nこうげき\n\n意味は？\n① pipe\n② storm\n③ blanket\n④ attack", back: "④ attack\n攻撃（こうげき）= attack", tags: ["N3", "vocab", "mcq"] },
    { front: "硬い\nかたい\n\n意味は？\n① railroad\n② hard\n③ food (esp. staple food such as rice or wheat)\n④ to respond", back: "② hard\n硬い（かたい）= hard", tags: ["N3", "vocab", "mcq"] },
    { front: "黙る\nだまる\n\n意味は？\n① to be silent\n② opponent\n③ to receive\n④ delivery", back: "① to be silent\n黙る（だまる）= to be silent", tags: ["N3", "vocab", "mcq"] },
    { front: "克服\nこくふく\n\n意味は？\n① conquest (of a difficulty, illness, crisis, etc.)\n② (natural) satellite\n③ organization\n④ long-term", back: "① conquest (of a difficulty, illness, crisis, etc.)\n克服（こくふく）= conquest (of a difficulty, illness, crisis, etc.)", tags: ["N3", "vocab", "mcq"] },
    { front: "年齢\nねんれい\n\n意味は？\n① to fear\n② each (person)\n③ age\n④ cash", back: "③ age\n年齢（ねんれい）= age", tags: ["N3", "vocab", "mcq"] },
    { front: "食料\nしょくりょう\n\n意味は？\n① robber\n② (animal) feed\n③ food\n④ study of foreign languages", back: "③ food\n食料（しょくりょう）= food", tags: ["N3", "vocab", "mcq"] },
    { front: "消防\nしょうぼう\n\n意味は？\n① cooked rice\n② fire fighting\n③ wheat\n④ readiness", back: "② fire fighting\n消防（しょうぼう）= fire fighting", tags: ["N3", "vocab", "mcq"] },
    { front: "増す\nます\n\n意味は？\n① scholarship\n② to increase\n③ emotion\n④ meeting", back: "② to increase\n増す（ます）= to increase", tags: ["N3", "vocab", "mcq"] },
    { front: "合格\nごうかく\n\n意味は？\n① emotion\n② passing (an exam)\n③ four\n④ feature", back: "② passing (an exam)\n合格（ごうかく）= passing (an exam)", tags: ["N3", "vocab", "mcq"] },
    { front: "生地\nきじ\n\n意味は？\n① cloth\n② respect\n③ down-train\n④ maintenance", back: "① cloth\n生地（きじ）= cloth", tags: ["N3", "vocab", "mcq"] },
    { front: "離婚\nりこん\n\n意味は？\n① state (of affairs)\n② dining table\n③ to cut (grass, hair, etc.)\n④ divorce", back: "④ divorce\n離婚（りこん）= divorce", tags: ["N3", "vocab", "mcq"] },
    { front: "信頼\nしんらい\n\n意味は？\n① satisfaction\n② determination\n③ to shine\n④ trust (in)", back: "④ trust (in)\n信頼（しんらい）= trust (in)", tags: ["N3", "vocab", "mcq"] },
    { front: "流れる\nながれる\n\n意味は？\n① to occupy\n② trade\n③ opposition\n④ to stream", back: "④ to stream\n流れる（ながれる）= to stream", tags: ["N3", "vocab", "mcq"] },
    { front: "事務\nじむ\n\n意味は？\n① serious\n② office work\n③ several\n④ blackboard", back: "② office work\n事務（じむ）= office work", tags: ["N3", "vocab", "mcq"] },
    { front: "異常\nいじょう\n\n意味は？\n① abnormal\n② facial expression\n③ to leave (a matter, decision, etc. to someone)\n④ annotation", back: "① abnormal\n異常（いじょう）= abnormal", tags: ["N3", "vocab", "mcq"] },
    { front: "吐く\nはく\n\n意味は？\n① to vomit\n② valley\n③ association\n④ attire", back: "① to vomit\n吐く（はく）= to vomit", tags: ["N3", "vocab", "mcq"] },
    { front: "機械\nきかい\n\n意味は？\n① careful\n② time\n③ machine\n④ representation", back: "③ machine\n機械（きかい）= machine", tags: ["N3", "vocab", "mcq"] },
    { front: "次々\nつぎつぎ\n\n意味は？\n① (East Asian) rainy season (in Japan, usu. from early June to mid-July)\n② in succession\n③ to struggle in the water\n④ import", back: "② in succession\n次々（つぎつぎ）= in succession", tags: ["N3", "vocab", "mcq"] },
    { front: "梅\nうめ\n\n意味は？\n① face\n② Japanese apricot (Prunus mume)\n③ other (esp. people and abstract matters)\n④ Monday", back: "② Japanese apricot (Prunus mume)\n梅（うめ）= Japanese apricot (Prunus mume)", tags: ["N3", "vocab", "mcq"] },
    { front: "鋭い\nするどい\n\n意味は？\n① operation\n② friend\n③ sharp (knife, claws, etc.)\n④ weapon", back: "③ sharp (knife, claws, etc.)\n鋭い（するどい）= sharp (knife, claws, etc.)", tags: ["N3", "vocab", "mcq"] },
    { front: "発明\nはつめい\n\n意味は？\n① coworker\n② invention\n③ most part\n④ expenditure", back: "② invention\n発明（はつめい）= invention", tags: ["N3", "vocab", "mcq"] },
    { front: "交換\nこうかん\n\n意味は？\n① speed\n② to awaken\n③ continuation\n④ exchange", back: "④ exchange\n交換（こうかん）= exchange", tags: ["N3", "vocab", "mcq"] },
    { front: "場\nば\n\n意味は？\n① (air) temperature\n② place\n③ passing (an exam)\n④ individual", back: "② place\n場（ば）= place", tags: ["N3", "vocab", "mcq"] },
    { front: "行動\nこうどう\n\n意味は？\n① action\n② lateness\n③ pole\n④ member of an assembly", back: "① action\n行動（こうどう）= action", tags: ["N3", "vocab", "mcq"] },
    { front: "代理\nだいり\n\n意味は？\n① representation\n② companion\n③ since\n④ bank", back: "① representation\n代理（だいり）= representation", tags: ["N3", "vocab", "mcq"] },
    { front: "連想\nれんそう\n\n意味は？\n① amount of money\n② association (of ideas)\n③ to get drunk\n④ effort", back: "② association (of ideas)\n連想（れんそう）= association (of ideas)", tags: ["N3", "vocab", "mcq"] },
    { front: "印\nしるし\n\n意味は？\n① intelligence\n② printing\n③ reserve\n④ mark", back: "④ mark\n印（しるし）= mark", tags: ["N3", "vocab", "mcq"] },
    { front: "虎\nとら\n\n意味は？\n① health\n② conflagration\n③ bundle\n④ tiger (Panthera tigris)", back: "④ tiger (Panthera tigris)\n虎（とら）= tiger (Panthera tigris)", tags: ["N3", "vocab", "mcq"] },
    { front: "自然\nしぜん\n\n意味は？\n① mainly\n② exercise\n③ junior high school\n④ nature", back: "④ nature\n自然（しぜん）= nature", tags: ["N3", "vocab", "mcq"] },
    { front: "何とか\nなんとか\n\n意味は？\n① denial\n② today\n③ order (for an item)\n④ something", back: "④ something\n何とか（なんとか）= something", tags: ["N3", "vocab", "mcq"] },
    { front: "哀れ\nあわれ\n\n意味は？\n① pride (in one's achievements, possessions, etc.)\n② pity\n③ pollution\n④ happiness", back: "② pity\n哀れ（あわれ）= pity", tags: ["N3", "vocab", "mcq"] },
    { front: "世の中\nよのなか\n\n意味は？\n① society\n② thanks\n③ emptiness\n④ thanks", back: "① society\n世の中（よのなか）= society", tags: ["N3", "vocab", "mcq"] },
    { front: "発車\nはっしゃ\n\n意味は？\n① continuation\n② nutrition\n③ departure (of a train, car, etc.)\n④ worry", back: "③ departure (of a train, car, etc.)\n発車（はっしゃ）= departure (of a train, car, etc.)", tags: ["N3", "vocab", "mcq"] },
    { front: "硬貨\nこうか\n\n意味は？\n① coin\n② body temperature\n③ lunch\n④ rarely", back: "① coin\n硬貨（こうか）= coin", tags: ["N3", "vocab", "mcq"] },
    { front: "眺める\nながめる\n\n意味は？\n① week\n② present condition\n③ legume (esp. edible legumes or their seeds, e.g. beans, peas, pulses)\n④ to look at", back: "④ to look at\n眺める（ながめる）= to look at", tags: ["N3", "vocab", "mcq"] },
    { front: "正午\nしょうご\n\n意味は？\n① noon\n② relative\n③ sphere\n④ nodding off (while sitting)", back: "① noon\n正午（しょうご）= noon", tags: ["N3", "vocab", "mcq"] },
    { front: "使用\nしよう\n\n意味は？\n① dispute\n② extent\n③ construction\n④ use", back: "④ use\n使用（しよう）= use", tags: ["N3", "vocab", "mcq"] },
    { front: "何\nなん\n\n意味は？\n① (place) near by\n② what\n③ to want\n④ scholar", back: "② what\n何（なん）= what", tags: ["N3", "vocab", "mcq"] },
    { front: "欠陥\nけっかん\n\n意味は？\n① start\n② defect\n③ rice field\n④ to let pass", back: "② defect\n欠陥（けっかん）= defect", tags: ["N3", "vocab", "mcq"] },
    { front: "後\nのち\n\n意味は？\n① later\n② quite\n③ verb\n④ accounting", back: "① later\n後（のち）= later", tags: ["N3", "vocab", "mcq"] },
    { front: "注ぐ\nそそぐ\n\n意味は？\n① expectation\n② information\n③ to pour (into)\n④ to put (into)", back: "③ to pour (into)\n注ぐ（そそぐ）= to pour (into)", tags: ["N3", "vocab", "mcq"] },
    { front: "有利\nゆうり\n\n意味は？\n① to defend against\n② advantageous\n③ state\n④ (one's) self", back: "② advantageous\n有利（ゆうり）= advantageous", tags: ["N3", "vocab", "mcq"] },
    { front: "確認\nかくにん\n\n意味は？\n① birth (of a person)\n② tower\n③ care\n④ confirmation", back: "④ confirmation\n確認（かくにん）= confirmation", tags: ["N3", "vocab", "mcq"] },
    { front: "太陽\nたいよう\n\n意味は？\n① gradually\n② facing\n③ to hit (someone)\n④ Sun", back: "④ Sun\n太陽（たいよう）= Sun", tags: ["N3", "vocab", "mcq"] },
    { front: "瞬間\nしゅんかん\n\n意味は？\n① silver (Ag)\n② moment\n③ to want\n④ calculation", back: "② moment\n瞬間（しゅんかん）= moment", tags: ["N3", "vocab", "mcq"] },
    { front: "印刷\nいんさつ\n\n意味は？\n① cotton\n② printing\n③ appearing ...\n④ to be hit", back: "② printing\n印刷（いんさつ）= printing", tags: ["N3", "vocab", "mcq"] },
    { front: "経つ\nたつ\n\n意味は？\n① to pass (of time)\n② memory\n③ manufactured goods\n④ party (political)", back: "① to pass (of time)\n経つ（たつ）= to pass (of time)", tags: ["N3", "vocab", "mcq"] },
    { front: "得る\nうる\n\n意味は？\n① armed forces\n② hometown\n③ rotation\n④ to be able to ...", back: "④ to be able to ...\n得る（うる）= to be able to ...", tags: ["N3", "vocab", "mcq"] },
    { front: "墓\nはか\n\n意味は？\n① continuation\n② in succession\n③ grave\n④ good luck", back: "③ grave\n墓（はか）= grave", tags: ["N3", "vocab", "mcq"] },
    { front: "経験\nけいけん\n\n意味は？\n① Tuesday\n② name\n③ opinion\n④ experience", back: "④ experience\n経験（けいけん）= experience", tags: ["N3", "vocab", "mcq"] },
    { front: "国民\nこくみん\n\n意味は？\n① people (of a country)\n② advantageous\n③ overall victory\n④ material", back: "① people (of a country)\n国民（こくみん）= people (of a country)", tags: ["N3", "vocab", "mcq"] },
    { front: "凍る\nこおる\n\n意味は？\n① to freeze\n② safe\n③ announcement\n④ the person in question", back: "① to freeze\n凍る（こおる）= to freeze", tags: ["N3", "vocab", "mcq"] },
    { front: "式\nしき\n\n意味は？\n① lodging\n② way\n③ to point\n④ to produce", back: "② way\n式（しき）= way", tags: ["N3", "vocab", "mcq"] },
    { front: "心臓\nしんぞう\n\n意味は？\n① heart\n② notice\n③ demand\n④ to cross (e.g. road)", back: "① heart\n心臓（しんぞう）= heart", tags: ["N3", "vocab", "mcq"] },
    { front: "防ぐ\nふせぐ\n\n意味は？\n① close friend\n② thing\n③ night\n④ to defend against", back: "④ to defend against\n防ぐ（ふせぐ）= to defend against", tags: ["N3", "vocab", "mcq"] },
    { front: "植物\nしょくぶつ\n\n意味は？\n① basics\n② plant\n③ intention\n④ expansion", back: "② plant\n植物（しょくぶつ）= plant", tags: ["N3", "vocab", "mcq"] },
    { front: "濃い\nこい\n\n意味は？\n① banknote\n② to chip\n③ advance\n④ deep (colour)", back: "④ deep (colour)\n濃い（こい）= deep (colour)", tags: ["N3", "vocab", "mcq"] },
    { front: "骨\nほね\n\n意味は？\n① to be able to ...\n② to shout\n③ bone\n④ tropics", back: "③ bone\n骨（ほね）= bone", tags: ["N3", "vocab", "mcq"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N2・Vocabulary
// ═══════════════════════════════════════════

function n2_vocab(): PresetDeck {
  const id = "preset-n2-vocab";
  const deck: Deck = {
    id, name: "N2・Vocabulary", testType: "N2", practiceMode: "vocabulary", source: "preset",
    cardCount: 60, createdAt: Date.now(), description: "JLPT N2: Vocabulary multiple choice",
  };
  const cards = makeCards(id, [
    { front: "編集\nへんしゅう\n\n意味は？\n① first 10 days of the month\n② editing\n③ terminus\n④ attraction (e.g. magnetic, gravitation)", back: "② editing\n編集（へんしゅう）= editing", tags: ["N2", "vocab", "mcq"] },
    { front: "月日\nつきひ\n\n意味は？\n① school building\n② place name\n③ time\n④ pepper", back: "③ time\n月日（つきひ）= time", tags: ["N2", "vocab", "mcq"] },
    { front: "郡\nぐん\n\n意味は？\n① rice planting\n② to be crushed\n③ to detain\n④ district", back: "④ district\n郡（ぐん）= district", tags: ["N2", "vocab", "mcq"] },
    { front: "人通り\nひとどおり\n\n意味は？\n① pedestrian traffic\n② fall\n③ to know\n④ to tear", back: "① pedestrian traffic\n人通り（ひとどおり）= pedestrian traffic", tags: ["N2", "vocab", "mcq"] },
    { front: "免税\nめんぜい\n\n意味は？\n① tax exemption\n② wife (esp. one's own wife)\n③ title\n④ use", back: "① tax exemption\n免税（めんぜい）= tax exemption", tags: ["N2", "vocab", "mcq"] },
    { front: "給与\nきゅうよ\n\n意味は？\n① to be unable to\n② literature\n③ pay\n④ slanting", back: "③ pay\n給与（きゅうよ）= pay", tags: ["N2", "vocab", "mcq"] },
    { front: "都心\nとしん\n\n意味は？\n① in order\n② city centre (esp. of Tokyo)\n③ wool\n④ calligraphy (esp. Asian calligraphy based on Chinese characters)", back: "② city centre (esp. of Tokyo)\n都心（としん）= city centre (esp. of Tokyo)", tags: ["N2", "vocab", "mcq"] },
    { front: "灯台\nとうだい\n\n意味は？\n① tax exemption\n② very\n③ lighthouse\n④ inverted", back: "③ lighthouse\n灯台（とうだい）= lighthouse", tags: ["N2", "vocab", "mcq"] },
    { front: "日時\nにちじ\n\n意味は？\n① date and time (of a meeting, departure, etc.)\n② standard\n③ city centre (esp. of Tokyo)\n④ faucet", back: "① date and time (of a meeting, departure, etc.)\n日時（にちじ）= date and time (of a meeting, departure, etc.)", tags: ["N2", "vocab", "mcq"] },
    { front: "夜間\nやかん\n\n意味は？\n① official business\n② night\n③ sunset\n④ king", back: "② night\n夜間（やかん）= night", tags: ["N2", "vocab", "mcq"] },
    { front: "撫でる\nなでる\n\n意味は？\n① necessities\n② joke\n③ to stroke\n④ to collect", back: "③ to stroke\n撫でる（なでる）= to stroke", tags: ["N2", "vocab", "mcq"] },
    { front: "夕立\nゆうだち\n\n意味は？\n① katakana\n② (sudden, heavy) shower (on a summer afternoon or evening)\n③ backdoor\n④ Kansai (region comprising Kyoto, Osaka, Kobe and surrounding prefectures)", back: "② (sudden, heavy) shower (on a summer afternoon or evening)\n夕立（ゆうだち）= (sudden, heavy) shower (on a summer afternoon or evening)", tags: ["N2", "vocab", "mcq"] },
    { front: "薬指\nくすりゆび\n\n意味は？\n① angle\n② attraction (e.g. magnetic, gravitation)\n③ ring finger\n④ suspension of business", back: "③ ring finger\n薬指（くすりゆび）= ring finger", tags: ["N2", "vocab", "mcq"] },
    { front: "脱線\nだっせん\n\n意味は？\n① derailment\n② upper level\n③ terminus\n④ disappointed love", back: "① derailment\n脱線（だっせん）= derailment", tags: ["N2", "vocab", "mcq"] },
    { front: "直線\nちょくせん\n\n意味は？\n① straight line\n② interview (e.g. for a job)\n③ fraction\n④ first third of a month", back: "① straight line\n直線（ちょくせん）= straight line", tags: ["N2", "vocab", "mcq"] },
    { front: "公務\nこうむ\n\n意味は？\n① geta\n② deep emotion\n③ release\n④ official business", back: "④ official business\n公務（こうむ）= official business", tags: ["N2", "vocab", "mcq"] },
    { front: "整う\nととのう\n\n意味は？\n① to sit (down)\n② procedure\n③ amount sold\n④ to be ready", back: "④ to be ready\n整う（ととのう）= to be ready", tags: ["N2", "vocab", "mcq"] },
    { front: "地点\nちてん\n\n意味は？\n① to feel around for\n② wastepaper\n③ God\n④ spot", back: "④ spot\n地点（ちてん）= spot", tags: ["N2", "vocab", "mcq"] },
    { front: "紙幣\nしへい\n\n意味は？\n① to begin to say\n② government office\n③ plain\n④ paper money", back: "④ paper money\n紙幣（しへい）= paper money", tags: ["N2", "vocab", "mcq"] },
    { front: "広さ\nひろさ\n\n意味は？\n① calligraphy (esp. Asian calligraphy based on Chinese characters)\n② vertex\n③ area\n④ disassembly", back: "③ area\n広さ（ひろさ）= area", tags: ["N2", "vocab", "mcq"] },
    { front: "不規則\nふきそく\n\n意味は？\n① to spread\n② irregular\n③ section (e.g. in a newspaper)\n④ adjustment", back: "② irregular\n不規則（ふきそく）= irregular", tags: ["N2", "vocab", "mcq"] },
    { front: "匙\nさじ\n\n意味は？\n① victory or defeat\n② junior (at work, school, etc.)\n③ mochi\n④ spoon", back: "④ spoon\n匙（さじ）= spoon", tags: ["N2", "vocab", "mcq"] },
    { front: "鳴らす\nならす\n\n意味は？\n① contradiction\n② to ring\n③ to insert\n④ neighborhood", back: "② to ring\n鳴らす（ならす）= to ring", tags: ["N2", "vocab", "mcq"] },
    { front: "持参\nじさん\n\n意味は？\n① to wipe\n② bringing\n③ to rust\n④ self-government", back: "② bringing\n持参（じさん）= bringing", tags: ["N2", "vocab", "mcq"] },
    { front: "指定\nしてい\n\n意味は？\n① clear weather\n② designation\n③ (in) the air\n④ (the) whole", back: "② designation\n指定（してい）= designation", tags: ["N2", "vocab", "mcq"] },
    { front: "生意気\nなまいき\n\n意味は？\n① to step aside\n② contents\n③ impertinent\n④ appreciation (of art, music, poetry, etc.)", back: "③ impertinent\n生意気（なまいき）= impertinent", tags: ["N2", "vocab", "mcq"] },
    { front: "蹴る\nける\n\n意味は？\n① to kick\n② assistant professor\n③ area\n④ outdoors", back: "① to kick\n蹴る（ける）= to kick", tags: ["N2", "vocab", "mcq"] },
    { front: "足る\nたる\n\n意味は？\n① to be sufficient\n② equator\n③ sashimi (raw sliced fish, shellfish or crustaceans)\n④ raw materials", back: "① to be sufficient\n足る（たる）= to be sufficient", tags: ["N2", "vocab", "mcq"] },
    { front: "湿る\nしめる\n\n意味は？\n① rationality\n② revision\n③ to become damp\n④ surface mail (by ship)", back: "③ to become damp\n湿る（しめる）= to become damp", tags: ["N2", "vocab", "mcq"] },
    { front: "洗剤\nせんざい\n\n意味は？\n① archipelago\n② subject\n③ kettle\n④ detergent", back: "④ detergent\n洗剤（せんざい）= detergent", tags: ["N2", "vocab", "mcq"] },
    { front: "割と\nわりと\n\n意味は？\n① cleaning\n② rice field\n③ humid\n④ comparatively", back: "④ comparatively\n割と（わりと）= comparatively", tags: ["N2", "vocab", "mcq"] },
    { front: "重ねる\nかさねる\n\n意味は？\n① each\n② to pile up\n③ rope\n④ easy", back: "② to pile up\n重ねる（かさねる）= to pile up", tags: ["N2", "vocab", "mcq"] },
    { front: "一旦\nいったん\n\n意味は？\n① paste\n② once\n③ famous place\n④ to collapse", back: "② once\n一旦（いったん）= once", tags: ["N2", "vocab", "mcq"] },
    { front: "分解\nぶんかい\n\n意味は？\n① statistics\n② to collect\n③ special\n④ disassembly", back: "④ disassembly\n分解（ぶんかい）= disassembly", tags: ["N2", "vocab", "mcq"] },
    { front: "行列\nぎょうれつ\n\n意味は？\n① to write\n② end (of a street, hallway, etc.)\n③ prevention of crime\n④ line", back: "④ line\n行列（ぎょうれつ）= line", tags: ["N2", "vocab", "mcq"] },
    { front: "氏名\nしめい\n\n意味は？\n① (full) name\n② bowl (ceramic, porcelain)\n③ being comfortable\n④ to become damp", back: "① (full) name\n氏名（しめい）= (full) name", tags: ["N2", "vocab", "mcq"] },
    { front: "恋しい\nこいしい\n\n意味は？\n① immediately following\n② nutrient\n③ assistant professor\n④ yearned for", back: "④ yearned for\n恋しい（こいしい）= yearned for", tags: ["N2", "vocab", "mcq"] },
    { front: "掻く\nかく\n\n意味は？\n① (short) rest\n② to scratch\n③ friend\n④ fictitious", back: "② to scratch\n掻く（かく）= to scratch", tags: ["N2", "vocab", "mcq"] },
    { front: "肌着\nはだぎ\n\n意味は？\n① underwear\n② neighborhood\n③ altitude\n④ to cook (grains, e.g. rice)", back: "① underwear\n肌着（はだぎ）= underwear", tags: ["N2", "vocab", "mcq"] },
    { front: "性能\nせいのう\n\n意味は？\n① elementary level\n② standard\n③ neutrality (incl. chemical, electrical, etc.)\n④ ability", back: "④ ability\n性能（せいのう）= ability", tags: ["N2", "vocab", "mcq"] },
    { front: "雑巾\nぞうきん\n\n意味は？\n① house-cloth\n② to deep-fry\n③ to meet\n④ excess", back: "① house-cloth\n雑巾（ぞうきん）= house-cloth", tags: ["N2", "vocab", "mcq"] },
    { front: "恵まれる\nめぐまれる\n\n意味は？\n① policy\n② to branch\n③ principle\n④ to be blessed with", back: "④ to be blessed with\n恵まれる（めぐまれる）= to be blessed with", tags: ["N2", "vocab", "mcq"] },
    { front: "楕円\nだえん\n\n意味は？\n① ability\n② ellipse\n③ to answer\n④ on the contrary", back: "② ellipse\n楕円（だえん）= ellipse", tags: ["N2", "vocab", "mcq"] },
    { front: "鉄砲\nてっぽう\n\n意味は？\n① gun\n② closure (of a ceremony, event, meeting, etc.)\n③ burn\n④ to resound", back: "① gun\n鉄砲（てっぽう）= gun", tags: ["N2", "vocab", "mcq"] },
    { front: "引き返す\nひきかえす\n\n意味は？\n① here and there\n② postage\n③ closure (of a ceremony, event, meeting, etc.)\n④ to turn back", back: "④ to turn back\n引き返す（ひきかえす）= to turn back", tags: ["N2", "vocab", "mcq"] },
    { front: "中途\nちゅうと\n\n意味は？\n① halfway\n② figure\n③ application\n④ heating", back: "① halfway\n中途（ちゅうと）= halfway", tags: ["N2", "vocab", "mcq"] },
    { front: "散らかる\nちらかる\n\n意味は？\n① to long for\n② predicate\n③ rare\n④ to be in disorder", back: "④ to be in disorder\n散らかる（ちらかる）= to be in disorder", tags: ["N2", "vocab", "mcq"] },
    { front: "育児\nいくじ\n\n意味は？\n① size\n② childcare\n③ to write\n④ to bury (e.g. in the ground)", back: "② childcare\n育児（いくじ）= childcare", tags: ["N2", "vocab", "mcq"] },
    { front: "大層\nたいそう\n\n意味は？\n① connection\n② special\n③ very\n④ to cool down", back: "③ very\n大層（たいそう）= very", tags: ["N2", "vocab", "mcq"] },
    { front: "付近\nふきん\n\n意味は？\n① neighborhood\n② cape (on coast)\n③ internal medicine\n④ to put something out of the way", back: "① neighborhood\n付近（ふきん）= neighborhood", tags: ["N2", "vocab", "mcq"] },
    { front: "過剰\nかじょう\n\n意味は？\n① subtraction\n② excess\n③ to cool\n④ foundation", back: "② excess\n過剰（かじょう）= excess", tags: ["N2", "vocab", "mcq"] },
    { front: "正方形\nせいほうけい\n\n意味は？\n① farewell\n② to bury (e.g. in the ground)\n③ to cool (e.g. from a high temperature to room temperature)\n④ square", back: "④ square\n正方形（せいほうけい）= square", tags: ["N2", "vocab", "mcq"] },
    { front: "潰す\nつぶす\n\n意味は？\n① to smash\n② suspension of business\n③ rough\n④ to touch", back: "① to smash\n潰す（つぶす）= to smash", tags: ["N2", "vocab", "mcq"] },
    { front: "長所\nちょうしょ\n\n意味は？\n① to scatter\n② assumption (of office)\n③ lost property\n④ strong point", back: "④ strong point\n長所（ちょうしょ）= strong point", tags: ["N2", "vocab", "mcq"] },
    { front: "別々\nべつべつ\n\n意味は？\n① practice (in the field)\n② separate\n③ answer\n④ sashimi (raw sliced fish, shellfish or crustaceans)", back: "② separate\n別々（べつべつ）= separate", tags: ["N2", "vocab", "mcq"] },
    { front: "佚\nいつ\n\n意味は？\n① neutrality (incl. chemical, electrical, etc.)\n② vertex\n③ being comfortable\n④ consul", back: "③ being comfortable\n佚（いつ）= being comfortable", tags: ["N2", "vocab", "mcq"] },
    { front: "早速\nさっそく\n\n意味は？\n① at once\n② consul\n③ diagonal\n④ to give (an example)", back: "① at once\n早速（さっそく）= at once", tags: ["N2", "vocab", "mcq"] },
    { front: "気体\nきたい\n\n意味は？\n① tile (e.g. roof)\n② seat\n③ to be erected\n④ gas", back: "④ gas\n気体（きたい）= gas", tags: ["N2", "vocab", "mcq"] },
    { front: "知人\nちじん\n\n意味は？\n① creator (of a work)\n② stationery\n③ friend\n④ guest seating (e.g. theater, stadium)", back: "③ friend\n知人（ちじん）= friend", tags: ["N2", "vocab", "mcq"] },
    { front: "芯\nしん\n\n意味は？\n① broom\n② urgent\n③ wick\n④ accident (caused by negligence)", back: "③ wick\n芯（しん）= wick", tags: ["N2", "vocab", "mcq"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N1・Vocabulary
// ═══════════════════════════════════════════

function n1_vocab(): PresetDeck {
  const id = "preset-n1-vocab";
  const deck: Deck = {
    id, name: "N1・Vocabulary", testType: "N1", practiceMode: "vocabulary", source: "preset",
    cardCount: 80, createdAt: Date.now(), description: "JLPT N1: Vocabulary multiple choice",
  };
  const cards = makeCards(id, [
    { front: "良心\nりょうしん\n\n意味は？\n① conscience\n② to fit\n③ negligent\n④ structure", back: "① conscience\n良心（りょうしん）= conscience", tags: ["N1", "vocab", "mcq"] },
    { front: "協調\nきょうちょう\n\n意味は？\n① to pinch\n② mouse\n③ occurrence\n④ cooperation", back: "④ cooperation\n協調（きょうちょう）= cooperation", tags: ["N1", "vocab", "mcq"] },
    { front: "どうぞ宜しく\nどうぞよろしく\n\n意味は？\n① to be violated\n② that is (to say)\n③ person in charge of music (in a Japanese dance performance)\n④ pleased to meet you", back: "④ pleased to meet you\nどうぞ宜しく（どうぞよろしく）= pleased to meet you", tags: ["N1", "vocab", "mcq"] },
    { front: "毎\nごと\n\n意味は？\n① to die out\n② daytime\n③ calling on\n④ each", back: "④ each\n毎（ごと）= each", tags: ["N1", "vocab", "mcq"] },
    { front: "物体\nぶったい\n\n意味は？\n① bowl\n② object\n③ running away from home\n④ painful", back: "② object\n物体（ぶったい）= object", tags: ["N1", "vocab", "mcq"] },
    { front: "中枢\nちゅうすう\n\n意味は？\n① frank\n② centre\n③ sincere\n④ to happen to pass by", back: "② centre\n中枢（ちゅうすう）= centre", tags: ["N1", "vocab", "mcq"] },
    { front: "噴出\nふんしゅつ\n\n意味は？\n① spewing\n② moat\n③ fixed date\n④ judgement", back: "① spewing\n噴出（ふんしゅつ）= spewing", tags: ["N1", "vocab", "mcq"] },
    { front: "平方\nへいほう\n\n意味は？\n① essence\n② neutrality\n③ square (e.g. metre)\n④ hit", back: "③ square (e.g. metre)\n平方（へいほう）= square (e.g. metre)", tags: ["N1", "vocab", "mcq"] },
    { front: "核\nかく\n\n意味は？\n① diplomatic relations\n② fund\n③ shortening\n④ stone (of a fruit)", back: "④ stone (of a fruit)\n核（かく）= stone (of a fruit)", tags: ["N1", "vocab", "mcq"] },
    { front: "製鉄\nせいてつ\n\n意味は？\n① production\n② iron manufacture\n③ idle complaint\n④ armaments", back: "② iron manufacture\n製鉄（せいてつ）= iron manufacture", tags: ["N1", "vocab", "mcq"] },
    { front: "周期\nしゅうき\n\n意味は？\n① confession\n② cycle\n③ job transfer\n④ forwarding", back: "② cycle\n周期（しゅうき）= cycle", tags: ["N1", "vocab", "mcq"] },
    { front: "誠実\nせいじつ\n\n意味は？\n① uniform\n② whole area\n③ excavation\n④ sincere", back: "④ sincere\n誠実（せいじつ）= sincere", tags: ["N1", "vocab", "mcq"] },
    { front: "この間\nこのあいだ\n\n意味は？\n① LOL\n② to accomplish\n③ -ical\n④ the other day", back: "④ the other day\nこの間（このあいだ）= the other day", tags: ["N1", "vocab", "mcq"] },
    { front: "惜しむ\nおしむ\n\n意味は？\n① decision\n② cooperation\n③ to spare\n④ to make (good) progress", back: "③ to spare\n惜しむ（おしむ）= to spare", tags: ["N1", "vocab", "mcq"] },
    { front: "留める\nとどめる\n\n意味は？\n① whaling\n② (personnel) change\n③ share (in a company)\n④ to stop", back: "④ to stop\n留める（とどめる）= to stop", tags: ["N1", "vocab", "mcq"] },
    { front: "対談\nたいだん\n\n意味は？\n① characteristic (of)\n② talk\n③ sacred lotus (Nelumbo nucifera)\n④ solid body", back: "② talk\n対談（たいだん）= talk", tags: ["N1", "vocab", "mcq"] },
    { front: "逃亡\nとうぼう\n\n意味は？\n① fee\n② to make (good) progress\n③ escape\n④ garden", back: "③ escape\n逃亡（とうぼう）= escape", tags: ["N1", "vocab", "mcq"] },
    { front: "分母\nぶんぼ\n\n意味は？\n① abundant harvest\n② actual expenses\n③ denominator\n④ take care of yourself", back: "③ denominator\n分母（ぶんぼ）= denominator", tags: ["N1", "vocab", "mcq"] },
    { front: "野党\nやとう\n\n意味は？\n① opposition party\n② joint together\n③ hero\n④ here and there", back: "① opposition party\n野党（やとう）= opposition party", tags: ["N1", "vocab", "mcq"] },
    { front: "発言\nはつげん\n\n意味は？\n① inland\n② statement\n③ conquest\n④ young bird", back: "② statement\n発言（はつげん）= statement", tags: ["N1", "vocab", "mcq"] },
    { front: "栽培\nさいばい\n\n意味は？\n① territory\n② to accept\n③ well\n④ cultivation", back: "④ cultivation\n栽培（さいばい）= cultivation", tags: ["N1", "vocab", "mcq"] },
    { front: "南\nなん\n\n意味は？\n① southern\n② collecting\n③ difficult\n④ feel (of something)", back: "① southern\n南（なん）= southern", tags: ["N1", "vocab", "mcq"] },
    { front: "掲載\nけいさい\n\n意味は？\n① publication (e.g. of an article in a newspaper)\n② ornament\n③ series\n④ proof", back: "① publication (e.g. of an article in a newspaper)\n掲載（けいさい）= publication (e.g. of an article in a newspaper)", tags: ["N1", "vocab", "mcq"] },
    { front: "たどり着く\nたどりつく\n\n意味は？\n① skillful\n② restoration to life\n③ to (finally) arrive at\n④ make", back: "③ to (finally) arrive at\nたどり着く（たどりつく）= to (finally) arrive at", tags: ["N1", "vocab", "mcq"] },
    { front: "我儘\nわがまま\n\n意味は？\n① intention\n② selfish\n③ snoring\n④ alternate", back: "② selfish\n我儘（わがまま）= selfish", tags: ["N1", "vocab", "mcq"] },
    { front: "洪水\nこうずい\n\n意味は？\n① flood\n② antiquity\n③ uniform\n④ to become moist", back: "① flood\n洪水（こうずい）= flood", tags: ["N1", "vocab", "mcq"] },
    { front: "無茶苦茶\nむちゃくちゃ\n\n意味は？\n① constable\n② emotion\n③ nonsensical\n④ source of river", back: "③ nonsensical\n無茶苦茶（むちゃくちゃ）= nonsensical", tags: ["N1", "vocab", "mcq"] },
    { front: "憎しみ\nにくしみ\n\n意味は？\n① re-\n② correction\n③ hatred\n④ marriage proposal", back: "③ hatred\n憎しみ（にくしみ）= hatred", tags: ["N1", "vocab", "mcq"] },
    { front: "申し分\nもうしぶん\n\n意味は？\n① waiting on a table\n② mere\n③ somewhere\n④ complaint", back: "④ complaint\n申し分（もうしぶん）= complaint", tags: ["N1", "vocab", "mcq"] },
    { front: "未熟\nみじゅく\n\n意味は？\n① to congeal\n② here and there\n③ unripe\n④ harmonious", back: "③ unripe\n未熟（みじゅく）= unripe", tags: ["N1", "vocab", "mcq"] },
    { front: "再生\nさいせい\n\n意味は？\n① southern\n② coordinate\n③ persecution\n④ restoration to life", back: "④ restoration to life\n再生（さいせい）= restoration to life", tags: ["N1", "vocab", "mcq"] },
    { front: "開発\nかいはつ\n\n意味は？\n① useless\n② letter\n③ private property\n④ development", back: "④ development\n開発（かいはつ）= development", tags: ["N1", "vocab", "mcq"] },
    { front: "所が\nところが\n\n意味は？\n① resignation\n② density\n③ even so\n④ timetable", back: "③ even so\n所が（ところが）= even so", tags: ["N1", "vocab", "mcq"] },
    { front: "拵える\nこしらえる\n\n意味は？\n① memory\n② to make\n③ printing\n④ living together", back: "② to make\n拵える（こしらえる）= to make", tags: ["N1", "vocab", "mcq"] },
    { front: "携帯\nけいたい\n\n意味は？\n① to go out of use\n② introduction\n③ carrying (on one's person or in the hand)\n④ numeral", back: "③ carrying (on one's person or in the hand)\n携帯（けいたい）= carrying (on one's person or in the hand)", tags: ["N1", "vocab", "mcq"] },
    { front: "角\nかく\n\n意味は？\n① outside the area\n② to not match well (e.g. at the seams)\n③ to incline\n④ angle", back: "④ angle\n角（かく）= angle", tags: ["N1", "vocab", "mcq"] },
    { front: "染める\nそめる\n\n意味は？\n① to grapple with\n② salary\n③ to dye\n④ to rot", back: "③ to dye\n染める（そめる）= to dye", tags: ["N1", "vocab", "mcq"] },
    { front: "前売り\nまえうり\n\n意味は？\n① perhaps\n② double suicide\n③ advance sale\n④ truth", back: "③ advance sale\n前売り（まえうり）= advance sale", tags: ["N1", "vocab", "mcq"] },
    { front: "転回\nてんかい\n\n意味は？\n① shaking\n② to come apart at the seams\n③ revolution\n④ treat (esp. food and drink)", back: "③ revolution\n転回（てんかい）= revolution", tags: ["N1", "vocab", "mcq"] },
    { front: "版\nはん\n\n意味は？\n① to engage in\n② edition\n③ handicraft\n④ the same", back: "② edition\n版（はん）= edition", tags: ["N1", "vocab", "mcq"] },
    { front: "決断\nけつだん\n\n意味は？\n① (outward) looks\n② decision\n③ large build\n④ motive", back: "② decision\n決断（けつだん）= decision", tags: ["N1", "vocab", "mcq"] },
    { front: "派遣\nはけん\n\n意味は？\n① paving (a road)\n② dispatch\n③ flower bed\n④ moreover", back: "② dispatch\n派遣（はけん）= dispatch", tags: ["N1", "vocab", "mcq"] },
    { front: "形態\nけいたい\n\n意味は？\n① dialogue\n② form\n③ groundwork\n④ signature", back: "② form\n形態（けいたい）= form", tags: ["N1", "vocab", "mcq"] },
    { front: "費やす\nついやす\n\n意味は？\n① surrender\n② to spend\n③ exit and entrance\n④ every month", back: "② to spend\n費やす（ついやす）= to spend", tags: ["N1", "vocab", "mcq"] },
    { front: "観\nかん\n\n意味は？\n① fierce\n② look\n③ subtraction\n④ (being in) the black", back: "② look\n観（かん）= look", tags: ["N1", "vocab", "mcq"] },
    { front: "分裂\nぶんれつ\n\n意味は？\n① saw\n② to (make something) quiver\n③ perfectly round\n④ split", back: "④ split\n分裂（ぶんれつ）= split", tags: ["N1", "vocab", "mcq"] },
    { front: "一帯\nいったい\n\n意味は？\n① whole area\n② source of electricity\n③ barely\n④ (enactment of) legislation", back: "① whole area\n一帯（いったい）= whole area", tags: ["N1", "vocab", "mcq"] },
    { front: "金棒\nかなぼう\n\n意味は？\n① metal rod\n② riches\n③ and\n④ oral", back: "① metal rod\n金棒（かなぼう）= metal rod", tags: ["N1", "vocab", "mcq"] },
    { front: "制\nせい\n\n意味は？\n① self-esteem\n② system\n③ foolish\n④ waste (of money, time, etc.)", back: "② system\n制（せい）= system", tags: ["N1", "vocab", "mcq"] },
    { front: "酸\nさん\n\n意味は？\n① daytime\n② treat (esp. food and drink)\n③ every kind\n④ acid", back: "④ acid\n酸（さん）= acid", tags: ["N1", "vocab", "mcq"] },
    { front: "御目出度う\nおめでとう\n\n意味は？\n① keen\n② to close (one's eyes)\n③ technical skill\n④ congratulations!", back: "④ congratulations!\n御目出度う（おめでとう）= congratulations!", tags: ["N1", "vocab", "mcq"] },
    { front: "斑\nぶち\n\n意味は？\n① to apply (of a rule)\n② declaration\n③ spots\n④ to throw down", back: "③ spots\n斑（ぶち）= spots", tags: ["N1", "vocab", "mcq"] },
    { front: "洒落\nしゃらく\n\n意味は？\n① in good health\n② where\n③ free and easy\n④ measure", back: "③ free and easy\n洒落（しゃらく）= free and easy", tags: ["N1", "vocab", "mcq"] },
    { front: "分散\nぶんさん\n\n意味は？\n① maintenance\n② dispersion\n③ to insert\n④ view", back: "② dispersion\n分散（ぶんさん）= dispersion", tags: ["N1", "vocab", "mcq"] },
    { front: "到底\nとうてい\n\n意味は？\n① empty stomach\n② staple food\n③ (cannot) possibly\n④ to entrust (to someone)", back: "③ (cannot) possibly\n到底（とうてい）= (cannot) possibly", tags: ["N1", "vocab", "mcq"] },
    { front: "防火\nぼうか\n\n意味は？\n① diving\n② light\n③ presence\n④ fire prevention", back: "④ fire prevention\n防火（ぼうか）= fire prevention", tags: ["N1", "vocab", "mcq"] },
    { front: "恵み\nめぐみ\n\n意味は？\n① unclear\n② one-by-one\n③ blessing\n④ registration", back: "③ blessing\n恵み（めぐみ）= blessing", tags: ["N1", "vocab", "mcq"] },
    { front: "明くる\nあくる\n\n意味は？\n① next (day, morning, etc.)\n② private ownership\n③ return\n④ comprehension", back: "① next (day, morning, etc.)\n明くる（あくる）= next (day, morning, etc.)", tags: ["N1", "vocab", "mcq"] },
    { front: "苦しめる\nくるしめる\n\n意味は？\n① shabby\n② sacred lotus (Nelumbo nucifera)\n③ to torment\n④ jealousy", back: "③ to torment\n苦しめる（くるしめる）= to torment", tags: ["N1", "vocab", "mcq"] },
    { front: "転居\nてんきょ\n\n意味は？\n① superior (in rank)\n② price\n③ written language\n④ moving", back: "④ moving\n転居（てんきょ）= moving", tags: ["N1", "vocab", "mcq"] },
    { front: "設立\nせつりつ\n\n意味は？\n① blow\n② seriousness\n③ treasured article or vessel\n④ establishment", back: "④ establishment\n設立（せつりつ）= establishment", tags: ["N1", "vocab", "mcq"] },
    { front: "正常\nせいじょう\n\n意味は？\n① reinforcement\n② normal\n③ town hall\n④ fat", back: "② normal\n正常（せいじょう）= normal", tags: ["N1", "vocab", "mcq"] },
    { front: "裸足\nはだし\n\n意味は？\n① signature\n② barefoot\n③ defense\n④ outdoors", back: "② barefoot\n裸足（はだし）= barefoot", tags: ["N1", "vocab", "mcq"] },
    { front: "窮乏\nきゅうぼう\n\n意味は？\n① inland\n② in two equal parts\n③ really\n④ poverty", back: "④ poverty\n窮乏（きゅうぼう）= poverty", tags: ["N1", "vocab", "mcq"] },
    { front: "規範\nきはん\n\n意味は？\n① cavity\n② gathering (esp. Buddhist, festive, etc.)\n③ to catch\n④ model", back: "④ model\n規範（きはん）= model", tags: ["N1", "vocab", "mcq"] },
    { front: "従来\nじゅうらい\n\n意味は？\n① debt\n② starting (construction) work\n③ up to now\n④ obstruction", back: "③ up to now\n従来（じゅうらい）= up to now", tags: ["N1", "vocab", "mcq"] },
    { front: "翔る\nかける\n\n意味は？\n① to soar\n② to flip\n③ solitude\n④ cold", back: "① to soar\n翔る（かける）= to soar", tags: ["N1", "vocab", "mcq"] },
    { front: "海抜\nかいばつ\n\n意味は？\n① height above sea level\n② end\n③ emission\n④ long and large", back: "① height above sea level\n海抜（かいばつ）= height above sea level", tags: ["N1", "vocab", "mcq"] },
    { front: "争い\nあらそい\n\n意味は？\n① dustpan\n② diarrhea\n③ Yang energy\n④ fight", back: "④ fight\n争い（あらそい）= fight", tags: ["N1", "vocab", "mcq"] },
    { front: "鉱業\nこうぎょう\n\n意味は？\n① to feel down\n② to change\n③ mining industry\n④ stroke (of a kanji)", back: "③ mining industry\n鉱業（こうぎょう）= mining industry", tags: ["N1", "vocab", "mcq"] },
    { front: "外相\nがいしょう\n\n意味は？\n① folk customs\n② Foreign Minister\n③ assistance\n④ karuta", back: "② Foreign Minister\n外相（がいしょう）= Foreign Minister", tags: ["N1", "vocab", "mcq"] },
    { front: "地主\nじぬし\n\n意味は？\n① landowner\n② to challenge to (a fight, game, etc.)\n③ to deepen\n④ to advance on", back: "① landowner\n地主（じぬし）= landowner", tags: ["N1", "vocab", "mcq"] },
    { front: "日向\nひなた\n\n意味は？\n① (flash of) lightning\n② treatment\n③ to clear\n④ sunny place", back: "④ sunny place\n日向（ひなた）= sunny place", tags: ["N1", "vocab", "mcq"] },
    { front: "脱退\nだったい\n\n意味は？\n① resolution\n② public (institution)\n③ repair\n④ withdrawal (e.g. from an organization)", back: "④ withdrawal (e.g. from an organization)\n脱退（だったい）= withdrawal (e.g. from an organization)", tags: ["N1", "vocab", "mcq"] },
    { front: "書評\nしょひょう\n\n意味は？\n① book review\n② (mental) attitude\n③ frequent\n④ that", back: "① book review\n書評（しょひょう）= book review", tags: ["N1", "vocab", "mcq"] },
    { front: "代わる代わる\nかわるがわる\n\n意味は？\n① investigation\n② insect\n③ fund\n④ alternately", back: "④ alternately\n代わる代わる（かわるがわる）= alternately", tags: ["N1", "vocab", "mcq"] },
    { front: "若しかしたら\nもしかしたら\n\n意味は？\n① combination\n② perhaps\n③ facility\n④ movement", back: "② perhaps\n若しかしたら（もしかしたら）= perhaps", tags: ["N1", "vocab", "mcq"] },
    { front: "委託\nいたく\n\n意味は？\n① outline\n② first visit to inn, restaurant, etc. without an introduction\n③ entrusting (something to a person)\n④ to become vigorous", back: "③ entrusting (something to a person)\n委託（いたく）= entrusting (something to a person)", tags: ["N1", "vocab", "mcq"] },
    { front: "事前\nじぜん\n\n意味は？\n① technique\n② prior\n③ to need\n④ dish towel", back: "② prior\n事前（じぜん）= prior", tags: ["N1", "vocab", "mcq"] },
    { front: "嘆\nたん\n\n意味は？\n① starting work (on)\n② appendix\n③ sigh\n④ gate", back: "③ sigh\n嘆（たん）= sigh", tags: ["N1", "vocab", "mcq"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N5・Kanji Reading
// ═══════════════════════════════════════════

function n5_kanji_reading(): PresetDeck {
  const id = "preset-n5-kanji-reading";
  const deck: Deck = {
    id, name: "N5・Kanji Reading", testType: "N5", practiceMode: "kanji", source: "preset",
    cardCount: 40, createdAt: Date.now(), description: "JLPT N5: Kanji reading (how to read)",
  };
  const cards = makeCards(id, [
    { front: "お金\n\n読み方は？\n① うたう\n② きく\n③ おかね\n④ てんき", back: "③ おかね\nお金 = おかね", tags: ["N5", "kanji", "reading"] },
    { front: "木曜日\n\n読み方は？\n① ぶんしょう\n② ろうか\n③ いや\n④ もくようび", back: "④ もくようび\n木曜日 = もくようび", tags: ["N5", "kanji", "reading"] },
    { front: "引く\n\n読み方は？\n① くち\n② かさ\n③ した\n④ ひく", back: "④ ひく\n引く = ひく", tags: ["N5", "kanji", "reading"] },
    { front: "冬\n\n読み方は？\n① おおぜい\n② でる\n③ せ\n④ ふゆ", back: "④ ふゆ\n冬 = ふゆ", tags: ["N5", "kanji", "reading"] },
    { front: "忙しい\n\n読み方は？\n① きんようび\n② さく\n③ きって\n④ いそがしい", back: "④ いそがしい\n忙しい = いそがしい", tags: ["N5", "kanji", "reading"] },
    { front: "牛乳\n\n読み方は？\n① しんぶん\n② まち\n③ ぎゅうにゅう\n④ かす", back: "③ ぎゅうにゅう\n牛乳 = ぎゅうにゅう", tags: ["N5", "kanji", "reading"] },
    { front: "毎朝\n\n読み方は？\n① よこ\n② まつ\n③ ほん\n④ まいあさ", back: "④ まいあさ\n毎朝 = まいあさ", tags: ["N5", "kanji", "reading"] },
    { front: "狭い\n\n読み方は？\n① せまい\n② いもうと\n③ こうばん\n④ やおや", back: "① せまい\n狭い = せまい", tags: ["N5", "kanji", "reading"] },
    { front: "３日\n\n読み方は？\n① げんき\n② すう\n③ せびろ\n④ みっか", back: "④ みっか\n３日 = みっか", tags: ["N5", "kanji", "reading"] },
    { front: "重い\n\n読み方は？\n① おもい\n② ぶたにく\n③ うまれる\n④ くもり", back: "① おもい\n重い = おもい", tags: ["N5", "kanji", "reading"] },
    { front: "外\n\n読み方は？\n① べんり\n② みじかい\n③ そと\n④ れい", back: "③ そと\n外 = そと", tags: ["N5", "kanji", "reading"] },
    { front: "言葉\n\n読み方は？\n① ご\n② つめたい\n③ ことば\n④ おてあらい", back: "③ ことば\n言葉 = ことば", tags: ["N5", "kanji", "reading"] },
    { front: "一つ\n\n読み方は？\n① くろ\n② わかい\n③ ひとつ\n④ いっしょ", back: "③ ひとつ\n一つ = ひとつ", tags: ["N5", "kanji", "reading"] },
    { front: "乗る\n\n読み方は？\n① のる\n② はなす\n③ たてもの\n④ だれ", back: "① のる\n乗る = のる", tags: ["N5", "kanji", "reading"] },
    { front: "お弁当\n\n読み方は？\n① もくようび\n② おべんとう\n③ うみ\n④ たべもの", back: "② おべんとう\nお弁当 = おべんとう", tags: ["N5", "kanji", "reading"] },
    { front: "電話\n\n読み方は？\n① かいだん\n② でんわ\n③ うしろ\n④ さす", back: "② でんわ\n電話 = でんわ", tags: ["N5", "kanji", "reading"] },
    { front: "教える\n\n読み方は？\n① かいもの\n② ちず\n③ おなじ\n④ おしえる", back: "④ おしえる\n教える = おしえる", tags: ["N5", "kanji", "reading"] },
    { front: "歩く\n\n読み方は？\n① ぬるい\n② あるく\n③ おさら\n④ たのしい", back: "② あるく\n歩く = あるく", tags: ["N5", "kanji", "reading"] },
    { front: "居る\n\n読み方は？\n① いる\n② くらい\n③ おかし\n④ ひく", back: "① いる\n居る = いる", tags: ["N5", "kanji", "reading"] },
    { front: "嫌い\n\n読み方は？\n① おとこ\n② おんなのこ\n③ きらい\n④ くつした", back: "③ きらい\n嫌い = きらい", tags: ["N5", "kanji", "reading"] },
    { front: "書く\n\n読み方は？\n① いろ\n② きのう\n③ あめ\n④ かく", back: "④ かく\n書く = かく", tags: ["N5", "kanji", "reading"] },
    { front: "去年\n\n読み方は？\n① きょねん\n② だす\n③ やすむ\n④ ふゆ", back: "① きょねん\n去年 = きょねん", tags: ["N5", "kanji", "reading"] },
    { front: "先週\n\n読み方は？\n① むいか\n② でんわ\n③ きる\n④ せんしゅう", back: "④ せんしゅう\n先週 = せんしゅう", tags: ["N5", "kanji", "reading"] },
    { front: "同じ\n\n読み方は？\n① のむ\n② おなじ\n③ ひくい\n④ とぶ", back: "② おなじ\n同じ = おなじ", tags: ["N5", "kanji", "reading"] },
    { front: "元気\n\n読み方は？\n① げんき\n② とりにく\n③ わたる\n④ しまる", back: "① げんき\n元気 = げんき", tags: ["N5", "kanji", "reading"] },
    { front: "隣\n\n読み方は？\n① となり\n② はいる\n③ ぶたにく\n④ なく", back: "① となり\n隣 = となり", tags: ["N5", "kanji", "reading"] },
    { front: "お兄さん\n\n読み方は？\n① がくせい\n② べんり\n③ おにいさん\n④ きいろい", back: "③ おにいさん\nお兄さん = おにいさん", tags: ["N5", "kanji", "reading"] },
    { front: "外国人\n\n読み方は？\n① がいこくじん\n② とりにく\n③ あぶない\n④ あお", back: "① がいこくじん\n外国人 = がいこくじん", tags: ["N5", "kanji", "reading"] },
    { front: "話す\n\n読み方は？\n① もん\n② ついたち\n③ はなす\n④ とりにく", back: "③ はなす\n話す = はなす", tags: ["N5", "kanji", "reading"] },
    { front: "静か\n\n読み方は？\n① しずか\n② ばん\n③ て\n④ あらう", back: "① しずか\n静か = しずか", tags: ["N5", "kanji", "reading"] },
    { front: "飛ぶ\n\n読み方は？\n① に\n② みがく\n③ おとうさん\n④ とぶ", back: "④ とぶ\n飛ぶ = とぶ", tags: ["N5", "kanji", "reading"] },
    { front: "借りる\n\n読み方は？\n① やすみ\n② やすい\n③ かりる\n④ でんわ", back: "③ かりる\n借りる = かりる", tags: ["N5", "kanji", "reading"] },
    { front: "学生\n\n読み方は？\n① がいこくじん\n② とぶ\n③ あと\n④ がくせい", back: "④ がくせい\n学生 = がくせい", tags: ["N5", "kanji", "reading"] },
    { front: "声\n\n読み方は？\n① けいかん\n② すむ\n③ いぬ\n④ こえ", back: "④ こえ\n声 = こえ", tags: ["N5", "kanji", "reading"] },
    { front: "八\n\n読み方は？\n① いや\n② おかね\n③ こうばん\n④ はち", back: "④ はち\n八 = はち", tags: ["N5", "kanji", "reading"] },
    { front: "暑い\n\n読み方は？\n① ここのつ\n② でる\n③ むいか\n④ あつい", back: "④ あつい\n暑い = あつい", tags: ["N5", "kanji", "reading"] },
    { front: "春\n\n読み方は？\n① せんげつ\n② おくさん\n③ はる\n④ きって", back: "③ はる\n春 = はる", tags: ["N5", "kanji", "reading"] },
    { front: "会う\n\n読み方は？\n① あるく\n② おおい\n③ りょうしん\n④ あう", back: "④ あう\n会う = あう", tags: ["N5", "kanji", "reading"] },
    { front: "鳥\n\n読み方は？\n① しろい\n② あそぶ\n③ だす\n④ とり", back: "④ とり\n鳥 = とり", tags: ["N5", "kanji", "reading"] },
    { front: "物\n\n読み方は？\n① もの\n② やすい\n③ とけい\n④ ちいさい", back: "① もの\n物 = もの", tags: ["N5", "kanji", "reading"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N4・Kanji Reading
// ═══════════════════════════════════════════

function n4_kanji_reading(): PresetDeck {
  const id = "preset-n4-kanji-reading";
  const deck: Deck = {
    id, name: "N4・Kanji Reading", testType: "N4", practiceMode: "kanji", source: "preset",
    cardCount: 40, createdAt: Date.now(), description: "JLPT N4: Kanji reading (how to read)",
  };
  const cards = makeCards(id, [
    { front: "背中\n\n読み方は？\n① めずらしい\n② とりかえる\n③ せなか\n④ ちゅうがっこう", back: "③ せなか\n背中 = せなか", tags: ["N4", "kanji", "reading"] },
    { front: "電報\n\n読み方は？\n① すみ\n② れいぼう\n③ でんぽう\n④ おまつり", back: "③ でんぽう\n電報 = でんぽう", tags: ["N4", "kanji", "reading"] },
    { front: "寄る\n\n読み方は？\n① おく\n② よる\n③ けしき\n④ やめる", back: "② よる\n寄る = よる", tags: ["N4", "kanji", "reading"] },
    { front: "電灯\n\n読み方は？\n① でんとう\n② きけん\n③ まわる\n④ ぬすむ", back: "① でんとう\n電灯 = でんとう", tags: ["N4", "kanji", "reading"] },
    { front: "必要\n\n読み方は？\n① なくなる\n② くさ\n③ ひつよう\n④ すてる", back: "③ ひつよう\n必要 = ひつよう", tags: ["N4", "kanji", "reading"] },
    { front: "仕方\n\n読み方は？\n① そつぎょう\n② しかた\n③ のりかえる\n④ いじょう", back: "② しかた\n仕方 = しかた", tags: ["N4", "kanji", "reading"] },
    { front: "小鳥\n\n読み方は？\n① ことり\n② かれ\n③ どうぐ\n④ おれる", back: "① ことり\n小鳥 = ことり", tags: ["N4", "kanji", "reading"] },
    { front: "遠く\n\n読み方は？\n① しんぶんしゃ\n② ばい\n③ かのじょ\n④ とおく", back: "④ とおく\n遠く = とおく", tags: ["N4", "kanji", "reading"] },
    { front: "特に\n\n読み方は？\n① こうこう\n② しんぶんしゃ\n③ とくに\n④ すむ", back: "③ とくに\n特に = とくに", tags: ["N4", "kanji", "reading"] },
    { front: "用\n\n読み方は？\n① そふ\n② たしか\n③ よう\n④ きょういく", back: "③ よう\n用 = よう", tags: ["N4", "kanji", "reading"] },
    { front: "沸く\n\n読み方は？\n① かない\n② ため\n③ むすめ\n④ わく", back: "④ わく\n沸く = わく", tags: ["N4", "kanji", "reading"] },
    { front: "降り出す\n\n読み方は？\n① そつぎょう\n② かえり\n③ ふりだす\n④ かいじょう", back: "③ ふりだす\n降り出す = ふりだす", tags: ["N4", "kanji", "reading"] },
    { front: "足す\n\n読み方は？\n① よる\n② かない\n③ すいえい\n④ たす", back: "④ たす\n足す = たす", tags: ["N4", "kanji", "reading"] },
    { front: "沸かす\n\n読み方は？\n① きんじょ\n② ぬすむ\n③ みえる\n④ わかす", back: "④ わかす\n沸かす = わかす", tags: ["N4", "kanji", "reading"] },
    { front: "下げる\n\n読み方は？\n① さげる\n② にかいだて\n③ ちゅうしゃじょう\n④ おこなう", back: "① さげる\n下げる = さげる", tags: ["N4", "kanji", "reading"] },
    { front: "億\n\n読み方は？\n① おく\n② しあい\n③ ため\n④ どうぶつえん", back: "① おく\n億 = おく", tags: ["N4", "kanji", "reading"] },
    { front: "驚く\n\n読み方は？\n① えらぶ\n② おどろく\n③ ひきだし\n④ しゃかい", back: "② おどろく\n驚く = おどろく", tags: ["N4", "kanji", "reading"] },
    { front: "光\n\n読み方は？\n① さいしょ\n② しゅみ\n③ ひかり\n④ もり", back: "③ ひかり\n光 = ひかり", tags: ["N4", "kanji", "reading"] },
    { front: "妻\n\n読み方は？\n① せん\n② つま\n③ おれる\n④ まにあう", back: "② つま\n妻 = つま", tags: ["N4", "kanji", "reading"] },
    { front: "文法\n\n読み方は？\n① りょかん\n② ぶんぽう\n③ かたづける\n④ みえる", back: "② ぶんぽう\n文法 = ぶんぽう", tags: ["N4", "kanji", "reading"] },
    { front: "娘\n\n読み方は？\n① ぼうえき\n② ふりだす\n③ やく\n④ むすめ", back: "④ むすめ\n娘 = むすめ", tags: ["N4", "kanji", "reading"] },
    { front: "首\n\n読み方は？\n① りゆう\n② くび\n③ ようい\n④ てつだう", back: "② くび\n首 = くび", tags: ["N4", "kanji", "reading"] },
    { front: "十分\n\n読み方は？\n① じゅうぶん\n② じこ\n③ かむ\n④ おもて", back: "① じゅうぶん\n十分 = じゅうぶん", tags: ["N4", "kanji", "reading"] },
    { front: "付く\n\n読み方は？\n① しゅうかん\n② つく\n③ じだい\n④ ひきだし", back: "② つく\n付く = つく", tags: ["N4", "kanji", "reading"] },
    { front: "包む\n\n読み方は？\n① ひ\n② いか\n③ つつむ\n④ てんいん", back: "③ つつむ\n包む = つつむ", tags: ["N4", "kanji", "reading"] },
    { front: "冷える\n\n読み方は？\n① はいしゃ\n② なく\n③ ひえる\n④ さわる", back: "③ ひえる\n冷える = ひえる", tags: ["N4", "kanji", "reading"] },
    { front: "お祭り\n\n読み方は？\n① のりかえる\n② しゅみ\n③ こうぎょう\n④ おまつり", back: "④ おまつり\nお祭り = おまつり", tags: ["N4", "kanji", "reading"] },
    { front: "寝坊\n\n読み方は？\n① きもの\n② しゃかい\n③ ねぼう\n④ たいふう", back: "③ ねぼう\n寝坊 = ねぼう", tags: ["N4", "kanji", "reading"] },
    { front: "訪ねる\n\n読み方は？\n① しょくりょうひん\n② たずねる\n③ うで\n④ けんきゅうしつ", back: "② たずねる\n訪ねる = たずねる", tags: ["N4", "kanji", "reading"] },
    { front: "踊る\n\n読み方は？\n① おどる\n② とまる\n③ しなもの\n④ やくにたつ", back: "① おどる\n踊る = おどる", tags: ["N4", "kanji", "reading"] },
    { front: "用事\n\n読み方は？\n① こくさい\n② あかんぼう\n③ ようじ\n④ いし", back: "③ ようじ\n用事 = ようじ", tags: ["N4", "kanji", "reading"] },
    { front: "形\n\n読み方は？\n① かたち\n② かのじょ\n③ ねむい\n④ でんぽう", back: "① かたち\n形 = かたち", tags: ["N4", "kanji", "reading"] },
    { front: "君\n\n読み方は？\n① ほうりつ\n② きみ\n③ たとえば\n④ そだてる", back: "② きみ\n君 = きみ", tags: ["N4", "kanji", "reading"] },
    { front: "高校\n\n読み方は？\n① こうこう\n② きょういく\n③ つれる\n④ さいしょ", back: "① こうこう\n高校 = こうこう", tags: ["N4", "kanji", "reading"] },
    { front: "柔道\n\n読み方は？\n① じゅうどう\n② じゅうぶん\n③ ぶんがく\n④ けいさつ", back: "① じゅうどう\n柔道 = じゅうどう", tags: ["N4", "kanji", "reading"] },
    { front: "田舎\n\n読み方は？\n① みつける\n② にかいだて\n③ なれる\n④ いなか", back: "④ いなか\n田舎 = いなか", tags: ["N4", "kanji", "reading"] },
    { front: "血\n\n読み方は？\n① すすむ\n② まわる\n③ ち\n④ きぶん", back: "③ ち\n血 = ち", tags: ["N4", "kanji", "reading"] },
    { front: "割れる\n\n読み方は？\n① われる\n② きけん\n③ こむ\n④ うつる", back: "① われる\n割れる = われる", tags: ["N4", "kanji", "reading"] },
    { front: "柔らかい\n\n読み方は？\n① すいどう\n② こくさい\n③ やわらかい\n④ いちど", back: "③ やわらかい\n柔らかい = やわらかい", tags: ["N4", "kanji", "reading"] },
    { front: "通う\n\n読み方は？\n① かよう\n② かわく\n③ ひつよう\n④ せいよう", back: "① かよう\n通う = かよう", tags: ["N4", "kanji", "reading"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N3・Kanji Reading
// ═══════════════════════════════════════════

function n3_kanji_reading(): PresetDeck {
  const id = "preset-n3-kanji-reading";
  const deck: Deck = {
    id, name: "N3・Kanji Reading", testType: "N3", practiceMode: "kanji", source: "preset",
    cardCount: 50, createdAt: Date.now(), description: "JLPT N3: Kanji reading (how to read)",
  };
  const cards = makeCards(id, [
    { front: "時期\n\n読み方は？\n① せいぞう\n② じき\n③ こうえん\n④ おうじる", back: "② じき\n時期 = じき", tags: ["N3", "kanji", "reading"] },
    { front: "順調\n\n読み方は？\n① じゅんちょう\n② めんどう\n③ しょうめい\n④ かいしゃく", back: "① じゅんちょう\n順調 = じゅんちょう", tags: ["N3", "kanji", "reading"] },
    { front: "代金\n\n読み方は？\n① ずつう\n② よぼう\n③ だいきん\n④ じゅうたい", back: "③ だいきん\n代金 = だいきん", tags: ["N3", "kanji", "reading"] },
    { front: "唯一\n\n読み方は？\n① ゆいいつ\n② かんきょう\n③ あらわれる\n④ むし", back: "① ゆいいつ\n唯一 = ゆいいつ", tags: ["N3", "kanji", "reading"] },
    { front: "畑\n\n読み方は？\n① はたけ\n② しんごう\n③ ふり\n④ むだ", back: "① はたけ\n畑 = はたけ", tags: ["N3", "kanji", "reading"] },
    { front: "記念\n\n読み方は？\n① よき\n② きねん\n③ たび\n④ たより", back: "② きねん\n記念 = きねん", tags: ["N3", "kanji", "reading"] },
    { front: "維持\n\n読み方は？\n① たつ\n② しんさつ\n③ いじ\n④ ものおと", back: "③ いじ\n維持 = いじ", tags: ["N3", "kanji", "reading"] },
    { front: "組織\n\n読み方は？\n① ぎもん\n② いう\n③ しよう\n④ そしき", back: "④ そしき\n組織 = そしき", tags: ["N3", "kanji", "reading"] },
    { front: "舌\n\n読み方は？\n① すぐれる\n② おおや\n③ した\n④ かた", back: "③ した\n舌 = した", tags: ["N3", "kanji", "reading"] },
    { front: "減らす\n\n読み方は？\n① ちょしゃ\n② へらす\n③ きにゅう\n④ かんじゃ", back: "② へらす\n減らす = へらす", tags: ["N3", "kanji", "reading"] },
    { front: "出席\n\n読み方は？\n① げんだい\n② ようきゅう\n③ せいひん\n④ しゅっせき", back: "④ しゅっせき\n出席 = しゅっせき", tags: ["N3", "kanji", "reading"] },
    { front: "組\n\n読み方は？\n① れいぎ\n② ゆうしょう\n③ くみ\n④ つうがく", back: "③ くみ\n組 = くみ", tags: ["N3", "kanji", "reading"] },
    { front: "能\n\n読み方は？\n① ふんいき\n② たいはん\n③ のう\n④ せいかく", back: "③ のう\n能 = のう", tags: ["N3", "kanji", "reading"] },
    { front: "遠慮\n\n読み方は？\n① く\n② えんりょ\n③ さかい\n④ あきらめる", back: "② えんりょ\n遠慮 = えんりょ", tags: ["N3", "kanji", "reading"] },
    { front: "衣服\n\n読み方は？\n① いとこ\n② たいはん\n③ ほうせき\n④ いふく", back: "④ いふく\n衣服 = いふく", tags: ["N3", "kanji", "reading"] },
    { front: "日中\n\n読み方は？\n① みまい\n② ちこく\n③ こうじょう\n④ にっちゅう", back: "④ にっちゅう\n日中 = にっちゅう", tags: ["N3", "kanji", "reading"] },
    { front: "消費\n\n読み方は？\n① たしょう\n② かげん\n③ くさい\n④ しょうひ", back: "④ しょうひ\n消費 = しょうひ", tags: ["N3", "kanji", "reading"] },
    { front: "雰囲気\n\n読み方は？\n① ふんいき\n② ほか\n③ きん\n④ のど", back: "① ふんいき\n雰囲気 = ふんいき", tags: ["N3", "kanji", "reading"] },
    { front: "影響\n\n読み方は？\n① えいきょう\n② してん\n③ わるぐち\n④ ぐんたい", back: "① えいきょう\n影響 = えいきょう", tags: ["N3", "kanji", "reading"] },
    { front: "相当\n\n読み方は？\n① みる\n② そうとう\n③ へる\n④ いぜん", back: "② そうとう\n相当 = そうとう", tags: ["N3", "kanji", "reading"] },
    { front: "穴\n\n読み方は？\n① ひん\n② たしかめる\n③ しほん\n④ あな", back: "④ あな\n穴 = あな", tags: ["N3", "kanji", "reading"] },
    { front: "外す\n\n読み方は？\n① きゅうけい\n② まいご\n③ はずす\n④ どくしょ", back: "③ はずす\n外す = はずす", tags: ["N3", "kanji", "reading"] },
    { front: "少女\n\n読み方は？\n① しょうじょ\n② ふそく\n③ ようい\n④ ぶたい", back: "① しょうじょ\n少女 = しょうじょ", tags: ["N3", "kanji", "reading"] },
    { front: "論争\n\n読み方は？\n① ちゅう\n② せんじつ\n③ ろんそう\n④ じじょう", back: "③ ろんそう\n論争 = ろんそう", tags: ["N3", "kanji", "reading"] },
    { front: "退屈\n\n読み方は？\n① たいくつ\n② ちほう\n③ しゅうにゅう\n④ よぶん", back: "① たいくつ\n退屈 = たいくつ", tags: ["N3", "kanji", "reading"] },
    { front: "肩\n\n読み方は？\n① たたく\n② かた\n③ うけとる\n④ さっか", back: "② かた\n肩 = かた", tags: ["N3", "kanji", "reading"] },
    { front: "割る\n\n読み方は？\n① わる\n② ゆうしゅう\n③ きれる\n④ うし", back: "① わる\n割る = わる", tags: ["N3", "kanji", "reading"] },
    { front: "支払い\n\n読み方は？\n① いはん\n② しはらい\n③ ながめる\n④ げんじょう", back: "② しはらい\n支払い = しはらい", tags: ["N3", "kanji", "reading"] },
    { front: "失望\n\n読み方は？\n① しつぼう\n② しょさい\n③ きょく\n④ ゆうのう", back: "① しつぼう\n失望 = しつぼう", tags: ["N3", "kanji", "reading"] },
    { front: "幕\n\n読み方は？\n① もえる\n② つみ\n③ ほうこく\n④ まく", back: "④ まく\n幕 = まく", tags: ["N3", "kanji", "reading"] },
    { front: "大使\n\n読み方は？\n① えんじょ\n② だいひょう\n③ たいし\n④ ちく", back: "③ たいし\n大使 = たいし", tags: ["N3", "kanji", "reading"] },
    { front: "宜しい\n\n読み方は？\n① いちじ\n② しゅっぱつ\n③ よろしい\n④ しんたい", back: "③ よろしい\n宜しい = よろしい", tags: ["N3", "kanji", "reading"] },
    { front: "故郷\n\n読み方は？\n① かかえる\n② ち\n③ せいこう\n④ こきょう", back: "④ こきょう\n故郷 = こきょう", tags: ["N3", "kanji", "reading"] },
    { front: "方々\n\n読み方は？\n① たまたま\n② しょくもつ\n③ かんとく\n④ かたがた", back: "④ かたがた\n方々 = かたがた", tags: ["N3", "kanji", "reading"] },
    { front: "青年\n\n読み方は？\n① しょくぶつ\n② か\n③ つうしん\n④ せいねん", back: "④ せいねん\n青年 = せいねん", tags: ["N3", "kanji", "reading"] },
    { front: "横切る\n\n読み方は？\n① あいて\n② よこぎる\n③ なべ\n④ しゅっぱん", back: "② よこぎる\n横切る = よこぎる", tags: ["N3", "kanji", "reading"] },
    { front: "偉大\n\n読み方は？\n① よき\n② どうし\n③ かこむ\n④ いだい", back: "④ いだい\n偉大 = いだい", tags: ["N3", "kanji", "reading"] },
    { front: "包み\n\n読み方は？\n① つつみ\n② まんいち\n③ もちいる\n④ このみ", back: "① つつみ\n包み = つつみ", tags: ["N3", "kanji", "reading"] },
    { front: "連れ\n\n読み方は？\n① であう\n② おぼれる\n③ みやこ\n④ つれ", back: "④ つれ\n連れ = つれ", tags: ["N3", "kanji", "reading"] },
    { front: "生\n\n読み方は？\n① あてる\n② きおん\n③ なま\n④ よそく", back: "③ なま\n生 = なま", tags: ["N3", "kanji", "reading"] },
    { front: "恩\n\n読み方は？\n① おん\n② たんい\n③ おもわず\n④ いちば", back: "① おん\n恩 = おん", tags: ["N3", "kanji", "reading"] },
    { front: "掃除\n\n読み方は？\n① なっとく\n② かまう\n③ すいじゅん\n④ そうじ", back: "④ そうじ\n掃除 = そうじ", tags: ["N3", "kanji", "reading"] },
    { front: "結ぶ\n\n読み方は？\n① むすぶ\n② ほう\n③ むしば\n④ しょうがい", back: "① むすぶ\n結ぶ = むすぶ", tags: ["N3", "kanji", "reading"] },
    { front: "覚める\n\n読み方は？\n① うごかす\n② せつやく\n③ へんか\n④ さめる", back: "④ さめる\n覚める = さめる", tags: ["N3", "kanji", "reading"] },
    { front: "抜く\n\n読み方は？\n① うる\n② ぬく\n③ けいき\n④ けいじ", back: "② ぬく\n抜く = ぬく", tags: ["N3", "kanji", "reading"] },
    { front: "電子\n\n読み方は？\n① でんし\n② ほほえむ\n③ とおす\n④ おおう", back: "① でんし\n電子 = でんし", tags: ["N3", "kanji", "reading"] },
    { front: "氏\n\n読み方は？\n① よのなか\n② たいへん\n③ くわわる\n④ し", back: "④ し\n氏 = し", tags: ["N3", "kanji", "reading"] },
    { front: "革\n\n読み方は？\n① かこ\n② ぬける\n③ かわ\n④ さる", back: "③ かわ\n革 = かわ", tags: ["N3", "kanji", "reading"] },
    { front: "追う\n\n読み方は？\n① うごかす\n② ぜいきん\n③ おう\n④ かならずしも", back: "③ おう\n追う = おう", tags: ["N3", "kanji", "reading"] },
    { front: "偶々\n\n読み方は？\n① いじょう\n② かたる\n③ し\n④ たまたま", back: "④ たまたま\n偶々 = たまたま", tags: ["N3", "kanji", "reading"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N2・Kanji Reading
// ═══════════════════════════════════════════

function n2_kanji_reading(): PresetDeck {
  const id = "preset-n2-kanji-reading";
  const deck: Deck = {
    id, name: "N2・Kanji Reading", testType: "N2", practiceMode: "kanji", source: "preset",
    cardCount: 50, createdAt: Date.now(), description: "JLPT N2: Kanji reading (how to read)",
  };
  const cards = makeCards(id, [
    { front: "特色\n\n読み方は？\n① ぶしゅ\n② ちょうみりょう\n③ とくしょく\n④ そうしき", back: "③ とくしょく\n特色 = とくしょく", tags: ["N2", "kanji", "reading"] },
    { front: "区分\n\n読み方は？\n① ごうり\n② だんち\n③ りんじ\n④ くぶん", back: "④ くぶん\n区分 = くぶん", tags: ["N2", "kanji", "reading"] },
    { front: "儲ける\n\n読み方は？\n① きばん\n② ぜんご\n③ おじさん\n④ もうける", back: "④ もうける\n儲ける = もうける", tags: ["N2", "kanji", "reading"] },
    { front: "工芸\n\n読み方は？\n① こうげい\n② きぐ\n③ せまる\n④ ゆうそう", back: "① こうげい\n工芸 = こうげい", tags: ["N2", "kanji", "reading"] },
    { front: "下品\n\n読み方は？\n① べっそう\n② かいぞう\n③ ようもう\n④ げひん", back: "④ げひん\n下品 = げひん", tags: ["N2", "kanji", "reading"] },
    { front: "兵隊\n\n読み方は？\n① のぼる\n② のうさんぶつ\n③ とうばん\n④ へいたい", back: "④ へいたい\n兵隊 = へいたい", tags: ["N2", "kanji", "reading"] },
    { front: "逆さ\n\n読み方は？\n① さくせい\n② ひので\n③ さかさ\n④ しばる", back: "③ さかさ\n逆さ = さかさ", tags: ["N2", "kanji", "reading"] },
    { front: "平野\n\n読み方は？\n① いぎ\n② めいさく\n③ こうひょう\n④ へいや", back: "④ へいや\n平野 = へいや", tags: ["N2", "kanji", "reading"] },
    { front: "強化\n\n読み方は？\n① きょうか\n② こごえる\n③ ろくおん\n④ でんりょく", back: "① きょうか\n強化 = きょうか", tags: ["N2", "kanji", "reading"] },
    { front: "公表\n\n読み方は？\n① おかわり\n② おがむ\n③ しめきる\n④ こうひょう", back: "④ こうひょう\n公表 = こうひょう", tags: ["N2", "kanji", "reading"] },
    { front: "着々\n\n読み方は？\n① もよおし\n② ちゃくちゃく\n③ しゅくしょう\n④ する", back: "② ちゃくちゃく\n着々 = ちゃくちゃく", tags: ["N2", "kanji", "reading"] },
    { front: "吊る\n\n読み方は？\n① ほり\n② つる\n③ せんせんしゅう\n④ しょせき", back: "② つる\n吊る = つる", tags: ["N2", "kanji", "reading"] },
    { front: "見出し\n\n読み方は？\n① ぶしゅ\n② ほす\n③ みだし\n④ せんとう", back: "③ みだし\n見出し = みだし", tags: ["N2", "kanji", "reading"] },
    { front: "牧畜\n\n読み方は？\n① はらいもどす\n② かんそう\n③ ぼくちく\n④ ぞうり", back: "③ ぼくちく\n牧畜 = ぼくちく", tags: ["N2", "kanji", "reading"] },
    { front: "改札\n\n読み方は？\n① かいさつ\n② なぐさめる\n③ おもいつく\n④ みんかん", back: "① かいさつ\n改札 = かいさつ", tags: ["N2", "kanji", "reading"] },
    { front: "響く\n\n読み方は？\n① ものおき\n② かじょう\n③ ひびく\n④ かくじゅう", back: "③ ひびく\n響く = ひびく", tags: ["N2", "kanji", "reading"] },
    { front: "昼寝\n\n読み方は？\n① しょくにん\n② いれもの\n③ におう\n④ ひるね", back: "④ ひるね\n昼寝 = ひるね", tags: ["N2", "kanji", "reading"] },
    { front: "見直す\n\n読み方は？\n① こしょう\n② そろう\n③ みなおす\n④ ぼしゅう", back: "③ みなおす\n見直す = みなおす", tags: ["N2", "kanji", "reading"] },
    { front: "自衛\n\n読み方は？\n① ふける\n② はう\n③ じえい\n④ きゅうよ", back: "③ じえい\n自衛 = じえい", tags: ["N2", "kanji", "reading"] },
    { front: "従姉妹\n\n読み方は？\n① やくしゃ\n② いとこ\n③ きがえ\n④ とくしゅ", back: "② いとこ\n従姉妹 = いとこ", tags: ["N2", "kanji", "reading"] },
    { front: "言い出す\n\n読み方は？\n① いいだす\n② いんりょく\n③ なかよし\n④ じち", back: "① いいだす\n言い出す = いいだす", tags: ["N2", "kanji", "reading"] },
    { front: "教わる\n\n読み方は？\n① こうじつ\n② おそわる\n③ さくしゃ\n④ むじゅん", back: "② おそわる\n教わる = おそわる", tags: ["N2", "kanji", "reading"] },
    { front: "真っ先\n\n読み方は？\n① きぐ\n② まっさき\n③ さいなん\n④ ふくらます", back: "② まっさき\n真っ先 = まっさき", tags: ["N2", "kanji", "reading"] },
    { front: "正門\n\n読み方は？\n① しょうぎ\n② こうさ\n③ かつりょく\n④ せいもん", back: "④ せいもん\n正門 = せいもん", tags: ["N2", "kanji", "reading"] },
    { front: "転がる\n\n読み方は？\n① ちょうせい\n② へいかい\n③ はしご\n④ ころがる", back: "④ ころがる\n転がる = ころがる", tags: ["N2", "kanji", "reading"] },
    { front: "特殊\n\n読み方は？\n① ぶんたい\n② とくしゅ\n③ ちょうてん\n④ らいにち", back: "② とくしゅ\n特殊 = とくしゅ", tags: ["N2", "kanji", "reading"] },
    { front: "半径\n\n読み方は？\n① すきま\n② はんけい\n③ いてん\n④ いじわる", back: "② はんけい\n半径 = はんけい", tags: ["N2", "kanji", "reading"] },
    { front: "突っ込む\n\n読み方は？\n① ぶんかい\n② つっこむ\n③ ふもと\n④ つうか", back: "② つっこむ\n突っ込む = つっこむ", tags: ["N2", "kanji", "reading"] },
    { front: "余計\n\n読み方は？\n① びんづめ\n② かいさん\n③ がくぶ\n④ よけい", back: "④ よけい\n余計 = よけい", tags: ["N2", "kanji", "reading"] },
    { front: "交代\n\n読み方は？\n① こうたい\n② きざむ\n③ やくしゃ\n④ はだぎ", back: "① こうたい\n交代 = こうたい", tags: ["N2", "kanji", "reading"] },
    { front: "歯磨き\n\n読み方は？\n① ひがえり\n② しょっき\n③ めじるし\n④ はみがき", back: "④ はみがき\n歯磨き = はみがき", tags: ["N2", "kanji", "reading"] },
    { front: "洗剤\n\n読み方は？\n① じゅんかん\n② せいぞん\n③ おかえり\n④ せんざい", back: "④ せんざい\n洗剤 = せんざい", tags: ["N2", "kanji", "reading"] },
    { front: "肘\n\n読み方は？\n① ゆそう\n② カタカナ\n③ ひじ\n④ あらためる", back: "③ ひじ\n肘 = ひじ", tags: ["N2", "kanji", "reading"] },
    { front: "関西\n\n読み方は？\n① かんさい\n② せっする\n③ ちたい\n④ たうえ", back: "① かんさい\n関西 = かんさい", tags: ["N2", "kanji", "reading"] },
    { front: "索引\n\n読み方は？\n① さくいん\n② しかい\n③ はだぎ\n④ ほんぶ", back: "① さくいん\n索引 = さくいん", tags: ["N2", "kanji", "reading"] },
    { front: "無限\n\n読み方は？\n① かいつう\n② ぬう\n③ ぜいかん\n④ むげん", back: "④ むげん\n無限 = むげん", tags: ["N2", "kanji", "reading"] },
    { front: "騒々しい\n\n読み方は？\n① そうぞうしい\n② かしや\n③ だいめい\n④ きち", back: "① そうぞうしい\n騒々しい = そうぞうしい", tags: ["N2", "kanji", "reading"] },
    { front: "正味\n\n読み方は？\n① しりつ\n② しょうみ\n③ せいしつ\n④ さらいげつ", back: "② しょうみ\n正味 = しょうみ", tags: ["N2", "kanji", "reading"] },
    { front: "鉄砲\n\n読み方は？\n① たる\n② せいれき\n③ てっぽう\n④ やじるし", back: "③ てっぽう\n鉄砲 = てっぽう", tags: ["N2", "kanji", "reading"] },
    { front: "公共\n\n読み方は？\n① やぶれる\n② けんがく\n③ こうきょう\n④ あむ", back: "③ こうきょう\n公共 = こうきょう", tags: ["N2", "kanji", "reading"] },
    { front: "溶ける\n\n読み方は？\n① まねる\n② にじ\n③ ねらう\n④ とける", back: "④ とける\n溶ける = とける", tags: ["N2", "kanji", "reading"] },
    { front: "佚\n\n読み方は？\n① いつ\n② くずれる\n③ うむ\n④ おかえり", back: "① いつ\n佚 = いつ", tags: ["N2", "kanji", "reading"] },
    { front: "床屋\n\n読み方は？\n① とこや\n② げんし\n③ らくだい\n④ りょうし", back: "① とこや\n床屋 = とこや", tags: ["N2", "kanji", "reading"] },
    { front: "診断\n\n読み方は？\n① じっせき\n② まっしろ\n③ たき\n④ しんだん", back: "④ しんだん\n診断 = しんだん", tags: ["N2", "kanji", "reading"] },
    { front: "乗車\n\n読み方は？\n① じょうしゃ\n② さっそく\n③ かけつ\n④ あこがれる", back: "① じょうしゃ\n乗車 = じょうしゃ", tags: ["N2", "kanji", "reading"] },
    { front: "滝\n\n読み方は？\n① いったん\n② もくじ\n③ げひん\n④ たき", back: "④ たき\n滝 = たき", tags: ["N2", "kanji", "reading"] },
    { front: "御免\n\n読み方は？\n① おそわる\n② ごめん\n③ さらいしゅう\n④ こうつうきかん", back: "② ごめん\n御免 = ごめん", tags: ["N2", "kanji", "reading"] },
    { front: "満点\n\n読み方は？\n① まんてん\n② かそくど\n③ から\n④ ひっしゃ", back: "① まんてん\n満点 = まんてん", tags: ["N2", "kanji", "reading"] },
    { front: "看病\n\n読み方は？\n① どける\n② かんびょう\n③ ざぶとん\n④ ちょうてん", back: "② かんびょう\n看病 = かんびょう", tags: ["N2", "kanji", "reading"] },
    { front: "倉庫\n\n読み方は？\n① ゆけつ\n② ほり\n③ かしや\n④ そうこ", back: "④ そうこ\n倉庫 = そうこ", tags: ["N2", "kanji", "reading"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N1・Kanji Reading
// ═══════════════════════════════════════════

function n1_kanji_reading(): PresetDeck {
  const id = "preset-n1-kanji-reading";
  const deck: Deck = {
    id, name: "N1・Kanji Reading", testType: "N1", practiceMode: "kanji", source: "preset",
    cardCount: 60, createdAt: Date.now(), description: "JLPT N1: Kanji reading (how to read)",
  };
  const cards = makeCards(id, [
    { front: "軽蔑\n\n読み方は？\n① ぬま\n② とじょう\n③ かねて\n④ けいべつ", back: "④ けいべつ\n軽蔑 = けいべつ", tags: ["N1", "kanji", "reading"] },
    { front: "休学\n\n読み方は？\n① こんどう\n② りょうしき\n③ きゅうがく\n④ はれる", back: "③ きゅうがく\n休学 = きゅうがく", tags: ["N1", "kanji", "reading"] },
    { front: "甕\n\n読み方は？\n① きかん\n② かだい\n③ かめ\n④ ていぎ", back: "③ かめ\n甕 = かめ", tags: ["N1", "kanji", "reading"] },
    { front: "手がかり\n\n読み方は？\n① てがかり\n② はぐ\n③ はず\n④ すいせん", back: "① てがかり\n手がかり = てがかり", tags: ["N1", "kanji", "reading"] },
    { front: "不憫\n\n読み方は？\n① ふびん\n② せんしゅう\n③ しょうれい\n④ しゅっせ", back: "① ふびん\n不憫 = ふびん", tags: ["N1", "kanji", "reading"] },
    { front: "粘り\n\n読み方は？\n① とっぱ\n② ねばり\n③ ちょう\n④ さて", back: "② ねばり\n粘り = ねばり", tags: ["N1", "kanji", "reading"] },
    { front: "気象\n\n読み方は？\n① きしょう\n② いじる\n③ しゃめん\n④ そうごう", back: "① きしょう\n気象 = きしょう", tags: ["N1", "kanji", "reading"] },
    { front: "元首\n\n読み方は？\n① じどうし\n② りろん\n③ すぎ\n④ げんしゅ", back: "④ げんしゅ\n元首 = げんしゅ", tags: ["N1", "kanji", "reading"] },
    { front: "軍事\n\n読み方は？\n① きょぜつ\n② るいすい\n③ ぜんせい\n④ ぐんじ", back: "④ ぐんじ\n軍事 = ぐんじ", tags: ["N1", "kanji", "reading"] },
    { front: "際\n\n読み方は？\n① とじる\n② きわ\n③ しぼう\n④ そんしつ", back: "② きわ\n際 = きわ", tags: ["N1", "kanji", "reading"] },
    { front: "対等\n\n読み方は？\n① たいとう\n② おいる\n③ せっかい\n④ じこう", back: "① たいとう\n対等 = たいとう", tags: ["N1", "kanji", "reading"] },
    { front: "地主\n\n読み方は？\n① ちょうかん\n② ぎせい\n③ あらたまる\n④ じぬし", back: "④ じぬし\n地主 = じぬし", tags: ["N1", "kanji", "reading"] },
    { front: "衣料\n\n読み方は？\n① いりょう\n② はらっぱ\n③ けんち\n④ すいそく", back: "① いりょう\n衣料 = いりょう", tags: ["N1", "kanji", "reading"] },
    { front: "戦力\n\n読み方は？\n① よくぶかい\n② なれなれしい\n③ せんりょく\n④ めまい", back: "③ せんりょく\n戦力 = せんりょく", tags: ["N1", "kanji", "reading"] },
    { front: "組み合わせる\n\n読み方は？\n① おしゃべり\n② くみあわせる\n③ はらだち\n④ ていねん", back: "② くみあわせる\n組み合わせる = くみあわせる", tags: ["N1", "kanji", "reading"] },
    { front: "行き違い\n\n読み方は？\n① きょうか\n② こつ\n③ いきちがい\n④ もしかして", back: "③ いきちがい\n行き違い = いきちがい", tags: ["N1", "kanji", "reading"] },
    { front: "証\n\n読み方は？\n① ぼこう\n② ますい\n③ あかし\n④ ないし", back: "③ あかし\n証 = あかし", tags: ["N1", "kanji", "reading"] },
    { front: "昼間\n\n読み方は？\n① おびる\n② ひるま\n③ しゅうき\n④ じょうきゃく", back: "② ひるま\n昼間 = ひるま", tags: ["N1", "kanji", "reading"] },
    { front: "下心\n\n読み方は？\n① したごころ\n② のべ\n③ いりょく\n④ おもむく", back: "① したごころ\n下心 = したごころ", tags: ["N1", "kanji", "reading"] },
    { front: "決行\n\n読み方は？\n① じもと\n② じかた\n③ こん\n④ けっこう", back: "④ けっこう\n決行 = けっこう", tags: ["N1", "kanji", "reading"] },
    { front: "交える\n\n読み方は？\n① おもんじる\n② まじえる\n③ とくは\n④ しょはん", back: "② まじえる\n交える = まじえる", tags: ["N1", "kanji", "reading"] },
    { front: "休める\n\n読み方は？\n① とじょう\n② やすめる\n③ ざつ\n④ きやく", back: "② やすめる\n休める = やすめる", tags: ["N1", "kanji", "reading"] },
    { front: "恐らく\n\n読み方は？\n① それでも\n② おそらく\n③ わたりどり\n④ へんかん", back: "② おそらく\n恐らく = おそらく", tags: ["N1", "kanji", "reading"] },
    { front: "迚も\n\n読み方は？\n① とても\n② ぶれい\n③ おしゃれ\n④ すいそく", back: "① とても\n迚も = とても", tags: ["N1", "kanji", "reading"] },
    { front: "積もり\n\n読み方は？\n① つもり\n② ほうじる\n③ げんば\n④ たまわる", back: "① つもり\n積もり = つもり", tags: ["N1", "kanji", "reading"] },
    { front: "悩み\n\n読み方は？\n① なやみ\n② しあさって\n③ げんぞう\n④ いりぐち", back: "① なやみ\n悩み = なやみ", tags: ["N1", "kanji", "reading"] },
    { front: "姓名\n\n読み方は？\n① さく\n② せいめい\n③ ふりだし\n④ あなた", back: "② せいめい\n姓名 = せいめい", tags: ["N1", "kanji", "reading"] },
    { front: "呉れ呉れも\n\n読み方は？\n① はんぱつ\n② もらす\n③ くれぐれも\n④ みち", back: "③ くれぐれも\n呉れ呉れも = くれぐれも", tags: ["N1", "kanji", "reading"] },
    { front: "鬱陶しい\n\n読み方は？\n① こんばんは\n② ちかづく\n③ うっとうしい\n④ いったい", back: "③ うっとうしい\n鬱陶しい = うっとうしい", tags: ["N1", "kanji", "reading"] },
    { front: "側\n\n読み方は？\n① がわ\n② ひらたい\n③ とても\n④ きょうこう", back: "① がわ\n側 = がわ", tags: ["N1", "kanji", "reading"] },
    { front: "貯蓄\n\n読み方は？\n① おだいじに\n② ほんね\n③ ばち\n④ ちょちく", back: "④ ちょちく\n貯蓄 = ちょちく", tags: ["N1", "kanji", "reading"] },
    { front: "規格\n\n読み方は？\n① りょう\n② かなぼう\n③ きかく\n④ とうみん", back: "③ きかく\n規格 = きかく", tags: ["N1", "kanji", "reading"] },
    { front: "質疑\n\n読み方は？\n① りゃくだつ\n② きゅうでん\n③ しつぎ\n④ もてなす", back: "③ しつぎ\n質疑 = しつぎ", tags: ["N1", "kanji", "reading"] },
    { front: "規模\n\n読み方は？\n① きぼ\n② しっかく\n③ くだらない\n④ じぎょう", back: "① きぼ\n規模 = きぼ", tags: ["N1", "kanji", "reading"] },
    { front: "矢\n\n読み方は？\n① や\n② あとつぎ\n③ しがい\n④ やる", back: "① や\n矢 = や", tags: ["N1", "kanji", "reading"] },
    { front: "悲鳴\n\n読み方は？\n① もはん\n② ちょういん\n③ たいきん\n④ ひめい", back: "④ ひめい\n悲鳴 = ひめい", tags: ["N1", "kanji", "reading"] },
    { front: "円満\n\n読み方は？\n① けいかい\n② えんまん\n③ うちきる\n④ よくぼう", back: "② えんまん\n円満 = えんまん", tags: ["N1", "kanji", "reading"] },
    { front: "ど忘れ\n\n読み方は？\n① どわすれ\n② せんしゅう\n③ そうだい\n④ きょぜつ", back: "① どわすれ\nど忘れ = どわすれ", tags: ["N1", "kanji", "reading"] },
    { front: "覚え\n\n読み方は？\n① てんきん\n② じゃんけん\n③ おぼえ\n④ しかし", back: "③ おぼえ\n覚え = おぼえ", tags: ["N1", "kanji", "reading"] },
    { front: "肝心\n\n読み方は？\n① いじゅう\n② それに\n③ げん\n④ かんじん", back: "④ かんじん\n肝心 = かんじん", tags: ["N1", "kanji", "reading"] },
    { front: "三日月\n\n読み方は？\n① きゅうでん\n② みかづき\n③ ぶんぼ\n④ てんらく", back: "② みかづき\n三日月 = みかづき", tags: ["N1", "kanji", "reading"] },
    { front: "改訂\n\n読み方は？\n① しょくん\n② しつけ\n③ かいてい\n④ やぐ", back: "③ かいてい\n改訂 = かいてい", tags: ["N1", "kanji", "reading"] },
    { front: "象徴\n\n読み方は？\n① ほろびる\n② けいか\n③ こうふ\n④ しょうちょう", back: "④ しょうちょう\n象徴 = しょうちょう", tags: ["N1", "kanji", "reading"] },
    { front: "長\n\n読み方は？\n① おさ\n② おてあげ\n③ こくゆう\n④ かみ", back: "① おさ\n長 = おさ", tags: ["N1", "kanji", "reading"] },
    { front: "内訳\n\n読み方は？\n① おじゃまします\n② ちゅうすう\n③ さんせい\n④ うちわけ", back: "④ うちわけ\n内訳 = うちわけ", tags: ["N1", "kanji", "reading"] },
    { front: "打ち合わせ\n\n読み方は？\n① いたずら\n② おもむき\n③ どだい\n④ うちあわせ", back: "④ うちあわせ\n打ち合わせ = うちあわせ", tags: ["N1", "kanji", "reading"] },
    { front: "処置\n\n読み方は？\n① かすむ\n② あせる\n③ しょち\n④ とうせん", back: "③ しょち\n処置 = しょち", tags: ["N1", "kanji", "reading"] },
    { front: "近々\n\n読み方は？\n① かんこく\n② ちかぢか\n③ かなえる\n④ まねき", back: "② ちかぢか\n近々 = ちかぢか", tags: ["N1", "kanji", "reading"] },
    { front: "天国\n\n読み方は？\n① むすびつき\n② じごく\n③ ろうりょく\n④ てんごく", back: "④ てんごく\n天国 = てんごく", tags: ["N1", "kanji", "reading"] },
    { front: "孤独\n\n読み方は？\n① けいか\n② そうごう\n③ こどく\n④ のうじょう", back: "③ こどく\n孤独 = こどく", tags: ["N1", "kanji", "reading"] },
    { front: "消耗\n\n読み方は？\n① しょうもう\n② ひつぜん\n③ きらびやか\n④ ゆうき", back: "① しょうもう\n消耗 = しょうもう", tags: ["N1", "kanji", "reading"] },
    { front: "関与\n\n読み方は？\n① かんよ\n② じょうか\n③ かたよる\n④ すり", back: "① かんよ\n関与 = かんよ", tags: ["N1", "kanji", "reading"] },
    { front: "逆立ち\n\n読み方は？\n① さかだち\n② こうはい\n③ つげる\n④ てんじる", back: "① さかだち\n逆立ち = さかだち", tags: ["N1", "kanji", "reading"] },
    { front: "福祉\n\n読み方は？\n① ゆうずう\n② ぎあん\n③ ふくし\n④ うけとり", back: "③ ふくし\n福祉 = ふくし", tags: ["N1", "kanji", "reading"] },
    { front: "満たす\n\n読み方は？\n① りょうしん\n② みたす\n③ にくしみ\n④ たいりょく", back: "② みたす\n満たす = みたす", tags: ["N1", "kanji", "reading"] },
    { front: "追跡\n\n読み方は？\n① びょうしゃ\n② ついせき\n③ へそ\n④ てすう", back: "② ついせき\n追跡 = ついせき", tags: ["N1", "kanji", "reading"] },
    { front: "墓地\n\n読み方は？\n① したしらべ\n② ぼち\n③ いなびかり\n④ りょうきょく", back: "② ぼち\n墓地 = ぼち", tags: ["N1", "kanji", "reading"] },
    { front: "滅ぼす\n\n読み方は？\n① しみる\n② しんせい\n③ しゅじんこう\n④ ほろぼす", back: "④ ほろぼす\n滅ぼす = ほろぼす", tags: ["N1", "kanji", "reading"] },
    { front: "退職\n\n読み方は？\n① からむ\n② はんが\n③ たいしょく\n④ てっぺん", back: "③ たいしょく\n退職 = たいしょく", tags: ["N1", "kanji", "reading"] },
    { front: "残高\n\n読み方は？\n① しょむ\n② ふうしゃ\n③ ざんだか\n④ おしむ", back: "③ ざんだか\n残高 = ざんだか", tags: ["N1", "kanji", "reading"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N5・Grammar
// ═══════════════════════════════════════════

function n5_grammar(): PresetDeck {
  const id = "preset-n5-grammar";
  const deck: Deck = {
    id, name: "N5・Grammar", testType: "N5", practiceMode: "grammar", source: "preset",
    cardCount: 25, createdAt: Date.now(), description: "JLPT N5: Grammar pattern selection",
  };
  const cards = makeCards(id, [
    { front: "「〜は〜です」の意味は？\n\n① A is B (polite)\n② shall we V?\n③ to/at (destination, time)\n④ I heard that", back: "① A is B (polite)\nNはNです\n例：私は学生です。\n　　I am a student.", tags: ["N5", "grammar", "select"] },
    { front: "「〜も」の意味は？\n\n① by means of, at (location of action)\n② also, too\n③ want to V\n④ had better V (advice)", back: "② also, too\nNもNです\n例：私も学生です。\n　　I am also a student.", tags: ["N5", "grammar", "select"] },
    { front: "「〜を」の意味は？\n\n① than (comparison)\n② let's V (suggestion)\n③ object particle\n④ let's V (volitional)", back: "③ object particle\nVをV\n例：本を読みます。\n　　I read a book.", tags: ["N5", "grammar", "select"] },
    { front: "「〜に」の意味は？\n\n① to/at (destination, time)\n② object particle\n③ shall we V?\n④ should V (advice)", back: "① to/at (destination, time)\nNにV\n例：学校に行きます。\n　　I go to school.", tags: ["N5", "grammar", "select"] },
    { front: "「〜で」の意味は？\n\n① by means of, at (location of action)\n② intend to V\n③ had better V (advice)\n④ should V (advice)", back: "① by means of, at (location of action)\nNでV\n例：電車で行きます。\n　　I go by train.", tags: ["N5", "grammar", "select"] },
    { front: "「〜てください」の意味は？\n\n① please do V\n② only/just\n③ V-ing (ongoing action / state)\n④ after V-ing", back: "① please do V\nV-て + ください\n例：ここに書いてください。\n　　Please write here.", tags: ["N5", "grammar", "select"] },
    { front: "「〜ている」の意味は？\n\n① V-ing (ongoing action / state)\n② V (past, polite)\n③ to/at (destination, time)\n④ too much V", back: "① V-ing (ongoing action / state)\nV-て + いる\n例：ご飯を食べています。\n　　I am eating rice.", tags: ["N5", "grammar", "select"] },
    { front: "「〜たい」の意味は？\n\n① want to V\n② because (reason)\n③ when/if (conditional)\n④ intend to V", back: "① want to V\nV-ます stem + たい\n例：水が飲みたいです。\n　　I want to drink water.", tags: ["N5", "grammar", "select"] },
    { front: "「〜ましょう」の意味は？\n\n① after V-ing\n② shall we V?\n③ let's V (volitional)\n④ please do V", back: "③ let's V (volitional)\nV-ます stem + ましょう\n例：行きましょう。\n　　Let's go.", tags: ["N5", "grammar", "select"] },
    { front: "「〜ない」の意味は？\n\n① let's V (suggestion)\n② not V (negative)\n③ I heard that\n④ object particle", back: "② not V (negative)\nV-ません\n例：日本語が話せません。\n　　I can't speak Japanese.", tags: ["N5", "grammar", "select"] },
    { front: "「〜から」の意味は？\n\n① please do V\n② when/if (conditional)\n③ because (reason)\n④ intend to V", back: "③ because (reason)\nreason + から\n例：寒いから、コートを着ます。\n　　Because it's cold, I wear a coat.", tags: ["N5", "grammar", "select"] },
    { front: "「〜より」の意味は？\n\n① let's V (volitional)\n② had better V (advice)\n③ than (comparison)\n④ object particle", back: "③ than (comparison)\nNより Nのほうが adjです\n例：東京より大阪が安いです。\n　　Osaka is cheaper than Tokyo.", tags: ["N5", "grammar", "select"] },
    { front: "「〜のに」の意味は？\n\n① had better V (advice)\n② for the purpose of\n③ shall we V?\n④ to/at (destination, time)", back: "② for the purpose of\nV辞書形 + のに\n例：勉強のに使います。\n　　I use it for studying.", tags: ["N5", "grammar", "select"] },
    { front: "「〜と」の意味は？\n\n① object particle\n② when/if (conditional)\n③ had better V (advice)\n④ shall we V?", back: "② when/if (conditional)\nV辞書形 + と\n例：雨が降ると、行きません。\n　　If it rains, I won't go.", tags: ["N5", "grammar", "select"] },
    { front: "「〜すぎる」の意味は？\n\n① after V-ing\n② please do V\n③ too much V\n④ I heard that", back: "③ too much V\nV-ます stem + すぎる\n例：食べすぎました。\n　　I ate too much.", tags: ["N5", "grammar", "select"] },
    { front: "「〜方がいい」の意味は？\n\n① by means of, at (location of action)\n② should V (advice)\n③ had better V (advice)\n④ also, too", back: "② should V (advice)\nV-た + 方がいい\n例：早く寝た方がいいですよ。\n　　You should go to bed early.", tags: ["N5", "grammar", "select"] },
    { front: "「〜と聞く」の意味は？\n\n① let's V (volitional)\n② V (past, polite)\n③ because (reason)\n④ I heard that", back: "④ I heard that\n普通体 + と聞く\n例：彼が来ると聞きました。\n　　I heard that he is coming.", tags: ["N5", "grammar", "select"] },
    { front: "「〜ましょうか」の意味は？\n\n① intend to V\n② because (reason)\n③ want to V\n④ shall we V?", back: "④ shall we V?\nV-ます stem + ましょうか\n例：何を食べましょうか。\n　　What shall we eat?", tags: ["N5", "grammar", "select"] },
    { front: "「〜てから」の意味は？\n\n① after V-ing\n② for the purpose of\n③ please do V\n④ shall we V?", back: "① after V-ing\nV-て + から\n例：食べてから、勉強します。\n　　I'll study after eating.", tags: ["N5", "grammar", "select"] },
    { front: "「〜ることがある」の意味は？\n\n① for the purpose of\n② A is B (polite)\n③ sometimes V\n④ intend to V", back: "③ sometimes V\nV辞書形/ない形 + ことがある\n例：朝ごはんを食べないことがあります。\n　　Sometimes I don't eat breakfast.", tags: ["N5", "grammar", "select"] },
    { front: "「〜つもり」の意味は？\n\n① let's V (suggestion)\n② than (comparison)\n③ intend to V\n④ when/if (conditional)", back: "③ intend to V\nV辞書形 + つもり\n例：明日、東京に行くつもりです。\n　　I intend to go to Tokyo tomorrow.", tags: ["N5", "grammar", "select"] },
    { front: "「〜だけ」の意味は？\n\n① A is B (polite)\n② only/just\n③ because (reason)\n④ want to V", back: "② only/just\nN + だけ\n例：これだけ食べました。\n　　I ate only this.", tags: ["N5", "grammar", "select"] },
    { front: "「〜ほうがいい」の意味は？\n\n① had better V (advice)\n② than (comparison)\n③ A is B (polite)\n④ when/if (conditional)", back: "① had better V (advice)\nV-た + ほうがいい\n例：医者に行ったほうがいいです。\n　　You'd better see a doctor.", tags: ["N5", "grammar", "select"] },
    { front: "「〜ました」の意味は？\n\n① let's V (volitional)\n② please do V\n③ V (past, polite)\n④ let's V (suggestion)", back: "③ V (past, polite)\nV-ました\n例：昨日、映画を見ました。\n　　I saw a movie yesterday.", tags: ["N5", "grammar", "select"] },
    { front: "「〜ましょう」の意味は？\n\n① after V-ing\n② by means of, at (location of action)\n③ when/if (conditional)\n④ let's V (suggestion)", back: "④ let's V (suggestion)\nV-ます stem + ましょう\n例：一緒に帰りましょう。\n　　Let's go home together.", tags: ["N5", "grammar", "select"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N4・Grammar
// ═══════════════════════════════════════════

function n4_grammar(): PresetDeck {
  const id = "preset-n4-grammar";
  const deck: Deck = {
    id, name: "N4・Grammar", testType: "N4", practiceMode: "grammar", source: "preset",
    cardCount: 20, createdAt: Date.now(), description: "JLPT N4: Grammar pattern selection",
  };
  const cards = makeCards(id, [
    { front: "「〜ようと思います」の意味は？\n\n① might/maybe\n② because (softer than から)\n③ has been V-ing (continuation)\n④ I think I'll V (volition)", back: "④ I think I'll V (volition)\nV-よう + と思う\n例：来年、日本に行こうと思っています。\n　　I'm thinking of going to Japan next year.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ことができる」の意味は？\n\n① reach the point of V-ing\n② only/nothing but V\n③ looks like/seems\n④ can V (potential)", back: "④ can V (potential)\nV辞書形 + ことができる\n例：日本語が話すことができます。\n　　I can speak Japanese.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ておく」の意味は？\n\n① if/when V (conditional)\n② has been V-ing (continuation)\n③ while V-ing\n④ do V in advance", back: "④ do V in advance\nV-て + おく\n例：切符を買っておきます。\n　　I'll buy the ticket in advance.", tags: ["N4", "grammar", "select"] },
    { front: "「〜てみる」の意味は？\n\n① reach the point of V-ing\n② might/maybe\n③ can V (potential)\n④ try V-ing", back: "④ try V-ing\nV-て + みる\n例：食べてみてください。\n　　Please try eating it.", tags: ["N4", "grammar", "select"] },
    { front: "「〜てしまう」の意味は？\n\n① reach the point of V-ing\n② has been V-ing (continuation)\n③ do V completely / regrettably\n④ only/nothing but V", back: "③ do V completely / regrettably\nV-て + しまう\n例：全部食べてしまった。\n　　I ate it all (regret/unintentional).", tags: ["N4", "grammar", "select"] },
    { front: "「〜ばかり」の意味は？\n\n① if V (conditional, hypothetical)\n② only/nothing but V\n③ I hope V / it would be nice if\n④ while V-ing", back: "② only/nothing but V\nV-て + ばかり\n例：遊んでばかりいる。\n　　He does nothing but play.", tags: ["N4", "grammar", "select"] },
    { front: "「〜みたい」の意味は？\n\n① don't have to V\n② looks like/seems\n③ can V (potential)\n④ while V-ing", back: "② looks like/seems\nN/普通体 + みたい\n例：雨みたいです。\n　　It looks like rain.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ので」の意味は？\n\n① I think I'll V (volition)\n② I hope V / it would be nice if\n③ go and come back / will V from now\n④ because (softer than から)", back: "④ because (softer than から)\n普通体 + ので\n例：暑いので、窓を開けます。\n　　Because it's hot, I'll open the window.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ながら」の意味は？\n\n① decide to V\n② while V-ing\n③ I think I'll V (volition)\n④ make it a rule to V", back: "② while V-ing\nV-ます stem + ながら\n例：音楽を聞きながら勉強します。\n　　I study while listening to music.", tags: ["N4", "grammar", "select"] },
    { front: "「〜し」の意味は？\n\n① only/nothing but V\n② moreover/and (reasons)\n③ has been V-ing (continuation)\n④ if V (conditional, hypothetical)", back: "② moreover/and (reasons)\n普通体 + し\n例：安いし、おいしいし、この店が好きです。\n　　It's cheap and tasty, so I like this restaurant.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ようになる」の意味は？\n\n① decide to V\n② I hope V / it would be nice if\n③ reach the point of V-ing\n④ make it a rule to V", back: "③ reach the point of V-ing\nV可能形 + ようになる\n例：日本語が話せるようになりました。\n　　I've become able to speak Japanese.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ことにする」の意味は？\n\n① decide to V\n② go and come back / will V from now\n③ because (softer than から)\n④ I hope V / it would be nice if", back: "① decide to V\nV辞書形/ない形 + ことにする\n例：明日、早く起きることにしました。\n　　I decided to get up early tomorrow.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ことにしている」の意味は？\n\n① make it a rule to V\n② moreover/and (reasons)\n③ because (softer than から)\n④ might/maybe", back: "① make it a rule to V\nV辞書形 + ことにしている\n例：毎朝6時に起きることにしています。\n　　I make it a rule to wake up at 6.", tags: ["N4", "grammar", "select"] },
    { front: "「〜たら」の意味は？\n\n① if/when V (conditional)\n② can V (potential)\n③ decide to V\n④ make it a rule to V", back: "① if/when V (conditional)\nV-たら\n例：雨が降ったら、行きません。\n　　If it rains, I won't go.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ば」の意味は？\n\n① I think I'll V (volition)\n② if V (conditional, hypothetical)\n③ do V completely / regrettably\n④ has been V-ing (continuation)", back: "② if V (conditional, hypothetical)\nV-ば\n例：安ければ、買います。\n　　If it's cheap, I'll buy it.", tags: ["N4", "grammar", "select"] },
    { front: "「〜といい」の意味は？\n\n① decide to V\n② I hope V / it would be nice if\n③ make it a rule to V\n④ do V completely / regrettably", back: "② I hope V / it would be nice if\nV辞書形 + といい\n例：晴れるといいですね。\n　　I hope it's sunny.", tags: ["N4", "grammar", "select"] },
    { front: "「〜かもしれない」の意味は？\n\n① only/nothing but V\n② decide to V\n③ try V-ing\n④ might/maybe", back: "④ might/maybe\n普通体 + かもしれない\n例：明日、雪が降るかもしれません。\n　　It might snow tomorrow.", tags: ["N4", "grammar", "select"] },
    { front: "「〜ていきました」の意味は？\n\n① because (softer than から)\n② I think I'll V (volition)\n③ might/maybe\n④ has been V-ing (continuation)", back: "④ has been V-ing (continuation)\nV-て + いく\n例：ずっと日本語を勉強してきました。\n　　I have been studying Japanese.", tags: ["N4", "grammar", "select"] },
    { front: "「〜てきます」の意味は？\n\n① I hope V / it would be nice if\n② I think I'll V (volition)\n③ go and come back / will V from now\n④ decide to V", back: "③ go and come back / will V from now\nV-て + くる\n例：買ってきます。\n　　I'll go buy it and come back.", tags: ["N4", "grammar", "select"] },
    { front: "「〜なくてもいい」の意味は？\n\n① don't have to V\n② has been V-ing (continuation)\n③ do V completely / regrettably\n④ while V-ing", back: "① don't have to V\nV-ない形 + なくてもいい\n例：行かなくてもいいです。\n　　You don't have to go.", tags: ["N4", "grammar", "select"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N3・Grammar
// ═══════════════════════════════════════════

function n3_grammar(): PresetDeck {
  const id = "preset-n3-grammar";
  const deck: Deck = {
    id, name: "N3・Grammar", testType: "N3", practiceMode: "grammar", source: "preset",
    cardCount: 20, createdAt: Date.now(), description: "JLPT N3: Grammar pattern selection",
  };
  const cards = makeCards(id, [
    { front: "「〜おそれがある」の意味は？\n\n① on the other hand\n② whether or not\n③ there is a fear/risk of\n④ cannot help but V", back: "③ there is a fear/risk of\nNの/V辞書形 + おそれがある\n例：事故の恐れがある。\n　　There is a risk of an accident.", tags: ["N3", "grammar", "select"] },
    { front: "「〜に違いない」の意味は？\n\n① must be / no doubt\n② through/throughout\n③ in accordance with\n④ now that / since", back: "① must be / no doubt\n普通体 + に違いない\n例：彼は絶対に来るに違いない。\n　　He will definitely come.", tags: ["N3", "grammar", "select"] },
    { front: "「〜ざるを得ない」の意味は？\n\n① although/despite\n② rather than\n③ cannot help but V\n④ gradually V-ing", back: "③ cannot help but V\nV-ない stem + ざるを得ない\n例：謝らざるを得ない。\n　　I have no choice but to apologize.", tags: ["N3", "grammar", "select"] },
    { front: "「〜かねない」の意味は？\n\n① on the other hand\n② might (negative possibility)\n③ although/despite\n④ surrounding/over N", back: "② might (negative possibility)\nV-ます stem + かねない\n例：彼ならやりかねない。\n　　He might just do it (and that's bad).", tags: ["N3", "grammar", "select"] },
    { front: "「〜つつある」の意味は？\n\n① there is a fear/risk of\n② without V-ing\n③ gradually V-ing\n④ surrounding/over N", back: "③ gradually V-ing\nV-ます stem + つつある\n例：景気は回復しつつある。\n　　The economy is gradually recovering.", tags: ["N3", "grammar", "select"] },
    { front: "「〜ことなく」の意味は？\n\n① cannot V (social/moral reason)\n② must be / no doubt\n③ without V-ing\n④ through/during (period)", back: "③ without V-ing\nV辞書形 + ことなく\n例：諦めることなく続けた。\n　　I continued without giving up.", tags: ["N3", "grammar", "select"] },
    { front: "「〜わけにはいかない」の意味は？\n\n① on the other hand\n② whether or not\n③ without V-ing\n④ cannot V (social/moral reason)", back: "④ cannot V (social/moral reason)\nV辞書形 + わけにはいかない\n例：約束したので、行かないわけにはいかない。\n　　I promised, so I can't not go.", tags: ["N3", "grammar", "select"] },
    { front: "「〜かのようだ」の意味は？\n\n① on the other hand\n② based on\n③ as if / seems like\n④ through/during (period)", back: "③ as if / seems like\n普通体 + かのようだ\n例：夢を見ているかのようだ。\n　　It's as if I'm dreaming.", tags: ["N3", "grammar", "select"] },
    { front: "「〜を通じて」の意味は？\n\n① while V-ing (literary)\n② through/throughout\n③ whether or not\n④ in accordance with", back: "② through/throughout\nN + を通じて\n例：経験を通じて学ぶ。\n　　Learn through experience.", tags: ["N3", "grammar", "select"] },
    { front: "「〜をめぐって」の意味は？\n\n① through/during (period)\n② cannot help but V\n③ surrounding/over N\n④ although/despite", back: "③ surrounding/over N\nN + をめぐって\n例：環境問題をめぐって議論する。\n　　Debate over environmental issues.", tags: ["N3", "grammar", "select"] },
    { front: "「〜に基づいて」の意味は？\n\n① rather than\n② through/during (period)\n③ based on\n④ there is a fear/risk of", back: "③ based on\nN + に基づいて\n例：データに基づいて判断する。\n　　Judge based on data.", tags: ["N3", "grammar", "select"] },
    { front: "「〜反面」の意味は？\n\n① while V-ing (literary)\n② on the other hand\n③ there is a fear/risk of\n④ rather than", back: "② on the other hand\n普通体/N + 反面\n例：便利な反面、危険だ。\n　　Convenient, but on the other hand dangerous.", tags: ["N3", "grammar", "select"] },
    { front: "「〜に代わって」の意味は？\n\n① through/throughout\n② in accordance with\n③ instead of / on behalf of\n④ might (negative possibility)", back: "③ instead of / on behalf of\nN + に代わって\n例：社長に代わって挨拶する。\n　　Greet on behalf of the president.", tags: ["N3", "grammar", "select"] },
    { front: "「〜にかけて」の意味は？\n\n① through/during (period)\n② now that / since\n③ in accordance with\n④ surrounding/over N", back: "① through/during (period)\nN + にかけて\n例：夏にかけて忙しい。\n　　Busy through the summer.", tags: ["N3", "grammar", "select"] },
    { front: "「〜というより」の意味は？\n\n① without V-ing\n② although/despite\n③ rather than\n④ might (negative possibility)", back: "③ rather than\n普通体/N + というより\n例：賢いというより、努力家だ。\n　　Rather than smart, she's hardworking.", tags: ["N3", "grammar", "select"] },
    { front: "「〜ものの」の意味は？\n\n① whether or not\n② surrounding/over N\n③ gradually V-ing\n④ although/despite", back: "④ although/despite\nV-た + ものの\n例：挑戦したものの、失敗した。\n　　Although I tried, I failed.", tags: ["N3", "grammar", "select"] },
    { front: "「〜つつ」の意味は？\n\n① rather than\n② while V-ing (literary)\n③ surrounding/over N\n④ as if / seems like", back: "② while V-ing (literary)\nV-ます stem + つつ\n例：問題を抱えつつ前進する。\n　　Moving forward while having problems.", tags: ["N3", "grammar", "select"] },
    { front: "「〜かどうか」の意味は？\n\n① in accordance with\n② whether or not\n③ although/despite\n④ must be / no doubt", back: "② whether or not\n普通体 + かどうか\n例：行くかどうか決めてください。\n　　Please decide whether to go or not.", tags: ["N3", "grammar", "select"] },
    { front: "「〜に応じて」の意味は？\n\n① whether or not\n② through/during (period)\n③ there is a fear/risk of\n④ in accordance with", back: "④ in accordance with\nN + に応じて\n例：需要に応じて生産する。\n　　Produce in accordance with demand.", tags: ["N3", "grammar", "select"] },
    { front: "「〜からには」の意味は？\n\n① must be / no doubt\n② now that / since\n③ cannot V (social/moral reason)\n④ gradually V-ing", back: "② now that / since\n普通体 + からには\n例：約束したからには守る。\n　　Now that I promised, I'll keep it.", tags: ["N3", "grammar", "select"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N2・Grammar
// ═══════════════════════════════════════════

function n2_grammar(): PresetDeck {
  const id = "preset-n2-grammar";
  const deck: Deck = {
    id, name: "N2・Grammar", testType: "N2", practiceMode: "grammar", source: "preset",
    cardCount: 15, createdAt: Date.now(), description: "JLPT N2: Grammar pattern selection",
  };
  const cards = makeCards(id, [
    { front: "「〜かねる」の意味は？\n\n① starting with / beginning with\n② cannot easily V (polite hesitation)\n③ can't help V-ing\n④ regardless of / ignoring", back: "② cannot easily V (polite hesitation)\nV-ます stem + かねる\n例：そうは申し上げかねます。\n　　I'm afraid I cannot say so.", tags: ["N2", "grammar", "select"] },
    { front: "「〜ずにはいられない」の意味は？\n\n① starting with / beginning with\n② combined with / compounded by\n③ as soon as (repeated negative)\n④ can't help V-ing", back: "④ can't help V-ing\nV-ない stem + ずにはいられない\n例：笑わずにはいられない。\n　　I can't help laughing.", tags: ["N2", "grammar", "select"] },
    { front: "「〜てやまない」の意味は？\n\n① unbecoming / improper\n② starting with / beginning with\n③ cannot bear / intolerable\n④ V endlessly (strong emotion)", back: "④ V endlessly (strong emotion)\nV-て + やまない\n例：期待してやまない。\n　　I hope endlessly.", tags: ["N2", "grammar", "select"] },
    { front: "「〜いかんで」の意味は？\n\n① V endlessly (strong emotion)\n② depending on\n③ while doing A, also B\n④ even though (regret)", back: "② depending on\nN + いかんで\n例：結果いかんで決まる。\n　　It depends on the result.", tags: ["N2", "grammar", "select"] },
    { front: "「〜をよそに」の意味は？\n\n① even though (regret)\n② in order to V (formal)\n③ cannot easily V (polite hesitation)\n④ regardless of / ignoring", back: "④ regardless of / ignoring\nN + をよそに\n例：忠告をよそに暴走する。\n　　Speed ahead ignoring the warning.", tags: ["N2", "grammar", "select"] },
    { front: "「〜そばから」の意味は？\n\n① cannot easily V (polite hesitation)\n② unbecoming / improper\n③ even though (regret)\n④ as soon as (repeated negative)", back: "④ as soon as (repeated negative)\nV辞書形/た形 + そばから\n例：片付けるそばから散らかす。\n　　Making a mess right after cleaning up.", tags: ["N2", "grammar", "select"] },
    { front: "「〜にたえない」の意味は？\n\n① depending on\n② starting with / beginning with\n③ cannot bear / intolerable\n④ even though (regret)", back: "③ cannot bear / intolerable\nV辞書形 + にたえない\n例：見るにたえない。\n　　Unbearable to look at.", tags: ["N2", "grammar", "select"] },
    { front: "「〜ともなく」の意味は？\n\n① starting with / beginning with\n② without particular intention\n③ while doing A, also B\n④ V endlessly (strong emotion)", back: "② without particular intention\nV辞書形 + ともなく\n例：見るともなくテレビを見る。\n　　Watch TV without really intending to.", tags: ["N2", "grammar", "select"] },
    { front: "「〜まじき」の意味は？\n\n① unbecoming / improper\n② cannot bear / intolerable\n③ as soon as (repeated negative)\n④ combined with / compounded by", back: "① unbecoming / improper\nN + にあるまじき + N\n例：教師にあるまじき行為。\n　　Behavior unbecoming of a teacher.", tags: ["N2", "grammar", "select"] },
    { front: "「〜かたわら」の意味は？\n\n① unbecoming / improper\n② depending on\n③ even though (regret)\n④ while doing A, also B", back: "④ while doing A, also B\nV辞書形/N + のかたわら\n例：会社員のかたわら作家として活躍する。\n　　Active as a writer while being a company employee.", tags: ["N2", "grammar", "select"] },
    { front: "「〜とあいまって」の意味は？\n\n① combined with / compounded by\n② without particular intention\n③ even though (regret)\n④ starting with / beginning with", back: "① combined with / compounded by\nN + とあいまって\n例：好天とあいまって観光客が急増した。\n　　Good weather combined with a surge in tourists.", tags: ["N2", "grammar", "select"] },
    { front: "「〜を皮切りに」の意味は？\n\n① starting with / beginning with\n② cannot easily V (polite hesitation)\n③ V endlessly (strong emotion)\n④ about to V / on the verge of", back: "① starting with / beginning with\nN + を皮切りに\n例：東京を皮切りに全国ツアーを始める。\n　　Start a national tour beginning with Tokyo.", tags: ["N2", "grammar", "select"] },
    { front: "「〜んばかりに」の意味は？\n\n① cannot easily V (polite hesitation)\n② V endlessly (strong emotion)\n③ depending on\n④ about to V / on the verge of", back: "④ about to V / on the verge of\nV-ない stem + んばかりに\n例：泣かんばかりに謝った。\n　　Apologized almost in tears.", tags: ["N2", "grammar", "select"] },
    { front: "「〜べく」の意味は？\n\n① in order to V (formal)\n② can't help V-ing\n③ starting with / beginning with\n④ about to V / on the verge of", back: "① in order to V (formal)\nV辞書形 + べく\n例：合格すべく勉強する。\n　　Study in order to pass.", tags: ["N2", "grammar", "select"] },
    { front: "「〜ものを」の意味は？\n\n① even though (regret)\n② as soon as (repeated negative)\n③ can't help V-ing\n④ about to V / on the verge of", back: "① even though (regret)\n普通体 + ものを\n例：連絡すればよかったものを。\n　　I should have contacted you...", tags: ["N2", "grammar", "select"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N1・Grammar
// ═══════════════════════════════════════════

function n1_grammar(): PresetDeck {
  const id = "preset-n1-grammar";
  const deck: Deck = {
    id, name: "N1・Grammar", testType: "N1", practiceMode: "grammar", source: "preset",
    cardCount: 15, createdAt: Date.now(), description: "JLPT N1: Grammar pattern selection",
  };
  const cards = makeCards(id, [
    { front: "「〜にほかならない」の意味は？\n\n① because of / due to (formal)\n② regardless of\n③ nothing but / exactly\n④ be forced to (unwillingly)", back: "③ nothing but / exactly\nN/普通体 + にほかならない\n例：これは努力の結果にほかならない。\n　　This is nothing but the result of effort.", tags: ["N1", "grammar", "select"] },
    { front: "「〜を余儀なくされる」の意味は？\n\n① even if (formal concessive)\n② be forced to (unwillingly)\n③ because of / due to (formal)\n④ once V, then (negative result)", back: "② be forced to (unwillingly)\nN + を余儀なくされる\n例：撤退を余儀なくされた。\n　　Was forced to withdraw.", tags: ["N1", "grammar", "select"] },
    { front: "「〜んがため」の意味は？\n\n① even if (formal concessive)\n② for the purpose of V (formal/literary)\n③ entirely / all (color/condition)\n④ once V, then (negative result)", back: "② for the purpose of V (formal/literary)\nV-ない stem + んがため\n例：勝たんがための策略。\n　　A strategy for the purpose of winning.", tags: ["N1", "grammar", "select"] },
    { front: "「〜ともなれば」の意味は？\n\n① with N approaching/behind\n② if it comes to / when it's\n③ once V, then (negative result)\n④ in accordance with (facts)", back: "② if it comes to / when it's\nN + ともなれば\n例：社長ともなれば責任が重い。\n　　If you become president, the responsibility is heavy.", tags: ["N1", "grammar", "select"] },
    { front: "「〜たるところで」の意味は？\n\n① even if V (formal concessive)\n② once V, then (negative result)\n③ entirely / all (color/condition)\n④ because of / due to (formal)", back: "① even if V (formal concessive)\nV-た形 + ところで\n例：急いだところで間に合わない。\n　　Even if I rush, I won't make it.", tags: ["N1", "grammar", "select"] },
    { front: "「〜いかんによらず」の意味は？\n\n① for the purpose of V (formal/literary)\n② even (minimum, formal)\n③ regardless of\n④ in accordance with (facts)", back: "③ regardless of\nN + いかんによらず\n例：結果いかんによらず挑戦する。\n　　Regardless of the result, I will try.", tags: ["N1", "grammar", "select"] },
    { front: "「〜に即して」の意味は？\n\n① for the purpose of V (formal/literary)\n② be forced to (unwillingly)\n③ in accordance with (facts)\n④ even if V (formal concessive)", back: "③ in accordance with (facts)\nN + に即して\n例：事実に即して報告する。\n　　Report based on the facts.", tags: ["N1", "grammar", "select"] },
    { front: "「〜ゆえに」の意味は？\n\n① because of / due to (formal)\n② nothing but / exactly\n③ even (minimum, formal)\n④ even if (formal concessive)", back: "① because of / due to (formal)\nN/普通体 + ゆえに\n例：貧困ゆえに教育を受けられない。\n　　Cannot receive education due to poverty.", tags: ["N1", "grammar", "select"] },
    { front: "「〜ずくめ」の意味は？\n\n① entirely / all (color/condition)\n② be forced to (unwillingly)\n③ at/in/by (formal で/に)\n④ for the purpose of V (formal/literary)", back: "① entirely / all (color/condition)\nN + ずくめ\n例：いいことずくめの一年。\n　　A year full of good things.", tags: ["N1", "grammar", "select"] },
    { front: "「〜とも」の意味は？\n\n① with N approaching/behind\n② regardless of\n③ even if (formal concessive)\n④ in accordance with (facts)", back: "③ even if (formal concessive)\nV意向形 + とも\n例：困難とも諦めない。\n　　Even if it's difficult, I won't give up.", tags: ["N1", "grammar", "select"] },
    { front: "「〜にて」の意味は？\n\n① at/in/by (formal で/に)\n② entirely / all (color/condition)\n③ for the purpose of V (formal/literary)\n④ once V, then (negative result)", back: "① at/in/by (formal で/に)\nN + にて\n例：会議にて決定する。\n　　Decide at the meeting.", tags: ["N1", "grammar", "select"] },
    { front: "「〜だに」の意味は？\n\n① with N approaching/behind\n② once V, then (negative result)\n③ even (minimum, formal)\n④ for the purpose of V (formal/literary)", back: "③ even (minimum, formal)\nV辞書形/N + だに\n例：想像だにしなかった。\n　　Didn't even imagine.", tags: ["N1", "grammar", "select"] },
    { front: "「〜を控えて」の意味は？\n\n① once V, then (negative result)\n② regardless of\n③ even if (formal concessive)\n④ with N approaching/behind", back: "④ with N approaching/behind\nN + を控えて\n例：試験を控えて勉強に励む。\n　　Study hard with exams approaching.", tags: ["N1", "grammar", "select"] },
    { front: "「〜極まりない」の意味は？\n\n① be forced to (unwillingly)\n② with N approaching/behind\n③ for the purpose of V (formal/literary)\n④ extremely (formal)", back: "④ extremely (formal)\nNa-stem/N + 極まりない\n例：失礼極まりない態度。\n　　Extremely rude attitude.", tags: ["N1", "grammar", "select"] },
    { front: "「〜たが最後」の意味は？\n\n① for the purpose of V (formal/literary)\n② extremely (formal)\n③ once V, then (negative result)\n④ nothing but / exactly", back: "③ once V, then (negative result)\nV-た形 + が最後\n例：始めたが最後、止まらない。\n　　Once started, it won't stop.", tags: ["N1", "grammar", "select"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// BJT・Keigo & Honorifics
// ═══════════════════════════════════════════

function bjt_keigo(): PresetDeck {
  const id = "preset-bjt-keigo";
  const deck: Deck = {
    id, name: "BJT・Keigo & Honorifics", testType: "BJT", practiceMode: "vocabulary", source: "preset",
    cardCount: 20, createdAt: Date.now(), description: "BJT: Business honorifics & polite expressions",
  };
  const cards = makeCards(id, [
    { front: "「確認する」の尊敬語は？\n①ご確認になる ②お確認する ③確認される ④確認いただく", back: "①ご確認になる\n相手の動作→尊敬語。「お/ご〜になる」", tags: ["BJT", "keigo", "sonkei"] },
    { front: "「見る」の謙譲語は？\n①ご覧になる ②拝見する ③お見えになる ④見られる", back: "②拝見する\n自分の動作→謙譲語。「拝見する」", tags: ["BJT", "keigo", "kenjou"] },
    { front: "「言う」の尊敬語は？\n①申す ②おっしゃる ③伺う ④申し上げる", back: "②おっしゃる\n相手の「言う」→おっしゃる。申す＝謙譲語", tags: ["BJT", "keigo", "sonkei"] },
    { front: "「来る」の尊敬語は？\n①参る ②いらっしゃる ③伺う ④お越しになる", back: "②いらっしゃる\n相手の「来る」→いらっしゃる/お越しになる", tags: ["BJT", "keigo", "sonkei"] },
    { front: "「食べる」の尊敬語は？\n①いただく ②召し上がる ③お食べになる ④②も③も正しい", back: "④②も③も正しい\n召し上がる・お食べになる 両方＝尊敬語", tags: ["BJT", "keigo", "sonkei"] },
    { front: "「思う」の謙譲語は？\n①お思いになる ②存じる ③お考えになる ④思われる", back: "②存じる\n自分の「思う」→存じる（謙譲語）", tags: ["BJT", "keigo", "kenjou"] },
    { front: "自社を指す言葉は？\n①御社 ②弊社 ③当社 ④貴社", back: "②弊社\n自社＝弊社（へいしゃ）。御社＝相手の会社", tags: ["BJT", "keigo", "sonkei"] },
    { front: "「聞く」の謙譲語は？\n①お聞きになる ②伺う ③ご覧になる ④お伺いになる", back: "②伺う\n自分の「聞く」→伺う（謙譲語）", tags: ["BJT", "keigo", "kenjou"] },
    { front: "「行く」の謙譲語は？\n①いらっしゃる ②参る ③おいでになる ④伺う", back: "②参る\n自分の「行く」→参る（謙譲語）", tags: ["BJT", "keigo", "kenjou"] },
    { front: "「書く」の謙譲語は？\n①お書きになる ②書かれる ③申し書く ④お書き申し上げる", back: "④お書き申し上げる\n「お/ご〜申し上げる」＝謙譲語（最も丁寧）", tags: ["BJT", "keigo", "kenjou"] },
    { front: "「知っている」の尊敬語は？\n①存じている ②ご存知だ ③存じ上げている ④お知りだ", back: "②ご存じだ\n相手の「知っている」→ご存知。存じている＝謙譲語", tags: ["BJT", "keigo", "sonkei"] },
    { front: "「寝る」の尊敬語は？\n①お休みになる ②休ませる ③お休みいただく ④お眠りになる", back: "①お休みになる\n相手の「寝る」→お休みになる", tags: ["BJT", "keigo", "sonkei"] },
    { front: "「もらう」の謙譲語は？\n①おもらいになる ②いただく ③お受けになる ④くださる", back: "②いただく\n自分がもらう→いただく（謙譲語）", tags: ["BJT", "keigo", "kenjou"] },
    { front: "「くれる」の尊敬語は？\n①くださる ②いただく ③おくれるになる ④さしあげる", back: "①くださる\n相手がくれる→くださる（尊敬語）", tags: ["BJT", "keigo", "sonkei"] },
    { front: "二重敬語として不適切なのは？\n①お越しになられる ②ご覧になる ③お召しになる ④いらっしゃる", back: "①お越しになられる\n「お越しになる」＝尊敬語済み。「なられる」＝二重敬語で不適切", tags: ["BJT", "keigo", "error"] },
    { front: "「〜てください」の丁寧な言い換えは？\n①〜してくださいませ ②〜していただけますか ③お/ご〜いただけますか ④〜してほしい", back: "③お/ご〜いただけますか\n最も丁寧な依頼表現", tags: ["BJT", "keigo", "teinei"] },
    { front: "取引先に「社長」を言う敬語は？\n①社長様 ②代表取締役 ③社長 ④〇〇社社長", back: "③社長\n「社長」自体が敬称。様をつけるのは二重敬語。相手の社長は「〇〇社 社長」", tags: ["BJT", "keigo", "business"] },
    { front: "「明日、打ち合わせをお願いしたい」の丁寧な表現は？\n①打ち合わせお願いします ②打ち合わせをお願いできませんか ③お打ち合わせをお願いしたく存じます ④打ち合わせしてほしい", back: "③お打ち合わせをお願いしたく存じます\n「お/ご〜したく存じます」＝最も丁寧な依頼", tags: ["BJT", "keigo", "business"] },
    { front: "「ご苦労様」の正しい使い方は？\n①取引先に言う ②上司に言う ③部下に言う ④客に言う", back: "③部下に言う\nご苦労様＝目下に対する言葉。目上には「お疲れ様」", tags: ["BJT", "keigo", "business"] },
    { front: "「申します」は誰の動作？\n①相手の動作 ②自分の動作 ③第三者の動作 ④誰でも使える", back: "②自分の動作\n申す＝謙譲語。自分の動作をへりくだる", tags: ["BJT", "keigo", "kenjou"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N5 READING
// ═══════════════════════════════════════════

function n5_reading_short(): PresetDeck {
  const id = "preset-n5-reading-short";
  const deck: Deck = {
    id, name: "N5・Reading (Short)", testType: "N5", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N5: Reading comprehension — short passages (~80 chars)",
  };
  const cards = makeCards(id, [
    { front: "田中さんは毎朝7時に起きます。朝ごはんを食べて、8時に家を出ます。会社は9時からです。\n\nQ: 田中さんは何時に家を出ますか。\n①6時 ②7時 ③8時 ④9時", back: "③8時\n「8時に家を出ます」", tags: ["N5","reading","short"] },
    { front: "私の町に新しいスーパーができました。とても大きくて、何でも売っています。昨日、りんごを買いました。\n\nQ: 何ができましたか。\n①学校 ②スーパー ③公園 ④病院", back: "②スーパー\n「新しいスーパーができました」", tags: ["N5","reading","short"] },
    { front: "今日は友達の誕生日です。私はプレゼントを買いました。夜、友達の家でパーティーがあります。\n\nQ: 今日は何がありますか。\n①テスト ②旅行 ③パーティー ④会議", back: "③パーティー\n「友達の家でパーティーがあります」", tags: ["N5","reading","short"] },
    { front: "山田さんは先週、東京から大阪に引っ越しました。大阪は食べ物がおいしいです。でも、東京の友達に会えなくて、少し寂しいです。\n\nQ: 山田さんは今どこに住んでいますか。\n①東京 ②大阪 ③京都 ④名古屋", back: "②大阪\n「大阪に引っ越しました」→現在は大阪", tags: ["N5","reading","short"] },
    { front: "私は毎日、電車で大学に行きます。30分ぐらいかかります。電車の中でよく本を読みます。\n\nQ: 大学までどのぐらいかかりますか。\n①10分 ②20分 ③30分 ④1時間", back: "③30分\n「30分ぐらいかかります」", tags: ["N5","reading","short"] },
  ]);
  return { deck, cards };
}

function n5_info_retrieval(): PresetDeck {
  const id = "preset-n5-info-retrieval";
  const deck: Deck = {
    id, name: "N5・Info Retrieval", testType: "N5", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N5: Information retrieval from notices/adverts",
  };
  const cards = makeCards(id, [
    { front: "【お知らせ】\n図書館の休み：毎週月曜日\n開館時間：9:00〜18:00\n\nQ: 図書館は何曜日が休みですか。\n①日曜日 ②月曜日 ③土曜日 ④金曜日", back: "②月曜日", tags: ["N5","reading","info"] },
    { front: "【メニュー】\nラーメン 700円\nカレー 600円\nうどん 500円\n\nQ: いちばん安いのはどれですか。\n①ラーメン ②カレー ③うどん ④どれも同じ", back: "③うどん（500円）", tags: ["N5","reading","info"] },
    { front: "【クラス】\n日本語1: 月・水 10:00-11:30\n日本語2: 火・木 13:00-14:30\n\nQ: 日本語2は何曜日ですか。\n①月・水 ②火・木 ③月・金 ④水・金", back: "②火・木", tags: ["N5","reading","info"] },
    { front: "【天気予報】\n東京：晴れ 25℃\n大阪：曇り 22℃\n札幌：雨 15℃\n\nQ: いちばん寒いのはどこですか。\n①東京 ②大阪 ③札幌 ④同じ", back: "③札幌（15℃）", tags: ["N5","reading","info"] },
    { front: "【バス時刻表】\n駅前行き：毎時 00, 15, 30, 45分発\n\nQ: 10時台のバスは何時何分にありますか。\n①10:00 ②10:10 ③10:20 ④10:25", back: "①10:00（毎時00分）", tags: ["N5","reading","info"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N4 READING
// ═══════════════════════════════════════════

function n4_reading_mid(): PresetDeck {
  const id = "preset-n4-reading-mid";
  const deck: Deck = {
    id, name: "N4・Reading (Mid)", testType: "N4", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N4: Mid-size reading passages (~450 chars)",
  };
  const cards = makeCards(id, [
    { front: "私は週末によく料理をします。一人暮らしを始めたときは、何も作れませんでした。でも、料理の本を買って、少しずつ練習しました。今では、友達を家に呼んで、一緒に食事をすることが楽しみです。\n\nQ: この人は料理ができるようになるために何をしましたか。\n①料理教室に行った ②母親に教えてもらった ③料理の本を買った ④外食をやめた", back: "③料理の本を買った\n「料理の本を買って、少しずつ練習しました」", tags: ["N4","reading","mid"] },
    { front: "日本の夏はとても蒸し暑いです。特に7月と8月は気温が35度を超えることもあります。そのため、熱中症にならないように、こまめに水分をとることが大切です。\n\nQ: 筆者が言いたいことは何ですか。\n①日本の夏は短い ②夏は外に出ないほうがいい ③水分をよくとることが大切 ④気温は35度以下だ", back: "③水分をよくとることが大切\n「こまめに水分をとることが大切」", tags: ["N4","reading","mid"] },
    { front: "鈴木さんは毎朝ジョギングをしています。健康のために始めたそうですが、今では趣味になっています。雨の日以外は、近くの公園を30分走ります。走った後は、とても気持ちがいいと言っています。\n\nQ: 鈴木さんがジョギングを始めた理由は何ですか。\n①趣味のため ②ダイエットのため ③健康のため ④友達に誘われたから", back: "③健康のため\n「健康のために始めた」", tags: ["N4","reading","mid"] },
    { front: "最近、スマートフォンを使う子どもが増えています。便利ですが、目が悪くなったり、外で遊ばなくなったりする心配もあります。専門家は、1日の使用時間を決めることが大切だと言っています。\n\nQ: 専門家は何が大切だと言っていますか。\n①スマホを使わないこと ②外で遊ぶこと ③使用時間を決めること ④親が管理すること", back: "③使用時間を決めること\n「1日の使用時間を決めることが大切」", tags: ["N4","reading","mid"] },
    { front: "昨日、久しぶりに高校の友達に会いました。彼女は今、大阪の病院で看護師をしています。仕事は大変そうですが、「患者さんが元気になったときが一番うれしい」と言っていました。私も仕事を頑張ろうと思いました。\n\nQ: 友達の仕事は何ですか。\n①医者 ②教師 ③看護師 ④会社員", back: "③看護師\n「看護師をしています」", tags: ["N4","reading","mid"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N3 READING
// ═══════════════════════════════════════════

function n3_reading_long(): PresetDeck {
  const id = "preset-n3-reading-long";
  const deck: Deck = {
    id, name: "N3・Reading (Long)", testType: "N3", practiceMode: "reading", source: "preset",
    cardCount: 4, createdAt: Date.now(), description: "JLPT N3: Long reading passages (~550 chars)",
  };
  const cards = makeCards(id, [
    { front: "最近、「おひとりさま」という言葉をよく見かけるようになった。以前は、一人で食事をしたり旅行をしたりするのは「寂しい」「かわいそう」と思われることが多かった。しかし、今では一人の時間を楽しむことが「かっこいい」「自立している」と評価されるように変わってきた。自分の時間を大切にしたいという人が増えているのだろう。\n\nQ: 「おひとりさま」に対する見方はどのように変わったか。\n①変わっていない ②否定的→肯定的に変わった ③肯定的→否定的に変わった ④若者だけ評価している", back: "②否定的→肯定的に変わった\n「寂しい」→「かっこいい」「自立している」", tags: ["N3","reading","long"] },
    { front: "テレワークが普及したことで、会社に行かなくても仕事ができるようになった。その結果、地方に引っ越す人も増えている。都会の高い家賃から逃れられるだけではなく、自然の多い環境でゆったりとした生活を送れるのが魅力だ。しかし、仕事とプライベートの区別がつきにくくなるという問題もある。\n\nQ: テレワークの問題点として、筆者は何をあげているか。\n①家賃が高い ②通勤が大変 ③仕事とプライベートの区別が難しい ④人間関係がうまくいかない", back: "③仕事とプライベートの区別が難しい\n「区別がつきにくくなる」", tags: ["N3","reading","long"] },
    { front: "「一期一会」という言葉は茶道から生まれたもので、「一生に一度の出会い」という意味だ。この考え方は、すべての出会いを大切にしようという教えである。ビジネスの場面でも、この言葉が引用されることがある。なぜなら、取引先との出会いもいつか終わるかもしれない。だからこそ、その瞬間を真剣に向き合うことが重要だという考え方につながるからだ。\n\nQ: 「一期一会」がビジネスでも引用される理由は何か。\n①茶道がビジネスに似ているから ②出会いが永遠ではないから ③商談を増やしたいから ④日本の伝統だから", back: "②出会いが永遠ではないから\n「いつか終わるかもしれない→だから真剣に」", tags: ["N3","reading","long"] },
    { front: "先日、5年ぶりに母校を訪れた。校舎は新しくなっていたが、桜の木だけは昔のままだった。学生時代、よくこの木の下で友達と話したことを思い出した。今はみんな別々の道を歩んでいる。しかし、この桜は変わることなく、今の学生たちを見守っているのだろう。\n\nQ: 筆者が「変わっていない」と感じたものは何か。\n①校舎 ②友達 ③桜の木 ④学生たち", back: "③桜の木\n「桜の木だけは昔のまま」", tags: ["N3","reading","long"] },
  ]);
  return { deck, cards };
}

function n3_info_retrieval(): PresetDeck {
  const id = "preset-n3-info-retrieval";
  const deck: Deck = {
    id, name: "N3・Info Retrieval", testType: "N3", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N3: Information retrieval — ads, brochures",
  };
  const cards = makeCards(id, [
    { front: "【求人情報】\n職種：販売スタッフ\n勤務地：渋谷\n時間：10:00-19:00\n給与：時給1,200円〜\n条件：日本語N2以上、週3日以上\n\nQ: この仕事に応募できる人は？\n①日本語N3、週5日 ②日本語N2、週2日 ③日本語N1、週4日 ④日本語N2、週4日", back: "③日本語N1、週4日\n①N3✗ ②週2✗ ④日本語N2+週4=条件満たす", tags: ["N3","reading","info"] },
    { front: "【ツアー案内】\n京都一日観光\n出発：8:00 東京駅\n帰着：20:00 東京駅\n料金：大人15,000円、子ども（6-12歳）8,000円\n※5歳以下無料・昼食付き\n\nQ: 4人家族（父母＋10歳＋4歳）の料金は？\n①38,000円 ②30,000円 ③46,000円 ④23,000円", back: "①38,000円\n大人2人(15,000×2)+子ども(8,000)+4歳無料=38,000", tags: ["N3","reading","info"] },
    { front: "【サークル募集】\n写真サークル メンバー募集！\n活動：月2回（第2・第4土曜日）\n場所：市民センター\n会費：月1,000円\n\nQ: 活動日に当たらないのは？\n①第2土曜 ②第3土曜 ③第4土曜 ④いずれも活動日", back: "②第3土曜\n活動は第2・第4土曜のみ", tags: ["N3","reading","info"] },
    { front: "【試験案内】\n日本語能力試験 N3\n日時：12月6日（日）12:30-15:15\n会場：A大学 3号館\n持ち物：受験票、HB鉛筆、消しゴム\n\nQ: 試験の持ち物として書かれていないのは？\n①受験票 ②HB鉛筆 ③時計 ④消しゴム", back: "③時計\n持ち物に「時計」の記載なし", tags: ["N3","reading","info"] },
    { front: "【イベント】\n夏祭り in 上野公園\n日時：8月15日(土) 16:00-21:00\n花火：19:30〜\n屋台：30店舗以上\n入場無料\n\nQ: 花火が始まる時間は？\n①16:00 ②18:00 ③19:30 ④21:00", back: "③19:30", tags: ["N3","reading","info"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N2 READING
// ═══════════════════════════════════════════

function n2_thematic_reading(): PresetDeck {
  const id = "preset-n2-thematic-reading";
  const deck: Deck = {
    id, name: "N2・Thematic Reading", testType: "N2", practiceMode: "reading", source: "preset",
    cardCount: 4, createdAt: Date.now(), description: "JLPT N2: Thematic comprehension — long, logical texts",
  };
  const cards = makeCards(id, [
    { front: "「グローバル化」という言葉はよく聞かれるが、その意味は人によって異なる。経済の面では、国境を越えた自由な貿易や投資を意味する。文化の面では、世界中の情報や価値観が共有されることを指す。しかし、どちらの意味であっても、重要なのは「違いを受け入れる」という姿勢ではないだろうか。\n\nQ: 筆者が最も重要だと考えていることは何か。\n①自由な貿易 ②情報共有 ③違いを受け入れること ④経済成長", back: "③違いを受け入れること\n「重要なのは〜ではないだろうか」", tags: ["N2","reading","thematic"] },
    { front: "AIの発展は目覚ましいが、人間の仕事がすべて奪われるというのは大げさだ。確かに、単純作業はAIに置き換わるだろう。しかし、創造的な仕事や、人と人との信頼関係の上に成り立つ仕事は、むしろ人間にしかできない領域として残るだろう。\n\nQ: 筆者の主張に最も近いものは？\n①AIは人間の仕事をすべて奪う ②単純作業も人間に残る ③創造的仕事は人間に残る ④AIの発展は止めるべき", back: "③創造的仕事は人間に残る\n「創造的な仕事は人間にしかできない」", tags: ["N2","reading","thematic"] },
    { front: "日本人は「空気を読む」ことを重視すると言われる。これは、相手の気持ちや場の雰囲気を察して行動することだ。この能力は円滑なコミュニケーションに役立つ一方で、自分の意見を言いにくくするという面もある。グローバル社会では、「空気を読む」文化と「自己主張する」文化のバランスが求められるだろう。\n\nQ: 「空気を読む」ことのデメリットとして筆者は何をあげているか。\n①コミュニケーションが下手になる ②自分の意見が言いにくくなる ③相手の気持ちがわからなくなる ④外国人と働けなくなる", back: "②自分の意見が言いにくくなる\n「一方で、自分の意見を言いにくくする」", tags: ["N2","reading","thematic"] },
    { front: "「失敗は成功のもと」という言葉がある。しかし、ただ失敗すればいいというわけではない。失敗から学ぶためには、なぜ失敗したのかを冷静に分析し、次にどうすればいいかを考える必要がある。失敗を恐れずに挑戦することと、失敗を無駄にしないこと。この両方があってこそ、本当の成長がある。\n\nQ: 筆者が伝えたいことは？\n①失敗してはいけない ②失敗は必ず成功につながる ③失敗から学ぶことが大切 ④挑戦しないほうがいい", back: "③失敗から学ぶことが大切\n「なぜ失敗したのかを分析→次にどうするか」", tags: ["N2","reading","thematic"] },
  ]);
  return { deck, cards };
}

function n2_integrated_reading(): PresetDeck {
  const id = "preset-n2-integrated-reading";
  const deck: Deck = {
    id, name: "N2・Integrated Reading", testType: "N2", practiceMode: "reading", source: "preset",
    cardCount: 4, createdAt: Date.now(), description: "JLPT N2: Compare & integrate multiple texts",
  };
  const cards = makeCards(id, [
    { front: "【A】リモートワークは通勤時間がなくなり、自由な働き方ができるという点で支持されている。\n【B】リモートワークはチームの一体感が失われ、社員の孤立を招くという指摘もある。\n\nQ: AとBの共通点は？\n①リモートワークを肯定している ②リモートワークを否定している ③リモートワークの影響について述べている ④リモートワークの導入方法を述べている", back: "③リモートワークの影響について述べている\nAは肯定的影響、Bは否定的影響", tags: ["N2","reading","integrated"] },
    { front: "【A】コーヒーには集中力を高める効果があると言われている。\n【B】カフェインのとりすぎは睡眠の質を下げる可能性がある。\n\nQ: この2つの情報から言えることは？\n①コーヒーは飲まないほうがいい ②コーヒーは適量が大切だ ③コーヒーに効果はない ④カフェインは危険だ", back: "②コーヒーは適量が大切だ\nA=効果あり、B=とりすぎ注意 → 適量", tags: ["N2","reading","integrated"] },
    { front: "【意見A】大学教育は実用的なスキルを教えるべきだ。\n【意見B】大学教育は幅広い教養を身につける場であるべきだ。\n\nQ: 意見Aのみが主張していることは？\n①教養が大切 ②実用的スキルが大切 ③大学教育は不要 ④両方大切", back: "②実用的スキルが大切\nA=実用スキル、B=教養", tags: ["N2","reading","integrated"] },
    { front: "【記事1】今年の夏は記録的な猛暑となり、熱中症患者が急増した。\n【記事2】エアコンの使用が急増し、電力需要が過去最高を記録した。\n\nQ: 2つの記事の因果関係は？\n①無関係 ②猛暑→電力需要増 ③電力需要増→猛暑 ④熱中症→電力需要増", back: "②猛暑→電力需要増\n猛暑→エアコン使用増→電力需要増", tags: ["N2","reading","integrated"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// N1 READING
// ═══════════════════════════════════════════

function n1_reading_long(): PresetDeck {
  const id = "preset-n1-reading-long";
  const deck: Deck = {
    id, name: "N1・Reading (Long)", testType: "N1", practiceMode: "reading", source: "preset",
    cardCount: 2, createdAt: Date.now(), description: "JLPT N1: Long reading — abstract/logical passages",
  };
  const cards = makeCards(id, [
    { front: "科学技術の進歩は人類に多大な恩恵をもたらしてきた。しかし同時に、核兵器や環境破壊など、人類の存続を脅かす問題も生み出してきた。ここで我々が考えなければならないのは、技術そのものは善でも悪でもなく、それをどう使うかが問われているという当たり前の事実である。問題は技術の使い手である人間の側にあるのだ。\n\nQ: 筆者が最も言いたいことは何か。\n①科学技術は危険だ ②科学技術の進歩を止めるべきだ ③技術の使い方が問題だ ④人類は技術に頼りすぎている", back: "③技術の使い方が問題だ\n「技術そのものは善でも悪でもない→使い手の問題」", tags: ["N1","reading","long"] },
    { front: "「多様性」という言葉が社会のあらゆる場面で使われるようになった。しかし、ただ表面的に多様性を認めるだけでは不十分である。真の多様性とは、異なる意見や価値観がぶつかり合い、時には対立しながらも、そこから新たな価値を創造していくプロセスにこそ存在する。摩擦を避けて表面上の調和を保つことは、むしろ多様性の否定につながりかねない。\n\nQ: 筆者は「真の多様性」に必要なものとして何をあげているか。\n①全員の意見が一致すること ②対立を避けること ③異なる意見の衝突と創造 ④表面的な調和", back: "③異なる意見の衝突と創造\n「ぶつかり合い→新たな価値を創造」", tags: ["N1","reading","long"] },
  ]);
  return { deck, cards };
}

function n1_integrated_reading(): PresetDeck {
  const id = "preset-n1-integrated-reading";
  const deck: Deck = {
    id, name: "N1・Integrated Reading", testType: "N1", practiceMode: "reading", source: "preset",
    cardCount: 2, createdAt: Date.now(), description: "JLPT N1: Compare/integrate multiple complex texts",
  };
  const cards = makeCards(id, [
    { front: "【論説A】少子化対策として、経済的支援の拡充が最も効果的である。\n【論説B】経済的支援だけでは不十分で、働き方改革や社会の意識改革こそが必要だ。\n\nQ: BがAに対して批判的である点は何か。\n①経済的支援は無意味 ②経済的支援だけでは不十分 ③少子化対策は不要 ④働き方改革は逆効果", back: "②経済的支援だけでは不十分\nBは「経済的支援だけでは」と限定", tags: ["N1","reading","integrated"] },
    { front: "【資料1】この10年で、国内の書店数は40%減少した。\n【資料2】一方、電子書籍の市場規模は3倍に拡大した。\n\nQ: 2つの資料から推測できることは？\n①日本人は本を読まなくなった ②紙から電子へ読書形態が変化している ③書店の売上は増加した ④電子書籍は紙より安い", back: "②紙から電子へ読書形態が変化している\n書店減↔電子増 = 形態変化", tags: ["N1","reading","integrated"] },
  ]);
  return { deck, cards };
}

function n1_info_retrieval(): PresetDeck {
  const id = "preset-n1-info-retrieval";
  const deck: Deck = {
    id, name: "N1・Info Retrieval", testType: "N1", practiceMode: "reading", source: "preset",
    cardCount: 2, createdAt: Date.now(), description: "JLPT N1: Advanced info retrieval — business docs, complex materials",
  };
  const cards = makeCards(id, [
    { front: "【取引条件】\nFOB Tokyo でのお取引を希望いたします。\n支払条件：L/C at sight, irrevocable\n最低発注数：1,000個/月\n納期：受注後45日以内\n\nQ: 支払条件として指定されているのは？\n①T/T remittance ②D/P ③L/C at sight ④D/A", back: "③L/C at sight\n取消不能・一覧払信用状", tags: ["N1","reading","info"] },
    { front: "【財務ハイライト】\n売上高：120億円（前期比+8%）\n営業利益：15億円（利益率12.5%）\nROE：9.2%\n配当：1株あたり45円（配当性向30%）\n\nQ: 営業利益率は何%か。\n①8% ②9.2% ③12.5% ④30%", back: "③12.5%（=15億÷120億）", tags: ["N1","reading","info"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// BJT READING
// ═══════════════════════════════════════════

function bjt_email(): PresetDeck {
  const id = "preset-bjt-email";
  const deck: Deck = {
    id, name: "BJT・Business Emails", testType: "BJT", practiceMode: "reading", source: "preset",
    cardCount: 2, createdAt: Date.now(), description: "BJT: Reading business emails",
  };
  const cards = makeCards(id, [
    { front: "件名：【依頼】見積書のご送付のお願い\n\n株式会社山田商事\n営業部 佐藤様\n\n平素より大変お世話になっております。\nさて、このたび新規プロジェクトにあたり、下記製品の見積書をご送付いただけますと幸いです。お忙しいところ恐縮ですが、来週水曜日までにお送りいただけますでしょうか。\n\nどうぞよろしくお願い申し上げます。\n\nQ: このメールの目的は？\n①クレーム ②見積書の依頼 ③納期の確認 ④新製品の案内", back: "②見積書の依頼\n「見積書をご送付いただけますと幸いです」", tags: ["BJT","reading","email"] },
    { front: "件名：納期遅延のお詫び\n\n拝啓　時下ますますご清栄のこととお慶び申し上げます。\n\nこのたび、御社よりご注文いただきました商品（注文番号：ORD-2024-0891）につきまして、製造工程上の不具合により納品が1週間ほど遅れる見込みとなりました。\n\n多大なるご迷惑をおかけいたしますこと、心よりお詫び申し上げます。なお、納品は6月22日の予定でございます。\n\nQ: 納期が遅れた理由は？\n①物流の問題 ②製造工程の不具合 ③注文ミス ④天候不良", back: "②製造工程の不具合\n「製造工程上の不具合により」", tags: ["BJT","reading","email"] },
  ]);
  return { deck, cards };
}

function bjt_docs(): PresetDeck {
  const id = "preset-bjt-docs";
  const deck: Deck = {
    id, name: "BJT・Business Documents", testType: "BJT", practiceMode: "reading", source: "preset",
    cardCount: 2, createdAt: Date.now(), description: "BJT: Reading reports, memos, meeting minutes",
  };
  const cards = makeCards(id, [
    { front: "【議事録】\n日時：2024年6月10日（月）10:00-11:30\n出席：田中、鈴木、佐藤（議長）、山本（書記）\n議題1：新商品の発売時期\n→決定：9月1日発売予定。7月末までに試作品を完成させる。\n議題2：販促キャンペーン\n→継続審議。次回（6/17）に具体案を持ち寄る。\n\nQ: 次回の会議はいつか。\n①6/10 ②6/17 ③7/31 ④9/1", back: "②6/17\n「次回（6/17）に具体案を」", tags: ["BJT","reading","doc"] },
    { front: "【企画書（抜粋）】\nプロジェクト名：AI-OCR導入プロジェクト\n目的：経理部門の手作業（請求書データ入力）を自動化し、工数30%削減\n背景：現在、経理部門5名が月間約2,000枚の請求書を手入力。人為的ミスが月平均15件発生。\n提案：AI-OCRシステム導入（初期費用500万円、月額運用費20万円）\n期待効果：工数削減＋ミス撲滅により年間1,200万円コスト削減見込み\n\nQ: 現在発生している問題は？\n①社員が足りない ②手入力ミスが発生 ③コストが高い ④機械が古い", back: "②手入力ミスが発生\n「人為的ミスが月平均15件発生」", tags: ["BJT","reading","doc"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// Export: All presets in order
// ═══════════════════════════════════════════

/** All preset decks, grouped by test level */
export const ALL_PRESETS: (() => PresetDeck)[] = [
  // N5 (7 decks)
  n5_vocab,
  n5_kanji_reading,
  n5_grammar,
  n5_reading_short,
  n5_info_retrieval,

  // N4 (4 decks)
  n4_vocab,
  n4_kanji_reading,
  n4_grammar,
  n4_reading_mid,

  // N3 (6 decks)
  n3_vocab,
  n3_kanji_reading,
  n3_grammar,
  n3_reading_long,
  n3_info_retrieval,

  // N2 (5 decks)
  n2_vocab,
  n2_kanji_reading,
  n2_grammar,
  n2_thematic_reading,
  n2_integrated_reading,

  // N1 (6 decks)
  n1_vocab,
  n1_kanji_reading,
  n1_grammar,
  n1_reading_long,
  n1_integrated_reading,
  n1_info_retrieval,

  // BJT (4 decks)
  bjt_keigo,
  bjt_email,
  bjt_docs,
];

/** Total presets count */
export const PRESET_COUNT = ALL_PRESETS.length;
