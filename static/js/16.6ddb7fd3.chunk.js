(this.webpackJsonpfirebase=this.webpackJsonpfirebase||[]).push([[16],{156:function(n,e,t){"use strict";t.r(e);var o=t(0),r=t(8),c=t.n(r),i=t(40),u=["ID","NAME","E-MAIL"],s=t(7),l=t(93);var a=Object(i.b)((function(n){return{columnSortBy:n.columnSortBy,isSortDescending:n.isSortDescending,nonSortableColumns:n.nonSortableColumns}}),(function(n){return{onSort:function(e){return n(Object(s.A)(e))}}}))((function(n){if(n){var e=n.columnSortBy,t=n.nonSortableColumns,r=n.isSortDescending,c=n.onSort,i=r?"\u2191":"\u2193";return o.createElement(l.b.wrapper,{onClick:function(n){var o=n.target.cellIndex;void 0!==t&&t.has(o)||c({isSortDescending:e===o&&!r,columnSortBy:o})}},o.createElement("tr",null,u.map((function(n,t){return o.createElement(l.b.section,{key:n}," ",e===t?n+i:n," ")}))))}}));e.default=a;a.propTypes={columnSortBy:c.a.number,isSortDescending:c.a.oneOf([!0,!1,null])}}}]);
//# sourceMappingURL=16.6ddb7fd3.chunk.js.map