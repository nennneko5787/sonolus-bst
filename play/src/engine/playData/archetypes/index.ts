import { Initialization } from './Initialization.js'
import { InputManager } from './InputManager.js'
import { LongNote } from './notes/LongNote.js'
import { Note } from './notes/Note.js'
import { RippleNote } from './notes/RippleNote.js'
import { SlashNote } from './notes/SlashNote.js'
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
