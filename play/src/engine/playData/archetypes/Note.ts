import { EngineArchetypeDataName } from '@sonolus/core'
import { bucketWindows, note, windows } from '../../../../../shared/src/engine/constants.js'
import { getLaneX, getLaneY } from '../../../../../shared/src/engine/utils.js'
import { options } from '../../configuration/options.js'
import { buckets } from '../buckets.js'
import { particle } from '../particle.js'
import { skin } from '../skin.js'
import { isUsed, markAsUsed } from './InputManager.js'
import { other, updateGrooveGauge } from './OtherManager.js'

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
    sprite = skin.sprites.note

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
        this.spawnTime = this.visualTime.min - 2000

        other.notes += 1
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

            updateGrooveGauge(this.result.judgment)

            this.despawn = true
            return
        }
    }

    updateSequential() {
        if (time.now > this.targetTime + windows.good.max) {
            updateGrooveGauge(Judgment.Miss)
            this.despawn = true
        }
    }

    updateParallel() {
        if (this.despawn) return

        const t = time.now
        const travelStart = this.visualTime.min
        const travelDuration = this.visualTime.max - this.visualTime.min
        const travelEnd = this.visualTime.max
        const holdDuration = this.visualTime.max - this.visualTime.min
        const r = note.radius
        const lane = this.import.lane
        const cx = getLaneX(lane)
        const cy = getLaneY(lane)

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
            const hitLayout = Rect.one.mul(r * 5).translate(x, y)

            this.hitbox.copyFrom(hitLayout)
            this.sprite.draw(layout, this.z, 1)
            return
        }

        if (t < travelEnd + holdDuration) {
            const layout = Rect.one.mul(r).translate(cx, cy)
            const hitLayout = Rect.one.mul(r * 5).translate(cx, cy)

            this.hitbox.copyFrom(hitLayout)
            this.sprite.draw(layout, this.z, 1)
            return
        }
    }
}
