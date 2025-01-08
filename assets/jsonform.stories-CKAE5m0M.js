import{x as L}from"./lit-element-Dh4_iwrW.js";import{J as we}from"./core-C4kcdPvA.js";const Re="object",_e={vminmax:{type:"object",properties:{vmin:{type:"number",minimum:0,maximum:10,format:"range"},vmax:{type:"number",minimum:0,maximum:10,format:"range"}},format:"minmax"},cbar:{type:"string",enum:["rain","temperature"]}},$e={type:Re,properties:_e},Ue={args:{schema:$e}},Ye="Variable",He=[{type:"object",required:["stac_version","id","type","title","description","links"],properties:{stac_version:{type:"string",enum:["1.0.0","1.1.0"],options:{hidden:!0}},stac_extensions:{options:{hidden:!0},allOf:[{title:"Implemented STAC Extensions",type:"array",format:"stac-extensions",items:{type:"string",format:"url"}}]},id:{type:"string",options:{hidden:!0}},type:{type:"string",enum:["Catalog"],options:{hidden:!0}},title:{title:"Title",type:"string",minLength:1},description:{title:"Description",type:"string",minLength:1,format:"markdown"},links:{title:"Links",type:"array",options:{disable_array_reorder:!0,collapsed:!0,disable_collapse:!1},items:{type:"object",required:["href","title","type","rel"],properties:{href:{title:"Address",description:"The URL of the linked resource.",type:"string",minLength:1,format:"url"},title:{title:"Title",type:"string",minLength:1},type:{title:"File Format",description:"The media type of the linked resource.",type:"string"},rel:{title:"Relation",type:"string"}}}}},definitions:{stac_version:{type:"string",enum:["1.0.0","1.1.0"],options:{hidden:!0}},stac_extensions:{title:"Implemented STAC Extensions",type:"array",format:"stac-extensions",items:{type:"string",format:"url"}},id:{type:"string",options:{hidden:!0}},title:{title:"Title",type:"string",minLength:1},description:{title:"Description",type:"string",minLength:1,format:"markdown"},links:{title:"Links",type:"array",options:{disable_array_reorder:!0,collapsed:!0,disable_collapse:!1},items:{type:"object",required:["href","title","type","rel"],properties:{href:{title:"Address",description:"The URL of the linked resource.",type:"string",minLength:1,format:"url"},title:{title:"Title",type:"string",minLength:1},type:{title:"File Format",description:"The media type of the linked resource.",type:"string"},rel:{title:"Relation",type:"string"}}}},link:{type:"object",required:["href","title","type","rel"],properties:{href:{title:"Address",description:"The URL of the linked resource.",type:"string",minLength:1,format:"url"},title:{title:"Title",type:"string",minLength:1},type:{title:"File Format",description:"The media type of the linked resource.",type:"string"},rel:{title:"Relation",type:"string"}}},links_root_parent_via_other:{properties:{links:{items:{oneOf:[{title:"Other Link",properties:{rel:{not:{enum:["root","parent","child","via"]}}}},{title:"STAC Root Link",properties:{href:{readOnly:!0},title:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["root"],options:{hidden:!0}}}},{title:"STAC Parent Link",properties:{href:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["parent"],options:{hidden:!0}}}},{title:"Via Link",properties:{type:{enum:["application/json","application/pdf","application/zip","text/html","text/plain"],options:{enum_titles:["JSON","PDF","ZIP","HTML","Text"]}},rel:{enum:["via"],options:{hidden:!0}}}}]}}}},links_root_parent_child:{properties:{links:{items:{oneOf:[{title:"STAC Root Link",properties:{href:{readOnly:!0},title:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["root"],options:{hidden:!0}}}},{allOf:[{title:"STAC Parent Link",properties:{href:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["parent"],options:{hidden:!0}}}},{properties:{title:{readOnly:!0}}}]},{title:"STAC Child Link",properties:{type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["child"],options:{hidden:!0}}}}]}}}},stac_link_root:{title:"STAC Root Link",properties:{href:{readOnly:!0},title:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["root"],options:{hidden:!0}}}},stac_link_parent:{title:"STAC Parent Link",properties:{href:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["parent"],options:{hidden:!0}}}},stac_link_parent_readonly:{allOf:[{title:"STAC Parent Link",properties:{href:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["parent"],options:{hidden:!0}}}},{properties:{title:{readOnly:!0}}}]},stac_link_child:{title:"STAC Child Link",properties:{type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["child"],options:{hidden:!0}}}},via_links:{title:"Via Link",properties:{type:{enum:["application/json","application/pdf","application/zip","text/html","text/plain"],options:{enum_titles:["JSON","PDF","ZIP","HTML","Text"]}},rel:{enum:["via"],options:{hidden:!0}}}},other_links:{title:"Other Link",properties:{rel:{not:{enum:["root","parent","child","via"]}}}}}},{properties:{links:{items:{oneOf:[{title:"Other Link",properties:{rel:{not:{enum:["root","parent","child","via"]}}}},{title:"STAC Root Link",properties:{href:{readOnly:!0},title:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["root"],options:{hidden:!0}}}},{title:"STAC Parent Link",properties:{href:{readOnly:!0},type:{enum:["application/json"],options:{hidden:!0}},rel:{enum:["parent"],options:{hidden:!0}}}},{title:"Via Link",properties:{type:{enum:["application/json","application/pdf","application/zip","text/html","text/plain"],options:{enum_titles:["JSON","PDF","ZIP","HTML","Text"]}},rel:{enum:["via"],options:{hidden:!0}}}}]}}}},{required:["themes"],properties:{themes:{title:"Themes",type:"array",minItems:1,items:{type:"object",required:["concepts","scheme"],properties:{concepts:{type:"array",minItems:1,items:{type:"object",required:["id"],properties:{id:{type:"string",minLength:1},title:{type:"string",minLength:1},description:{type:"string",minLength:1},url:{type:"string",format:"uri"}}}},scheme:{type:"string",minLength:1}},oneOf:[{title:"Other",not:{required:["scheme"],properties:{scheme:{enum:["https://github.com/stac-extensions/osc#theme"],options:{hidden:!0}}}}},{title:"OSC",type:"object",format:"osc-themes-concepts",required:["scheme"],properties:{scheme:{enum:["https://github.com/stac-extensions/osc#theme"],options:{hidden:!0}}}}]}}}}],Ge={title:Ye,allOf:He},Je="Catalog",qe="ablation-zones-accumulation-zones",Ve="1.0.0",We="Pertaining to the reduction of a glacier due to melting and/or evaporation.",Ke=[{rel:"root",href:"../../catalog.json",type:"application/json",title:"Open Science Catalog"},{rel:"via",href:"https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/Earth%20Science/95fbaefd-1afe-4887-a1ba-fc338a8109bb?gtm_keyword=ABLATION%20ZONES/ACCUMULATION%20ZONES&gtm_scheme=Earth%20Science",type:"text/html",title:"Description"},{rel:"parent",href:"../catalog.json",type:"application/json",title:"Variables"}],Ze=["https://stac-extensions.github.io/themes/v1.0.0/schema.json"],ze=[{scheme:"https://github.com/stac-extensions/osc#theme",concepts:[{id:"Cryosphere"}]}],Xe="Ablation Zones/Accumulation Zones",Me={type:Je,id:qe,stac_version:Ve,description:We,links:Ke,stac_extensions:Ze,themes:ze,title:Xe},Qe={args:{schema:Ge,value:Me}},et="Products",tt=JSON.parse('[{"type":"object","required":["stac_version","id","type","title","description","license","extent","links"],"properties":{"stac_version":{"type":"string","enum":["1.0.0","1.1.0"],"options":{"hidden":true}},"stac_extensions":{"title":"Implemented STAC Extensions","type":"array","format":"stac-extensions","items":{"type":"string","format":"url"}},"id":{"type":"string","options":{"hidden":true}},"type":{"type":"string","enum":["Collection"],"options":{"hidden":true}},"title":{"title":"Title","type":"string","minLength":1},"description":{"title":"Description","type":"string","minLength":1,"format":"markdown"},"keywords":{"title":"Keywords","type":"array","items":{"type":"string","minLength":1},"uniqueItems":true},"license":{"title":"License","type":"string","enum":["various","proprietary","0BSD","AAL","Abstyles","AdaCore-doc","Adobe-2006","Adobe-Glyph","Adobe-Utopia","ADSL","AFL-1.1","AFL-1.2","AFL-2.0","AFL-2.1","AFL-3.0","Afmparse","AGPL-1.0-only","AGPL-1.0-or-later","AGPL-3.0-only","AGPL-3.0-or-later","Aladdin","AMDPLPA","AML","AMPAS","ANTLR-PD","ANTLR-PD-fallback","Apache-1.0","Apache-1.1","Apache-2.0","APAFML","APL-1.0","App-s2p","APSL-1.0","APSL-1.1","APSL-1.2","APSL-2.0","Arphic-1999","Artistic-1.0","Artistic-1.0-cl8","Artistic-1.0-Perl","Artistic-2.0","ASWF-Digital-Assets-1.0","ASWF-Digital-Assets-1.1","Baekmuk","Bahyph","Barr","Beerware","Bitstream-Charter","Bitstream-Vera","BitTorrent-1.0","BitTorrent-1.1","blessing","BlueOak-1.0.0","Boehm-GC","Borceux","Brian-Gladman-3-Clause","BSD-1-Clause","BSD-2-Clause","BSD-2-Clause-Patent","BSD-2-Clause-Views","BSD-3-Clause","BSD-3-Clause-Attribution","BSD-3-Clause-Clear","BSD-3-Clause-flex","BSD-3-Clause-HP","BSD-3-Clause-LBNL","BSD-3-Clause-Modification","BSD-3-Clause-No-Military-License","BSD-3-Clause-No-Nuclear-License","BSD-3-Clause-No-Nuclear-License-2014","BSD-3-Clause-No-Nuclear-Warranty","BSD-3-Clause-Open-MPI","BSD-3-Clause-Sun","BSD-4-Clause","BSD-4-Clause-Shortened","BSD-4-Clause-UC","BSD-4.3RENO","BSD-4.3TAHOE","BSD-Advertising-Acknowledgement","BSD-Attribution-HPND-disclaimer","BSD-Inferno-Nettverk","BSD-Protection","BSD-Source-Code","BSD-Systemics","BSL-1.0","BUSL-1.1","bzip2-1.0.6","C-UDA-1.0","CAL-1.0","CAL-1.0-Combined-Work-Exception","Caldera","CATOSL-1.1","CC-BY-1.0","CC-BY-2.0","CC-BY-2.5","CC-BY-2.5-AU","CC-BY-3.0","CC-BY-3.0-AT","CC-BY-3.0-DE","CC-BY-3.0-IGO","CC-BY-3.0-NL","CC-BY-3.0-US","CC-BY-4.0","CC-BY-NC-1.0","CC-BY-NC-2.0","CC-BY-NC-2.5","CC-BY-NC-3.0","CC-BY-NC-3.0-DE","CC-BY-NC-4.0","CC-BY-NC-ND-1.0","CC-BY-NC-ND-2.0","CC-BY-NC-ND-2.5","CC-BY-NC-ND-3.0","CC-BY-NC-ND-3.0-DE","CC-BY-NC-ND-3.0-IGO","CC-BY-NC-ND-4.0","CC-BY-NC-SA-1.0","CC-BY-NC-SA-2.0","CC-BY-NC-SA-2.0-DE","CC-BY-NC-SA-2.0-FR","CC-BY-NC-SA-2.0-UK","CC-BY-NC-SA-2.5","CC-BY-NC-SA-3.0","CC-BY-NC-SA-3.0-DE","CC-BY-NC-SA-3.0-IGO","CC-BY-NC-SA-4.0","CC-BY-ND-1.0","CC-BY-ND-2.0","CC-BY-ND-2.5","CC-BY-ND-3.0","CC-BY-ND-3.0-DE","CC-BY-ND-4.0","CC-BY-SA-1.0","CC-BY-SA-2.0","CC-BY-SA-2.0-UK","CC-BY-SA-2.1-JP","CC-BY-SA-2.5","CC-BY-SA-3.0","CC-BY-SA-3.0-AT","CC-BY-SA-3.0-DE","CC-BY-SA-3.0-IGO","CC-BY-SA-4.0","CC-PDDC","CC0-1.0","CDDL-1.0","CDDL-1.1","CDL-1.0","CDLA-Permissive-1.0","CDLA-Permissive-2.0","CDLA-Sharing-1.0","CECILL-1.0","CECILL-1.1","CECILL-2.0","CECILL-2.1","CECILL-B","CECILL-C","CERN-OHL-1.1","CERN-OHL-1.2","CERN-OHL-P-2.0","CERN-OHL-S-2.0","CERN-OHL-W-2.0","CFITSIO","check-cvs","checkmk","ClArtistic","Clips","CMU-Mach","CNRI-Jython","CNRI-Python","CNRI-Python-GPL-Compatible","COIL-1.0","Community-Spec-1.0","Condor-1.1","copyleft-next-0.3.0","copyleft-next-0.3.1","Cornell-Lossless-JPEG","CPAL-1.0","CPL-1.0","CPOL-1.02","Cronyx","Crossword","CrystalStacker","CUA-OPL-1.0","Cube","curl","D-FSL-1.0","diffmark","DL-DE-BY-2.0","DL-DE-ZERO-2.0","DOC","Dotseqn","DRL-1.0","DSDP","dtoa","dvipdfm","ECL-1.0","ECL-2.0","EFL-1.0","EFL-2.0","eGenix","Elastic-2.0","Entessa","EPICS","EPL-1.0","EPL-2.0","ErlPL-1.1","etalab-2.0","EUDatagrid","EUPL-1.0","EUPL-1.1","EUPL-1.2","Eurosym","Fair","FBM","FDK-AAC","Ferguson-Twofish","Frameworx-1.0","FreeBSD-DOC","FreeImage","FSFAP","FSFUL","FSFULLR","FSFULLRWD","FTL","Furuseth","fwlw","GD","GFDL-1.1-invariants-only","GFDL-1.1-invariants-or-later","GFDL-1.1-no-invariants-only","GFDL-1.1-no-invariants-or-later","GFDL-1.1-only","GFDL-1.1-or-later","GFDL-1.2-invariants-only","GFDL-1.2-invariants-or-later","GFDL-1.2-no-invariants-only","GFDL-1.2-no-invariants-or-later","GFDL-1.2-only","GFDL-1.2-or-later","GFDL-1.3-invariants-only","GFDL-1.3-invariants-or-later","GFDL-1.3-no-invariants-only","GFDL-1.3-no-invariants-or-later","GFDL-1.3-only","GFDL-1.3-or-later","Giftware","GL2PS","Glide","Glulxe","GLWTPL","gnuplot","GPL-1.0-only","GPL-1.0-or-later","GPL-2.0-only","GPL-2.0-or-later","GPL-3.0-only","GPL-3.0-or-later","Graphics-Gems","gSOAP-1.3b","HaskellReport","Hippocratic-2.1","HP-1986","HP-1989","HPND","HPND-DEC","HPND-doc","HPND-doc-sell","HPND-export-US","HPND-export-US-modify","HPND-Markus-Kuhn","HPND-Pbmplus","HPND-sell-regexpr","HPND-sell-variant","HPND-sell-variant-MIT-disclaimer","HPND-UC","HTMLTIDY","IBM-pibs","ICU","IEC-Code-Components-EULA","IJG","IJG-short","ImageMagick","iMatix","Imlib2","Info-ZIP","Inner-Net-2.0","Intel","Intel-ACPI","Interbase-1.0","IPA","IPL-1.0","ISC","Jam","JasPer-2.0","JPL-image","JPNIC","JSON","Kastrup","Kazlib","Knuth-CTAN","LAL-1.2","LAL-1.3","Latex2e","Latex2e-translated-notice","Leptonica","LGPL-2.0-only","LGPL-2.0-or-later","LGPL-2.1-only","LGPL-2.1-or-later","LGPL-3.0-only","LGPL-3.0-or-later","LGPLLR","Libpng","libpng-2.0","libselinux-1.0","libtiff","libutil-David-Nugent","LiLiQ-P-1.1","LiLiQ-R-1.1","LiLiQ-Rplus-1.1","Linux-man-pages-1-para","Linux-man-pages-copyleft","Linux-man-pages-copyleft-2-para","Linux-man-pages-copyleft-var","Linux-OpenIB","LOOP","LPL-1.0","LPL-1.02","LPPL-1.0","LPPL-1.1","LPPL-1.2","LPPL-1.3a","LPPL-1.3c","lsof","Lucida-Bitmap-Fonts","LZMA-SDK-9.11-to-9.20","LZMA-SDK-9.22","magaz","MakeIndex","Martin-Birgmeier","McPhee-slideshow","metamail","Minpack","MirOS","MIT","MIT-0","MIT-advertising","MIT-CMU","MIT-enna","MIT-feh","MIT-Festival","MIT-Modern-Variant","MIT-open-group","MIT-testregex","MIT-Wu","MITNFA","MMIXware","Motosoto","MPEG-SSG","mpi-permissive","mpich2","MPL-1.0","MPL-1.1","MPL-2.0","MPL-2.0-no-copyleft-exception","mplus","MS-LPL","MS-PL","MS-RL","MTLL","MulanPSL-1.0","MulanPSL-2.0","Multics","Mup","NAIST-2003","NASA-1.3","Naumen","NBPL-1.0","NCGL-UK-2.0","NCSA","Net-SNMP","NetCDF","Newsletr","NGPL","NICTA-1.0","NIST-PD","NIST-PD-fallback","NIST-Software","NLOD-1.0","NLOD-2.0","NLPL","Nokia","NOSL","Noweb","NPL-1.0","NPL-1.1","NPOSL-3.0","NRL","NTP","NTP-0","O-UDA-1.0","OCCT-PL","OCLC-2.0","ODbL-1.0","ODC-By-1.0","OFFIS","OFL-1.0","OFL-1.0-no-RFN","OFL-1.0-RFN","OFL-1.1","OFL-1.1-no-RFN","OFL-1.1-RFN","OGC-1.0","OGDL-Taiwan-1.0","OGL-Canada-2.0","OGL-UK-1.0","OGL-UK-2.0","OGL-UK-3.0","OGTSL","OLDAP-1.1","OLDAP-1.2","OLDAP-1.3","OLDAP-1.4","OLDAP-2.0","OLDAP-2.0.1","OLDAP-2.1","OLDAP-2.2","OLDAP-2.2.1","OLDAP-2.2.2","OLDAP-2.3","OLDAP-2.4","OLDAP-2.5","OLDAP-2.6","OLDAP-2.7","OLDAP-2.8","OLFL-1.3","OML","OpenPBS-2.3","OpenSSL","OPL-1.0","OPL-UK-3.0","OPUBL-1.0","OSET-PL-2.1","OSL-1.0","OSL-1.1","OSL-2.0","OSL-2.1","OSL-3.0","PADL","Parity-6.0.0","Parity-7.0.0","PDDL-1.0","PHP-3.0","PHP-3.01","Plexus","pnmstitch","PolyForm-Noncommercial-1.0.0","PolyForm-Small-Business-1.0.0","PostgreSQL","PSF-2.0","psfrag","psutils","Python-2.0","Python-2.0.1","python-ldap","Qhull","QPL-1.0","QPL-1.0-INRIA-2004","Rdisc","RHeCos-1.1","RPL-1.1","RPL-1.5","RPSL-1.0","RSA-MD","RSCPL","Ruby","SAX-PD","Saxpath","SCEA","SchemeReport","Sendmail","Sendmail-8.23","SGI-B-1.0","SGI-B-1.1","SGI-B-2.0","SGI-OpenGL","SGP4","SHL-0.5","SHL-0.51","SimPL-2.0","SISSL","SISSL-1.2","SL","Sleepycat","SMLNJ","SMPPL","SNIA","snprintf","Soundex","Spencer-86","Spencer-94","Spencer-99","SPL-1.0","ssh-keyscan","SSH-OpenSSH","SSH-short","SSPL-1.0","SugarCRM-1.1.3","SunPro","SWL","swrule","Symlinks","TAPR-OHL-1.0","TCL","TCP-wrappers","TermReadKey","TMate","TORQUE-1.1","TOSL","TPDL","TPL-1.0","TTWL","TTYP0","TU-Berlin-1.0","TU-Berlin-2.0","UCAR","UCL-1.0","ulem","Unicode-DFS-2015","Unicode-DFS-2016","Unicode-TOU","UnixCrypt","Unlicense","UPL-1.0","URT-RLE","Vim","VOSTROM","VSL-1.0","W3C","W3C-19980720","W3C-20150513","w3m","Watcom-1.0","Widget-Workshop","Wsuipa","WTFPL","X11","X11-distribute-modifications-variant","Xdebug-1.03","Xerox","Xfig","XFree86-1.1","xinetd","xlock","Xnet","xpp","XSkat","YPL-1.0","YPL-1.1","Zed","Zeeff","Zend-2.0","Zimbra-1.3","Zimbra-1.4","Zlib","zlib-acknowledgement","ZPL-1.1","ZPL-2.0","ZPL-2.1"]},"extent":{"title":"Extents","type":"object","required":["spatial","temporal"],"properties":{"spatial":{"title":"Spatial Extents","type":"object","required":["bbox"],"properties":{"bbox":{"type":"array","format":"bounding-boxes","items":{"type":"array","format":"bounding-box","items":{"type":"number"},"minItems":4,"maxItems":4},"minItems":1}}},"temporal":{"title":"Temporal Extents","type":"object","format":"temporal-intervals","required":["interval"],"properties":{"interval":{"type":"array","items":{"type":"array","format":"temporal-interval","items":{"type":"string","format":"date-time"},"minItems":2,"maxItems":2},"minItems":1}}}}},"providers":{"$comment":"Currently unusued by OSC catalog","type":"array","options":{"hidden":true}},"summaries":{"$comment":"Currently unusued by OSC catalog","type":"array","options":{"hidden":true}},"assets":{"$comment":"Currently unusued by OSC catalog","type":"object","options":{"hidden":true}},"links":{"title":"Links","type":"array","options":{"disable_array_reorder":true,"collapsed":true,"disable_collapse":false},"items":{"type":"object","required":["href","title","type","rel"],"properties":{"href":{"title":"Address","description":"The URL of the linked resource.","type":"string","minLength":1,"format":"url"},"title":{"title":"Title","type":"string","minLength":1},"type":{"title":"File Format","description":"The media type of the linked resource.","type":"string"},"rel":{"title":"Relation","type":"string"}}}}},"definitions":{"keywords":{"title":"Keywords","type":"array","items":{"type":"string","minLength":1},"uniqueItems":true},"extent":{"title":"Extents","type":"object","required":["spatial","temporal"],"properties":{"spatial":{"title":"Spatial Extents","type":"object","format":"bounding-boxes","required":["bbox"],"properties":{"bbox":{"type":"array","items":{"type":"array","format":"bounding-box","items":{"type":"number"},"minItems":4,"maxItems":4},"minItems":1}}},"temporal":{"title":"Temporal Extents","type":"object","format":"temporal-intervals","required":["interval"],"properties":{"interval":{"type":"array","items":{"type":"array","format":"temporal-interval","items":{"type":"string","format":"date-time"},"minItems":2,"maxItems":2},"minItems":1}}}}},"osc_name":{"title":"Name","type":"string","minLength":1},"osc_status":{"title":"Status","type":"string","enum":["planned","ongoing","completed"]},"osc_region":{"title":"Region","type":"string","minLength":1},"osc_missions":{"title":"EO Missions","format":"osc-missions","type":"array","uniqueItems":true,"items":{"type":"string","minLength":1}},"osc_themes":{"title":"Themes","type":"array","format":"osc-themes","uniqueItems":true,"items":{"type":"string","minLength":1,"enum":["atmosphere","cryosphere","land","magnetosphere-ionosphere","oceans","solid-earth"]}}}},{"type":"object","required":["osc:project","osc:status","osc:type"],"properties":{"created":{"title":"Creation Date and Time:","type":"string","format":"date-time"},"osc:type":{"type":"string","enum":["product"],"options":{"hidden":true}},"osc:name":{"title":"Name","type":"string","minLength":1},"osc:status":{"title":"Status","type":"string","enum":["planned","ongoing","completed"]},"osc:project":{"title":"Project","type":"string","format":"osc-project","minLength":1},"osc:region":{"title":"Region","type":"string","minLength":1},"osc:missions":{"title":"EO Missions","format":"osc-missions","type":"array","uniqueItems":true,"items":{"type":"string","minLength":1}},"osc:themes":{"title":"Themes","type":"array","format":"osc-themes","uniqueItems":true,"items":{"type":"string","minLength":1,"enum":["atmosphere","cryosphere","land","magnetosphere-ionosphere","oceans","solid-earth"]}},"osc:variables":{"title":"Variables","format":"osc-variables","type":"array","uniqueItems":true,"items":{"type":"string","minLength":1}},"cf:parameter":{"type":"array","format":"cf-parameters","title":"CF Parameter","description":"Following the Climate and Forecast (CF) Metadata Conventions: http://cfconventions.org/cf-conventions/cf-conventions.html#_description_of_the_data","minItems":1,"uniqueItems":true,"items":{"type":"object","required":["name"],"properties":{"name":{"type":"string","minLength":1},"unit":{"type":"string"}}}},"links":{"properties":{"links":{"items":{"oneOf":[{"title":"Other Link","properties":{"rel":{"not":{"enum":["root","parent","child","via"]}}}},{"title":"STAC Root Link","properties":{"href":{"readOnly":true},"title":{"readOnly":true},"type":{"enum":["application/json"],"options":{"hidden":true}},"rel":{"enum":["root"],"options":{"hidden":true}}}},{"title":"STAC Parent Link","properties":{"href":{"readOnly":true},"type":{"enum":["application/json"],"options":{"hidden":true}},"rel":{"enum":["parent"],"options":{"hidden":true}}}},{"title":"Via Link","properties":{"type":{"enum":["application/json","application/pdf","application/zip","text/html","text/plain"],"options":{"enum_titles":["JSON","PDF","ZIP","HTML","Text"]}},"rel":{"enum":["via"],"options":{"hidden":true}}}}]}}}}},"additionalProperties":true}]'),ot={title:et,allOf:tt},rt="Collection",it="absolute-sea-level-heights-baltics-sar-hsu",st="1.0.0",nt="Time series of absolute sea level heights of tide gauge stations involved in the project BALTIC+ Geodetic SAR for Baltic Height System Unification (SAR-HSU). Product details available at: https://www.asg.ed.tum.de/fileadmin/w00cip/iapg/Baltic/SAR-HSU-TN-0019_Dataset_User_Manual.pdf",at=[{rel:"root",href:"../../catalog.json",type:"application/json",title:"Open Science Catalog"},{rel:"via",href:"https://www.asg.ed.tum.de/fileadmin/w00cip/iapg/Baltic/SL-ABS.zip",title:"Access"},{rel:"parent",href:"../catalog.json",type:"application/json",title:"Products"}],lt=["https://stac-extensions.github.io/osc/v1.0.0-rc.3/schema.json","https://stac-extensions.github.io/cf/v0.2.0/schema.json"],pt="SL-ABS: Absolute Sea Level Heights_Baltics_Multimission",ct="2021-07-07T00:00:00Z",mt={spatial:{bbox:[[9.0405918788,53.8666553578,31.3371258934,66.1535071282]]},temporal:{interval:[["2020-01-01T00:00:00Z","2020-12-31T23:59:59Z"]]}},dt="proprietary",ut=["Sea Surface Topography","Sea Surface Height","Sea Surface Height Anomaly (SSHA)"],yt={type:rt,id:it,stac_version:st,description:nt,links:at,stac_extensions:lt,title:pt,"osc:themes":["Oceans"],"osc:missions":["GOCE","Sentinel-1","GLONASS"],"osc:project":"sar-hsu","osc:variables":["Sea Surface Height Anomaly (SSHA)"],"osc:status":"ongoing","osc:type":"product","cf:parameter":[{name:"absolute_sea_level_heights"}],"osc:region":"Baltics",created:ct,extent:mt,license:dt,keywords:ut},ht={args:{schema:ot,value:yt}},Lt=`${window.location.href.split("iframe.html")[0]}/catalogSchema.json`,St=`${window.location.href.split("iframe.html")[0]}/catalogValue.json`,Ct={args:{schema:Lt,value:St}},gt="object",ft={Markdown:{type:"string",format:"markdown",options:{simplemde:{spellChecker:!1}}}},Pt={type:gt,properties:ft},bt="# Hello world! This is [markdown](https://en.wikipedia.org/wiki/Markdown).",At={Markdown:bt},Ot={args:{schema:Pt,value:At}},Dt={args:{schema:Ge,value:Me,unstyled:!0}},xt="object",Nt={bboxes:{title:"Multi bbox example",type:"array",properties:{},format:"bounding-boxes"},bbox:{title:"Single bbox example",type:"array",properties:{},format:"bounding-box"},bboxes2:{title:"Multi bbox example without auto start drawing",type:"array",options:{autoStartSelection:!1},format:"bounding-boxes"}},Bt={type:xt,properties:Nt},Tt={args:{schema:Bt}},kt="object",Et={polygons:{title:"Multi polygon",type:"array",properties:{},format:"polygons"},polygon:{title:"Single polygon",type:"object",properties:{},format:"polygon"}},It={type:kt,properties:Et},vt={args:{schema:It}},Ft="object",jt={point:{title:"Single point example",type:"array",format:"point"},points:{title:"Multiple points example",type:"array",options:{projection:"EPSG:3857"},format:"points"}},Gt={type:Ft,properties:jt},Mt={args:{schema:Gt}},g="width: 100%; height: 300px; margin: 7px;",wt=[{type:"Vector",background:"lightgrey",properties:{id:"regions-grey"},source:{type:"Vector",url:"https://openlayers.org/data/vector/ecoregions.json",format:"GeoJSON",attributions:"Regions: @ openlayers.org"},style:{"stroke-color":"black","stroke-width":1,"fill-color":"darkgrey"}}],Rt=[{type:"Vector",background:"lightgrey",properties:{id:"regions-blue"},source:{type:"Vector",url:"https://openlayers.org/data/vector/ecoregions.json",format:"GeoJSON",attributions:"Regions: @ openlayers.org"},style:{"stroke-color":"black","stroke-width":1,"fill-color":"lightblue"}}],_t="object",$t={features:{title:"Select multiple features from the map, and refer to the console for the returned values",type:"array",options:{featureProperty:"BIOME_NAME",layerId:"regions-grey",for:"eox-map#first"},items:{type:"string"},format:"features"},feature:{title:"Select a feature from the map",type:"object",options:{layerId:"regions-blue",for:"eox-map#second"},format:"feature"}},Ut={type:_t,properties:$t},Yt={args:{schema:Ut,onChange:e=>console.log("value:",e.detail)},render:e=>L`
    <eox-map 
    id="first" 
    style=${g} 
    .layers=${wt} 
    />
    </eox-map>
    <eox-jsonform
    .schema=${e.schema}
    .value=${e.value}
    .noShadow=${!1}
    .unstyled=${e.unstyled}
    @change=${e.onChange}
    ></eox-jsonform>
    <eox-map 
    id="second" 
    style=${g} 
    .layers=${Rt} 
    />
    </eox-map>
  `},Ht="object",Jt={line:{title:"Single line example",type:"array",format:"line"},lines:{title:"Multiple lines example",type:"array",options:{projection:"EPSG:3857"},format:"lines"}},qt={type:Ht,properties:Jt},Vt={args:{schema:qt}},Wt="object",Kt={point:{title:"point as WKT",type:"wkt",format:"point"},"bounding-boxes":{title:"Multiple bounding boxes as WKT in EPSG:3857",type:"wkt",options:{projection:"EPSG:3857"},format:"bounding-boxes"},polygon:{title:"Polygon as WKT in EPSG:3857",type:"wkt",options:{projection:"EPSG:3857"},format:"polygon"}},Zt={type:Wt,properties:Kt},zt={args:{schema:Zt,onChange:e=>{console.log("value:",e.detail)}},render:e=>L`
    <p>Refer to the console for the returned values</p>
    <eox-jsonform
      .schema=${e.schema}
      .value=${e.value}
      .noShadow=${!1}
      .unstyled=${e.unstyled}
      @change=${e.onChange}
    ></eox-jsonform>
  `},Xt="object",Qt={point:{title:"Point as Geojson",type:"geojson",format:"point"},line:{title:"LineString as Geojson",type:"geojson",format:"line"},"bounding-boxes":{title:"Multiple bounding-boxes as Geojson in EPSG:3857",type:"geojson",options:{projection:"EPSG:3857"},format:"bounding-boxes"},polygon:{title:"Polygon as Geojson in EPSG:3857",type:"geojson",options:{projection:"EPSG:3857"},format:"polygon"}},eo={type:Xt,properties:Qt},to={args:{schema:eo,onChange:e=>{console.log("value:",e.detail)}},render:e=>L`
    <p>Refer to the console for the returned values</p>
    <eox-jsonform
      .schema=${e.schema}
      .value=${e.value}
      .noShadow=${!1}
      .unstyled=${e.unstyled}
      @change=${e.onChange}
    ></eox-jsonform>
  `};class oo extends we.AbstractEditor{build(){super.build(),this.control=document.createElement("div"),this.input=document.createElement("select"),this.input.setAttribute("id",this.path+"test"),this.input.classList.add("form-select"),[{value:"true",label:"True",data:!0,color:"green"},{value:"false",label:"False",data:!1,color:"red"}].forEach(C=>{const t=document.createElement("option");t.setAttribute("value",C.value),t.textContent=C.label,t.style.background=C.color,t.style.color="white",this.defaults.startVals[this.key]===C.data&&(t.selected=!0),this.input.appendChild(t)}),this.label=document.createElement("label"),this.label.setAttribute("for",this.path+"test"),this.label.classList.add("form-check-label"),this.label.textContent=this.schema.title,this.label.style.fontStyle="italic",this.container.appendChild(this.control),this.control.appendChild(this.label),this.control.appendChild(this.input)}postBuild(){super.postBuild(),this.input.addEventListener("change",S=>{S.preventDefault(),S.stopPropagation(),this.value=S.currentTarget.checked,this.onChange(!0)})}}const ro={args:{schema:{properties:{test:{type:"boolean",title:"Normal Boolean Editor Field"},test2:{type:"boolean",format:"custom",title:"Custom Boolean Editor Field"}}},value:{test:!0,test2:!0},customEditorInterfaces:[{type:"boolean",format:"custom",func:oo}]},render:e=>L`
    <eox-jsonform
      .schema=${e.schema}
      .value=${e.value}
      .noShadow=${!1}
      .unstyled=${e.unstyled}
      .customEditorInterfaces=${e.customEditorInterfaces}
      @change=${e.onChange}
    ></eox-jsonform>
  `},no={title:"Elements/eox-jsonform",tags:["autodocs"],component:"eox-jsonform",render:e=>L`
    <eox-jsonform
      .schema=${e.schema}
      .value=${e.value}
      .noShadow=${!0}
      .unstyled=${e.unstyled}
    ></eox-jsonform>
  `},o=Ue,r=Qe,i=ht,s=Ct,n=Ot,a=Tt,l=vt,p=Mt,c=Vt,m=Yt,d=zt,u=to,y=ro,h=Dt;var f,P,b,A,O;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:"PrimaryStory",...(b=(P=o.parameters)==null?void 0:P.docs)==null?void 0:b.source},description:{story:"Basic JSON Form example",...(O=(A=o.parameters)==null?void 0:A.docs)==null?void 0:O.description}}};var D,x,N,B,T;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:"CatalogStory",...(N=(x=r.parameters)==null?void 0:x.docs)==null?void 0:N.source},description:{story:"JSON Form based on STAC Catalog config",...(T=(B=r.parameters)==null?void 0:B.docs)==null?void 0:T.description}}};var k,E,I,v,F;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:"CollectionStory",...(I=(E=i.parameters)==null?void 0:E.docs)==null?void 0:I.source},description:{story:"JSON Form based on STAC collection config",...(F=(v=i.parameters)==null?void 0:v.docs)==null?void 0:F.description}}};var j,G,M,w,R;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:"ExternalStory",...(M=(G=s.parameters)==null?void 0:G.docs)==null?void 0:M.source},description:{story:"JSON Form based on External URL",...(R=(w=s.parameters)==null?void 0:w.docs)==null?void 0:R.description}}};var _,$,U,Y,H;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:"MarkdownStory",...(U=($=n.parameters)==null?void 0:$.docs)==null?void 0:U.source},description:{story:"JSON Form based on Markdown Editor config",...(H=(Y=n.parameters)==null?void 0:Y.docs)==null?void 0:H.description}}};var J,q,V,W,K;a.parameters={...a.parameters,docs:{...(J=a.parameters)==null?void 0:J.docs,source:{originalSource:"BoundingBoxStory",...(V=(q=a.parameters)==null?void 0:q.docs)==null?void 0:V.source},description:{story:"JSON Form based on drawtools - Box",...(K=(W=a.parameters)==null?void 0:W.docs)==null?void 0:K.description}}};var Z,z,X,Q,ee;l.parameters={...l.parameters,docs:{...(Z=l.parameters)==null?void 0:Z.docs,source:{originalSource:"PolygonStory",...(X=(z=l.parameters)==null?void 0:z.docs)==null?void 0:X.source},description:{story:"JSON Form based on drawtools - Polygon",...(ee=(Q=l.parameters)==null?void 0:Q.docs)==null?void 0:ee.description}}};var te,oe,re,ie,se;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:"PointStory",...(re=(oe=p.parameters)==null?void 0:oe.docs)==null?void 0:re.source},description:{story:"JSON Form based on drawtools - Point",...(se=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:se.description}}};var ne,ae,le,pe,ce;c.parameters={...c.parameters,docs:{...(ne=c.parameters)==null?void 0:ne.docs,source:{originalSource:"LineStory",...(le=(ae=c.parameters)==null?void 0:ae.docs)==null?void 0:le.source},description:{story:"JSON Form based on drawtools - LineString",...(ce=(pe=c.parameters)==null?void 0:pe.docs)==null?void 0:ce.description}}};var me,de,ue,ye,he;m.parameters={...m.parameters,docs:{...(me=m.parameters)==null?void 0:me.docs,source:{originalSource:"FeatureSelectionStory",...(ue=(de=m.parameters)==null?void 0:de.docs)==null?void 0:ue.source},description:{story:"JSON Form based on drawtools - Feature Selection",...(he=(ye=m.parameters)==null?void 0:ye.docs)==null?void 0:he.description}}};var Le,Se,Ce,ge,fe;d.parameters={...d.parameters,docs:{...(Le=d.parameters)==null?void 0:Le.docs,source:{originalSource:"WKTStory",...(Ce=(Se=d.parameters)==null?void 0:Se.docs)==null?void 0:Ce.source},description:{story:"JSON Form based on drawtools - Returns the value as WKT",...(fe=(ge=d.parameters)==null?void 0:ge.docs)==null?void 0:fe.description}}};var Pe,be,Ae,Oe,De;u.parameters={...u.parameters,docs:{...(Pe=u.parameters)==null?void 0:Pe.docs,source:{originalSource:"GeoJSONStory",...(Ae=(be=u.parameters)==null?void 0:be.docs)==null?void 0:Ae.source},description:{story:"JSON Form based on drawtools - Returns the value as GeoJSON",...(De=(Oe=u.parameters)==null?void 0:Oe.docs)==null?void 0:De.description}}};var xe,Ne,Be,Te,ke;y.parameters={...y.parameters,docs:{...(xe=y.parameters)==null?void 0:xe.docs,source:{originalSource:"CustomEditorInterfacesStory",...(Be=(Ne=y.parameters)==null?void 0:Ne.docs)==null?void 0:Be.source},description:{story:"With the `customEditorInterfaces` property it is possible to create\none or more custom form inputs for json-editor (based on its `JSONEditor.AbstractEditor`).\nSee [json-editor readme](https://github.com/json-editor/json-editor?tab=readme-ov-file#custom-editor-interfaces) for more details.",...(ke=(Te=y.parameters)==null?void 0:Te.docs)==null?void 0:ke.description}}};var Ee,Ie,ve,Fe,je;h.parameters={...h.parameters,docs:{...(Ee=h.parameters)==null?void 0:Ee.docs,source:{originalSource:"UnStyledStory",...(ve=(Ie=h.parameters)==null?void 0:Ie.docs)==null?void 0:ve.source},description:{story:"Unstyled JSON Form",...(je=(Fe=h.parameters)==null?void 0:Fe.docs)==null?void 0:je.description}}};const ao=["Primary","Catalog","Collection","External","Markdown","BoundigBox","Polygons","Points","Line","FeatureSelection","WKT","Geojson","CustomEditorInterfaces","Unstyled"];export{a as BoundigBox,r as Catalog,i as Collection,y as CustomEditorInterfaces,s as External,m as FeatureSelection,u as Geojson,c as Line,n as Markdown,p as Points,l as Polygons,o as Primary,h as Unstyled,d as WKT,ao as __namedExportsOrder,no as default};
