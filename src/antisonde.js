// détection de troupes ennemies et notification
function detectOtherTroops(){
  GM_xmlhttpRequest({
    method:'GET', url:`${location.protocol}//${location.host}/Armee.php`,
    onload(res){
      const doc=new DOMParser().parseFromString(res.responseText,'text/html');
      doc.querySelectorAll('span.cliquable').forEach(sp=>{
        const m=(sp.getAttribute('onclick')||'').match(/remplirFormulaire\((\d+),'(\w+)',2,3\)/);
        if(!m) return;
        const cnt=+m[1], u=m[2];
        if(u!=='unite1' && cnt>0){
          const row=sp.closest('tr'),
                d=row.querySelector('div.pas_sur_telephone'),
                nm=d?d.textContent.trim():row.cells[0].textContent.trim();
          sendDiscord(`⚠️ Alerte : ${cnt.toLocaleString()}×${nm} en fourmilière`);
        }
      });
    }
  });
}
