/**
 * Teleprompter: a monitor lies face up under a pane of glass leaning at 45°,
 * with a camera behind it looking through. The script is seven bars on the
 * screen and the same seven drawn again on the glass, where the talent reads
 * them. The line under the pointer rises off the screen and goes bright, on
 * the screen and on the glass; its neighbours rise less, staggered outwards.
 * The slider is the stagger, in ms.
 *
 * Hit test: the pointer is put on the screen's resting plane, which never
 * moves, and picks the nearest line by depth, so a rising line cannot flip it.
 */
const {
  Cam, clamp, circ, facing, fillet, fit, hull, open, poly, prism, proj, put, rings, ringAt,
  seg, solid, tdone, tset, tval, tween, unproj, disposer, mk, place, pointer, reflect, register,
} = HL;

const W = 110, D = 70, MH = 10, GZ = MH + 4, GL = 74, R2 = Math.SQRT2;
const N = 7, LX = 12, LEN = [86, 74, 92, 58, 82, 70, 44], LY = (i) => 11 + i * 8.2, LT = 1.6, LW = 2;
const LIFT = 16, NEAR = 7, REST = 4, REST_LINE = 2;
const CX = W / 2, CY0 = D + 18, CY1 = D + 46, CZ0 = 24, CZ1 = 48, LZ = 36, LR = 9;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;

  const C = Cam(45, 0.5, 1.5);
  fit(C, [[-4, -4, 0], [W + 4, -4, GZ + GL], [-4, -4, GZ + GL], [W + 4, CY1, 0], [-4, D + 4, 0], [CX + 17, CY1, CZ1], [W + 4, D + 4, MH + LIFT]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  // the monitor, face up, farthest: its body and the screen's edge as the crease
  const [mr, mi] = rings(-2, -4, W + 2, D + 4, 7, 2.2);
  reflect(svg, g, P, front, mr, 0, 14);
  put(solid(g), prism(P, front, mr, mi, 0, MH));

  // the script on the screen, far line first
  const lines = [];
  for (let i = 0; i < N; i++) {
    const s = solid(g);
    const [lr, li] = rings(LX, LY(i) - LW, LX + LEN[i], LY(i) + LW, LW, 0.6);
    lines.push({ s, lr, li, z: tween(i === REST_LINE ? REST : 0), last: NaN });
  }

  // the glass: an open pane at 45°, its frame, and the script read off it
  const onGlass = (u, v) => P(u, D + 4 - v / R2, GZ + v / R2);
  const pane = fillet([[-4, 0], [W + 4, 0], [W + 4, GL * R2], [-4, GL * R2]], [5, 5, 5, 5]);
  const inset = fillet([[0, 4], [W, 4], [W, GL * R2 - 4], [0, GL * R2 - 4]], [3, 3, 3, 3]);
  mk("path", { d: poly(pane.map((p) => onGlass(p[0], p[1]))), class: "nf sil" }, g);
  mk("path", { d: poly(inset.map((p) => onGlass(p[0], p[1]))), class: "nf lo" }, g);
  const refl = lines.map((_, i) => mk("path", { d: seg(onGlass(LX, (D + 4 - LY(i)) * R2), onGlass(LX + LEN[i], (D + 4 - LY(i)) * R2)), class: "nf lo" }, g));

  // the camera, nearest, seen from behind: its riser, its lens pointing through the glass, its body
  const [rr, ri] = rings(CX - 6, D + 28, CX + 6, D + 38, 3, 1);
  put(solid(g), prism(P, front, rr, ri, 0, CZ0));
  const lens = (y, r) => circ(r, 16).map((q) => P(CX + q.u, y, LZ + q.v));
  const lf = lens(D + 7, LR), lb = lens(CY0, LR);
  mk("path", { d: poly(hull(lf.concat(lb))), class: "sil" }, g);
  mk("path", { d: poly(lf), class: "nf lo" }, g);
  const [br, bi] = rings(CX - 17, CY0, CX + 17, CY1, 6, 1.8);
  put(solid(g), prism(P, front, br, bi, CZ0, CZ1));
  place(mk("circle", { r: 1.6, class: "dot m" }, g), P(CX + 10, CY1, CZ1 - 7));

  function draw(i, z) {
    const L = lines[i];
    if (z === L.last) return;
    L.last = z;
    put(L.s, prism(P, front, L.lr, L.li, MH + z, MH + LT + z));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    lines.forEach((L, i) => { draw(i, tval(L.z, now)); if (!tdone(L.z, now)) moving = true; });
    return moving;
  });
  bag.add(B.unregister);

  /** The line under a point, read on the screen's resting plane; -1 off the screen. */
  function hit([sx, sy]) {
    const [x, y] = unproj(C, sx, sy, MH);
    if (x < -2 || x > W + 2 || y < 4 || y > D) return -1;
    return clamp(Math.round((y - LY(0)) / 8.2), 0, N - 1);
  }

  let act = -2;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : REST_LINE;
    act = a;
    const lit = a >= 0 ? a : REST_LINE;
    lines.forEach((L, i) => {
      const d = Math.abs(i - lit);
      const z = a < 0 ? (i === REST_LINE ? REST : 0) : d === 0 ? LIFT : d === 1 ? NEAR : 0;
      tset(L.z, clamp(z, 0, LIFT), now, Math.abs(i - from) * stag);
      L.s.sil.classList.toggle("hi", i === lit);
      refl[i].classList.toggle("hi", i === lit);
      refl[i].classList.toggle("lo", i !== lit);
    });
    read.textContent = a < 0 ? "rest" : "línea " + (a + 1);
    B.wake();
  }
  setActive(-1);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return { set: (v) => { stag = v; }, destroy: bag.dispose };
}

hairline({
  name: "teleprompter",
  means: "A monitor under glass at 45°, a camera behind: the line under the pointer rises and lights up on the screen and the glass.",
  rules: [1, 2, 4, 6],
  range: [0, 45, 90],
  tour: [[201, 183], [157, 204], [183, 191], null],
  mount,
});
