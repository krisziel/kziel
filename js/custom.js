var now = new Date();
var URL_ACTION = "http://www.staralliance.com/flifoQueryAction.do?param=json";	// JSON-Output
var URL_CARRIER = "http://www.staralliance.com/int/int_img/json/carrier.json?time=" + now.getMilliseconds(); // JSON-Output
var sLogourl = "";
var updateID = 0;
var timeTransition = 0;
var flightinfo;
var segmentsarr = new Array();


/// Mac-specific effects
function doFlipToBack(){
    var front = document.getElementById("front");
    var back = document.getElementById("back");
	
    if(window.widget){
	widget.prepareForTransition("ToBack");
    }

    front.style.display="none";
    back.style.display="block";

    if(window.widget){
	setTimeout("widget.performTransition();", 0);
    }
    $("#departure").css("display","none");
    $("#arrival").css("display","none");
    $(".icon").css("display","none");
    $(".flight").css("display","none");
    $("#segments").css("display","none");
    $(".list_content").css("display","none");
    $("#strike").css("display","none");
}


function doFlipToFront(){
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if(window.widget){
	widget.prepareForTransition("ToFront");
    }

    back.style.display="none";
    front.style.display="block";
	
    if(window.widget){
	setTimeout("widget.performTransition();", 0);
    }
}

function CheckDockState() {

    System.Gadget.beginTransition();
    var oBody = document.body.style;
    if (System.Gadget.docked) {
        oBody.width = 130;
        oBody.height = 130;
		showPage('status');
    } else {
		oBody.width = 350;
		oBody.height = 400;
		showPage('back');
    }
    System.Gadget.endTransition(System.Gadget.TransitionType.none, timeTransition);
	
}

function checkConnectivity(){
	$.ajax({
		type: "GET",
		url: URL_CARRIER,
		error: function () {
			// no internet
			$('#error .msg').html('Please connect to the internet');		
		}
	});
}

function str_pad (input, pad_length, pad_string, pad_type) {
    var half = '', pad_to_go;
    var str_pad_repeater = function(s, len) {
        var collect = '', i;
        while(collect.length < len) collect += s;
        collect = collect.substr(0,len);
        return collect;
    };
    input += '';
    if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') { pad_type = 'STR_PAD_RIGHT'; }
    if ((pad_to_go = pad_length - input.length) > 0) {
        if (pad_type == 'STR_PAD_LEFT') { input = str_pad_repeater(pad_string, pad_to_go) + input; }
        else if (pad_type == 'STR_PAD_RIGHT') { input = input + str_pad_repeater(pad_string, pad_to_go); }
        else if (pad_type == 'STR_PAD_BOTH') {
            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go/2));
            input = half + input + half;
            input = input.substr(0, pad_length);
        }
    }
    return input;
}

function getAirport(s) {
	var str1 = s.split("(");
	var str2 = str1[1].split(")");
	return str2[0];
}

function updateStatus() {

	if ($('#airline').val() != "") {

		var airline = $('#airline').val();
		var flightNo = $('#flightNo').val();
		var day = $('#departureDD').val();
		var month = $('#departureMM').val();
		var year = $('#departureYYYY').val();
		var now = new Date();
		var param = "&airlineCode=" + airline + "&flightNo=" + flightNo + "&day=" + day + "&month=" + month + "&year=" + year + "&time=" + now.getMilliseconds(); 

		$('#status .flightName:eq(0)').html(airline + ' ' + flightNo);
		$('#status .flightFromTo:eq(0)').html('...');
		$('#status .status:eq(0)').html(' ');

		$.getJSON(URL_ACTION + param, function(json) {
			if (json.status != '' && json.dep_airport == '') {
				$('#status .flightName:eq(0)').html('drag me to');
				$('#status .flightFromTo:eq(0)').html('the desktop');
			} else {
				$('#status .flightName:eq(0)').html(airline + ' ' + flightNo);
				$('#status .flightFromTo:eq(0)').html(getAirport(json.dep_airport) + ' - ' + getAirport(json.arr_airport));
				$('#status .status:eq(0)').html(json.status);
			}
		});
	}	
}

function showPage(page) {
	$('#back').hide();
	$('#front').hide();
	$('#error').hide();
	$('#status').hide();
	$('#' + page).show();
}

function initdate(){
	var now = new Date();
	$('#departureDD').val(str_pad(now.getDate(), 2, "0", "STR_PAD_LEFT"));
	$('#departureMM').val(str_pad(now.getMonth() + 1, 2, "0", "STR_PAD_LEFT"));
	$('#departureYYYY').val(now.getFullYear());
		
	$('#departureDD_input').val(str_pad(now.getDate(), 2, "0", "STR_PAD_LEFT"));
	$('#departureMM_input').val(str_pad(now.getMonth() + 1, 2, "0", "STR_PAD_LEFT"));
	$('#departureYYYY_input').val(now.getFullYear());
}


if (window.widget){
	widget.onshow = checktoday;
}

function checktoday(){
	initdate();
}

function init() {

	//CheckDockState();
	checkConnectivity();
	window.setInterval(checkConnectivity, 1*60000); // check every minute

	$('#editbutton').click(function(e){
		e.preventDefault();
		doFlipToBack();
		//showPage('back');
	});

	$('#retrybutton').click(function(e){
		e.preventDefault();
		doFlipToFront();
		showPage('back');
	});
  
	$.getJSON(URL_CARRIER, function(json){
		var sOptions = $("#airline").html();
		var aCarrier = json.carrier[0];
		for (val in aCarrier) {
			sOptions += ' <option value="' + val + '">' + aCarrier[val] + '</option>\r\n';
		}
		$("#airline").html(sOptions);
		$('#airline').selectbox(); 
		
		sLogourl = json.logourl;
	});
	
	var now = new Date();
	
	var sYear = new Array();
	sYear[0] = now.getFullYear() - 1;
	sYear[1] = now.getFullYear();
	sYear[2] = now.getFullYear() + 1;
	
	sOptions = "";
	for (i = 0; i < sYear.length; i++) {
		sOptions += ' <option value="' + sYear[i] + '">' + sYear[i] + '</option>\r\n';
	}
	$("#departureYYYY").html(sOptions);
	
	initdate();
	
	$('#departureDD').selectbox();
	$('#departureMM').selectbox();
	$('#departureYYYY').selectbox();
	
	$('#viewbutton').click(function(e){
		e.preventDefault();
		var airline = $('#airline').val();
		var flightNo = $('#flightNo').val();
		var day = $('#departureDD').val();
		var month = $('#departureMM').val();
		var year = $('#departureYYYY').val();
		var param = "&airlineCode=" + airline + "&flightNo=" + flightNo + "&day=" + day + "&month=" + month + "&year=" + year + "&time=" + now.getMilliseconds();
		var json=null;
		
		$('#arrival .estimated').hide();
		$('#arrival .actual').hide();
		$('#departure .estimated').hide();
		$('#departure .actual').hide();
		$('#departure li.airport:eq(0)').html("loading...");
		$('#departure li span.date:eq(0)').html("");
		$('#departure li span.sched:eq(0)').html("");
		$('#departure li span.act:eq(0)').html("");
		$('#departure li span.est:eq(0)').html("");
				
		$('#arrival li.airport:eq(0)').html("loading...");
		$('#arrival li span.date:eq(0)').html("");
		$('#arrival li span.sched:eq(0)').html("");
		$('#arrival li span.act:eq(0)').html("");
		$('#arrival li span.est:eq(0)').html("");
		
		$('.flightName:eq(0)').html("");
		$('.status:eq(0)').html("");
                           if (sLogourl.substr(sLogourl.length - 2, sLogourl.length - 1) != "/") sLogourl += "/";
                           var sLogo = '<img src="' + sLogourl + airline + '.png" alt="' + airline + '" />';
                           $("div.icon:eq(0)").html(sLogo);
                           $.ajax({url:URL_ACTION + param, success:function(data){
                                  var json = $.parseJSON("[" + data.replace(/  /gi," ").replace(/(\r\n|\n|\r|\t)/gm,"").replace(/} {/gi,"},{") + "]");
                                  flightinfo = json;
                                  if(json.length > 1) {
                                  $("#segments").html("");
                                  var segments = "";
                                  var options = "<select id=\"segments_select\">";
                                  i = 0;
                                  while(i < json.length) {
                                  $("#departure").css("display","none");
                                  $("#arrival").css("display","none");
                                  segments = segments + "<li onClick=\"selectSegment('" + i + "');\"><span>" + flightinfo[i].dep_airport + " - " + flightinfo[i].arr_airport + "</span></li>";
                                  options = options + "<option value=\"" + i + "\">" + flightinfo[i].dep_airport.substr(-4,3) + "-" + flightinfo[i].arr_airport.substr(-4,3) + "</option>";
                                  segmentsarr[i] = flightinfo[i].dep_airport.substr(-4,3) + "-" + flightinfo[i].arr_airport.substr(-4,3);
                                  i++;
                                  }
                                  $("#segments_list").html(segments);
                                  $("#segments").html(options + "</select>");
                                  $("#segments_select").selectbox();
                                  $(".list_content").css("display","block");
                                  } else {
                                  selectSegment(0);
                                  }
                                  $(".icon").css("display","block");
                                  $(".flight").css("display","block");
                                  $('.flightName:eq(0)').html(airline + ' ' + flightNo);
                                  $('.status:eq(0)').html(flightinfo[0].status);
                                  }});
		doFlipToFront();
		//showPage('front');
	});
	
	
  $("#flightNo").keypress(function(e) { 
    //if the letter is not digit then don't type anything
    if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)) return false;
  });	
	updateID = window.setInterval(updateStatus, 2*60*1000); // every second minute
}
function selectSegment(i) {
    if (flightinfo[i].status != '' && flightinfo[i].dep_airport == '') {
        $('#error .msg:eq(0)').html(flightinfo[i].status);
        doFlipToBack();
        showPage('error');
    } else {
        if(flightinfo.length > 1) {
            $("#segments").css("display","block");
            $('#segments_select_container > ul > li').attr("class","");
            $('#segments_select_input_' + i).attr("class","selected");
            $("#segments_select_input").val($('#segments_select_input_' + i).html());
            $("#segments_select_input").blur(function(){ selectSegment($.inArray(this.value,segmentsarr)); });
        } else {
            $("#segments").css("display","none");
        }
        $(".list_content").css("display","none");
        $("#strike").css("display","block");
        $("#departure").css("display","block");
        $("#arrival").css("display","block");
        $(".icon").css("display","block");
        $(".flight").css("display","block");
        $('#departure li.airport:eq(0)').html(flightinfo[i].dep_airport);
        $('#departure li span.date:eq(0)').html(flightinfo[i].dep_date);
        $('#departure li span.sched:eq(0)').html(flightinfo[i].dep_shed);
        $('#departure li span.act:eq(0)').html(flightinfo[i].dep_act);
        $('#departure li span.est:eq(0)').html(flightinfo[i].dep_est);
        if(typeof(flightinfo[i].dep_act)=='string'){
            if(flightinfo[i].dep_act.length>1){
                $('#departure .estimated').hide();
                $('#departure .actual').show();
            }else{
                $('#departure .estimated').show();
                $('#departure .actual').hide();
            }
        }else{
            $('#departure .estimated').show();
            $('#departure .actual').hide();
        }
        $('#arrival li.airport:eq(0)').html(flightinfo[i].arr_airport);
        $('#arrival li span.date:eq(0)').html(flightinfo[i].arr_date);
        $('#arrival li span.sched:eq(0)').html(flightinfo[i].arr_shed);
        $('#arrival li span.act:eq(0)').html(flightinfo[i].arr_act);
        $('#arrival li span.est:eq(0)').html(flightinfo[i].arr_est);
        if(typeof(flightinfo[i].arr_act)=='string'){
            if(flightinfo[i].arr_act.length>1){
                $('#arrival .estimated').hide();
                $('#arrival .actual').show();
            }else{
                $('#arrival .estimated').show();
                $('#arrival .actual').hide();
            }
        }else{
            $('#arrival .estimated').show();
            $('#arrival .actual').hide();
        }
    }
}

$(document).ready(function(){
	init();
	doFlipToBack();
	showPage('back');
});