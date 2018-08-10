/*jslint node: true */
"use strict";

// pow add

var constants = require('./constants.js');
var db = require('./db.js');
var conf = require('./conf.js');


function getCurrentRoundIndex(conn, callback){
    conn.query(
		"SELECT * FROM round ORDER BY round_index DESC LIMIT 1", 
        [],
		function(rows){
			if (rows.length !== 1)
                throw Error("Can not find current round index");
            callback(rows[0].round_index);
		}
	);
}


function getCurrentRoundInfo(conn, callback){
    conn.query(
		"SELECT * FROM round ORDER BY round_index DESC LIMIT 1", 
        [],
		function(rows){
			if (rows.length !== 1)
                throw Error("Can not find current round index");
            callback(rows[0].round_index, rows[0].min_wl, rows[0].max_wl);
		}
	);
}


function getPowEquhashUnitsByRoundIndex( oConn, nRoundIndex, pfnCallback )
{
	return getUnitsWithTypeByRoundIndex( oConn, nRoundIndex, constants.POW_TYPE_POW_EQUHASH, pfnCallback );
}
function getTrustMEUnitsByRoundIndex( oConn, nRoundIndex, pfnCallback )
{
	return getUnitsWithTypeByRoundIndex( oConn, nRoundIndex, constants.POW_TYPE_TRUSTME, pfnCallback );
}
function getCoinBaseUnitsByRoundIndex( oConn, nRoundIndex, pfnCallback )
{
	return getUnitsWithTypeByRoundIndex( oConn, nRoundIndex, constants.POW_TYPE_COIN_BASE, pfnCallback );
}

/**
 *	get units with type by round index
 *	@param	{handle}	oConn
 *	@param	{function}	oConn.query
 *	@param	{number}	nRoundIndex
 *	@param	{number}	nType
 *	@param	{function}	pfnCallback( err, arrRows )
 *	@return {*}
 */
function getUnitsWithTypeByRoundIndex( oConn, nRoundIndex, nType, pfnCallback )
{
	if ( ! oConn )
	{
		return pfnCallback( `call getUnitsWithTypeByRoundIndex with invalid oConn` );
	}
	if ( 'number' !== typeof nRoundIndex || nRoundIndex < 0 )
	{
		return pfnCallback( `call getUnitsWithTypeByRoundIndex with invalid nRoundIndex` );
	}
	if ( 'number' !== typeof nType )
	{
		return pfnCallback( `call getUnitsWithTypeByRoundIndex with invalid nType` );
	}

	oConn.query
	(
		"SELECT * FROM units \
		WHERE round_index = ? AND is_stable=1 AND is_on_main_chain=1 AND pow_type=? \
		ORDER BY main_chain_index",
		[ nRoundIndex, nType ],
		function( arrRows )
		{
			pfnCallback( null, arrRows );
		}
	);
}


function checkIfHaveFirstTrustMEByRoundIndex(conn, round_index, callback){
    conn.query(
		"SELECT witnessed_level FROM units WHERE round_index=?  \n\
		AND is_stable=1 AND is_on_main_chain=1 AND pow_type=? ORDER BY main_chain_index LIMIT 1", 
        [round_index, constants.POW_TYPE_TRUSTME],
		function(rows){
            callback(rows.length === 1);
		}
	);
}

// the MinWl and MaxWl maybe null
function getMinWlAndMaxWlByRoundIndex(conn, roundIndex, callback){
    conn.query(
		"SELECT min_wl, max_wl FROM round where round_index=?", 
        [roundIndex],
		function(rows){
			if (rows.length !== 1)
                throw Error("Can not find the right round index");
            callback(rows[0]["min_wl"], rows[0]["max_wl"]);
		}
	);
}

function getCoinbaseByRoundIndex(roundIndex){
    if(roundIndex < 1 || roundIndex > constants.ROUND_TOTAL_ALL)
        return 0;
	return constants.ROUND_COINBASE[Math.ceil(roundIndex/constants.ROUND_TOTAL_YEAR)-1];
}

function getWitnessesByRoundIndex(conn, roundIndex, callback){
    // TODO ：cache the witnesses of recent rounds
    conn.query(
		"SELECT distinct(address) \n\
		FROM units JOIN unit_authors using (unit)\n\
        WHERE is_stable=1 AND sequence='good' AND pow_type=? AND round_index=? ORDER BY main_chain_index,unit  \n\
        LIMIT ?", 
        [constants.POW_TYPE_POW_EQUHASH, roundIndex, constants.COUNT_POW_WITNESSES],
		function(rows){
			if (rows.length !==  constants.COUNT_POW_WITNESSES)
                throw Error("Can not find enough witnesses ");
            var witnesses = rows.map(function(row) { return row.address; } );
            callback(witnesses.push(constants.FOUNDATION_ADDRESS));
		}
	);
}

function checkIfCoinBaseUnitByRoundIndexAndAddressExists(conn, roundIndex, address, callback){
    // TODO ：cache the witnesses of recent rounds
    conn.query(
		"SELECT  units.unit \n\
		FROM units JOIN unit_authors using (unit)\n\
        WHERE pow_type=? AND round_index=? AND address=? ", 
        [constants.POW_TYPE_COIN_BASE, roundIndex, address],
		function(rows){
			callback(rows.length > 0 );
		}
	);
}




/**
 *	@exports
 */
exports.getCurrentRoundIndex = getCurrentRoundIndex;
exports.getMinWlAndMaxWlByRoundIndex = getMinWlAndMaxWlByRoundIndex;
exports.getCoinbaseByRoundIndex = getCoinbaseByRoundIndex;

exports.getPowEquhashUnitsByRoundIndex	= getPowEquhashUnitsByRoundIndex;
exports.getTrustMEUnitsByRoundIndex	= getTrustMEUnitsByRoundIndex;
exports.getCoinBaseUnitsByRoundIndex	= getCoinBaseUnitsByRoundIndex;
exports.getUnitsWithTypeByRoundIndex	= getUnitsWithTypeByRoundIndex;


exports.checkIfHaveFirstTrustMEByRoundIndex = checkIfHaveFirstTrustMEByRoundIndex;
exports.getWitnessesByRoundIndex = getWitnessesByRoundIndex;
exports.checkIfCoinBaseUnitByRoundIndexAndAddressExists = checkIfCoinBaseUnitByRoundIndexAndAddressExists;

// console.log("roundIndex:0-"+getCoinbaseByRoundIndex(0));
// console.log("roundIndex:1-"+getCoinbaseByRoundIndex(1));
// console.log("roundIndex:2156-"+getCoinbaseByRoundIndex(2156));
// console.log("roundIndex:210240-"+getCoinbaseByRoundIndex(210240));
// console.log("roundIndex:210241-"+getCoinbaseByRoundIndex(210241));
// console.log("roundIndex:420480-"+getCoinbaseByRoundIndex(420480));
// console.log("roundIndex:420481-"+getCoinbaseByRoundIndex(420481));
// console.log("roundIndex:721212-"+getCoinbaseByRoundIndex(721212));
// console.log("roundIndex:3153600-"+getCoinbaseByRoundIndex(3153600));
// console.log("roundIndex:3153601-"+getCoinbaseByRoundIndex(3153601));
// console.log("roundIndex:4204800-"+getCoinbaseByRoundIndex(4204800));
// console.log("roundIndex:4204801-"+getCoinbaseByRoundIndex(4204801));
// console.log("roundIndex:4212121201-"+getCoinbaseByRoundIndex(4212121201));

