(this.webpackJsonpwebcamera=this.webpackJsonpwebcamera||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){e.exports=n(33)},,,,,function(e,t,n){},,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(11),o=n.n(i),c=(n(19),n(4)),u=n.n(c),s=n(8),l=n(5),f=n(12),p=n(13);n(32);var h=function(){var e=Object(a.useRef)(null),t=Object(a.useRef)(null),n=Object(a.useRef)(null);return Object(a.useEffect)((function(){var a=e.current,r=t.current,i=function(e,t){e.forEach((function(e){e.score,e.part;var n=e.position,a=n.x,r=n.y;t.beginPath(),t.arc(a,r,3,0,2*Math.PI),t.fillStyle="red",t.fill()}))},o=function(e,t){var n=e.filter((function(e){var t=e.part;return["leftEye","rightEye","leftEar","rightEar"].includes(t)})),a=n.map((function(e){return e.position.x})),r=n.map((function(e){return e.position.y})),i=Math.max.apply(Math,Object(l.a)(a)),o=Math.min.apply(Math,Object(l.a)(a)),c=Math.max.apply(Math,Object(l.a)(r)),u=Math.min.apply(Math,Object(l.a)(r));t.beginPath(),t.moveTo(i,c),t.lineTo(i,u),t.lineTo(o,u),t.lineTo(o,c),t.fillStyle="black",t.fill()},c=function(){var e=Object(s.a)(u.a.mark((function e(){var t,s,l,h,d;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.current){e.next=4;break}e.t0=n.current,e.next=7;break;case 4:return e.next=6,f.a({});case 6:e.t0=e.sent;case 7:return t=e.t0,(s=r.getContext("2d")).drawImage(a,0,0),l=p.a.fromPixels(r),e.next=13,t.estimateMultiplePoses(l,{flipHorizontal:!1,maxDetections:5,scoreThreshold:.6,nmsRadius:20});case 13:h=e.sent,l.dispose(),(d=h.filter((function(e){return.5<e.score}))).forEach((function(e){var t=e.keypoints;return i(t,s)})),d.forEach((function(e){var t=e.keypoints;return o(t,s)})),requestAnimationFrame(c);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(function(){var e=Object(s.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=navigator,!(n=t.mediaDevices)||null===a){e.next=9;break}return a.style.display="none",e.next=5,n.getUserMedia({video:!0});case 5:a.srcObject=e.sent,a.onloadedmetadata=function(){r.width=a.videoWidth,r.height=a.videoHeight},a.onloadeddata=function(){return c()},a.play();case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),r.a.createElement("div",{className:"App"},r.a.createElement("video",{ref:e}),r.a.createElement("canvas",{ref:t}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[14,1,2]]]);
//# sourceMappingURL=main.acc111dd.chunk.js.map