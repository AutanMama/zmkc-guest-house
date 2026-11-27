# Brand guide

The guest houses should feel like a calm garden residence, not a hospital ward: somewhere a tired family can rest between appointments, with the centre close by.

## Colour

Tokens live in `src/styles/index.css`. Components only use token names.

| Token          | Hex       | Use                                         |
| -------------- | --------- | ------------------------------------------- |
| `page`         | `#F4F5F2` | Background                                  |
| `paper`        | `#FFFFFF` | Cards, panels                               |
| `ink`          | `#17201B` | Text                                        |
| `muted`        | `#5B655F` | Supporting text                             |
| `garden`       | `#1F4A3A` | Primary buttons, links, selected rooms      |
| `garden-deep`  | `#16352A` | Dark bands, footer                          |
| `sage`         | `#C9D8CF` | Text on dark green, soft fills              |
| `brass`        | `#8A6420` | Eyebrows and numbers on light               |
| `brass-light`  | `#D9B26B` | Accent on dark green, the logo's sun        |

Contrast: white on `garden` 10.0, `garden` on `page` 9.1, `brass` on white 5.4, `muted` on `page` 5.5, `brass-light` on `garden-deep` 6.7, `ink` on `brass-light` 8.4. All pass WCAG AA.

## Type

- **Newsreader** (serif) for headings, room names and prices: warm and hospitable.
- **Hanken Grotesk** for the interface and body text.
- Nothing smaller than 12px.

## Patterns

- **Mark:** a roof over a door, with a brass arc for the morning sun.
- **Rooms** are named the way reception names them (Single 1, Deluxe 2, VIP; Guest House 7 names every room) and shown by apartment or building.
- **Distance** is always stated as walking or driving minutes to the centre.
- **Photography** of rooms and gardens carries the warmth; the interface stays quiet around it.
