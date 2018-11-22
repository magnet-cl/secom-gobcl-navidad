$(function(){
	$('#muestraCargaEventos').hide();
	moment.locale('es');
});

$('.seleccionaDia').click(function(){
	var dia = $(this).attr('data-dia');
	$('#muestraCargaEventos').slideDown('slow');
	cargaDatos(dia);
});
function cargaDatos(dia)
{
	$.when($.ajax({url: "json/datosEventos.json",method: 'POST'})).done(function(datos) {
		var elementosCard = '';
		$.each(datos, function(key,valores){
			var fecha = moment(valores.fecha,'YYYY-MM-DD').get('date');	
			if (fecha == dia) // si el dia seleccionado es igual a lo que esta en eventos
			{
				var fechaMuestra = moment(valores.fecha).format("dddd, DD MMMM YYYY");
				var horaMuestra = moment(valores.fecha).format("h:mm A");
				var ciudad = valores.ciudad;
				var donde = valores.donde;
				var url = valores.url;
				elementosCard += '<div class="card bg-transparent">';
				elementosCard += '<div class="card-header bg-danger br-5">'+ciudad+'</div>'; //pone nombre de cuidad
				elementosCard += '<div class="card-body bg-success">';
				elementosCard += '<h5 class="card-title"><i class="fas fa-tree fa-2x"></i>Los esperamos el '+fechaMuestra+' </h5>'; // fecha formateada
				elementosCard += '<p class="card-text">en: '+donde+', a las '+horaMuestra+'</p>'; //logar y hora
				elementosCard += '</div>';
				elementosCard += '<div class="card-footer text-white bg-dark">';
				elementosCard += '<small>Como llegar: ';
				elementosCard += '<a href="'+url+'" target="_blank">'; //url google maps
				elementosCard += '<i class="fas fa-map-marker-alt fa-3x"></i>';
				elementosCard += '</a>';
				elementosCard += '</small>';
				elementosCard += '</div>';
				elementosCard += '</div><br>';
			}			
		});
		$('#cardMuestraEventos').html(elementosCard)
	});
}