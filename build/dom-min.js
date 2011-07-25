/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Jul 20 18:42
*/
KISSY.add("dom/attr",function(l,b,w,p){function C(e,a){a=v[a]||a;var d=q[a];if(!e)return p;return d&&d.get?d.get(e,a):e[a]}w=document.documentElement;var B=!w.hasAttribute,x=w.textContent!==p?"textContent":"innerText",g=b._isElementNode,j=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,m=/^(?:button|input|object|select|textarea)$/i,y=/^a(?:rea)?$/i,i=/:|^on/,n=/\r/g,c={},k={val:1,css:1,html:1,text:1,data:1,width:1,height:1,
offset:1},r={tabindex:{get:function(e){var a=e.getAttributeNode("tabindex");return a&&a.specified?parseInt(a.value,10):m.test(e.nodeName)||y.test(e.nodeName)&&e.href?0:p}},style:{get:function(e){return e.style.cssText},set:function(e,a){e.style.cssText=a}}},v={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},
z={get:function(e,a){return b.prop(e,a)?a.toLowerCase():p},set:function(e,a,d){if(a===false)b.removeAttr(e,d);else{a=v[d]||d;if(a in e)e[a]=true;e.setAttribute(d,d.toLowerCase())}return d}},q={},h={},s={option:{get:function(e){var a=e.attributes.value;return!a||a.specified?e.value:e.text}},select:{get:function(e){var a=e.selectedIndex,d=e.options;e=e.type==="select-one";if(a<0)return null;else if(e)return b.val(d[a]);a=[];e=0;for(var f=d.length;e<f;++e)d[e].selected&&a.push(b.val(d[e]));return a},
set:function(e,a){var d=l.makeArray(a);l.each(e.options,function(f){f.selected=l.inArray(b.val(f),d)});if(!d.length)e.selectedIndex=-1;return d}}};if(B){h={get:function(e,a){var d;return(d=e.getAttributeNode(a))&&d.nodeValue!==""?d.nodeValue:p},set:function(e,a,d){if(e=e.getAttributeNode(d))e.nodeValue=a}};c=v;r.tabIndex=r.tabindex;l.each(["href","src","width","height","colSpan","rowSpan"],function(e){r[e]={get:function(a){a=a.getAttribute(e,2);return a===null?p:a}}});s.button=r.value=h}l.each(["radio",
"checkbox"],function(e){s[e]={get:function(a){return a.getAttribute("value")===null?"on":a.value},set:function(a,d){if(l.isArray(d))return a.checked=l.inArray(b.val(a),d)}}});l.mix(b,{prop:function(e,a,d){if(l.isPlainObject(a))for(var f in a)b.prop(e,f,a[f]);else{e=b.query(e);a=v[a]||a;var o=q[a];if(d!==p)l.each(e,function(t){if(o&&o.set)o.set(t,d,a);else t[a]=d});else if(e=e[0])return C(e,a)}},hasProp:function(e,a){return C(e,a)!==p},removeProp:function(e,a){a=v[a]||a;b.query(e).each(function(d){try{d[a]=
p;delete d[a]}catch(f){}})},attr:function(e,a,d,f){if(l.isPlainObject(a)){f=d;for(var o in a)b.attr(e,o,a[o],f)}else if(a=l.trim(a)){a=a.toLowerCase();if(f&&k[a])return b[a](e,d);a=c[a]||a;var t;t=j.test(a)?z:i.test(a)?h:r[a];if(d===p){e=b.get(e);if(g(e)){if(e.nodeName.toLowerCase()=="form")t=h;if(t&&t.get)return t.get(e,a);e=e.getAttribute(a);return e===null?p:e}}else l.each(b.query(e),function(u){if(g(u))t&&t.set?t.set(u,d,a):u.setAttribute(a,""+d)})}},removeAttr:function(e,a){a=a.toLowerCase();
a=c[a]||a;l.each(b.query(e),function(d){if(g(d)){var f;d.removeAttribute(a);if(j.test(a)&&(f=v[a]||a)in d)d[f]=false}})},hasAttr:B?function(e,a){a=a.toLowerCase();var d=b.get(e).getAttributeNode(a);return!!(d&&d.specified)}:function(e,a){a=a.toLowerCase();return b.get(e).hasAttribute(a)},val:function(e,a){var d,f;if(a===p){var o=b.get(e);if(o){if((d=s[o.nodeName.toLowerCase()]||s[o.type])&&"get"in d&&(f=d.get(o,"value"))!==p)return f;f=o.value;return typeof f==="string"?f.replace(n,""):f==null?"":
f}}else b.query(e).each(function(t){if(t.nodeType===1){var u=a;if(u==null)u="";else if(typeof u==="number")u+="";else if(l.isArray(u))u=l.map(u,function(A){return A==null?"":A+""});d=s[t.nodeName.toLowerCase()]||s[t.type];if(!d||!("set"in d)||d.set(t,u,"value")===p)t.value=u}})},text:function(e,a){if(a===p){var d=b.get(e);if(g(d))return d[x]||"";else if(b._nodeTypeIs(d,3))return d.nodeValue;return p}else l.each(b.query(e),function(f){if(g(f))f[x]=a;else if(b._nodeTypeIs(f,3))f.nodeValue=a})}});return b},
{requires:["./base","ua"]});KISSY.add("dom/base",function(l,b){function w(p,C){return p&&p.nodeType===C}return{_isElementNode:function(p){return w(p,1)},_getWin:function(p){return p&&"scrollTo"in p&&p.document?p:w(p,9)?p.defaultView||p.parentWindow:p==b?window:false},_nodeTypeIs:w,_isNodeList:function(p){return p&&!p.nodeType&&p.item&&!p.setTimeout}}});
KISSY.add("dom/class",function(l,b,w){function p(x,g,j,m){if(!(g=l.trim(g)))return m?false:w;x=b.query(x);var y=0,i=x.length,n=g.split(C);for(g=[];y<n.length;y++){var c=l.trim(n[y]);c&&g.push(c)}for(y=0;y<i;y++){n=x[y];if(b._isElementNode(n)){n=j(n,g,g.length);if(n!==w)return n}}if(m)return false;return w}var C=/[\.\s]\s*\.?/,B=/[\n\t]/g;l.mix(b,{hasClass:function(x,g){return p(x,g,function(j,m,y){if(j=j.className){j=(" "+j+" ").replace(B," ");for(var i=0,n=true;i<y;i++)if(j.indexOf(" "+m[i]+" ")<
0){n=false;break}if(n)return true}},true)},addClass:function(x,g){p(x,g,function(j,m,y){var i=j.className;if(i){var n=(" "+i+" ").replace(B," ");i=i;for(var c=0;c<y;c++)if(n.indexOf(" "+m[c]+" ")<0)i+=" "+m[c];j.className=l.trim(i)}else j.className=g},w)},removeClass:function(x,g){p(x,g,function(j,m,y){var i=j.className;if(i)if(y){i=(" "+i+" ").replace(B," ");for(var n=0,c;n<y;n++)for(c=" "+m[n]+" ";i.indexOf(c)>=0;)i=i.replace(c," ");j.className=l.trim(i)}else j.className=""},w)},replaceClass:function(x,
g,j){b.removeClass(x,g);b.addClass(x,j)},toggleClass:function(x,g,j){var m=l.isBoolean(j),y;p(x,g,function(i,n,c){for(var k=0,r;k<c;k++){r=n[k];y=m?!j:b.hasClass(i,r);b[y?"removeClass":"addClass"](i,r)}},w)}});return b},{requires:["dom/base"]});
KISSY.add("dom/create",function(l,b,w,p){function C(f,o){if(l.isPlainObject(o))if(i(f))b.attr(f,o,true);else f.nodeType==11&&l.each(f.childNodes,function(t){b.attr(t,o,true)});return f}function B(f,o){var t=null,u,A;if(f&&(f.push||f.item)&&f[0]){o=o||f[0].ownerDocument;t=o.createDocumentFragment();if(f.item)f=l.makeArray(f);u=0;for(A=f.length;u<A;u++)t.appendChild(f[u])}return t}function x(f,o,t,u){if(t){var A=l.guid("ks-tmp-"),D=RegExp(r);o+='<span id="'+A+'"></span>';l.available(A,function(){var E=
b.get("head"),F,J,H,G,K,I;for(D.lastIndex=0;F=D.exec(o);)if((H=(J=F[1])?J.match(z):false)&&H[2]){F=j.createElement("script");F.src=H[2];if((G=J.match(q))&&G[2])F.charset=G[2];F.async=true;E.appendChild(F)}else if((I=F[2])&&I.length>0)l.globalEval(I);(K=j.getElementById(A))&&b.remove(K);l.isFunction(u)&&u()});g(f,o)}else{g(f,o);l.isFunction(u)&&u()}}function g(f,o){o=(o+"").replace(r,"");try{f.innerHTML=o}catch(t){for(;f.firstChild;)f.removeChild(f.firstChild);o&&f.appendChild(b.create(o))}}var j=
document,m=w.ie,y=b._nodeTypeIs,i=b._isElementNode,n=j.createElement("div"),c=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,k=/<(\w+)/,r=/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/ig,v=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,z=/\ssrc=(['"])(.*?)\1/i,q=/\scharset=(['"])(.*?)\1/i;l.mix(b,{create:function(f,o,t){if(y(f,1)||y(f,3)){o=f;t=o.cloneNode(true);if(w.ie<8)t.innerHTML=o.innerHTML;return t}if(!(f=l.trim(f)))return null;var u=null;u=b._creators;var A,D="div",E;
if(A=v.exec(f))u=(t||j).createElement(A[1]);else{f=f.replace(c,"<$1></$2>");if((A=k.exec(f))&&(E=A[1])&&l.isFunction(u[E=E.toLowerCase()]))D=E;f=u[D](f,t).childNodes;u=f.length===1?f[0].parentNode.removeChild(f[0]):B(f,t||j)}return C(u,o)},_creators:{div:function(f,o){var t=o?o.createElement("div"):n;t.innerHTML="w<div>"+f+"</div>";return t.lastChild}},html:function(f,o,t,u){if(o===p){f=b.get(f);if(i(f))return f.innerHTML}else l.each(b.query(f),function(A){i(A)&&x(A,o,t,u)})},remove:function(f){l.each(b.query(f),
function(o){o.parentNode&&o.parentNode.removeChild(o)})},_nl2frag:B});if(m||w.gecko||w.webkit){var h=b._creators,s=b.create,e=/(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/,a={option:"select",td:"tr",tr:"tbody",tbody:"table",col:"colgroup",legend:"fieldset"},d;for(d in a)(function(f){h[d]=function(o,t){return s("<"+f+">"+o+"</"+f+">",null,t)}})(a[d]);if(m){h.script=function(f,o){var t=o?o.createElement("div"):n;t.innerHTML="-"+f;t.removeChild(t.firstChild);return t};if(m<8)h.tbody=function(f,
o){var t=s("<table>"+f+"</table>",null,o),u=t.children.tags("tbody")[0];t.children.length>1&&u&&!e.test(f)&&u.parentNode.removeChild(u);return t}}l.mix(h,{optgroup:h.option,th:h.td,thead:h.tbody,tfoot:h.tbody,caption:h.tbody,colgroup:h.tbody})}return b},{requires:["./base","ua"]});
KISSY.add("dom/data",function(l,b,w){var p=window,C="_ks_data_"+l.now(),B={},x={},g={};g.applet=1;g.object=1;g.embed=1;var j={hasData:function(i,n){if(i)if(n!==w){if(n in i)return true}else if(!l.isEmptyObject(i))return true;return false}},m={hasData:function(i,n){if(i==p)return m.hasData(x,n);return j.hasData(i[C],n)},data:function(i,n,c){if(i==p)return m.data(x,n,c);i=i[C]=i[C]||{};if(c!==w)i[n]=c;else return n!==w?i[n]:i},removeData:function(i,n){if(i==p)return m.removeData(x,n);var c=i[C];if(c)if(n!==
w){delete c[n];l.isEmptyObject(c)&&m.removeData(i,w)}else delete i[C]}},y={hasData:function(i,n){var c=i[C];if(!c)return false;return j.hasData(B[c],n)},data:function(i,n,c){if(!g[i.nodeName.toLowerCase()]){var k=i[C];k||(k=i[C]=l.guid());i=B[k]=B[k]||{};if(c!==w)i[n]=c;else return n!==w?i[n]:i}},removeData:function(i,n){var c=i[C];if(c){var k=B[c];if(k)if(n!==w){delete k[n];l.isEmptyObject(k)&&y.removeData(i,w)}else{delete B[c];try{delete i[C]}catch(r){}i.removeAttribute&&i.removeAttribute(C)}}}};
l.mix(b,{hasData:function(i,n){var c=false;b.query(i).each(function(k){c=k&&k.nodeType?c||y.hasData(k,n):c||m.hasData(k,n)});return c},data:function(i,n,c){if(l.isPlainObject(n))for(var k in n)b.data(i,k,n[k]);else if(c===w)return(i=b.get(i))&&i.nodeType?y.data(i,n,c):m.data(i,n,c);else b.query(i).each(function(r){r&&r.nodeType?y.data(r,n,c):m.data(r,n,c)})},removeData:function(i,n){b.query(i).each(function(c){c&&c.nodeType?y.removeData(c,n):m.removeData(c,n)})}});return b},{requires:["./base"]});
KISSY.add("dom/insertion",function(l,b){function w(x,g,j){x=b.query(x);g=b.query(g);if(x=p(x)){var m;if(g.length>1)m=x.cloneNode(true);for(var y=0;y<g.length;y++){var i=g[y],n=y>0?m.cloneNode(true):x;j(n,i)}}}var p=b._nl2frag;l.mix(b,{insertBefore:function(x,g){w(x,g,function(j,m){m.parentNode&&m.parentNode.insertBefore(j,m)})},insertAfter:function(x,g){w(x,g,function(j,m){m.parentNode&&m.parentNode.insertBefore(j,m.nextSibling)})},appendTo:function(x,g){w(x,g,function(j,m){m.appendChild(j)})},prependTo:function(x,
g){w(x,g,function(j,m){m.insertBefore(j,m.firstChild)})}});var C={prepend:"prependTo",append:"appendTo",before:"insertBefore",after:"insertAfter"},B;for(B in C)b[B]=b[C[B]];return b},{requires:["./create"]});
KISSY.add("dom/offset",function(l,b,w,p){function C(a){var d,f=0;d=0;var o=g.body,t=n(a[v]);if(a[e]){d=a[e]();f=d[z];d=d[q];a=j&&g.documentMode!=9&&(c?m.clientTop:o.clientTop)||0;f-=j&&g.documentMode!=9&&(c?m.clientLeft:o.clientLeft)||0;d-=a;if(w.mobile=="apple"){f-=b[h](t);d-=b[s](t)}}return{left:f,top:d}}function B(a,d){var f={left:0,top:0},o=n(a[v]),t=a;d=d||o;do{var u;if(o==d){var A=t;u=C(A);A=n(A[v]);u.left+=b[h](A);u.top+=b[s](A);u=u}else u=C(t);u=u;f.left+=u.left;f.top+=u.top}while(o&&o!=d&&
(t=o.frameElement)&&(o=o.parent));return f}var x=window,g=document,j=w.ie,m=g.documentElement,y=b._isElementNode,i=b._nodeTypeIs,n=b._getWin,c=g.compatMode==="CSS1Compat",k=Math.max,r=parseInt,v="ownerDocument",z="left",q="top",h="scrollLeft",s="scrollTop",e="getBoundingClientRect";l.mix(b,{offset:function(a,d,f){if((a=b.get(a))&&a[v]){if(d===p)return B(a,f);a=a;if(b.css(a,"position")==="static")a.style.position="relative";f=B(a);var o={},t,u;for(u in d){t=r(b.css(a,u),10)||0;o[u]=t+d[u]-f[u]}b.css(a,
o)}},scrollIntoView:function(a,d,f,o){if((a=b.get(a))&&a[v]){o=o===p?true:!!o;f=f===p?true:!!f;if(!d||(d=b.get(d))===x)a.scrollIntoView(f);else{if(i(d,9))d=n(d);var t=!!n(d),u=b.offset(a),A=t?{left:b.scrollLeft(d),top:b.scrollTop(d)}:b.offset(d),D={left:u[z]-A[z],top:u[q]-A[q]};u=t?b.viewportHeight(d):d.clientHeight;t=t?b.viewportWidth(d):d.clientWidth;A=b[h](d);var E=b[s](d),F=A+t,J=E+u,H=a.offsetHeight;a=a.offsetWidth;var G=D.left+A-(r(b.css(d,"borderLeftWidth"))||0);D=D.top+E-(r(b.css(d,"borderTopWidth"))||
0);var K=G+a,I=D+H,L,M;if(H>u||D<E||f)L=D;else if(I>J)L=I-u;if(o)if(a>t||G<A||f)M=G;else if(K>F)M=K-t;b[s](d,L);b[h](d,M)}}},docWidth:0,docHeight:0,viewportHeight:0,viewportWidth:0});l.each(["Left","Top"],function(a,d){var f="scroll"+a;b[f]=function(o,t){if(l.isNumber(o))arguments.callee(x,o);else{o=b.get(o);var u=0,A=n(o);if(A){if(t!==p){u=a=="Left"?t:b.scrollLeft(A);var D=a=="Top"?t:b.scrollTop(A);A.scrollTo(u,D)}u=A.document;u=A[d?"pageYOffset":"pageXOffset"]||u.documentElement[f]||u.body[f]}else if(y(o=
b.get(o)))u=t!==p?o[f]=t:o[f];return t===p?u:p}}});l.each(["Width","Height"],function(a){b["doc"+a]=function(d){d=b.get(d);d=n(d).document;return k(d.documentElement["scroll"+a],d.body["scroll"+a],b["viewport"+a](d))};b["viewport"+a]=function(d){d=b.get(d);var f="inner"+a;d=n(d);var o=d.document;return f in d?d[f]:c?o.documentElement["client"+a]:o.body["client"+a]}});return b},{requires:["./base","ua"]});
KISSY.add("dom/selector",function(l,b,w){function p(c,k){var r,v,z=[],q;v=l.require("sizzle");k=C(k);if(l.isString(c))if(c.indexOf(",")!=-1){r=c.split(",");l.each(r,function(h){z.push.apply(z,l.makeArray(p(h,k)))})}else{c=l.trim(c);if(y.test(c)){if(v=B(c.slice(1),k))z=[v]}else if(r=i.exec(String(c))){v=r[1];q=r[2];r=r[3];if(k=v?B(v,k):k)if(r)if(!v||c.indexOf(m)!==-1)z=l.makeArray(n(r,q,k));else{if((v=B(v,k))&&b.hasClass(v,r))z=[v]}else if(q)z=x(q,k)}else if(v)z=v(c,k)}else if(c&&(l.isArray(c)||j(c)))z=
c;else if(c)z=[c];if(j(z))z=l.makeArray(z);z.each=function(h,s){return l.each(z,h,s)};return z}function C(c){if(c===w)c=g;else if(l.isString(c)&&y.test(c))c=B(c.slice(1),g);else if(l.isArray(c)||j(c))c=c[0]||null;else if(c&&c.nodeType!==1&&c.nodeType!==9)c=null;return c}function B(c,k){if(!k)return null;if(k.nodeType!==9)k=k.ownerDocument;return k.getElementById(c)}function x(c,k){return k.getElementsByTagName(c)}var g=document,j=b._isNodeList,m=" ",y=/^#[\w-]+$/,i=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;
(function(){var c=g.createElement("div");c.appendChild(g.createComment(""));if(c.getElementsByTagName("*").length>0)x=function(k,r){var v=l.makeArray(r.getElementsByTagName(k));if(k==="*"){for(var z=[],q=0,h=0,s;s=v[q++];)if(s.nodeType===1)z[h++]=s;v=z}return v}})();var n=g.getElementsByClassName?function(c,k,r){r=c=l.makeArray(r.getElementsByClassName(c));var v=0,z=0,q=c.length,h;if(k&&k!=="*"){r=[];for(k=k.toUpperCase();v<q;++v){h=c[v];if(h.tagName===k)r[z++]=h}}return r}:g.querySelectorAll?function(c,
k,r){return r.querySelectorAll((k?k:"")+"."+c)}:function(c,k,r){k=r.getElementsByTagName(k||"*");r=[];var v=0,z=0,q=k.length,h,s;for(c=m+c+m;v<q;++v){h=k[v];if((s=h.className)&&(m+s+m).indexOf(c)>-1)r[z++]=h}return r};l.mix(b,{query:p,get:function(c,k){return p(c,k)[0]||null},filter:function(c,k,r){var v=p(c,r),z=l.require("sizzle"),q,h,s,e=[];if(l.isString(k)&&(q=i.exec(k))&&!q[1]){h=q[2];s=q[3];k=function(a){return!(h&&a.tagName.toLowerCase()!==h.toLowerCase()||s&&!b.hasClass(a,s))}}if(l.isFunction(k))e=
l.filter(v,k);else if(k&&z)e=z._filter(c,k,r);return e},test:function(c,k,r){c=p(c,r);return c.length&&b.filter(c,k,r).length===c.length}});return b},{requires:["dom/base"]});
KISSY.add("dom/style-ie",function(l,b,w,p,C){if(!w.ie)return b;p=document;var B=p.documentElement,x=b._CUSTOM_STYLES,g=/^-?\d+(?:px)?$/i,j=/^-?\d/,m=/^(?:width|height)$/;try{if(B.style.opacity==C&&B.filters)x.opacity={get:function(c){var k=100;try{k=c.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(r){try{k=c.filters("alpha").opacity}catch(v){if(c=((c.currentStyle||0).filter||"").match(/alpha\(opacity[=:]([^)]+)\)/))k=parseInt(l.trim(c[1]))}}return k/100+""},set:function(c,k){var r=c.style,
v=(c.currentStyle||0).filter||"";r.zoom=1;if(v)v=l.trim(v.replace(/alpha\(opacity[^=]*=[^)]+\),?/ig,""));if(v&&k!=1)v+=", ";r.filter=v+(k!=1?"alpha(opacity="+k*100+")":"")}}}catch(y){}w=w.ie==8;var i={},n={get:function(c,k){var r=c.currentStyle[k]+"";if(r.indexOf("px")<0)r=i[r]?i[r]:0;return r}};i.thin=w?"1px":"2px";i.medium=w?"3px":"4px";i.thick=w?"5px":"6px";l.each(["","Top","Left","Right","Bottom"],function(c){x["border"+c+"Width"]=n});if(!(p.defaultView||{}).getComputedStyle&&B.currentStyle)b._getComputedStyle=
function(c,k){var r=c.style,v=c.currentStyle[k];if(m.test(k))v=b[k](c)+"px";else if(!g.test(v)&&j.test(v)){var z=r.left,q=c.runtimeStyle.left;c.runtimeStyle.left=c.currentStyle.left;r.left=k==="fontSize"?"1em":v||0;v=r.pixelLeft+"px";r.left=z;c.runtimeStyle.left=q}return v};return b},{requires:["./base","ua","./style"]});
KISSY.add("dom/style",function(l,b,w,p){function C(q,h){var s=b.get(q);if(l.isWindow(s))return h==m?b.viewportWidth(s):b.viewportHeight(s);else if(s.nodeType==9)return h==m?b.docWidth(s):b.docHeight(s);var e=h===m?s.offsetWidth:s.offsetHeight;l.each(h===m?["Left","Right"]:["Top","Bottom"],function(a){e-=parseFloat(b._getComputedStyle(s,"padding"+a))||0;e-=parseFloat(b._getComputedStyle(s,"border"+a+"Width"))||0});return e}function B(q,h,s){var e=s;if(s===y&&n.test(h)){e=0;if(l.inArray(b.css(q,"position"),
["absolute","fixed"])){s=q[h==="left"?"offsetLeft":"offsetTop"];if(j&&document.documentMode!=9||w.opera)s-=q.offsetParent["client"+(h=="left"?"Left":"Top")]||0;e=s-(i(b.css(q,"margin-"+h))||0)}}return e}var x=document,g=x.documentElement,j=w.ie,m="width",y="auto",i=parseInt,n=/^(?:left|top)/,c=/^(?:width|height|top|left|right|bottom|margin|padding)/i,k=/-([a-z])/ig,r=function(q,h){return h.toUpperCase()},v={},z={};l.mix(b,{_CUSTOM_STYLES:v,_getComputedStyle:function(q,h){var s="",e=q.ownerDocument;
if(q.style)s=e.defaultView.getComputedStyle(q,null)[h];return s},css:function(q,h,s){if(l.isPlainObject(h))for(var e in h)b.css(q,e,h[e]);else{if(h.indexOf("-")>0)h=h.replace(k,r);e=h;h=v[h]||h;if(s===p){q=b.get(q);var a="";if(q&&q.style){a=h.get?h.get(q,e):q.style[h];if(a===""&&!h.get)a=B(q,h,b._getComputedStyle(q,h))}return a===p?"":a}else{if(s===null||s==="")s="";else if(!isNaN(new Number(s))&&c.test(h))s+="px";(h===m||h==="height")&&parseFloat(s)<0||l.each(b.query(q),function(d){if(d&&d.style){h.set?
h.set(d,s):d.style[h]=s;if(s==="")d.style.cssText||d.removeAttribute("style")}})}}},width:function(q,h){if(h===p)return C(q,m);else b.css(q,m,h)},height:function(q,h){if(h===p)return C(q,"height");else b.css(q,"height",h)},show:function(q){b.query(q).each(function(h){if(h){h.style.display=b.data(h,"display")||"";if(b.css(h,"display")==="none"){var s=h.tagName,e=z[s],a;if(!e){a=x.createElement(s);x.body.appendChild(a);e=b.css(a,"display");b.remove(a);z[s]=e}b.data(h,"display",e);h.style.display=e}}})},
hide:function(q){b.query(q).each(function(h){if(h){var s=h.style,e=s.display;if(e!=="none"){e&&b.data(h,"display",e);s.display="none"}}})},toggle:function(q){b.query(q).each(function(h){if(h)b.css(h,"display")==="none"?b.show(h):b.hide(h)})},addStyleSheet:function(q,h,s){if(l.isString(q)){s=h;h=q;q=window}q=b.get(q);q=b._getWin(q).document;var e;if(s&&(s=s.replace("#","")))e=b.get("#"+s,q);if(!e){e=b.create("<style>",{id:s},q);b.get("head",q).appendChild(e);if(e.styleSheet)e.styleSheet.cssText=h;
else e.appendChild(q.createTextNode(h))}},unselectable:function(q){b.query(q).each(function(h){if(h)if(w.gecko)h.style.MozUserSelect="none";else if(w.webkit)h.style.KhtmlUserSelect="none";else if(w.ie||w.opera){var s=0,e=h.getElementsByTagName("*");for(h.setAttribute("unselectable","on");h=e[s++];)switch(h.tagName.toLowerCase()){case "iframe":case "textarea":case "input":case "select":break;default:h.setAttribute("unselectable","on")}}})}});if(g.style.cssFloat!==p)v["float"]="cssFloat";else if(g.style.styleFloat!==
p)v["float"]="styleFloat";return b},{requires:["dom/base","ua"]});
KISSY.add("dom/traversal",function(l,b,w){function p(g,j,m,y,i,n){if(!(g=b.get(g)))return null;if(j===0)return g;n||(g=g[m]);if(!g)return null;i=i&&b.get(i)||null;if(j===w)j=1;n=[];var c=l.isArray(j),k,r;if(l.isNumber(j)){k=0;r=j;j=function(){return++k===r}}do if(x(g)&&C(g,j)&&(!y||y(g))){n.push(g);if(!c)break}while(g!=i&&(g=g[m]));return c?n:n[0]||null}function C(g,j){if(!j)return true;if(l.isArray(j))for(var m=0;m<j.length;m++){if(b.test(g,j[m]))return true}else if(b.test(g,j))return true;return false}
function B(g,j,m){var y=[];var i=g=b.get(g);if(g&&m)i=g.parentNode;if(i){m=0;for(i=i.firstChild;i;i=i.nextSibling)if(x(i)&&i!==g&&(!j||b.test(i,j)))y[m++]=i}return y}var x=b._isElementNode;l.mix(b,{closest:function(g,j,m){return p(g,j,"parentNode",function(y){return y.nodeType!=11},m,true)},parent:function(g,j,m){return p(g,j,"parentNode",function(y){return y.nodeType!=11},m)},next:function(g,j){return p(g,j,"nextSibling",w)},prev:function(g,j){return p(g,j,"previousSibling",w)},siblings:function(g,
j){return B(g,j,true)},children:function(g,j){return B(g,j,w)},contains:document.documentElement.contains?function(g,j){g=b.get(g);j=b.get(j);if(g.nodeType==3)return false;var m;if(j.nodeType==3){j=j.parentNode;m=true}else if(j.nodeType==9)return false;else m=g!==j;return m&&(g.contains?g.contains(j):true)}:document.documentElement.compareDocumentPosition?function(g,j){g=b.get(g);j=b.get(j);return!!(g.compareDocumentPosition(j)&16)}:0,equals:function(g,j){g=b.query(g);j=b.query(j);if(g.length!=j.length)return false;
for(var m=g.length;m>=0;m--)if(g[m]!=j[m])return false;return true}});return b},{requires:["./base"]});KISSY.add("dom",function(l,b){return b},{requires:["dom/attr","dom/class","dom/create","dom/data","dom/insertion","dom/offset","dom/style","dom/selector","dom/style-ie","dom/traversal"]});