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

import { ReverseFormats, ReverseColors } from './static.js';

export default class MessageComponent {
    _text = '';
    _color = '';
    _extra = [];

    /**
     * Returns a new MessageComponent by a given data object
     * @param { Object } data
     */
    constructor(data = { text: '' }) {
        this._data = data;

        this._text = this._data.text || '';
        this._color = this._data.color;
        this._data?.extra?.forEach((extraComp) => {
            this._extra.push(new MessageComponent(extraComp));
        });
    }

    /**
     * validates a component ( text, color, extra not undefined )
     */
    validate() {
        return this._text && this._color && this._extra;
    }

    /**
     * @returns { Object } data
     */
    data() {
        return this._data;
    }

    /**
     * @returns { String } serialized component
     */
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

    /**
     * Returns a new MessageComponent by a given data object
     * @param { Object } data
     * @returns { MessageComponent } component
     */
    static fromJsonData(data) {
        return new MessageComponent(data);
    }

    /**
     * Returns a new ComponentSerializer with MessageComponent
     * @param { Object } data
     * @returns { ComponentSerializer } serializer
     */
    static serializer(data) {
        return new ComponentSerializer(new MessageComponent(data).serialized());
    }
}
