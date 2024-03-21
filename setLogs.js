var fs = require('fs');
const date = new Date();

const convertToEuros = (importe)=>{
	while(importe.charAt(0) == '0'){
		importe = importe.slice(1);
	}
	return importe/100;
}


const insertarCompraLog = (cantidad) =>{
    const str =  '---------------------------------------------' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' | ' + 'INTENTO DE PAGO DE ' + cantidad + '€ --------------------------------------------- \n';
    fs.appendFile('./logs/logs.txt', str, function(err){
        if(err){
            const errorLog = `\n--------------------------------------------- ERROR WRITING TO LOG: ${err.message} ---------------------------------------------\n`;
			guardarErrorLog(err.message || err);
            throw err;
        }
        console.log('Saved');
    });
}

const confirmarCompraLog = (isOk, importe='', num_operacion='', bin8='', finalPan='', tipo_tarjeta='', tipo_operacion='') =>{
	  let paymentMessage=  '__________________________________ ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' | ' + 'INTENTO DE PAGO __________________________________ \n';
    
        if(isOk==false){
            paymentMessage += '---------------------------------------------         PAGO NO REALIZADO         --------------------------------------------- \n \n';
        }
       
		else{
			//seteamos el importe
			importe = convertToEuros(importe);
			
			//seteamos el tipo de tarjeta
			switch(tipo_tarjeta){
				case 'C':
					tipo_tarjeta = 'Tarjeta Crédito';
					break;
				case 'B':
					tipo_tarjeta = 'Tarjeta Débito';
					break;
			}
			
			//seteamos el tipo de operacion
			switch(tipo_operacion){
				case 'A':
					tipo_operacion = 'Compra AMEX';
					break;
				case 'C':
					tipo_operacion = 'Compra Normal';
					break;
				case 'E':
					tipo_operacion = 'Compra BIZUM';
					break;
			}
			paymentMessage += `Importe = ${importe}€ | Num_operacion = ${num_operacion} | Bin8 = ${bin8} | finaLPan = ${finalPan} | tipo_tarjeta = ${tipo_tarjeta} | tipo_operacion = ${tipo_operacion}`;
			paymentMessage += '\n---------------------------------------------         PAGO COMPLETADO CON EXITO         --------------------------------------------- \n \n';
			
		}
   
	
		fs.appendFile('./logs/logs.txt', paymentMessage, function(err){
			if(err){
				guardarErrorLog(err.message || err);
				//throw err;
			}
			console.log('Saved');
		});

    /*
    if(isOk){
        
    }else{
        fs.appendFile('./logs/logs.txt', '------------- PAGO NO REALIZADO ----------------', function(err){
            if(err){
                throw err;
            }
            console.log('Saved');
        });
    }*/
}

const guardarVersion = (version)=> {
	const versionMessage = `\n____________________________________________________ SERVIDOR VERSION: ${version}____________________________________________________\n`;
	fs.appendFile('./logs/logs.txt', versionMessage, function(err){
		if(err){
			guardarErrorLog(err.message || err);
			throw err;
		}
		console.log('Saved');
	});
}


const guardarErrorLog = (message)=>{
	let errorMessage = '\n--------------------------------------------- ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ---------------------------------------------';
    errorMessage += `\n Error: ${message}\n\n\n `;
    fs.appendFile('./logs/errorLogs.txt', errorMessage, function(err){
       if(err) throw err;
    });
}

module.exports = {insertarCompraLog, confirmarCompraLog, guardarVersion, guardarErrorLog};//{insertarCompraLog, confirmarCompraLog};
