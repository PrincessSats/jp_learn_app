/* ─── Preset Data: JLPT + BJT Test-Format Questions (no listening) ───
 *
 * Each preset mirrors real exam question formats.
 * Cards have front=question/context, back=answer+explanation.
 * Grouped by test type → section → sub-type.
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
// JLPT N5
// ═══════════════════════════════════════════

function n5KanjiReading(): PresetDeck {
  const id = "preset-n5-kanji-reading";
  const deck: Deck = {
    id, name: "N5・Kanji Reading", testType: "N5", practiceMode: "kanji", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "JLPT N5: Kanji reading (vocabulary section)",
  };
  const cards = makeCards(id, [
    { front: "新しい\nあたらしい", back: "あたらしい\nnew", tags: ["N5","kanji","reading"] },
    { front: "大きい\nおおきい", back: "おおきい\nbig", tags: ["N5","kanji","reading"] },
    { front: "学校\nがっこう", back: "がっこう\nschool", tags: ["N5","kanji","reading"] },
    { front: "先生\nせんせい", back: "せんせい\nteacher", tags: ["N5","kanji","reading"] },
    { front: "食べる\nたべる", back: "たべる\nto eat", tags: ["N5","kanji","reading"] },
    { front: "飲む\nのむ", back: "のむ\nto drink", tags: ["N5","kanji","reading"] },
    { front: "読む\nよむ", back: "よむ\nto read", tags: ["N5","kanji","reading"] },
    { front: "書く\nかく", back: "かく\nto write", tags: ["N5","kanji","reading"] },
  ]);
  return { deck, cards };
}

function n5VocabularyContext(): PresetDeck {
  const id = "preset-n5-vocab-context";
  const deck: Deck = {
    id, name: "N5・Context Vocabulary", testType: "N5", practiceMode: "vocabulary", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "JLPT N5: Contextually-defined expressions",
  };
  const cards = makeCards(id, [
    { front: "毎朝、コーヒーを＿＿＿。\n①作ります ②します ③きます ④あります",
      back: "①作ります（つくります）\n「コーヒーを作る」= make coffee", tags: ["N5","vocab","context"] },
    { front: "天気が＿＿＿なりました。\n①よく ②いい ③よい ④よくて",
      back: "①よく\n「いい→よく」+ なる = become good", tags: ["N5","vocab","context"] },
    { front: "昨日、友達に＿＿＿。\n①会います ②会いました ③会いません ④会って",
      back: "②会いました\n昨日（past）→ 会いました", tags: ["N5","vocab","context"] },
    { front: "この部屋は＿＿＿です。\n①しずか ②しずかな ③しずかだ ④しずかの",
      back: "①しずか\nな-adj + です = しずかです", tags: ["N5","vocab","context"] },
    { front: "駅まで歩いて10分＿＿＿かかります。\n①ごろ ②ぐらい ③だけ ④しか",
      back: "②ぐらい\n時間の長さ + ぐらい = about", tags: ["N5","vocab","context"] },
    { front: "すみません、ちょっと＿＿＿を貸してください。\n①ペン ②パン ③ペア ④パイ",
      back: "①ペン\nペンを貸す = lend a pen", tags: ["N5","vocab","context"] },
    { front: "日本語の勉強が＿＿＿です。\n①たのしい ②かなしい ③うれしい ④せまい",
      back: "①たのしい\n楽しい = fun/enjoyable", tags: ["N5","vocab","context"] },
    { front: "切符を＿＿＿方はこちらです。\n①買う ②買った ③買わない ④買います",
      back: "①買う\nV-plain + 方 = the way to V", tags: ["N5","vocab","context"] },
  ]);
  return { deck, cards };
}

function n5GrammarSelect(): PresetDeck {
  const id = "preset-n5-grammar-select";
  const deck: Deck = {
    id, name: "N5・Grammar Selection", testType: "N5", practiceMode: "grammar", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "JLPT N5: Sentential grammar — selecting grammar form",
  };
  const cards = makeCards(id, [
    { front: "明日、映画を＿＿＿に行きます。\n①見 ②見る ③見た ④見て",
      back: "④見て\nV-て + に行く = go to do V（見に行く）", tags: ["N5","grammar","select"] },
    { front: "私は日本語＿＿＿話せません。\n①を ②が ③に ④で",
      back: "②が\npotential form object → が（話せる+が）", tags: ["N5","grammar","select"] },
    { front: "ここに名前を＿＿＿ください。\n①かいて ②かく ③かき ④かけ",
      back: "①かいて\nV-て + ください = please V", tags: ["N5","grammar","select"] },
    { front: "昨日は雨＿＿＿降りました。\n①が ②を ③に ④で",
      back: "①が\nweather phenomenon + が（雨が降る）", tags: ["N5","grammar","select"] },
    { front: "このかばんは高い＿＿＿、いいです。\n①けど ②から ③ので ④のに",
      back: "①けど\nけど = but（casual conjunction）", tags: ["N5","grammar","select"] },
    { front: "コーヒー＿＿＿紅茶、どちらがいいですか。\n①と ②とか ③や ④か",
      back: "①と\nAとB = A or B（choice between two）", tags: ["N5","grammar","select"] },
    { front: "あの人はたぶん学生＿＿＿。\n①です ②だ ③でしょう ④ましょう",
      back: "③でしょう\nthe たぶん + でしょう = probably", tags: ["N5","grammar","select"] },
    { front: "私は毎日7時に＿＿＿。\n①起きる ②起きます ③起きた ④起きて",
      back: "②起きます\n毎日（habit）+ present polite", tags: ["N5","grammar","select"] },
  ]);
  return { deck, cards };
}

function n5ReadingShort(): PresetDeck {
  const id = "preset-n5-reading-short";
  const deck: Deck = {
    id, name: "N5・Reading (Short)", testType: "N5", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N5: Reading comprehension — short passages (~80 chars)",
  };
  const cards = makeCards(id, [
    { front: "田中さんは毎朝7時に起きます。朝ごはんを食べて、8時に家を出ます。会社は9時からです。\n\nQ: 田中さんは何時に家を出ますか。\n①6時 ②7時 ③8時 ④9時",
      back: "③8時\n「8時に家を出ます」", tags: ["N5","reading","short"] },
    { front: "私の町に新しいスーパーができました。とても大きくて、何でも売っています。昨日、りんごを買いました。\n\nQ: 何ができましたか。\n①学校 ②スーパー ③公園 ④病院",
      back: "②スーパー\n「新しいスーパーができました」", tags: ["N5","reading","short"] },
    { front: "今日は友達の誕生日です。私はプレゼントを買いました。夜、友達の家でパーティーがあります。\n\nQ: 今日は何がありますか。\n①テスト ②旅行 ③パーティー ④会議",
      back: "③パーティー\n「友達の家でパーティーがあります」", tags: ["N5","reading","short"] },
    { front: "山田さんは先週、東京から大阪に引っ越しました。大阪は食べ物がおいしいです。でも、東京の友達に会えなくて、少し寂しいです。\n\nQ: 山田さんは今どこに住んでいますか。\n①東京 ②大阪 ③京都 ④名古屋",
      back: "②大阪\n「大阪に引っ越しました」→現在は大阪", tags: ["N5","reading","short"] },
    { front: "私は毎日、電車で大学に行きます。30分ぐらいかかります。電車の中でよく本を読みます。\n\nQ: 大学までどのぐらいかかりますか。\n①10分 ②20分 ③30分 ④1時間",
      back: "③30分\n「30分ぐらいかかります」", tags: ["N5","reading","short"] },
  ]);
  return { deck, cards };
}

function n5InfoRetrieval(): PresetDeck {
  const id = "preset-n5-info-retrieval";
  const deck: Deck = {
    id, name: "N5・Info Retrieval", testType: "N5", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N5: Information retrieval from notices/adverts",
  };
  const cards = makeCards(id, [
    { front: "【お知らせ】\n図書館の休み：毎週月曜日\n開館時間：9:00〜18:00\n\nQ: 図書館は何曜日が休みですか。\n①日曜日 ②月曜日 ③土曜日 ④金曜日",
      back: "②月曜日", tags: ["N5","reading","info"] },
    { front: "【メニュー】\nラーメン 700円\nカレー 600円\nうどん 500円\n\nQ: いちばん安いのはどれですか。\n①ラーメン ②カレー ③うどん ④どれも同じ",
      back: "③うどん（500円）", tags: ["N5","reading","info"] },
    { front: "【クラス】\n日本語1: 月・水 10:00-11:30\n日本語2: 火・木 13:00-14:30\n\nQ: 日本語2は何曜日ですか。\n①月・水 ②火・木 ③月・金 ④水・金",
      back: "②火・木", tags: ["N5","reading","info"] },
    { front: "【天気予報】\n東京：晴れ 25℃\n大阪：曇り 22℃\n札幌：雨 15℃\n\nQ: いちばん寒いのはどこですか。\n①東京 ②大阪 ③札幌 ④同じ",
      back: "③札幌（15℃）", tags: ["N5","reading","info"] },
    { front: "【バス時刻表】\n駅前行き：毎時 00, 15, 30, 45分発\n\nQ: 10時台のバスは何時何分にありますか。\n①10:00 ②10:10 ③10:20 ④10:25",
      back: "①10:00（毎時00分）", tags: ["N5","reading","info"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// JLPT N4
// ═══════════════════════════════════════════

function n4KanjiOrthography(): PresetDeck {
  const id = "preset-n4-kanji-ortho";
  const deck: Deck = {
    id, name: "N4・Kanji Orthography", testType: "N4", practiceMode: "kanji", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "JLPT N4: Write kanji for hiragana words",
  };
  const cards = makeCards(id, [
    { front: "この店は＿＿＿（やすい）です。\n①安い ②案い ③暗い ④要い",
      back: "①安い\n安い = cheap/inexpensive", tags: ["N4","kanji","orthography"] },
    { front: "明日は＿＿＿（あつい）でしょう。\n①暑い ②署い ③書い ④諸い",
      back: "①暑い\n暑い = hot (weather)", tags: ["N4","kanji","orthography"] },
    { front: "駅の西口で＿＿＿（あって）ください。\n①会って ②合って ③遭って ④逢って",
      back: "②合って\n待ち合う→合う", tags: ["N4","kanji","orthography"] },
    { front: "もっと＿＿＿（しんせつ）にしてください。\n①新切 ②親切 ③深切 ④心切",
      back: "②親切\n親切 = kind/kindness", tags: ["N4","kanji","orthography"] },
    { front: "この＿＿＿（ちず）はわかりやすいです。\n①地図 ②知図 ③池図 ④置図",
      back: "①地図\n地図 = map", tags: ["N4","kanji","orthography"] },
    { front: "父は毎日＿＿＿（しんぶん）を読みます。\n①新聞 ②新分 ③親聞 ④進文",
      back: "①新聞\n新聞 = newspaper", tags: ["N4","kanji","orthography"] },
    { front: "あそこに＿＿＿（たって）いる人は誰ですか。\n①立って ②建って ③起って ④発って",
      back: "①立って\n立つ = to stand", tags: ["N4","kanji","orthography"] },
    { front: "＿＿＿（らいしゅう）の金曜日は休みです。\n①来週 ②来集 ③雷週 ④来習",
      back: "①来週\n来週 = next week", tags: ["N4","kanji","orthography"] },
  ]);
  return { deck, cards };
}

function n4GrammarCompose(): PresetDeck {
  const id = "preset-n4-grammar-compose";
  const deck: Deck = {
    id, name: "N4・Sentence Composition", testType: "N4", practiceMode: "grammar", source: "preset",
    cardCount: 6, createdAt: Date.now(), description: "JLPT N4: Sentence composition — order words",
  };
  const cards = makeCards(id, [
    { front: "＿＿＿ ＿＿＿ ＿＿＿ ＿＿＿ をもらいました。\n①友達 ②お土産 ③から ④きれいな\n\n正しい順番は？",
      back: "①→③→④→②\n友達からきれいなお土産をもらいました。", tags: ["N4","grammar","compose"] },
    { front: "この料理は ＿＿＿ ＿＿＿ ＿＿＿ ＿＿＿ です。\n①作り方 ②かんたんな ③とても ④が\n\n正しい順番は？",
      back: "①→④→③→②\nこの料理は作り方がとてもかんたんです。", tags: ["N4","grammar","compose"] },
    { front: "＿＿＿ ＿＿＿ ＿＿＿ ＿＿＿ 話してください。\n①もう ②少し ③大きな ④声で\n\n正しい順番は？",
      back: "①→②→③→④\nもう少し大きな声で話してください。", tags: ["N4","grammar","compose"] },
    { front: "＿＿＿ ＿＿＿ ＿＿＿ ＿＿＿ 歩けます。\n①1時間 ②駅 ③まで ④ぐらいで\n\n正しい順番は？",
      back: "②→③→①→④\n駅まで1時間ぐらいで歩けます。", tags: ["N4","grammar","compose"] },
    { front: "あの人は ＿＿＿ ＿＿＿ ＿＿＿ ＿＿＿ らしいです。\n①やさしい ②そうで ③とても ④人\n\n正しい順番は？",
      back: "③→①→②→④\nあの人はとてもやさしそうで人らしいです。", tags: ["N4","grammar","compose"] },
    { front: "今日は ＿＿＿ ＿＿＿ ＿＿＿ ＿＿＿ 行きません。\n①学校 ②頭 ③へ ④が痛くて\n\n正しい順番は？",
      back: "②→④→①→③\n今日は頭が痛くて学校へ行きません。", tags: ["N4","grammar","compose"] },
  ]);
  return { deck, cards };
}

function n4ReadingMid(): PresetDeck {
  const id = "preset-n4-reading-mid";
  const deck: Deck = {
    id, name: "N4・Reading (Mid)", testType: "N4", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N4: Mid-size reading passages (~450 chars)",
  };
  const cards = makeCards(id, [
    { front: "私は週末によく料理をします。一人暮らしを始めたときは、何も作れませんでした。でも、料理の本を買って、少しずつ練習しました。今では、友達を家に呼んで、一緒に食事をすることが楽しみです。\n\nQ: この人は料理ができるようになるために何をしましたか。\n①料理教室に行った ②母親に教えてもらった ③料理の本を買った ④外食をやめた",
      back: "③料理の本を買った\n「料理の本を買って、少しずつ練習しました」", tags: ["N4","reading","mid"] },
    { front: "日本の夏はとても蒸し暑いです。特に7月と8月は気温が35度を超えることもあります。そのため、熱中症にならないように、こまめに水分をとることが大切です。\n\nQ: 筆者が言いたいことは何ですか。\n①日本の夏は短い ②夏は外に出ないほうがいい ③水分をよくとることが大切 ④気温は35度以下だ",
      back: "③水分をよくとることが大切\n「こまめに水分をとることが大切」", tags: ["N4","reading","mid"] },
    { front: "鈴木さんは毎朝ジョギングをしています。健康のために始めたそうですが、今では趣味になっています。雨の日以外は、近くの公園を30分走ります。走った後は、とても気持ちがいいと言っています。\n\nQ: 鈴木さんがジョギングを始めた理由は何ですか。\n①趣味のため ②ダイエットのため ③健康のため ④友達に誘われたから",
      back: "③健康のため\n「健康のために始めた」", tags: ["N4","reading","mid"] },
    { front: "最近、スマートフォンを使う子どもが増えています。便利ですが、目が悪くなったり、外で遊ばなくなったりする心配もあります。専門家は、1日の使用時間を決めることが大切だと言っています。\n\nQ: 専門家は何が大切だと言っていますか。\n①スマホを使わないこと ②外で遊ぶこと ③使用時間を決めること ④親が管理すること",
      back: "③使用時間を決めること\n「1日の使用時間を決めることが大切」", tags: ["N4","reading","mid"] },
    { front: "昨日、久しぶりに高校の友達に会いました。彼女は今、大阪の病院で看護師をしています。仕事は大変そうですが、「患者さんが元気になったときが一番うれしい」と言っていました。私も仕事を頑張ろうと思いました。\n\nQ: 友達の仕事は何ですか。\n①医者 ②教師 ③看護師 ④会社員",
      back: "③看護師\n「看護師をしています」", tags: ["N4","reading","mid"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// JLPT N3
// ═══════════════════════════════════════════

function n3VocabParaphrase(): PresetDeck {
  const id = "preset-n3-vocab-paraphrase";
  const deck: Deck = {
    id, name: "N3・Paraphrases", testType: "N3", practiceMode: "vocabulary", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "JLPT N3: Words/expressions with similar meanings",
  };
  const cards = makeCards(id, [
    { front: "この企画は＿＿＿うまくいくだろう。\n①おそらく ②けっして ③ついに ④たまたま",
      back: "①おそらく（= たぶん）\nおそらく ~ だろう = probably", tags: ["N3","vocab","paraphrase"] },
    { front: "彼は＿＿＿した結果、新しい方法を考え出した。\n①あれこれ ②わざわざ ③いきいき ④ますます",
      back: "①あれこれ\nあれこれする = try various things", tags: ["N3","vocab","paraphrase"] },
    { front: "この問題について、＿＿＿意見を聞かせてください。\n①率直な ②奇妙な ③単純な ④退屈な",
      back: "①率直な\n率直 = frank/honest（正直な）", tags: ["N3","vocab","paraphrase"] },
    { front: "あの店はサービスが＿＿＿、人気がある。\n①行き届いて ②間に合って ③思い切って ④取り消して",
      back: "①行き届いて\n行き届く = be thorough/attentive", tags: ["N3","vocab","paraphrase"] },
    { front: "彼女は＿＿＿私の計画に反対した。\n①強く ②固く ③深く ④厚く",
      back: "①強く\n強く反対する = strongly oppose", tags: ["N3","vocab","paraphrase"] },
    { front: "この曲は若者の間で＿＿＿広がった。\n①一気に ②一段と ③一切 ④一層",
      back: "①一気に\n一気に広がる = spread rapidly", tags: ["N3","vocab","paraphrase"] },
    { front: "彼は私の話を＿＿＿聞いてくれた。\n①熱心に ②冷静に ③正式に ④個別に",
      back: "①熱心に\n熱心に聞く = listen eagerly", tags: ["N3","vocab","paraphrase"] },
    { front: "この仕事は明日までに＿＿＿終わらせなければならない。\n①どうしても ②なんとなく ③たとえば ④おもわず",
      back: "①どうしても（= 必ず）\nどうしても ~ なければならない = must by all means", tags: ["N3","vocab","paraphrase"] },
  ]);
  return { deck, cards };
}

function n3GrammarText(): PresetDeck {
  const id = "preset-n3-grammar-text";
  const deck: Deck = {
    id, name: "N3・Text Grammar", testType: "N3", practiceMode: "grammar", source: "preset",
    cardCount: 6, createdAt: Date.now(), description: "JLPT N3: Text grammar — sentence flow",
  };
  const cards = makeCards(id, [
    { front: "日本人の食生活は大きく変わった。【  】、昔は米と魚が中心だったが、今ではパンや肉をよく食べるようになった。\n\n①ところで ②たとえば ③しかし ④つまり",
      back: "②たとえば\n前文の具体例を示す → たとえば", tags: ["N3","grammar","text"] },
    { front: "この商品は品質が良い。【  】、値段も安いのでよく売れている。\n\n①それに ②それで ③そこで ④それでは",
      back: "①それに\n付け加え（additive）= それに（moreover）", tags: ["N3","grammar","text"] },
    { front: "彼は熱がある。【  】、今日は会社を休むことにした。\n\n①そのうえ ②それなら ③そのため ④とはいえ",
      back: "③そのため\n原因→結果 = そのため（therefore）", tags: ["N3","grammar","text"] },
    { front: "駅前に新しいビルができるそうだ。【  】、この辺りももっとにぎやかになるだろう。\n\n①すると ②そこで ③こうして ④それでも",
      back: "①すると\nA→推測B = すると（if so, then）", tags: ["N3","grammar","text"] },
    { front: "確かに、都会の生活は便利だ。【  】、自然が少なく、ストレスも多い。\n\n①そのかわり ②いっぽうで ③なお ④すなわち",
      back: "②いっぽうで\n対比 = 一方で（on the other hand）", tags: ["N3","grammar","text"] },
    { front: "今日の試合は中止になった。【  】、明日に延期されるそうだ。\n\n①なお ②さて ③ただし ④または",
      back: "③ただし\n条件・補足 = ただし（however/note that）", tags: ["N3","grammar","text"] },
  ]);
  return { deck, cards };
}

function n3ReadingLong(): PresetDeck {
  const id = "preset-n3-reading-long";
  const deck: Deck = {
    id, name: "N3・Reading (Long)", testType: "N3", practiceMode: "reading", source: "preset",
    cardCount: 4, createdAt: Date.now(), description: "JLPT N3: Long reading passages (~550 chars)",
  };
  const cards = makeCards(id, [
    { front: "最近、SNSで「おひとりさま」という言葉をよく見かけるようになった。以前は、一人で食事をしたり旅行をしたりするのは「寂しい」「かわいそう」と思われることが多かった。しかし、今では一人の時間を楽しむことが「かっこいい」「自立している」と評価されるように変わってきた。自分の時間を大切にしたいという人が増えているのだろう。\n\nQ: 「おひとりさま」に対する見方はどのように変わったか。\n①変わっていない ②否定的→肯定的に変わった ③肯定的→否定的に変わった ④若者だけ評価している",
      back: "②否定的→肯定的に変わった\n「寂しい」→「かっこいい」「自立している」", tags: ["N3","reading","long"] },
    { front: "テレワークが普及したことで、会社に行かなくても仕事ができるようになった。その結果、地方に引っ越す人も増えている。都会の高い家賃から逃れられるだけではなく、自然の多い環境でゆったりとした生活を送れるのが魅力だ。しかし、仕事とプライベートの区別がつきにくくなるという問題もある。\n\nQ: テレワークの問題点として、筆者は何をあげているか。\n①家賃が高い ②通勤が大変 ③仕事とプライベートの区別が難しい ④人間関係がうまくいかない",
      back: "③仕事とプライベートの区別が難しい\n「区別がつきにくくなる」", tags: ["N3","reading","long"] },
    { front: "\"一期一会\"という言葉は茶道から生まれたもので、「一生に一度の出会い」という意味だ。この考え方は、すべての出会いを大切にしようという教えである。ビジネスの場面でも、この言葉が引用されることがある。なぜなら、取引先との出会いもいつか終わるかもしれない。だからこそ、その瞬間を真剣に向き合うことが重要だという考え方につながるからだ。\n\nQ: 「一期一会」がビジネスでも引用される理由は何か。\n①茶道がビジネスに似ているから ②出会いが永遠ではないから ③商談を増やしたいから ④日本の伝統だから",
      back: "②出会いが永遠ではないから\n「いつか終わるかもしれない→だから真剣に」", tags: ["N3","reading","long"] },
    { front: "先日、5年ぶりに母校を訪れた。校舎は新しくなっていたが、桜の木だけは昔のままだった。学生時代、よくこの木の下で友達と話したことを思い出した。今はみんな別々の道を歩んでいる。しかし、この桜は変わることなく、今の学生たちを見守っているのだろう。\n\nQ: 筆者が「変わっていない」と感じたものは何か。\n①校舎 ②友達 ③桜の木 ④学生たち",
      back: "③桜の木\n「桜の木だけは昔のまま」", tags: ["N3","reading","long"] },
  ]);
  return { deck, cards };
}

function n3InfoRetrieval(): PresetDeck {
  const id = "preset-n3-info-retrieval";
  const deck: Deck = {
    id, name: "N3・Info Retrieval", testType: "N3", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N3: Information retrieval — ads, brochures",
  };
  const cards = makeCards(id, [
    { front: "【求人情報】\n職種：販売スタッフ\n勤務地：渋谷\n時間：10:00-19:00\n給与：時給1,200円〜\n条件：日本語N2以上、週3日以上\n\nQ: この仕事に応募できる人は？\n①日本語N3、週5日 ②日本語N2、週2日 ③日本語N1、週4日 ④日本語N2、週4日",
      back: "③日本語N1、週4日\n①N3✗ ②週2✗ ④日本語N2+週4=条件満たす", tags: ["N3","reading","info"] },
    { front: "【ツアー案内】\n京都一日観光\n出発：8:00 東京駅\n帰着：20:00 東京駅\n料金：大人15,000円、子ども（6-12歳）8,000円\n※5歳以下無料・昼食付き\n\nQ: 4人家族（父母＋10歳＋4歳）の料金は？\n①38,000円 ②30,000円 ③46,000円 ④23,000円",
      back: "①38,000円\n大人2人(15,000×2)+子ども(8,000)+4歳無料=38,000", tags: ["N3","reading","info"] },
    { front: "【サークル募集】\n写真サークル メンバー募集！\n活動：月2回（第2・第4土曜日）\n場所：市民センター\n会費：月1,000円\n\nQ: 活動日に当たらないのは？\n①第2土曜 ②第3土曜 ③第4土曜 ④いずれも活動日",
      back: "②第3土曜\n活動は第2・第4土曜のみ", tags: ["N3","reading","info"] },
    { front: "【試験案内】\n日本語能力試験 N3\n日時：12月6日（日）12:30-15:15\n会場：A大学 3号館\n持ち物：受験票、HB鉛筆、消しゴム\n\nQ: 試験の持ち物として書かれていないのは？\n①受験票 ②HB鉛筆 ③時計 ④消しゴム",
      back: "③時計\n持ち物に「時計」の記載なし", tags: ["N3","reading","info"] },
    { front: "【イベント】\n夏祭り in 上野公園\n日時：8月15日(土) 16:00-21:00\n花火：19:30〜\n屋台：30店舗以上\n入場無料\n\nQ: 花火が始まる時間は？\n①16:00 ②18:00 ③19:30 ④21:00",
      back: "③19:30", tags: ["N3","reading","info"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// JLPT N2
// ═══════════════════════════════════════════

function n2WordFormation(): PresetDeck {
  const id = "preset-n2-word-formation";
  const deck: Deck = {
    id, name: "N2・Word Formation", testType: "N2", practiceMode: "vocabulary", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "JLPT N2: Derivative and compound words",
  };
  const cards = makeCards(id, [
    { front: "新しい制度の＿＿＿について話し合った。\n①運用 ②作用 ③活用 ④通用",
      back: "①運用\n制度を運用する = operate a system", tags: ["N2","vocab","word-form"] },
    { front: "この書類に不備があれば、＿＿＿される可能性がある。\n①却下 ②落下 ③低下 ④投下",
      back: "①却下\n却下する = reject (application/document)", tags: ["N2","vocab","word-form"] },
    { front: "事件の＿＿＿を調査している。\n①経緯 ②経済 ③経歴 ④経験",
      back: "①経緯\n経緯 = circumstances/details of how something happened", tags: ["N2","vocab","word-form"] },
    { front: "彼は会議で＿＿＿な提案をした。\n①画期的 ②周期的 ③定期的 ④抜本的",
      back: "①画期的\n画期的 = groundbreaking/epoch-making", tags: ["N2","vocab","word-form"] },
    { front: "この問題の＿＿＿を明らかにする必要がある。\n①真偽 ②真実 ③真相 ④真心",
      back: "③真相\n真相を明らかにする = reveal the truth", tags: ["N2","vocab","word-form"] },
    { front: "契約を＿＿＿する前に、内容をよく確認してください。\n①締結 ②結合 ③連結 ④結構",
      back: "①締結\n契約を締結する = conclude a contract", tags: ["N2","vocab","word-form"] },
    { front: "彼はプレッシャーに＿＿＿強さを持っている。\n①対する ②関する ③基づく ④応じる",
      back: "①対する\n〜に対する + N = N against ~", tags: ["N2","vocab","word-form"] },
    { front: "最近、健康への＿＿＿が高まっている。\n①意欲 ②意識 ③意図 ④意向",
      back: "②意識\n健康意識 = health consciousness", tags: ["N2","vocab","word-form"] },
  ]);
  return { deck, cards };
}

function n2IntegratedReading(): PresetDeck {
  const id = "preset-n2-integrated-reading";
  const deck: Deck = {
    id, name: "N2・Integrated Reading", testType: "N2", practiceMode: "reading", source: "preset",
    cardCount: 4, createdAt: Date.now(), description: "JLPT N2: Compare & integrate multiple texts",
  };
  const cards = makeCards(id, [
    { front: "【A】リモートワークは通勤時間がなくなり、自由な働き方ができるという点で支持されている。\n【B】リモートワークはチームの一体感が失われ、社員の孤立を招くという指摘もある。\n\nQ: AとBの共通点は？\n①リモートワークを肯定している ②リモートワークを否定している ③リモートワークの影響について述べている ④リモートワークの導入方法を述べている",
      back: "③リモートワークの影響について述べている\nAは肯定的影響、Bは否定的影響", tags: ["N2","reading","integrated"] },
    { front: "【A】コーヒーには集中力を高める効果があると言われている。\n【B】カフェインのとりすぎは睡眠の質を下げる可能性がある。\n\nQ: この2つの情報から言えることは？\n①コーヒーは飲まないほうがいい ②コーヒーは適量が大切だ ③コーヒーに効果はない ④カフェインは危険だ",
      back: "②コーヒーは適量が大切だ\nA=効果あり、B=とりすぎ注意 → 適量", tags: ["N2","reading","integrated"] },
    { front: "【意見A】大学教育は実用的なスキルを教えるべきだ。\n【意見B】大学教育は幅広い教養を身につける場であるべきだ。\n\nQ: 意見Aのみが主張していることは？\n①教養が大切 ②実用的スキルが大切 ③大学教育は不要 ④両方大切",
      back: "②実用的スキルが大切\nA=実用スキル、B=教養", tags: ["N2","reading","integrated"] },
    { front: "【記事1】今年の夏は記録的な猛暑となり、熱中症患者が急増した。\n【記事2】エアコンの使用が急増し、電力需要が過去最高を記録した。\n\nQ: 2つの記事の因果関係は？\n①無関係 ②猛暑→電力需要増 ③電力需要増→猛暑 ④熱中症→電力需要増",
      back: "②猛暑→電力需要増\n猛暑→エアコン使用増→電力需要増", tags: ["N2","reading","integrated"] },
  ]);
  return { deck, cards };
}

function n2ThematicReading(): PresetDeck {
  const id = "preset-n2-thematic-reading";
  const deck: Deck = {
    id, name: "N2・Thematic Reading", testType: "N2", practiceMode: "reading", source: "preset",
    cardCount: 4, createdAt: Date.now(), description: "JLPT N2: Thematic comprehension — long, logical texts",
  };
  const cards = makeCards(id, [
    { front: "「グローバル化」という言葉はよく聞かれるが、その意味は人によって異なる。経済の面では、国境を越えた自由な貿易や投資を意味する。文化の面では、世界中の情報や価値観が共有されることを指す。しかし、どちらの意味であっても、重要なのは「違いを受け入れる」という姿勢ではないだろうか。\n\nQ: 筆者が最も重要だと考えていることは何か。\n①自由な貿易 ②情報共有 ③違いを受け入れること ④経済成長",
      back: "③違いを受け入れること\n「重要なのは〜ではないだろうか」", tags: ["N2","reading","thematic"] },
    { front: "AIの発展は目覚ましいが、人間の仕事がすべて奪われるというのは大げさだ。確かに、単純作業はAIに置き換わるだろう。しかし、創造的な仕事や、人と人との信頼関係の上に成り立つ仕事は、むしろ人間にしかできない領域として残るだろう。\n\nQ: 筆者の主張に最も近いものは？\n①AIは人間の仕事をすべて奪う ②単純作業も人間に残る ③創造的仕事は人間に残る ④AIの発展は止めるべき",
      back: "③創造的仕事は人間に残る\n「創造的な仕事は人間にしかできない」", tags: ["N2","reading","thematic"] },
    { front: "日本人は「空気を読む」ことを重視すると言われる。これは、相手の気持ちや場の雰囲気を察して行動することだ。この能力は円滑なコミュニケーションに役立つ一方で、自分の意見を言いにくくするという面もある。グローバル社会では、「空気を読む」文化と「自己主張する」文化のバランスが求められるだろう。\n\nQ: 「空気を読む」ことのデメリットとして筆者は何をあげているか。\n①コミュニケーションが下手になる ②自分の意見が言いにくくなる ③相手の気持ちがわからなくなる ④外国人と働けなくなる",
      back: "②自分の意見が言いにくくなる\n「一方で、自分の意見を言いにくくする」", tags: ["N2","reading","thematic"] },
    { front: "「失敗は成功のもと」という言葉がある。しかし、ただ失敗すればいいというわけではない。失敗から学ぶためには、なぜ失敗したのかを冷静に分析し、次にどうすればいいかを考える必要がある。失敗を恐れずに挑戦することと、失敗を無駄にしないこと。この両方があってこそ、本当の成長がある。\n\nQ: 筆者が伝えたいことは？\n①失敗してはいけない ②失敗は必ず成功につながる ③失敗から学ぶことが大切 ④挑戦しないほうがいい",
      back: "③失敗から学ぶことが大切\n「なぜ失敗したのかを分析→次にどうするか」", tags: ["N2","reading","thematic"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// JLPT N1
// ═══════════════════════════════════════════

function n1VocabUsage(): PresetDeck {
  const id = "preset-n1-vocab-usage";
  const deck: Deck = {
    id, name: "N1・Vocabulary Usage", testType: "N1", practiceMode: "vocabulary", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "JLPT N1: Word usage in sentences",
  };
  const cards = makeCards(id, [
    { front: "彼の提案は＿＿＿なものだったので、すぐに採用された。\n①画期的 ②典型的 ③具体的 ④抽象的",
      back: "③具体的\n具体的=concrete, specific → 採用しやすい", tags: ["N1","vocab","usage"] },
    { front: "この問題は＿＿＿に解決する必要がある。\n①迅速 ②厳重 ③過剰 ④漠然",
      back: "①迅速（じんそく）\n迅速に = quickly/swiftly", tags: ["N1","vocab","usage"] },
    { front: "彼は上司に＿＿＿して、自分の意見を述べた。\n①遠慮 ②考慮 ③配慮 ④忧虑",
      back: "①遠慮（えんりょ）\n遠慮する = hesitate/be reserved", tags: ["N1","vocab","usage"] },
    { front: "景気の＿＿＿により、多くの企業が倒産した。\n①後退 ②敗退 ③引退 ④一退",
      back: "①後退（こうたい）\n景気後退 = economic recession", tags: ["N1","vocab","usage"] },
    { front: "彼女は＿＿＿な努力の末、夢を実現した。\n①たゆまぬ ②たやすい ③たのもしい ④たっとい",
      back: "①たゆまぬ\nたゆまぬ = untiring/relentless", tags: ["N1","vocab","usage"] },
    { front: "複雑な問題を＿＿＿に説明してくれた。\n①平易 ②平坦 ③平凡 ④平静",
      back: "①平易（へいい）\n平易に = in simple terms", tags: ["N1","vocab","usage"] },
    { front: "彼の行動には一貫性がなく、＿＿＿している。\n①錯綜 ②錯覚 ③錯誤 ④錯乱",
      back: "①錯綜（さくそう）\n錯綜する = be complicated/tangled", tags: ["N1","vocab","usage"] },
    { front: "両者の意見には＿＿＿の差がある。\n①微妙 ②繊細 ③巧妙 ④奇妙",
      back: "①微妙（びみょう）\n微妙な差 = subtle difference", tags: ["N1","vocab","usage"] },
  ]);
  return { deck, cards };
}

function n1GrammarSelect(): PresetDeck {
  const id = "preset-n1-grammar-select";
  const deck: Deck = {
    id, name: "N1・Grammar (Advanced)", testType: "N1", practiceMode: "grammar", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "JLPT N1: Advanced grammar form selection",
  };
  const cards = makeCards(id, [
    { front: "彼の成功は、努力の結果＿＿＿。\n①にほかならない ②にかかわる ③にかたくない ④にかぎる",
      back: "①にほかならない\n〜にほかならない = nothing but ~", tags: ["N1","grammar","select"] },
    { front: "彼女は歌手としてデビューする＿＿＿、女優としても活躍している。\n①かたわら ②ばかりか ③ならでは ④までもなく",
      back: "①かたわら\nAかたわらB = while doing A, also B", tags: ["N1","grammar","select"] },
    { front: "この事件は、彼の人生＿＿＿大きな転機となった。\n①において ②にわたって ③をもって ④にてらして",
      back: "①において\nNにおいて = in/at N (formal)", tags: ["N1","grammar","select"] },
    { front: "彼の態度から＿＿＿、反省している様子は感じられない。\n①して ②すれば ③すると ④しても",
      back: "③すると\n〜からすると = judging from ~", tags: ["N1","grammar","select"] },
    { front: "結果は＿＿＿、努力した過程が大切だ。\n①いかんで ②いかによらず ③ともなると ④そばから",
      back: "②いかによらず\n〜いかによらず = regardless of ~", tags: ["N1","grammar","select"] },
    { front: "最近の若者は、本を読まない＿＿＿、新聞も読まないそうだ。\n①までも ②ばかりか ③きらいがある ④しまつだ",
      back: "②ばかりか\nAばかりかBも = not only A but also B", tags: ["N1","grammar","select"] },
    { front: "彼はお金がある＿＿＿、欲しいものは何でも買ってしまう。\n①にあって ②とあれば ③しまつで ④そばから",
      back: "④そばから\nVそばから = as soon as (repeated negative pattern)", tags: ["N1","grammar","select"] },
    { front: "環境問題は一企業の努力＿＿＿解決できるものではない。\n①をもってしても ②ならでは ③までもなく ④とあいまって",
      back: "①をもってしても\n〜をもってしても = even with ~", tags: ["N1","grammar","select"] },
  ]);
  return { deck, cards };
}

function n1ReadingLong(): PresetDeck {
  const id = "preset-n1-reading-long";
  const deck: Deck = {
    id, name: "N1・Reading (Long)", testType: "N1", practiceMode: "reading", source: "preset",
    cardCount: 4, createdAt: Date.now(), description: "JLPT N1: Long reading — abstract/logical passages",
  };
  const cards = makeCards(id, [
    { front: "科学技術の進歩は人類に多大な恩恵をもたらしてきた。しかし同時に、核兵器や環境破壊など、人類の存続を脅かす問題も生み出してきた。ここで我々が考えなければならないのは、技術そのものは善でも悪でもなく、それをどう使うかが問われているという当たり前の事実である。問題は技術の使い手である人間の側にあるのだ。\n\nQ: 筆者が最も言いたいことは何か。\n①科学技術は危険だ ②科学技術の進歩を止めるべきだ ③技術の使い方が問題だ ④人類は技術に頼りすぎている",
      back: "③技術の使い方が問題だ\n「技術そのものは善でも悪でもない→使い手の問題」", tags: ["N1","reading","long"] },
    { front: "「多様性」という言葉が社会のあらゆる場面で使われるようになった。しかし、ただ表面的に多様性を認めるだけでは不十分である。真の多様性とは、異なる意見や価値観がぶつかり合い、時には対立しながらも、そこから新たな価値を創造していくプロセスにこそ存在する。摩擦を避けて表面上の調和を保つことは、むしろ多様性の否定につながりかねない。\n\nQ: 筆者は「真の多様性」に必要なものとして何をあげているか。\n①全員の意見が一致すること ②対立を避けること ③異なる意見の衝突と創造 ④表面的な調和",
      back: "③異なる意見の衝突と創造\n「ぶつかり合い→新たな価値を創造」", tags: ["N1","reading","long"] },
    { front: "近代社会において、効率性はあらゆる判断基準の上位に置かれてきた。しかし、効率性一辺倒の考え方は、時として非効率に見えるものの中にこそ人間らしさや創造性が宿っていることを見落とす。例えば、芸術や遊び、雑談といった「無駄」と思われる営みこそが、実は人間の思考を豊かにし、結果的に新たな発想を生み出す土壌となっているのではないだろうか。\n\nQ: 筆者の主張と合っているのはどれか。\n①効率性が最も重要だ ②無駄は排除すべきだ ③「無駄」が創造性の土壌になる ④芸術は非効率で価値がない",
      back: "③「無駄」が創造性の土壌になる\n「無駄と思われる営みが新たな発想を生み出す」", tags: ["N1","reading","long"] },
    { front: "日本では「本音」と「建前」の使い分けがコミュニケーション上の重要な技術とされている。表面的な「建前」だけで済ませることを批判する向きもある。しかし、「建前」は社会の潤滑油としての機能も果たしている。すべてを「本音」で伝えることが、必ずしも良い人間関係を築くとは限らない。むしろ、「建前」という緩衝材があるからこそ、我々は互いに傷つけ合わずに済んでいるのかもしれない。\n\nQ: 筆者は「建前」の役割をどのように評価しているか。\n①不要なもの ②社会の潤滑油として必要 ③本音だけで十分 ④海外では通用しない",
      back: "②社会の潤滑油として必要\n「建前は社会の潤滑油→傷つけ合わずに済む」", tags: ["N1","reading","long"] },
  ]);
  return { deck, cards };
}

function n1IntegratedReading(): PresetDeck {
  const id = "preset-n1-integrated-reading";
  const deck: Deck = {
    id, name: "N1・Integrated Reading", testType: "N1", practiceMode: "reading", source: "preset",
    cardCount: 4, createdAt: Date.now(), description: "JLPT N1: Compare/integrate multiple complex texts",
  };
  const cards = makeCards(id, [
    { front: "【論説A】少子化対策として、経済的支援の拡充が最も効果的である。\n【論説B】経済的支援だけでは不十分で、働き方改革や社会の意識改革こそが必要だ。\n\nQ: BがAに対して批判的である点は何か。\n①経済的支援は無意味 ②経済的支援だけでは不十分 ③少子化対策は不要 ④働き方改革は逆効果",
      back: "②経済的支援だけでは不十分\nBは「経済的支援だけでは」と限定", tags: ["N1","reading","integrated"] },
    { front: "【資料1】この10年で、国内の書店数は40%減少した。\n【資料2】一方、電子書籍の市場規模は3倍に拡大した。\n\nQ: 2つの資料から推測できることは？\n①日本人は本を読まなくなった ②紙から電子へ読書形態が変化している ③書店の売上は増加した ④電子書籍は紙より安い",
      back: "②紙から電子へ読書形態が変化している\n書店減↔電子増 = 形態変化", tags: ["N1","reading","integrated"] },
    { front: "【社長A】当社の強みは技術力です。今後も研究開発に投資します。\n【社長B】当社の強みは営業力です。今後は販路拡大を進めます。\n\nQ: 両社の戦略の違いは？\n①どちらも同じ ②A=技術投資/B=販路拡大 ③A=販路拡大/B=技術投資 ④両方販路拡大",
      back: "②A=技術投資/B=販路拡大\nA=研究開発・B=販路拡大", tags: ["N1","reading","integrated"] },
    { front: "【記事A】日本政府、2030年までに温室効果ガス46%削減目標を発表\n【記事B】産業界から「現実的でない」「経済への打撃が大きい」との懸念が表明された\n\nQ: Bの立場から読み取れることは？\n①目標に全面的に賛成 ②目標達成は容易 ③経済的影響を懸念 ④環境問題に関心がない",
      back: "③経済的影響を懸念\n「経済への打撃」=懸念材料", tags: ["N1","reading","integrated"] },
  ]);
  return { deck, cards };
}

function n1InfoRetrieval(): PresetDeck {
  const id = "preset-n1-info-retrieval";
  const deck: Deck = {
    id, name: "N1・Info Retrieval", testType: "N1", practiceMode: "reading", source: "preset",
    cardCount: 5, createdAt: Date.now(), description: "JLPT N1: Advanced info retrieval — business docs, complex materials",
  };
  const cards = makeCards(id, [
    { front: "【取引条件】\nFOB Tokyo でのお取引を希望いたします。\n支払条件：L/C at sight, irrevocable\n最低発注数：1,000個/月\n納期：受注後45日以内\n\nQ: 支払条件として指定されているのは？\n①T/T remittance ②D/P ③L/C at sight ④D/A",
      back: "③L/C at sight\n取消不能・一覧払信用状", tags: ["N1","reading","info"] },
    { front: "【賃貸条件】\n物件：港区マンション 2LDK\n家賃：月額28万円（管理費込）\n敷金：2ヶ月、礼金：1ヶ月\n契約期間：2年（更新料：家賃1ヶ月分）\n\nQ: 初期費用の総額（家賃+敷金+礼金）は？\n①56万円 ②84万円 ③112万円 ④140万円",
      back: "③112万円\n28万(当月)+56万(敷金)+28万(礼金)=112万", tags: ["N1","reading","info"] },
    { front: "【新規事業計画】\n事業名：AI翻訳プラットフォーム\n初期投資：5,000万円\n損益分岐点：月間売上800万円\n目標シェア：3年で15%\n\nQ: 損益分岐点到達に必要な年間売上は？\n①8,000万円 ②9,600万円 ③5,000万円 ④1億円",
      back: "②9,600万円\n月800万×12ヶ月=9,600万", tags: ["N1","reading","info"] },
    { front: "【特許出願内容】\n発明の名称：省電力型データ処理装置\n出願人：株式会社テックイノベーション\n優先権主張：2024年6月15日（日本国特許庁）\nPCT出願：2025年6月15日期限\n\nQ: PCT出願の期限は？\n①2024年12月15日 ②2025年6月15日 ③2025年12月15日 ④2026年6月15日",
      back: "②2025年6月15日\n優先日から12ヶ月=2025年6月15日", tags: ["N1","reading","info"] },
    { front: "【財務ハイライト】\n売上高：120億円（前期比+8%）\n営業利益：15億円（利益率12.5%）\nROE：9.2%\n配当：1株あたり45円（配当性向30%）\n\nQ: 営業利益率は何%か。\n①8% ②9.2% ③12.5% ④30%",
      back: "③12.5%（=15億÷120億）", tags: ["N1","reading","info"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// BJT (Reading Comprehension only — no listening)
// ═══════════════════════════════════════════

function bjtBusinessEmail(): PresetDeck {
  const id = "preset-bjt-email";
  const deck: Deck = {
    id, name: "BJT・Business Emails", testType: "BJT", practiceMode: "reading", source: "preset",
    cardCount: 6, createdAt: Date.now(), description: "BJT: Reading business emails",
  };
  const cards = makeCards(id, [
    { front: "件名：【依頼】見積書のご送付のお願い\n\n株式会社山田商事\n営業部 佐藤様\n\n平素より大変お世話になっております。\nさて、このたび新規プロジェクトにあたり、下記製品の見積書をご送付いただけますと幸いです。お忙しいところ恐縮ですが、来週水曜日までにお送りいただけますでしょうか。\n\nどうぞよろしくお願い申し上げます。\n\nQ: このメールの目的は？\n①クレーム ②見積書の依頼 ③納期の確認 ④新製品の案内",
      back: "②見積書の依頼\n「見積書をご送付いただけますと幸いです」", tags: ["BJT","reading","email"] },
    { front: "件名：Re: 【依頼】見積書のご送付のお願い\n\nいつもお世話になっております。\nご依頼いただきました見積書を作成いたしました。\n添付ファイルにてご確認くださいますようお願い申し上げます。\n\nご不明な点がございましたら、どうぞご遠慮なくお知らせくださいませ。\n\nQ: この返信で送ったものは？\n①請求書 ②カタログ ③見積書 ④契約書",
      back: "③見積書\n「見積書を作成いたしました」", tags: ["BJT","reading","email"] },
    { front: "件名：商品到着のご連絡とお礼\n\n先日ご注文いただきました商品につきまして、本日発送いたしました。\n到着は明日の午前中を予定しております。\nお忙しい中ご注文いただき、誠にありがとうございます。\n\n今後とも変わらぬご愛顧のほど、よろしくお願い申し上げます。\n\nQ: 商品はいつ届く予定か。\n①今日 ②明日午前 ③明後日 ④来週",
      back: "②明日午前\n「到着は明日の午前中を予定」", tags: ["BJT","reading","email"] },
    { front: "件名：打ち合わせ日程のご確認\n\n先日お電話にてお話しさせていただきました、新規案件に関する打ち合わせについて、下記の日程でいかがでしょうか。\n\n日時：6月15日（月）14:00〜15:00\n場所：貴社 会議室\n\nご都合が悪い場合は、別の日程をご提案いただけますと幸いです。\n\nQ: 打ち合わせの場所は？\n①当社会議室 ②レンタル会議室 ③貴社会議室 ④オンライン",
      back: "③貴社会議室\n「場所：貴社 会議室」", tags: ["BJT","reading","email"] },
    { front: "件名：【重要】契約書のご確認について\n\n平素より格別のご高配を賜り、厚く御礼申し上げます。\nさて、先日よりご協議いただいております契約書（案）につきまして、修正版を作成いたしました。つきましては、内容をご確認のうえ、ご承認いただけますと幸いです。\n\nなお、第5条（損害賠償）につきましては、法務部とも協議のうえ修正しております。\n\nQ: 特に修正があった条項は？\n①第1条 ②第3条 ③第5条 ④修正なし",
      back: "③第5条\n「第5条（損害賠償）につきましては〜修正」", tags: ["BJT","reading","email"] },
    { front: "件名：納期遅延のお詫び\n\n拝啓　時下ますますご清栄のこととお慶び申し上げます。\n\nこのたび、御社よりご注文いただきました商品（注文番号：ORD-2024-0891）につきまして、製造工程上の不具合により納品が1週間ほど遅れる見込みとなりました。\n\n多大なるご迷惑をおかけいたしますこと、心よりお詫び申し上げます。なお、納品は6月22日の予定でございます。\n\n敬具\n\nQ: 納期が遅れた理由は？\n①物流の問題 ②製造工程の不具合 ③注文ミス ④天候不良",
      back: "②製造工程の不具合\n「製造工程上の不具合により」", tags: ["BJT","reading","email"] },
  ]);
  return { deck, cards };
}

function bjtKeigoHonorific(): PresetDeck {
  const id = "preset-bjt-keigo";
  const deck: Deck = {
    id, name: "BJT・Keigo & Honorifics", testType: "BJT", practiceMode: "vocabulary", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "BJT: Business honorifics & polite expressions",
  };
  const cards = makeCards(id, [
    { front: "部長、「確認する」の尊敬語は？\n①拝見する ②ご覧になる ③ご確認なさる ④お目にかかる",
      back: "③ご確認なさる\n相手の動作→尊敬語。「拝見」は謙譲語", tags: ["BJT","keigo","honorific"] },
    { front: "取引先に「明日うかがいます」＝謙譲語。尊敬語では？\n①いらっしゃいます ②お越しになります ③まいります ④おいでになります",
      back: "②お越しになります\n行く：謙譲=うかがう/参る、尊敬=いらっしゃる/お越しになる", tags: ["BJT","keigo","honorific"] },
    { front: "「言う」の謙譲語として適切なのは？\n①おっしゃる ②申す ③述べる ④話す",
      back: "②申す\n自分の「言う」→申す（謙譲）。おっしゃる=尊敬", tags: ["BJT","keigo","honorific"] },
    { front: "取引先の会社を指す尊敬語は？\n①弊社 ②当社 ③御社 ④我が社",
      back: "③御社（おんしゃ）\n相手会社＝御社。自社＝弊社（へいしゃ）", tags: ["BJT","keigo","honorific"] },
    { front: "「○○様は本日お休みを＿＿＿。」正しいのは？\n①いただいております ②しております ③されております ④なさっております",
      back: "①いただいております\n休みを取る→「いただく」謙譲表現。社内の人の動作", tags: ["BJT","keigo","honorific"] },
    { front: "上司が「もう帰っていいよ」と言った。正しい返事は？\n①うん、わかった ②はい、かしこまりました ③はい、そうします ④はい、お先に失礼します",
      back: "④はい、お先に失礼します\n「お先に失礼します」=定型的退社挨拶", tags: ["BJT","keigo","honorific"] },
    { front: "取引先への電話：「田中様はいらっしゃいますか」→不在。正しい対応は？\n①じゃあまたかけます ②では、またお電話させていただきます ③あとで電話するね ④また連絡します",
      back: "②では、またお電話させていただきます\n相手への敬意＋自分の行為をへりくだる", tags: ["BJT","keigo","honorific"] },
    { front: "「見る」の謙譲語と尊敬語、正しい組合せは？\n①拝見/ご覧になる ②ご覧になる/拝見 ③見える/見る ④ご覧/ご覧",
      back: "①拝見/ご覧になる\n自分の「見る」=拝見する、相手の「見る」=ご覧になる", tags: ["BJT","keigo","honorific"] },
  ]);
  return { deck, cards };
}

function bjtBusinessDocs(): PresetDeck {
  const id = "preset-bjt-docs";
  const deck: Deck = {
    id, name: "BJT・Business Documents", testType: "BJT", practiceMode: "reading", source: "preset",
    cardCount: 6, createdAt: Date.now(), description: "BJT: Reading reports, memos, meeting minutes",
  };
  const cards = makeCards(id, [
    { front: "【議事録】\n日時：2024年6月10日（月）10:00-11:30\n出席：田中、鈴木、佐藤（議長）、山本（書記）\n議題1：新商品の発売時期\n→決定：9月1日発売予定。7月末までに試作品を完成させる。\n議題2：販促キャンペーン\n→継続審議。次回（6/17）に具体案を持ち寄る。\n\nQ: 次回の会議はいつか。\n①6/10 ②6/17 ③7/31 ④9/1",
      back: "②6/17\n「次回（6/17）に具体案を」", tags: ["BJT","reading","doc"] },
    { front: "【社内文書】\n通知番号：2024-018\n発信：総務部\n件名：夏季休暇について\n\n下記の通り、夏季休暇を実施いたしますのでお知らせします。\n\n期間：8月10日（土）〜8月18日（日）\n※8月19日（月）より通常営業\n※期間中の緊急連絡先：総務部長 080-XXXX-YYYY\n\n以上\n\nQ: 通常営業の再開日は？\n①8/10 ②8/18 ③8/19 ④8/20",
      back: "③8/19\n「8月19日（月）より通常営業」", tags: ["BJT","reading","doc"] },
    { front: "【企画書（抜粋）】\nプロジェクト名：AI-OCR導入プロジェクト\n目的：経理部門の手作業（請求書データ入力）を自動化し、工数30%削減\n背景：現在、経理部門5名が月間約2,000枚の請求書を手入力。人為的ミスが月平均15件発生。\n提案：AI-OCRシステム導入（初期費用500万円、月額運用費20万円）\n期待効果：工数削減＋ミス撲滅により年間1,200万円コスト削減見込み\n\nQ: 現在発生している問題は？\n①社員が足りない ②手入力ミスが発生 ③コストが高い ④機械が古い",
      back: "②手入力ミスが発生\n「人為的ミスが月平均15件発生」", tags: ["BJT","reading","doc"] },
    { front: "【月次報告】\n報告対象月：2024年5月\n報告者：営業部 田中\n\n◆売上実績\n・目標：8,000万円\n・実績：7,200万円（達成率90%）\n・前年同月比：+5%\n\n◆原因分析\n・大口案件1件（予定1,200万円）が来月に延期\n→延期なければ達成率105%見込み\n\n◆来月の見通し\n・延期案件の受注確定＋新規案件3件獲得により、9,500万円見込み\n\nQ: 目標未達の直接的原因は？\n①不況 ②案件の延期 ③人員不足 ④価格競争",
      back: "②案件の延期\n「大口案件1件が来月に延期→なければ105%」", tags: ["BJT","reading","doc"] },
    { front: "【稟議書】\n申請者：営業部 佐藤\n決裁者：営業部長 → 経理部長 → 社長\n\n件名：海外出張申請\n出張先：シンガポール\n期間：7月8日（月）〜7月12日（金）（5日間）\n目的：現地代理店との契約交渉および市場調査\n概算費用：\n・航空券：18万円\n・宿泊費：5泊×2万円=10万円\n・日当：5日×5,000円=2.5万円\n合計：30.5万円\n\nQ: この出張の主目的は？\n①観光 ②契約交渉と市場調査 ③社員研修 ④支店開設",
      back: "②契約交渉と市場調査\n「現地代理店との契約交渉および市場調査」", tags: ["BJT","reading","doc"] },
    { front: "【報告書】\nクレーム対応報告\n担当：品質管理部 鈴木\n\n案件概要：納品した部品（ロット番号：L-2405-B）にキズが多数発見されたとのクレーム\n対応：\n1. 即座に代替品を手配（翌日納品完了）\n2. 原因調査：梱包工程における作業手順の不徹底が判明\n3. 再発防止策：梱包マニュアルを改訂、全作業員に再教育を実施\n\nQ: キズ発生の原因は？\n①設計ミス ②材料不良 ③梱包工程の手順不徹底 ④配送中の事故",
      back: "③梱包工程の手順不徹底\n「梱包工程における作業手順の不徹底が判明」", tags: ["BJT","reading","doc"] },
  ]);
  return { deck, cards };
}

function bjtFillBlank(): PresetDeck {
  const id = "preset-bjt-fill";
  const deck: Deck = {
    id, name: "BJT・Fill-in-the-Blank", testType: "BJT", practiceMode: "grammar", source: "preset",
    cardCount: 8, createdAt: Date.now(), description: "BJT: Appropriate expressions in business context",
  };
  const cards = makeCards(id, [
    { front: "お忙しい＿＿＿、恐れ入りますが、一言ごあいさつをお願いいたします。\n①ところ ②こと ③もの ④とき",
      back: "①ところ\n「お忙しいところ」=定型ビジネス表現", tags: ["BJT","grammar","fill"] },
    { front: "先日の会議で決定した件について、メールにてご連絡＿＿＿。\n①されます ②いたします ③なさいます ④されます",
      back: "②いたします\n自分の動作→謙譲語「いたす」", tags: ["BJT","grammar","fill"] },
    { front: "申し訳ございませんが、ただいま席を＿＿＿おります。\n①はずして ②はずれた ③はずす ④はずし",
      back: "①はずしております\n「席をはずす」→「はずしております」（謙譲+継続）", tags: ["BJT","grammar","fill"] },
    { front: "このたびの新商品発売に＿＿＿、様々なご協力をいただき感謝しております。\n①あたり ②よって ③して ④つき",
      back: "①あたり\n「〜にあたり」= at the occasion of (formal)", tags: ["BJT","grammar","fill"] },
    { front: "ご不明な点が＿＿＿、担当者までお問い合わせください。\n①ございましたら ②ありましたら ③いれば ④すれば",
      back: "①ございましたら\n「ある」の謙譲語「ござる」→丁寧な仮定条件", tags: ["BJT","grammar","fill"] },
    { front: "来月のセミナーに参加ご希望の方は、6月20日＿＿＿にお申し込みください。\n①まで ②までに ③までは ④までが",
      back: "②までに\n期限+までに = deadline for action", tags: ["BJT","grammar","fill"] },
    { front: "本日はお忙しい中、＿＿＿いただきありがとうございます。\n①お越し ②参り ③お越しいただき ④来られて",
      back: "③お越しいただき\n相手の来訪→「お越しいただく」（〜ていただくの尊敬形）", tags: ["BJT","grammar","fill"] },
    { front: "昨日お送りした資料に＿＿＿、ご質問があればお知らせください。\n①関して ②ついて ③よって ④とって",
      back: "②ついて\n「Nについて」= about/concerning N", tags: ["BJT","grammar","fill"] },
  ]);
  return { deck, cards };
}

// ═══════════════════════════════════════════
// Export: All presets in order
// ═══════════════════════════════════════════

/** All preset decks, grouped by test level */
export const ALL_PRESETS: (() => PresetDeck)[] = [
  // N5 (5 decks)
  n5KanjiReading,
  n5VocabularyContext,
  n5GrammarSelect,
  n5ReadingShort,
  n5InfoRetrieval,

  // N4 (3 decks)
  n4KanjiOrthography,
  n4GrammarCompose,
  n4ReadingMid,

  // N3 (4 decks)
  n3VocabParaphrase,
  n3GrammarText,
  n3ReadingLong,
  n3InfoRetrieval,

  // N2 (3 decks)
  n2WordFormation,
  n2IntegratedReading,
  n2ThematicReading,

  // N1 (4 decks)
  n1VocabUsage,
  n1GrammarSelect,
  n1ReadingLong,
  n1IntegratedReading,
  n1InfoRetrieval,

  // BJT (4 decks)
  bjtBusinessEmail,
  bjtKeigoHonorific,
  bjtBusinessDocs,
  bjtFillBlank,
];

/** Total presets count */
export const PRESET_COUNT = ALL_PRESETS.length;
