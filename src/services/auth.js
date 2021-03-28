const isAuthenticated = () => {
  // Get object from localStorage
  const token = JSON.parse(localStorage.getItem('token'));
  const { tipo_comite, direccao, funcao } = JSON.parse(
    localStorage.getItem('definicoes')
  );
  let definicoes = {
    charts: {
      sede: false,
      provincia: false,
      municipio: false,
      distrito: false,
      local: false,
      nucleo: false,
    },
    user: { create: false, edit: false, view: false },
    nucleo: { create: false, edit: false, view: false },
    agenda: { create: false, edit: false, view: false },
    comite: { create: false, edit: false, view: false },
    setting: { create: false, edit: false, view: false },
    militante: { create: false, edit: false, view: false },
  };
  if (funcao === 'Admin') {
    definicoes.user.edit = true;
    definicoes.user.create = true;
    definicoes.setting.edit = true;
  }
  if (funcao === 'Admin' || funcao === 'IT') {
    definicoes.user.view = true;
    definicoes.comite.edit = true;
    definicoes.comite.view = true;
    definicoes.comite.create = true;
    definicoes.nucleo.edit = true;
    definicoes.nucleo.view = true;
    definicoes.nucleo.create = true;
    definicoes.agenda.edit = true;
    definicoes.agenda.view = true;
    definicoes.agenda.create = true;
    definicoes.setting.view = true;
    definicoes.setting.create = true;
    definicoes.militante.edit = true;
    definicoes.militante.view = true;
    definicoes.militante.create = true;
  }
  if (tipo_comite !== 'Local' && tipo_comite !== undefined) {
    definicoes.comite.view = true;
  }
  if (
    tipo_comite !== 'Local' &&
    tipo_comite !== undefined &&
    funcao === '1SCT'
  ) {
    definicoes.comite.edit = true;
    definicoes.comite.create = true;
  }
  if (tipo_comite === 'Local' || tipo_comite === 'Distrital') {
    definicoes.nucleo.view = true;
  }
  if (tipo_comite === 'Local' && funcao === '1SCT') {
    definicoes.nucleo.edit = true;
    definicoes.nucleo.create = true;
  }
  if (funcao === '1SCT') {
    definicoes.agenda.edit = true;
    definicoes.agenda.create = true;
    definicoes.militante.edit = true;
    definicoes.militante.create = true;
  }
  switch (tipo_comite) {
    case 'Sede':
      definicoes.charts.sede = true;
      break;
    case 'Provincial':
      definicoes.charts.provincia = true;
      break;
    case 'Municipal':
      definicoes.charts.municipio = true;
      break;
    case 'Distrital':
      definicoes.charts.distrito = true;
      break;
    case 'Local':
      definicoes.charts.local = true;
      break;
    case 'Núcleo':
      definicoes.charts.nucleo = true;
      break;
    default:
      break;
  }
  return {
    success: token !== null ? true : false,
    error: false,
    definicoes,
  };
};
export default isAuthenticated;
