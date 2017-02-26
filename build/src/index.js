"use strict";
const emitter_1 = require("./emitter");
const _ = require("underscore");
const settings_1 = require("./settings");
function createEmitter(config) {
    let emitter = new emitter_1.Emitter(_.defaults(config || {}, settings_1.Settings.defaultConfig()));
    return emitter;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createEmitter;
