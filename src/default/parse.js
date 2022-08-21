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

const serialize = require('./serialize');
const { Colors, Formats } = require('./static');

module.exports = (text, delimiter = '§') => {
    // Serialize text to default delimiter
    text = serialize(text, delimiter);

    const result = { text: '', extra: [] };
    let section = result;
    const chars = text.split('');

    // Iterate through each character
    for (let i = 0; i < chars.length; i++) {
        // If the charecter is not a delimiter
        if (chars[i] !== '§') {
            section.text += chars[i];
            continue;
        }

        // If it is a reset token (§r)
        if (chars[i + 1] === 'r') {
            const innerObj = { text: '', extra: [] };
            result.extra.push(innerObj);
            section = innerObj;
            i++;
            continue;
        }

        const codeStr = `§${chars[i + 1]}`;
        const innerObj = { text: '', extra: [] };
        if (Colors.hasOwnProperty(codeStr)) innerObj.color = Colors[codeStr];
        if (Formats.hasOwnProperty(codeStr)) innerObj[Formats[codeStr]] = true;
        section.extra.push(innerObj);
        section = innerObj;
        i++;
    }

    return result;
};
