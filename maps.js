/* Historic-geography maps using locally vendored real-world GeoJSON geometry. */
'use strict';
function makeMap(geo,kind){
const route=kind==='oregon',W=940,H=580;
const extent=route?{w:-170,e:-25,s:-61,n:55}:{w:80,e:310,s:-45,n:75};
function wrapLon(lon){if(route)return lon;return lon<0?lon+360:lon}
function project(p){const lon=wrapLon(p[0]),lat=p[1];return [((lon-extent.w)/(extent.e-extent.w))*W,((extent.n-lat)/(extent.n-extent.s))*H]}
function seg(points){return points.map((p,i)=>{const [x,y]=project(p);return (i===0?'M':'L')+x.toFixed(1)+','+y.toFixed(1)}).join(' ')}
const shapes=[];
for(const f of geo.features){if(!f.geometry)continue;const groups=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.type==='MultiPolygon'?f.geometry.coordinates:[];for(const poly of groups){for(const ring of poly){if(!ring.length)continue;const inside=ring.some(([x,y])=>wrapLon(x)>extent.w-10&&wrapLon(x)<extent.e+10&&y>extent.s-10&&y<extent.n+10);if(!inside)continue;let previous=ring[0],parts=[];for(const point of ring){let d=wrapLon(point[0])-wrapLon(previous[0]);if(Math.abs(d)>180){if(parts.length>2)shapes.push('<path d="'+seg(parts)+' Z"/>');parts=[]}parts.push(point);previous=point}if(parts.length>2)shapes.push('<path d="'+seg(parts)+' Z"/>')}}}
const locations=route?[['San Francisco',[-122.4,37.8],-20,-14],['Callao',[-77.1,-12.0],12,-10],['Strait of Magellan',[-70.8,-53.2],12,8],['Rio de Janeiro',[-43.2,-22.9],-90,18],['Barbados',[-59.5,13.1],10,13],['Jupiter Inlet',[-80.1,26.9],12,-7]]:[['California',[-121,37],-65,-13],['Hawaiʻi',[-157.8,21.3],-26,-12],['Guam',[144.8,13.5],12,17],['Philippines',[121,13],-85,-10],['China',[115,30],12,-14],['Panama',[-79.5,9],10,15]];
const course=[[-122.4,37.8],[-77.1,-12],[-71.6,-33],[-70.8,-53.2],[-56,-34.9],[-43.2,-22.9],[-38.5,-12.9],[-59.5,13.1],[-80.1,26.9]];
const stops=locations.map(([label,coord,dx,dy])=>{const [x,y]=project(coord);return '<circle cx="'+x+'" cy="'+y+'" r="5" fill="#b14f32" stroke="#fff" stroke-width="2"/><text x="'+(x+dx)+'" y="'+(y+dy)+'" font-size="16" font-weight="650" fill="#193b53" stroke="#fff" stroke-width="3" paint-order="stroke">'+label+'</text>'}).join('');
const graticule=[];for(let lon=route?-160:80;lon<extent.e;lon+=30)graticule.push('<path d="'+seg([[route?lon:(lon>180?lon-360:lon),extent.s],[route?lon:(lon>180?lon-360:lon),extent.n]])+'"/>');for(let lat=-60;lat<=60;lat+=30)graticule.push('<path d="'+seg([[route?-170:80,lat],[route?-25:-50,lat]])+'"/>');
const svg='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+(route?'Map of actual North and South American coastline and the main known 1898 USS Oregon voyage stops':'Pacific Ocean real geography map showing the location of Hawaiʻi and other overseas locations')+'" xmlns="http://www.w3.org/2000/svg"><rect width="'+W+'" height="'+H+'" fill="#dcecf5"/><g fill="none" stroke="#bcd3df" stroke-width="1">'+graticule.join('')+'</g><g fill="#e7d3a4" stroke="#927c52" stroke-width="1.1">'+shapes.join('')+'</g>'+(route?'<path d="'+seg(course)+'" fill="none" stroke="#b14f32" stroke-width="4" stroke-dasharray="11 8" stroke-linecap="round"/>':'')+stops+'<text x="20" y="36" font-weight="bold" font-size="19" fill="#193b53">'+(route?'USS Oregon: major documented waypoints, 1898':'Pacific geography and American overseas interests')+'</text><text x="20" y="'+(H-18)+'" font-size="14" fill="#29475c">Country outlines: Natural Earth-derived GeoJSON • Projection: equirectangular • For orientation, not exact sailing track</text></svg>';
return svg
}
async function addMaps(){
try{const response=await fetch('assets/world.geojson');if(!response.ok)throw Error('World map data unavailable');const geo=await response.json();if(!geo.features||geo.features.length<100)throw Error('Invalid basemap');document.querySelectorAll('[data-authentic-map]').forEach(el=>{el.innerHTML=makeMap(geo,el.dataset.authenticMap)})}
catch(e){document.querySelectorAll('[data-authentic-map]').forEach(el=>{el.innerHTML='<p class="note">The interactive map could not load. Use the historical location information in the context reading.</p>'})}
}
addMaps();
