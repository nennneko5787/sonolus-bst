import { c0, c1, c2, c3, c4, c5, c6, c7 } from './constants.js'

export function getLaneX(lane: number) {
    const cx =
        lane === 0
            ? c1.x
            : lane === 1
              ? c0.x
              : lane === 2
                ? c7.x
                : lane === 3
                  ? c6.x
                  : lane === 4
                    ? c5.x
                    : lane === 5
                      ? c4.x
                      : lane === 6
                        ? c3.x
                        : lane === 7
                          ? c2.x
                          : /* fallback */ c7.x

    return cx
}

export function getLaneY(lane: number) {
    const cy =
        lane === 0
            ? c1.y
            : lane === 1
              ? c0.y
              : lane === 2
                ? c7.y
                : lane === 3
                  ? c6.y
                  : lane === 4
                    ? c5.y
                    : lane === 5
                      ? c4.y
                      : lane === 6
                        ? c3.y
                        : lane === 7
                          ? c2.y
                          : /* fallback */ c7.y

    return cy
}
