import Chess = require("../../types");
var PEG = require("pegjs");
export = parser;

var parser: Chess.StringParser = PEG.buildParser(`
	Start
	= r:RankList WS t:Turn WS c:Castling WS Enpassant WS h:HalfMove WS m:Move
	{ return { 
	ranks: r,
	turn: t,
	castling: c,
	halfMove: h,
	fullMove: t };
	}
	RankList
	= head:Rank "/" tail:RankList { return [].concat(head,tail); }
	/ Rank

	Rank
	= rank:[a-zA-Z0-9]+ { return rank.join(''); }

	WS
	= " "* { return null; }

	Turn
	= turn:[w|b] { return turn }

	Castling
	= [k|q|K|Q|"-"]+

	Enpassant
	= [a-h1-8]{1}
	/ "-"

	HalfMove
	= [0-9]+

	Move
	= [0-9]+
`);
