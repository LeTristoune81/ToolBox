// collecte et affichage des colonies
function collectColonies(){
  const box=document.querySelector('#centre center .boite_membre');
  if(!box) return [];
  const rows=Array.from(box.querySelectorAll('tr')), list=[];
  rows.forEach(r=>{
    if(r.cells[0]?.textContent.trim()===''){
      const a=r.querySelector('a');
      if(a) list.push({name:a.textContent.trim(),url:a.href});
      removeEl(r);
    }
  });
  return list;
}

function fetchInfo(div,p){
  fetch(`Membre.php?Pseudo=${encodeURIComponent(p)}`)
    .then(r=>r.text()).then(html=>{
      const d=new DOMParser().parseFromString(html,'text/html'),
            al=d.querySelector('.boite_membre table a[href*="classementAlliance.php?"]'),
            tag=al?`<a target="_blank" href="${al.href}">${al.textContent.trim()}</a>`:'-',
            raw=d.querySelector('.tableau_score')?.rows[1]?.cells[1]?.textContent.trim()||'',
            num=parseInt(raw.replace(/\D+/g,''),10)||0,
            tdc=formatSuffix(num);
      div.innerHTML=`<a target="_blank" href="${div.dataset.url}">${p}</a> (<span class="TAG_colonies_zzzelp">${tag}</span> <span class="TDC_colonies_zzzelp">${tdc}</span>)`;
    }).catch(console.error);
}

function enhanceProfile(){
  const cols=collectColonies();
  if(!cols.length) return;
  const box=document.createElement('div');
  box.className='boite_membre colonies_zzzelp_box';
  box.innerHTML=`
    <h4>Colonies</h4>
    <div class="colonies_zzzelp" style="display:none">
      ${cols.map(c=>`<div class="ligne_colonies_zzzelp" data-url="${c.url}">${c.name} (…)</div>`).join('')}
    </div>`;
  const centre=document.querySelector('#centre center'),
        pbs=centre.querySelectorAll('.boite_membre');
  if(pbs.length>=2) pbs[1].parentNode.insertBefore(box,pbs[1].nextSibling);
  else centre.appendChild(box);
  box.querySelectorAll('.ligne_colonies_zzzelp').forEach((d,i)=>fetchInfo(d,cols[i].name));
}

function toggleColoniesBox(){
  const list=document.querySelector('.colonies_zzzelp');
  if(!list) return;
  list.style.display = list.style.display==='none'?'':'none';
}
