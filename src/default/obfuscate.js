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

const { CharSizes } = require('./static');

module.exports = (text = '') => {
    const obfuscated = [];

    // Iterate through each character
    text.split('').map((char) => {
        // Scramble wide characters
        if (CharSizes.WIDE.indexOf(char) > -1) return obfuscated.push(CharSizes.WIDE[Math.floor(Math.random() * CharSizes.WIDE.length)]);
        // Scramble medium characters
        if (CharSizes.MID.indexOf(char) > -1) return obfuscated.push(CharSizes.MID[Math.floor(Math.random() * CharSizes.MID.length)]);
        // Scramble thin characters
        if (CharSizes.THIN.indexOf(char) > -1) return obfuscated.push(CharSizes.THIN[Math.floor(Math.random() * CharSizes.THIN.length)]);
        // If char wasn't matched
        obfuscated.push(char);
    });

    // Return result
    return obfuscated.join('');
};
