import { v1 } from './constants.js'
import { archetypes } from './index.js'

export class Initialization extends Archetype {
    preprocess() {
        const gap = 0.05
        const globalAlpha = 1
        const uiRect = new Rect({
            l: screen.l + gap,
            r: screen.r - gap,
            b: screen.b + gap,
            t: screen.t - gap,
        })

        ui.menu.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha * globalAlpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.rt
                .sub(new Vec(gap, 0))
                .sub(new Vec(0.15, 0).mul(ui.configuration.menu.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0.55, 0.15).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha * globalAlpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.rt
                .sub(new Vec(gap, 0))
                .sub(new Vec(0.15, 0).mul(ui.configuration.menu.scale))
                .sub(new Vec(0.035, 0.035).mul(ui.configuration.metric.secondary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha * globalAlpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.metric.secondary.bar.set({
            anchor: uiRect.lt,
            pivot: { x: 0, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha * globalAlpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.secondary.value.set({
            anchor: uiRect.lt.add(
                new Vec(0.715, -0.035).mul(ui.configuration.metric.primary.scale),
            ),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha * globalAlpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.combo.value.set({
            anchor: { x: v1.x - 0.2, y: v1.y + 0.08 },
            pivot: { x: 0.5, y: 0 },
            size: new Vec(0, 0.2).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })
        ui.combo.text.set({
            anchor: { x: v1.x - 0.2, y: v1.y + 0.35 },
            pivot: { x: 0.5, y: 1 },
            size: new Vec(0, 0.05).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        score.base.set({
            perfect: 1,
            great: 0.8,
            good: 0.5,
        })

        this.life.set({
            perfect: 0.4,
            great: 0.2,
            good: 0.1,
            miss: -3,
        })

        for (const archetype of Object.values(archetypes)) {
            if (!('globalPreprocess' in archetype)) continue

            archetype.globalPreprocess()
        }
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        archetypes.InputManager.spawn({})
        this.despawn = true
    }
}
