import { EngineConfigurationOption, Text } from '@sonolus/core'

export const optionsDefinition = {
    speed: {
        name: Text.Speed,
        standard: true,
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        unit: Text.PercentageUnit,
    },
    noteSpeed: {
        name: Text.NoteSpeed,
        standard: true,
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.1,
    },
} satisfies Record<string, EngineConfigurationOption>
