/* SAHNE 1 — DİKDÖRTGEN (0–10 s)  A 6 × 4 rectangle on a unit grid.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Birim karelerden bir dikdörtgen'],
      [10.6, 27.8, 'Dikdörtgenin alanını hatırlayalım'],
      [28.4, 45.8, 'Paralelkenarın alanı ne olur?'],
      [46.4, 63.8, 'Üçgenin alanı ne olur?'],
      [64.4, 79.8, 'Farklı örneklerle deneyelim'],
    ]);
  }

  /** labels: base under the bottom side, height beside the dashed line */
  function labels(ctx, G, base, hTop, hFoot, a, t0, t) {
    const f = F(), k = seg(t, t0, t0 + 0.5) * a; if (k <= 0) return;
    const b0 = f.U(G, base[0]), b1 = f.U(G, base[1]);
    f.T(ctx, 'taban 6', (b0[0] + b1[0]) / 2, b0[1] + 40, { size: G.s * 0.75, alpha: k, halo: true });
    const p = f.U(G, hTop), q = f.U(G, hFoot);
    f.height(ctx, p, q, k, seg(t, t0, t0 + 0.6));
    f.T(ctx, 'yükseklik 4', p[0] + 18, (p[1] + q[1]) / 2, Object.assign({ size: G.s * 0.7, alpha: k, halo: true, align: 'left' }, f.AMB));
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), G = L.G, f = F(), a = END(t) * (1 - seg(t, 79.8, 80.4)); if (a <= 0) return;
    f.grid(ctx, G, seg(t, 4.2, 5.2) * a);

    // 0–28: the rectangle, counted row by row
    const ra = (1 - seg(t, 28.2, 28.6)) * a;
    if (ra > 0 && t < 28.6) {
      const R = f.UP(G, [[-3, 2], [3, 2], [3, -2], [-3, -2]]);
      const cells = seg(t, 11.0, 15.0) * 24;
      for (let c = 0; c < Math.floor(cells); c++) { const r = Math.floor(c / 6), x = -3 + c % 6, y = 1 - r; const p = f.U(G, [x, y]); ctx.fillStyle = amber(0.22 * ra); ctx.fillRect(p[0] + 2, p[1] + 2, G.u - 4, G.u - 4); }
      if (cells <= 0) f.fill(ctx, R, seg(t, 6.4, 7.2) * ra);
      f.poly(ctx, R, seg(t, 5.0, 6.6), ra, 2300);
      if (cells > 0) { const n = Math.min(24, Math.floor(cells) + (cells >= 24 ? 0 : 1)); f.T(ctx, `${n}`, f.U(G, [0, 0])[0], f.U(G, [0, 0])[1], Object.assign({ size: G.s * 1.3, alpha: win(t, 11.0, 18.0) * ra, halo: true }, f.AMB)); }
      labels(ctx, G, [[-3, 2], [3, 2]], [3, -2], [3, 2], ra * win(t, 18.0, 28.6), 18.0, t);
    }

    // 28–46: the parallelogram, cut and moved
    const pa = win(t, 28.4, 45.8) * a;
    if (pa > 0) {
      const s = 2 * inOut(seg(t, 28.6, 30.0)), mv = 6 * inOut(seg(t, 35.0, 37.0)), cut = seg(t, 33.0, 33.6);
      const body = cut > 0 ? [[-1, 2], [3, 2], [-3 + s + 6, -2], [-1, -2]] : [[-3, 2], [3, 2], [3 + s, -2], [-3 + s, -2]];
      f.fill(ctx, f.UP(G, body), pa); f.poly(ctx, f.UP(G, body), 1, pa, 2310);
      if (cut > 0) {
        const tri = f.UP(G, [[-3 + mv, 2], [-1 + mv, 2], [-1 + mv, -2]]);
        f.fill(ctx, tri, pa, 0.4); f.poly(ctx, tri, 1, pa, 2320, 6, LI.AMBER_RGB);
      }
      labels(ctx, G, [[-3, 2], [3, 2]], [-1, -2], [-1, 2], pa * (1 - seg(t, 32.6, 33.0)), 30.6, t);
      if (t > 37.2) { const c = f.U(G, [2, 0]); f.T(ctx, '6 × 4 = 24', c[0], c[1], Object.assign({ size: G.s * 1.1, alpha: seg(t, 37.4, 37.8) * pa, halo: true }, f.AMB)); }
    }

    // 46–64: the triangle, doubled
    const ta = win(t, 46.4, 63.8) * a;
    if (ta > 0) {
      const T0 = [[-4, 2], [2, 2], [-2, -2]], th = 180 * inOut(seg(t, 50.0, 52.0)), cp = win(t, 49.6, 57.0);
      const TT = f.UP(G, T0);
      f.fill(ctx, TT, ta, 0.2); f.poly(ctx, TT, seg(t, 46.6, 47.8), ta, 2330);
      if (cp > 0) {
        const C = f.UP(G, T0.map((p) => f.rot(p, [0, 0], th)));
        f.fill(ctx, C, cp * ta, 0.08); f.poly(ctx, C, 1, cp * ta, 2340, 5, LI.AMBER_RGB);
      }
      labels(ctx, G, [[-4, 2], [2, 2]], [-2, -2], [-2, 2], ta, 47.8, t);
      if (t > 53.4 && t < 57.0) { const c = f.U(G, [1.6, -0.9]); f.T(ctx, '6 × 4 = 24', c[0], c[1], Object.assign({ size: G.s * 0.9, alpha: win(t, 53.4, 57.0) * ta, halo: true }, f.AMB)); }
      if (t > 57.2) { const c = f.U(G, [-0.6, 1.2]); f.T(ctx, '24 ÷ 2 = 12', c[0], c[1], Object.assign({ size: G.s * 0.9, alpha: seg(t, 57.4, 57.8) * ta, halo: true }, f.AMB)); }
    }

    // 64–72: the top side slides, the area stays 24
    const sa = win(t, 64.4, 71.8) * a;
    if (sa > 0) {
      const s = 2 + 3 * Math.sin((t - 64.8) * 1.1) * seg(t, 65.4, 66.0);
      const P = f.UP(G, [[-3, 2], [3, 2], [3 + s, -2], [-3 + s, -2]]);
      f.fill(ctx, P, sa); f.poly(ctx, P, 1, sa, 2350);
      const c = f.U(G, [s / 2, 0]); f.T(ctx, 'alan = 6 × 4 = 24', c[0], c[1], Object.assign({ size: G.s * 0.8, alpha: sa, halo: true }, f.AMB));
      f.T(ctx, 'taban 6', f.U(G, [0, 2])[0], f.U(G, [0, 2])[1] + 40, { size: G.s * 0.75, alpha: sa, halo: true });
    }
    // 72–80: the apex slides, the area stays 12
    const aa = win(t, 72.0, 79.8) * a;
    if (aa > 0) {
      const x = 4 * Math.sin((t - 72.4) * 1.0) * seg(t, 73.0, 73.6);
      const P = f.UP(G, [[-3, 2], [3, 2], [x, -2]]);
      f.fill(ctx, P, aa, 0.2); f.poly(ctx, P, 1, aa, 2360);
      const top = f.U(G, [x, -2]), foot = f.U(G, [x, 2]);
      f.height(ctx, top, foot, aa * 0.8);
      Ink.path(ctx, [f.U(G, [-7, -2]), f.U(G, [8, -2])], { w: 2.5, alpha: aa * 0.35, seed: 2370, taper: [0.1, 0.1] });
      if (x < -3 || x > 3) Ink.path(ctx, [f.U(G, [x < 0 ? x : 3, 2]), f.U(G, [x < 0 ? -3 : x, 2])], { w: 2.5, alpha: aa * 0.5, seed: 2371, taper: [0, 0] });
      const c = f.U(G, [x / 3, 0.9]); f.T(ctx, 'alan = 6 × 4 ÷ 2 = 12', c[0], c[1], Object.assign({ size: G.s * 0.75, alpha: aa, halo: true }, f.AMB));
    }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[11.4, 27.8, 'Her sırada 6 kare, 4 sıra'], [30.4, 45.8, 'Taban 6, yükseklik 4 (tabana dik uzaklık)'],
      [48.0, 56.4, 'Taban 6, yükseklik 4'], [56.8, 63.8, 'Üçgen, paralelkenarın yarısı: 24 ÷ 2 = 12'],
      [65.0, 71.8, 'Üst kenar kaysa da taban 6, yükseklik 4: alan hep 24']]);
    exprs(ctx, t, at(W, 1), [[15.6, 27.8, '6 × 4 = 24 birimkare'], [33.4, 45.8, 'Soldaki üçgeni kes, sağa taşı: dikdörtgen oldu'],
      [50.4, 56.4, 'Aynısından bir tane daha: döndür, yanına koy'], [58.8, 63.8, 'Üçgenin alanı = taban × yükseklik ÷ 2', true],
      [72.4, 79.8, 'Tepe kaysa da alan hep 6 × 4 ÷ 2 = 12']]);
    exprs(ctx, t, at(W, 2), [[19.6, 27.8, 'Dikdörtgenin alanı = taban × yükseklik', true], [38.0, 45.8, 'Paralelkenarın alanı = taban × yükseklik', true],
      [53.4, 56.4, 'İki üçgen bir paralelkenar: 6 × 4 = 24'], [75.0, 79.8, 'Aynı taban, aynı yükseklik: aynı alan', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Dikdörtgen: taban × yükseklik', 80.6], ['Paralelkenar: kes, taşı → taban × yükseklik', 81.6], ['Üçgen: paralelkenarın yarısı', 82.6], ['Üçgen = taban × yükseklik ÷ 2', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };
  void lerp;

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A rectangle', nameTr: 'Dikdörtgen', concept: '6 by 4 unit squares', conceptTr: '6 × 4 birim kare', render });
})(window.LI = window.LI || {});
