// models/roomSchema.js

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Door
 * @property {string} id
 * @property {Point} position
 * @property {number} width
 * @property {string} type - 'single' | 'double' | 'sliding' | 'french'
 * @property {string} [swingDirection] - 'left' | 'right'
 */

/**
 * @typedef {Object} Window
 * @property {string} id
 * @property {Point} position
 * @property {number} width
 * @property {number} height
 * @property {string} type - 'standard' | 'bay' | 'sliding' | 'french'
 */

/**
 * @typedef {Object} Wall
 * @property {string} id
 * @property {Point} start
 * @property {Point} end
 * @property {number} thickness
 * @property {Door[]} [doors]
 * @property {Window[]} [windows]
 */

/**
 * @typedef {Object} Room
 * @property {string} id
 * @property {string} name
 * @property {string} type - 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'dining' | 'hallway' | 'other'
 * @property {Wall[]} walls
 * @property {Point[]} vertices
 * @property {number} [area]
 * @property {Object} [dimensions]
 * @property {number} dimensions.width
 * @property {number} dimensions.height
 * @property {Object} [style]
 * @property {string} style.fillColor
 * @property {string} style.strokeColor
 * @property {number} style.opacity
 * @property {Point} [labelPosition]
 * @property {number} [zIndex] - Stacking order (0 = back, 100 = front)
 */

module.exports = {} // Export empty object to make it a module
