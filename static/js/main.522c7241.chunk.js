(this.webpackJsonpselljar=this.webpackJsonpselljar||[]).push([[0],{204:function(e,t,r){},205:function(e,t,r){},283:function(e,t){},284:function(e,t){},340:function(e,t,r){"use strict";r.r(t);var c=r(0),a=r.n(c),n=r(34),s=r.n(n),i=(r(204),r(29)),o=(r(205),r(206),r(345)),l=function(e){switch(e){case"Inquiry":return"#f50";case"Active":return"#7cb305";case"Finalized":return"#faad14";case"Delivered":return"#597ef7";case"Cancelled":default:return"#bfbfbf"}},d=r(6),u=function(e){var t=e.fundraiser,r=t.organization,c=t.contactFirstName,a=t.contactPhone,n=t.contactEmail,s=t.status,i=t.deliveryDate;var u,j;return Object(d.jsxs)("div",{style:{backgroundColor:"white",padding:"8px 8px",margin:"2px 0px",width:"200px",borderRadius:"5px"},children:[Object(d.jsx)("h2",{style:{color:l(s),margin:0},children:(j=i,Object(o.a)(new Date(j),"MMMM dd"))}),Object(d.jsx)("h3",{style:{color:"#595959",margin:0},children:r}),Object(d.jsx)("div",{style:{color:"#595959"},children:c}),Object(d.jsx)("div",{style:{color:"#595959"},children:function(e){var t=(""+e).replace(/\D/g,"").match(/^(\d{3})(\d{3})(\d{4})$/);return t?"("+t[1]+") "+t[2]+"-"+t[3]:null}(a)}),Object(d.jsx)("a",{href:(u=n,"mailto:".concat(u)),children:"Email"})]})},j=r(352),b=r(42),O=function(e){var t=e.fundraisers,r=e.setHovered,a=Object(c.useState)(""),n=Object(i.a)(a,2),s=(n[0],n[1],Object(c.useContext)(W).recordsDispatch);return Object(d.jsx)("div",{children:Object(d.jsx)("div",{children:Object(d.jsx)(j.a,{mode:"left",style:{marginLeft:"20px",padding:"100px 40px 0px 0px",maxWidth:"500px"},children:t.map((function(e){return Object(d.jsx)(j.a.Item,{onMouseEnter:function(){return r(e.recordID)},onMouseLeave:function(){return r(null)},onClick:function(){return function(e){var r=Object(b.find)(t,Object(b.matchesProperty)("organization",e));s({type:"chooseRecord",payload:r.recordID})}(e.organization)},color:l((c=e.status,console.log("currentStatus: ",c),c||"Inquiry")),children:Object(d.jsx)(u,{fundraiser:e})},e.recordID);var c}))})})})},h=r(24),m=r(353),x=r(343),f=function(e){var t=e.fundraisers,r=Object(c.useContext)(W),a=r.recordsDispatch,n=r.recordsState.hoveredID,s=Object(c.useState)(""),u=Object(i.a)(s,2),j=u[0],O=u[1];Object(c.useEffect)((function(){O(t.map((function(e){return Object(h.a)(Object(h.a)({},e),{},{deliveryDate:(r=e.deliveryDate,Object(o.a)(new Date(r),"MMM dd")),organizationProceeds:"$".concat(Math.round(e.organizationProceeds)),totalRevenue:"$".concat(Math.round(e.totalRevenue)),firehouseFee:"$".concat(Math.round(e.firehouseFee)),isHovered:e.recordID===n,key:e.recordID,status:"".concat((t=e.status,t||"Inquiry"))});var t,r})))}),[t]);var f,y=Object(b.sortBy)(j,["priority","deliveryDate"]),p=function(e){return function(t,r){return t[e]>=r[e]?-1:1}},v=[{title:"Organization",dataIndex:"organization",key:"organization",sorter:p("organization"),render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"Status",dataIndex:"status",key:"status",render:function(e){return Object(d.jsx)(d.Fragment,{children:e&&Object(d.jsxs)(m.a,{color:l(e),children:[e.toUpperCase()," "]},e)})},sorter:p("status")},{title:"Sales",dataIndex:"totalRevenue",key:"totalRevenue",sorter:function(e,t){return e.totalRevenue-t.totalRevenue},render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"FH Total",dataIndex:"firehouseFee",key:"firehouseFee",render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"Org Total",dataIndex:"organizationProceeds",key:"organizationProceeds",render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"D-Date",dataIndex:"deliveryDate",key:"deliveryDate",render:function(e){return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{children:e})})}},{title:"Products",dataIndex:"products",key:"products",filters:[{text:"Boston Butts",value:"Boston Butts"},{text:"Half Hams",value:"Half Hams"},{text:"Whole Turkeys",value:"Whole Turkeys"},{text:"BBQ Sauce",value:"BBQ Sauce"}],onFilter:(f="products",function(e,t){return 0===t[f].indexOf(e)}),render:function(e){return e.map((function(e){return function(e){switch(e){case"Boston Butts":return Object(d.jsxs)("div",{className:"tagContentHolder",children:[Object(d.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#597ef7"},children:"B"}),Object(d.jsx)("div",{className:"productTagName",style:{color:"#597ef7"},children:e})]},e);case"Half Hams":return Object(d.jsxs)("div",{className:"tagContentHolder",children:[Object(d.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#7cb305"},children:"H"}),Object(d.jsx)("div",{className:"productTagName",style:{color:"#7cb305"},children:e})]},e);case"Whole Turkeys":return Object(d.jsxs)("div",{className:"tagContentHolder",children:[Object(d.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#13c2c2"},children:"T"}),Object(d.jsx)("div",{className:"productTagName",style:{color:"#13c2c2"},children:e})]},e);case"BBQ Sauce":return Object(d.jsxs)("div",{className:"tagContentHolder",children:[Object(d.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#9254de"},children:"S"}),Object(d.jsx)("div",{className:"productTagName",style:{color:"#9254de"},children:e})]},e);default:return null}}(e)}))}}];return Object(d.jsx)(d.Fragment,{children:j&&Object(d.jsx)("div",{children:Object(d.jsx)(x.a,{dataSource:y,columns:v,pagination:!1,size:"small",id:"fundraisersTable",scroll:{x:700,y:250},onRow:function(e,r){return{onClick:function(r){!function(e){var r=Object(b.find)(t,Object(b.matchesProperty)("organization",e));console.log("This is a new edit!"),a({type:"chooseRecord",payload:r.recordID})}(e.organization)},className:(c=e.recordID,c===n?"hovered":""),id:"row".concat(e.recordID),key:r};var c}})})})},y=r(344),p=r(91),v=r(118),g=r(349),I=r(348),C=r(50),D=function(){var e=Object(c.useContext)(W),t=e.recordsDispatch,r=e.recordsState,a=r.recordToEdit,n=(r.editDrawerVisible,Object(c.useState)()),s=Object(i.a)(n,2),o=s[0],l=s[1],u=y.a.useForm(),j=Object(i.a)(u,1)[0];Object(c.useEffect)((function(){q("Fundraisers").find(a,(function(e,t){if(t.fields.status)l(t.fields);else{var r=t.fields,c=r.fundraiserName,a=r.organization,n=r.products,s=r.deliveryCity,i=r.deliveryAddress,o=r.deliveryState,d=r.deliveryZip,u=r.deliveryNotes,j=r.deliveryDate,b=r.daysUntilDelivery,O=r.contactFirstName,h=r.contactPhone,m=r.contactLastName,x=r.contactAddress,f=r.contactAddressLine2,y=r.contactCity,p=r.contactState,v=r.contactZip,g=r.contactPreferredMethod,I=r.contactEmail,C=(r.status,r.buttCount),D=r.hamCount,P=r.turkeyCount,S=r.sauceCount,w=r.customerButtPrice,F=r.customerHamPrice,B=r.customerTurkeyPrice,k=r.customerSaucePrice,N=r.firehouseFee,H=r.orderTotals,T=r.totalRevenue,E=r.sellerRecords,R=r.organizationProceeds,z=r.recordID;l({fundraiserName:c,organization:a,products:n,deliveryCity:s,deliveryAddress:i,deliveryState:o,deliveryZip:d,deliveryNotes:u,deliveryDate:j,daysUntilDelivery:b,contactFirstName:O,contactPhone:h,contactLastName:m,contactAddress:x,contactAddressLine2:f,contactCity:y,contactState:p,contactZip:v,contactPreferredMethod:g,contactEmail:I,status:"Inquiry",buttCount:C,hamCount:D,turkeyCount:P,sauceCount:S,customerButtPrice:w,customerHamPrice:F,customerTurkeyPrice:B,customerSaucePrice:k,firehouseFee:N,orderTotals:H,totalRevenue:T,sellerRecords:E,organizationProceeds:R,recordID:z})}e&&console.error(e)}))}),[]);var b=p.a.Option;return Object(d.jsx)("div",{children:o&&Object(d.jsxs)(y.a,Object(h.a)(Object(h.a)({},{labelCol:{span:8},wrapperCol:{span:16}}),{},{style:{width:"80%"},form:j,name:"control-hooks",initialValues:o,onFinish:function(e){q("Fundraisers").update([{id:a,fields:e}],(function(e,t){e&&console.log("Error: ",e)})),t({type:"updateRecords"}),t({type:"closeEditDrawer"})},children:[Object(d.jsx)(y.a.Item,{name:"status",label:"Status",children:Object(d.jsxs)(v.a.Group,{children:[Object(d.jsx)(v.a,{value:"Inquiry",children:"Inquiry"}),Object(d.jsx)(v.a,{value:"Active",children:"Active"}),Object(d.jsx)(v.a,{value:"Finalized",children:"Finalized"}),Object(d.jsx)(v.a,{value:"Delivered",children:"Delivered"}),Object(d.jsx)(v.a,{value:"Cancelled",children:"Cancelled"})]})}),Object(d.jsx)(y.a.Item,{name:"deliveryAddress",label:"Delivery Address",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"deliveryCity",label:"Delivery City",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"deliveryState",label:"Delivery State",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"deliveryZip",label:"Delivery Zip",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"organization",label:"Organization",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactFirstName",label:"Primary Contact First Name",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactLastName",label:"Primary Contact Last Name",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactAddress",label:"Primary Contact Address",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactAddressLine2",label:"Primary Contact Address Line 2",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactCity",label:"Primary Contact City",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactState",label:"Primary Contact State",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactZip",label:"Primary Contact Zip",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactPreferredMethod",label:"Preferred Contact Method",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"contactEmail",label:"Primary Contact Email",children:Object(d.jsx)(g.a,{})}),Object(d.jsx)(y.a.Item,{name:"products",label:"Products",rules:[{type:"array"}],children:Object(d.jsxs)(p.a,{mode:"multiple",placeholder:"Edit Products",allowClear:!0,children:[Object(d.jsx)(b,{value:"Boston Butts",children:"Boston Butts"}),Object(d.jsx)(b,{value:"Half Hams",children:"Half Hams"}),Object(d.jsx)(b,{value:"Whole Turkeys",children:"Whole Turkeys"}),Object(d.jsx)(b,{value:"BBQ Sauce",children:"BBQ Sauce"})]})}),Object(d.jsx)(y.a.Item,{name:"firehouseButtPrice",label:"Firehouse Butt Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(y.a.Item,{name:"firehouseHamPrice",label:"Firehouse Ham Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(y.a.Item,{name:"firehouseTurkeyPrice",label:"Firehouse Turkey Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(y.a.Item,{name:"firehouseSaucePrice",label:"Firehouse Sauce Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(y.a.Item,{name:"customerButtPrice",label:"Customer Butt Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(y.a.Item,{name:"customerHamPrice",label:"Customer Ham Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(y.a.Item,{name:"customerTurkeyPrice",label:"Customer Turkey Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(y.a.Item,{name:"customerSaucePrice",label:"Customer Sauce Price",children:Object(d.jsx)(I.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(d.jsx)(y.a.Item,Object(h.a)(Object(h.a)({},{wrapperCol:{offset:8,span:16}}),{},{children:Object(d.jsx)(C.a,{type:"primary",htmlType:"submit",children:"Submit"})}))]}))})},P=r(190),S=r.n(P),w=r(342),F=r(68),B=r(350),k=function(e,t){switch(t.type){case"setRecords":return Object(h.a)(Object(h.a)({},e),{},{allRecords:t.payload});case"chooseRecord":return Object(h.a)(Object(h.a)({},e),{},{focusedRecordID:t.payload,viewFocusedRecord:!0});case"updateRecords":return console.log("Setting recordHasChanged: true."),Object(h.a)(Object(h.a)({},e),{},{recordHasChanged:!0});case"doNotUpdate":return console.log("Let it be."),Object(h.a)(Object(h.a)({},e),{},{recordHasChanged:!1});case"setHovered":return Object(h.a)(Object(h.a)({},e),{},{hoveredID:t.payload});case"showEditDrawer":return Object(h.a)(Object(h.a)({},e),{},{editDrawerVisible:!0,recordToEdit:t.payload});case"closeEditDrawer":return Object(h.a)(Object(h.a)({},e),{},{editDrawerVisible:!1});case"logSuccess":return Object(h.a)(Object(h.a)({},e),{},{alert:{type:"success",message:"Success!"}});case"logError":return Object(h.a)(Object(h.a)({},e),{},{alert:{type:"error",message:"Darn. Something went wrong."}});default:throw new Error("unknown action")}},N=r(346),H=r(81),T=r(44),E=r(351),R=N.a.Meta,z=function(e){var t=e.recordToDisplay,r=Object(c.useContext)(W).recordsDispatch,a=t.fundraiserName,n=(t.organization,t.products,t.deliveryCity),s=t.deliveryAddress,i=t.deliveryState,o=t.deliveryZip,l=t.deliveryNotes,u=(t.deliveryDate,t.daysUntilDelivery),j=t.contactFirstName,b=t.contactPhone,O=t.contactLastName,h=t.contactAddress,m=t.contactAddressLine2,x=t.contactCity,f=t.contactState,y=t.contactZip,p=t.contactPreferredMethod,v=t.contactEmail,g=t.status,I=t.buttCount,D=t.hamCount,P=t.turkeyCount,S=t.sauceCount,w=t.customerButtPrice,F=t.customerHamPrice,B=t.customerTurkeyPrice,k=t.customerSaucePrice,z=t.firehouseFee,$=t.orderTotals,A=(t.totalRevenue,t.sellerRecords),L=t.organizationProceeds,M=t.recordID,V=[];$&&$.map((function(e){return V.push(e)}));A&&A.length;var Z=I+D+P+S;var U=function(e){return e||"Inquiry"};return Object(d.jsx)("div",{className:"site-card-wrapper",children:Object(d.jsx)(N.a,{title:"".concat(a," (").concat(U(g),")"),className:U(g).toLowerCase(),style:{margin:"16px 0px",padding:"0px",backgroundColor:"#fafafa"},extra:Object(d.jsx)(d.Fragment,{children:Object(d.jsx)(C.a,{onClick:function(){return r({type:"showEditDrawer",payload:M})},children:"Edit"})}),children:Object(d.jsxs)(H.a,{type:"flex",gutter:16,children:[Object(d.jsx)(T.a,{flex:"1 1 30%",children:Object(d.jsxs)(T.a,{children:[Object(d.jsxs)(N.a,{bordered:!1,style:{height:"100%"},actions:[Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(C.a,{disabled:!0,children:"Download Labels"}),Object(d.jsx)(C.a,{disabled:!0,children:"Create Invoice"})]})],children:[Object(d.jsx)(R,{title:"COOK IN ______"})," ",Z>0?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{children:I>0&&"".concat(I," Butt").concat(I>1?"s":"")}),Object(d.jsx)("div",{children:D>0&&"".concat(D," Ham").concat(D>1?"s":"")}),Object(d.jsx)("div",{children:P>0&&"".concat(P," Turkey").concat(P>1?"s":"")}),Object(d.jsx)("div",{children:S>0&&"".concat(S," Sauce").concat(S>1?"s":"")})]}):Object(d.jsx)("div",{children:"No sales yet"})," "]}),Object(d.jsxs)(N.a,{bordered:!1,style:{height:"100%"},children:[Object(d.jsx)(R,{title:"THEIR PRODUCTS"}),Object(d.jsxs)(d.Fragment,{children:[" ",w&&Object(d.jsxs)("div",{children:["Boston Butts @ $",w]}),F&&Object(d.jsxs)("div",{children:["Half Hams @ $",F]}),B&&Object(d.jsxs)("div",{children:["Whole Turkeys @ $",B]}),k&&Object(d.jsxs)("div",{children:["BBQ Sauces @ $",k]})," "]})]})]})}),Object(d.jsx)(T.a,{flex:"1 1 30%",style:{height:"100%"},children:Object(d.jsxs)(N.a,{bordered:!1,children:[Object(d.jsx)(R,{title:u>0?"DELIVERY IN ".concat(u," DAYS"):"DELIVERY WAS ".concat(-u," DAYS AGO")}),Object(d.jsxs)(E.b,{layout:"vertical",column:1,children:[Object(d.jsxs)(E.b.Item,{label:"Address",children:[s,Object(d.jsx)("br",{}),n,", ",i,o]}),Object(d.jsx)(E.b.Item,{label:"Note",children:l}),Object(d.jsx)(E.b.Item,{label:""})]})]})}),Object(d.jsxs)(T.a,{flex:"1 1 30%",style:{height:"100%"},children:[Object(d.jsxs)(N.a,{bordered:!1,actions:[Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(C.a,{disabled:!0,children:"Reset Password"}),Object(d.jsx)(C.a,{disabled:!0,children:"Email Contact"})]})],children:[Object(d.jsx)(R,{title:"".concat(j.toUpperCase()," ").concat(O.toUpperCase())}),Object(d.jsxs)(E.b,{column:1,children:[Object(d.jsx)(E.b.Item,{label:"Phone",children:function(e){var t=(""+e).replace(/\D/g,"").match(/^(\d{3})(\d{3})(\d{4})$/);return t?"("+t[1]+") "+t[2]+"-"+t[3]:null}(b)}),Object(d.jsx)(E.b.Item,{label:"Email",children:v}),Object(d.jsx)(E.b.Item,{label:"Prefers",children:p}),Object(d.jsxs)(E.b.Item,{label:"Address",children:[h,m,Object(d.jsx)("br",{}),x,", ",f,y]})]})]}),Object(d.jsxs)(N.a,{bordered:!1,children:[Object(d.jsx)(R,{title:"FIREHOUSE PROFIT: $".concat(z)}),Object(d.jsxs)(E.b,{column:1,children:[Object(d.jsx)(E.b.Item,{label:"Their Paid Orders",children:V.length}),Object(d.jsxs)(E.b.Item,{label:"Their Proceeds",children:["$",L.toFixed(2)]}),Object(d.jsx)(E.b.Item,{label:""})]})]})]})]})})})},$=r(193),A=r(347),L=function(e){var t=e.message,r=e.type,a=Object(c.useState)(!0),n=Object(i.a)(a,2),s=n[0];n[1];return Object(c.useEffect)((function(){}),[]),Object(d.jsx)(d.Fragment,{children:s&&Object(d.jsx)(A.a,{showIcon:!0,style:{width:"95%"},message:t,closable:!0,type:r})})},M=function(){var e=Object(c.useContext)(W),t=(e.recordsDispatch,e.recordsState.alert),r=Object(c.useState)([]),a=Object(i.a)(r,2),n=a[0],s=a[1];return Object(c.useEffect)((function(){s((function(e){return[].concat(Object($.a)(e),[t])}))}),[t]),Object(d.jsx)("div",{className:"alertContainer",style:{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"},children:n.map((function(e,t){return Object(d.jsx)(L,{message:e.message,type:e.type},t)}))})},V=(r(339),w.a.Header),Z=w.a.Content,U=w.a.Sider,q=new S.a({apiKey:"key6YdKIazB8V0vOq"}).base("appWga5gfjEZX4q7X"),W=a.a.createContext(null),Q={focusedRecordID:"",viewFocusedRecord:!1,editDrawerVisible:!1,recordToEdit:"",alert:"",recordHasChanged:!1,hoveredID:null};var _=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),r=t[0],a=t[1],n=Object(c.useState)(!1),s=Object(i.a)(n,2),o=(s[0],s[1]),l=Object(c.useState)(""),u=Object(i.a)(l,2),j=u[0],h=u[1],m=Object(c.useReducer)(k,Q),x=Object(i.a)(m,2),y=x[0],p=x[1];return Object(c.useEffect)((function(){if(y.recordHasChanged)q("Fundraisers").select({view:"All Fields View"}).eachPage((function(e,t){a(e.map((function(e){return e.fields}))),t()}),(function(e){e&&console.error(e)})),p({type:"logSuccess"}),p({type:"doNotUpdate"}),o(!0);else{if(y.focusedRecordID)return null;q("Fundraisers").select({view:"All Fields View"}).eachPage((function(e,t){a(e.map((function(e){return e.fields}))),t()}),(function(e){e&&console.error(e)}))}}),[y]),Object(c.useEffect)((function(){h(Object(b.find)(r,Object(b.matchesProperty)("recordID",y.focusedRecordID)))}),[y,r]),Object(d.jsxs)(W.Provider,{value:{recordsState:y,recordsDispatch:p},children:[Object(d.jsxs)(w.a,{children:[Object(d.jsxs)(V,{style:{position:"fixed",zIndex:1e3,width:"100%"},children:[Object(d.jsxs)(F.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:[2],children:[Object(d.jsx)(F.a.Item,{children:"Fundraisers"},"1"),Object(d.jsx)(F.a.Item,{children:"Customers"},"2"),Object(d.jsx)(F.a.Item,{children:"Team"},"3")]}),y.alert&&Object(d.jsx)(M,{})]}),Object(d.jsx)(w.a,{children:Object(d.jsx)(U,{style:{overflow:"auto",height:"100vh",position:"fixed",left:0,backgroundColor:"#d9d9d9"},width:"auto",className:"site-layout-background",children:r[0]&&Object(d.jsx)(O,{setHovered:function(e){p({type:"setHovered",payload:e})},fundraisers:r})})}),Object(d.jsxs)(w.a,{className:"site-layout",style:{marginLeft:0},children:[Object(d.jsx)(V,{className:"site-layout-background",style:{padding:0}}),Object(d.jsxs)(Z,{style:{overflow:"initial",minHeight:"100vh"},children:[r[0]&&Object(d.jsx)(f,{fundraisers:r}),j&&Object(d.jsx)(z,{recordToDisplay:j})]})]})]}),y.editDrawerVisible&&Object(d.jsx)(B.a,{forceRender:!0,width:"80vw",visible:y.editDrawerVisible,onClose:function(){return p({type:"closeEditDrawer"})},children:Object(d.jsx)(D,{})})]})},Y=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,354)).then((function(t){var r=t.getCLS,c=t.getFID,a=t.getFCP,n=t.getLCP,s=t.getTTFB;r(e),c(e),a(e),n(e),s(e)}))};s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(_,{})}),document.getElementById("root")),Y()}},[[340,1,2]]]);
//# sourceMappingURL=main.522c7241.chunk.js.map