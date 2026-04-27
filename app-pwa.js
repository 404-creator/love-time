const STORAGE_KEY = "love_pwa_v1";
const BACKUP_VERSION = 1;
const DAY = 24 * 60 * 60 * 1000;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const moods = [
  { id: "sweet", icon: "甜", label: "很甜" },
  { id: "miss", icon: "想", label: "想你" },
  { id: "happy", icon: "晴", label: "开心" },
  { id: "tired", icon: "困", label: "累了" }
];

const tasks = [
  "给对方发一句只属于今天的夸夸。",
  "翻一张旧照片，说出当时最喜欢的细节。",
  "写下下次见面最想一起做的一件事。",
  "互相给今天的心情取一个天气名。",
  "约定一个 15 分钟不看手机的小聊天。",
  "把最近没说出口的谢谢认真说一遍。",
  "一起选一首歌，当作本周的背景音乐。",
  "给未来的你们写一句暗号。"
];

const capsuleTemplates = [
  ["一周年", "给一周年的我们", "如果这封信被打开了，说明我们又一起走过了一段很珍贵的路。谢谢你一直在。"],
  ["生日", "生日那天打开", "今天要把所有好听的话都送给你。愿你被爱包围，也一直做自己喜欢的人。"],
  ["跨年", "跨年夜的小约定", "新的一年，我们也慢慢来，好好说话，好好拥抱，好好喜欢彼此。"],
  ["吵架后", "冷静后一起看", "如果那天我们有点别扭，也请记得：我想解决问题，不想失去你。"]
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
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      const defaults = defaultState();
      return {
        ...defaults,
        ...stored,
        couple: { ...defaults.couple, ...stored.couple },
        memories: Array.isArray(stored.memories) ? stored.memories : defaults.memories,
        capsules: Array.isArray(stored.capsules) ? stored.capsules : defaults.capsules
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
  renderMoods();
  renderAnniversaries();
  renderCapsules();
  renderMemories();
  renderTask();
  fillSettings();
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
  $("#nextCapsule").innerHTML = next ? capsuleHtml(next, true) : `<div class="empty">还没有胶囊，给未来写一封吧。</div>`;
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
  $("#memoryList").innerHTML = memories.length ? memories.map((item) => `
    <article class="memory-card">
      <div class="memory-cover">${item.photo ? `<img src="${item.photo}" alt="">` : `<span>${typeText[item.type] || "回忆"}</span>`}</div>
      <div class="memory-body">
        <small>${item.date} · ${escapeHtml(item.place || "秘密地点")}</small>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.story)}</p>
        <div class="ai-line">${escapeHtml(item.aiText || makeAiText(item.title, item.story))}</div>
      </div>
    </article>
  `).join("") : `<div class="empty">第一段回忆还空着，等你来放进来。</div>`;
}

function renderTask() {
  $("#taskText").textContent = state.currentTask || tasks[0];
  $("#taskTag").textContent = state.completedTasks.includes(todayString()) ? "已完成" : "今日";
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
  state = {
    ...state,
    couple: { ...state.couple, ...data.couple },
    moodToday: data.moodToday || state.moodToday,
    currentTask: data.currentTask || state.currentTask,
    completedTasks: Array.from(new Set([...(state.completedTasks || []), ...(data.completedTasks || [])])),
    memories: Array.from(memoryMap.values()),
    capsules: Array.from(capsuleMap.values())
  };
  saveState();
  render();
}

function makeSyncCode() {
  const code = encodePayload(exportPayload({ includePhotos: false }));
  $("#syncCode").value = code;
  renderQr(code);
  toast("同步码已生成");
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
    toast("已从二维码导入同步数据");
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
  saveState();
  render();
  confetti();
  alert(`${capsule.title}\n\n${capsule.content}`);
}

function dailySurprise() {
  const options = [
    "今天适合把旧照片翻出来看一眼。",
    "今天的隐藏任务：认真说一句谢谢。",
    "今日暗号：见面时先笑一下。",
    "今天适合写一个 30 天后的胶囊。",
    "把手机递给对方，让对方选一个回忆标题。"
  ];
  const message = options[Math.floor(Math.random() * options.length)];
  $("#surpriseWord").textContent = "惊喜";
  toast(message);
  confetti(45);
}

function shuffleTask() {
  state.currentTask = tasks[Math.floor(Math.random() * tasks.length)];
  saveState();
  renderTask();
}

function finishTask() {
  const today = todayString();
  if (!state.completedTasks.includes(today)) state.completedTasks.push(today);
  saveState();
  renderTask();
  confetti();
  toast("今日小任务完成啦");
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
    if (action === "open-sync") {
      openDialog("#syncDialog");
    }
    if (action === "open-settings") {
      fillSettings();
      openDialog("#settingsDialog");
    }
    if (action === "close-modal") closeDialogs();
    if (action === "save-mood") {
      state.moodToday = { mood: selectedMood, note: $("#moodNote").value.trim(), date: todayString() };
      saveState();
      render();
      toast("今日心情已保存");
    }
    if (action === "make-sync") makeSyncCode();
    if (action === "copy-sync") navigator.clipboard.writeText($("#syncCode").value).then(() => toast("已复制"));
    if (action === "import-sync") {
      try {
        mergeImported(decodePayload($("#syncCode").value));
        toast("导入成功");
      } catch (error) {
        toast(error.message || "导入失败");
      }
    }
    if (action === "download-backup") downloadBackup();
    if (action === "daily-surprise") dailySurprise();
    if (action === "shuffle-task") shuffleTask();
    if (action === "finish-task") finishTask();

    const mood = event.target.closest("[data-mood]")?.dataset.mood;
    if (mood) {
      selectedMood = mood;
      renderMoods();
    }

    const capsuleId = event.target.closest("[data-capsule-open]")?.dataset.capsuleOpen;
    if (capsuleId) openCapsule(capsuleId);
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
    saveState();
    closeDialogs();
    render();
    toast("已存入时间轴");
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
    saveState();
    closeDialogs();
    render();
    toast("胶囊已封存");
  });

  $("#settingsForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    state.couple.names = [$("#nameA").value.trim(), $("#nameB").value.trim()];
    state.couple.startDate = $("#startDate").value;
    const password = $("#lockPassword").value.trim();
    if (password) state.couple.lockHash = await hashText(password);
    saveState();
    closeDialogs();
    render();
    toast("设置已保存");
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
        toast("备份导入成功");
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
  if (Date.now() - last > 10 * 60 * 1000) {
    openDialog("#lockDialog");
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(console.warn);
  }
}

bindEvents();
render();
maybeLock();
importFromHash();
registerServiceWorker();
