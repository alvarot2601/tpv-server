const request = require('request');
const { guardarErrorLog, confirmarCompraLog, guardarVersion } = require('./setLogs');
const setTpvData = require('./editForm');
// server.js
const express = require('express');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

/*app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));*/
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// Rutas estáticas para los archivos de la aplicación Flutter web
app.use(express.static(path.join(__dirname, 'web')));

// Ruta para manejar cualquier otra solicitud y cargar el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

/*
app.get('/prueba.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'prueba.html'));
});*/
/*
app.get('/pago_tpv', (req, res) => {
  if(req.query.cantidad && req.query.cantidad > 0){
    setTpvData(req.query.cantidad)
    res.sendFile(path.join(__dirname, 'tpv', 'index.html'));
    console.log('ae1');
  }else{
  }
});*/
app.get('/pago_tpv', (req, res) => {
  if(req.query.cantidad && req.query.cantidad > 0 && req.query.num_operacion){
    setTpvData(req.query.cantidad, req.query.num_operacion)
    res.sendFile(path.join(__dirname, 'tpv', 'index.html'));
    //insertarCompraLog(req.body.cantidad);
    //res.send('He capturado bien la cantidad');
  }
})

app.post('/pago_tpv', (req, res) => {
  if(req.body.cantidad && req.body.cantidad > 0){
    setTpvData(req.body.cantidad)
    res.sendFile(path.join(__dirname, 'tpv', 'index.html'));
    //insertarCompraLog(req.body.cantidad);
    //res.send('He capturado bien la cantidad');
  }
})

app.get('/ok', (req, res) => {
  router.get('/close',(req, res) => {
    res.send("<script>window.close();</script > ")})
})
app.get('/nok', (req, res) => {
  confirmarCompraLog(false);
  res.send('El pago no se ha completado.');
})
//Donde envía el post el tpv confirmando de la compra
app.post('/ok2', (req, res) => {
  guardarErrorLog(JSON.stringify(req.body));
  guardarErrorLog(req.body.Num_operacion);
  if(req.body.Importe && req.body.BIN8 && req.body.FinalPAN && req.body.Tipo_tarjeta && req.body.Tipo_operacion){
    sendPostData(req.body.Num_operacion);
	  confirmarCompraLog(true, req.body.Importe, req.body.Num_operacion, req.body.BIN8 ,req.body.FinalPAN ,req.body.Tipo_tarjeta ,req.body.Tipo_operacion);
  }else{
    confirmarCompraLog(false);
  }
})


const sendPostData = async (num_operacion) => {
  
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
    body: data//SI SE ENVIA CON JSON.stringify no lo detecta el server
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
}
// Inicia el servidor
app.listen(port, () => {
	guardarVersion('1.0.0');
  console.log(`Servidor escuchando en http://localhost:${port}`);
});