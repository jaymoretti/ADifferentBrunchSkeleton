function Application(){
	if(window.location.href.indexOf("localhost") > -1){
		var ws;function socket() { ws = new WebSocket("ws://127.0.0.1:8080"); ws.onmessage = function ( e ) { var data = JSON.parse(e.data); if ( data.r ) { location.reload(); } }; }setInterval(function () { if ( ws ) { if ( ws.readyState !== 1 ) { socket(); } } else { socket();} }, 1000);
	}
}

Application.prototype = {};
Application.prototype.constructor = Application;

module.exports = Application;