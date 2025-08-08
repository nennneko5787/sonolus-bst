import { Text } from '@sonolus/core'
import { skin } from './skin'

export const buckets = defineBuckets({
    note: {
        sprites: [
            {
                id: skin.sprites.noteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    longNote: {
        sprites: [
            {
                id: skin.sprites.longNoteFallback.id,
                x: -1,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
            {
                id: skin.sprites.longNoteTailFallback.id,
                x: 1,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    slashNote: {
        sprites: [
            {
                id: skin.sprites.slashNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    rippleNote: {
        sprites: [
            {
                id: skin.sprites.rippleNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: 0,
            },
        ],
        unit: Text.MillisecondUnit,
    },
})
