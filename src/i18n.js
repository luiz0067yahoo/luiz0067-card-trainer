/**
 * Internationalization helper for Luiz0067 Card Trainer
 */
import ptBr from '../languages/pt-br.json';
import enUs from '../languages/en-us.json';
import itIt from '../languages/It.json';
import esEs from '../languages/es.json';

const dictionaries = {
  'pt-br': ptBr,
  'pt': ptBr,
  'en-us': enUs,
  'en': enUs,
  'it': itIt,
  'it-it': itIt,
  'es': esEs,
  'es-es': esEs,
};

export function getDictionary(lang = 'pt-br') {
  const key = (lang || 'pt-br').toLowerCase();
  return dictionaries[key] || dictionaries['pt-br'];
}

export function __t(path, lang = 'pt-br', params = {}) {
  const dict = (typeof window !== 'undefined' && window.Luiz0067CardTrainerI18n)
    ? window.Luiz0067CardTrainerI18n
    : getDictionary(lang);

  const keys = path.split('.');
  let val = dict;

  for (const k of keys) {
    if (val && typeof val === 'object' && k in val) {
      val = val[k];
    } else {
      // Fallback to pt-BR dictionary
      let fallback = ptBr;
      for (const fk of keys) {
        fallback = fallback && fallback[fk];
      }
      val = fallback || path;
      break;
    }
  }

  if (typeof val === 'string' && params) {
    return val.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`));
  }

  return val;
}
