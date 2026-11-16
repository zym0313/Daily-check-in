/* charts.js - 纯Canvas轻量图表，无外部依赖 */
const Charts = {

  // 适配高清屏
  setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || canvas.width;
    const cssH = canvas.clientHeight || canvas.height;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: cssW, h: cssH };
  },

  // 环形进度
  ring(canvas, percent, color = '#4a90d9', track = '#e6ecf3') {
    const { ctx, w, h } = Charts.setupCanvas(canvas);
    const cx = w / 2, cy = h / 2;
    const r = Math.min(w, h) / 2 - 8;
    ctx.clearRect(0, 0, w, h);
    // 背景环
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = track;
    ctx.stroke();
    // 进度环
    if (percent > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * percent);
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  },

  // 通用柱状图
  // data: [{label, value, color?}]
  barChart(canvas, data, opts = {}) {
    const { ctx, w, h } = Charts.setupCanvas(canvas);
    ctx.clearRect(0, 0, w, h);
    const padL = 24, padR = 8, padT = 14, padB = 24;
    const cw = w - padL - padR;
    const ch = h - padT - padB;
    if (!data.length) {
      ctx.fillStyle = '#aab';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('暂无数据', w / 2, h / 2);
      return;
    }
    const maxV = Math.max(...data.map(d => d.value), 1);
    const grow = opts.barGrow || 1;
    const gap = 6;
    const slotW = (cw - gap * (data.length - 1)) / data.length;
    const barW = slotW * grow;

    // 网格线
    ctx.strokeStyle = '#eef0f3';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = padT + ch - (ch * i) / 3;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
    }

    data.forEach((d, i) => {
      const slotX = padL + i * (slotW + gap);
      const x = slotX + (slotW - barW) / 2;
      const bh = (d.value / maxV) * ch;
      const y = padT + ch - bh;
      ctx.fillStyle = d.color || '#4a90d9';
      // 圆角柱
      const r = Math.min(4, barW / 2);
      ctx.beginPath();
      ctx.moveTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.lineTo(x + barW - r, y);
      ctx.arcTo(x + barW, y, x + barW, y + r, r);
      ctx.lineTo(x + barW, padT + ch);
      ctx.lineTo(x, padT + ch);
      ctx.closePath();
      ctx.fill();

      // 数值
      if (opts.showValue !== false && bh > 14) {
        ctx.fillStyle = '#667';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.value, x + barW / 2, y - 4);
      }
      // x轴标签：超过10个自动稀疏显示
      ctx.fillStyle = '#8a94a3';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      const step = data.length > 12 ? Math.ceil(data.length / 8) : 1;
      if (i % step === 0 || i === data.length - 1) {
        const label = String(d.label).length > 6 ? String(d.label).slice(0, 6) : d.label;
        ctx.fillText(label, slotX + slotW / 2, h - 8);
      }
    });
  },

  // 迷你7天概览（每天一个小柱，颜色按状态）
  // days: [{label, status: 'done'|'postpone'|'skip'|'none'}]
  weekOverview(canvas, days) {
    const { ctx, w, h } = Charts.setupCanvas(canvas);
    ctx.clearRect(0, 0, w, h);
    const padT = 10, padB = 22, padX = 10;
    const ch = h - padT - padB;
    const gap = 8;
    const barW = (w - padX * 2 - gap * (days.length - 1)) / days.length;
    const colorMap = { done: '#5cb85c', postpone: '#f0ad4e', skip: '#d9534f', none: '#e6ecf3' };
    days.forEach((d, i) => {
      const x = padX + i * (barW + gap);
      // done 满高，其他按比例
      const ratio = d.status === 'done' ? 1 : (d.status === 'postpone' ? 0.6 : (d.status === 'skip' ? 0.35 : 0.2));
      const bh = ch * ratio;
      const y = padT + ch - bh;
      ctx.fillStyle = colorMap[d.status] || colorMap.none;
      const r = Math.min(4, barW / 2);
      ctx.beginPath();
      ctx.moveTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.lineTo(x + barW - r, y);
      ctx.arcTo(x + barW, y, x + barW, y + r, r);
      ctx.lineTo(x + barW, padT + ch);
      ctx.lineTo(x, padT + ch);
      ctx.closePath();
      ctx.fill();
      // label
      ctx.fillStyle = '#8a94a3';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barW / 2, h - 6);
    });
  }
};
