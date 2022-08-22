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

export const Colors = {
    '§0': 'black',
    '§1': 'dark_blue',
    '§2': 'dark_green',
    '§3': 'dark_aqua',
    '§4': 'dark_red',
    '§5': 'dark_purple',
    '§6': 'gold',
    '§7': 'gray',
    '§8': 'dark_gray',
    '§9': 'blue',
    '§a': 'green',
    '§b': 'aqua',
    '§c': 'red',
    '§d': 'light_purple',
    '§e': 'yellow',
    '§f': 'white'
};

export const Formats = {
    '§k': 'obfuscated',
    '§l': 'bold',
    '§m': 'strikethrough',
    '§n': 'underline',
    '§o': 'italic'
};

export const ReverseColors = {
    black: '§0',
    dark_blue: '§1',
    dark_green: '§2',
    dark_aqua: '§3',
    dark_red: '§4',
    dark_purple: '§5',
    gold: '§6',
    gray: '§7',
    dark_gray: '§8',
    blue: '§9',
    green: '§a',
    aqua: '§b',
    red: '§c',
    light_purple: '§d',
    yellow: '§e',
    white: '§f'
};

export const ReverseFormats = {
    obfuscated: '§k',
    bold: '§l',
    strikethrough: '§m',
    underline: '§n',
    italic: '§o'
};

export const Classes = {
    bold: 'bold',
    italic: 'italic',
    underlined: 'underlined',
    strikethrough: 'strikethrough',
    obfuscated: 'obfuscated'
};

export const CharSizes = {
    THIN: '!i|,.'.split(''),
    MID: "Ilt'".split(''),
    WIDE: '"#$%&()*+-/0123456789<=>?@aAbBcCdDeEfFgGhHjJkKLmMnNoOpPqQrRsSTuUvVwWxXyYzZ{}~'.split('')
};
