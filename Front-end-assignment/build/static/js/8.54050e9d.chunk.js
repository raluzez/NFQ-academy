(window["webpackJsonpnfq-academy"]=window["webpackJsonpnfq-academy"]||[]).push([[8],{111:function(e,a,t){"use strict";var n=t(3);a.__esModule=!0,a.default=void 0;var r=n(t(9)),i=n(t(17)),s=n(t(18)),c=n(t(0)),o=t(21),l=n(t(61)),d=c.default.forwardRef((function(e,a){var t=e.bsPrefix,n=e.variant,d=e.size,u=e.active,m=e.className,f=e.block,p=e.type,v=e.as,b=(0,i.default)(e,["bsPrefix","variant","size","active","className","block","type","as"]),h=(0,o.useBootstrapPrefix)(t,"btn"),y=(0,s.default)(m,h,u&&"active",h+"-"+n,f&&h+"-block",d&&h+"-"+d);if(b.href)return c.default.createElement(l.default,(0,r.default)({},b,{as:v,ref:a,className:(0,s.default)(y,b.disabled&&"disabled")}));a&&(b.ref=a),v||(b.type=p);var k=v||"button";return c.default.createElement(k,(0,r.default)({},b,{className:y}))}));d.displayName="Button",d.defaultProps={variant:"primary",active:!1,disabled:!1,type:"button"};var u=d;a.default=u,e.exports=a.default},134:function(e,a,t){e.exports={CheckNumberContainer:"Admin_CheckNumberContainer__32eNF",CheckNumberHeader:"Admin_CheckNumberHeader__23RqO",Body:"Admin_Body__BzqOT"}},140:function(e,a,t){"use strict";t.r(a);var n=t(27),r=t(28),i=t(30),s=t(29),c=t(31),o=t(0),l=t.n(o),d=t(19),u=t(22),m=t(111),f=t.n(m),p=t(32),v=t.n(p),b=t(40),h=t.n(b),y=t(134),k=t.n(y),N=function(e){function a(){return Object(n.a)(this,a),Object(i.a)(this,Object(s.a)(a).apply(this,arguments))}return Object(c.a)(a,e),Object(r.a)(a,[{key:"componentDidMount",value:function(){this.props.onFecthServedPatients()}},{key:"render",value:function(){var e=this,a=l.a.createElement("div",{style:{display:"flex",alignItems:"center",height:"50vh",justifyContent:"center"}},l.a.createElement(h.a,{animation:"grow"}));return this.props.loading||(a=l.a.createElement("div",{style:{height:"100%","margin-right":"-50px","padding-right":"50px",overflowY:"scroll"}},(this.props.data||[]).map((function(a,t){return l.a.createElement(v.a,{className:k.a.CheckNumberContainer,key:a.name},l.a.createElement(v.a.Header,{className:k.a.CheckNumberHeader,style:{borderRadius:"0"}},a.name.toUpperCase()),l.a.createElement(v.a.Body,{className:k.a.Body},e.props.servedPatients[t].slice(-5).map((function(e){return l.a.createElement(f.a,{key:e.key,variant:"primary",size:"lg",disabled:!0},"".concat(e.name," vizito trukm\u0117 ").concat(e.timeLeft," min"))})),l.a.createElement(f.a,{variant:"outline-success",size:"lg"},"Specialisto Statistika")))})))),l.a.createElement(l.a.Fragment,null,a)}}]),a}(o.Component);a.default=Object(d.b)((function(e){return{loading:e.main.loading,data:e.main.data,servedPatients:e.main.servedPatients}}),(function(e){return{onFecthServedPatients:function(){return e(u.h())}}}))(N)}}]);
//# sourceMappingURL=8.54050e9d.chunk.js.map