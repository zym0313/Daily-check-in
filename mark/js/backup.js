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
    return { items: items.length, records: records.length, periods: periods.length };
  },

  // 从CSV文本导入（覆盖式：先清空对应表再写入）
  async importCSV(text) {
    // 去BOM
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const rawLines = text.split(/\r?\n/);
    let section = null;
    let header = null;
    const buckets = { items: [], records: [], periods: [] };

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
    const ok = confirm(`即将导入：\n项目 ${buckets.items.length} 条\n打卡记录 ${buckets.records.length} 条\n生理期 ${buckets.periods.length} 条\n\n注意：导入会清空现有对应数据，确定继续？`);
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
