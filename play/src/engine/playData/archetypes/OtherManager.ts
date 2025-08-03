export const other = levelMemory({ grooveGauge: Number, notes: Number })

export function updateGrooveGauge(judgment: Judgment) {
    switch (judgment) {
        case 0:
            other.grooveGauge -= 3
            break
        case 1:
            other.grooveGauge += 338.8 / other.notes
            break
        case 2:
            other.grooveGauge += 169.4 / other.notes
            break
        case 3:
            other.grooveGauge += 84.7 / other.notes
            break
    }

    if (other.grooveGauge <= 0) {
        other.grooveGauge = 0
    }

    if (other.grooveGauge >= 100) {
        other.grooveGauge = 100
    }
}
