/* app.js - 主应用逻辑 */
'use strict';

const App = {
  ITEM_ICONS: [
    { id: 'drop', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>' },
    { id: 'dumbbell', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5l11 11"/><path d="M21 21l-1-1"/><path d="M3 3l1 1"/><path d="M18 22l4-4"/><path d="M2 6l4-4"/><path d="M3 10l7-7"/><path d="M14 21l7-7"/></svg>' },
    { id: 'book', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' },
    { id: 'sun', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>' },
    { id: 'moon', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>' },
    { id: 'heart', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/></svg>' },
    { id: 'apple', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>' },
    { id: 'coffee', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>' },
    { id: 'music', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' },
    { id: 'pen', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>' },
    { id: 'walk', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2"/><path d="M12 22v-4l-3-3 1-6 4 2 3 5 2 1"/></svg>' },
    { id: 'smile', svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>' },
  ],
  // 当前选中的日期（打卡页用），默认今天
  currentDate: null,
  // 当前编辑的项目id（新增时为null）
  editingItemId: null,
  // 当前要打卡的项目id（打开状态弹窗时）
  pendingItemId: null,
  // 当前统计选中的项目
  statsItemId: null,
  statsRange: 'week',
  // 当前进行中的生理期记录
  activePeriod: null,

  /* ========== 工具函数 ========== */
  todayStr() {
    const d = new Date();
    return this._fmtDate(d);
  },
  _fmtDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  },
  addDays(dateStr, n) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return this._fmtDate(d);
  },
  diffDays(a, b) {
    // b - a 天数
    const da = new Date(a + 'T00:00:00');
    const db = new Date(b + 'T00:00:00');
    return Math.round((db - da) / 86400000);
  },
  isWithin30Days(dateStr) {
    const diff = this.diffDays(dateStr, this.todayStr());
    return diff >= 0 && diff <= 30;
  },
  weekdayCN(dateStr) {
    const wd = ['日', '一', '二', '三', '四', '五', '六'];
    return '周' + wd[new Date(dateStr + 'T00:00:00').getDay()];
  },
  toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.add('hidden'), 1800);
  },

  /* ========== 初始化 ========== */
  async init() {
    this.currentDate = this.todayStr();

    // 初始化DB
    await DB.open();
    // 读设置
    this.encourageEnabled = true;
    this.encourageText = '';

    // 注册SW
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    this._bindEvents();
    await this.refresh();

    // 自动保存兜底：切后台/关闭前不需要额外动作，因为每次操作已即时写入。
    // 这里再监听 visibilitychange 做一次状态同步（数据已经在IndexedDB，无需flush）
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // 触发一次render以确保最新状态（保险）
        this.refresh();
      }
    });
    window.addEventListener('beforeunload', () => {
      this.refresh();
    });
  },

  async refresh() {
    await this.loadActivePeriod();
    this.renderHeader();
    await this.renderToday();
    await this.renderHabitList();
    await this.renderMedPage();
    await this.renderTasks();
    await this.renderLogs();
    await this.renderStatsItemSelect();
    if (this.statsItemId || this.statsType === 'period') await this.renderStats();
  },

  renderHeader() {
    const titles = { habit: '打卡', med: '用药', log: '日志', tasks: '任务', stats: '统计', me: '我的' };
    const active = document.querySelector('.tab.active');
    document.getElementById('headerTitle').textContent = titles[active?.dataset.tab] || '今日';
  },

  /* ========== 事件绑定 ========== */
  _bindEvents() {
    // Tab切换
    document.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', async () => {
        document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        document.getElementById('page-' + tab).classList.remove('hidden');
        this.renderHeader();
        if (tab === 'habit') { await this.renderToday(); await this.renderHabitList(); }
        if (tab === 'med') await this.renderMedPage();
        if (tab === 'log') await this.renderLogs();
        if (tab === 'tasks') await this.renderTasks();
        if (tab === 'stats') { await this.renderStatsItemSelect(); this.renderStats(); }
        if (tab === 'me') await this.renderMeStats();
      });
    });

    // 顶栏备份按钮
    document.getElementById('headerBackupBtn').addEventListener('click', async () => {
      const r = await Backup.exportCSV();
      this.toast(`已导出 ${r.records} 条记录`);
    });

    // ==== 打卡页 ====
    document.getElementById('habitDatePicker').value = this.currentDate;
    document.getElementById('habitDatePicker').addEventListener('change', (e) => {
      this.currentDate = e.target.value;
      this.renderHabitList();
      this.renderMeds();
    });
    document.getElementById('addItemBtn').addEventListener('click', () => this.openItemModal(null));
    document.getElementById('manageCatsBtn').addEventListener('click', () => this.openManageCats());
    document.getElementById('addCatBtn').addEventListener('click', () => {
      this.closeModal('manageCatsModal');
      this.openItemModal(null);
    });
    document.getElementById('manageCatsBack').addEventListener('click', () => this.closeModal('manageCatsModal'));
    document.getElementById('manageMedsBtn').addEventListener('click', () => this.openManageMeds());
    document.getElementById('medCatchupBtn').addEventListener('click', () => this.openMedCatchup());
    document.getElementById('manageMedsBack').addEventListener('click', () => this.closeModal('manageMedsModal'));
    document.getElementById('addMedBtn').addEventListener('click', () => {
      this.closeModal('manageMedsModal');
      this.openMedModal(null);
    });

    // ==== 项目弹窗 ====
    document.getElementById('itemCancelBtn').addEventListener('click', () => this.closeModal('itemModal'));
    document.getElementById('itemSaveBtn').addEventListener('click', () => this.saveItem());
    document.querySelectorAll('.color-dot').forEach(dot => {
      dot.style.background = dot.dataset.color;
      dot.addEventListener('click', () => {
        document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });
    // 图标选择器初始化
    const iconPicker = document.getElementById('iconPicker');
    this.ITEM_ICONS.forEach((ic, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'icon-opt' + (i === 0 ? ' active' : '');
      b.dataset.icon = ic.id;
      b.innerHTML = ic.svg;
      b.addEventListener('click', () => {
        iconPicker.querySelectorAll('.icon-opt').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
      iconPicker.appendChild(b);
    });
    document.getElementById('itemDeleteBtn').addEventListener('click', () => this.deleteItem());
    document.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    // ==== 状态弹窗 ====
    document.getElementById('statusCancelBtn').addEventListener('click', () => this.closeModal('statusModal'));
    document.querySelectorAll('.status-btn').forEach(btn => {
      btn.addEventListener('click', () => this.confirmStatus(btn.dataset.status));
    });

    // ==== 生理期 ====
    document.getElementById('togglePeriodBtn').addEventListener('click', () => this.togglePeriod());
    document.getElementById('periodEndBtn').addEventListener('click', () => this.endPeriod());
    document.getElementById('confirmStartBtn').addEventListener('click', () => this.confirmStartPeriod());
    document.getElementById('confirmEndBtn').addEventListener('click', () => this.confirmEndPeriod());

    // ==== 统计页 ====
    document.getElementById('statsItemSelect').addEventListener('change', (e) => {
      this.statsItemId = Number(e.target.value) || null;
      this.renderStats();
    });
    document.querySelectorAll('#statsRangeSeg button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#statsRangeSeg button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.statsRange = btn.dataset.range;
        this.statsCursor = this.todayStr();
        this.renderStats();
      });
    });

    // ==== 设置页 ====
    document.getElementById('exportBtn').addEventListener('click', async () => {
      const r = await Backup.exportCSV();
      this.toast(`已导出 ${r.records} 条记录`);
    });
    document.getElementById('importBtn').addEventListener('click', () => {
      document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await Backup.readFile(file);
        const r = await Backup.importCSV(text);
        if (r) {
          this.toast('导入成功');
          await this.refresh();
        }
      } catch (err) {
        alert('导入失败：' + err.message);
      }
      e.target.value = '';
    });

    // 重置
    document.getElementById('resetRecordsBtn').addEventListener('click', async () => {
      if (!confirm('确定清空所有打卡记录？项目和生理期记录保留。')) return;
      await DB.clear('records');
      this.toast('已清空打卡记录');
      await this.refresh();
    });
    document.getElementById('resetItemsBtn').addEventListener('click', async () => {
      if (!confirm('确定删除所有打卡项目？相关打卡记录也会删除。')) return;
      await DB.clear('records');
      await DB.clear('items');
      this.toast('已清空项目');
      await this.refresh();
    });
    document.getElementById('resetAllBtn').addEventListener('click', async () => {
      if (!confirm('警告：将清空所有数据（项目、记录、生理期、用药、任务、设置），不可恢复！继续？')) return;
      await DB.clear('records');
      await DB.clear('items');
      await DB.clear('periods');
      await DB.clear('meds');
      await DB.clear('medRecords');
      await DB.clear('tasks');
      await DB.clear('settings');
      this.toast('已重置全部数据');
      await this.refresh();
    });

    // ========== 用药事件 ==========
    document.getElementById('addMedBtn').addEventListener('click', () => this.openMedModal(null));
    document.getElementById('medCancelBtn').addEventListener('click', () => this.closeModal('medModal'));
    document.getElementById('medSaveBtn').addEventListener('click', () => this.saveMed());
    document.getElementById('medDeleteBtn').addEventListener('click', () => this.deleteMed());
    document.getElementById('medType').addEventListener('change', (e) => {
      document.getElementById('intervalConfig').classList.toggle('hidden', e.target.value !== 'interval');
      document.getElementById('cycleConfig').classList.toggle('hidden', e.target.value !== 'cycle');
    });
    document.querySelectorAll('.status-btn[data-status]').forEach(btn => {
      if (btn.closest('#medStatusModal')) return;
    });
    document.querySelectorAll('#medStatusModal .status-btn').forEach(btn => {
      btn.addEventListener('click', () => this.confirmMedStatus(btn.dataset.status));
    });
    document.getElementById('medStatusCancelBtn').addEventListener('click', () => this.closeModal('medStatusModal'));
    document.getElementById('medCatchupCancelBtn').addEventListener('click', () => this.closeModal('medCatchupModal'));

    // ========== 任务事件 ==========
    document.getElementById('addTaskBtn').addEventListener('click', () => this.openTaskModal(null));
    document.getElementById('taskCancelBtn').addEventListener('click', () => this.closeModal('taskModal'));
    document.getElementById('taskSaveBtn').addEventListener('click', () => this.saveTask());
    document.getElementById('taskDeleteBtn').addEventListener('click', () => this.deleteTask());
    document.getElementById('taskType').addEventListener('change', (e) => {
      document.getElementById('taskDateRow').classList.toggle('hidden', e.target.value !== 'once');
      document.getElementById('taskEndDateRow').classList.toggle('hidden', e.target.value !== 'long');
    });
    document.querySelectorAll('#taskViewSeg button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#taskViewSeg button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.taskView = btn.dataset.view;
        this.renderTasks();
      });
    });
    // 统计类型切换
    this.statsType = 'habit';
    this.chartType = 'heatmap';
    this.statsCursor = this.todayStr(); // 统计日期游标
    document.querySelectorAll('#statsTypeSeg button').forEach(btn => {
      btn.addEventListener('click', async () => {
        document.querySelectorAll('#statsTypeSeg button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.statsType = btn.dataset.type;
        this.statsItemId = null;
        this.statsCursor = this.todayStr();
        try {
          await this.renderStatsItemSelect();
          this.renderStats();
        } catch(e) { console.error(e); }
      });
    });
    document.querySelectorAll('#chartTypeSeg button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#chartTypeSeg button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.chartType = btn.dataset.chart;
        this.renderStats();
      });
    });
    document.getElementById('statsPrev').addEventListener('click', () => this.moveCursor(-1));
    document.getElementById('statsNext').addEventListener('click', () => this.moveCursor(1));

    // ========== 日志事件 ==========
    document.getElementById('addLogBtn').addEventListener('click', () => this.openLogModal(null));
    document.getElementById('logCancelBtn').addEventListener('click', () => this.closeModal('logModal'));
    document.getElementById('logSaveBtn').addEventListener('click', () => this.saveLog());
    document.getElementById('logDeleteBtn').addEventListener('click', () => this.deleteLog());
    document.getElementById('addImgBtn').addEventListener('click', () => document.getElementById('logImgInput').click());
    document.getElementById('logImgInput').addEventListener('change', (e) => this.onImgPicked(e));
    document.getElementById('logSearch').addEventListener('input', (e) => { this.logKeyword = e.target.value.trim(); this.renderLogs(); });
    document.getElementById('dayDetailCloseBtn').addEventListener('click', () => this.closeModal('dayDetailModal'));
    document.getElementById('imgPreviewClose').addEventListener('click', () => this.closeModal('imgPreviewModal'));
    document.getElementById('imgPreviewModal').addEventListener('click', (e) => {
      if (e.target.id === 'imgPreviewModal') this.closeModal('imgPreviewModal');
    });

    // 用药今日/历史切换
    document.querySelectorAll('#medViewSeg button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#medViewSeg button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.medView = btn.dataset.view;
        this.renderMedPage();
      });
    });

    // 主题色切换
    document.querySelectorAll('#themePicker .theme-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        document.querySelectorAll('#themePicker .theme-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        document.body.dataset.theme = dot.dataset.theme;
        localStorage.setItem('checkin-theme', dot.dataset.theme);
      });
    });

    // 深色模式
    const darkToggle = document.getElementById('darkToggle');
    darkToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark', darkToggle.checked);
      localStorage.setItem('checkin-dark', darkToggle.checked ? '1' : '0');
    });

    // 恢复主题设置
    const savedTheme = localStorage.getItem('checkin-theme') || 'mint';
    document.body.dataset.theme = savedTheme;
    document.querySelectorAll('#themePicker .theme-dot').forEach(d => d.classList.toggle('active', d.dataset.theme === savedTheme));
    const savedDark = localStorage.getItem('checkin-dark') === '1';
    darkToggle.checked = savedDark;
    document.body.classList.toggle('dark', savedDark);
    this._bindMaskClose();
  },

  moveCursor(dir) {
    if (this.statsType === 'period') {
      const d = new Date(this.statsCursor + 'T00:00:00');
      d.setMonth(d.getMonth() + dir);
      this.statsCursor = this._fmtDate(d);
      document.getElementById('statsCursorLabel').textContent = `${d.getFullYear()}年${d.getMonth()+1}月`;
      this.renderPeriodStats();
      return;
    }
    if (this.statsRange === 'week') this.statsCursor = this.addDays(this.statsCursor, dir * 7);
    else if (this.statsRange === 'month') {
      const d = new Date(this.statsCursor + 'T00:00:00');
      d.setMonth(d.getMonth() + dir);
      this.statsCursor = this._fmtDate(d);
    } else {
      const d = new Date(this.statsCursor + 'T00:00:00');
      d.setFullYear(d.getFullYear() + dir);
      this.statsCursor = this._fmtDate(d);
    }
    this.renderStats();
  },

  updateCursorLabel() {
    const el = document.getElementById('statsCursorLabel');
    if (this.statsRange === 'week') {
      const d = new Date(this.statsCursor + 'T00:00:00');
      const dow = d.getDay() || 7;
      const monday = this.addDays(this.statsCursor, -(dow - 1));
      const sunday = this.addDays(monday, 6);
      el.textContent = `${monday.slice(5)} ~ ${sunday.slice(5)}`;
    } else if (this.statsRange === 'month') {
      const [y, m] = this.statsCursor.split('-');
      el.textContent = `${y}年${Number(m)}月`;
    } else {
      el.textContent = this.statsCursor.slice(0, 4) + '年';
    }
  },

  /* ========== 项目 CRUD ========== */
  async openManageCats() {
    const items = await DB.getItems();
    const listEl = document.getElementById('manageCatsList');
    listEl.innerHTML = '';
    items.forEach(it => {
      const iconSvg = this.ITEM_ICONS.find(x => x.id === (it.icon || 'drop'))?.svg || '';
      const row = document.createElement('div');
      row.className = 'manage-cat-row';
      row.innerHTML = `
        <div class="mc-icon" style="color:${it.color}">${iconSvg}</div>
        <div class="mc-info">
          <div class="mc-name">${this._escHtml(it.name)}</div>
          <div class="mc-goal">每日目标 ${it.goal || 1} ${it.unit || '次'}</div>
        </div>
        <button class="mc-edit" title="编辑">✏️</button>
        <button class="mc-del" title="删除">🗑️</button>
      `;
      row.querySelector('.mc-edit').addEventListener('click', () => {
        this.closeModal('manageCatsModal');
        this.openItemModal(it.id);
      });
      row.querySelector('.mc-del').addEventListener('click', () => {
        if (!confirm(`删除「${it.name}」？相关打卡记录也会删除。`)) return;
        this.editingItemId = it.id;
        this.deleteItem();
      });
      listEl.appendChild(row);
    });
    if (!items.length) listEl.innerHTML = '<div class="card-sub" style="text-align:center;padding:20px">暂无分类</div>';
    this.openModal('manageCatsModal');
  },

  openItemModal(itemId) {
    this.editingItemId = itemId;
    const modal = document.getElementById('itemModal');
    const title = document.getElementById('itemModalTitle');
    const nameInput = document.getElementById('itemName');
    const delBtn = document.getElementById('itemDeleteBtn');
    if (itemId) {
      title.textContent = '编辑项目';
      delBtn.classList.remove('hidden');
      // 加载
      DB.getAll('items').then(items => {
        const it = items.find(x => x.id === itemId);
        if (it) {
          nameInput.value = it.name;
          document.getElementById('itemGoal').value = it.goal || 1;
          document.getElementById('itemUnit').value = it.unit || '';
          document.querySelectorAll('.color-dot').forEach(d => {
            d.classList.toggle('active', d.dataset.color === it.color);
          });
          document.querySelectorAll('.icon-opt').forEach(x => {
            x.classList.toggle('active', x.dataset.icon === (it.icon || this.ITEM_ICONS[0].id));
          });
        }
      });
    } else {
      title.textContent = '新项目';
      delBtn.classList.add('hidden');
      nameInput.value = '';
      document.getElementById('itemGoal').value = 1;
      document.getElementById('itemUnit').value = '';
      document.querySelectorAll('.color-dot').forEach((d, i) => d.classList.toggle('active', i === 0));
      document.querySelectorAll('.icon-opt').forEach((x, i) => x.classList.toggle('active', i === 0));
    }
    modal.classList.remove('hidden');
    setTimeout(() => nameInput.focus(), 200);
  },

  async saveItem() {
    const name = document.getElementById('itemName').value.trim();
    if (!name) { this.toast('请输入项目名称'); return; }
    const color = document.querySelector('.color-dot.active')?.dataset.color || '#f0a868';
    const icon = document.querySelector('.icon-opt.active')?.dataset.icon || this.ITEM_ICONS[0].id;
    const goal = parseInt(document.getElementById('itemGoal').value) || 1;
    const unit = document.getElementById('itemUnit').value.trim() || '次';
    if (this.editingItemId) {
      const items = await DB.getAll('items');
      const it = items.find(x => x.id === this.editingItemId);
      if (it) {
        it.name = name; it.color = color; it.icon = icon; it.goal = goal; it.unit = unit;
        await DB.put('items', it);
      }
    } else {
      await DB.add('items', { name, color, icon, goal, unit, createdAt: Date.now(), archived: false });
    }
    this.closeModal('itemModal');
    this.toast('已保存');
    await this.refresh();
  },

  async deleteItem() {
    if (!this.editingItemId) return;
    if (!confirm('删除此项目？相关打卡记录也会删除。')) return;
    // 删除相关记录
    const records = await DB.getRecordsOfItem(this.editingItemId);
    for (const r of records) await DB.delete('records', r.id);
    await DB.delete('items', this.editingItemId);
    this.closeModal('itemModal');
    this.toast('已删除');
    await this.refresh();
  },

  /* ========== 打卡状态 ========== */
  async openStatusModal(itemId) {
    this.pendingItemId = itemId;
    const items = await DB.getItems();
    const it = items.find(x => x.id === itemId);
    document.getElementById('statusModalTitle').textContent = `「${it?.name || ''}」· ${this.currentDate}`;
    document.getElementById('statusModal').classList.remove('hidden');
  },

  async confirmStatus(status) {
    if (!this.pendingItemId) return;
    // 补卡校验：只能补今天往前30天内
    if (!this.isWithin30Days(this.currentDate)) {
      this.toast('只能补今天起30天内的卡');
      this.closeModal('statusModal');
      return;
    }
    await DB.upsertRecord(this.pendingItemId, this.currentDate, status);
    this.closeModal('statusModal');
    this.toast('已打卡');
    await this.refresh();
  },

  /* ========== 生理期 ========== */
  async loadActivePeriod() {
    const all = await DB.getAll('periods');
    // 清理：如果有多条未结束记录，把旧的都自动结束（endDate=今天）
    const open = all.filter(p => !p.endDate).sort((a, b) => b.id - a.id);
    if (open.length > 1) {
      for (let i = 1; i < open.length; i++) {
        open[i].endDate = this.todayStr();
        await DB.put('periods', open[i]);
      }
    }
    this.activePeriod = open[0] || null;
    await this.renderPeriodHistory();
  },

  async renderPeriodHistory() {
    const listEl = document.getElementById('periodHistoryList');
    if (!listEl) return;
    const all = await DB.getAll('periods');
    all.sort((a, b) => b.startDate.localeCompare(a.startDate));
    listEl.innerHTML = '';
    for (const p of all) {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px dashed #eee;font-size:13px;';
      row.innerHTML = `
        <input type="date" value="${p.startDate}" style="padding:10px;border:1px solid #e5e5e5;border-radius:8px;font-size:14px;min-height:44px;" data-field="startDate" data-id="${p.id}" />
        <span>→</span>
        <input type="date" value="${p.endDate || ''}" placeholder="进行中" style="padding:10px;border:1px solid #e5e5e5;border-radius:8px;font-size:14px;min-height:44px;" data-field="endDate" data-id="${p.id}" />
        <button class="btn-small" data-del="${p.id}" style="margin-left:auto;min-height:44px;padding:10px 14px;">删</button>
      `;
      row.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('change', async () => {
          const pid = Number(inp.dataset.id);
          const field = inp.dataset.field;
          p[field] = inp.value || null;
          await DB.put('periods', p);
          await this.loadActivePeriod();
          this.refresh();
        });
      });
      row.querySelector('[data-del]').addEventListener('click', async () => {
        await DB.delete('periods', p.id);
        await this.loadActivePeriod();
        this.refresh();
      });
      listEl.appendChild(row);
    }
  },

  async togglePeriod() {
    const startRow = document.getElementById('periodStartRow');
    const endRow = document.getElementById('periodEndRow');
    if (this.activePeriod) {
      // 进行中 → 显示结束日期选择
      endRow.classList.remove('hidden');
      startRow.classList.add('hidden');
      document.getElementById('periodEndDate').value = this.todayStr();
      document.getElementById('periodEndDate').min = this.activePeriod.startDate;
      // 不设 max，允许选未来日期（用户自己填预计结束日）
      document.getElementById('periodEndDate').removeAttribute('max');
    } else {
      // 无进行中 → 显示开始日期选择
      startRow.classList.remove('hidden');
      endRow.classList.add('hidden');
      document.getElementById('periodStartDate').value = this.todayStr();
      document.getElementById('periodStartDate').max = this.todayStr();
    }
  },

  async confirmStartPeriod() {
    const startDate = document.getElementById('periodStartDate').value;
    if (!startDate) { this.toast('请选择开始日期'); return; }
    if (startDate > this.todayStr()) { this.toast('开始日期不能晚于今天'); return; }
    await DB.add('periods', { startDate, endDate: '', note: '', ts: Date.now() });
    this.toast(`已记录开始于 ${startDate}`);
    startRow.classList.add('hidden');
    await this.loadActivePeriod();
    await this.refresh();
  },

  async confirmEndPeriod() {
    if (!this.activePeriod) return;
    const endDate = document.getElementById('periodEndDate').value;
    if (!endDate) { this.toast('请选择结束日期'); return; }
    if (endDate < this.activePeriod.startDate) {
      this.toast('结束日期不能早于开始日期'); return;
    }
    // 允许选未来日期（预计结束日）
    this.activePeriod.endDate = endDate;
    await DB.put('periods', this.activePeriod);
    const days = this.diffDays(this.activePeriod.startDate, endDate) + 1;
    this.toast(`已结束，共 ${days} 天`);
    this.activePeriod = null;
    endRow.classList.add('hidden');
    await this.refresh();
  },

  async endPeriod() {
    // 保留旧接口，直接用今天结束
    if (!this.activePeriod) return;
    this.activePeriod.endDate = this.todayStr();
    await DB.put('periods', this.activePeriod);
    this.toast('已记录生理期结束');
    this.activePeriod = null;
    await this.refresh();
  },

  /* ========== 渲染：今日仪表盘 ========== */
  async renderToday() {
    const today = this.todayStr();
    const d = new Date(today + 'T00:00:00');
    document.getElementById('todayDateLine').textContent =
      `${d.getMonth() + 1}月${d.getDate()}日 ${this.weekdayCN(today)}`;

    const banner = document.getElementById('periodBanner');
    if (this.activePeriod) banner.classList.remove('hidden');
    else banner.classList.add('hidden');

    const items = await DB.getItems();
    const records = await DB.getRecordsOfDate(today);

    let doneCount = 0;
    items.forEach(it => {
      const rec = records.find(r => r.itemId === it.id);
      if (rec?.status === 'done') doneCount++;
    });

    const total = items.length;
    const rate = total ? Math.round(doneCount / total * 100) : 0;
    document.getElementById('todayRate').textContent = rate + '%';
    document.getElementById('doneNum').textContent = `${doneCount}/${total}`;
    const ringEl = document.getElementById('todayRing');
    if (ringEl) Charts.ring(ringEl, rate / 100);

    // 连续天数
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const ds = this.addDays(today, -i);
      const dr = await DB.getRecordsOfDate(ds);
      const doneToday = items.length && dr.filter(r => r.status === 'done').length === items.length;
      if (doneToday) streak++;
      else if (i === 0) continue; // 今天没完成不中断 streak
      else break;
    }
    document.getElementById('streakNum').textContent = streak;

    // 7天概览
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const ds = this.addDays(today, -i);
      const dayRecords = await DB.getRecordsOfDate(ds);
      let status = 'none';
      if (items.length) {
        const done = dayRecords.filter(r => r.status === 'done').length;
        if (done === items.length) status = 'done';
        else if (done > 0) status = 'postpone';
        else if (dayRecords.some(r => r.status === 'skip')) status = 'skip';
      }
      days.push({ label: this.weekdayCN(ds).replace('周', ''), status });
    }
    Charts.weekOverview(document.getElementById('weekOverview'), days);
  },

  /* ========== 渲染：打卡页 ========== */
  async renderHabitList() {
    const items = await DB.getItems();
    const records = await DB.getRecordsOfDate(this.currentDate);
    const listEl = document.getElementById('habitList');
    listEl.innerHTML = '';

    for (const it of items) {
      const rec = records.find(r => r.itemId === it.id);
      const isDone = rec?.status === 'done';
      const goal = it.goal || 1;
      const unit = it.unit || '次';
      // 连续天数
      let streak = 0;
      for (let i = 0; i < 365; i++) {
        const ds = this.addDays(this.currentDate, -i);
        const allRecs = await DB.getRecordsOfDate(ds);
        const done = allRecs.find(r => r.itemId === it.id && r.status === 'done');
        if (done) streak++;
        else if (i === 0 && isDone) continue;
        else break;
      }
      const iconSvg = this.ITEM_ICONS.find(x => x.id === (it.icon || 'drop'))?.svg || '';
      const row = document.createElement('div');
      row.className = 'habit-item' + (isDone ? ' done' : '');
      row.innerHTML = `
        <div class="habit-icon" style="color:${it.color}">${iconSvg}</div>
        <div class="habit-mid">
          <div class="habit-name">${this._escHtml(it.name)}</div>
          <div class="habit-bar"><div class="habit-bar-fill" style="width:${isDone ? 100 : 0}%"></div></div>
        </div>
        <div class="habit-right">
          <div class="habit-streak">连续 ${streak} 天</div>
          <div class="habit-count">${isDone ? 1 : 0}/${goal} ${unit}</div>
          <button class="habit-btn">${isDone ? '✓' : '+'}</button>
        </div>
      `;
      row.querySelector('.habit-btn').addEventListener('click', async (e) => {
        e.stopPropagation();
        if (isDone) {
          await DB.delete('records', rec.id);
        } else {
          await DB.upsertRecord(it.id, this.currentDate, 'done');
        }
        await this.refresh();
      });
      row.addEventListener('click', async () => {
        if (isDone) {
          await DB.delete('records', rec.id);
        } else {
          await DB.upsertRecord(it.id, this.currentDate, 'done');
        }
        await this.refresh();
      });
      let pressTimer;
      row.addEventListener('touchstart', () => { pressTimer = setTimeout(() => this.openItemModal(it.id), 600); });
      row.addEventListener('touchend', () => clearTimeout(pressTimer));
      row.addEventListener('contextmenu', (e) => { e.preventDefault(); this.openItemModal(it.id); });
      listEl.appendChild(row);
    }

    if (!items.length) {
      listEl.innerHTML = '<div class="card-sub" style="text-align:center;padding:20px">点击右上角「+ 新项目」开始</div>';
    }

    // 生理期状态
    const statusLine = document.getElementById('periodStatusLine');
    const startRow = document.getElementById('periodStartRow');
    const endRow = document.getElementById('periodEndRow');
    if (this.activePeriod) {
      const days = this.diffDays(this.activePeriod.startDate, this.todayStr()) + 1;
      statusLine.textContent = `进行中（第${days}天，开始于 ${this.activePeriod.startDate}）`;
      document.getElementById('togglePeriodBtn').textContent = '结束记录';
      startRow.classList.add('hidden');
    } else {
      endRow.classList.add('hidden');
      // 最近一次生理期
      const all = await DB.getAll('periods');
      const last = all.sort((a, b) => b.id - a.id)[0];
      if (last) {
        const cycleLen = last.endDate ? this.diffDays(last.startDate, last.endDate) + 1 : '-';
        statusLine.textContent = `上次 ${last.startDate} ~ ${last.endDate || '至今'}（${cycleLen}天）`;
      } else {
        statusLine.textContent = '尚未记录';
      }
      document.getElementById('togglePeriodBtn').textContent = '记录开始';
    }
  },

  /* ========== 渲染：统计页 ========== */
  async renderStatsItemSelect() {
    const sel = document.getElementById('statsItemSelect');
    sel.innerHTML = '';
    sel.disabled = false;
    if (this.statsType === 'habit') {
      const items = await DB.getItems();
      sel.innerHTML = '<option value="">-- 选择打卡项目 --</option>';
      items.forEach(it => {
        const opt = document.createElement('option');
        opt.value = it.id; opt.textContent = it.name;
        if (it.id === this.statsItemId) opt.selected = true;
        sel.appendChild(opt);
      });
      if (!this.statsItemId && items.length) {
        this.statsItemId = items[0].id; sel.value = this.statsItemId;
      }
    } else if (this.statsType === 'med') {
      const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
      sel.innerHTML = '<option value="">-- 选择药品 --</option>';
      meds.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id; opt.textContent = m.name;
        if (m.id === this.statsItemId) opt.selected = true;
        sel.appendChild(opt);
      });
      if (!this.statsItemId && meds.length) {
        this.statsItemId = meds[0].id; sel.value = this.statsItemId;
      }
    } else {
      // period: 不需要选具体项，隐藏下拉
      sel.innerHTML = '<option value="">-- 生理期周期 --</option>';
      sel.disabled = true;
      this.statsItemId = null;
    }
  },

  async renderStats() {
    if (this.statsType === 'period') {
      return this.renderPeriodStats();
    }
    if (!this.statsItemId) return;
    this.updateCursorLabel();

    // 恢复打卡/用药模式的UI
    document.getElementById('chartTypeSeg').classList.remove('hidden');
    document.getElementById('statsChart').classList.remove('hidden');
    document.getElementById('statsRangeSeg').classList.remove('hidden');
    document.querySelector('.month-nav').classList.remove('hidden');
    document.getElementById('statsItemSelect').classList.remove('hidden');

    const cursor = this.statsCursor;
    let records, title, color;

    if (this.statsType === 'habit') {
      const items = await DB.getItems();
      const it = items.find(x => x.id === this.statsItemId);
      if (!it) return;
      title = it.name; color = it.color;
      records = await DB.getRecordsOfItem(this.statsItemId);
    } else {
      const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
      const m = meds.find(x => x.id === this.statsItemId);
      if (!m) return;
      title = m.name; color = '#4a90d9';
      records = await DB.getMedRecordsOfMed(this.statsItemId);
    }

    // 根据range确定日期范围（基于cursor）
    let rangeStart, rangeEnd;
    if (this.statsRange === 'week') {
      const d = new Date(cursor + 'T00:00:00');
      const dow = d.getDay() || 7;
      rangeStart = this.addDays(cursor, -(dow - 1));
      rangeEnd = this.addDays(rangeStart, 6);
    } else if (this.statsRange === 'month') {
      const [y, m] = cursor.split('-').map(Number);
      const lastDay = new Date(y, m, 0).getDate();
      rangeStart = `${y}-${String(m).padStart(2,'0')}-01`;
      rangeEnd = `${y}-${String(m).padStart(2,'0')}-${String(lastDay).padStart(2,'0')}`;
    } else {
      const y = Number(cursor.slice(0,4));
      rangeStart = `${y}-01-01`;
      rangeEnd = `${y}-12-31`;
    }

    const dataMap = {};
    records.forEach(r => { if (r.date >= rangeStart && r.date <= rangeEnd) dataMap[r.date] = r.status; });

    // 用药类型：自动补全漏服日期（该服药但没记录的日子，不含未来日期）
    if (this.statsType === 'med') {
      const med = (await DB.getAll('meds')).find(x => x.id === this.statsItemId);
      if (med) {
        const today = this.todayStr();
        let ds = rangeStart;
        while (ds <= rangeEnd) {
          if (ds <= today && this.isMedDueOn(med, ds) && !dataMap[ds]) {
            dataMap[ds] = 'missed';
          }
          ds = this.addDays(ds, 1);
        }
      }
    }

    let done = 0, postpone = 0, skip = 0;
    const chartData = [];
    if (this.statsRange === 'year') {
      const monthBuckets = {};
      const y = Number(cursor.slice(0,4));
      for (let i = 1; i <= 12; i++) {
        monthBuckets[`${y}-${String(i).padStart(2,'0')}`] = 0;
      }
      Object.entries(dataMap).forEach(([date, st]) => {
        const key = date.slice(0, 7);
        if (key in monthBuckets && (st === 'done' || st === 'taken')) monthBuckets[key]++;
      });
      Object.entries(monthBuckets).forEach(([k, v]) => {
        chartData.push({ label: Number(k.slice(5)) + '月', value: v, color });
      });
      done = Object.values(monthBuckets).reduce((a, b) => a + b, 0);
    } else {
      let ds = rangeStart;
      let i = 0;
      while (ds <= rangeEnd && i < 400) {
        const st = dataMap[ds] || null;
        if (st === 'done' || st === 'taken') done++;
        else if (st === 'postpone' || st === 'paused') postpone++;
        else if (st === 'skip' || st === 'missed') skip++;
        const label = this.statsRange === 'week' ? this.weekdayCN(ds).replace('周','') : ds.slice(8).replace(/^0/,'');
        chartData.push({
          label,
          value: (st === 'done' || st === 'taken') ? 1 : ((st === 'postpone' || st === 'paused') ? 0.5 : ((st === 'skip' || st === 'missed') ? 0.2 : 0)),
          color: (st === 'done' || st === 'taken') ? color
            : (st === 'skip' || st === 'missed') ? '#e07a5f'
            : (st === 'postpone' || st === 'paused') ? '#f4a261'
            : '#e6ecf3'
        });
        ds = this.addDays(ds, 1);
        i++;
      }
    }

    const totalDays = chartData.length;
    const effective = Math.max(1, totalDays - postpone - skip);
    const rate = Math.round(done / effective * 100);

    document.getElementById('statSummary').innerHTML = `
      <div><div class="num">${done}</div><div class="label">${this.statsType === 'med' ? '已服次数' : '完成天数'}</div></div>
      <div><div class="num">${rate}%</div><div class="label">完成率</div></div>
      <div><div class="num">${postpone}</div><div class="label">${this.statsType === 'med' ? '暂停' : '暂缓'}</div></div>
      <div><div class="num">${skip}</div><div class="label">${this.statsType === 'med' ? '漏服' : '放弃'}</div></div>
    `;

    // 两种图表视图切换
    const heatmapEl = document.getElementById('heatmapView');
    const vbarEl = document.getElementById('statsChart');
    if (this.chartType === 'heatmap') {
      heatmapEl.classList.remove('hidden');
      vbarEl.classList.add('hidden');
      this.renderHeatmap(dataMap, this.statsType, color);
    } else {
      heatmapEl.classList.add('hidden');
      vbarEl.classList.remove('hidden');
      Charts.barChart(vbarEl, chartData, { barGrow: 0.8 });
    }

    const recent = document.getElementById('recentRecords');
    const sorted = records.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
    const statusMap = this.statsType === 'med'
      ? { taken: '已服', paused: '暂停', missed: '漏服' }
      : { done: '完成', postpone: '暂缓', skip: '放弃' };
    recent.innerHTML = sorted.length ? '' : '<div class="card-sub">暂无记录</div>';
    sorted.forEach(r => {
      const div = document.createElement('div');
      div.className = 'record-row';
      div.innerHTML = `<span>${r.date} ${this.weekdayCN(r.date)}</span>
        <span class="habit-status-tag ${r.status}">${statusMap[r.status] || r.status}</span>`;
      recent.appendChild(div);
    });
  },

  /* 日历热力图：周视图显示7天，月视图显示整月 */
  renderHeatmap(dataMap, statsType, color) {
    const cursor = this.statsCursor;
    const today = this.todayStr();
    let html = '';

    if (this.statsRange === 'week') {
      // 周视图：只显示本周7天
      const d = new Date(cursor + 'T00:00:00');
      const dow = d.getDay() || 7;
      const monday = this.addDays(cursor, -(dow - 1));
      html += '<div class="heatmap-grid" style="grid-template-columns:repeat(7,1fr);">';
      ['一','二','三','四','五','六','日'].forEach(w => html += `<div class="hm-head">${w}</div>`);
      for (let i = 0; i < 7; i++) {
        const ds = this.addDays(monday, i);
        const st = dataMap[ds];
        let cls = 'none';
        if (st === 'done' || st === 'taken') cls = statsType === 'med' ? 'taken' : 'done';
        else if (st === 'postpone' || st === 'paused') cls = statsType === 'med' ? 'paused' : 'postpone';
        else if (st === 'skip' || st === 'missed') cls = statsType === 'med' ? 'missed' : 'skip';
        if (ds === today) cls += ' today';
        const dayNum = Number(ds.slice(8));
        html += `<div class="heatmap-cell ${cls}" title="${ds}">${dayNum}</div>`;
      }
      html += '</div>';
    } else {
      // 月/年视图：整月日历
      const [y, m] = cursor.split('-').map(Number);
      const firstDay = new Date(y, m - 1, 1);
      const lastDate = new Date(y, m, 0).getDate();
      const startOffset = (firstDay.getDay() || 7) - 1;

      html += `<div style="font-size:13px;font-weight:600;margin-bottom:6px;text-align:center;">${y}年${m}月</div>`;
      html += '<div class="heatmap-grid">';
      ['一','二','三','四','五','六','日'].forEach(w => html += `<div class="hm-head">${w}</div>`);
      for (let i = 0; i < startOffset; i++) html += '<div></div>';
      for (let day = 1; day <= lastDate; day++) {
        const ds = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const st = dataMap[ds];
        let cls = 'none';
        if (st === 'done' || st === 'taken') cls = statsType === 'med' ? 'taken' : 'done';
        else if (st === 'postpone' || st === 'paused') cls = statsType === 'med' ? 'paused' : 'postpone';
        else if (st === 'skip' || st === 'missed') cls = statsType === 'med' ? 'missed' : 'skip';
        if (ds === today) cls += ' today';
        html += `<div class="heatmap-cell ${cls}" title="${ds}">${day}</div>`;
      }
      html += '</div>';
    }
    // 图例
    const legendItems = statsType === 'med'
      ? [['taken','已服'],['missed','漏服'],['paused','暂停'],['none','无记录']]
      : [['done','完成'],['postpone','暂缓'],['skip','放弃'],['none','无记录']];
    html += '<div class="hm-legend">';
    legendItems.forEach(([c, label]) => {
      html += `<span><span class="dot" style="background:${{done:'#7bc49a',taken:'var(--primary-deep)',postpone:'#f4a261',missed:'#e07a5f',skip:'#e89898',paused:'#f0c878',none:'#f0f3f7'}[c]}"></span>${label}</span>`;
    });
    html += '</div>';
    document.getElementById('heatmapView').innerHTML = html;
  },

  async renderPeriodStats() {
    const periods = (await DB.getAll('periods')).sort((a, b) => a.startDate.localeCompare(b.startDate));
    const summary = document.getElementById('statSummary');
    const recent = document.getElementById('recentRecords');
    const chartTypeSeg = document.getElementById('chartTypeSeg');
    const chart = document.getElementById('statsChart');
    const heatmapView = document.getElementById('heatmapView');

    // 生理期模式：隐藏热力图/柱状图切换、周月年切换、日期范围
    chartTypeSeg.classList.add('hidden');
    chart.classList.add('hidden');
    document.getElementById('hbarView').classList.add('hidden');
    document.getElementById('statsRangeSeg').classList.add('hidden');
    document.querySelector('.month-nav').classList.add('hidden');
    document.getElementById('statsItemSelect').classList.add('hidden');
    heatmapView.classList.remove('hidden');

    if (!periods.length) {
      summary.innerHTML = '<div class="card-sub" style="text-align:center;padding:20px">暂无生理期记录</div>';
      heatmapView.innerHTML = '';
      recent.innerHTML = '';
      return;
    }

    // 统计卡片
    const lengths = [];
    periods.forEach(p => {
      if (p.endDate) lengths.push(this.diffDays(p.startDate, p.endDate) + 1);
    });
    const avgLen = lengths.length ? Math.round(lengths.reduce((a,b)=>a+b,0)/lengths.length) : 0;
    const thisPeriod = periods[periods.length - 1];
    const daysSoFar = thisPeriod.endDate
      ? this.diffDays(thisPeriod.startDate, thisPeriod.endDate) + 1
      : this.diffDays(thisPeriod.startDate, this.todayStr()) + 1;
    let cycleGap = '-';
    if (periods.length >= 2) {
      const prev = periods[periods.length - 2];
      cycleGap = this.diffDays(prev.startDate, thisPeriod.startDate) + '天';
    }
    summary.innerHTML = `
      <div><div class="num">${daysSoFar}</div><div class="label">本次天数</div></div>
      <div><div class="num">${avgLen}</div><div class="label">平均天数</div></div>
      <div><div class="num">${periods.length}</div><div class="label">总次数</div></div>
      <div><div class="num">${cycleGap}</div><div class="label">周期间隔</div></div>
    `;

    // 月历：当前统计月份
    const [y, m] = this.statsCursor.split('-').map(Number);
    document.getElementById('statsCursorLabel').textContent = `${y}年${m}月`;
    const today = this.todayStr();
    const firstDay = new Date(y, m - 1, 1);
    const lastDate = new Date(y, m, 0).getDate();
    const startOffset = (firstDay.getDay() || 7) - 1;

    // 构建经期日期集合
    const periodDates = new Set();
    periods.forEach(p => {
      if (!p.endDate) return;
      let ds = p.startDate;
      while (ds <= p.endDate) {
        periodDates.add(ds);
        ds = this.addDays(ds, 1);
      }
    });
    // 进行中的也标记到今天
    if (thisPeriod && !thisPeriod.endDate) {
      let ds = thisPeriod.startDate;
      while (ds <= today) { periodDates.add(ds); ds = this.addDays(ds, 1); }
    }

    let html = '<div class="heatmap-grid" style="gap:6px;">';
    ['一','二','三','四','五','六','日'].forEach(w => html += `<div style="text-align:center;font-size:12px;color:#999;padding:4px 0;">${w}</div>`);
    for (let i = 0; i < startOffset; i++) html += '<div></div>';
    for (let day = 1; day <= lastDate; day++) {
      const ds = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const isPeriod = periodDates.has(ds);
      const isToday = ds === today;
      let cellStyle = 'width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:14px;margin:2px auto;cursor:pointer;';
      if (isPeriod) cellStyle += 'background:#e88ba8;color:#fff;font-weight:600;';
      if (isToday) cellStyle += 'outline:2px solid #e88ba8;outline-offset:2px;';
      html += `<div class="period-cal-cell" data-date="${ds}" style="${cellStyle}">${day}</div>`;
    }
    html += '</div>';
    // 图例
    html += '<div style="display:flex;gap:16px;justify-content:center;margin-top:12px;font-size:12px;color:#666;">';
    html += '<span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#e88ba8;margin-right:4px;"></span>经期</span>';
    html += '</div>';
    heatmapView.innerHTML = html;

    // 点击日期：开始新生理期
    heatmapView.querySelectorAll('.period-cal-cell').forEach(cell => {
      cell.addEventListener('click', async () => {
        const ds = cell.dataset.date;
        const active = await DB.getAll('periods');
        const open = active.find(p => !p.endDate);
        if (open) {
          // 有进行中的，点击日期设为结束日期
          if (ds >= open.startDate) {
            open.endDate = ds;
            await DB.put('periods', open);
          }
        } else {
          // 开始新生理期
          await DB.add('periods', { startDate: ds, endDate: null });
        }
        await this.loadActivePeriod();
        this.refresh();
      });
    });

    // 最近记录列表
    recent.innerHTML = '';
    [...periods].reverse().slice(0, 10).forEach(p => {
      const div = document.createElement('div');
      div.className = 'record-row';
      const len = p.endDate ? this.diffDays(p.startDate, p.endDate) + 1 + '天' : '进行中';
      const sLabel = Number(p.startDate.slice(5,7)) + '/' + Number(p.startDate.slice(8));
      const eLabel = p.endDate ? Number(p.endDate.slice(5,7)) + '/' + Number(p.endDate.slice(8)) : '至今';
      div.innerHTML = `<span>${sLabel} ~ ${eLabel}</span><span>${len}</span>`;
      recent.appendChild(div);
    });
  },

  /* ========== 用药模块 ========== */
  editingMedId: null,
  pendingMedId: null,

  // 判断某药某天是否该吃
  isMedDueOn(med, dateStr) {
    if (!med.active) return false;
    const diff = this.diffDays(med.startDate, dateStr);
    if (diff < 0) return false;
    if (med.type === 'interval') {
      return diff % med.intervalDays === 0;
    } else {
      // cycle: 每(cycleOn+cycleOff)天一个周期，前cycleOn天该吃
      const cycleLen = med.cycleOn + med.cycleOff;
      const pos = diff % cycleLen;
      return pos < med.cycleOn;
    }
  },

  async renderMeds() {
    const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
    const today = this.currentDate || this.todayStr();
    const listEl = document.getElementById('medList');
    listEl.innerHTML = '';

    let dueCount = 0, takenCount = 0;
    for (const med of meds) {
      const due = this.isMedDueOn(med, today);
      if (due) dueCount++;
      const rec = await DB.getMedRecord(med.id, today);
      if (rec?.status === 'taken') takenCount++;

      const row = document.createElement('div');
      row.className = 'med-item ' + (due ? 'due-today' : 'rest-today');
      const typeLabel = med.type === 'interval'
        ? `每${med.intervalDays}天`
        : `连${med.cycleOn}天停${med.cycleOff}天`;
      let statusHtml;
      if (!due) {
        statusHtml = '<span class="med-status-tag pending">休息日</span>';
      } else if (rec?.status === 'taken') {
        statusHtml = '<span class="med-status-tag taken">已服</span>';
      } else if (rec?.status === 'missed') {
        statusHtml = '<span class="med-status-tag missed">漏服</span>';
      } else if (rec?.status === 'paused') {
        statusHtml = '<span class="med-status-tag paused">暂停</span>';
      } else {
        statusHtml = '<span class="med-status-tag pending">待服</span>';
      }
      row.innerHTML = `
        <div class="med-info">
          <div class="med-name">${this._escHtml(med.name)}</div>
          <div class="med-meta">${this._escHtml(med.dosage || '')} · ${typeLabel}</div>
        </div>
        ${statusHtml}
      `;
      row.addEventListener('click', () => {
        if (!due) { this.toast('今天是休息日'); return; }
        this.pendingMedId = med.id;
        document.getElementById('medStatusTitle').textContent = `${med.name} · ${today}`;
        document.getElementById('medStatusModal').classList.remove('hidden');
      });
      row.addEventListener('contextmenu', (e) => { e.preventDefault(); this.openMedModal(med.id); });
      listEl.appendChild(row);
    }

    document.getElementById('medSummaryLine').textContent = meds.length
      ? `今日应服 ${dueCount} 种 · 已服 ${takenCount} 种`
      : '暂无用药计划';
  },

  async openManageMeds() {
    const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
    const listEl = document.getElementById('manageMedsList');
    listEl.innerHTML = '';
    meds.forEach(med => {
      const row = document.createElement('div');
      row.className = 'manage-cat-row';
      row.innerHTML = `
        <div class="mc-icon" style="color:var(--accent)"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5a5 5 0 0 1-7-7l7-7a5 5 0 0 1 7 7l-7 7z"/><path d="M8.5 8.5l7 7"/></svg></div>
        <div class="mc-info">
          <div class="mc-name">${this._escHtml(med.name)}</div>
          <div class="mc-goal">${this._escHtml(med.dosage || '')} · ${{interval:`每${med.intervalDays}天`, cycle:`连${med.cycleOn}停${med.cycleOff}`}[med.type] || ''}</div>
        </div>
        <button class="mc-edit" title="编辑">✏️</button>
        <button class="mc-del" title="删除">🗑️</button>
      `;
      row.querySelector('.mc-edit').addEventListener('click', () => {
        this.closeModal('manageMedsModal');
        this.openMedModal(med.id);
      });
      row.querySelector('.mc-del').addEventListener('click', async () => {
        if (!confirm(`删除「${med.name}」？相关用药记录也会删除。`)) return;
        this.editingMedId = med.id;
        await this.deleteMed();
      });
      listEl.appendChild(row);
    });
    if (!meds.length) listEl.innerHTML = '<div class="card-sub" style="text-align:center;padding:20px">暂无药品</div>';
    this.openModal('manageMedsModal');
  },

  openMedModal(medId) {
    this.editingMedId = medId;
    const modal = document.getElementById('medModal');
    document.getElementById('medModalTitle').textContent = medId ? '编辑药品' : '添加药品';
    document.getElementById('medDeleteBtn').style.display = medId ? 'block' : 'none';
    const setVal = (id, v) => document.getElementById(id).value = v;
    if (medId) {
      DB.getAll('meds').then(meds => {
        const m = meds.find(x => x.id === medId);
        if (m) {
          setVal('medName', m.name);
          setVal('medDosage', m.dosage || '');
          setVal('medType', m.type);
          setVal('medIntervalDays', m.intervalDays || 1);
          setVal('medCycleOn', m.cycleOn || 5);
          setVal('medCycleOff', m.cycleOff || 2);
          setVal('medStartDate', m.startDate || this.todayStr());
          document.getElementById('intervalConfig').classList.toggle('hidden', m.type !== 'interval');
          document.getElementById('cycleConfig').classList.toggle('hidden', m.type !== 'cycle');
        }
      });
    } else {
      setVal('medName', '');
      setVal('medDosage', '');
      setVal('medType', 'interval');
      setVal('medIntervalDays', 1);
      setVal('medCycleOn', 5);
      setVal('medCycleOff', 2);
      setVal('medStartDate', this.todayStr());
      document.getElementById('intervalConfig').classList.remove('hidden');
      document.getElementById('cycleConfig').classList.add('hidden');
    }
    modal.classList.remove('hidden');
  },

  async saveMed() {
    const name = document.getElementById('medName').value.trim();
    if (!name) { this.toast('请输入药名'); return; }
    const data = {
      name,
      dosage: document.getElementById('medDosage').value.trim(),
      type: document.getElementById('medType').value,
      intervalDays: Number(document.getElementById('medIntervalDays').value) || 1,
      cycleOn: Number(document.getElementById('medCycleOn').value) || 5,
      cycleOff: Number(document.getElementById('medCycleOff').value) || 2,
      startDate: document.getElementById('medStartDate').value || this.todayStr(),
      active: true
    };
    if (this.editingMedId) {
      const meds = await DB.getAll('meds');
      const m = meds.find(x => x.id === this.editingMedId);
      if (m) { Object.assign(m, data); await DB.put('meds', m); }
    } else {
      await DB.add('meds', data);
    }
    this.closeModal('medModal');
    this.toast('已保存');
    await this.refresh();
  },

  async deleteMed() {
    if (!this.editingMedId) return;
    if (!confirm('删除此药品？相关用药记录也会删除。')) return;
    const records = await DB.getMedRecordsOfMed(this.editingMedId);
    for (const r of records) await DB.delete('medRecords', r.id);
    await DB.delete('meds', this.editingMedId);
    this.closeModal('medModal');
    this.toast('已删除');
    await this.refresh();
  },

  async confirmMedStatus(status) {
    if (!this.pendingMedId) return;
    await DB.upsertMedRecord(this.pendingMedId, this.currentDate || this.todayStr(), status);
    this.closeModal('medStatusModal');
    this.toast('已记录');
    await this.refresh();
  },

  // 用药独立页
  medView: 'today',
  async renderMedPage() {
    const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
    const today = this.currentDate || this.todayStr();
    const listEl = document.getElementById('medList');
    listEl.innerHTML = '';

    let dueCount = 0, takenCount = 0;
    const todayList = [];
    for (const med of meds) {
      const due = this.isMedDueOn(med, today);
      if (due) dueCount++;
      const rec = await DB.getMedRecord(med.id, today);
      if (rec?.status === 'taken') takenCount++;
      todayList.push({ med, due, rec });
    }
    document.getElementById('medDueCount').textContent = dueCount;
    document.getElementById('medTakenCount').textContent = takenCount;

    if (this.medView === 'history') {
      if (!this.medHistoryRange) this.medHistoryRange = 'day';
      if (!this.medHistoryCursor) this.medHistoryCursor = this.todayStr();
      await this.renderMedHistory(meds);
      return;
    }

    // 今日视图：只显示今天该吃的药
    const rows = [];
    for (const med of meds) {
      if (this.isMedDueOn(med, today)) {
        const rec = await DB.getMedRecord(med.id, today);
        rows.push({ med, date: today, rec, missed: false });
      }
    }

    rows.forEach(({ med, date, rec, missed }) => {
      const isTaken = rec?.status === 'taken';
      const row = document.createElement('div');
      const colorBar = isTaken ? 'var(--primary-deep)' : missed ? '#d97070' : 'var(--accent)';
      row.className = 'med-item';
      row.style.borderLeft = `4px solid ${colorBar}`;
      const statusTag = missed ? '漏服' : (isTaken ? '已服用' : '待服用');
      const rightBtn = isTaken
        ? `<button class="med-action undo">↩ 撤销</button>`
        : `<button class="med-action primary">✓ ${missed ? '补服' : '已服用'}</button>`;
      row.innerHTML = `
        <div class="med-info">
          <div class="med-name-row">
            <span class="med-name-lg">${this._escHtml(med.name)}</span>
            <span class="med-status-tag ${isTaken ? 'taken' : missed ? 'missed' : 'pending'}">${statusTag}</span>
          </div>
          <div class="med-meta">${this._escHtml(med.dosage || '')} · ${date === today ? '今天' : this.weekdayCN(date)}</div>
        </div>
        ${rightBtn}
      `;
      row.querySelector('.med-action')?.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (isTaken) {
          await DB.delete('medRecords', rec.id);
        } else {
          await DB.upsertMedRecord(med.id, date, 'taken');
        }
        await this.refresh();
        await this.renderStats();
      });
      let pressTimer;
      row.addEventListener('touchstart', () => { pressTimer = setTimeout(() => this.openMedModal(med.id), 600); });
      row.addEventListener('touchend', () => clearTimeout(pressTimer));
      row.addEventListener('touchmove', () => clearTimeout(pressTimer));
      row.addEventListener('dblclick', () => this.openMedModal(med.id));
      row.addEventListener('contextmenu', (e) => { e.preventDefault(); this.openMedModal(med.id); });
      listEl.appendChild(row);
    });
    if (!rows.length) listEl.innerHTML = '<div class="card-sub" style="text-align:center;padding:20px">今日无需服药</div>';
  },

  // 用药历史视图（独立渲染，避免 async 竞态）
  async renderMedHistory(meds) {
    const listEl = document.getElementById('medList');
    const cursor = this.medHistoryCursor;
    let start, end, label;
    if (this.medHistoryRange === 'day') {
      start = new Date(cursor + 'T00:00:00');
      end = new Date(cursor + 'T00:00:00');
      label = `${start.getMonth()+1}月${start.getDate()}日 ${this.weekdayCN(cursor)}`;
    } else if (this.medHistoryRange === 'week') {
      const d = new Date(cursor + 'T00:00:00');
      const day = d.getDay() || 7;
      start = new Date(d); start.setDate(d.getDate() - day + 1);
      end = new Date(start); end.setDate(start.getDate() + 6);
      label = `${start.getMonth()+1}月${start.getDate()}日 ~ ${end.getMonth()+1}月${end.getDate()}日`;
    } else {
      start = new Date(cursor + 'T00:00:00'); start.setDate(1);
      end = new Date(start.getFullYear(), start.getMonth()+1, 0);
      label = `${start.getFullYear()}年${start.getMonth()+1}月`;
    }

    let takenCnt = 0, missedCnt = 0;
    const dayMap = {};
    const allRecs = await DB.getAll('medRecords');
    const todayStr = this.todayStr();
    for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
      const ds = this._fmtDate(d);
      for (const med of meds) {
        if (!this.isMedDueOn(med, ds)) continue;
        const rec = allRecs.find(r => r.medId === med.id && r.date === ds);
        if (rec?.status === 'taken') {
          takenCnt++;
          if (!dayMap[ds]) dayMap[ds] = [];
          dayMap[ds].push({ name: med.name, status: 'taken', medId: med.id });
        } else if (ds < todayStr) {
          missedCnt++;
          if (!dayMap[ds]) dayMap[ds] = [];
          dayMap[ds].push({ name: med.name, status: 'missed', medId: med.id });
        }
      }
    }
    const total = takenCnt + missedCnt;
    const rate = total ? Math.round(takenCnt/total*100) : 0;

    listEl.innerHTML = `
      <div class="seg" style="margin-bottom:12px;">
        <button data-mhr="day" class="${this.medHistoryRange==='day'?'active':''}">日</button>
        <button data-mhr="week" class="${this.medHistoryRange==='week'?'active':''}">周</button>
        <button data-mhr="month" class="${this.medHistoryRange==='month'?'active':''}">月</button>
      </div>
      <div class="month-nav">
        <button id="medPrev">‹</button>
        <span>${label}</span>
        <button id="medNext">›</button>
      </div>
      <div class="med-stat-row" style="margin-bottom:14px;">
        <div class="med-stat-card"><div class="ms-num" style="color:var(--primary-deep)">${takenCnt}</div><div class="ms-label">已服次数</div></div>
        <div class="med-stat-card"><div class="ms-num" style="color:#d97070">${missedCnt}</div><div class="ms-label">漏服次数</div></div>
        <div class="med-stat-card"><div class="ms-num">${rate}%</div><div class="ms-label">完成率</div></div>
      </div>
      <div id="medHistoryList"></div>
    `;

    // 切换日/周/月
    listEl.querySelectorAll('[data-mhr]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.medHistoryRange = btn.dataset.mhr;
        this.renderMedHistory(meds);
      });
    });
    // 翻页
    listEl.querySelector('#medPrev').addEventListener('click', () => {
      if (this.medHistoryRange === 'day') this.medHistoryCursor = this.addDays(this.medHistoryCursor, -1);
      else if (this.medHistoryRange === 'week') this.medHistoryCursor = this.addDays(this.medHistoryCursor, -7);
      else {
        const d = new Date(this.medHistoryCursor+'T00:00:00'); d.setMonth(d.getMonth()-1);
        this.medHistoryCursor = this._fmtDate(d);
      }
      this.renderMedHistory(meds);
    });
    listEl.querySelector('#medNext').addEventListener('click', () => {
      if (this.medHistoryRange === 'day') this.medHistoryCursor = this.addDays(this.medHistoryCursor, 1);
      else if (this.medHistoryRange === 'week') this.medHistoryCursor = this.addDays(this.medHistoryCursor, 7);
      else {
        const d = new Date(this.medHistoryCursor+'T00:00:00'); d.setMonth(d.getMonth()+1);
        this.medHistoryCursor = this._fmtDate(d);
      }
      this.renderMedHistory(meds);
    });

    // 按天列表
    const listBox = listEl.querySelector('#medHistoryList');
    const dates = Object.keys(dayMap).sort().reverse();
    if (!dates.length) {
      listBox.innerHTML = '<div class="card-sub" style="text-align:center;padding:20px">该时间段无用药记录</div>';
      return;
    }
    const self = this;
    dates.forEach(date => {
      const items = dayMap[date];
      const d = new Date(date+'T00:00:00');
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'med-item';
        const isMissed = item.status === 'missed';
        row.style.borderLeft = `4px solid ${isMissed ? '#d97070' : 'var(--primary-deep)'}`;
        row.innerHTML = `
          <div class="med-info">
            <div class="med-name-row">
              <span class="med-name-lg">${self._escHtml(item.name)}</span>
              <span class="med-status-tag ${isMissed?'missed':'taken'}">${isMissed?'漏服':'已服用'}</span>
            </div>
            <div class="med-meta">${d.getMonth()+1}月${d.getDate()}日</div>
          </div>
          ${isMissed ? `<div style="display:flex;gap:6px;flex-shrink:0;">
            <button type="button" onclick="markMedStatus(${item.medId},'${date}','missed')" style="padding:10px 14px;border-radius:10px;border:1px solid #d97070;background:#fff;color:#d97070;font-size:13px;cursor:pointer;min-width:60px;">漏服</button>
            <button type="button" onclick="markMedStatus(${item.medId},'${date}','taken')" style="padding:10px 14px;border-radius:10px;border:none;background:var(--accent);color:#fff;font-size:13px;cursor:pointer;min-width:60px;">补服</button>
          </div>` : ''}
        `;
        listBox.appendChild(row);
      });
    });
  },

  // 补记用药弹窗
  async openMedCatchup(dateStr) {
    const modal = document.getElementById('medCatchupModal');
    const dateInput = document.getElementById('medCatchupDate');
    dateInput.value = dateStr || this.todayStr();
    modal.classList.remove('hidden');
    await this.renderMedCatchupList();
    dateInput.onchange = () => this.renderMedCatchupList();
  },
  async renderMedCatchupList() {
    const date = document.getElementById('medCatchupDate').value;
    const listEl = document.getElementById('medCatchupList');
    const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
    const allRecs = await DB.getAll('medRecords');
    listEl.innerHTML = '';
    let hasDue = false;
    for (const med of meds) {
      if (!this.isMedDueOn(med, date)) continue;
      hasDue = true;
      const rec = allRecs.find(r => r.medId === med.id && r.date === date);
      const isTaken = rec?.status === 'taken';
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #f0f0f0;';
      row.innerHTML = `
        <div><div style="font-weight:600;">${this._escHtml(med.name)}</div><div style="font-size:12px;color:#999;">${this._escHtml(med.dosage||'')}</div></div>
        <button class="btn-small" data-mid="${med.id}" style="${isTaken?'background:#e8f5e9;color:#4caf50;':''}">${isTaken?'✓ 已服':'标记已服'}</button>
      `;
      row.querySelector('button').addEventListener('click', async (e) => {
        const mid = e.target.dataset.mid;
        if (isTaken) {
          await DB.delete('medRecords', rec.id);
        } else {
          await DB.upsertMedRecord(mid, date, 'taken');
        }
        await this.renderMedCatchupList();
        if (this.medView === 'history') {
          const medsAll = (await DB.getAll('meds')).filter(m => m.active !== false);
          await this.renderMedHistory(medsAll);
        }
        await this.renderStats();
      });
      listEl.appendChild(row);
    }
    if (!hasDue) listEl.innerHTML = '<div style="text-align:center;color:#999;padding:16px;">该日期无需服药</div>';
  },
  async renderMeStats() {
    const items = await DB.getItems();
    const allRecs = await DB.getAll('records');
    const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
    document.getElementById('meItemCount').textContent = items.length;
    document.getElementById('meRecordCount').textContent = allRecs.filter(r => r.status === 'done').length;
    document.getElementById('meMedCount').textContent = meds.length;
    // 最长连续
    let best = 0, cur = 0;
    const today = this.todayStr();
    for (let i = 0; i < 365; i++) {
      const ds = this.addDays(today, -i);
      const dr = allRecs.filter(r => r.date === ds && r.status === 'done');
      if (items.length && dr.length === items.length) { cur++; best = Math.max(best, cur); }
      else cur = 0;
    }
    document.getElementById('meBestStreak').textContent = best;
    document.getElementById('totalStreakNum').textContent = allRecs.filter(r => r.status === 'done').length;
  },

  /* ========== 任务看板模块 ========== */
  taskView: 'week',
  editingTaskId: null,
  monthCursor: null, // 月视图当前显示的月份 YYYY-MM

  // 获取某天的任务列表
  async getTasksForDate(dateStr) {
    const all = await DB.getAll('tasks');
    return all.filter(t => {
      if (t.type === 'once') return t.onceDate === dateStr;
      // long任务：如果有endDate，超过endDate就不再显示
      if (t.endDate && dateStr > t.endDate) return false;
      return true;
    });
  },

  async renderTasks() {
    const weekView = document.getElementById('taskWeekView');
    const monthView = document.getElementById('taskMonthView');
    if (this.taskView === 'week') {
      weekView.classList.remove('hidden');
      monthView.classList.add('hidden');
      await this.renderWeekTasks(weekView);
    } else {
      weekView.classList.add('hidden');
      monthView.classList.remove('hidden');
      await this.renderMonthTasks(monthView);
    }
  },

  async renderWeekTasks(container) {
    if (!this.weekCursor) this.weekCursor = this.todayStr();
    const today = this.todayStr();
    const d = new Date(this.weekCursor + 'T00:00:00');
    const dayOfWeek = d.getDay() || 7;
    const monday = this.addDays(this.weekCursor, -(dayOfWeek - 1));
    const sunday = this.addDays(monday, 6);
    container.innerHTML = `<div class="month-nav">
      <button id="weekPrev">‹</button>
      <span>${monday.slice(5).replace('-','/')} ~ ${sunday.slice(5).replace('-','/')}</span>
      <button id="weekNext">›</button>
    </div>`;
    for (let i = 0; i < 7; i++) {
      const ds = this.addDays(monday, i);
      const dayCol = document.createElement('div');
      dayCol.className = 'task-day-col';
      const isToday = ds === today;
      dayCol.innerHTML = `<div class="day-head ${isToday ? 'today' : ''}">
        <span>${this.weekdayCN(ds)} ${ds.slice(5)}</span>
      </div>`;
      const tasks = await this.getTasksForDate(ds);
      if (!tasks.length) {
        dayCol.innerHTML += '<div class="card-sub" style="font-size:12px;padding:4px;">无任务</div>';
      }
      for (const t of tasks) {
        const done = (t.doneDates || []).includes(ds);
        const row = document.createElement('div');
        row.className = 'task-row' + (done ? ' done' : '');
        row.innerHTML = `
          <div class="check-box">${done ? '✓' : ''}</div>
          <span class="task-title">${this._escHtml(t.title)}</span>
          <span class="task-badge ${t.type}">${t.type === 'long' ? '长期' : '一次性'}</span>
        `;
        row.addEventListener('click', () => this.toggleTaskDone(t, ds));
        row.addEventListener('contextmenu', (e) => { e.preventDefault(); this.openTaskModal(t.id); });
        dayCol.appendChild(row);
      }
      container.appendChild(dayCol);
    }
    document.getElementById('weekPrev').addEventListener('click', () => {
      this.weekCursor = this.addDays(this.weekCursor, -7);
      this.renderTasks();
    });
    document.getElementById('weekNext').addEventListener('click', () => {
      this.weekCursor = this.addDays(this.weekCursor, 7);
      this.renderTasks();
    });
  },

  async renderMonthTasks(container) {
    if (!this.monthCursor) {
      this.monthCursor = this.todayStr().slice(0, 7);
    }
    const [y, m] = this.monthCursor.split('-').map(Number);
    const today = this.todayStr();
    const firstDay = new Date(y, m - 1, 1);
    const lastDay = new Date(y, m, 0);
    // 周一开头
    const startOffset = (firstDay.getDay() || 7) - 1;

    let html = `<div class="month-nav">
      <button id="monthPrev">‹</button>
      <span>${y}年${m}月</span>
      <button id="monthNext">›</button>
    </div><div class="month-grid">`;
    ['一','二','三','四','五','六','日'].forEach(w => {
      html += `<div class="weekday-head">${w}</div>`;
    });
    // 前置空格
    for (let i = 0; i < startOffset; i++) html += '<div class="month-cell other-month"></div>';

    // 获取所有任务
    const allTasks = await DB.getAll('tasks');

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const ds = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const dayTasks = allTasks.filter(t => t.type === 'once' ? t.onceDate === ds : true);
      const doneCount = dayTasks.filter(t => (t.doneDates || []).includes(ds)).length;
      const totalCount = dayTasks.length;
      const isToday = ds === today;
      html += `<div class="month-cell ${isToday ? 'today' : ''}" data-date="${ds}" style="cursor:pointer;">
        <div>${day}</div>
        ${totalCount ? `<div style="font-size:9px;color:#8a94a3;">${doneCount}/${totalCount}</div>` : ''}
        <div class="dot ${doneCount === totalCount && totalCount > 0 ? 'done' : ''}"></div>
      </div>`;
    }
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.month-cell[data-date]').forEach(cell => {
      cell.addEventListener('click', () => this.showDayTasks(cell.dataset.date));
    });

    document.getElementById('monthPrev').addEventListener('click', () => {
      const d = new Date(y, m - 2, 1);
      this.monthCursor = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      this.renderTasks();
    });
    document.getElementById('monthNext').addEventListener('click', () => {
      const d = new Date(y, m, 1);
      this.monthCursor = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
      this.renderTasks();
    });
  },

  async showDayTasks(dateStr) {
    const tasks = await this.getTasksForDate(dateStr);
    const d = new Date(dateStr + 'T00:00:00');
    document.getElementById('dayDetailTitle').textContent = `${d.getMonth()+1}月${d.getDate()}日 ${this.weekdayCN(dateStr)}`;
    let html = '';
    if (!tasks.length) {
      html = '<div class="card-sub" style="padding:14px;text-align:center;">当天无任务</div>';
    } else {
      for (const t of tasks) {
        const done = (t.doneDates || []).includes(dateStr);
        html += `<div style="display:flex;align-items:center;gap:8px;padding:8px;border-bottom:1px solid #f0f0f0;">
          <div class="check-box" style="${done?'background:var(--primary-deep);color:#fff;':''}">${done?'✓':''}</div>
          <span style="flex:1;${done?'text-decoration:line-through;color:#999;':''}">${this._escHtml(t.title)}</span>
        </div>`;
      }
    }
    document.getElementById('dayDetailContent').innerHTML = html;
    document.getElementById('dayDetailModal').classList.remove('hidden');
  },

  async toggleTaskDone(task, dateStr) {
    task.doneDates = task.doneDates || [];
    const idx = task.doneDates.indexOf(dateStr);
    if (idx >= 0) task.doneDates.splice(idx, 1);
    else task.doneDates.push(dateStr);
    await DB.put('tasks', task);
    await this.renderTasks();
  },

  openTaskModal(taskId) {
    this.editingTaskId = taskId;
    document.getElementById('taskModalTitle').textContent = taskId ? '编辑任务' : '新任务';
    document.getElementById('taskDeleteBtn').style.display = taskId ? 'block' : 'none';
    if (taskId) {
      DB.getAll('tasks').then(tasks => {
        const t = tasks.find(x => x.id === taskId);
        if (t) {
          document.getElementById('taskTitle').value = t.title;
          document.getElementById('taskType').value = t.type;
          document.getElementById('taskDate').value = t.onceDate || this.todayStr();
          document.getElementById('taskEndDate').value = t.endDate || '';
          document.getElementById('taskDateRow').classList.toggle('hidden', t.type !== 'once');
          document.getElementById('taskEndDateRow').classList.toggle('hidden', t.type !== 'long');
        }
      });
    } else {
      document.getElementById('taskTitle').value = '';
      document.getElementById('taskType').value = 'long';
      document.getElementById('taskDate').value = this.todayStr();
      document.getElementById('taskEndDate').value = '';
      document.getElementById('taskDateRow').classList.add('hidden');
      document.getElementById('taskEndDateRow').classList.remove('hidden');
    }
    document.getElementById('taskModal').classList.remove('hidden');
  },

  async saveTask() {
    const title = document.getElementById('taskTitle').value.trim();
    if (!title) { this.toast('请输入任务名'); return; }
    const type = document.getElementById('taskType').value;
    const onceDate = document.getElementById('taskDate').value;
    const endDate = document.getElementById('taskEndDate').value;
    if (type === 'once' && !onceDate) { this.toast('一次性任务需选日期'); return; }
    if (this.editingTaskId) {
      const tasks = await DB.getAll('tasks');
      const t = tasks.find(x => x.id === this.editingTaskId);
      if (t) {
        t.title = title; t.type = type;
        t.onceDate = type === 'once' ? onceDate : null;
        t.endDate = type === 'long' ? (endDate || null) : null;
        await DB.put('tasks', t);
      }
    } else {
      await DB.add('tasks', {
        title, type,
        onceDate: type === 'once' ? onceDate : null,
        endDate: type === 'long' ? (endDate || null) : null,
        doneDates: [], createdAt: Date.now()
      });
    }
    this.closeModal('taskModal');
    this.toast('已保存');
    await this.refresh();
  },

  async deleteTask() {
    if (!this.editingTaskId) return;
    if (!confirm('删除此任务？')) return;
    await DB.delete('tasks', this.editingTaskId);
    this.closeModal('taskModal');
    this.toast('已删除');
    await this.refresh();
  },

  /* ========== 图文日志模块 ========== */
  editingLogId: null,
  logKeyword: '',
  pendingImages: [], // 编辑中暂存的图片base64

  async renderLogs() {
    const all = await DB.getAll('logs');
    const kw = this.logKeyword;
    let list = all.filter(l => {
      if (!kw) return true;
      return (l.text || '').includes(kw) || (l.date || '').includes(kw);
    });
    list.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
    const container = document.getElementById('logTimeline');
    container.innerHTML = '';

    if (!list.length) {
      container.innerHTML = '<div class="card-sub" style="text-align:center;padding:30px">还没有日志，点右上角"+ 写日志"开始记录</div>';
      return;
    }

    // 存储容量预警
    let totalBytes = 0;
    all.forEach(l => (l.images || []).forEach(img => totalBytes += img.length));
    const mb = totalBytes / 1024 / 1024;
    if (mb > 3) {
      container.innerHTML = `<div class="storage-warn">⚠️ 本地图片已占用 ${mb.toFixed(1)} MB，建议定期备份。</div>`;
    }

    // 按日期分组
    const groups = {};
    list.forEach(l => {
      if (!groups[l.date]) groups[l.date] = [];
      groups[l.date].push(l);
    });
    const today = this.todayStr();
    const yesterday = this.addDays(today, -1);

    Object.entries(groups).forEach(([date, logs]) => {
      const dayLabel = date === today ? '今天'
        : date === yesterday ? '昨天'
        : `${Number(date.slice(5,7))}月${Number(date.slice(8))}日`;
      const group = document.createElement('div');
      group.className = 'moment-group';
      group.innerHTML = `
        <div class="moment-date">${dayLabel}</div>
        <div class="moment-list"></div>
      `;
      const listEl = group.querySelector('.moment-list');

      logs.forEach(log => {
        const row = document.createElement('div');
        row.className = 'moment-row';
        let thumbHtml = '';
        if (log.images && log.images.length) {
          const imgs = log.images.slice(0, 4);
          thumbHtml = `<div class="moment-thumbs">` +
            imgs.map((img, i) => `<img src="${img}" class="moment-thumb" data-idx="${i}" />`).join('') +
            `</div>`;
        }
        row.innerHTML = `
          ${thumbHtml}
          <div class="moment-body">
            <div class="moment-text">${this._escHtml(log.text || '')}</div>
            <div class="moment-meta">
              <span class="moment-edit">编辑</span>
              <span class="moment-day">当天记录</span>
            </div>
          </div>
        `;
        row.querySelector('.moment-edit').addEventListener('click', () => this.openLogModal(log.id));
        row.querySelector('.moment-day').addEventListener('click', () => this.showDayDetail(log.date));
        row.querySelectorAll('.moment-thumb').forEach((img, i) => {
          img.addEventListener('click', () => {
            document.getElementById('imgPreviewFull').src = log.images[i];
            document.getElementById('imgPreviewModal').classList.remove('hidden');
          });
        });
        listEl.appendChild(row);
      });

      container.appendChild(group);
    });
  },

  openLogModal(logId) {
    this.editingLogId = logId;
    this.pendingImages = [];
    document.getElementById('logModalTitle').textContent = logId ? '编辑日志' : '写日志';
    document.getElementById('logDeleteBtn').style.display = logId ? 'block' : 'none';
    if (logId) {
      DB.getAll('logs').then(logs => {
        const l = logs.find(x => x.id === logId);
        if (l) {
          document.getElementById('logDate').value = l.date;
          document.getElementById('logText').value = l.text || '';
          this.pendingImages = [...(l.images || [])];
          this.renderImgPreview();
        }
      });
    } else {
      document.getElementById('logDate').value = this.todayStr();
      document.getElementById('logText').value = '';
      this.renderImgPreview();
    }
    document.getElementById('logModal').classList.remove('hidden');
  },

  renderImgPreview() {
    const box = document.getElementById('logImgPreview');
    box.innerHTML = '';
    this.pendingImages.forEach((img, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'img-wrap';
      wrap.innerHTML = `<img src="${img}" /><div class="img-del" data-idx="${i}">×</div>`;
      wrap.querySelector('.img-del').addEventListener('click', () => {
        this.pendingImages.splice(i, 1);
        this.renderImgPreview();
      });
      box.appendChild(wrap);
    });
  },

  async onImgPicked(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    if (this.pendingImages.length + files.length > 6) {
      this.toast('单篇最多6张图片');
      return;
    }
    for (const f of files) {
      try {
        const compressed = await this.compressImage(f, 1200, 0.7);
        this.pendingImages.push(compressed);
      } catch (err) {
        this.toast('图片读取失败');
      }
    }
    this.renderImgPreview();
  },

  // 图片压缩：限制最大宽度，转jpeg dataURL
  compressImage(file, maxW, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let w = img.width, h = img.height;
          if (w > maxW) { h = h * maxW / w; w = maxW; }
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  async saveLog() {
    const date = document.getElementById('logDate').value;
    const text = document.getElementById('logText').value.trim();
    if (!date) { this.toast('请选择日期'); return; }
    if (!text && !this.pendingImages.length) { this.toast('写点什么或加张图吧'); return; }
    if (this.editingLogId) {
      const logs = await DB.getAll('logs');
      const l = logs.find(x => x.id === this.editingLogId);
      if (l) {
        l.date = date; l.text = text; l.images = this.pendingImages; l.updatedAt = Date.now();
        await DB.put('logs', l);
      }
    } else {
      await DB.add('logs', { date, text, images: this.pendingImages, createdAt: Date.now(), updatedAt: Date.now() });
    }
    this.closeModal('logModal');
    this.toast('已保存');
    await this.refresh();
  },

  async deleteLog() {
    if (!this.editingLogId) return;
    if (!confirm('删除此日志？')) return;
    await DB.delete('logs', this.editingLogId);
    this.closeModal('logModal');
    this.toast('已删除');
    await this.refresh();
  },

  // 当日详情：显示某天的打卡、用药、日志
  async showDayDetail(dateStr) {
    document.getElementById('dayDetailTitle').textContent = `${dateStr} ${this.weekdayCN(dateStr)}`;
    const container = document.getElementById('dayDetailContent');
    let html = '';

    // 打卡项目
    const items = await DB.getItems();
    const recs = await DB.getRecordsOfDate(dateStr);
    html += '<div class="day-section"><h4>✓ 打卡项目</h4>';
    if (!recs.length) html += '<div class="day-record-row"><span>无记录</span><span></span></div>';
    items.forEach(it => {
      const r = recs.find(x => x.itemId === it.id);
      const st = r ? {done:'完成',postpone:'暂缓',skip:'放弃'}[r.status] : '未打卡';
      html += `<div class="day-record-row"><span>${this._escHtml(it.name)}</span><span>${st}</span></div>`;
    });
    html += '</div>';

    // 用药
    const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
    const medRecs = await DB.getMedRecordsOfDate(dateStr);
    html += '<div class="day-section"><h4>💊 用药</h4>';
    if (!medRecs.length) html += '<div class="day-record-row"><span>无用药记录</span><span></span></div>';
    meds.forEach(m => {
      const due = this.isMedDueOn(m, dateStr);
      const r = medRecs.find(x => x.medId === m.id);
      const st = r ? {taken:'已服',paused:'暂停',missed:'漏服'}[r.status] : (due ? '待服' : '休息日');
      html += `<div class="day-record-row"><span>${this._escHtml(m.name)}</span><span>${st}</span></div>`;
    });
    html += '</div>';

    // 日志
    const logs = await DB.getAll('logs');
    const dayLogs = logs.filter(l => l.date === dateStr);
    html += '<div class="day-section"><h4>✐ 图文日志</h4>';
    if (!dayLogs.length) html += '<div class="day-record-row"><span>无日志</span><span></span></div>';
    dayLogs.forEach(l => {
      html += `<div style="padding:6px 0;font-size:13px;line-height:1.5;">${this._escHtml(l.text || '')}</div>`;
    });
    html += '</div>';

    container.innerHTML = html;
    document.getElementById('dayDetailModal').classList.remove('hidden');
  },

  /* ========== 工具 ========== */
  openModal(id) {
    document.getElementById(id).classList.remove('hidden');
  },
  closeModal(id) {
    document.getElementById(id).classList.add('hidden');
  },
  // 点击遮罩空白处关闭所有弹窗
  _bindMaskClose() {
    document.querySelectorAll('.modal-mask').forEach(mask => {
      mask.addEventListener('click', (e) => {
        if (e.target === mask) mask.classList.add('hidden');
      });
    });
  },
  _escHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
};

window.markMedStatus = async function(mid, date, status) {
  await DB.upsertMedRecord(Number(mid), date, status);
  const meds = (await DB.getAll('meds')).filter(m => m.active !== false);
  await App.renderMedHistory(meds);
  if (App.statsType === 'med') await App.renderStats();
};

document.addEventListener('DOMContentLoaded', () => App.init());
