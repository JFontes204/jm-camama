const dataFormate = (dataEhora) => {
  if (dataEhora === undefined || dataEhora === '') {
    return 'Sem data e hora';
  }
  let [data, hora] = dataEhora.split('T');
  data = data.split('-').reverse().join('-');
  hora = hora.split('.')[0];
  let h = hora.split(':')[0],
    m = hora.split(':')[1];
  hora = h + ':' + m;
  return data + ' ' + hora;
};

export default dataFormate;
