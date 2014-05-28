/*
 *  es6-module-loader v0.6.1
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Copyright (c) 2014 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */
!function(){var a,b,c,d;!function(){var e={},f={};a=function(a,b,c){e[a]={deps:b,callback:c}},d=c=b=function(a){function c(b){if("."!==b.charAt(0))return b;for(var c=b.split("/"),d=a.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(d._eak_seen=e,f[a])return f[a];if(f[a]={},!e[a])throw new Error("Could not find module "+a);for(var g,h=e[a],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)"exports"===i[l]?k.push(g={}):k.push(b(c(i[l])));var n=j.apply(this,k);return f[a]=g||n}}(),a("promise/all",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to all.");return new b(function(b,c){function d(a){return function(b){f(a,b)}}function f(a,c){h[a]=c,0===--i&&b(h)}var g,h=[],i=a.length;0===i&&b([]);for(var j=0;j<a.length;j++)g=a[j],g&&e(g.then)?g.then(d(j),c):f(j,g)})}var d=a.isArray,e=a.isFunction;b.all=c}),a("promise/asap",["exports"],function(a){"use strict";function b(){return function(){process.nextTick(e)}}function c(){var a=0,b=new i(e),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function d(){return function(){j.setTimeout(e,1)}}function e(){for(var a=0;a<k.length;a++){var b=k[a],c=b[0],d=b[1];c(d)}k=[]}function f(a,b){var c=k.push([a,b]);1===c&&g()}var g,h="undefined"!=typeof window?window:{},i=h.MutationObserver||h.WebKitMutationObserver,j="undefined"!=typeof global?global:void 0===this?window:this,k=[];g="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?b():i?c():d(),a.asap=f}),a("promise/config",["exports"],function(a){"use strict";function b(a,b){return 2!==arguments.length?c[a]:(c[a]=b,void 0)}var c={instrument:!1};a.config=c,a.configure=b}),a("promise/polyfill",["./promise","./utils","exports"],function(a,b,c){"use strict";function d(){var a;a="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;var b="Promise"in a&&"resolve"in a.Promise&&"reject"in a.Promise&&"all"in a.Promise&&"race"in a.Promise&&function(){var b;return new a.Promise(function(a){b=a}),f(b)}();b||(a.Promise=e)}var e=a.Promise,f=b.isFunction;c.polyfill=d}),a("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){if(!v(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof i))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],j(a,this)}function j(a,b){function c(a){o(b,a)}function d(a){q(b,a)}try{a(c,d)}catch(e){d(e)}}function k(a,b,c,d){var e,f,g,h,i=v(c);if(i)try{e=c(d),g=!0}catch(j){h=!0,f=j}else e=d,g=!0;n(b,e)||(i&&g?o(b,e):h?q(b,f):a===D?o(b,e):a===E&&q(b,e))}function l(a,b,c,d){var e=a._subscribers,f=e.length;e[f]=b,e[f+D]=c,e[f+E]=d}function m(a,b){for(var c,d,e=a._subscribers,f=a._detail,g=0;g<e.length;g+=3)c=e[g],d=e[g+b],k(b,c,d,f);a._subscribers=null}function n(a,b){var c,d=null;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(u(b)&&(d=b.then,v(d)))return d.call(b,function(d){return c?!0:(c=!0,b!==d?o(a,d):p(a,d),void 0)},function(b){return c?!0:(c=!0,q(a,b),void 0)}),!0}catch(e){return c?!0:(q(a,e),!0)}return!1}function o(a,b){a===b?p(a,b):n(a,b)||p(a,b)}function p(a,b){a._state===B&&(a._state=C,a._detail=b,t.async(r,a))}function q(a,b){a._state===B&&(a._state=C,a._detail=b,t.async(s,a))}function r(a){m(a,a._state=D)}function s(a){m(a,a._state=E)}var t=a.config,u=(a.configure,b.objectOrFunction),v=b.isFunction,w=(b.now,c.all),x=d.race,y=e.resolve,z=f.reject,A=g.asap;t.async=A;var B=void 0,C=0,D=1,E=2;i.prototype={constructor:i,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(a,b){var c=this,d=new this.constructor(function(){});if(this._state){var e=arguments;t.async(function(){k(c._state,d,e[c._state-1],c._detail)})}else l(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}},i.all=w,i.race=x,i.resolve=y,i.reject=z,h.Promise=i}),a("promise/race",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to race.");return new b(function(b,c){for(var d,e=0;e<a.length;e++)d=a[e],d&&"function"==typeof d.then?d.then(b,c):b(d)})}var d=a.isArray;b.race=c}),a("promise/reject",["exports"],function(a){"use strict";function b(a){var b=this;return new b(function(b,c){c(a)})}a.reject=b}),a("promise/resolve",["exports"],function(a){"use strict";function b(a){if(a&&"object"==typeof a&&a.constructor===this)return a;var b=this;return new b(function(b){b(a)})}a.resolve=b}),a("promise/utils",["exports"],function(a){"use strict";function b(a){return c(a)||"object"==typeof a&&null!==a}function c(a){return"function"==typeof a}function d(a){return"[object Array]"===Object.prototype.toString.call(a)}var e=Date.now||function(){return(new Date).getTime()};a.objectOrFunction=b,a.isFunction=c,a.isArray=d,a.now=e}),b("promise/polyfill").polyfill()}(),function(__global){function __eval(__source,__global,__moduleName){eval('var __moduleName = "'+(__moduleName||"").replace('"','"')+'"; with(__global) { (function() { '+__source+" \n }).call(__global); }")}!function(){function a(a){return{status:"loading",name:a,linkSets:[],dependencies:[],metadata:{}}}function b(a,b,c){return new x(g({step:c.address?"fetch":"locate",loader:a,moduleName:b,moduleMetadata:{},moduleSource:c.source,moduleAddress:c.address}))}function c(b,c,e,f){return new x(function(a){a(b.loaderObj.normalize(c,e,f))}).then(function(c){var e;if(b.modules[c])return{name:c};for(var f=0,g=b.loads.length;g>f;f++)if(e=b.loads[f],e.name==c)return e;return e=a(c),b.loads.push(e),d(b,e),e})}function d(a,b){e(a,b,x.resolve().then(function(){return a.loaderObj.locate({name:b.name,metadata:b.metadata})}))}function e(a,b,c){f(a,b,c.then(function(c){return"loading"==b.status?(b.address=c,a.loaderObj.fetch({name:b.name,metadata:b.metadata,address:c})):void 0}))}function f(a,b,d){d.then(function(c){return"loading"==b.status?a.loaderObj.translate({name:b.name,metadata:b.metadata,address:b.address,source:c}):void 0}).then(function(c){return"loading"==b.status?(b.source=c,a.loaderObj.instantiate({name:b.name,metadata:b.metadata,address:b.address,source:c})):void 0}).then(function(d){if("loading"==b.status){var e;if(void 0===d){if(!__global.traceur)throw new TypeError("Include Traceur for module syntax support");v=v||__global.traceur,b.address=b.address||"anon"+ ++B;try{var f=new v.syntax.Parser(new v.syntax.SourceFile(b.address,b.source)),g=f.parseModule();b.kind="declarative",e=t(g);var h=v.options.sourceMaps,j=v.options.modules;v.options.sourceMaps=!0,v.options.modules="instantiate";var k=new v.util.ErrorReporter;k.reportMessageInternal=function(a,b){throw new SyntaxError(b,a.start&&a.start.line_,a.start&&a.start.column_)};var l=__global.System;__global.System=__global.traceurSystem;var m=new v.codegeneration.module.AttachModuleNameTransformer(b.name).transformAny(g);m=new v.codegeneration.FromOptionsTransformer(k).transform(m);var n=new v.outputgeneration.SourceMapGenerator({file:b.address}),o={sourceMapGenerator:n},p=v.outputgeneration.TreeWriter.write(m,o);__global.btoa&&(p+="\n//# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(o.sourceMap)))+"\n");var q=System.register;System.register=function(a,c,d){b.declare="string"==typeof a?d:c},__eval(p,__global,b.name)}catch(r){throw("SyntaxError"==r.name||"TypeError"==r.name)&&(r.message="Evaluating "+(b.name||b.address)+"\n	"+r.message),q&&(System.register=q),l&&(__global.System=l),h&&(v.options.sourceMaps=h),j&&(v.options.modules=j),r}System.register=q,__global.System=l,v.options.sourceMaps=h,v.options.modules=j}else{if("object"!=typeof d)throw TypeError("Invalid instantiate return value");e=d.deps||[],b.execute=d.execute,b.kind="dynamic"}b.dependencies=[],b.depsList=e;for(var s=[],u=0,w=e.length;w>u;u++)(function(d){s.push(c(a,d,b.name,b.address).then(function(a){if(b.dependencies.push({key:d,value:a.name}),a.status&&"linked"!=a.status)for(var c=b.linkSets.concat([]),e=0,f=c.length;f>e;e++)i(c[e],a)}))})(e[u]);return x.all(s)}}).then(function(){b.status="loaded";for(var a=b.linkSets.concat([]),c=0,d=a.length;d>c;c++)j(a[c],b)})["catch"](function(a){b.status="failed",b.exception=a;for(var c=b.linkSets.concat([]),d=0,e=c.length;e>d;d++)k(c[d],a)})}function g(b){return function(c){var g=b.loader,i=b.moduleName,j=b.step;if(g.modules[i])throw new TypeError('"'+i+'" already exists in the module table');for(var k=0,l=g.loads.length;l>k;k++)if(g.loads[k].name==i)throw new TypeError('"'+i+'" already loading');var m=a(i);m.metadata=b.moduleMetadata;var n=h(g,m);g.loads.push(m),c(n.done),"locate"==j?d(g,m):"fetch"==j?e(g,m,x.resolve(b.moduleAddress)):(m.address=b.moduleAddress,f(g,m,x.resolve(b.moduleSource)))}}function h(a,b){var c={loader:a,loads:[],loadingCount:0};return c.done=new x(function(a,b){c.resolve=a,c.reject=b}),i(c,b),c}function i(a,b){for(var c=0,d=a.loads.length;d>c;c++)if(a.loads[c]==b)return;a.loads.push(b),b.linkSets.push(a),"loaded"!=b.status&&a.loadingCount++;for(var e=a.loader,c=0,d=b.dependencies.length;d>c;c++){var f=b.dependencies[c].value;if(!e.modules[f])for(var g=0,h=e.loads.length;h>g;g++)if(e.loads[g].name==f){i(a,e.loads[g]);break}}}function j(a,b){if(a.loadingCount--,!(a.loadingCount>0)){var c=a.loads[0];if(a.loader.loaderObj.execute===!1){for(var d=[].concat(a.loads),e=0;e<d.length;e++){var b=d[e];b.module="dynamic"==b.kind?{module:u({})}:{name:b.name,module:u({}),evaluated:!0},b.status="linked",l(a.loader,b)}return a.resolve(c)}try{n(a)}catch(f){return k(a,f)}a.resolve(c)}}function k(a,b){for(var c=a.loader,d=a.loads.concat([]),e=0,f=d.length;f>e;e++){var g=d[e];c.loaderObj.failed=c.loaderObj.failed||[],-1==c.loaderObj.failed.indexOf(g)&&c.loaderObj.failed.push(g);var h=z.call(g.linkSets,a);if(g.linkSets.splice(h,1),0==g.linkSets.length){var i=z.call(a.loader.loads,g);-1!=i&&a.loader.loads.splice(i,1)}}a.reject(b)}function l(a,b){if(a.loaderObj.trace){a.loaderObj.loads||(a.loaderObj.loads={});var c={};b.dependencies.forEach(function(a){c[a.key]=a.value}),a.loaderObj.loads[b.name]={name:b.name,deps:b.dependencies.map(function(a){return a.key}),depMap:c,address:b.address,metadata:b.metadata,source:b.source,kind:b.kind}}b.name&&(a.modules[b.name]=b.module);var d=z.call(a.loads,b);-1!=d&&a.loads.splice(d,1);for(var e=0,f=b.linkSets.length;f>e;e++)d=z.call(b.linkSets[e].loads,b),-1!=d&&b.linkSets[e].loads.splice(d,1);b.linkSets.splice(0,b.linkSets.length)}function m(a,b,c,d){if(c[a.groupIndex]=c[a.groupIndex]||[],-1==z.call(c[a.groupIndex],a)){c[a.groupIndex].push(a);for(var e=0;e<b.length;e++)for(var f=b[e],g=0;g<a.dependencies.length;g++)if(f.name==a.dependencies[g].value){var h=a.groupIndex+(f.kind!=a.kind);if(void 0===f.groupIndex||f.groupIndex<h){if(f.groupIndex&&(c[f.groupIndex].splice(c[f.groupIndex].indexOf(f),1),0==c[f.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");f.groupIndex=h}m(f,b,c,d)}}}function n(a){var b=a.loader,c=[],d=a.loads[0];d.groupIndex=0,m(d,a.loads,c,b);for(var e="declarative"==d.kind==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],h=0;h<g.length;h++){var i=g[h];if(e)o(i,a.loads,b);else{var j=i.execute();if(!j||!j.__esModule)throw new TypeError("Execution must define a Module instance");i.module={module:j},i.status="linked"}l(b,i)}e=!e}}function o(a,b,c){if(!a.module){var d=[],e=a.declare.call(__global,d),f=[],g=e.exports;a.module={name:a.name,dependencies:f,execute:e.execute,exports:g,evaluated:!1};for(var h=0;h<a.dependencies.length;h++){var i,j=a.dependencies[h].value;if(c.modules[j])i=c.modules[j];else for(var k=0;k<b.length;k++)b[k].name==j&&(b[k].module||o(b[k],b,c),i=b[k].module);var l=i.exports||i.module;e.exportStar&&-1!=z.call(e.exportStar,a.dependencies[h].key)&&!function(a){for(var b in a)(function(b){w(g,b,{enumerable:!0,get:function(){return a[b]},set:function(c){a[b]=c}})})(b)}(l),f.push(i),d[h]=l}a.status="linked"}}function p(a,b){return q(b.module,[],a),b.module.module}function q(a,b,c){if(!a.evaluated&&a.dependencies){b.push(a);for(var d=a.dependencies,e=0;e<d.length;e++){var f=d[e];-1==z.call(b,f)&&q(f,b,c)}a.evaluated||(a.evaluated=!0,a.execute.call(__global),a.module=u(a.exports),delete a.execute)}}function r(a){if("object"!=typeof a)throw new TypeError("Options must be an object");a.normalize&&(this.normalize=a.normalize),a.locate&&(this.locate=a.locate),a.fetch&&(this.fetch=a.fetch),a.translate&&(this.translate=a.translate),a.instantiate&&(this.instantiate=a.instantiate),this._loader={loaderObj:this,loads:[],modules:{}},w(this,"global",{get:function(){return __global}}),w(this,"realm",{get:function(){throw new TypeError("Realms not implemented in polyfill")}})}function s(a,b,c,d){var e,f;if(b(a,c,d)!==!1)for(e in a)a.hasOwnProperty(e)&&"location"!=e&&"type"!=e&&(f=a[e],"object"==typeof f&&null!==f&&s(f,b,a,e))}function t(a){function b(a){-1==z.call(c,a)&&c.push(a)}var c=[];return s(a,function(a){"EXPORT_DECLARATION"==a.type?a.declaration.moduleSpecifier&&b(a.declaration.moduleSpecifier.token.processedValue):"IMPORT_DECLARATION"==a.type?b(a.moduleSpecifier.token.processedValue):"MODULE_DECLARATION"==a.type&&b(a.expression.token.processedValue)}),c}function u(a){if("object"!=typeof a)throw new TypeError("Expected object");var b={__esModule:!0};for(var c in a)!function(c){w(b,c,{configurable:!1,enumerable:!0,get:function(){return a[c]}})}(c);return Object.preventExtensions&&Object.preventExtensions(b),b}var v,w,x=__global.Promise||require("es6-promise").Promise;try{Object.defineProperty({},"a",{})&&(w=Object.defineProperty)}catch(y){w=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}console.assert=console.assert||function(){};var z=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},A={};r.prototype={define:function(a,b,c){if(A[a])throw new TypeError("Module is already loading.");return A[a]=new x(g({step:c&&c.address?"fetch":"translate",loader:this._loader,moduleName:a,moduleMetadata:c&&c.metadata||{},moduleSource:b,moduleAddress:c&&c.address})),A[a].then(function(){delete A[a]})},load:function(a){return this._loader.modules[a]?(q(this._loader.modules[a],[],this._loader),x.resolve(this._loader.modules[a].module)):A[a]?A[a]:(A[a]=b(this._loader,a,{}),A[a].then(function(){delete A[a]}))},module:function(b,c){var d=a();d.address=c&&c.address;var e=h(this._loader,d),g=x.resolve(b),i=this._loader,j=e.done.then(function(){return p(i,d)});return f(i,d,g),j},"import":function(a,c){var d=this;return x.resolve(d.normalize(a,c&&c.name,c&&c.address)).then(function(a){var e=d._loader;return e.modules[a]?(q(e.modules[a],[],e._loader),x.resolve(e.modules[a].module)):(A[a]||(A[a]=b(e,a,c||{}))).then(function(b){return delete A[a],p(e,b)})})},eval:function(){throw new TypeError("Eval not implemented in polyfill")},get:function(a){return this._loader.modules[a]?(q(this._loader.modules[a],[],this),this._loader.modules[a].module):void 0},has:function(a){return!!this._loader.modules[a]},set:function(a,b){if(!b.__esModule)throw new TypeError("Set must be a module");this._loader.modules[a]={module:b}},"delete":function(a){return this._loader.modules[a]?delete this._loader.modules[a]:!1},entries:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},keys:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},values:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},normalize:function(a){return a},locate:function(a){return a.name},fetch:function(){throw new TypeError("Fetch not implemented")},translate:function(a){return a.source},instantiate:function(){}};var B=0;"object"==typeof exports&&(module.exports=r),__global.Reflect=__global.Reflect||{},__global.Reflect.Loader=__global.Reflect.Loader||r,__global.LoaderPolyfill=r,__global.Module=u}()}("undefined"!=typeof global?global:this),function(a){function b(a){var b=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return b?{href:b[0]||"",protocol:b[1]||"",authority:b[2]||"",host:b[3]||"",hostname:b[4]||"",port:b[5]||"",pathname:b[6]||"",search:b[7]||"",hash:b[8]||""}:null}function c(a,c){function d(a){var b=[];return a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)}),b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}return c=b(c||""),a=b(a||""),c&&a?(c.protocol||a.protocol)+(c.protocol||c.authority?c.authority:a.authority)+d(c.protocol||c.authority||"/"===c.pathname.charAt(0)?c.pathname:c.pathname?(a.authority&&!a.pathname?"/":"")+a.pathname.slice(0,a.pathname.lastIndexOf("/")+1)+c.pathname:a.pathname)+(c.protocol||c.authority||c.pathname?c.search:c.search||a.search)+c.hash:null}function d(){document.removeEventListener("DOMContentLoaded",d,!1),window.removeEventListener("load",d,!1),e()}function e(){for(var a=document.getElementsByTagName("script"),b=0;b<a.length;b++){var c=a[b];if("module"==c.type){var d=c.innerHTML;k.module(d)["catch"](function(a){setTimeout(function(){throw a})})}}}var f,g="undefined"!=typeof window,h=a.Reflect&&a.Reflect.Loader||require("./loader"),i=a.Promise||require("es6-promise").Promise;if(g)f=function(a,b,c){function d(){b(f.responseText)}function e(){c(f.statusText+": "+a||"XHR error")}var f=new XMLHttpRequest,g=!0;if(!("withCredentials"in f)){var h=/^(\w+:)?\/\/([^\/]+)/.exec(a);h&&(g=h[2]===window.location.host,h[1]&&(g&=h[1]===window.location.protocol))}g||(f=new XDomainRequest,f.onload=d,f.onerror=e,f.ontimeout=e),f.onreadystatechange=function(){4===f.readyState&&(200===f.status||0==f.status&&f.responseText?d():e())},f.open("GET",a,!0),f.send(null)};else{var j=require("fs");f=function(a,b,c){return j.readFile(a,function(a,d){return a?c(a):(b(d+""),void 0)})}}var k=new h({global:g?window:a,strict:!0,normalize:function(a,b){if("string"!=typeof a)throw new TypeError("Module name must be a string");var c=a.split("/");if(0==c.length)throw new TypeError("No module name provided");var d=0,e=!1,f=0;if("."==c[0]){if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');e=!0}else{for(;".."==c[d];)if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');d&&(e=!0),f=d}for(var g=d;g<c.length;g++){var h=c[g];if(""==h||"."==h||".."==h)throw new TypeError('Illegal module name "'+a+'"')}if(!e)return a;{var i=[],j=(b||"").split("/");j.length-1-f}return i=i.concat(j.splice(0,j.length-1-f)),i=i.concat(c.splice(d,c.length-d)),i.join("/")},locate:function(a){var b,d=a.name,e="";for(var f in this.paths){var g=f.split("*");if(g.length>2)throw new TypeError("Only one wildcard in a path is permitted");1==g.length?d==f&&f.length>e.length&&(e=f):d.substr(0,g[0].length)==g[0]&&d.substr(d.length-g[1].length)==g[1]&&(e=f,b=d.substr(g[0].length,d.length-g[1].length-g[0].length))}var h=this.paths[e];return b&&(h=h.replace("*",b)),c(this.baseURL,h)},fetch:function(a){return new i(function(b,d){f(c(this.baseURL,a.address),function(a){b(a)},d)})}});if(g){var l=window.location.href.split("#")[0].split("?")[0];k.baseURL=l.substring(0,l.lastIndexOf("/")+1)}else k.baseURL="./";if(k.paths={"*":"*.js"},a.System&&a.traceur&&(a.traceurSystem=a.System),g&&(a.System=k),g){var m=document.getElementsByTagName("script");m=m[m.length-1],"complete"===document.readyState?setTimeout(e):document.addEventListener&&(document.addEventListener("DOMContentLoaded",d,!1),window.addEventListener("load",d,!1)),m.getAttribute("data-init")&&window[m.getAttribute("data-init")]()}"object"==typeof exports&&(module.exports=k)}("undefined"!=typeof global?global:this);