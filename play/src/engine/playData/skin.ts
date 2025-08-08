import { SkinSpriteName } from '@sonolus/core'

export const skin = defineSkin({
    sprites: {
        judgeLine: SkinSpriteName.JudgmentLine,
        baseCycle: 'baseCycle',
        notePink: 'notePink',
        noteFallback: SkinSpriteName.NoteHeadPurple,
        longNoteFallback: SkinSpriteName.NoteHeadPurple,
        longNoteTailFallback: SkinSpriteName.NoteTailPurple,
        slashNoteFallback: SkinSpriteName.NoteHeadGreen,
        rippleNoteGuideFallback: SkinSpriteName.NoteSlot,
        rippleNoteFallback: SkinSpriteName.NoteHeadNeutral,
        gauge: SkinSpriteName.GridNeutral,
        filledGaugeCyan: SkinSpriteName.GridCyan,
        filledGaugeRed: SkinSpriteName.GridRed,
    },
})
