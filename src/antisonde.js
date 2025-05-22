// antisonde : repousse et notifie
function performReplaceAntisonde(asDome, asTdc){
  const CORR=[1,2,3,4,5,6,14,7,8,9,10,13,11,12];
  const $sim=$('.simulateur').first(); if(!$sim.length) return;
  let idx=-1;
  $sim.find('tr[align=center]').each((i,tr)=>{
    const $td=$(tr).find('td');
    const tdc=numeral($td.eq(2).find('span').text()).value()||0;
    let dome=0; $td.slice(3,-2).each((_,c)=> dome+=numeral($(c).text()).value()||0);
    const loge=numeral($td.eq(-2).text()).value()||0;
    if(tdc+dome+loge>0 && idx<0) idx=i;
  });
  if(idx<0) return;
  const choix=CORR[idx], $t=$('#t'), name=$t.attr('name'), val=$t.val(),
        base=`http://${location.host}/Armee.php`;
  $.post(`${base}?deplacement=3&${name}=${val}`,()=>{
    $.post(`${base}?Transferer=Envoyer&LieuOrigine=3&LieuDestination=2&ChoixUnite=unite${choix}&nbTroupes=${asDome}&${name}=${val}`,()=>{
      $.post(`${base}?Transferer=Envoyer&LieuOrigine=3&LieuDestination=1&ChoixUnite=unite${choix}&nbTroupes=${asTdc}&${name}=${val}`,()=>{
        sendDiscord(`✅ Antisonde replacé : Dôme=${asDome}, TDC=${asTdc}`,()=>location.reload());
      });
    });
  });
}
