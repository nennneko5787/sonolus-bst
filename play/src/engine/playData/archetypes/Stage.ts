import { note, v0, v1, v2, v3, v4, v5, v6, v7 } from '../../../../../shared/src/engine/constants.js'
import { skin } from '../skin.js'
import { other } from './OtherManager.js'

export class Stage extends Archetype {
    spawnOrder() {
        return 1
    }
    shouldSpawn() {
        return entityInfos.get(0).state === EntityState.Despawned
    }

    updateParallel() {
        const thickness = 0.005
        const aspect = screen.aspectRatio

        // 0: v0→v1
        {
            const dx = v1.x - v0.x,
                dy = v1.y - v0.y
            const len = Math.hypot(dx, dy)
            const px = (-dy / len) * thickness * aspect
            const py = (dx / len) * thickness
            const q = new Quad({
                x1: v0.x + px,
                y1: v0.y + py,
                x2: v1.x + px,
                y2: v1.y + py,
                x3: v1.x - px,
                y3: v1.y - py,
                x4: v0.x - px,
                y4: v0.y - py,
            })
            skin.sprites.judgeLine.draw(q, 0, 1)
        }
        // 1: v1→v2
        {
            const dx = v2.x - v1.x,
                dy = v2.y - v1.y
            const len = Math.hypot(dx, dy)
            const px = (-dy / len) * thickness * aspect
            const py = (dx / len) * thickness
            const q = new Quad({
                x1: v1.x + px,
                y1: v1.y + py,
                x2: v2.x + px,
                y2: v2.y + py,
                x3: v2.x - px,
                y3: v2.y - py,
                x4: v1.x - px,
                y4: v1.y - py,
            })
            skin.sprites.judgeLine.draw(q, 0, 1)
        }
        // 2: v2→v3
        {
            const dx = v3.x - v2.x,
                dy = v3.y - v2.y
            const len = Math.hypot(dx, dy)
            const px = (-dy / len) * thickness * aspect
            const py = (dx / len) * thickness
            const q = new Quad({
                x1: v2.x + px,
                y1: v2.y + py,
                x2: v3.x + px,
                y2: v3.y + py,
                x3: v3.x - px,
                y3: v3.y - py,
                x4: v2.x - px,
                y4: v2.y - py,
            })
            skin.sprites.judgeLine.draw(q, 0, 1)
        }
        // 3: v3→v4
        {
            const dx = v4.x - v3.x,
                dy = v4.y - v3.y
            const len = Math.hypot(dx, dy)
            const px = (-dy / len) * thickness * aspect
            const py = (dx / len) * thickness
            const q = new Quad({
                x1: v3.x + px,
                y1: v3.y + py,
                x2: v4.x + px,
                y2: v4.y + py,
                x3: v4.x - px,
                y3: v4.y - py,
                x4: v3.x - px,
                y4: v3.y - py,
            })
            skin.sprites.judgeLine.draw(q, 0, 1)
        }
        // 4: v4→v5
        {
            const dx = v5.x - v4.x,
                dy = v5.y - v4.y
            const len = Math.hypot(dx, dy)
            const px = (-dy / len) * thickness * aspect
            const py = (dx / len) * thickness
            const q = new Quad({
                x1: v4.x + px,
                y1: v4.y + py,
                x2: v5.x + px,
                y2: v5.y + py,
                x3: v5.x - px,
                y3: v5.y - py,
                x4: v4.x - px,
                y4: v4.y - py,
            })
            skin.sprites.judgeLine.draw(q, 0, 1)
        }
        // 5: v5→v6
        {
            const dx = v6.x - v5.x,
                dy = v6.y - v5.y
            const len = Math.hypot(dx, dy)
            const px = (-dy / len) * thickness * aspect
            const py = (dx / len) * thickness
            const q = new Quad({
                x1: v5.x + px,
                y1: v5.y + py,
                x2: v6.x + px,
                y2: v6.y + py,
                x3: v6.x - px,
                y3: v6.y - py,
                x4: v5.x - px,
                y4: v5.y - py,
            })
            skin.sprites.judgeLine.draw(q, 0, 1)
        }
        // 6: v6→v7
        {
            const dx = v7.x - v6.x,
                dy = v7.y - v6.y
            const len = Math.hypot(dx, dy)
            const px = (-dy / len) * thickness * aspect
            const py = (dx / len) * thickness
            const q = new Quad({
                x1: v6.x + px,
                y1: v6.y + py,
                x2: v7.x + px,
                y2: v7.y + py,
                x3: v7.x - px,
                y3: v7.y - py,
                x4: v6.x - px,
                y4: v6.y - py,
            })
            skin.sprites.judgeLine.draw(q, 0, 1)
        }
        // 7: v7→v0
        {
            const dx = v0.x - v7.x,
                dy = v0.y - v7.y
            const len = Math.hypot(dx, dy)
            const px = (-dy / len) * thickness * aspect
            const py = (dx / len) * thickness
            const q = new Quad({
                x1: v7.x + px,
                y1: v7.y + py,
                x2: v0.x + px,
                y2: v0.y + py,
                x3: v0.x - px,
                y3: v0.y - py,
                x4: v7.x - px,
                y4: v7.y - py,
            })
            skin.sprites.judgeLine.draw(q, 0, 1)
        }

        // ripples
        skin.sprites.rippleNoteGuide.draw(
            Rect.one
                .mul(note.radius * 2.5)
                .scale(1, -1)
                .translate(-1.25, 0),
            0,
            0.5,
        )

        skin.sprites.rippleNoteGuide.draw(
            Rect.one
                .mul(note.radius * 2.5)
                .scale(1, -1)
                .translate(-0.75, 0.75),
            0,
            0.5,
        )

        skin.sprites.rippleNoteGuide.draw(
            Rect.one
                .mul(note.radius * 2.5)
                .scale(1, -1)
                .translate(-0.75, -0.75),
            0,
            0.5,
        )

        skin.sprites.rippleNoteGuide.draw(
            Rect.one
                .mul(note.radius * 2.5)
                .scale(1, -1)
                .translate(1.25, 0),
            0,
            0.5,
        )

        skin.sprites.rippleNoteGuide.draw(
            Rect.one
                .mul(note.radius * 2.5)
                .scale(1, -1)
                .translate(0.75, 0.75),
            0,
            0.5,
        )

        skin.sprites.rippleNoteGuide.draw(
            Rect.one
                .mul(note.radius * 2.5)
                .scale(1, -1)
                .translate(0.75, -0.75),
            0,
            0.5,
        )

        skin.sprites.rippleNoteGuide.draw(
            Rect.one
                .mul(note.radius * 2.5)
                .scale(1, -1)
                .translate(0, 0),
            0,
            0.5,
        )

        // gauge
        const seg = 100
        const start = Math.PI / 2
        const step = -(2 * Math.PI) / seg
        const filled = Math.ceil(seg * 1.0)

        const center = new Vec(0, 0)

        const outer = note.radius * 7
        const inner = note.radius * 5.5
        for (let i = 0; i < filled; i++) {
            const a0 = start + step * i
            const a1 = a0 + step

            const ox0 = center.x + outer * Math.cos(a0)
            const oy0 = center.y + outer * Math.sin(a0)
            const ox1 = center.x + outer * Math.cos(a1)
            const oy1 = center.y + outer * Math.sin(a1)

            const ix0 = center.x + inner * Math.cos(a0)
            const iy0 = center.y + inner * Math.sin(a0)
            const ix1 = center.x + inner * Math.cos(a1)
            const iy1 = center.y + inner * Math.sin(a1)

            skin.sprites.gauge.draw(new Quad(ix0, iy0, ox0, oy0, ox1, oy1, ix1, iy1), 0, 0.5)
        }

        const filledGroove = Math.ceil(seg * (other.grooveGauge / 100))
        for (let i = 0; i < filledGroove; i++) {
            const a0 = start + step * i
            const a1 = a0 + step

            const ox0 = center.x + outer * Math.cos(a0)
            const oy0 = center.y + outer * Math.sin(a0)
            const ox1 = center.x + outer * Math.cos(a1)
            const oy1 = center.y + outer * Math.sin(a1)

            const ix0 = center.x + inner * Math.cos(a0)
            const iy0 = center.y + inner * Math.sin(a0)
            const ix1 = center.x + inner * Math.cos(a1)
            const iy1 = center.y + inner * Math.sin(a1)

            if (other.grooveGauge < 70) {
                skin.sprites.filledGaugeCyan.draw(
                    new Quad(ix0, iy0, ox0, oy0, ox1, oy1, ix1, iy1),
                    1,
                    1,
                )
            } else {
                skin.sprites.filledGaugeRed.draw(
                    new Quad(ix0, iy0, ox0, oy0, ox1, oy1, ix1, iy1),
                    1,
                    1,
                )
            }
        }
    }
}
