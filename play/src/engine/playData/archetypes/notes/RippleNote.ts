import { sizes } from '../../../../../../shared/src/engine/constants.js'
import { skin } from '../../skin.js'
import { Note } from './Note.js'

export class RippleNote extends Note {
    preprocess() {
        super.preprocess()

        this.visualTime.copyFrom(
            Range.l.mul(1).add(timeScaleChanges.at(this.targetTime).scaledTime),
        )
        this.spawnTime = this.visualTime.min - 2000
    }

    updateParallel() {
        if (this.despawn) return

        const t = time.now
        const travelStart = this.visualTime.min

        if (t < travelStart) return

        const duration = this.targetTime - travelStart
        let size = duration > 0 ? (t - travelStart) / duration : 1
        size = Math.min(Math.max(size, 0), 1)

        const r = sizes.rippleNote
        const lane = this.import.lane
        const cx =
            lane === 0
                ? -1.25
                : lane === 1
                  ? -0.75
                  : lane === 2
                    ? 0.75
                    : lane === 3
                      ? 1.25
                      : lane === 4
                        ? 0.75
                        : lane === 5
                          ? -0.75
                          : 0

        const cy =
            lane === 0
                ? 0
                : lane === 1
                  ? 0.75
                  : lane === 2
                    ? 0.75
                    : lane === 3
                      ? 0
                      : lane === 4
                        ? -0.75
                        : lane === 5
                          ? -0.75
                          : 0

        const normalLayout = Rect.one
            .mul(r * 2.5)
            .scale(1, -1)
            .translate(cx, cy)
        const layout = Rect.one
            .mul(r * 2.5 * (2 - size))
            .scale(1, -1)
            .translate(cx, cy)
        const hitLayout = Rect.one.mul(r * 2.5 * 5).translate(cx, cy)
        const effectHitbox = Rect.one.mul(r * 5).translate(cx, cy)

        this.hitbox.copyFrom(hitLayout)
        this.effectHitbox.copyFrom(effectHitbox)
        skin.sprites.rippleNote.draw(layout, this.z, 0.4)
        skin.sprites.rippleNote.draw(normalLayout, this.z, size)
    }
}
