export const note = {
    radius: 0.05,
}

export const v0: VecLike = { x: 0.4619, y: 0.1913 }
export const v1: VecLike = { x: 0.1913, y: 0.4619 }
export const v2: VecLike = { x: -0.1913, y: 0.4619 }
export const v3: VecLike = { x: -0.4619, y: 0.1913 }
export const v4: VecLike = { x: -0.4619, y: -0.1913 }
export const v5: VecLike = { x: -0.1913, y: -0.4619 }
export const v6: VecLike = { x: 0.1913, y: -0.4619 }
export const v7: VecLike = { x: 0.4619, y: -0.1913 }

// 各辺の中点（中心座標）
export const c0: VecLike = { x: (v0.x + v1.x) / 2, y: (v0.y + v1.y) / 2 }
export const c1: VecLike = { x: (v1.x + v2.x) / 2, y: (v1.y + v2.y) / 2 }
export const c2: VecLike = { x: (v2.x + v3.x) / 2, y: (v2.y + v3.y) / 2 }
export const c3: VecLike = { x: (v3.x + v4.x) / 2, y: (v3.y + v4.y) / 2 }
export const c4: VecLike = { x: (v4.x + v5.x) / 2, y: (v4.y + v5.y) / 2 }
export const c5: VecLike = { x: (v5.x + v6.x) / 2, y: (v5.y + v6.y) / 2 }
export const c6: VecLike = { x: (v6.x + v7.x) / 2, y: (v6.y + v7.y) / 2 }
export const c7: VecLike = { x: (v7.x + v0.x) / 2, y: (v7.y + v0.y) / 2 }

const toMs = ({ min, max }: Range) => new Range(Math.round(min * 1000), Math.round(max * 1000))

export const windows = {
    perfect: Range.one.mul(0.05),
    great: Range.one.mul(0.1),
    good: Range.one.mul(0.2),
}

export const bucketWindows = {
    perfect: toMs(windows.perfect),
    great: toMs(windows.great),
    good: toMs(windows.good),
}

export const holdWindows = {
    perfect: Range.one.mul(0.08),
    great: Range.one.mul(0.12),
    good: Range.one.mul(0.16),
}
export const bucketHoldWindows = {
    perfect: toMs(holdWindows.perfect),
    great: toMs(holdWindows.great),
    good: toMs(holdWindows.good),
}
