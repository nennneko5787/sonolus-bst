import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../configuration/options.js'
import { buckets } from '../buckets.js'
import { particle } from '../particle.js'
import { skin } from '../skin.js'
import { isUsed, markAsUsed } from './InputManager.js'
import { bucketWindows, c0, c1, c2, c3, c4, c5, c6, c7, note, windows } from './constants.js'

export class Note extends Archetype {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
    })

    targetTime = this.entityMemory(Number)
    spawnTime = this.entityMemory(Number)
    visualTime = this.entityMemory(Range)
    z = this.entityMemory(Number)
    inputTime = this.entityMemory(Range)
    touchOrder = 1
    hasInput = true
    hitbox = this.entityMemory(Rect)

    initialize() {
        this.z = 1000 - this.targetTime
        this.result.accuracy = windows.good.max
    }

    preprocess() {
        this.inputTime.copyFrom(windows.good.add(this.targetTime).add(input.offset))
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.copyFrom(
            Range.l.mul(1 / options.noteSpeed).add(timeScaleChanges.at(this.targetTime).scaledTime),
        )
        this.spawnTime = this.visualTime.min
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
            if (!touch.started) continue
            if (time.now < this.inputTime.min) return

            if (!this.hitbox.contains(touch.position)) continue

            if (isUsed(touch)) continue
            markAsUsed(touch)

            this.result.judgment = input.judge(touch.startTime, this.targetTime, windows)
            this.result.accuracy = touch.startTime - this.targetTime

            this.result.bucket.index = buckets.note.index
            this.result.bucket.value = this.result.accuracy * 1000

            particle.effects.note.spawn(this.hitbox, 0.3, false)

            this.despawn = true
            return
        }
    }

    updateParallel() {
        if (this.despawn) return

        const t = time.now
        const travelStart = this.visualTime.min
        const travelDuration = this.visualTime.max - this.visualTime.min
        const travelEnd = this.visualTime.max
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

        if (t < travelStart + travelDuration) {
            const ny = (t - travelStart) / travelDuration

            const len = Math.hypot(cx, cy)
            const dirX = cx / len
            const dirY = cy / len
            const spawnDist = 1.2
            const startX = dirX * spawnDist
            const startY = dirY * spawnDist

            const x = startX * (1 - ny) + cx * ny
            const y = startY * (1 - ny) + cy * ny

            const layout = Rect.one.mul(r).translate(x, y)
            const hitLayout = Rect.one.mul(r * 3).translate(x, y)

            this.hitbox.copyFrom(hitLayout)
            skin.sprites.note.draw(layout, this.z, 1)
            return
        }

        if (t < travelEnd + holdDuration) {
            const layout = Rect.one.mul(r).translate(cx, cy)
            const hitLayout = Rect.one.mul(r * 3).translate(cx, cy)

            this.hitbox.copyFrom(hitLayout)
            skin.sprites.note.draw(layout, this.z, 1)
            return
        }

        this.despawn = true
    }
}
