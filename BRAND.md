# Brand guide

The guest houses belong to the Zenith Medical & Kidney Centre, so the site wears the ZMKC brand: the colours come straight from the ZMKC logo. It should feel fresh, warm and welcoming, like a place you'd want to rest, with the hospital's care close by.

## Colour

Taken from the logo's green globe, lime highlight and red lettering. Tokens live in `src/styles/index.css`; components only use token names.

| Token         | Hex       | Use                                              |
| ------------- | --------- | ------------------------------------------------ |
| `page`        | `#F4F8F1` | Background, a soft green-white                   |
| `paper`       | `#FFFFFF` | Cards, the search bar, panels                    |
| `ink`         | `#0F2A1C` | Text                                             |
| `muted`       | `#4E6357` | Supporting text                                  |
| `brand`       | `#00783C` | ZMKC green: buttons, links, selected states      |
| `deep`        | `#0B3B26` | Dark bands, the hero's fade, the footer          |
| `on-deep`     | `#E3F0C4` | Text on deep green                               |
| `lime`        | `#C8DC1E` | The logo's lime: prices, badges, highlights      |
| `alert`       | `#D7141B` | The logo's red, kept for warnings only           |

Contrast: white on `brand` 5.6, `brand` on `page` 5.2, `muted` on `page` 6.0, `ink` on `lime` 10.0, `lime` on `deep` 8.2, white on `deep` 12.6. All pass WCAG AA.

## Type

Self-hosted from Fontshare (free for commercial use):

- **Clash Display** for headlines, room names and prices.
- **Satoshi** for the interface and body text.
- Nothing smaller than 12px.

## Patterns

- **Hero:** a full-screen photo fading into deep green, a huge headline and the search bar on top.
- **Areas:** Gudu, Apo road and Guzape each have a page listing every room across their houses.
- **Room cards:** each room has its own swipeable photos, a lime price tag and a free/occupied label. Opening a room shows a large gallery, its features and the price for the dates.
- **Rooms** are named the way reception names them (Single 1, Deluxe 2, VIP; Guest House 7 names every room).
- **Distance** is always stated as walking or driving minutes to the centre.
