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

import ComponentSerializer from './ComponentSerializer.js';
import _stripSymbols, { strip as _strip } from './stripSymbols.js';

/**
 * The ComponentParser to parse modify render and create minecraft components
 */
export default class ComponentParser {
    $delimiters = [];

    /**
     * The ComponentParser to parse modify render and create minecraft components
     * @param { Array<String> } delimiters
     *   - The delimiters by which the Parser should work ( default: ['§', '&'] )
     */
    constructor(delimiters = ['§', '&']) {
        this.$delimiters = delimiters;
    }

    /**
     * Returns a new instance of a component serializer for a given text
     * @param { String } text
     *   - A text like '§7[§aPREFIX§7] §7My Awesome Text'
     */
    serializer(text) {
        return new ComponentSerializer(text, this);
    }

    /**
     * Returns the delimiters for formats used in the parser
     * @return { Array<String> } an array of the used delimiters in this parser
     */
    delimiters() {
        return this.$delimiters;
    }

    /**
     * removes all color characters in a string
     * @param { String } text
     *   - A text like '§7[§aPREFIX§7] §7My Awesome Text'
     */
    stripSymbols(text) {
        return _stripSymbols(this, text);
    }

    /**
     * removes all color characters in a string
     * @param { String } text
     *   - A text like '§7[§aPREFIX§7] §7My Awesome Text'
     */
    stripFormat(text) {
        return _stripSymbols(this, text);
    }

    /**
     * removes all color characters in a string by a given delimiter
     * @param { String } text
     *   - A text like '§7[§aPREFIX§7] §7My Awesome Text'
     * @param { String } delimiter
     *   - The delimiter ( default: '§' )
     */
    strip(text, delimiter = '§') {
        return _strip(text, delimiter);
    }
}
