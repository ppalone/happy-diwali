parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A2T1":[function(require,module,exports) {
function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var n=0;n<i.length;n++){var e=i[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function n(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}var e=document.querySelector("#canvas");e.width=window.innerWidth,e.height=window.innerHeight;var a=window.innerWidth,o=window.innerHeight,h=e.getContext("2d"),r=[],s=[],l=.005,c=.999,u=function(){function i(n,e,a){t(this,i),this.x=n,this.y=o,this.fx=n,this.fy=e,this.speed=5,this.blown=!1,this.color=a}return n(i,[{key:"update",value:function(){if(this.draw(),this.y<this.fy){this.blown=!0;for(var t=2*Math.PI/200,i=0;i<200;i++)s.push(new f(this.x,this.y,this.color,{x:Math.cos(t*i)*Math.random(),y:Math.sin(t*i)*Math.random()}))}else this.y-=this.speed}},{key:"draw",value:function(){h.fillStyle=this.color,h.fill(),h.fillRect(this.x-1,this.y,2,4)}}]),i}(),f=function(){function i(n,e,a,o){t(this,i),this.x=n,this.y=e,this.color=a,this.velocity=o,this.alpha=1}return n(i,[{key:"draw",value:function(){h.save(),h.globalAlpha=Math.max(this.alpha,0),h.beginPath(),h.arc(this.x,this.y,2,0,2*Math.PI,!1),h.fillStyle=this.color,h.strokeStyle="transparent",h.fill(),h.stroke(),h.restore()}},{key:"update",value:function(){this.velocity.x*=c,this.velocity.y+=l,this.x+=this.velocity.x,this.y+=this.velocity.y,this.alpha-=.005,this.draw()}}]),i}();function y(){h.fillStyle="rgba(0, 0, 0, 0.50)",h.fillRect(0,0,a,o),r.forEach(function(t,i){t.blown?r.splice(i,1):t.update()}),s.forEach(function(t,i){t.alpha<0?s.splice(i,1):t.update()}),requestAnimationFrame(y)}y(),setInterval(function(){var t={x:Math.random()*a,y:Math.random()*o/2},i="rgb(".concat(255*Math.random(),", ").concat(255*Math.random(),", ").concat(255*Math.random(),")");r.push(new u(t.x,t.y,i)),console.log(r)},2e3);
},{}]},{},["A2T1"], null)
//# sourceMappingURL=app.5b18f223.js.map