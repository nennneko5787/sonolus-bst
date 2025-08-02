import { EngineArchetypeDataName, EngineArchetypeName, LevelData } from '@sonolus/core'

export const data: LevelData = {
    bgmOffset: 0,
    entities: [
        {
            archetype: 'Initialization',
            data: [],
        },
        {
            archetype: 'Stage',
            data: [],
        },
        {
            archetype: EngineArchetypeName.BpmChange,
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 0,
                },
                {
                    name: EngineArchetypeDataName.Bpm,
                    value: 120,
                },
            ],
        },
        {
            archetype: 'Note',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 2,
                },
                {
                    name: 'lane',
                    value: 0,
                },
            ],
        },
        {
            archetype: 'Note',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 3,
                },
                {
                    name: 'lane',
                    value: 1,
                },
            ],
        },
        {
            archetype: 'Note',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 4,
                },
                {
                    name: 'lane',
                    value: 2,
                },
            ],
        },
        {
            archetype: 'Note',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 5,
                },
                {
                    name: 'lane',
                    value: 3,
                },
            ],
        },
        {
            archetype: 'Note',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 6,
                },
                {
                    name: 'lane',
                    value: 4,
                },
            ],
        },
        {
            archetype: 'Note',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 7,
                },
                {
                    name: 'lane',
                    value: 5,
                },
            ],
        },
        {
            archetype: 'Note',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 8,
                },
                {
                    name: 'lane',
                    value: 6,
                },
            ],
        },
        {
            archetype: 'Note',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 9,
                },
                {
                    name: 'lane',
                    value: 7,
                },
            ],
        },
        {
            archetype: 'LongNote',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 10,
                },
                {
                    name: 'lane',
                    value: 0,
                },
                {
                    name: 'length',
                    value: 2,
                },
            ],
        },
        {
            archetype: 'SlashNote',
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: 13,
                },
                {
                    name: 'lane',
                    value: 1,
                },
            ],
        },
    ],
}
