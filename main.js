/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass View {\n    constructor(canvas, width, height) {\n        this.canvas = document.getElementById('myCanvas');\n        this.ctx = this.canvas.getContext('2d');\n        this.width = width;\n        this.height = height;\n    }\n    update(model) {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        this.ctx.beginPath();\n        this.ctx.arc(model.ball.x, model.ball.y, model.ball.r, 0, Math.PI * 2);\n        this.ctx.fillStyle = '#0095DD';\n        this.ctx.fill();\n        this.ctx.closePath();\n        this.ctx.beginPath();\n        this.ctx.rect(model.paddle.x, model.paddle.y, model.paddle.width, model.paddle.height);\n        this.ctx.fillStyle = '#0095DD';\n        this.ctx.fill();\n        this.ctx.closePath();\n        model.blocks.forEach((block) => {\n            if (!block.hidden) {\n                this.ctx.beginPath();\n                this.ctx.rect(block.x, block.y, block.width, block.height);\n                this.ctx.fillStyle = '#0095DD';\n                this.ctx.fill();\n                this.ctx.closePath();\n            }\n        });\n        this.ctx.font = '16px Arial';\n        this.ctx.fillStyle = '#0095DD';\n        this.ctx.fillText('Score: ' + model.score, 8, 20);\n    }\n}\nclass BrockBreaking {\n    constructor(width, height, canvas) {\n        this.width = width;\n        this.height = height;\n        const initX = 240;\n        const initY = 290;\n        this.canvas = canvas;\n        this.ball = new Ball(initX, initY);\n        this.paddle = new Paddle();\n        this.gameOver = false;\n        this.blocks = [];\n        for (let c = 0; c < 3; c++) {\n            for (let r = 0; r < 5; r++) {\n                this.blocks.push(new Block(r * 85 + 30, c * 30 + 30));\n                // r * (brickWidth + brickPadding) + brickOffsetLeft;\n                // c * (brickHeight + brickPadding) + brickOffsetTop;\n            }\n        }\n        this.score = 0;\n    }\n    next() {\n        if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.r || this.ball.x + this.ball.dx < this.ball.r) {\n            this.ball.reflectX();\n        }\n        if (this.ball.y + this.ball.dy < this.ball.r) {\n            this.ball.reflectY();\n        }\n        if (this.ball.y + this.ball.dy > this.height - this.ball.r) {\n            if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {\n                this.ball.dy = -this.ball.dy;\n            }\n            else {\n                this.gameOver = true;\n            }\n        }\n        for (const block of this.blocks) {\n            if (!block.hidden) {\n                if (this.ball.x > block.x &&\n                    this.ball.x < block.x + block.width &&\n                    this.ball.y > block.y &&\n                    this.ball.y < block.y + block.height) {\n                    this.ball.dy = -this.ball.dy;\n                    block.hidden = true;\n                    this.score += 1;\n                }\n            }\n        }\n        this.ball.next();\n    }\n    moveRight() {\n        this.paddle.x += 7;\n    }\n    moveLeft() {\n        this.paddle.x -= 7;\n    }\n}\nclass Ball {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n        this.dx = 2;\n        this.dy = -2;\n        this.r = 10;\n    }\n    next() {\n        this.x += this.dx;\n        this.y += this.dy;\n    }\n    reflectX() {\n        this.dx = -this.dx;\n    }\n    reflectY() {\n        this.dy = -this.dy;\n    }\n}\nclass Paddle {\n    constructor() {\n        this.width = 90;\n        this.height = 10;\n        this.x = 200;\n        this.y = 310;\n    }\n}\nclass Block {\n    constructor(x, y) {\n        this.width = 75;\n        this.height = 20;\n        this.x = x;\n        this.y = y;\n        this.hidden = false;\n    }\n}\nclass Frame {\n    constructor(width, height, canvas, window) {\n        this.width = width;\n        this.height = height;\n        this.canvas = canvas;\n        this.canvas.width = this.width;\n        this.canvas.height = this.height;\n        this.view = new View(canvas, this.width, this.height);\n        this.model = new BrockBreaking(this.width, this.height, this.canvas);\n        this.window = window;\n        this.key = null;\n    }\n    start() {\n        this.intervalId = setInterval(() => {\n            this.next();\n        }, 10);\n        this.window.addEventListener('keydown', (e) => {\n            if (e.key === 'ArrowRight' && this.model.paddle.x < this.canvas.width - this.model.paddle.width) {\n                this.key = 'right';\n            }\n            if (e.key === 'ArrowLeft' && this.model.paddle.x > 0) {\n                this.key = 'left';\n            }\n        });\n        this.window.addEventListener('keyup', (e) => {\n            this.key = null;\n        });\n    }\n    next() {\n        this.model.next();\n        this.view.update(this.model);\n        if (this.model.gameOver) {\n            this.stop();\n        }\n        if (this.key === 'right' && this.model.paddle.x < this.canvas.width - this.model.paddle.width) {\n            this.model.moveRight();\n        }\n        if (this.key === 'left' && this.model.paddle.x > 0) {\n            this.model.moveLeft();\n        }\n        if (this.model.score % 15 === 0) {\n            for (const block of this.model.blocks) {\n                block.hidden = false;\n            }\n        }\n    }\n    stop() {\n        clearInterval(this.intervalId);\n        if (confirm(`\n            score: ${this.model.score}\n            もう一度挑戦しますか?`)) {\n            const frame = new Frame(this.width, this.height, this.canvas, this.window);\n            frame.start();\n        }\n    }\n    end() { }\n}\nexports[\"default\"] = Frame;\n\n\n//# sourceURL=webpack://tf-breakout/./src/index.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst index_1 = __importDefault(__webpack_require__(/*! ./index */ \"./src/index.ts\"));\nconst WIDTH = 480;\nconst HEIGHT = 320;\nconst canvas = document.getElementById('myCanvas');\nconst frame = new index_1.default(WIDTH, HEIGHT, canvas, window);\nframe.start();\n\n\n//# sourceURL=webpack://tf-breakout/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;