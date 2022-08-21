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

const parse = require('./parse');

const { Classes } = require('./static');

const wrap = (tag, content) => {
    return `<${tag}>${content}</${tag.split(' ')[0]}>`;
};

const renderComponent = (jsonPart) => {
    let classlist = '';
    let text = '';

    // Iterate through each key in the object
    for (const key of Object.keys(jsonPart)) {
        // If its just text
        if (key === 'text') {
            text += jsonPart.text;
            continue;
        }

        // If theres a class to add
        if (Classes.hasOwnProperty(key)) {
            classlist += ' mc-' + Classes[key];
            continue;
        }

        // If theres a color to add
        if (key === 'color') {
            classlist += ' mc-' + jsonPart[key];
            continue;
        }

        // Default add class
        if (key === 'extra') {
            for (const jsonPartExtra of jsonPart.extra) {
                text += renderComponent(jsonPartExtra);
            }
        }
    }

    // Check classlist for exceptions
    classlist = classlist.replace(/dark_acqua/gm, 'dark_aqua');

    // Wrap in the appropriate span tags
    return wrap(`span${classlist.trim() !== '' ? ` class="${classlist.trim()}"` : ''}`, text);
};

module.exports = (input, delimiter = '§') => {
    // Parse text to JSON
    let json = parse(input, delimiter);

    // Replace newlines with <BR/> tags
    json = JSON.parse(JSON.stringify(json).split('\\n').join('<br>'));

    // Wrap result with wrapper
    return wrap('span class="mc"', renderComponent(json));
};
