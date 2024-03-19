const {guardarErrorLog} = require('./setLogs');
const fs = require('node:fs');


const generarNumeroOperacionUnico = ()=> {
var now = new Date();
  var timestamp = now.getTime();
  var aleatorio = Math.floor(Math.random() * 999999);

  var formattedString =
    now.getFullYear() + now.getMonth() + now.getDate() + '_' + now.getHours() + now.getMinutes() + now.getSeconds() + '_' + aleatorio
    /*padNumber(now.getMonth() + 1) +
    padNumber(now.getDate()) +
    "_" +
    padNumber(now.getHours()) +
    padNumber(now.getMinutes()) +
    padNumber(now.getSeconds()) +
    "_" +
    aleatorio;*/

  return formattedString;
  }

const setTpvData = (cantidad, num_operacion) => {
    console.log(cantidad)
    const claveEncriptacion = "1YQ1WLLM";
    const merchantID = "243034469";
    const acquirerBIN = "0000270488";
    const terminalID = "00000003";
    const tipoMoneda = "978";
    const exponente = "2";
    const cifrado = "SHA2";
    const urlOK = "https://tpv.modularbox.com/ok";
    const urlNOK = "https://tpv.modularbox.com/nok";
    const importe = cantidad ? cantidad : 0;
    //const num_operacion = generarNumeroOperacionUnico();
    const firma_str = claveEncriptacion+merchantID+acquirerBIN+terminalID+num_operacion+importe+tipoMoneda+exponente+cifrado+urlOK+urlNOK;
    
    const firma = setFirma(firma_str);
    console.log('cantidad, ' + cantidad);
    console.log('firma_str, ' + firma_str);
    console.log('firma, ' + firma);
    const content = `
    <html>
    <head>
        <style>
            *{
                display: none;
            }
            /*body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 90vh;
                background-color: RGBA( 176, 196, 222, 1 );
            }
            h1 {
                font-size: 3rem;
            }
            form {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
            }
            .slide_diagonal:hover {
                box-shadow: inset 400px 50px 0 0 RGBA( 220, 20, 60, 1 );
                color: #FFF;
            }
            .button_slide {
                min-width: 200px;
                font-size: 1.2rem;
                color: RGBA( 220, 20, 60, 1 );
                border: 2px solid RGBA( 220, 20, 60, 1 );
                border-radius: 0px;
                padding: 18px 36px;
                display: inline-block;
                font-family: "Lucida Console", Monaco, monospace;
                letter-spacing: 1px;
                cursor: pointer;
                box-shadow: inset 0 0 0 0 RGBA( 220, 20, 60, 1 );
                -webkit-transition: ease-out 0.4s;
                -moz-transition: ease-out 0.4s;
                transition: ease-out 0.4s;
            }
            .button_slide.enviar{
                color: RGBA( 34, 139, 34, 1 );
                border: 2px solid RGBA( 34, 139, 34, 1 );
                box-shadow: inset 0 0 0 0 RGBA( 34, 139, 34, 1 );
            }
            .slide_diagonal.enviar:hover {
                box-shadow: inset 400px 50px 0 0 RGBA( 34, 139, 34, 1 );
                color: #FFF;
            }*/
        </style>
        <title>P&aacute;gina de pago</title>
    </head>
    <body>
        <form id="form" action="https://tpv.ceca.es/tpvweb/tpv/compra.action" method="POST"
            enctype="application/x-www-form-urlencoded">
            <input name="MerchantID" type=hidden VALUE="${merchantID}">
            <input name="AcquirerBIN" type=hidden VALUE="${acquirerBIN}">
            <input name="TerminalID" type=hidden VALUE="${terminalID}">
            <input name="URL_OK" type=hidden VALUE="${urlOK}">
            <input name="URL_NOK" type=hidden VALUE="${urlNOK}">
            <input name="Firma" type=hidden
                VALUE="${firma}">
            <input name="Cifrado" type=hidden VALUE="SHA2">
            <input name="Num_operacion" type=hidden VALUE="${num_operacion}">
            <input name="Importe" type=hidden VALUE="${importe}">
            <input name="TipoMoneda" type=hidden VALUE="${tipoMoneda}">
            <input name="Exponente" type=hidden VALUE="${exponente}">
            <input name="Pago_soportado" type=hidden VALUE="SSL">
            <input name="Idioma" type=hidden VALUE="1">
            <input name="datos_acs_20" type=hidden VALUE="">
            <input name="firma_acs_20" type=hidden VALUE="">
            <!--<button class="cancelar button_slide slide_diagonal" type="button">Cancelar</button>-->
            <button class="enviar button_slide slide_diagonal" type="hidden">Comprar</button>
        </form>
        <script>
          const sendForm = ()=>{
            const form = document.querySelector("form");
            form.submit();
          }
          window.addEventListener("load", sendForm);
    </script>
    </body>
    </html>
    `;
    try {
        fs.writeFileSync('./tpv/index.html', content);
        // file written successfully
      } catch (err) {
        guardarErrorLog(err.message);
      }
}

const setFirma = (str)=>{
const encoder = new TextEncoder();
const bytes = encoder.encode(str);

const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const digest = hash.update(bytes).digest('hex');

const firma = digest;
return firma;
}
module.exports = setTpvData;

/*<HTML>
    <HEAD>
        <TITLE>P&aacute;gina de pago</TITLE>
    </HEAD>
    <BODY>
        <FORM id="form" ACTION="https://tpv.ceca.es/tpvweb/tpv/compra.action" METHOD="POST"
            ENCTYPE="application/x-www-form-urlencoded">
            <INPUT NAME="MerchantID" TYPE=hidden VALUE="243034469">
            <INPUT NAME="AcquirerBIN" TYPE=hidden VALUE="0000270488">
            <INPUT NAME="TerminalID" TYPE=hidden VALUE="00000003">
            <INPUT NAME="URL_OK" TYPE=hidden VALUE="https://pgw.ceca.es/ok">
            <INPUT NAME="URL_NOK" TYPE=hidden VALUE="https://pgw.ceca.es/nok">
            <INPUT NAME="Firma" TYPE=hidden VALUE="${firma}"><!-- = , 444 = 4a49af2605ff8a63599905f2ae65dc6e71ab34d63b4d0761a38c5007f0b8884d-->
            <INPUT NAME="Cifrado" TYPE=hidden VALUE="SHA2">
            <INPUT NAME="Num_operacion" TYPE=hidden VALUE="${num_operacion}">
            <INPUT NAME="Importe" TYPE=hidden VALUE="${cantidad}">
            <INPUT NAME="TipoMoneda" TYPE=hidden VALUE="978">
            <INPUT NAME="Exponente" TYPE=hidden VALUE="2">
            <INPUT NAME="Pago_soportado" TYPE=hidden VALUE="SSL">
            <INPUT NAME="Idioma" TYPE=hidden VALUE="1">
            <INPUT NAME="datos_acs_20" TYPE=hidden VALUE="">
            <INPUT NAME="firma_acs_20" TYPE=hidden VALUE="">
            <INPUT TYPE="submit" VALUE="Comprar">
        </FORM>
        <script>
          window.addEventListener("load", sendForm);

          const sendForm = ()=>{
              const form = document.querySelector("form");
              setTimeout(()=>{
                  form.submit();
              }, 1000);
          }
      </script>
    </BODY>
    </HTML>*/