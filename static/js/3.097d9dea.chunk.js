(this.webpackJsonpalgovis=this.webpackJsonpalgovis||[]).push([[3],{57:function(t,e,n){"use strict";function o(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},i=Object.keys(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}n.r(e);var r=n(0),i=n.n(r),c=n(6),a=n(7),g=n(1),l=n(11);e.default=function(t){var e=t.i,n=t.j,u=t.LeftButtonDown,j=o(t,["i","j","LeftButtonDown"]),b=Object(c.d)((function(t){return t.graph.size})),s=Object(c.d)((function(t){return e<b&&n<b?t.graph.graph[e][n]:g.a}),c.b),m=Object(c.d)((function(t){return{movingStart:t.graph.movingStart,movingTarget:t.graph.movingTarget}}),c.b),O=m.movingStart,f=m.movingTarget,v=Object(c.d)((function(t){return{movingPortal1:t.graph.movingPortal1,movingPortal2:t.graph.movingPortal2}}),c.b),p=v.movingPortal1,d=v.movingPortal2,h=Object(c.d)((function(t){return t.theme.animation})),w=(Object(c.d)((function(t){return t.theme.animationSpeed}),c.b),Object(c.c)()),P=Object(r.useRef)(null),y=function(){O?w(Object(a.g)({i:e,j:n})):f?w(Object(a.h)({i:e,j:n})):p?w(Object(a.e)({i:e,j:n})):d?w(Object(a.f)({i:e,j:n})):s==g.a||s==g.c||s==g.b||s==g.e||s==g.f?w(h?Object(a.q)({i:e,j:n}):Object(a.d)({i:e,j:n})):s!=g.l&&s!=g.k||w(Object(a.m)({i:e,j:n}))};return Object(r.useEffect)((function(){if(s==g.l){var t=(new Date).getTime()+300;window.requestAnimationFrame((function o(){(new Date).getTime()>t?w(Object(a.d)({i:e,j:n})):window.requestAnimationFrame(o)}))}}),[s]),i.a.createElement("div",{onMouseOver:function(t){u.current&&"Trigger"==t.target.className&&y()},onMouseDown:function(t){u.current||0!=t.button||"Trigger"!=t.target.className&&"rect"!=t.target.tagName||(s==g.i?(console.log("moving start"),w(Object(a.k)(!0))):s==g.j?(console.log("moving target"),w(Object(a.l)(!0))):s==g.g?(console.log("moving portal1"),w(Object(a.i)(!0))):s==g.h?(console.log("moving portal2"),w(Object(a.j)(!0))):y())},onMouseUp:function(){O&&(console.log("stoped moving"),w(Object(a.k)(!1))),f&&(console.log("stoped moving"),w(Object(a.l)(!1))),p&&(console.log("stoped moving"),w(Object(a.i)(!1))),d&&(console.log("stoped moving"),w(Object(a.j)(!1)))}},i.a.createElement(l.a,Object.assign({},j,{val:s,Ref:P})))}}}]);
//# sourceMappingURL=3.097d9dea.chunk.js.map