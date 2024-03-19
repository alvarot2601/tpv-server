const request = require('request');

const sendPostData = async (num_operacion) => {
  const data = {
    num_operacion: '20240319_113008_821575',
    estado: true
  };

  const options = {
    url: 'https://api.reservatupista.com/usuario/actualizar_operacion',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: data
  };

  try {
    const response = await new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });

    return response;
  } catch (error) {
    console.error('Error al realizar la solicitud POST:', error);
    throw error;
  }
};

// Ejemplo de uso:
(async () => {
  try {
    const response = await sendPostData('123');
    console.log('Respuesta del servidor:', response);
  } catch (error) {
    console.error('Error:', error);
  }
})();
