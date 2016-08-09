/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
const Promise = require('bluebird');
const request = require('request');
const fs = require('fs');
const crypto = require('crypto');
/**
 * util
 */
class Util {
	/**
	 * Http Get
	 * @param options
	 */
	static httpGet(options) {
		return new Promise((resolve, reject)=> {
			request.get(options, (e, response, body)=> {
				if (e) {
					return reject(e);
				}
				if (response.statusCode !== 200) {
					return reject(new Error(body));
				}
				return resolve(body);
			});
		});
	}

	/**
	 * Http Post
	 * @param options
	 */
	static httpPost(options) {
		return new Promise((resolve, reject)=> {
			request.post(options, (e, response, body)=> {
				if (e) {
					return reject(e);
				}
				if (response.statusCode !== 200) {
					return reject(new Error(body));
				}
				return resolve(body);
			});
		});
	}

	/**
	 * Http Download
	 * @param url
	 * @param path
	 */
	static httpDownload(url, path) {
		return new Promise((resolve, reject)=> {
			request.get(url).pipe(fs.createWriteStream(path))
					.on('close', resolve)
					.on('error', reject);
		});
	}

	/**
	 * sha1 crypto
	 * @param str
	 * @returns {*}
	 */
	static  sha1(str) {
		const s = crypto.createHash('sha1');
		s.update(str);
		return s.digest('hex');
	}
}
module.exports = Util;