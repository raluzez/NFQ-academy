(window["webpackJsonpnfq-academy"]=window["webpackJsonpnfq-academy"]||[]).push([[6],{132:function(e,t,a){},133:function(e,t,a){e.exports={CheckNumberContainer:"User_CheckNumberContainer__1gj4I",CheckNumberHeader:"User_CheckNumberHeader__1luhX",Form:"User_Form__pOEwp",Arrow:"User_Arrow__3hPl9",Day:"User_Day__32uU0"}},139:function(e,t,a){"use strict";a.r(t);var n=a(27),r=a(28),i=a(30),s=a(29),c=a(31),l=a(0),o=a.n(l),m=a(19),u=a(13),d=a(128),h=a(130),g=a(131),p=a.n(g),b=(a(132),a(111)),k=a.n(b),f=a(32),C=a.n(f),y=a(114),E=a.n(y),N=a(133),w=a.n(N),v=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(c)))).state={numberChecked:null,timeLeft:null,input:null,isRegistration:!1,dayClicked:!1},a.numberHandler=function(e){a.setState({input:e.target.value})},a.checkNumber=function(){var e=!1;a.props.data.map((function(t){return t.clients.map((function(t){return t.name===Number(a.state.input)&&(a.setState({timeLeft:t.timeLeft,numberChecked:t.name}),e=!0),a.state.timeLeft}))})),e||a.setState({timeLeft:!1,numberChecked:a.state.input})},a.dateClick=function(e){a.setState({dateClicked:e.dateStr})},a.registrationHandler=function(e){a.setState({isRegistration:e})},a.backHandler=function(){a.setState({isRegistration:!1})},a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=null;this.state.timeLeft&&(t=o.a.createElement(k.a,{variant:"success",size:"lg",style:{width:"100%",marginBottom:"5%",marginTop:"2.5%"},disabled:!0},"".concat(this.state.numberChecked," liko laukti ").concat(Math.ceil(this.state.timeLeft)," min"))),!1===this.state.timeLeft&&(t=o.a.createElement(k.a,{variant:"danger",size:"lg",style:{width:"100%",marginBottom:"5%",marginTop:"2.5%"},disabled:!0},o.a.createElement("p",null,"".concat(this.state.numberChecked," vizito \u0161iandien n\u0117ra")),o.a.createElement("p",null,"Prisijunkite nor\u0117dami su\u017einoti daugiau")));var a=o.a.createElement(C.a,{className:w.a.CheckNumberContainer},o.a.createElement(C.a.Header,{className:w.a.CheckNumberHeader,style:{borderRadius:"0"}},"PATIKRINT LAIK\u0104"),o.a.createElement(C.a.Body,null,o.a.createElement(E.a,{className:w.a.Form},t,o.a.createElement(E.a.Control,{size:"lg",type:"text",placeholder:"Numeris",onChange:this.numberHandler,required:!0}),o.a.createElement(k.a,{variant:"outline-success",size:"lg",style:{marginTop:"0%"},onClick:this.checkNumber},"Patikrinti"),o.a.createElement(k.a,{as:u.b,to:"/login",variant:"outline-primary",size:"lg",style:{marginTop:"5%",width:"50%"}},"Prisijungti"))));return this.props.token&&(a=o.a.createElement(o.a.Fragment,null,o.a.createElement(C.a,{className:w.a.CheckNumberContainer},o.a.createElement(C.a.Header,{className:w.a.CheckNumberHeader,style:{borderRadius:"0"}},"REGISTRUOTIS"),o.a.createElement(C.a.Body,null,this.props.data.map((function(t,a){return o.a.createElement(k.a,{key:t.name,variant:"outline-success",size:"lg",style:{width:"100%",marginBottom:"2.5%",marginTop:"2.5%"},onClick:function(){return e.registrationHandler(a)}},t.name)})))),o.a.createElement(C.a,{className:w.a.CheckNumberContainer},o.a.createElement(C.a.Header,{className:w.a.CheckNumberHeader,style:{borderRadius:"0"}},"J\u016aS\u0172 REGISTRACIJOS"),o.a.createElement(C.a.Body,null,this.props.userRegistrations?this.props.userRegistrations.map((function(e){return o.a.createElement(k.a,{variant:"success",size:"lg",style:{width:"100%",marginBottom:"2.5%",marginTop:"2.5%"},disabled:!0},e.name,o.a.createElement("i",{className:"fas fa-arrow-right ".concat(w.a.Arrow)}),e.date)})):o.a.createElement(k.a,{variant:"danger",size:"lg",style:{width:"100%",marginBottom:"2.5%",marginTop:"2.5%"},disabled:!0},"Registracij\u0173 nerasta"))))),(this.state.isRegistration||0===this.state.isRegistration)&&(a=o.a.createElement("div",{style:{width:"65%",margin:"auto",marginTop:"2.5%"}},o.a.createElement(d.a,{defaultView:"dayGridMonth",plugins:[h.a],locale:p.a,weekends:!1,customButtons:{myCustomButton:{text:"Gr\u012f\u017eti",click:function(){return e.backHandler()}}},header:{left:"myCustomButton,timeGridDay",center:"title",right:"prev,next"},dateClick:function(e){return console.log(e.dateStr)},events:[{start:"2019-09-24",end:"2019-09-25",rendering:"background",backgroundColor:"green"}]}))),o.a.createElement(o.a.Fragment,null,a)}}]),t}(l.Component);t.default=Object(m.b)((function(e){return{token:e.auth.token,data:e.main.data}}))(v)}}]);
//# sourceMappingURL=6.afe1ceb0.chunk.js.map