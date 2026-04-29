const STORAGE_KEY = "love_pwa_v2";
const OLD_STORAGE_KEY = "love_pwa_v1";
const BACKUP_VERSION = 2;
const APP_VERSION = "9";
const DAY = 24 * 60 * 60 * 1000;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const moods = [
  { id: "sweet", icon: "甜", label: "很甜" },
  { id: "miss", icon: "想", label: "想你" },
  { id: "happy", icon: "晴", label: "开心" },
  { id: "tired", icon: "困", label: "累了" },
  { id: "calm", icon: "静", label: "平静" },
  { id: "cloudy", icon: "云", label: "低落" },
  { id: "angry", icon: "雷", label: "别扭" },
  { id: "surprise", icon: "星", label: "期待" }
];

const tasks = [
  "给对方发一句只属于今天的夸夸。",
  "翻一张旧照片，说出当时最喜欢的细节。",
  "写下下次见面最想一起做的一件事。",
  "互相给今天的心情取一个天气名。",
  "约定一个 15 分钟不看手机的小聊天。",
  "把最近没说出口的谢谢认真说一遍。",
  "一起选一首歌，当作本周的背景音乐。",
  "给未来的你们写一句暗号。",
  "今天互相发一张身边的小风景。",
  "给对方安排一个不用花钱的小约会。",
  "互相说一个最近被对方照顾到的瞬间。",
  "把今天最想分享的小事写成 20 个字。",
  "约定睡前互道一句今天辛苦啦。",
  "给对方取一个今天限定的小昵称。",
  "一起决定一个本周的小奖励。",
  "把一个未完成的愿望拆成第一步。",
  "今天不讲道理，只认真抱抱或认真听。",
  "各自写一句“我希望我们以后……”。",
  "把一件小委屈说清楚，再给一个台阶。",
  "互相说一个今天最需要被理解的点。",
  "把最近一次心动写进时间轴。",
  "给对方准备一个 5 分钟的小惊喜。",
  "今天只用三个词描述对方。",
  "互相分享一件小时候的小事。",
  "把下一次约会的预算定得很小但很认真。",
  "今天主动问一句：你现在最需要什么？",
  "给对方写一句适合贴在备忘录里的话。",
  "互相说一个最近想改进的小习惯。",
  "把今天最普通的一刻拍下来发给对方。",
  "一起决定一个只属于本周的小仪式。"
];

const dateIdeas = [
  "散步 20 分钟，路上每人讲一个今天的小事。",
  "一起看一集短剧或综艺，结束后互相打分。",
  "各自点一杯喜欢的饮料，拍照交换。",
  "找一首歌，作为今天的专属背景音乐。",
  "一起整理 9 张照片，拼一个小相册。",
  "约一顿夜宵，主题是只聊开心的事。",
  "互相推荐一个最近觉得好看的东西。",
  "把下次见面的第一件事写进胶囊。",
  "做一次 10 分钟语音散步，边走边聊。",
  "各自写 3 个愿望，再选一个最想完成的。",
  "云逛超市：各自选 3 样想一起买的东西。",
  "一起做一份下次见面的菜单。",
  "找一条没走过的路，走到第一个拐角再决定方向。",
  "拍今天的天空，交换一句描述。",
  "一起清空一个小待办，然后奖励一杯饮料。",
  "开 20 分钟语音，各自收拾桌面。",
  "互相给对方推荐一个表情包。",
  "定一个小主题：今天只聊小时候。",
  "做一次低成本电影夜：饮料、毯子、暂停讨论。",
  "去便利店各选一样对方可能喜欢的小东西。",
  "一起做一份“下次旅行不靠谱计划”。",
  "找一家没吃过的小店，只点招牌菜。",
  "一起看一段老视频，然后讲讲当时的心情。",
  "去公园坐 15 分钟，不赶时间。",
  "玩一次互问互答：每人 5 个问题。",
  "一起做一个愿望清单里的低成本项目。",
  "约一次早餐，比晚餐更像秘密行动。",
  "各自拍一张今天最可爱的东西。",
  "一起把一个房间角落整理好再庆祝。",
  "选一个城市，做一份 30 分钟的云旅行攻略。"
];

const loveLines = [
  "你出现以后，普通日子也有了收藏价值。",
  "我喜欢你，不只在热闹的时候，也在安静的间隙。",
  "今天也想把最软的一小块心情留给你。",
  "和你有关的小事，总是比计划更值得记住。",
  "如果日子有回声，我希望它喊的是你的名字。",
  "见不到的时候，想你就是我偷偷开的窗。",
  "你不用一直闪闪发光，我也喜欢你松弛的样子。",
  "今天的风很普通，但想到你就变得很会说话。",
  "我把喜欢藏得不太好，所以你应该很容易发现。",
  "以后慢慢来吧，我想和你一起把普通过成偏爱。"
];

const memoryPrompts = [
  "记录一次你们最近笑出来的瞬间。",
  "写下对方最近做过的一件小小好事。",
  "找一张旧照片，补上当时没写完的话。",
  "记录一个只属于你们的称呼或暗号。",
  "写下第一次觉得“就是这个人”的瞬间。",
  "记录一次和好、一次拥抱、一次认真解释。",
  "写一条未来看到会想笑的聊天截图说明。",
  "记录一顿饭：吃了什么，谁夹给谁。",
  "写下最近一次舍不得挂电话的原因。",
  "记录一个你希望永远别忘的小细节。"
];

const gentleReminders = [
  "今天记得好好说话，也好好听对方说话。",
  "如果有点累，先说“我需要缓一下”，别直接冷掉。",
  "今天可以主动问一句：你现在还好吗？",
  "别把想念藏太深，简单说出来也很好。",
  "如果对方分享小事，先接住，再评价。",
  "今天少一点猜，多一点确认。",
  "忙的时候也可以留一句：我晚点认真回你。",
  "不舒服的地方，尽量说感受，不急着定罪。",
  "今天记得夸对方一个具体细节。",
  "别忘了照顾自己，恋爱也需要有电量。",
  "如果吵架，先把声音放低一点。",
  "今天可以把谢谢说完整，不只说嗯嗯。",
  "别用沉默惩罚对方，给一个能沟通的时间。",
  "今天适合把手机放下，认真陪 10 分钟。",
  "如果想要抱抱，可以直接说。",
  "今天别急着解决所有问题，先确认彼此还在同一边。",
  "如果对方沉默，先问是不是累了，而不是马上猜坏结果。",
  "今天适合把“你总是”换成“我刚刚感到”。",
  "记得给对方一点自由，也给自己一点空间。",
  "如果有误会，先复述一遍你听到的意思。",
  "今天可以主动说一句：我愿意听你慢慢讲。",
  "别把道歉说得太轻，也别把爱说得太少。",
  "如果忙到没时间聊天，至少留一个确定的回应时间。",
  "今天适合夸对方一个努力，而不是只夸结果。",
  "别忘了问问自己：我现在是在表达爱，还是表达焦虑？",
  "如果心里别扭，先喝水，停一分钟，再说话。",
  "今天可以把“随便”换成一个真实的小选择。",
  "记得把对方的分享当作靠近，不是打扰。",
  "如果今天状态不好，也可以诚实地说：我想被温柔一点对待。",
  "今天适合给对方一个明确的肯定。",
  "别在气头上做决定，先给关系留一盏灯。",
  "如果你想被陪伴，尽量说清楚要陪多久、怎么陪。",
  "今天可以少一点比较，多一点看见。",
  "如果对方做到了小事，记得让这份努力被看见。",
  "今天适合说一句：和你在一起，我不是一个人。"
];

const recommendations = [
  "把愿望清单里最容易的一件事安排到本周。",
  "给对方发一张你现在看到的天空。",
  "写一个 7 天后打开的小胶囊。",
  "选一张旧照片，补一段今天的注释。",
  "约一个不用花钱的 20 分钟散步。",
  "互相说一个最近的压力来源。",
  "给对方点一首歌，不解释也可以。",
  "一起决定下次见面第一件事。",
  "把最近想吃的一家店加入愿望清单。",
  "做一个“下次一起买”的小清单。",
  "今天只聊开心的事 15 分钟。",
  "互相分享一个最近收藏的视频或文章。",
  "把今天的心情写成天气。",
  "给对方留一句明早醒来能看到的话。",
  "一起清理一个小误会，不追究输赢。",
  "约定一个本周的小奖励。",
  "把一句没说出口的喜欢写进回忆。",
  "问问对方最近最想被怎么陪伴。",
  "一起挑一个头像、壁纸或表情包。",
  "把一件小事做完，然后存一颗糖。",
  "做一份“低成本约会清单”，至少写 5 个。",
  "把最近想看的电影加入愿望清单。",
  "互相发一段 30 秒语音，说今天的天气。",
  "给对方写一个只包含三个词的夸夸。",
  "一起决定一个本月的小目标。",
  "把一个聊天截图存成回忆，并补上当时的心情。",
  "今天互相推荐一道想一起吃的菜。",
  "做一次“今晚不争辩，只倾听”的约定。",
  "把下次见面想穿的衣服发给对方看看。",
  "一起选一个未来胶囊的打开日期。",
  "给对方做一张“今日使用说明”。",
  "把最近的一句玩笑写进回忆，未来会很好笑。",
  "互相说一个最近觉得对方变好的地方。",
  "今天一起早睡，把晚安说得认真一点。",
  "选一个城市，查一家以后想一起去的店。",
  "互相分享一张今天最有生活感的照片。",
  "给对方安排一个 5 分钟的放松任务。",
  "把愿望清单里已完成的一项补成回忆。",
  "一起写下“我们不想变成什么样”。",
  "今天把一句谢谢说到具体的人和事。",
  "给未来 30 天后的彼此写一句提醒。",
  "互相问一个轻松问题，不聊压力。",
  "一起决定一个小暗号，只在今天使用。",
  "把一个小误会用一句话讲清楚。",
  "给对方发一个此刻最像你的表情。",
  "一起列 3 个不用花钱也能开心的事情。",
  "把今天的推荐做点加入愿望清单。",
  "互相说一个最近需要被鼓励的地方。",
  "给这周的你们取一个标题。",
  "做一次“只夸不建议”的聊天。"
];

const conversationQuestions = [
  "最近哪一刻让你觉得被我认真在乎了？",
  "如果我们有一个只属于两个人的节日，它应该是哪天？",
  "你最近最希望我理解你的哪一点？",
  "我们第一次见面时，你记得最清楚的细节是什么？",
  "如果下次见面只能做一件事，你想做什么？",
  "你觉得我们现在最需要增加的小习惯是什么？",
  "最近有没有一句话，是你想听但没说出口的？",
  "你什么时候会觉得我特别可爱？",
  "我们以后想一起拥有一个怎样的周末？",
  "如果给今年的我们取一个标题，会是什么？",
  "你希望我在你低落时怎么陪你？",
  "最近我做的哪件小事让你开心？",
  "你觉得我们的暗号应该是什么风格？",
  "如果写一封给三年后的信，你第一句想写什么？",
  "你最喜欢我们相处里的哪种安静？",
  "你有没有一个一直想和我完成的小愿望？",
  "我们最近需要少一点什么，多一点什么？",
  "如果把今天存进相册，标题叫什么？",
  "你觉得“被偏爱”对你来说是什么样子？",
  "我们下一次和好，可以试试怎么做得更温柔？",
  "你觉得我什么时候最像在认真爱你？",
  "我们最近有没有一个可以更轻松一点的地方？",
  "你希望我在忙的时候怎么让你安心？",
  "如果给我们的关系加一个小规则，你想加什么？",
  "你最喜欢我怎样表达想你？",
  "你有没有一个害怕说出来会被误会的需求？",
  "我们之间最值得保留的习惯是什么？",
  "你觉得哪一次争执其实让我们更了解彼此？",
  "你希望我们如何庆祝普通但努力的一天？",
  "如果下次旅行只有一天，你想怎么安排？",
  "你最近有没有被我忽略的小情绪？",
  "你觉得我最需要被提醒的一件事是什么？",
  "你最喜欢我们聊天里的哪种节奏？",
  "如果把我们写成一本书，第一章叫什么？",
  "你觉得亲密关系里最重要的安全感来自哪里？",
  "你希望我怎样表达道歉才会让你舒服？",
  "我们可以怎样让见不到面的日子也有连接？",
  "最近有什么事你想让我站在你这边？",
  "你最想把哪一天重新过一遍？",
  "你觉得我们的下一个小里程碑是什么？",
  "如果今晚只能问一个问题，你最想问我什么？",
  "你觉得我有哪些地方是你越来越喜欢的？",
  "我们有没有一个值得建立的周末小仪式？",
  "你希望我在你焦虑的时候说什么？",
  "如果未来的我们看到今天，会想提醒现在什么？",
  "你最喜欢我叫你的哪个称呼？",
  "你觉得最近哪件小事最像爱？",
  "你希望我们吵架后第一件事做什么？",
  "如果把今天的心情放进胶囊，你会写什么？",
  "我们可以一起练习哪一种更好的沟通方式？"
];

const secretCodes = [
  "今天见面先抱 7 秒。",
  "暗号：今天月亮偏心你。",
  "暗号：小狗云路过。",
  "今天的秘密奖励：多夸一句。",
  "暗号：把烦恼放进抽屉。",
  "今日隐藏关卡：主动说想你。",
  "暗号：把今天的坏心情交给我。",
  "秘密奖励：下次见面多牵 10 分钟。",
  "今日暗号：你一出现我就偏心。"
];

const capsuleTemplates = [
  ["一周年", "给一周年的我们", "如果这封信被打开了，说明我们又一起走过了一段很珍贵的路。谢谢你一直在。"],
  ["生日", "生日那天打开", "今天要把所有好听的话都送给你。愿你被爱包围，也一直做自己喜欢的人。"],
  ["跨年", "跨年夜的小约定", "新的一年，我们也慢慢来，好好说话，好好拥抱，好好喜欢彼此。"],
  ["吵架后", "冷静后一起看", "如果那天我们有点别扭，也请记得：我想解决问题，不想失去你。"],
  ["见面前", "见面前一天打开", "明天见到你的时候，我想把这段时间攒下来的开心都交给你。"]
];

const typeText = {
  photo: "合照",
  chat: "截图",
  date: "约会",
  note: "瞬间"
};

let state = loadState();
let selectedMood = state.moodToday?.mood || "sweet";
let currentPhoto = "";
let toastTimer = null;
let secretTapCount = 0;
let secretTapTimer = null;
let manageMode = "memory";
let manageQuery = "";
let manageFilter = "all";
let lastOpenedCapsuleId = "";

const HOME_MEMORY_LIMIT = 5;

function pad(value) {
  return String(value).padStart(2, "0");
}

function todayString(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addDays(days) {
  return todayString(new Date(Date.now() + days * DAY));
}

function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

function defaultState() {
  return {
    couple: {
      names: ["小满", "阿树"],
      startDate: "2025-08-17",
      lockHash: "",
      lastUnlockedAt: ""
    },
    moodToday: null,
    completedTasks: [],
    currentTask: tasks[0],
    currentDateIdea: dateIdeas[0],
    wishes: [
      { id: "w1", text: "一起去看一次海", done: false },
      { id: "w2", text: "拍一组普通但很喜欢的合照", done: false }
    ],
    kindnessCount: 0,
    secretCode: "轻轻点三下这里",
    currentLoveLine: loveLines[0],
    currentMemoryPrompt: memoryPrompts[0],
    currentReminder: gentleReminders[0],
    currentRecommendation: recommendations[0],
    currentQuestion: conversationQuestions[0],
    completedReminders: [],
    memories: [
      {
        id: "m1",
        type: "photo",
        title: "第一次认真拍合照",
        date: "2025-08-17",
        place: "江边步道",
        story: "那天风很轻，我们走得很慢，像把一整晚都存进了口袋。",
        photo: "",
        aiText: "喜欢不是轰轰烈烈，是走在你旁边时，连路灯都变温柔。"
      },
      {
        id: "m2",
        type: "date",
        title: "热乎乎的小火锅",
        date: "2025-11-02",
        place: "巷口小店",
        story: "点了太多菜，最后你把丸子都夹给我。",
        photo: "",
        aiText: "这一锅咕嘟咕嘟的热气，刚好替我说完想你。"
      }
    ],
    capsules: [
      {
        id: "c1",
        title: "给一周年的我们",
        content: "如果你看到这段话，说明我们又一起走过了好多天。谢谢你一直在。",
        unlockAt: addDays(12),
        createdAt: todayString(),
        opened: false
      },
      {
        id: "c2",
        title: "今天就能打开的小纸条",
        content: "今天也要好好吃饭，好好睡觉，也好好被我喜欢。",
        unlockAt: addDays(-1),
        createdAt: addDays(-3),
        opened: false
      }
    ]
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      const defaults = defaultState();
      return {
        ...defaults,
        ...stored,
        couple: { ...defaults.couple, ...stored.couple },
        memories: Array.isArray(stored.memories) ? stored.memories : defaults.memories,
        capsules: Array.isArray(stored.capsules) ? stored.capsules : defaults.capsules,
        wishes: Array.isArray(stored.wishes) ? stored.wishes : defaults.wishes
      };
    }
  } catch (error) {
    console.warn(error);
  }
  const initial = defaultState();
  saveState(initial);
  return initial;
}

function saveState(next = state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function refreshAfter(message, options = {}) {
  saveState();
  render();
  $(".shell").classList.remove("refresh-pop");
  void $(".shell").offsetWidth;
  $(".shell").classList.add("refresh-pop");
  if (options.confetti) confetti(options.confetti === true ? 80 : options.confetti);
  if (options.surprise) maybeRandomEasterEgg();
  toast(message || "页面已刷新");
}

function daysBetween(start, end = todayString()) {
  const startTime = new Date(`${start}T00:00:00`).getTime();
  const endTime = new Date(`${end}T00:00:00`).getTime();
  return Math.max(1, Math.floor((endTime - startTime) / DAY) + 1);
}

function daysUntil(date) {
  const todayTime = new Date(`${todayString()}T00:00:00`).getTime();
  const targetTime = new Date(`${date}T00:00:00`).getTime();
  return Math.ceil((targetTime - todayTime) / DAY);
}

function anniversaries() {
  const start = new Date(`${state.couple.startDate}T00:00:00`);
  const items = [
    ["100天", new Date(start.getTime() + 99 * DAY)],
    ["365天", new Date(start.getTime() + 364 * DAY)],
    ["520天", new Date(start.getTime() + 519 * DAY)]
  ];
  for (let year = 1; year <= 5; year += 1) {
    items.push([`${year}周年`, new Date(start.getFullYear() + year, start.getMonth(), start.getDate())]);
  }
  return items
    .map(([name, date]) => ({ name, date: todayString(date), left: daysUntil(todayString(date)) }))
    .filter((item) => item.left >= 0)
    .sort((a, b) => a.left - b.left)
    .slice(0, 3);
}

function makeAiText(title, story) {
  const text = `${title}${story}`;
  if (text.includes("生日")) return "把生日愿望分你一半，剩下的一半还是关于你。";
  if (text.includes("雨")) return "下雨天也不坏，因为有人把普通日子撑成了浪漫。";
  if (text.includes("吃") || text.includes("火锅")) return "热气、笑声和你，刚好凑成我最喜欢的一餐。";
  if (text.includes("电影")) return "电影会散场，但牵手回家的那段路会一直亮着。";
  return "这一天被认真收藏，因为里面有你，也有我们慢慢变好的样子。";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

function render() {
  const [a, b] = state.couple.names;
  $("#daysTogether").textContent = daysBetween(state.couple.startDate);
  $("#coupleLine").textContent = `${a} 和 ${b} 的纪念册，也是给未来的秘密信箱。`;
  $("#memoryCount").textContent = state.memories.length;
  $("#capsuleCount").textContent = state.capsules.length;
  $("#moodNote").value = state.moodToday?.date === todayString() ? state.moodToday.note : "";
  selectedMood = state.moodToday?.date === todayString() ? state.moodToday.mood : selectedMood;
  applyMoodTheme(selectedMood);
  renderMoods();
  renderMonthlyReview();
  renderAnniversaries();
  renderCapsules();
  renderMemories();
  renderTask();
  renderWishes();
  renderPlayful();
  fillSettings();
}

function monthKey(date = new Date()) {
  return todayString(date).slice(0, 7);
}

function isThisMonth(dateString) {
  return String(dateString || "").slice(0, 7) === monthKey();
}

function renderMonthlyReview() {
  const memories = state.memories.filter((item) => isThisMonth(item.date));
  const openedCapsules = state.capsules.filter((item) => item.opened && isThisMonth(item.openedAt || item.createdAt || item.unlockAt));
  const completedReminders = (state.completedReminders || []).filter((date) => isThisMonth(date));
  const mood = state.moodToday?.date && isThisMonth(state.moodToday.date)
    ? (moods.find((item) => item.id === state.moodToday.mood)?.label || "未记录")
    : "未记录";
  const sweetest = memories.find((item) => item.aiText)?.aiText
    || state.currentLoveLine
    || "这个月还在慢慢变甜。";

  $("#monthlyReview").innerHTML = `
    <div class="review-grid">
      <div class="review-item"><strong>${memories.length}</strong><span>本月回忆</span></div>
      <div class="review-item"><strong>${openedCapsules.length}</strong><span>打开胶囊</span></div>
      <div class="review-item"><strong>${escapeHtml(mood)}</strong><span>最近心情</span></div>
      <div class="review-item"><strong>${completedReminders.length}</strong><span>做到提醒</span></div>
    </div>
    <p class="review-sweet">${escapeHtml(sweetest)}</p>
  `;
}

function applyMoodTheme(moodId) {
  const classes = moods.map((mood) => `mood-${mood.id}`);
  document.body.classList.remove(...classes);
  document.body.classList.add(`mood-${moodId || "sweet"}`);
}

function renderMoods() {
  $("#moodRow").innerHTML = moods.map((mood) => `
    <button class="mood-chip ${selectedMood === mood.id ? "active" : ""}" data-mood="${mood.id}" type="button">
      <strong>${mood.icon}</strong>
      <span>${mood.label}</span>
    </button>
  `).join("");
}

function renderAnniversaries() {
  const items = anniversaries();
  $("#anniversaryList").innerHTML = items.length ? items.map((item) => `
    <article class="anniversary-card">
      <strong>${item.left}</strong>
      <span>${item.name}</span>
      <small>${item.date}</small>
    </article>
  `).join("") : `<div class="empty">去设置里填上在一起的日期吧。</div>`;
}

function decorateCapsule(capsule) {
  const left = daysUntil(capsule.unlockAt);
  const unlocked = left <= 0;
  let text = `${capsule.unlockAt} 解锁`;
  if (unlocked) text = capsule.opened ? "已经打开过啦" : "今天可以打开";
  else if (left === 1) text = "明天就能打开";
  else text = `还有 ${left} 天打开`;
  return { ...capsule, left, unlocked, text };
}

function renderCapsules() {
  const capsules = state.capsules.slice().sort((a, b) => new Date(a.unlockAt) - new Date(b.unlockAt)).map(decorateCapsule);
  const next = capsules.find((item) => !item.unlocked) || capsules[0];
  $("#nextCapsule").innerHTML = next ? capsuleHtml(next) : `<div class="empty">还没有胶囊，给未来写一封吧。</div>`;
}

function capsuleHtml(capsule) {
  return `
    <article class="capsule-card" data-capsule="${capsule.id}">
      <span class="stamp ${capsule.unlocked ? "open" : ""}">${capsule.unlocked ? "可开" : "封存"}</span>
      <div>
        <strong>${escapeHtml(capsule.title)}</strong>
        <span>${capsule.text}</span>
      </div>
      <button class="tiny-btn" data-capsule-open="${capsule.id}">${capsule.unlocked ? "打开" : "查看"}</button>
    </article>
  `;
}

function renderMemories() {
  const memories = state.memories.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const visible = memories.slice(0, HOME_MEMORY_LIMIT);
  $("#memoryList").innerHTML = visible.length ? `
    ${visible.map((item) => `
    <article class="memory-card">
      <div class="memory-cover">${item.photo ? `<img src="${item.photo}" alt="">` : `<span>${typeText[item.type] || "回忆"}</span>`}</div>
      <div class="memory-body">
        <small>${item.date} · ${escapeHtml(item.place || "秘密地点")}</small>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.story)}</p>
        <div class="ai-line">${escapeHtml(item.aiText || makeAiText(item.title, item.story))}</div>
      </div>
    </article>
  `).join("")}
    ${memories.length > HOME_MEMORY_LIMIT ? `<div class="more-row"><button class="soft-btn" data-action="open-memory-manage">查看全部 ${memories.length} 条回忆</button></div>` : ""}
  ` : `<div class="empty">第一段回忆还空着，等你来放进来。</div>`;
}

function renderTask() {
  $("#taskText").textContent = state.currentTask || tasks[0];
  $("#taskTag").textContent = state.completedTasks.includes(todayString()) ? "已完成" : "今日";
}

function renderWishes() {
  const wishes = state.wishes || [];
  $("#wishList").innerHTML = wishes.length ? wishes.map((wish) => `
    <div class="wish-item ${wish.done ? "done" : ""}">
      <span>${escapeHtml(wish.text)}</span>
      <button data-wish-toggle="${wish.id}" type="button">${wish.done ? "恢复" : "完成"}</button>
      <button data-wish-delete="${wish.id}" type="button">删</button>
    </div>
  `).join("") : `<div class="empty">还没有愿望，先写一个小小的。</div>`;
}

function renderPlayful() {
  $("#dateIdea").textContent = state.currentDateIdea || dateIdeas[0];
  $("#kindnessCount").textContent = state.kindnessCount || 0;
  $("#secretCode").textContent = state.secretCode || "轻轻点三下这里";
  $("#loveLine").textContent = state.currentLoveLine || loveLines[0];
  $("#memoryPrompt").textContent = state.currentMemoryPrompt || memoryPrompts[0];
  $("#gentleReminder").textContent = state.currentReminder || gentleReminders[0];
  $("#recommendationText").textContent = state.currentRecommendation || recommendations[0];
  $("#questionText").textContent = state.currentQuestion || conversationQuestions[0];
}

function openManager(mode) {
  manageMode = mode;
  manageQuery = "";
  manageFilter = "all";
  $("#manageSearch").value = "";
  renderManageFilter();
  renderManager();
  openDialog("#manageDialog");
}

function renderManageFilter() {
  if (manageMode === "memory") {
    $("#manageTitle").textContent = "全部回忆";
    $("#manageTip").textContent = "按标题、地点、内容搜索，也可以按类型筛选。";
    $("#manageFilter").innerHTML = `
      <option value="all">全部类型</option>
      <option value="photo">合照</option>
      <option value="chat">聊天截图</option>
      <option value="date">约会地点</option>
      <option value="note">甜蜜瞬间</option>
    `;
    return;
  }

  $("#manageTitle").textContent = "全部胶囊";
  $("#manageTip").textContent = "可以查看状态、打开到期胶囊，也可以删除不需要的胶囊。";
  $("#manageFilter").innerHTML = `
    <option value="all">全部状态</option>
    <option value="locked">未解锁</option>
    <option value="ready">可打开</option>
    <option value="opened">已打开</option>
  `;
}

function renderManager() {
  if (manageMode === "memory") {
    renderMemoryManager();
    return;
  }
  renderCapsuleManager();
}

function renderMemoryManager() {
  const query = manageQuery.trim().toLowerCase();
  const list = state.memories
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((item) => manageFilter === "all" || item.type === manageFilter)
    .filter((item) => {
      if (!query) return true;
      return [item.title, item.place, item.story, item.aiText]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });

  $("#manageList").innerHTML = list.length ? list.map((item) => `
    <article class="manage-item">
      <div class="manage-item-head">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${item.date} · ${typeText[item.type] || "回忆"} · ${escapeHtml(item.place || "秘密地点")}</small>
        </div>
      </div>
      <p>${escapeHtml(item.story)}</p>
      ${item.aiText ? `<p class="ai-line">${escapeHtml(item.aiText)}</p>` : ""}
      <div class="manage-actions">
        <button class="soft-btn" data-memory-view="${item.id}" type="button">查看</button>
        <button class="danger-btn" data-memory-delete="${item.id}" type="button">删除</button>
      </div>
    </article>
  `).join("") : `<div class="empty">没有找到符合条件的回忆。</div>`;
}

function renderCapsuleManager() {
  const query = manageQuery.trim().toLowerCase();
  const list = state.capsules
    .slice()
    .sort((a, b) => new Date(a.unlockAt) - new Date(b.unlockAt))
    .map(decorateCapsule)
    .filter((item) => {
      if (manageFilter === "locked") return !item.unlocked;
      if (manageFilter === "ready") return item.unlocked && !item.opened;
      if (manageFilter === "opened") return item.opened;
      return true;
    })
    .filter((item) => {
      if (!query) return true;
      return [item.title, item.content, item.unlockAt].join(" ").toLowerCase().includes(query);
    });

  $("#manageList").innerHTML = list.length ? list.map((item) => `
    <article class="manage-item">
      <div class="manage-item-head">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${item.text}</small>
        </div>
        <span class="stamp ${item.unlocked ? "open" : ""}">${item.unlocked ? "可开" : "封存"}</span>
      </div>
      <p>${item.unlocked ? escapeHtml(item.content) : "内容还在封存中，到日期后才能查看。"}</p>
      <div class="manage-actions">
        <button class="soft-btn" data-capsule-open="${item.id}" type="button">${item.unlocked ? "打开" : "查看"}</button>
        <button class="danger-btn" data-capsule-delete="${item.id}" type="button">删除</button>
      </div>
    </article>
  `).join("") : `<div class="empty">没有找到符合条件的胶囊。</div>`;
}

function viewMemory(id) {
  const item = state.memories.find((memory) => memory.id === id);
  if (!item) return;
  $("#detailTitle").textContent = item.title;
  $("#detailMeta").textContent = `${item.date} · ${typeText[item.type] || "回忆"} · ${item.place || "秘密地点"}`;
  $("#detailStory").textContent = item.story;
  $("#detailAi").textContent = item.aiText || makeAiText(item.title, item.story);
  $("#detailPhoto").classList.toggle("show", Boolean(item.photo));
  $("#detailPhoto").innerHTML = item.photo ? `<img src="${item.photo}" alt="">` : "";
  openDialog("#detailDialog");
}

function deleteMemory(id) {
  if (!confirm("确定删除这条回忆吗？")) return;
  state.memories = state.memories.filter((item) => item.id !== id);
  refreshAfter("回忆已删除，页面已刷新");
  renderManager();
}

function deleteCapsule(id) {
  if (!confirm("确定删除这颗胶囊吗？")) return;
  state.capsules = state.capsules.filter((item) => item.id !== id);
  refreshAfter("胶囊已删除，页面已刷新");
  renderManager();
}

function fillSettings() {
  $("#nameA").value = state.couple.names[0] || "";
  $("#nameB").value = state.couple.names[1] || "";
  $("#startDate").value = state.couple.startDate || todayString();
  $("#lockPassword").value = "";
}

function openDialog(id) {
  const dialog = $(id);
  if (dialog && !dialog.open) dialog.showModal();
}

function closeDialogs() {
  $$("dialog[open]").forEach((dialog) => dialog.close());
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

async function hashText(text) {
  if (!text) return "";
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function photoToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 900;
        const scale = Math.min(1, max / Math.max(image.width, image.height));
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function exportPayload({ includePhotos = false } = {}) {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      ...state,
      memories: state.memories.map((memory) => includePhotos ? memory : { ...memory, photo: "" })
    }
  };
}

function encodePayload(payload) {
  const json = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(json)));
}

function decodePayload(code) {
  const json = decodeURIComponent(escape(atob(code.trim())));
  return JSON.parse(json);
}

function mergeImported(imported) {
  const data = imported.data || imported;
  if (!data.memories || !data.capsules || !data.couple) {
    throw new Error("同步码格式不对");
  }
  const memoryMap = new Map(state.memories.map((item) => [item.id, item]));
  data.memories.forEach((item) => memoryMap.set(item.id || createId("m"), { ...item, id: item.id || createId("m") }));
  const capsuleMap = new Map(state.capsules.map((item) => [item.id, item]));
  data.capsules.forEach((item) => capsuleMap.set(item.id || createId("c"), { ...item, id: item.id || createId("c") }));
  const wishMap = new Map((state.wishes || []).map((item) => [item.id, item]));
  (data.wishes || []).forEach((item) => wishMap.set(item.id || createId("w"), { ...item, id: item.id || createId("w") }));
  state = {
    ...state,
    couple: { ...state.couple, ...data.couple },
    moodToday: data.moodToday || state.moodToday,
    currentTask: data.currentTask || state.currentTask,
    currentDateIdea: data.currentDateIdea || state.currentDateIdea,
    currentReminder: data.currentReminder || state.currentReminder,
    currentRecommendation: data.currentRecommendation || state.currentRecommendation,
    currentQuestion: data.currentQuestion || state.currentQuestion,
    kindnessCount: Math.max(state.kindnessCount || 0, data.kindnessCount || 0),
    secretCode: data.secretCode || state.secretCode,
    completedTasks: Array.from(new Set([...(state.completedTasks || []), ...(data.completedTasks || [])])),
    completedReminders: Array.from(new Set([...(state.completedReminders || []), ...(data.completedReminders || [])])),
    wishes: Array.from(wishMap.values()),
    memories: Array.from(memoryMap.values()),
    capsules: Array.from(capsuleMap.values())
  };
  refreshAfter("导入成功，页面已刷新", { confetti: 45 });
}

function makeSyncCode() {
  const code = encodePayload(exportPayload({ includePhotos: false }));
  $("#syncCode").value = code;
  renderQr(code);
  toast("同步码已生成，复制发给对方即可");
}

function renderQr(code) {
  const box = $("#qrBox");
  box.innerHTML = "";
  const url = `${location.origin}${location.pathname}#sync=${encodeURIComponent(code)}`;
  if (!code || url.length > 2200 || typeof QRCode === "undefined") {
    box.innerHTML = `<span class="modal-tip">同步码较长，建议复制发送。</span>`;
    return;
  }
  QRCode.toCanvas(url, { width: 148, margin: 1 }, (error, canvas) => {
    if (error) {
      box.innerHTML = `<span class="modal-tip">二维码生成失败，请复制同步码。</span>`;
      return;
    }
    canvas.setAttribute("aria-label", "同步二维码");
    box.appendChild(canvas);
  });
}

function importFromHash() {
  if (!location.hash.startsWith("#sync=")) return;
  const code = decodeURIComponent(location.hash.replace("#sync=", ""));
  try {
    mergeImported(decodePayload(code));
    history.replaceState(null, "", location.pathname + location.search);
  } catch (error) {
    toast("二维码同步数据不可用");
  }
}

function downloadBackup() {
  const blob = new Blob([JSON.stringify(exportPayload({ includePhotos: true }), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `恋恋时光备份-${todayString()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  toast("备份文件已生成");
}

function openCapsule(id) {
  const capsule = state.capsules.find((item) => item.id === id);
  if (!capsule) return;
  const info = decorateCapsule(capsule);
  if (!info.unlocked) {
    toast(`${info.text}，先让它再藏一会儿`);
    return;
  }
  capsule.opened = true;
  capsule.openedAt = todayString();
  lastOpenedCapsuleId = capsule.id;
  refreshAfter("胶囊已打开，页面已刷新", { confetti: true });
  $("#openCapsuleTitle").textContent = capsule.title;
  $("#openCapsuleMeta").textContent = `${capsule.unlockAt} 解锁`;
  $("#openCapsuleContent").textContent = capsule.content;
  openDialog("#openCapsuleDialog");
}

function saveOpenedCapsuleAsMemory() {
  const capsule = state.capsules.find((item) => item.id === lastOpenedCapsuleId);
  if (!capsule) {
    toast("没有可保存的开箱内容");
    return;
  }
  state.memories.unshift({
    id: createId("m"),
    type: "note",
    title: `打开胶囊：${capsule.title}`,
    date: todayString(),
    place: "时光胶囊",
    story: capsule.content,
    photo: "",
    aiText: "今天终于等到这封来自过去的信。"
  });
  closeDialogs();
  refreshAfter("已把开箱存成回忆", { confetti: 60, surprise: true });
}

function dailySurprise() {
  const options = [
    "今天适合把旧照片翻出来看一眼。",
    "今天的隐藏任务：认真说一句谢谢。",
    "今日暗号：见面时先笑一下。",
    "今天适合写一个 30 天后的胶囊。",
    "把手机递给对方，让对方选一个回忆标题。",
    "今天把愿望清单里最小的一件事完成掉。",
    "今天适合存一颗糖到甜蜜存折。",
    "惊喜：今天把首页换成一个最像你的心情。",
    "惊喜：去愿望清单里挑一个最容易完成的。",
    "惊喜：生成一句情话，发给对方不用解释。",
    "惊喜：写一个只封存 24 小时的小胶囊。",
    "惊喜：抽一个约会，如果太难就把它改简单。",
    "惊喜：今天把一件小事讲具体一点。"
  ];
  const index = Math.floor(Math.random() * options.length);
  const message = options[index];
  $("#surpriseWord").textContent = "惊喜";
  if (index % 4 === 0) {
    const randomMood = moods[Math.floor(Math.random() * moods.length)].id;
    selectedMood = randomMood;
    applyMoodTheme(randomMood);
    renderMoods();
  }
  toast(message);
  confetti(45);
}

function shuffleTask() {
  state.currentTask = tasks[Math.floor(Math.random() * tasks.length)];
  refreshAfter("换好啦，页面已刷新", { surprise: true });
}

function finishTask() {
  const today = todayString();
  if (!state.completedTasks.includes(today)) state.completedTasks.push(today);
  state.kindnessCount = (state.kindnessCount || 0) + 1;
  refreshAfter("今日小任务完成，顺手存了一颗糖", { confetti: true, surprise: true });
}

function addWish() {
  const input = $("#wishInput");
  const text = input.value.trim();
  if (!text) {
    toast("先写一个愿望");
    return;
  }
  state.wishes.unshift({ id: createId("w"), text, done: false });
  input.value = "";
  refreshAfter("愿望已加入，页面已刷新", { surprise: true });
}

function toggleWish(id) {
  const wish = state.wishes.find((item) => item.id === id);
  if (!wish) return;
  wish.done = !wish.done;
  if (wish.done) state.kindnessCount = (state.kindnessCount || 0) + 1;
  refreshAfter(wish.done ? "愿望完成啦，页面已刷新" : "愿望已恢复", { confetti: wish.done ? 70 : false });
}

function deleteWish(id) {
  state.wishes = state.wishes.filter((item) => item.id !== id);
  refreshAfter("愿望已删除，页面已刷新");
}

function drawDate() {
  const next = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
  state.currentDateIdea = next;
  refreshAfter("抽到新的约会灵感", { surprise: true });
}

function drawLoveLine() {
  state.currentLoveLine = loveLines[Math.floor(Math.random() * loveLines.length)];
  refreshAfter("新的情话已生成", { surprise: true });
}

function drawMemoryPrompt() {
  state.currentMemoryPrompt = memoryPrompts[Math.floor(Math.random() * memoryPrompts.length)];
  refreshAfter("新的回忆灵感来了", { surprise: true });
}

function drawReminder() {
  state.currentReminder = gentleReminders[Math.floor(Math.random() * gentleReminders.length)];
  refreshAfter("新的温柔提醒来了", { surprise: true });
}

function finishReminder() {
  const today = todayString();
  if (!state.completedReminders.includes(today)) state.completedReminders.push(today);
  state.kindnessCount = (state.kindnessCount || 0) + 1;
  refreshAfter("做到了，甜蜜存折 +1", { confetti: 45, surprise: true });
}

function drawRecommendation() {
  state.currentRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
  refreshAfter("推荐已更新", { surprise: true });
}

function recommendationToWish() {
  const text = state.currentRecommendation || recommendations[0];
  state.wishes.unshift({ id: createId("w"), text, done: false });
  refreshAfter("已加入愿望清单", { confetti: 35, surprise: true });
}

function drawQuestion() {
  state.currentQuestion = conversationQuestions[Math.floor(Math.random() * conversationQuestions.length)];
  refreshAfter("今晚的话题已更新", { surprise: true });
}

function addKindness() {
  state.kindnessCount = (state.kindnessCount || 0) + 1;
  refreshAfter("甜蜜存折 +1", { confetti: 35, surprise: true });
}

function revealSecretCode() {
  secretTapCount += 1;
  clearTimeout(secretTapTimer);
  secretTapTimer = setTimeout(() => {
    secretTapCount = 0;
  }, 900);
  if (secretTapCount < 3) {
    toast(`再点 ${3 - secretTapCount} 下`);
    return;
  }
  secretTapCount = 0;
  state.secretCode = secretCodes[Math.floor(Math.random() * secretCodes.length)];
  refreshAfter("今日暗号出现了", { confetti: 60 });
}

function maybeRandomEasterEgg() {
  if (Math.random() > 0.18) return;
  const eggs = [
    "彩蛋：今天适合多说一句喜欢。",
    "彩蛋：你们的甜蜜存折悄悄发光了一下。",
    "彩蛋：把这个瞬间也存进时间轴吧。",
    "彩蛋：未来的你们正在偷笑。"
  ];
  setTimeout(() => toast(eggs[Math.floor(Math.random() * eggs.length)]), 650);
}

function confetti(count = 80) {
  const canvas = $("#confetti");
  const context = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  context.scale(ratio, ratio);
  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: -20 - Math.random() * 120,
    r: 4 + Math.random() * 6,
    vx: -1.5 + Math.random() * 3,
    vy: 2 + Math.random() * 4,
    color: ["#ee7587", "#f4c857", "#52b99c", "#5aa4da", "#ff9d72"][Math.floor(Math.random() * 5)]
  }));
  let frame = 0;
  const tick = () => {
    frame += 1;
    context.clearRect(0, 0, innerWidth, innerHeight);
    pieces.forEach((piece) => {
      piece.x += piece.vx;
      piece.y += piece.vy;
      context.fillStyle = piece.color;
      context.fillRect(piece.x, piece.y, piece.r, piece.r * 1.8);
    });
    if (frame < 110) requestAnimationFrame(tick);
    else context.clearRect(0, 0, innerWidth, innerHeight);
  };
  tick();
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "open-memory") {
      $("#memoryDate").value = todayString();
      openDialog("#memoryDialog");
    }
    if (action === "open-capsule") {
      $("#capsuleDate").value = addDays(30);
      openDialog("#capsuleDialog");
    }
    if (action === "open-memory-manage") openManager("memory");
    if (action === "open-capsule-manage") openManager("capsule");
    if (action === "open-sync") openDialog("#syncDialog");
    if (action === "open-settings") {
      fillSettings();
      openDialog("#settingsDialog");
    }
    if (action === "close-modal") closeDialogs();
    if (action === "save-mood") {
      state.moodToday = { mood: selectedMood, note: $("#moodNote").value.trim(), date: todayString() };
      refreshAfter("今日心情已保存，页面已刷新", { surprise: true });
    }
    if (action === "make-sync") makeSyncCode();
    if (action === "copy-sync") navigator.clipboard.writeText($("#syncCode").value).then(() => toast("已复制"));
    if (action === "import-sync") {
      try {
        mergeImported(decodePayload($("#syncCode").value));
      } catch (error) {
        toast(error.message || "导入失败");
      }
    }
    if (action === "download-backup") downloadBackup();
    if (action === "daily-surprise") dailySurprise();
    if (action === "shuffle-task") shuffleTask();
    if (action === "finish-task") finishTask();
    if (action === "add-wish") addWish();
    if (action === "draw-date") drawDate();
    if (action === "draw-love-line") drawLoveLine();
    if (action === "draw-memory-prompt") drawMemoryPrompt();
    if (action === "draw-reminder") drawReminder();
    if (action === "finish-reminder") finishReminder();
    if (action === "draw-recommendation") drawRecommendation();
    if (action === "recommendation-to-wish") recommendationToWish();
    if (action === "draw-question") drawQuestion();
    if (action === "add-kindness") addKindness();
    if (action === "secret-code") revealSecretCode();
    if (action === "save-opened-capsule-memory") saveOpenedCapsuleAsMemory();

    const mood = event.target.closest("[data-mood]")?.dataset.mood;
    if (mood) {
      selectedMood = mood;
      applyMoodTheme(mood);
      renderMoods();
    }

    const capsuleId = event.target.closest("[data-capsule-open]")?.dataset.capsuleOpen;
    if (capsuleId) {
      openCapsule(capsuleId);
      if ($("#manageDialog").open) renderManager();
    }

    const wishToggle = event.target.closest("[data-wish-toggle]")?.dataset.wishToggle;
    if (wishToggle) toggleWish(wishToggle);

    const wishDelete = event.target.closest("[data-wish-delete]")?.dataset.wishDelete;
    if (wishDelete) deleteWish(wishDelete);

    const memoryView = event.target.closest("[data-memory-view]")?.dataset.memoryView;
    if (memoryView) viewMemory(memoryView);

    const memoryDelete = event.target.closest("[data-memory-delete]")?.dataset.memoryDelete;
    if (memoryDelete) deleteMemory(memoryDelete);

    const capsuleDelete = event.target.closest("[data-capsule-delete]")?.dataset.capsuleDelete;
    if (capsuleDelete) deleteCapsule(capsuleDelete);
  });

  $("#manageSearch").addEventListener("input", (event) => {
    manageQuery = event.target.value;
    renderManager();
  });

  $("#manageFilter").addEventListener("change", (event) => {
    manageFilter = event.target.value;
    renderManager();
  });

  $("#wishInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") addWish();
  });

  $("#memoryPhoto").addEventListener("change", async (event) => {
    currentPhoto = await photoToDataUrl(event.target.files[0]);
    $("#photoPreview").style.display = currentPhoto ? "block" : "none";
    $("#photoPreview").innerHTML = currentPhoto ? `<img src="${currentPhoto}" alt="">` : "";
  });

  $("#memoryForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#memoryTitle").value.trim();
    const story = $("#memoryStory").value.trim();
    state.memories.unshift({
      id: createId("m"),
      type: $("#memoryType").value,
      title,
      date: $("#memoryDate").value,
      place: $("#memoryPlace").value.trim(),
      story,
      photo: currentPhoto,
      aiText: makeAiText(title, story)
    });
    currentPhoto = "";
    $("#memoryForm").reset();
    $("#photoPreview").style.display = "none";
    closeDialogs();
    refreshAfter("已存入时间轴，页面已刷新", { confetti: 45, surprise: true });
  });

  $("#capsuleTemplates").innerHTML = capsuleTemplates.map((item, index) => `<button type="button" data-template="${index}">${item[0]}</button>`).join("");
  $("#capsuleTemplates").addEventListener("click", (event) => {
    const index = event.target.closest("[data-template]")?.dataset.template;
    if (index === undefined) return;
    const [, title, content] = capsuleTemplates[Number(index)];
    $("#capsuleTitle").value = title;
    $("#capsuleContent").value = content;
  });

  $("#capsuleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.capsules.unshift({
      id: createId("c"),
      title: $("#capsuleTitle").value.trim(),
      content: $("#capsuleContent").value.trim(),
      unlockAt: $("#capsuleDate").value,
      createdAt: todayString(),
      opened: false
    });
    $("#capsuleForm").reset();
    closeDialogs();
    refreshAfter("胶囊已封存，页面已刷新", { confetti: 35, surprise: true });
  });

  $("#settingsForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    state.couple.names = [$("#nameA").value.trim(), $("#nameB").value.trim()];
    state.couple.startDate = $("#startDate").value;
    const password = $("#lockPassword").value.trim();
    if (password) state.couple.lockHash = await hashText(password);
    closeDialogs();
    refreshAfter("设置已保存，页面已刷新", { surprise: true });
  });

  $("#unlockForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputHash = await hashText($("#unlockPassword").value.trim());
    if (inputHash === state.couple.lockHash) {
      state.couple.lastUnlockedAt = new Date().toISOString();
      saveState();
      $("#lockDialog").close();
      toast("欢迎回来");
    } else {
      toast("密码不对");
    }
  });

  $("#backupFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        mergeImported(JSON.parse(reader.result));
      } catch (error) {
        toast("备份文件不对");
      }
    };
    reader.readAsText(file);
  });
}

function maybeLock() {
  if (!state.couple.lockHash) return;
  const last = state.couple.lastUnlockedAt ? new Date(state.couple.lastUnlockedAt).getTime() : 0;
  if (Date.now() - last > 10 * 60 * 1000) openDialog("#lockDialog");
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(`./service-worker.js?v=${APP_VERSION}`).catch(console.warn);
  }
}

bindEvents();
render();
maybeLock();
importFromHash();
registerServiceWorker();
