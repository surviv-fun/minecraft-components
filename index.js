/**
 * Copyright (c) LuciferMorningstarDev <contact@lucifer-morningstar.dev>
 * Copyright (c) surviv.fun <contact@surviv.fun>
 * Copyright (C) surviv.fun team and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

'use strict'; // https://www.w3schools.com/js/js_strict.asp

import CP from './lib/ComponentParser.js';
import CS from './lib/ComponentSerializer.js';
import { strip as s, stripSymbols as sS } from './lib/stripSymbols.js';
import { Colors as c, Formats as f, Classes as cl, CharSizes as cs } from './lib/static.js';

(async () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefinded') {
        const sheet = await import('./css/components.min.css', {
            assert: { type: 'css' }
        });

        if (!document.adoptedStyleSheets) {
            document.adoptedStyleSheets = [sheet.default];
        } else document.adoptedStyleSheets.push(sheet.default);
    }
})();

/**
 * Copyright (c) 2022 LuciferMorningstarDev <contact@lucifer-morningstar.dev>
 * <br />
 * Copyright (c) 2022 surviv.fun <contact@surviv.fun>
 * <br />
 * Github:    https://github.com/surviv-fun/minecraft-components
 * <br />
 * Website:   https://github.com/surviv-fun/minecraft-components/#readme
 * <br />
 * Issues:    https://github.com/surviv-fun/minecraft-components/issues
 */
export default () => false;

export const ComponentSerializer = CS;
export const ComponentParser = CP;

export const strip = s;
export const stripSymbols = sS;
export const stripFormat = sS;

export const Colors = c;
export const Formats = f;
export const Classes = cl;
export const CharSizes = cs;
