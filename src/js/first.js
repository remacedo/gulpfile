(function helloWorld(name){
	console.log("Olá, " +name);
})('Mundo');

(function listaStatus(){
	document.querySelector('.pendente').addEventListener('click', function(){
		document.documentElement.classList.add('sucesso');
	})
})();

console.log("Olá, testesss");