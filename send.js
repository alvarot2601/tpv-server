const request = require('request');
const sendPostData = (num_operacion) => {
  
  const data = {
    num_operacion : num_operacion,
    estado: true
  };
  const url = 'https://api.reservatupista.com/usuario/actualizar_operacion';
  const options = {
    url: url,
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    json: true,
    body: data
  };
  try {
    request(options,(error, response, data) => {
      if (error) {
        console.log('error '  + error);
      } else {
        console.log('data ' + data);
      }
    });
    
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}
sendPostData();