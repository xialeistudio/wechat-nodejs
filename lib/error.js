/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
class AppError extends Error {
	constructor(message, code) {
		super(message);
		this.message = message;
		this.code = code;
		this.name = 'AppError';
	}
}
module.exports = AppError;