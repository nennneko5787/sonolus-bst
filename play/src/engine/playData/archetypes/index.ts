import { Initialization } from './Initialization.js'
import { InputManager } from './InputManager.js'
import { LongNote } from './LongNote.js'
import { Note } from './Note.js'
import { RippleNote } from './RippleNote.js'
import { SlashNote } from './SlashNote.js'
import { Stage } from './Stage.js'

export const archetypes = defineArchetypes({
    Initialization,
    Stage,
    Note,
    LongNote,
    SlashNote,
    InputManager,
    RippleNote,
})
