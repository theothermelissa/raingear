(this.webpackJsonpselljar=this.webpackJsonpselljar||[]).push([[0],{205:function(e,t,c){},206:function(e,t,c){},283:function(e,t){},284:function(e,t){},340:function(e,t,c){"use strict";c.r(t);var r=c(0),a=c.n(r),n=c(34),s=c.n(n),i=(c(205),c(33)),o=(c(206),c(207),c(346)),l=function(e){switch(e){case"Inquiry":return"#f50";case"Active":return"#7cb305";case"Finalized":return"#faad14";case"Delivered":return"#597ef7";case"Cancelled":default:return"#bfbfbf"}},d=c(4),j=function(e){var t=e.fundraiser,c=t.organization,r=t.contactFirstName,a=t.contactPhone,n=t.contactEmail,s=t.status,i=t.deliveryDate;var j,u;return Object(d.jsxs)("div",{style:{backgroundColor:"white",padding:"8px 8px",margin:"2px 0px",width:"200px",borderRadius:"5px"},children:[Object(d.jsx)("h2",{style:{color:l(s),margin:0},children:(u=i,Object(o.a)(new Date(u),"MMMM dd"))}),Object(d.jsx)("h3",{style:{color:"#595959",margin:0},children:c}),Object(d.jsx)("div",{style:{color:"#595959"},children:r}),Object(d.jsx)("div",{style:{color:"#595959"},children:function(e){var t=(""+e).replace(/\D/g,"").match(/^(\d{3})(\d{3})(\d{4})$/);return t?"("+t[1]+") "+t[2]+"-"+t[3]:null}(a)}),Object(d.jsx)("a",{href:(j=n,"mailto:".concat(j)),children:"Email"})]})},u=c(352),b=c(41),O=function(e){var t=e.fundraisers,c=e.setHovered,a=Object(r.useContext)(Q).recordsDispatch;return Object(d.jsx)("div",{children:Object(d.jsx)("div",{children:Object(d.jsx)(u.a,{mode:"left",style:{marginLeft:"20px",padding:"100px 40px 0px 0px",maxWidth:"500px"},children:t.map((function(e){return Object(d.jsx)(u.a.Item,{onMouseEnter:function(){return c(e.recordID)},onMouseLeave:function(){return c(null)},onClick:function(){return function(e){var c=Object(b.find)(t,Object(b.matchesProperty)("organization",e));a({type:"chooseRecord",payload:c.recordID})}(e.organization)},color:l(e.status),children:Object(d.jsx)(j,{fundraiser:e})},e.recordID)}))})})})},h=c(24),x=c(353),m=c(343),f=function(e){var t=e.fundraisers,c=Object(r.useContext)(Q),a=c.recordsDispatch,n=c.recordsState.hoveredID,s=Object(r.useState)(""),j=Object(i.a)(s,2),u=j[0],O=j[1];Object(r.useEffect)((function(){O(t.map((function(e){return Object(h.a)(Object(h.a)({},e),{},{deliveryDate:(t=e.deliveryDate,Object(o.a)(new Date(t),"MMM dd")),organizationProceeds:"$".concat(Math.round(e.organizationProceeds)),totalRevenue:"$".concat(Math.round(e.totalRevenue)),firehouseFee:"$".concat(Math.round(e.firehouseFee)),isHovered:e.recordID===n,key:e.recordID});var t})))}),[]);var f=Object(b.sortBy)(u,["priority","deliveryDate"]);console.log("dataSource: ",f);var p,y=function(e){return function(t,c){return t[e]>=c[e]?-1:1}},v=[{title:"Organization",dataIndex:"organization",key:"organization",sorter:y("organization"),render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"Status",dataIndex:"status",key:"status",render:function(e){return Object(d.jsx)(d.Fragment,{children:e&&Object(d.jsxs)(x.a,{color:l(e),children:[e.toUpperCase()," "]},e)})},sorter:y("status")},{title:"Sales",dataIndex:"totalRevenue",key:"totalRevenue",sorter:function(e,t){return e.totalRevenue-t.totalRevenue},render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"FH Total",dataIndex:"firehouseFee",key:"firehouseFee",render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"Org Total",dataIndex:"organizationProceeds",key:"organizationProceeds",render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"D-Date",dataIndex:"deliveryDate",key:"deliveryDate",render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"Products",dataIndex:"products",key:"products",filters:[{text:"Boston Butts",value:"Boston Butts"},{text:"Half Hams",value:"Half Hams"},{text:"Whole Turkeys",value:"Whole Turkeys"},{text:"BBQ Sauce",value:"BBQ Sauce"}],onFilter:(p="products",function(e,t){return 0===t[p].indexOf(e)}),render:function(e){return e.map((function(e){return function(e){switch(e){case"Boston Butts":return Object(d.jsxs)("div",{className:"tagContentHolder",children:[Object(d.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#597ef7"},children:"B"}),Object(d.jsx)("div",{className:"productTagName",style:{color:"#597ef7"},children:e})]},e);case"Half Hams":return Object(d.jsxs)("div",{className:"tagContentHolder",children:[Object(d.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#7cb305"},children:"H"}),Object(d.jsx)("div",{className:"productTagName",style:{color:"#7cb305"},children:e})]},e);case"Whole Turkeys":return Object(d.jsxs)("div",{className:"tagContentHolder",children:[Object(d.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#13c2c2"},children:"T"}),Object(d.jsx)("div",{className:"productTagName",style:{color:"#13c2c2"},children:e})]},e);case"BBQ Sauce":return Object(d.jsxs)("div",{className:"tagContentHolder",children:[Object(d.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#9254de"},children:"S"}),Object(d.jsx)("div",{className:"productTagName",style:{color:"#9254de"},children:e})]},e);default:return null}}(e)}))}}];return Object(d.jsx)(d.Fragment,{children:u&&Object(d.jsx)("div",{children:Object(d.jsx)(m.a,{dataSource:f,columns:v,pagination:!1,size:"small",id:"fundraisersTable",scroll:{x:700,y:250},onRow:function(e,c){return{onClick:function(c){!function(e){var c=Object(b.find)(t,Object(b.matchesProperty)("organization",e));a({type:"chooseRecord",payload:c.recordID})}(e.organization)},className:(r=e.recordID,r===n?"hovered":""),id:"row".concat(e.recordID),key:c};var r}})})})},p=c(344),y=c(90),v=c(117),g=c(349),I=c(348),C=c(49),D=function(){var e=Object(r.useContext)(Q),t=e.recordsDispatch,c=e.recordsState,a=c.recordToEdit,n=(c.editDrawerVisible,Object(r.useState)()),s=Object(i.a)(n,2),o=s[0],l=s[1],j=p.a.useForm(),u=Object(i.a)(j,1)[0];Object(r.useEffect)((function(){Z("Fundraisers").find(a,(function(e,t){l(t.fields),e&&console.error(e)}))}),[]);var b=y.a.Option;return Object(d.jsx)("div",{children:o&&Object(d.jsxs)(p.a,Object(h.a)(Object(h.a)({},{labelCol:{span:8},wrapperCol:{span:16}}),{},{style:{width:"80%"},form:u,name:"control-hooks",initialValues:o,onFinish:function(e){Z("Fundraisers").update([{id:a,fields:e}],(function(e,t){e&&console.log("Error: ",e)})),t({type:"updateRecords"}),t({type:"closeEditDrawer"})},children:[Object(d.jsx)(p.a.Item,{name:"status",label:"Status",children:Object(d.jsxs)(v.a.Group,{children:[Object(d.jsx)(v.a,{value:"Inquiry",children:"Inquiry"}),Object(d.jsx)(v.a,{value:"Active",children:"Active"}),Object(d.jsx)(v.a,{value:"Finalized",children:"Finalized"}),Object(d.jsx)(v.a,{value:"Delivered",children:"Delivered"}),Object(d.jsx)(v.a,{value:"Cancelled",children:"Cancelled"})]})}),Object(d.jsx)(p.a.Item,{name:"deliveryAddress",label:"Delivery Address",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"deliveryCity",label:"Delivery City",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"deliveryState",label:"Delivery State",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"deliveryZip",label:"Delivery Zip",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"organization",label:"Organization",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactFirstName",label:"Primary Contact First Name",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactLastName",label:"Primary Contact Last Name",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactAddress",label:"Primary Contact Address",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactAddressLine2",label:"Primary Contact Address Line 2",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactCity",label:"Primary Contact City",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactState",label:"Primary Contact State",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactZip",label:"Primary Contact Zip",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactPreferredMethod",label:"Preferred Contact Method",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"contactEmail",label:"Primary Contact Email",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(p.a.Item,{name:"products",label:"Products",rules:[{type:"array"}],children:Object(d.jsxs)(y.a,{mode:"multiple",placeholder:"Edit Products",allowClear:!0,children:[Object(d.jsx)(b,{value:"Boston Butts",children:"Boston Butts"}),Object(d.jsx)(b,{value:"Half Hams",children:"Half Hams"}),Object(d.jsx)(b,{value:"Whole Turkeys",children:"Whole Turkeys"}),Object(d.jsx)(b,{value:"BBQ Sauce",children:"BBQ Sauce"})]})}),Object(d.jsx)(p.a.Item,{name:"firehouseButtPrice",label:"Firehouse Butt Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(p.a.Item,{name:"firehouseHamPrice",label:"Firehouse Ham Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(p.a.Item,{name:"firehouseTurkeyPrice",label:"Firehouse Turkey Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(p.a.Item,{name:"firehouseSaucePrice",label:"Firehouse Sauce Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(p.a.Item,{name:"customerButtPrice",label:"Customer Butt Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(p.a.Item,{name:"customerHamPrice",label:"Customer Ham Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(p.a.Item,{name:"customerTurkeyPrice",label:"Customer Turkey Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(p.a.Item,{name:"customerSaucePrice",label:"Customer Sauce Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(p.a.Item,Object(h.a)(Object(h.a)({},{wrapperCol:{offset:8,span:16}}),{},{children:Object(d.jsx)(C.a,{type:"primary",htmlType:"submit",children:"Submit"})}))]}))})},P=c(191),w=c.n(P),S=c(342),F=c(67),B=c(350),k=function(e,t){switch(t.type){case"setRecords":return Object(h.a)(Object(h.a)({},e),{},{allRecords:t.payload});case"chooseRecord":return Object(h.a)(Object(h.a)({},e),{},{focusedRecordID:t.payload,viewFocusedRecord:!0});case"updateRecords":return console.log("Setting recordHasChanged: true."),Object(h.a)(Object(h.a)({},e),{},{recordHasChanged:!0});case"doNotUpdate":return console.log("Let it be."),Object(h.a)(Object(h.a)({},e),{},{recordHasChanged:!1});case"setHovered":return Object(h.a)(Object(h.a)({},e),{},{hoveredID:t.payload});case"showEditDrawer":return Object(h.a)(Object(h.a)({},e),{},{editDrawerVisible:!0,recordToEdit:t.payload});case"closeEditDrawer":return Object(h.a)(Object(h.a)({},e),{},{editDrawerVisible:!1});case"logSuccess":return Object(h.a)(Object(h.a)({},e),{},{alert:{type:"success",message:"Success!"}});case"logError":return Object(h.a)(Object(h.a)({},e),{},{alert:{type:"error",message:"Darn. Something went wrong."}});default:throw new Error("unknown action")}},H=c(345),N=c(80),E=c(43),T=c(351),R=H.a.Meta,$=function(e){var t=e.recordToDisplay,c=Object(r.useContext)(Q).recordsDispatch,a=t.fundraiserName,n=(t.organization,t.products,t.deliveryCity),s=t.deliveryAddress,i=t.deliveryState,o=t.deliveryZip,l=t.deliveryNotes,j=(t.deliveryDate,t.daysUntilDelivery),u=t.contactFirstName,b=t.contactPhone,O=t.contactLastName,h=t.contactAddress,x=t.contactAddressLine2,m=t.contactCity,f=t.contactState,p=t.contactZip,y=t.contactPreferredMethod,v=t.contactEmail,g=t.status,I=t.buttCount,D=t.hamCount,P=t.turkeyCount,w=t.sauceCount,S=t.customerButtPrice,F=t.customerHamPrice,B=t.customerTurkeyPrice,k=t.customerSaucePrice,$=t.firehouseFee,z=t.orderTotals,A=(t.totalRevenue,t.sellerRecords),M=t.organizationProceeds,L=t.recordID,V=[];z&&z.map((function(e){return V.push(e)}));A&&A.length;var W=I+D+P+w;return Object(d.jsx)("div",{className:"site-card-wrapper",children:Object(d.jsx)(H.a,{title:"".concat(a," (").concat(g,")"),className:g.toLowerCase(),style:{margin:"16px 0px",padding:"0px",backgroundColor:"#fafafa"},extra:Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(C.a,{onClick:function(){return c({type:"showEditDrawer",payload:L})},children:"Edit"})}),children:Object(d.jsxs)(N.a,{type:"flex",gutter:16,children:[Object(d.jsx)(E.a,{flex:"1 1 30%",children:Object(d.jsxs)(E.a,{children:[Object(d.jsxs)(H.a,{bordered:!1,style:{height:"100%"},actions:[Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(C.a,{disabled:!0,children:"Download Labels"}),Object(d.jsx)(C.a,{disabled:!0,children:"Create Invoice"})]})],children:[Object(d.jsx)(R,{title:"COOK IN ______"})," ",W>0?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{children:I>0&&"".concat(I," Butt").concat(I>1?"s":"")}),Object(d.jsx)("div",{children:D>0&&"".concat(D," Ham").concat(D>1?"s":"")}),Object(d.jsx)("div",{children:P>0&&"".concat(P," Turkey").concat(P>1?"s":"")}),Object(d.jsx)("div",{children:w>0&&"".concat(w," Sauce").concat(w>1?"s":"")})]}):Object(d.jsx)("div",{children:"No sales yet"})," "]}),Object(d.jsxs)(H.a,{bordered:!1,style:{height:"100%"},children:[Object(d.jsx)(R,{title:"THEIR PRODUCTS"}),Object(d.jsxs)(d.Fragment,{children:[" ",S&&Object(d.jsxs)("div",{children:["Boston Butts @ $",S]}),F&&Object(d.jsxs)("div",{children:["Half Hams @ $",F]}),B&&Object(d.jsxs)("div",{children:["Whole Turkeys @ $",B]}),k&&Object(d.jsxs)("div",{children:["BBQ Sauces @ $",k]})," "]})]})]})}),Object(d.jsx)(E.a,{flex:"1 1 30%",style:{height:"100%"},children:Object(d.jsxs)(H.a,{bordered:!1,children:[Object(d.jsx)(R,{title:j>0?"DELIVERY IN ".concat(j," DAYS"):"DELIVERY WAS ".concat(-j," DAYS AGO")}),Object(d.jsxs)(T.b,{layout:"vertical",column:1,children:[Object(d.jsxs)(T.b.Item,{label:"Address",children:[s,Object(d.jsx)("br",{}),n,", ",i,o]}),Object(d.jsx)(T.b.Item,{label:"Note",children:l}),Object(d.jsx)(T.b.Item,{label:""})]})]})}),Object(d.jsxs)(E.a,{flex:"1 1 30%",style:{height:"100%"},children:[Object(d.jsxs)(H.a,{bordered:!1,actions:[Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(C.a,{disabled:!0,children:"Reset Password"}),Object(d.jsx)(C.a,{disabled:!0,children:"Email Contact"})]})],children:[Object(d.jsx)(R,{title:"".concat(u.toUpperCase()," ").concat(O.toUpperCase())}),Object(d.jsxs)(T.b,{column:1,children:[Object(d.jsx)(T.b.Item,{label:"Phone",children:function(e){var t=(""+e).replace(/\D/g,"").match(/^(\d{3})(\d{3})(\d{4})$/);return t?"("+t[1]+") "+t[2]+"-"+t[3]:null}(b)}),Object(d.jsx)(T.b.Item,{label:"Email",children:v}),Object(d.jsx)(T.b.Item,{label:"Prefers",children:y}),Object(d.jsxs)(T.b.Item,{label:"Address",children:[h,x,Object(d.jsx)("br",{}),m,", ",f,p]})]})]}),Object(d.jsxs)(H.a,{bordered:!1,children:[Object(d.jsx)(R,{title:"FIREHOUSE PROFIT: $".concat($)}),Object(d.jsxs)(T.b,{column:1,children:[Object(d.jsx)(T.b.Item,{label:"Their Paid Orders",children:V.length}),Object(d.jsxs)(T.b.Item,{label:"Their Proceeds",children:["$",M.toFixed(2)]}),Object(d.jsx)(T.b.Item,{label:""})]})]})]})]})})})},z=c(195),A=c(347),M=function(e){var t=e.message,c=e.type,a=Object(r.useState)(!0),n=Object(i.a)(a,2),s=n[0];n[1];return Object(r.useEffect)((function(){}),[]),Object(d.jsx)(d.Fragment,{children:s&&Object(d.jsx)(A.a,{showIcon:!0,style:{width:"95%"},message:t,closable:!0,type:c})})},L=function(){var e=Object(r.useContext)(Q),t=(e.recordsDispatch,e.recordsState.alert),c=Object(r.useState)([]),a=Object(i.a)(c,2),n=a[0],s=a[1];return Object(r.useEffect)((function(){s((function(e){return[].concat(Object(z.a)(e),[t])}))}),[t]),Object(d.jsx)("div",{className:"alertContainer",style:{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"},children:n.map((function(e,t){return Object(d.jsx)(M,{message:e.message,type:e.type},t)}))})},V=(c(339),S.a.Header),W=S.a.Content,U=S.a.Sider,Z=new w.a({apiKey:"key6YdKIazB8V0vOq"}).base("appWga5gfjEZX4q7X"),Q=a.a.createContext(null),_={focusedRecordID:"",viewFocusedRecord:!1,editDrawerVisible:!1,recordToEdit:"",alert:"",recordHasChanged:!1,hoveredID:null};var q=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),c=t[0],a=t[1],n=Object(r.useState)(!1),s=Object(i.a)(n,2),o=(s[0],s[1]),l=Object(r.useState)(""),j=Object(i.a)(l,2),u=j[0],h=j[1],x=Object(r.useReducer)(k,_),m=Object(i.a)(x,2),p=m[0],y=m[1];return Object(r.useEffect)((function(){if(p.recordHasChanged)Z("Fundraisers").select({view:"All Fields View"}).eachPage((function(e,t){a(e.map((function(e){return e.fields}))),t()}),(function(e){e&&console.error(e)})),y({type:"logSuccess"}),y({type:"doNotUpdate"}),o(!0);else{if(p.focusedRecordID)return null;Z("Fundraisers").select({view:"All Fields View"}).eachPage((function(e,t){a(e.map((function(e){return e.fields}))),t()}),(function(e){e&&console.error(e)}))}}),[p]),Object(r.useEffect)((function(){h(Object(b.find)(c,Object(b.matchesProperty)("recordID",p.focusedRecordID)))}),[p,c]),Object(d.jsxs)(Q.Provider,{value:{recordsState:p,recordsDispatch:y},children:[Object(d.jsxs)(S.a,{children:[Object(d.jsxs)(V,{style:{position:"fixed",zIndex:1e3,width:"100%"},children:[Object(d.jsxs)(F.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:[2],children:[Object(d.jsx)(F.a.Item,{children:"Fundraisers"},"1"),Object(d.jsx)(F.a.Item,{children:"Customers"},"2"),Object(d.jsx)(F.a.Item,{children:"Team"},"3")]}),p.alert&&Object(d.jsx)(L,{})]}),Object(d.jsx)(S.a,{children:Object(d.jsx)(U,{style:{overflow:"auto",height:"100vh",position:"fixed",left:0,backgroundColor:"#d9d9d9"},width:"auto",className:"site-layout-background",children:c[0]&&Object(d.jsx)(O,{setHovered:function(e){y({type:"setHovered",payload:e})},fundraisers:c})})}),Object(d.jsxs)(S.a,{className:"site-layout",style:{marginLeft:0},children:[Object(d.jsx)(V,{className:"site-layout-background",style:{padding:0}}),Object(d.jsxs)(W,{style:{overflow:"initial",minHeight:"100vh"},children:[c[0]&&Object(d.jsx)(f,{fundraisers:c}),u&&Object(d.jsx)($,{recordToDisplay:u})]})]})]}),p.editDrawerVisible&&Object(d.jsx)(B.a,{forceRender:!0,width:"80vw",visible:p.editDrawerVisible,onClose:function(){return y({type:"closeEditDrawer"})},children:Object(d.jsx)(D,{})})]})},Y=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,354)).then((function(t){var c=t.getCLS,r=t.getFID,a=t.getFCP,n=t.getLCP,s=t.getTTFB;c(e),r(e),a(e),n(e),s(e)}))};s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(q,{})}),document.getElementById("root")),Y()}},[[340,1,2]]]);
//# sourceMappingURL=main.553e6a20.chunk.js.map