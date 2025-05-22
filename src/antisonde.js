/**
 * Module Antisonde
 */
function performReplaceAntisonde(asDome, asTdc) {
  console.log('[ToolBox:antisonde] performReplaceAntisonde called', { asDome, asTdc });
  
  // Sélecteur du simulateur
  const $sim = $('.simulateur').first();
  console.log('[ToolBox:antisonde] .simulateur found:', $sim.length, $sim);

  if (!$sim.length) {
    console.warn('[ToolBox:antisonde] simulateur non trouvé → arrêt');
    return;
  }

  // Calcul de la première ligne contenant des troupes
  const CORR = [1,2,3,4,5,6,14,7,8,9,10,13,11,12];
  let idx = -1;
  $sim.find('tr[align=center]').each((i, tr) => {
    const $td = $(tr).find('td');
    const tdc = numeral($td.eq(2).find('span').text()).value() || 0;
    let dome = 0;
    $td.slice(3, -2).each((_, c) => {
      dome += numeral($(c).text()).value() || 0;
    });
    const loge = numeral($td.eq(-2).text()).value() || 0;
    if (tdc + dome + loge > 0 && idx < 0) idx = i;
  });
  console.log('[ToolBox:antisonde] idx trouvé =', idx);

  if (idx < 0) {
    console.warn('[ToolBox:antisonde] aucune ligne valide → arrêt');
    return;
  }

  const choix = CORR[idx];
  const $t    = $('#t'), name = $t.attr('name'), val = $t.val();
  const base  = `${location.protocol}//${location.host}/Armee.php`;
  console.log('[ToolBox:antisonde] choix =', choix, 'name=', name, 'val=', val, 'base=', base);

  // 1) Autorisation
  $.post(`${base}?deplacement=3&${name}=${val}`, () => {
    console.log('[ToolBox:antisonde] autorisation ok');
    // 2) Vers Dôme
    $.post(
      `${base}?Transferer=Envoyer&LieuOrigine=3&LieuDestination=2` +
      `&ChoixUnite=unite${choix}&nbTroupes=${asDome}&${name}=${val}`,
      () => {
        console.log('[ToolBox:antisonde] envoyé Dôme');
        // 3) Vers TDC
        $.post(
          `${base}?Transferer=Envoyer&LieuOrigine=3&LieuDestination=1` +
          `&ChoixUnite=unite${choix}&nbTroupes=${asTdc}&${name}=${val}`,
          () => {
            console.log('[ToolBox:antisonde] envoyé TDC');
            sendDiscord(
              `✅ Antisonde replacé : Dôme=${asDome}, TDC=${asTdc}`,
              () => {
                console.log('[ToolBox:antisonde] reload page');
                location.reload();
              }
            );
          }
        );
      }
    );
  });
}
