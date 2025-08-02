import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../configuration/options.js'
import { buckets } from '../buckets.js'
import { particle } from '../particle.js'
import { skin } from '../skin.js'
import { bucketWindows, c0, c1, c2, c3, c4, c5, c6, c7, note, windows } from './constants.js'

export class LongNote extends Archetype {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        length: { name: 'length', type: Number },
    })

    targetTime = this.entityMemory(Number)
    spawnTime = this.entityMemory(Number)
    visualTime = this.entityMemory(Range)
    z = this.entityMemory(Number)
    inputTime = this.entityMemory(Range)
    touchOrder = 1
    hasInput = true
    hitbox = this.entityMemory(Rect)

    tailTime = this.entityMemory(Number)
    tailVisualTime = this.entityMemory(Range)
    spawnTailTime = this.entityMemory(Number)
    hitTime = this.entityMemory(Number)
    played = this.entityMemory(Boolean)

    initialize() {
        this.z = 1000 - this.targetTime
        this.result.accuracy = windows.good.max
        this.played = false
    }

    preprocess() {
        this.inputTime.copyFrom(windows.good.add(this.targetTime).add(input.offset))
        this.targetTime = bpmChanges.at(this.import.beat).time

        const lengthFactor = 1 / options.noteSpeed

        this.visualTime.copyFrom(
            Range.l.mul(lengthFactor).add(timeScaleChanges.at(this.targetTime).scaledTime),
        )
        this.spawnTime = this.visualTime.min

        const tailBeat = this.import.beat + this.import.length
        this.tailTime = bpmChanges.at(tailBeat).time

        this.tailVisualTime.copyFrom(
            Range.l.mul(lengthFactor).add(timeScaleChanges.at(this.tailTime).scaledTime),
        )

        this.spawnTailTime = this.tailVisualTime.min
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }
    shouldSpawn() {
        return time.now >= this.spawnTime
    }
    globalPreprocess() {
        buckets.note.set(bucketWindows)
    }

    touch() {
        for (const touch of touches) {
            if (this.played) return
            if (this.despawn) return
            if (time.now < this.inputTime.min) return
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue
            this.played = true
            this.hitTime = time.now
            particle.effects.note.spawn(this.hitbox, 0.3, false)
            return
        }
    }

    completeHold(hitTime: number) {
        this.result.judgment = input.judge(hitTime, this.targetTime, windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = buckets.note.index
        this.result.bucket.value = this.result.accuracy * 1000

        if (hitTime >= 0) particle.effects.note.spawn(this.hitbox, 0.3, false)

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

        if (time.now > this.tailVisualTime.max) {
            this.completeHold(-1000)
        }
    }
    updateParallel() {
        if (this.despawn) return

        const t = time.now
        const holdDuration = 0.2
        const r = note.radius
        const lane = this.import.lane
        const cx =
            lane === 0
                ? c0.x
                : lane === 1
                  ? c1.x
                  : lane === 2
                    ? c2.x
                    : lane === 3
                      ? c3.x
                      : lane === 4
                        ? c4.x
                        : lane === 5
                          ? c5.x
                          : lane === 6
                            ? c6.x
                            : c7.x

        const cy =
            lane === 0
                ? c0.y
                : lane === 1
                  ? c1.y
                  : lane === 2
                    ? c2.y
                    : lane === 3
                      ? c3.y
                      : lane === 4
                        ? c4.y
                        : lane === 5
                          ? c5.y
                          : lane === 6
                            ? c6.y
                            : c7.y

        const len = Math.hypot(cx, cy)
        const vx = cx / len
        const vy = cy / len
        const sd = 1.2
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

            skin.sprites.judgeLine.draw(
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
            skin.sprites.judgeLine.draw(
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
            this.hitbox.copyFrom(Rect.one.mul(r * 3).translate(headX, headY))
            return
        }

        if (t < hEnd + holdDuration) {
            skin.sprites.longNote.draw(Rect.one.mul(r).translate(cx, cy), this.z, 1)
            this.hitbox.copyFrom(Rect.one.mul(r * 2.5).translate(cx, cy))
            return
        }

        this.despawn = true
    }
}
