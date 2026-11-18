/* backup.js - CSV 导入导出，纯本地文件操作 */
const Backup = {

  // 转义CSV字段
  esc(v) {
    if (v == null) return '';
    const s = String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  },

  // 解析一行CSV（处理引号）
  parseLine(line) {
    const out = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"') {
          if (line[i + 1] === '"') { cur += '"'; i++; }
          else inQ = false;
        } else cur += c;
      } else {
        if (c === '"') inQ = true;
        else if (c === ',') { out.push(cur); cur = ''; }
        else cur += c;
      }
    }
    out.push(cur);
    return out;
  },

  // 导出整个数据库为CSV文本
  async exportCSV() {
    const items = await DB.getAll('items');
    const records = await DB.getAll('records');
    const periods = await DB.getAll('periods');
    const meds = await DB.getAll('meds');
    const medRecords = await DB.getAll('medRecords');
    const tasks = await DB.getAll('tasks');
    const logs = await DB.getAll('logs');

    const lines = [];
    lines.push('# TABLE: items');
    lines.push('id,name,color,createdAt,archived');
    items.forEach(it => {
      lines.push([it.id, it.name, it.color || '#4a90d9', it.createdAt || '', it.archived ? 1 : 0].map(Backup.esc).join(','));
    });

    lines.push('');
    lines.push('# TABLE: records');
    lines.push('id,itemId,date,status,note,ts');
    records.forEach(r => {
      lines.push([r.id, r.itemId, r.date, r.status, r.note || '', r.ts || ''].map(Backup.esc).join(','));
    });

    lines.push('');
    lines.push('# TABLE: periods');
    lines.push('id,startDate,endDate,note,ts');
    periods.forEach(p => {
      lines.push([p.id, p.startDate, p.endDate || '', p.note || '', p.ts || ''].map(Backup.esc).join(','));
    });

    lines.push('');
    lines.push('# TABLE: meds');
    lines.push('id,name,dosage,type,intervalDays,cycleOn,cycleOff,startDate,active');
    meds.forEach(m => {
      lines.push([m.id, m.name, m.dosage || '', m.type || 'interval', m.intervalDays || 1, m.cycleOn || 5, m.cycleOff || 2, m.startDate || '', m.active === false ? 0 : 1].map(Backup.esc).join(','));
    });

    lines.push('');
    lines.push('# TABLE: medRecords');
    lines.push('id,medId,date,status,note,ts');
    medRecords.forEach(r => {
      lines.push([r.id, r.medId, r.date, r.status, r.note || '', r.ts || ''].map(Backup.esc).join(','));
    });

    lines.push('');
    lines.push('# TABLE: tasks');
    lines.push('id,title,type,onceDate,endDate,doneDates,createdAt');
    tasks.forEach(t => {
      lines.push([t.id, t.title, t.type, t.onceDate || '', t.endDate || '', JSON.stringify(t.doneDates || []), t.createdAt || ''].map(Backup.esc).join(','));
    });

    lines.push('');
    lines.push('# TABLE: logs');
    lines.push('id,date,text,images,createdAt');
    logs.forEach(l => {
      lines.push([l.id, l.date, l.text || '', JSON.stringify(l.images || []), l.createdAt || ''].map(Backup.esc).join(','));
    });

    const csv = '\uFEFF' + lines.join('\n'); // BOM 让Excel识别中文
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `checkin-backup-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 500);
    return { items: items.length, records: records.length, periods: periods.length, meds: meds.length, medRecords: medRecords.length, tasks: tasks.length, logs: logs.length };
  },

  // 从CSV文本导入（覆盖式：先清空对应表再写入）
  async importCSV(text) {
    // 去BOM
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const rawLines = text.split(/\r?\n/);
    let section = null;
    let header = null;
    const buckets = { items: [], records: [], periods: [], meds: [], medRecords: [], tasks: [], logs: [] };

    for (const line of rawLines) {
      if (!line.trim()) continue;
      if (line.startsWith('# TABLE:')) {
        section = line.replace('# TABLE:', '').trim();
        header = null;
        continue;
      }
      if (!section) continue;
      const cols = Backup.parseLine(line);
      if (!header) { header = cols; continue; }
      const row = {};
      header.forEach((h, i) => row[h] = cols[i]);
      if (buckets[section]) buckets[section].push(row);
    }

    // 确认
    const ok = confirm(`即将导入：\n项目 ${buckets.items.length} 条\n打卡记录 ${buckets.records.length} 条\n生理期 ${buckets.periods.length} 条\n药品 ${buckets.meds.length} 条\n用药记录 ${buckets.medRecords.length} 条\n任务 ${buckets.tasks.length} 条\n日志 ${buckets.logs.length} 条\n\n注意：导入会清空现有对应数据，确定继续？`);
    if (!ok) return false;

    // 清空并写入
    await DB.clear('items');
    for (const it of buckets.items) {
      await DB.add('items', {
        id: Number(it.id) || undefined,
        name: it.name,
        color: it.color || '#4a90d9',
        createdAt: Number(it.createdAt) || Date.now(),
        archived: it.archived == 1 || it.archived === '1'
      });
    }
    await DB.clear('records');
    for (const r of buckets.records) {
      await DB.add('records', {
        id: Number(r.id) || undefined,
        itemId: Number(r.itemId),
        date: r.date,
        status: r.status,
        note: r.note || '',
        ts: Number(r.ts) || Date.now()
      });
    }
    await DB.clear('periods');
    for (const p of buckets.periods) {
      await DB.add('periods', {
        id: Number(p.id) || undefined,
        startDate: p.startDate,
        endDate: p.endDate || '',
        note: p.note || '',
        ts: Number(p.ts) || Date.now()
      });
    }
    await DB.clear('meds');
    for (const m of buckets.meds) {
      await DB.add('meds', {
        id: Number(m.id) || undefined,
        name: m.name,
        dosage: m.dosage || '',
        type: m.type || 'interval',
        intervalDays: Number(m.intervalDays) || 1,
        cycleOn: Number(m.cycleOn) || 5,
        cycleOff: Number(m.cycleOff) || 2,
        startDate: m.startDate || '',
        active: m.active !== '0' && m.active !== 0
      });
    }
    await DB.clear('medRecords');
    for (const r of buckets.medRecords) {
      await DB.add('medRecords', {
        id: Number(r.id) || undefined,
        medId: Number(r.medId),
        date: r.date,
        status: r.status,
        note: r.note || '',
        ts: Number(r.ts) || Date.now()
      });
    }
    await DB.clear('tasks');
    for (const t of buckets.tasks) {
      let doneDates = [];
      try { doneDates = JSON.parse(t.doneDates || '[]'); } catch(e) {}
      await DB.add('tasks', {
        id: Number(t.id) || undefined,
        title: t.title,
        type: t.type,
        onceDate: t.onceDate || null,
        endDate: t.endDate || null,
        doneDates,
        createdAt: Number(t.createdAt) || Date.now()
      });
    }
    await DB.clear('logs');
    for (const l of buckets.logs) {
      let images = [];
      try { images = JSON.parse(l.images || '[]'); } catch(e) {}
      await DB.add('logs', {
        id: Number(l.id) || undefined,
        date: l.date,
        text: l.text || '',
        images,
        createdAt: Number(l.createdAt) || Date.now()
      });
    }
    return buckets;
  },

  // 读取本地文件为文本
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file, 'utf-8');
    });
  }
};
