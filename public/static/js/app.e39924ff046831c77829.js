webpackJsonp([9],{CX9a:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("7+uW"),r={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var i=e("VU/8")({name:"App"},r,!1,function(t){e("WV4p")},null,null).exports,a=e("/ocq"),s=e("lbHh"),l=e.n(s),c={data:function(){return{isLogin:l.a.get("token")}},methods:{logout:function(){l.a.remove("token"),location.reload()}}},u={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("el-menu",{staticClass:"navbar",attrs:{mode:"horizontal"}},[e("el-menu-item",{staticClass:"welcome-wrapper",attrs:{index:"1"}}),t._v(" "),e("el-dropdown",{staticClass:"avatar-container",attrs:{trigger:"click"}},[e("div",{staticClass:"avatar-wrapper"},[e("i",{staticClass:"el-icon-setting"}),t._v(" "),e("i",{staticClass:"el-icon-caret-bottom"})]),t._v(" "),e("el-dropdown-menu",{staticClass:"user-dropdown",attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",[e("router-link",{staticClass:"inlineBlock",attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),t.isLogin?e("el-dropdown-item",{attrs:{divided:""}},[e("span",{staticStyle:{display:"block"},on:{click:t.logout}},[t._v("LogOut")])]):e("el-dropdown-item",{attrs:{divided:""}},[e("span",{staticStyle:{display:"block"},on:{click:function(n){t.$router.push("/login")}}},[t._v("LogIn")])]),t._v(" "),t.isLogin?t._e():e("el-dropdown-item",{attrs:{divided:""}},[e("span",{staticStyle:{display:"block"},on:{click:function(n){t.$router.push("/registration")}}},[t._v("Join")])])],1)],1)],1)},staticRenderFns:[]};var d={render:function(){var t=this.$createElement,n=this._self._c||t;return n("el-scrollbar",{attrs:{"wrap-class":"scrollbar-wrapper"}},[n("el-menu",{attrs:{"show-timeout":200,"default-active":this.$route.path,mode:"vertical","background-color":"#304156","text-color":"#bfcbd9","active-text-color":"#409EFF",router:!0}},[n("el-menu-item",{attrs:{index:"0",route:{name:"HelloWorld"}}},[this._v("HOME")]),this._v(" "),n("el-menu-item",{attrs:{index:"1",route:{name:"NoticeList"}}},[this._v("NOTICE")]),this._v(" "),n("el-menu-item",{attrs:{index:"2",route:{name:"PopupRegister"}}},[this._v("POPUP")])],1)],1)},staticRenderFns:[]},p={components:{Navbar:e("VU/8")(c,u,!1,function(t){e("CX9a")},"data-v-ed8fa442",null).exports,Sidebar:e("VU/8")({},d,!1,null,null,null).exports}},m={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"app-wrapper"},[n("Sidebar",{staticClass:"sidebar-container"}),this._v(" "),n("div",{staticClass:"main-container"},[n("Navbar"),this._v(" "),n("section",{staticClass:"app-main"},[n("transition",{attrs:{name:"fade-transform",mode:"out-in"}},[n("router-view")],1)],1)],1)],1)},staticRenderFns:[]};var f=e("VU/8")(p,m,!1,function(t){e("kCdC")},null,null).exports,h={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  페이지를 찾을 수 없습니다\n")])},staticRenderFns:[]};var v=e("VU/8")({},h,!1,function(t){e("bFWL")},null,null).exports;o.default.use(a.a);var g=[{path:"/login",component:function(){return e.e(3).then(e.bind(null,"T+/8"))}},{path:"/",component:f,children:[{path:"/registration",name:"Registration",component:function(){return e.e(6).then(e.bind(null,"KwhX"))}}]},{path:"/",component:f,redirect:"/helloWorld",name:"HelloWorld",hidden:!0,children:[{path:"/helloWorld",component:function(){return e.e(5).then(e.bind(null,"q/3a"))}}]},{path:"/notice",component:f,children:[{path:"list",name:"NoticeList",component:function(){return Promise.all([e.e(0),e.e(7)]).then(e.bind(null,"gVpZ"))},beforeEnter:function(t,n,e){l.a.get("token")?"/login"===t.path?e({path:"/"}):e():"/login"!==t.path?e({path:"/login"}):e()}},{hidden:!0,path:"register",name:"NoticeRegister",component:function(){return Promise.all([e.e(0),e.e(1)]).then(e.bind(null,"gZMs"))}},{hidden:!0,path:"detail",name:"NoticeDetail",component:function(){return Promise.all([e.e(0),e.e(2)]).then(e.bind(null,"uxEq"))}}]},{path:"/popup",component:f,children:[{path:"register",name:"PopupRegister",component:function(){return e.e(4).then(e.bind(null,"k3Lc"))}}]},{path:"*",component:v}],_=new a.a({routes:g}),b=e("zL8q"),w=e.n(b),C=(e("tvR6"),e("wUZ8")),k=e.n(C),E=(e("yh13"),e("NYxO")),L=(e("mtWM"),e("mof7"));o.default.use(E.a);var N={state:{id:"",loading:!1},mutations:{SET_ID:function(t,n){t.id=n},SET_LOADING:function(t,n){t.loading=n}},actions:{Login:function(t,n){var e=t.commit;Object(L.g)({userInfo:n}).then(function(t){console.log("===== res ======"),console.log(t),console.log("===== res ======"),e("SET_ID",t.data.body.LOGIN_ID),l.a.set("token",t.data.body.LOGIN_ID,{expires:1})}).catch(function(t){console.log(t)}).finally(function(t){e("SET_LOADING",!1)})}}},x=new E.a.Store({modules:{user:N}});o.default.use(w.a,{locale:k.a}),new o.default({el:"#app",router:_,store:x,render:function(t){return t(i)}})},WV4p:function(t,n){},bFWL:function(t,n){},kCdC:function(t,n){},mof7:function(t,n,e){"use strict";e.d(n,"g",function(){return i}),e.d(n,"c",function(){return a}),e.d(n,"b",function(){return s}),e.d(n,"e",function(){return l}),e.d(n,"d",function(){return c}),e.d(n,"a",function(){return u}),e.d(n,"f",function(){return d});var o=e("mtWM"),r=e.n(o).a.create({baseURL:Object({NODE_ENV:"production"}).BASE_API,timeout:5e3}),i=function(t){return r.post("/login",t)},a=function(t){return r.get("/notice/list",{params:t})},s=function(t){return r({url:"/notice/detail/"+t,method:"get"})},l=function(t){return r({url:"/notice/register",method:"post",data:t})},c=function(t){return r({url:"/notice/modify",method:"post",data:t})},u=function(t){return r({url:"/notice/delete",method:"post",data:t})},d=function(t){return r.post("/registration",t)}},tvR6:function(t,n){},yh13:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.e39924ff046831c77829.js.map