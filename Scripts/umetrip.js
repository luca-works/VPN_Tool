// 引用地址：https://raw.githubusercontent.com/zirawell/R-Store/main/Res/Scripts/AntiAd/umetrip.js
/********************************
Umetrip Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/QuanX/Adblock/App/H/航旅纵横/rewrite/umetrip.conf

Surge module link:
https://raw.githubusercontent.com/zirawell/R-Store/main/Rule/Surge/Adblock/App/H/航旅纵横/umetrip.sgmodule
********************************/

const url = $request.url;
const header = $request.headers;
const ua = $request.headers.rpid || $request.headers.Rpid;
const blockIds = [
	"1000002",
	"1430064"
	
];

const modifyIds = [
	"1060067"
];

if (typeof $response == "undefined" && blockIds.includes(ua)) {
	$done({status: "HTTP/1.1 404 Not Found"});
} else if (typeof $response !== "undefined" && modifyIds.includes(ua)){
	let body = $response.body;
	if (typeof body !== 'string') {
	  $done();
	} else {
	  let newBody = removeCloseClickTrue(body);
	  $done({ body: newBody });
	}
} else {
	$done();
}

function removeCloseClickTrue(str){let out='';let i=0;while(i<str.length){let ch=str[i];if(ch==='"'){let start=i;i++;while(i<str.length){if(str[i]==='\\'){i+=2}else if(str[i]==='"'){i++;break}else{i++}}out+=str.slice(start,i);continue}if(ch==='{'){let end=findMatchingBrace(str,i);if(end===-1){out+=str.slice(i);break}let objStr=str.slice(i,end+1);let shouldRemove=false;try{let obj=JSON.parse(objStr);if(obj&&obj.closeClick===true){shouldRemove=true}}catch(e){}if(!shouldRemove){out+=objStr}i=end+1;continue}out+=ch;i++}return out}
function findMatchingBrace(str,start){let depth=0;let inStr=false;let esc=false;for(let i=start;i<str.length;i++){let ch=str[i];if(inStr){if(esc){esc=false}else if(ch==='\\'){esc=true}else if(ch==='"'){inStr=false}}else{if(ch==='"'){inStr=true}else if(ch==='{'){depth++}else if(ch==='}'){depth--;if(depth===0)return i}}}return-1}