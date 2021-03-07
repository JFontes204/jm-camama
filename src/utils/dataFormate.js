const dataFormate = (dataEhora) => {
  let [data, hora] = dataEhora.split('T');
  data = data.split('-').reverse().join('-');
  hora = hora.split('.')[0];
  return data + '\n' + hora;
};

export default dataFormate;
