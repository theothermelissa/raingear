(this.webpackJsonpselljar=this.webpackJsonpselljar||[]).push([[0],{217:function(e,t,r){},218:function(e,t,r){},296:function(e,t){},297:function(e,t){},353:function(e,t,r){"use strict";r.r(t);var c=r(0),a=r.n(c),n=r(28),s=r.n(n),i=(r(217),r(34)),o=(r(218),r(219),r(357)),d=function(e){switch(e){case"Inquiry":return"#f50";case"Active":return"#7cb305";case"Finalized":return"#faad14";case"Delivered":return"#597ef7";case"Cancelled":default:return"#bfbfbf"}},l=r(6),u=function(e){var t=e.fundraiser,r=t.organization,c=t.contactFirstName,a=t.contactPhone,n=t.contactEmail,s=t.status,i=t.deliveryDate;var u,j;return Object(l.jsxs)("div",{style:{backgroundColor:"white",padding:"8px 8px",margin:"2px 0px",width:"200px",borderRadius:"5px"},children:[Object(l.jsx)("h2",{style:{color:d(s),margin:0},children:(j=i,Object(o.a)(new Date(j),"MMMM dd"))}),Object(l.jsx)("h3",{style:{color:"#595959",margin:0},children:r}),Object(l.jsx)("div",{style:{color:"#595959"},children:c}),Object(l.jsx)("div",{style:{color:"#595959"},children:function(e){var t=(""+e).replace(/\D/g,"").match(/^(\d{3})(\d{3})(\d{4})$/);return t?"("+t[1]+") "+t[2]+"-"+t[3]:null}(a)}),Object(l.jsx)("a",{href:(u=n,"mailto:".concat(u)),children:"Email"})]})},j=r(364),b=r(47),h=function(e){var t=e.fundraisers,r=e.setHovered,a=Object(c.useState)(""),n=Object(i.a)(a,2),s=(n[0],n[1],Object(c.useContext)(Z).recordsDispatch);return Object(l.jsx)("div",{children:Object(l.jsx)("div",{children:Object(l.jsx)(j.a,{mode:"left",style:{marginLeft:"20px",padding:"100px 40px 0px 0px",maxWidth:"500px"},children:t.map((function(e){return Object(l.jsx)(j.a.Item,{onMouseEnter:function(){return r(e.recordID)},onMouseLeave:function(){return r(null)},onClick:function(){return function(e){var r=Object(b.find)(t,Object(b.matchesProperty)("organization",e));s({type:"chooseRecord",payload:r.recordID})}(e.organization)},color:d((c=e.status,c||"Inquiry")),children:Object(l.jsx)(u,{fundraiser:e})},e.recordID);var c}))})})})},O=r(24),m=r(366),x=r(356),f=function(e){var t=e.fundraisers,r=Object(c.useContext)(Z),a=r.recordsDispatch,n=r.recordsState.hoveredID,s=Object(c.useState)(""),u=Object(i.a)(s,2),j=u[0],h=u[1];Object(c.useEffect)((function(){h(t.map((function(e){return Object(O.a)(Object(O.a)({},e),{},{deliveryDate:(r=e.deliveryDate,Object(o.a)(new Date(r),"MMM dd")),organizationProceeds:"$".concat(Math.round(e.organizationProceeds)),totalRevenue:"$".concat(Math.round(e.totalRevenue)),firehouseFee:"$".concat(Math.round(e.firehouseFee)),isHovered:e.recordID===n,key:e.recordID,status:"".concat((t=e.status,t||"Inquiry"))});var t,r})))}),[t]);var f,y=Object(b.sortBy)(j,["priority","deliveryDate"]),p=function(e){return function(t,r){return t[e]>=r[e]?-1:1}},v=[{title:"Organization",dataIndex:"organization",key:"organization",sorter:p("organization"),render:function(e){return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{children:e})})}},{title:"Status",dataIndex:"status",key:"status",render:function(e){return Object(l.jsx)(l.Fragment,{children:e&&Object(l.jsxs)(m.a,{color:d(e),children:[e.toUpperCase()," "]},e)})},sorter:p("status")},{title:"Sales",dataIndex:"totalRevenue",key:"totalRevenue",sorter:function(e,t){return e.totalRevenue-t.totalRevenue},render:function(e){return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{children:e})})}},{title:"FH Total",dataIndex:"firehouseFee",key:"firehouseFee",render:function(e){return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{children:e})})}},{title:"Org Total",dataIndex:"organizationProceeds",key:"organizationProceeds",render:function(e){return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{children:e})})}},{title:"D-Date",dataIndex:"deliveryDate",key:"deliveryDate",render:function(e){return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("div",{children:e})})}},{title:"Products",dataIndex:"products",key:"products",filters:[{text:"Boston Butts",value:"Boston Butts"},{text:"Half Hams",value:"Half Hams"},{text:"Whole Turkeys",value:"Whole Turkeys"},{text:"BBQ Sauce",value:"BBQ Sauce"}],onFilter:(f="products",function(e,t){return 0===t[f].indexOf(e)}),render:function(e){return e.map((function(e){return function(e){switch(e){case"Boston Butts":return Object(l.jsxs)("div",{className:"tagContentHolder",children:[Object(l.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#597ef7"},children:"B"}),Object(l.jsx)("div",{className:"productTagName",style:{color:"#597ef7"},children:e})]},e);case"Half Hams":return Object(l.jsxs)("div",{className:"tagContentHolder",children:[Object(l.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#7cb305"},children:"H"}),Object(l.jsx)("div",{className:"productTagName",style:{color:"#7cb305"},children:e})]},e);case"Whole Turkeys":return Object(l.jsxs)("div",{className:"tagContentHolder",children:[Object(l.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#13c2c2"},children:"T"}),Object(l.jsx)("div",{className:"productTagName",style:{color:"#13c2c2"},children:e})]},e);case"BBQ Sauce":return Object(l.jsxs)("div",{className:"tagContentHolder",children:[Object(l.jsx)("div",{className:"circleBackground",style:{backgroundColor:"#9254de"},children:"S"}),Object(l.jsx)("div",{className:"productTagName",style:{color:"#9254de"},children:e})]},e);default:return null}}(e)}))}}];return Object(l.jsx)(l.Fragment,{children:j&&Object(l.jsx)("div",{children:Object(l.jsx)(x.a,{dataSource:y,columns:v,pagination:!1,size:"small",id:"fundraisersTable",scroll:{x:700,y:250},onRow:function(e,r){return{onClick:function(r){!function(e){var r=Object(b.find)(t,Object(b.matchesProperty)("organization",e));console.log("This is a new edit!"),a({type:"chooseRecord",payload:r.recordID})}(e.organization)},className:(c=e.recordID,c===n?"hovered":""),id:"row".concat(e.recordID),key:r};var c}})})})},y=r(359),p=r(99),v=r(126),g=r(361),C=r(360),I=r(55),D=function(){var e=Object(c.useContext)(Z),t=e.recordsDispatch,r=e.recordsState,a=r.recordToEdit,n=(r.editDrawerVisible,Object(c.useState)()),s=Object(i.a)(n,2),o=s[0],d=s[1],u=y.a.useForm(),j=Object(i.a)(u,1)[0];Object(c.useEffect)((function(){V("Fundraisers").find(a,(function(e,t){if(t.fields.status)d(t.fields);else{var r=t.fields,c=r.fundraiserName,a=r.organization,n=r.products,s=r.deliveryCity,i=r.deliveryAddress,o=r.deliveryState,l=r.deliveryZip,u=r.deliveryNotes,j=r.deliveryDate,b=r.daysUntilDelivery,h=r.contactFirstName,O=r.contactPhone,m=r.contactLastName,x=r.contactAddress,f=r.contactAddressLine2,y=r.contactCity,p=r.contactState,v=r.contactZip,g=r.contactPreferredMethod,C=r.contactEmail,I=(r.status,r.buttCount),D=r.hamCount,P=r.turkeyCount,w=r.sauceCount,F=r.customerButtPrice,S=r.customerHamPrice,B=r.customerTurkeyPrice,k=r.customerSaucePrice,N=r.firehouseFee,T=r.orderTotals,H=r.totalRevenue,E=r.sellerRecords,R=r.organizationProceeds,z=r.recordID;d({fundraiserName:c,organization:a,products:n,deliveryCity:s,deliveryAddress:i,deliveryState:o,deliveryZip:l,deliveryNotes:u,deliveryDate:j,daysUntilDelivery:b,contactFirstName:h,contactPhone:O,contactLastName:m,contactAddress:x,contactAddressLine2:f,contactCity:y,contactState:p,contactZip:v,contactPreferredMethod:g,contactEmail:C,status:"Inquiry",buttCount:I,hamCount:D,turkeyCount:P,sauceCount:w,customerButtPrice:F,customerHamPrice:S,customerTurkeyPrice:B,customerSaucePrice:k,firehouseFee:N,orderTotals:T,totalRevenue:H,sellerRecords:E,organizationProceeds:R,recordID:z})}e&&console.error(e)}))}),[]);var b=p.a.Option;return Object(l.jsx)("div",{children:o&&Object(l.jsxs)(y.a,Object(O.a)(Object(O.a)({},{labelCol:{span:8},wrapperCol:{span:16}}),{},{style:{width:"80%"},form:j,name:"control-hooks",initialValues:o,onFinish:function(e){console.log("values: ",e),console.log("recordToEdit: ",a),V("Fundraisers").update([{id:a,fields:e}],(function(e,t){e&&console.log("Error: ",e)})),t({type:"updateRecords"}),t({type:"closeEditDrawer"})},children:[Object(l.jsx)(y.a.Item,{name:"status",label:"Status",children:Object(l.jsxs)(v.a.Group,{children:[Object(l.jsx)(v.a,{value:"Inquiry",children:"Inquiry"}),Object(l.jsx)(v.a,{value:"Active",children:"Active"}),Object(l.jsx)(v.a,{value:"Finalized",children:"Finalized"}),Object(l.jsx)(v.a,{value:"Delivered",children:"Delivered"}),Object(l.jsx)(v.a,{value:"Cancelled",children:"Cancelled"})]})}),Object(l.jsx)(y.a.Item,{name:"deliveryAddress",label:"Delivery Address",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"deliveryCity",label:"Delivery City",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"deliveryState",label:"Delivery State",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"deliveryZip",label:"Delivery Zip",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"organization",label:"Organization",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactFirstName",label:"Primary Contact First Name",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactLastName",label:"Primary Contact Last Name",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactAddress",label:"Primary Contact Address",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactAddressLine2",label:"Primary Contact Address Line 2",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactCity",label:"Primary Contact City",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactState",label:"Primary Contact State",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactZip",label:"Primary Contact Zip",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactPreferredMethod",label:"Preferred Contact Method",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"contactEmail",label:"Primary Contact Email",children:Object(l.jsx)(g.a,{})}),Object(l.jsx)(y.a.Item,{name:"products",label:"Products",rules:[{type:"array"}],children:Object(l.jsxs)(p.a,{mode:"multiple",placeholder:"Edit Products",allowClear:!0,children:[Object(l.jsx)(b,{value:"Boston Butts",children:"Boston Butts"}),Object(l.jsx)(b,{value:"Half Hams",children:"Half Hams"}),Object(l.jsx)(b,{value:"Whole Turkeys",children:"Whole Turkeys"}),Object(l.jsx)(b,{value:"BBQ Sauce",children:"BBQ Sauce"})]})}),Object(l.jsx)(y.a.Item,{name:"firehouseButtPrice",label:"Firehouse Butt Price",children:Object(l.jsx)(C.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(l.jsx)(y.a.Item,{name:"firehouseHamPrice",label:"Firehouse Ham Price",children:Object(l.jsx)(C.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(l.jsx)(y.a.Item,{name:"firehouseTurkeyPrice",label:"Firehouse Turkey Price",children:Object(l.jsx)(C.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(l.jsx)(y.a.Item,{name:"firehouseSaucePrice",label:"Firehouse Sauce Price",children:Object(l.jsx)(C.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(l.jsx)(y.a.Item,{name:"customerButtPrice",label:"Customer Butt Price",children:Object(l.jsx)(C.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(l.jsx)(y.a.Item,{name:"customerHamPrice",label:"Customer Ham Price",children:Object(l.jsx)(C.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(l.jsx)(y.a.Item,{name:"customerTurkeyPrice",label:"Customer Turkey Price",children:Object(l.jsx)(C.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(l.jsx)(y.a.Item,{name:"customerSaucePrice",label:"Customer Sauce Price",children:Object(l.jsx)(C.a,{formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}})}),Object(l.jsx)(y.a.Item,Object(O.a)(Object(O.a)({},{wrapperCol:{offset:8,span:16}}),{},{children:Object(l.jsx)(I.a,{type:"primary",htmlType:"submit",children:"Submit"})}))]}))})},P=r(202),w=r.n(P),F=r(355),S=r(209),B=r(72),k=r(362),N=function(e,t){switch(t.type){case"setRecords":return Object(O.a)(Object(O.a)({},e),{},{allRecords:t.payload});case"chooseRecord":return Object(O.a)(Object(O.a)({},e),{},{focusedRecordID:t.payload,viewFocusedRecord:!0});case"updateRecords":return Object(O.a)(Object(O.a)({},e),{},{recordHasChanged:!0});case"doNotUpdate":return Object(O.a)(Object(O.a)({},e),{},{recordHasChanged:!1});case"setHovered":return Object(O.a)(Object(O.a)({},e),{},{hoveredID:t.payload});case"showEditDrawer":return Object(O.a)(Object(O.a)({},e),{},{editDrawerVisible:!0,recordToEdit:t.payload});case"closeEditDrawer":return Object(O.a)(Object(O.a)({},e),{},{editDrawerVisible:!1});case"recordChangeComplete":return Object(O.a)(Object(O.a)({},e),{},{alert:{type:"success",message:"Success!"},recordHasChanged:!1});case"logError":return Object(O.a)(Object(O.a)({},e),{},{alert:{type:"error",message:"Darn. Something went wrong."}});default:throw new Error("unknown action")}},T=r(358),H=r(88),E=r(49),R=r(363),z=T.a.Meta,$=function(e){var t=e.recordToDisplay,r=Object(c.useContext)(Z).recordsDispatch,a=t.fundraiserName,n=(t.organization,t.products,t.deliveryCity),s=t.deliveryAddress,i=t.deliveryState,o=t.deliveryZip,d=t.deliveryNotes,u=(t.deliveryDate,t.daysUntilDelivery),j=t.contactFirstName,b=t.contactPhone,h=t.contactLastName,O=t.contactAddress,m=t.contactAddressLine2,x=t.contactCity,f=t.contactState,y=t.contactZip,p=t.contactPreferredMethod,v=t.contactEmail,g=t.status,C=t.buttCount,D=t.hamCount,P=t.turkeyCount,w=t.sauceCount,F=t.customerButtPrice,S=t.customerHamPrice,B=t.customerTurkeyPrice,k=t.customerSaucePrice,N=t.firehouseFee,$=t.orderTotals,A=(t.totalRevenue,t.sellerRecords),L=t.organizationProceeds,M=t.recordID,V=[];$&&$.map((function(e){return V.push(e)}));A&&A.length;var U=C+D+P+w;var q=function(e){return e||"Inquiry"};return Object(l.jsx)("div",{className:"site-card-wrapper",children:Object(l.jsx)(T.a,{title:"".concat(a," (").concat(q(g),")"),className:q(g).toLowerCase(),style:{margin:"16px 0px",padding:"0px",backgroundColor:"#fafafa"},extra:Object(l.jsx)(l.Fragment,{children:Object(l.jsx)(I.a,{onClick:function(){return r({type:"showEditDrawer",payload:M})},children:"Edit"})}),children:Object(l.jsxs)(H.a,{type:"flex",gutter:16,children:[Object(l.jsx)(E.a,{flex:"1 1 30%",children:Object(l.jsxs)(E.a,{children:[Object(l.jsxs)(T.a,{bordered:!1,style:{height:"100%"},actions:[Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(I.a,{disabled:!0,children:"Download Labels"}),Object(l.jsx)(I.a,{disabled:!0,children:"Create Invoice"})]})],children:[Object(l.jsx)(z,{title:"COOK IN ______"})," ",U>0?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{children:C>0&&"".concat(C," Butt").concat(C>1?"s":"")}),Object(l.jsx)("div",{children:D>0&&"".concat(D," Ham").concat(D>1?"s":"")}),Object(l.jsx)("div",{children:P>0&&"".concat(P," Turkey").concat(P>1?"s":"")}),Object(l.jsx)("div",{children:w>0&&"".concat(w," Sauce").concat(w>1?"s":"")})]}):Object(l.jsx)("div",{children:"No sales yet"})," "]}),Object(l.jsxs)(T.a,{bordered:!1,style:{height:"100%"},children:[Object(l.jsx)(z,{title:"THEIR PRODUCTS"}),Object(l.jsxs)(l.Fragment,{children:[" ",F&&Object(l.jsxs)("div",{children:["Boston Butts @ $",F]}),S&&Object(l.jsxs)("div",{children:["Half Hams @ $",S]}),B&&Object(l.jsxs)("div",{children:["Whole Turkeys @ $",B]}),k&&Object(l.jsxs)("div",{children:["BBQ Sauces @ $",k]})," "]})]})]})}),Object(l.jsx)(E.a,{flex:"1 1 30%",style:{height:"100%"},children:Object(l.jsxs)(T.a,{bordered:!1,children:[Object(l.jsx)(z,{title:u>0?"DELIVERY IN ".concat(u," DAYS"):"DELIVERY WAS ".concat(-u," DAYS AGO")}),Object(l.jsxs)(R.b,{layout:"vertical",column:1,children:[Object(l.jsxs)(R.b.Item,{label:"Address",children:[s,Object(l.jsx)("br",{}),n,", ",i,o]}),Object(l.jsx)(R.b.Item,{label:"Note",children:d}),Object(l.jsx)(R.b.Item,{label:""})]})]})}),Object(l.jsxs)(E.a,{flex:"1 1 30%",style:{height:"100%"},children:[Object(l.jsxs)(T.a,{bordered:!1,actions:[Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(I.a,{disabled:!0,children:"Reset Password"}),Object(l.jsx)(I.a,{disabled:!0,children:"Email Contact"})]})],children:[Object(l.jsx)(z,{title:"".concat(j.toUpperCase()," ").concat(h.toUpperCase())}),Object(l.jsxs)(R.b,{column:1,children:[Object(l.jsx)(R.b.Item,{label:"Phone",children:function(e){var t=(""+e).replace(/\D/g,"").match(/^(\d{3})(\d{3})(\d{4})$/);return t?"("+t[1]+") "+t[2]+"-"+t[3]:null}(b)}),Object(l.jsx)(R.b.Item,{label:"Email",children:v}),Object(l.jsx)(R.b.Item,{label:"Prefers",children:p}),Object(l.jsxs)(R.b.Item,{label:"Address",children:[O,m,Object(l.jsx)("br",{}),x,", ",f,y]})]})]}),Object(l.jsxs)(T.a,{bordered:!1,children:[Object(l.jsx)(z,{title:"FIREHOUSE PROFIT: $".concat(N)}),Object(l.jsxs)(R.b,{column:1,children:[Object(l.jsx)(R.b.Item,{label:"Their Paid Orders",children:V.length}),Object(l.jsxs)(R.b.Item,{label:"Their Proceeds",children:["$",L.toFixed(2)]}),Object(l.jsx)(R.b.Item,{label:""})]})]})]})]})})})},A=(r(205),r(365),r(352),F.a.Header),L=F.a.Content,M=F.a.Sider,V=new w.a({apiKey:"key6YdKIazB8V0vOq"}).base("appWga5gfjEZX4q7X"),Z=a.a.createContext(null),U={focusedRecordID:"",viewFocusedRecord:!1,editDrawerVisible:!1,recordToEdit:"",alert:"",recordHasChanged:!1,hoveredID:null};var q=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),r=t[0],a=t[1],n=Object(c.useState)(""),s=Object(i.a)(n,2),o=s[0],d=s[1],u=Object(c.useReducer)(N,U),j=Object(i.a)(u,2),O=j[0],m=j[1];return Object(c.useEffect)((function(){O.recordHasChanged?(V("Fundraisers").select({view:"All Fields View"}).eachPage((function(e,t){a(e.map((function(e){return e.fields}))),t()}),(function(e){if(e)return console.error(e),void S.a.error({message:"Uh oh...",description:"Something went wrong :( \n ".concat(e),placement:"topLeft",duration:0});S.a.success({message:"Success!",description:"Saved the record",placement:"topLeft",duration:2})})),m({type:"recordChangeComplete"})):O.focusedRecordID||V("Fundraisers").select({view:"All Fields View"}).eachPage((function(e,t){a(e.map((function(e){return e.fields}))),t()}),(function(e){e&&console.error(e)}))}),[O]),Object(c.useEffect)((function(){d(Object(b.find)(r,Object(b.matchesProperty)("recordID",O.focusedRecordID)))}),[O,r]),Object(l.jsxs)(Z.Provider,{value:{recordsState:O,recordsDispatch:m},children:[Object(l.jsxs)(F.a,{children:[Object(l.jsx)(A,{style:{position:"fixed",zIndex:1e3,width:"100%"},children:Object(l.jsxs)(B.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:[2],children:[Object(l.jsx)(B.a.Item,{children:"Fundraisers"},"1"),Object(l.jsx)(B.a.Item,{children:"Customers"},"2"),Object(l.jsx)(B.a.Item,{children:"Team"},"3")]})}),Object(l.jsx)(F.a,{children:Object(l.jsx)(M,{style:{overflow:"auto",height:"100vh",position:"fixed",left:0,backgroundColor:"#d9d9d9"},width:"auto",className:"site-layout-background",children:r[0]&&Object(l.jsx)(h,{setHovered:function(e){m({type:"setHovered",payload:e})},fundraisers:r})})}),Object(l.jsxs)(F.a,{className:"site-layout",style:{marginLeft:0},children:[Object(l.jsx)(A,{className:"site-layout-background",style:{padding:0}}),Object(l.jsxs)(L,{style:{overflow:"initial",minHeight:"100vh"},children:[r[0]&&Object(l.jsx)(f,{fundraisers:r}),o&&Object(l.jsx)($,{recordToDisplay:o})]})]})]}),O.editDrawerVisible&&Object(l.jsx)(k.a,{forceRender:!0,width:"80vw",visible:O.editDrawerVisible,onClose:function(){return m({type:"closeEditDrawer"})},children:Object(l.jsx)(D,{})})]})},W=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,367)).then((function(t){var r=t.getCLS,c=t.getFID,a=t.getFCP,n=t.getLCP,s=t.getTTFB;r(e),c(e),a(e),n(e),s(e)}))};s.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(q,{})}),document.getElementById("root")),W()}},[[353,1,2]]]);
//# sourceMappingURL=main.8caecd73.chunk.js.map