

function hola(nombre){ return 'Hola '+ nombre
}

function factorialize(numero) {
  for (var i = numero-1; i > 0; i--) {
    numero= numero * i;
  }
  return numero;
}


function suma(numero1,numero2) {return numero1 + numero2
}

function cualEsMasLargo(nombre1,nombre2){
if (nombre1.length>nombre2.length){
return (`${nombre1}`)
}if (nombre1.length<nombre2.length){
  return (`${nombre2}`)
}
return('son iguales')
}

function esPar(num)
{
if (num%2==0){
return true
}
else{
return false
}
}

module.exports = {
    hola,suma,factorialize,cualEsMasLargo,esPar
}