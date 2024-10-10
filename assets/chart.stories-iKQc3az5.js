import{k as g}from"./lit-element-CHc5qsYe.js";const _={args:{spec:{$schema:"https://vega.github.io/schema/vega-lite/v5.json",description:"A simple bar chart with embedded data.",data:{values:[{a:"A",b:28},{a:"B",b:55},{a:"C",b:43},{a:"D",b:91},{a:"E",b:81},{a:"F",b:53},{a:"G",b:19},{a:"H",b:87},{a:"I",b:52}]},mark:{type:"bar",tooltip:!0,fill:"#004170"},encoding:{x:{field:"a",type:"ordinal"},y:{field:"b",type:"quantitative"}}}}},D={args:{spec:{$schema:"https://vega.github.io/schema/vega-lite/v5.json",description:"A simple bar chart with data passed from external property.",data:{name:"myData"},mark:{type:"bar",tooltip:!0,fill:"#004170"},encoding:{x:{field:"a",type:"ordinal"},y:{field:"b",type:"quantitative"}}},dataValues:{myData:[{a:"A",b:28},{a:"B",b:55},{a:"C",b:43},{a:"D",b:91},{a:"E",b:81},{a:"F",b:53},{a:"G",b:19},{a:"H",b:87},{a:"I",b:52}]}}},x={args:{spec:{$schema:"https://vega.github.io/schema/vega-lite/v5.json",description:"A chart visualizing data fetched from a geoDB endpoint",data:{url:"https://xcube-geodb.brockmann-consult.de/gtif/f0ad1e25-98fa-4b82-9228-815ab24f5dd1/GTIF_no2_data?and=(date.gte.2022-01-01,date.lte.2022-01-05)&select=no2_ec_station_ppbv,date",parse:{no2_ec_station_ppbv:"number",date:"date"}},encoding:{x:{field:"date",type:"temporal"}},layer:[{encoding:{y:{field:"no2_ec_station_ppbv",type:"quantitative"}},layer:[{mark:"line"},{transform:[{filter:{param:"hover",empty:!1}}],mark:"point"}]},{mark:"rule",encoding:{opacity:{condition:{value:.3,param:"hover",empty:!1},value:0},tooltip:[{field:"no2_ec_station_ppbv",type:"quantitative"}]},params:[{name:"hover",select:{type:"point",fields:["date"],nearest:!0,on:"pointerover",clear:"pointerout"}}]}]}}},B={title:"Elements/eox-chart",tags:["autodocs"],component:"eox-chart",render:r=>g`
    <eox-chart
      .spec=${r.spec}
      .dataValues=${r.dataValues}
      .noShadow=${r.noShadow}
      .unstyled=${r.unstyled}
      style="width:100%; height: 400px;"
    ></eox-chart>
  `},a=_,e=D,t=x;var o,s,i,n,d;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:"PrimaryStory",...(i=(s=a.parameters)==null?void 0:s.docs)==null?void 0:i.source},description:{story:"Basic chart example",...(d=(n=a.parameters)==null?void 0:n.docs)==null?void 0:d.description}}};var c,p,l,m,u;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:"DataValuesStory",...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source},description:{story:"Set the data values manually after chart initialization",...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.description}}};var b,y,h,v,f;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:"GeoDBStory",...(h=(y=t.parameters)==null?void 0:y.docs)==null?void 0:h.source},description:{story:"Retrieve and display data from geoDB endpoint",...(f=(v=t.parameters)==null?void 0:v.docs)==null?void 0:f.description}}};const S=["Primary","DataValues","GeoDB"];export{e as DataValues,t as GeoDB,a as Primary,S as __namedExportsOrder,B as default};
