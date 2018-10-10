/*jslint node: true */
"use strict";

// pow modi 
//exports.COUNT_WITNESSES		= 12;
exports.COUNT_WITNESSES		= 9;
exports.COUNT_POW_WITNESSES = 8;
exports.TOTAL_WHITEBYTES	= 5e14;
exports.MAJORITY_OF_WITNESSES	= (exports.COUNT_WITNESSES % 2 === 0) ? (exports.COUNT_WITNESSES / 2 + 1) : Math.ceil(exports.COUNT_WITNESSES / 2);
exports.COUNT_MC_BALLS_FOR_PAID_WITNESSING = 100;

exports.version = '1.0';
exports.alt = '1';

exports.GENESIS_UNIT = '/2JXOmTkFL2w0HBKMyMylwwLZg+fyhYX3wKLYqE7PL8=';

exports.BLACKBYTES_ASSET = '9qQId3BlWRQHvVy+STWyLKFb3lUd0xfQhX6mPVEHC2c=';
// Pow add
exports.FOUNDATION_ADDRESS = "JNA6YWLKFQG7PFF6F32KTXBUAHRAFSET";
exports.HASH_LENGTH = 44;
exports.PUBKEY_LENGTH = 44;
exports.SIG_LENGTH = 88;

// anti-spam limits
exports.MAX_AUTHORS_PER_UNIT = 16;
exports.MAX_PARENTS_PER_UNIT = 16;
exports.MAX_MESSAGES_PER_UNIT = 128;
exports.MAX_SPEND_PROOFS_PER_MESSAGE = 128;
exports.MAX_INPUTS_PER_PAYMENT_MESSAGE = 128;
exports.MAX_OUTPUTS_PER_PAYMENT_MESSAGE = 128;
exports.MAX_CHOICES_PER_POLL = 128;
exports.MAX_DENOMINATIONS_PER_ASSET_DEFINITION = 64;
exports.MAX_ATTESTORS_PER_ASSET = 64;
exports.MAX_DATA_FEED_NAME_LENGTH = 64;
exports.MAX_DATA_FEED_VALUE_LENGTH = 64;
exports.MAX_AUTHENTIFIER_LENGTH = 4096;
exports.MAX_CAP = 9e15;
exports.MAX_COMPLEXITY = 100;

exports.ROUND_TOTAL_YEAR = 210240;
exports.ROUND_TOTAL_ALL = 4204800;
exports.ROUND_COINBASE = [217590000,
						176740000,
						156490000,
						143550000,
						134260000,
						127110000,
						121370000,
						116600000,
						112550000,
						109050000,
						105980000,
						103250000,
						100800000,
						98580000,
						96560000,
						94710000,
						93000000,
						91420000,
						89950000,
						88580000,
						0];

exports.MIN_INTERVAL_WL_OF_TRUSTME = 5;
exports.FOUNDATION_RATIO = 0.2;
/**
 *	pow_type
 */
exports.POW_TYPE_POW_EQUHASH	= 1;
exports.POW_TYPE_TRUSTME	= 2;
exports.POW_TYPE_COIN_BASE	= 3;

exports.COUNT_ROUNDS_FOR_DIFFICULTY_SWITCH = 1;
exports.COUNT_CYCLES_FOR_DIFFICULTY_DURATION = 17;
// average time consumimg per each round
exports.DURATION_PER_ROUND = 150;

// calculate payload commission coefficient
exports.PAYLOAD_COEFFICIENT = {
	"payment":1,
	"pow_equihash":5,
	"address_definition_change":1,
	"poll":1,
	"vote":1,
	"asset":1,
	"asset_attestors":1,
	"data_feed":1,
	"profile":1,
	"attestation":1,
	"data":1,
	"definition_template":1,
	"text":1
};
