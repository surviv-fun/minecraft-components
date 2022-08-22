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

import { ComponentParser, ComponentSerializer, strip, stripFormat } from './index.js';

const parser = new ComponentParser();

// raw strip
console.log(strip('&l&7[&3PREFIX&l&7]&r &aThis is &5a &9really &cnice &amessage&7.', '&'));

// strip with parser
console.log(stripFormat(parser, '&l&7[&3PREFIX&l&7]&r &aThis is &5a &9really &cnice &amessage&7.'));

// strip over parser
console.log(parser.stripFormat('&l&7[&3PREFIX&l&7]&r &aThis is &5a &9really &cnice &amessage&7.'));

const serializer = new ComponentSerializer('&l&7[&3PREFIX&l&7]&r &aThis is &5a &9really &cnice &amessage&7.');

console.log(serializer.plain());
console.log(serializer.serialized());
console.log(serializer.json());
console.log(JSON.stringify(serializer.toJsonObject(), null, 1));
console.log(serializer.toJsonObject());

console.log(serializer.html());

console.log(serializer.toHtmlEntity());
console.log(serializer.component());

// document.body.append(serializer.toHtmlEntity());

var updatePending = false;
const updateInfo = async () => {
    if (updatePending) return;
    updatePending = true;
    const response = await fetch('https://api.surviv.fun/ping');
    const pingData = await response.json();

    const description = pingData.ping.description;

    const _server = new ComponentSerializer('&7Minecraft Server');
    const _motd = ComponentSerializer.fromJsonData(description);

    const server = document.querySelector('#server');
    const motd = document.querySelector('#motd');
    const players = document.querySelector('#players');

    server.innerHTML = _server.html();
    motd.innerHTML = _motd.html();

    players.innerHTML = pingData.ping.players.sample.map((p) => new ComponentSerializer('&7' + p.name).html()).join(', ');
    updatePending = false;
};

updateInfo();
const update = document.querySelector('#update');
update.onclick = updateInfo;

setInterval(updateInfo, 1000 * 15);
