(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,o){e.exports=o(25)},,,,,,function(e,t,o){},function(e,t,o){},function(e,t,o){},function(e,t,o){},,,,function(e,t,o){"use strict";o.r(t);var a=o(7),n=o(1),r=o(2),c=function(){function e(){Object(n.a)(this,e),this.levelOneNodes=[],this.initialDepth=null}return Object(r.a)(e,[{key:"countLegalMoves",value:function(e){for(var t=e.p1Location,o=[0,0],n=0;n<2;n++){for(var r=[[1,t.row+2,t.col+1],[2,t.row+2,t.col-1],[3,t.row-2,t.col+1],[4,t.row-2,t.col-1],[5,t.row+1,t.col-2],[6,t.row-1,t.col-2],[7,t.row+1,t.col+2],[8,t.row-1,t.col+2]],c=0;c<r.length;c++){var l=Object(a.a)(r[c],2),i=l[0],s=l[1];i>=0&&i<7&&s>=0&&s<7&&null===e.squares[i][s]&&o[n]++}t=e.p2Location}return o}},{key:"checkGameOver",value:function(e){var t=this.countLegalMoves(e),o=!1;return t[0]?t[1]||(o="\ud83e\udd84"):o="\ud83d\udc34",o}},{key:"SEF",value:function(e){var t=this.countLegalMoves(e);return t[0]-t[1]}},{key:"getChildren",value:function(e,t){for(var o,n=[],r=[[(o=t?e.p1Location:e.p2Location).row+2,o.col+1],[o.row+2,o.col-1],[o.row-2,o.col+1],[o.row-2,o.col-1],[o.row+1,o.col-2],[o.row-1,o.col-2],[o.row+1,o.col+2],[o.row-1,o.col+2]],c=0;c<r.length;c++){var l=Object(a.a)(r[c],2),i=l[0],s=l[1];if(i>=0&&i<7&&s>=0&&s<7&&null===e.squares[i][s])if(t){var u={squares:e.squares.map(function(e){return e.slice()}),p1Location:{row:i,col:s},p2Location:{row:e.p2Location.row,col:e.p2Location.col}};u.squares[o.row][o.col]="@",u.squares[i][s]="\ud83e\udd84",n.push(u)}else{var h={squares:e.squares.map(function(e){return e.slice()}),p1Location:{row:e.p1Location.row,col:e.p1Location.col},p2Location:{row:i,col:s}};h.squares[o.row][o.col]="@",h.squares[i][s]="\ud83d\udc34",n.push(h)}}return n}},{key:"minimax",value:function(e,t,o){var a=this;if(null===this.initialDepth&&(this.initialDepth=t),0===t||this.checkGameOver(e))return this.SEF(e);var n=this.getChildren(e,o);if(o){var r=-1/0;return n.forEach(function(e){var o=a.minimax(e,t-1,!1);r=Math.max(r,o),t===a.initialDepth&&a.levelOneNodes.push({state:e,eval:o})}),r}var c=1/0;return n.forEach(function(e){var o=a.minimax(e,t-1,!0);c=Math.min(c,o),t===a.initialDepth&&a.levelOneNodes.push({state:e,eval:o})}),c}},{key:"getMove",value:function(e){return 0!==this.levelOneNodes.length&&this.levelOneNodes.find(function(t){return t.eval===e})}}]),e}();t.default=c},function(e,t,o){},function(e,t,o){"use strict";o.r(t);var a=o(0),n=o.n(a),r=o(9),c=o.n(r),l=(o(16),o(1)),i=o(2),s=o(5),u=o(4),h=o(6),v=o(7);o(17);var p=function(e){return n.a.createElement("button",{className:e.squareColor,onClick:e.onClick},e.value)},w=(o(18),function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"renderSquare",value:function(e,t){var o=this,a="oddSquare",r=this.props.squares[e][t];return"@"===r?(a="usedSquare",r=null):e%2===0?t%2===0&&(a="evenSquare"):t%2!==0&&(a="evenSquare"),n.a.createElement(p,{key:Math.random(),value:r,onClick:function(){return o.props.onClick(e,t)},squareColor:a})}},{key:"createBoard",value:function(){for(var e=[],t=0;t<7;t++){for(var o=[],a=0;a<7;a++)o.push(this.renderSquare(t,a));e.push(n.a.createElement("div",{key:t,className:"board-row"},o))}return e}},{key:"render",value:function(){return n.a.createElement("div",null,this.createBoard())}}]),t}(a.Component)),f=(o(19),o(3)),m=o(23).default,d=function(e){function t(e){var o;return Object(l.a)(this,t),(o=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={squares:Array(7).fill(null).map(function(){return Array(7).fill(null)}),p1IsNext:!0,p1Location:{row:null,col:null},p2Location:{row:null,col:null}},o}return Object(h.a)(t,e),Object(i.a)(t,[{key:"calculateWinner",value:function(){var e=this.state.p1Location,t=[0,0];if(Object(f.isNull)(this.state.p1Location.row)&&Object(f.isNull)(this.state.p1Location.col)||Object(f.isNull)(this.state.p2Location.row)&&Object(f.isNull)(this.state.p2Location.col))return!1;for(var o=0;o<2;o++){for(var a=[[1,e.row+2,e.col+1],[2,e.row+2,e.col-1],[3,e.row-2,e.col+1],[4,e.row-2,e.col-1],[5,e.row+1,e.col-2],[6,e.row-1,e.col-2],[7,e.row+1,e.col+2],[8,e.row-1,e.col+2]],n=0;n<a.length;n++){var r=Object(v.a)(a[n],3),c=r[0],l=r[1],i=r[2];l>=0&&l<7&&i>=0&&i<7&&(console.log("n => ",c," a: ",l," b: ",i),Object(f.isNull)(this.state.squares[l][i])&&t[o]++)}e=this.state.p2Location}console.log("IsAvailable: ",t[0]," ",t[1]);var s=!1;return t[0]?t[1]||(s="\ud83e\udd84"):s="\ud83d\udc34",s}},{key:"checkIfMoveLegal",value:function(e,t){var o=this.state.p1IsNext?this.state.p1Location:this.state.p2Location;if(Object(f.isNull)(o.row)&&Object(f.isNull)(o.col))return!1;for(var a=[[o.row+2,o.col+1],[o.row+2,o.col-1],[o.row-2,o.col+1],[o.row-2,o.col-1],[o.row+1,o.col-2],[o.row-1,o.col-2],[o.row+1,o.col+2],[o.row-1,o.col+2]],n=0;n<a.length;n++){var r=Object(v.a)(a[n],2),c=r[0],l=r[1];if(e===c&&t===l)return!1}return!0}},{key:"handleClick",value:function(e,t){var o=this.state.squares,a=this.state.p1Location,n=this.state.p2Location;this.calculateWinner()||o[e][t]||this.checkIfMoveLegal(e,t)||(this.state.p1IsNext?(o[e][t]="\ud83e\udd84",null!==a.row&&null!==a.col&&(o[a.row][a.col]="@"),this.setState({squares:o,p1IsNext:!this.state.p1IsNext,p1Location:{row:e,col:t}})):(o[e][t]="\ud83d\udc34",null!==n.row&&null!==n.col&&(o[n.row][n.col]="@"),this.setState({squares:o,p1IsNext:!this.state.p1IsNext,p2Location:{row:e,col:t}})))}},{key:"moveAi",value:function(){var e=new m,t=e.getMove(e.minimax(this.state,8,!0));t&&this.setState({squares:t.state.squares,p1IsNext:!this.state.p1IsNext,p1Location:{row:t.state.p1Location.row,col:t.state.p1Location.col}})}},{key:"render",value:function(){var e,t=this,o=this.calculateWinner();return this.state.p1IsNext&&!o&&(null!==this.state.p1Location.row&&null!==this.state.p1Location.col||null!==this.state.p2Location.row&&null!==this.state.p2Location.col)&&this.moveAi(),e=o?"Winner ".concat(o):"".concat(this.state.p1IsNext?"\ud83e\udd84":"\ud83d\udc34","'s Turn"),n.a.createElement("div",{className:"game"},n.a.createElement("div",{className:"game-info"},n.a.createElement("div",{className:"game-name"},"The Isolation Game"),n.a.createElement("div",null,e)),n.a.createElement("div",{className:"game-board"},n.a.createElement(w,{squares:this.state.squares,onClick:function(e,o){return t.handleClick(e,o)}})))}}]),t}(a.Component),L=(o(24),function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},n.a.createElement(d,null)))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,1,2]]]);
//# sourceMappingURL=main.d6530cbd.chunk.js.map