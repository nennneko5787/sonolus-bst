import { holdWindows, sizes, windows } from '../../../../../../shared/src/engine/constants.js'
import { getLaneX, getLaneY } from '../../../../../../shared/src/engine/utils.js'
import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { isUsed, markAsUsed } from '../InputManager.js'
import { updateGrooveGauge } from '../OtherManager.js'
import { Note } from './Note.js'

export class SlashNote extends Note {
    activatedTouchId = this.entityMemory(TouchId)
    flicked = this.entityMemory(Boolean)
    waitingRelease = this.entityMemory(Boolean)
    pressTime = this.entityMemory(Number)
    sprite = skin.sprites.slashNoteFallback

    judgeHold(d: number): Judgment {
        return d <= holdWindows.perfect.max
            ? Judgment.Perfect
            : d <= holdWindows.great.max
              ? Judgment.Great
              : d <= holdWindows.good.max
                ? Judgment.Good
                : Judgment.Miss
    }

    complete(touch: Touch) {
        const holdLength = touch.time - this.pressTime
        const timeJudge = input.judge(this.pressTime, this.targetTime, windows)
        const holdJudge = this.judgeHold(holdLength)

        this.result.judgment = Math.max(timeJudge, holdJudge)

        this.result.bucket.index = buckets.slashNote.index
        this.result.bucket.value = timeJudge

        this.result.accuracy = timeJudge

        particle.effects.note.spawn(this.effectHitbox, 0.3, false)

        updateGrooveGauge(this.result.judgment)

        this.despawn = true
    }

    fineComplete() {
        this.result.judgment = input.judge(this.targetTime - 199, this.targetTime, windows)
        this.result.accuracy = this.targetTime - 199 - this.targetTime

        this.result.bucket.index = buckets.slashNote.index
        this.result.bucket.value = this.result.accuracy * 1000

        particle.effects.note.spawn(this.effectHitbox, 0.3, false)

        updateGrooveGauge(this.result.judgment)

        this.despawn = true
    }

    inComplete() {
        this.despawn = true
    }

    touchComplete() {
        for (const touch of touches) {
            if (!this.hitbox.contains(touch.position)) continue
            if (isUsed(touch)) continue
            markAsUsed(touch)

            const d = touch.position.sub(touch.startPosition).length
            if (d >= 0.04) {
                this.flicked = true
                this.waitingRelease = true
                this.activatedTouchId = touch.id
            } else {
                this.fineComplete()
            }
            return
        }
    }

    checkRelease() {
        if (!this.waitingRelease) return

        // 対象指を探す
        for (const touch of touches) {
            if (touch.id !== this.activatedTouchId) continue

            if (touch.ended) {
                this.complete(touch)
                this.waitingRelease = false
                return
            }
            return
        }

        if (time.now > this.inputTime.max) {
            this.inComplete()
            this.waitingRelease = false
        }
    }

    judgement() {
        for (const touch of touches) {
            if (!this.hitbox.contains(touch.position)) continue
            if (isUsed(touch)) continue
            markAsUsed(touch)

            if (touch.ended) {
                this.complete(touch)
            } else {
                this.inComplete()
            }
            return
        }
    }

    touchActivate() {
        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue

            if (isUsed(touch)) continue
            markAsUsed(touch)

            this.activatedTouchId = touch.id
            this.pressTime = touch.startTime
            return
        }
    }

    touch() {
        if (time.now < this.inputTime.min) return

        if (this.waitingRelease) {
            this.checkRelease()
            return
        }

        if (!this.activatedTouchId) {
            this.touchActivate()
            return
        }

        this.touchComplete()
    }

    updateSequential() {
        if (time.now > this.targetTime + windows.good.max) {
            if (!this.waitingRelease && !this.flicked) {
                updateGrooveGauge(Judgment.Miss)
                this.despawn = true
            }
        }
    }

    updateParallel() {
        if (this.despawn) return

        const sprite = skin.sprites.slashNoteFallback

        const t = time.now
        const travelStart = this.visualTime.min
        const travelDuration = this.visualTime.max - this.visualTime.min
        const travelEnd = this.visualTime.max
        const holdDuration = this.visualTime.max - this.visualTime.min
        const r = sizes.note
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
            const effectHitbox = Rect.one.mul(sizes.effectSize).translate(x, y)

            this.effectHitbox.copyFrom(effectHitbox)
            this.hitbox.copyFrom(hitLayout)
            sprite.draw(layout, this.z, 1)
            return
        }

        if (t < travelEnd + holdDuration) {
            const layout = Rect.one.mul(r).translate(cx, cy)
            const hitLayout = Rect.one.mul(r * 5).translate(cx, cy)
            const effectHitbox = Rect.one.mul(sizes.effectSize).translate(cx, cy)

            this.effectHitbox.copyFrom(effectHitbox)
            this.hitbox.copyFrom(hitLayout)
            sprite.draw(layout, this.z, 1)
            return
        }
    }
}
