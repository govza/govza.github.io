import{_ as k}from"./DfQmbaFF.js";import{_ as b,P as M,q as C,o as t,c as l,a as s,b as f,w as _,v as L,x as N,F as d,n as x,t as y,y as i,z as g,d as p,s as z,A as S}from"./CYG28dMp.js";import{l as V}from"./DIGdORgU.js";const j={name:"Navbar",data(){return{isLoadingModel:!1,isModelLoaded:!1,showMenu:!1,sizes:["micro","small","medium","large","large2x","original"],levels:["safe","unsafe"],selectedCount:25}},computed:{count(){return this.selectedCount}},watch:{selectedCount(n){this.navigateToGallery()}},methods:{navigateToGallery(){const n={...(this._.provides[M]||this.$route).query};n.count=this.selectedCount.toString(),!(!n.size||!n.level)&&this.$router.push({name:"gallery",query:n})},toggleNavbar(){this.showMenu=!this.showMenu},async warmUpModel(){this.isLoadingModel=!0,await V(),this.isLoadingModel=!1,this.isModelLoaded=!0}}},q={class:"relative flex flex-wrap items-center justify-between px-2 py-3 bg-green-700 mb-3"},B={class:"container px-4 mx-auto flex flex-wrap items-center justify-between"},$={class:"w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"},G=["value"],T={class:"flex flex-col ist-none ml-auto"},U={class:"nav-item"};function A(n,r,w,v,o,u){const c=k,a=C("font-awesome-icon");return t(),l("nav",q,[s("div",B,[s("div",$,[f(c,{to:"/",class:"text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"},{default:_(()=>[p(" Gazelle ")]),_:1}),L(s("select",{"onUpdate:modelValue":r[0]||(r[0]=e=>o.selectedCount=e),class:"mx-5 p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},[(t(),l(d,null,x([1,5,25,50],e=>s("option",{key:e,value:e},y(e),9,G)),64))],512),[[N,o.selectedCount]]),s("button",{class:"text-white cursor-pointer px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none",type:"button",onClick:r[1]||(r[1]=e=>u.warmUpModel())},[o.isModelLoaded?(t(),i(a,{key:0,icon:["fas","fire"]})):g("",!0),p(),o.isModelLoaded?g("",!0):(t(),i(a,{key:1,icon:["fas","circle-nodes"]})),o.isLoadingModel?(t(),l(d,{key:2},[p(" Loading model "),f(a,{class:"text-white cursor-pointer px-3 py-1 border border-solid border-transparent rounded bg-transparent outline-none focus:outline-none",icon:["fas","spinner"],spin:""})],64)):g("",!0)]),s("button",{class:"text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none",type:"button",onClick:r[2]||(r[2]=e=>u.toggleNavbar())},[f(a,{icon:["fas","bars"]})])]),s("div",{class:z([{hidden:!o.showMenu,flex:o.showMenu},"lg:flex lg:flex-grow flex-col"])},[s("div",T,[(t(!0),l(d,null,x(o.levels,e=>(t(),l("ul",{key:e,class:"flex flex-col list-none py-3"},[s("li",U,[e==="safe"?(t(),i(a,{key:0,class:"text-blue-600",icon:["fas","eye"]})):(t(),i(a,{key:1,class:"text-red-600",icon:["fas","eye-slash"]})),(t(!0),l(d,null,x(o.sizes,m=>(t(),i(c,{key:m.key,to:{name:"gallery",query:{level:e,size:m,count:u.count,isOverlay:e==="unsafe"}},class:"px-3 py-2 text-xs uppercase font-bold leading-snug text-white hover:opacity-75"},{default:_(()=>[p(y(m),1)]),_:2},1032,["to"]))),128))])]))),128))])],2)])])}const h=b(j,[["render",A]]),D={components:{Navbar:h}};function F(n,r,w,v,o,u){const c=h;return t(),l("div",null,[f(c),S(n.$slots,"default")])}const Q=b(D,[["render",F]]);export{Q as default};