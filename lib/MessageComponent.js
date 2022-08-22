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

import { ReverseFormats, ReverseColors } from './static.js';

export default class MessageComponent {
    _text = '';
    _color = '';
    _extra = [];

    constructor(data = { text: '' }) {
        this._text = data.text || '';
        this._color = data.color;
        data?.extra?.forEach((extraComp) => {
            this._extra.push(new MessageComponent(extraComp));
        });

        this._data = data;
    }

    validate() {
        return $text && $color && $extra;
    }

    data() {
        return this._data;
    }

    serialized() {
        let buffer = this._color && this._color != '' ? ReverseColors[this._color] : '';

        if (this._data.bold) buffer += ReverseFormats.bold;
        if (this._data.italic) buffer += ReverseFormats.italic;
        if (this._data.underline) buffer += ReverseFormats.underline;
        if (this._data.obfuscated) buffer += ReverseFormats.obfuscated;
        if (this._data.strikethrough) buffer += ReverseFormats.strikethrough;

        buffer += this._text;

        for (let child of this._extra) {
            let serial = child.serialized();
            if (serial && serial != '') buffer += serial;
        }

        return buffer;
    }
}
