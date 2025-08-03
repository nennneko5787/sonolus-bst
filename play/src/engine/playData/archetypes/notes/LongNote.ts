import { EngineArchetypeDataName } from '@sonolus/core'
import { sizes, windows } from '../../../../../../shared/src/engine/constants.js'
import { getLaneX, getLaneY } from '../../../../../../shared/src/engine/utils.js'
import { options } from '../../../configuration/options.js'
import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { updateGrooveGauge } from '../OtherManager.js'
import { Note } from './Note.js'

export class LongNote extends Note {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        length: { name: 'length', type: Number },
    })

    tailTime = this.entityMemory(Number)
    tailVisualTime = this.entityMemory(Range)
    spawnTailTime = this.entityMemory(Number)
    hitTime = this.entityMemory(Number)
    played = this.entityMemory(Boolean)
    spawnOffset = this.entityMemory(Number)
    holdingTouches = this.entityMemory(Number)

    initialize() {
        super.initialize()
        this.played = false
    }

    preprocess() {
        super.preprocess()

        const lengthFactor = 1 / options.noteSpeed

        const tailBeat = this.import.beat + this.import.length
        this.tailTime = bpmChanges.at(tailBeat).time

        this.tailVisualTime.copyFrom(
            Range.l.mul(lengthFactor).add(timeScaleChanges.at(this.tailTime).scaledTime),
        )

        this.spawnTailTime = this.tailVisualTime.min - 2000

        const LEAD_TIME = 0
        this.spawnOffset = 1.2 + LEAD_TIME / options.noteSpeed
    }

    touch() {
        this.holdingTouches = 0
        for (const touch of touches) {
            if (this.played) {
                if (this.hitbox.contains(touch.position)) {
                    this.holdingTouches += 1
                }
            }
            if (this.despawn) return
            if (time.now < this.inputTime.min) return
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            this.played = true
            this.hitTime = time.now
            particle.effects.note.spawn(this.hitbox, 0.3, false)
            return
        }
        if (this.played && this.holdingTouches <= 0) {
            this.despawn = true
        }
    }

    completeHold(hitTime: number) {
        this.result.judgment = input.judge(hitTime, this.targetTime, windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = buckets.longNote.index
        this.result.bucket.value = this.result.accuracy * 1000

        if (hitTime >= 0) {
            particle.effects.note.spawn(this.hitbox, 0.3, false)

            updateGrooveGauge(this.result.judgment)
        }

        this.despawn = true
    }

    updateSequential() {
        if (time.now < 0) return
        if (this.played) {
            if (time.now >= this.tailTime) {
                this.completeHold(this.hitTime)
            }
            return
        }

        super.updateSequential()
    }

    updateParallel() {
        if (this.despawn) return

        const t = time.now
        const holdDuration = this.visualTime.max - this.visualTime.min
        const r = sizes.note
        const lane = this.import.lane
        const cx = getLaneX(lane)
        const cy = getLaneY(lane)

        const len = Math.hypot(cx, cy)
        const vx = cx / len
        const vy = cy / len
        const sd = this.spawnOffset
        const sx = vx * sd
        const sy = vy * sd

        const perpX = -vy * r
        const perpY = vx * r

        const tx = sx
        const ty = sy

        // === ホールド中の描画 ===
        if (this.played) {
            const tailStart = this.tailVisualTime.min
            const tailEnd = this.tailVisualTime.max
            const tailDur = tailEnd - tailStart
            const pTail = Math.clamp((tailEnd - t) / tailDur, 0, 1)

            const tailX = sx * pTail + cx * (1 - pTail)
            const tailY = sy * pTail + cy * (1 - pTail)

            skin.sprites.longNoteTail.draw(
                new Quad({
                    x1: tailX + perpX,
                    y1: tailY + perpY,
                    x2: cx + perpX,
                    y2: cy + perpY,
                    x3: cx - perpX,
                    y3: cy - perpY,
                    x4: tailX - perpX,
                    y4: tailY - perpY,
                }),
                this.z,
                1,
            )

            skin.sprites.longNote.draw(Rect.one.mul(r).translate(cx, cy), this.z, 1)
            skin.sprites.longNote.draw(Rect.one.mul(r).translate(tailX, tailY), this.z, 1)
            this.hitbox.copyFrom(Rect.one.mul(r * 3).translate(cx, cy))
            return
        }

        // === 押されていない時の描画 ===
        const hStart = this.visualTime.min
        const hEnd = this.visualTime.max
        const hDur = hEnd - hStart
        const pH = (t - hStart) / hDur

        const headX = sx * (1 - pH) + cx * pH
        const headY = sy * (1 - pH) + cy * pH

        if (t < hEnd) {
            skin.sprites.longNoteTail.draw(
                new Quad({
                    x1: tx + perpX,
                    y1: ty + perpY,
                    x2: headX + perpX,
                    y2: headY + perpY,
                    x3: headX - perpX,
                    y3: headY - perpY,
                    x4: tx - perpX,
                    y4: ty - perpY,
                }),
                this.z,
                1,
            )

            skin.sprites.longNote.draw(Rect.one.mul(r).translate(headX, headY), this.z, 1)
            skin.sprites.longNote.draw(Rect.one.mul(r).translate(tx, ty), this.z, 1)
            this.hitbox.copyFrom(Rect.one.mul(r * 5).translate(headX, headY))
            this.effectHitbox.copyFrom(Rect.one.mul(sizes.effectSize).translate(headX, headY))
            return
        }

        if (t < hEnd + holdDuration) {
            skin.sprites.longNote.draw(Rect.one.mul(r).translate(cx, cy), this.z, 1)
            this.hitbox.copyFrom(Rect.one.mul(r * 5).translate(cx, cy))
            this.effectHitbox.copyFrom(Rect.one.mul(sizes.effectSize).translate(cx, cy))
            return
        }
    }
}
