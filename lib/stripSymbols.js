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

import ComponentParser from './ComponentParser.js';

/**
 * removes all color characters in a string by a given delimiter
 * @param { String } text
 *   - A text like '§7[§aPREFIX§7] §7My Awesome Text'
 * @param { String } delimiter
 *   - The delimiter ( default: '§' )
 */
const _removeAllSymbols = (text, delimiter = '§') => text.replace(new RegExp(`\\${delimiter}([a-f]|[k-o]|[0-9]|r)`, 'gm'), '');

/**
 * Strip all Symbols from a colored string by a given parser and text
 * @param { ComponentParser } parser
 *   - A instance of the component parser
 * @param { String } text
 *   - A text like '§7[§aPREFIX§7] §7My Awesome Text'
 */
const _stripSymbols = (parser, text) => {
    for (const delimiter of parser.delimiters()) text = _removeAllSymbols(text, delimiter);
    return text;
};

export default _stripSymbols;
export const stripSymbols = _stripSymbols;
export const strip = _removeAllSymbols;
