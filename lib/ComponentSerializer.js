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
import MessageComponent from './MessageComponent.js';

import { stripSymbols } from './stripSymbols.js';
import { Colors, Formats, Classes } from './static.js';

const _serialize = (text, delimiter = '§') => text.replace(new RegExp(`\\${delimiter}([a-f]|[k-o]|[0-9]|r)`, 'gm'), '§$1');

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

    // Wrap in the appropriate span tags
    return wrap(`span${classlist.trim() !== '' ? ` class="${classlist.trim()}"` : ''}`, text);
};

export default class ComponentSerializer {
    constructor(text = '&cNo Text was specified', parser = new ComponentParser()) {
        this._text = text;
        this._parser = parser;
        this._serialized = text;
        for (let del of parser.delimiters()) {
            this._serialized = _serialize(text, del);
        }
        this._plain = stripSymbols(this._parser, this._text);
    }

    plain() {
        return this._plain;
    }

    json() {
        return JSON.stringify(this.toJsonObject());
    }

    serialized() {
        return this._serialized;
    }

    html() {
        // Parse text to JSON
        let json = this.toJsonObject();
        // Replace newlines with <BR/> tags
        json = JSON.parse(JSON.stringify(json).split('\\n').join('<br>'));
        // Wrap result with wrapper
        return wrap('span class="mc"', renderComponent(json));
    }

    toHtmlEntity() {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            throw new Error('Cannot get a window and/or document object');
        }

        let container = document.createElement('div');
        container.innerHTML = this.html();
        return container;
    }

    toJsonObject() {
        const result = { text: '', extra: [] };
        let section = result;
        const chars = this._serialized.split('');
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
    }

    component() {
        return new MessageComponent(this.toJsonObject());
    }

    static fromJsonData(data) {
        return new ComponentSerializer(new MessageComponent(data).serialized());
    }
}
