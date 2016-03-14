/* START PARTICIPANT */
	$("#name-participant").keyup(function(event){
		if(event.keyCode == 13){
	    	$('#add-participant-btn').click();
	    	return false;
		}
	});
	var participant_list_counter = $(".participant-list li").length;
	/* ADD PARTICIPANT */
	$('#add-participant-btn').on("click", function(){
 		var name = $("#name-participant").val();
 		if (name != '') {
    		participant_list_counter++;
    		var temp = "<li><div class='panel panel-default animated fadeInDown' style='border-color:#5d9cec;'><div id='participant_" + participant_list_counter + "' role='tab' class='panel-heading'><h4 class='panel-title'>" + name + "<a type='button' class='pull-right delete-participant' title='Удалить участника' id='delete-participant_" + participant_list_counter + "'><em class='fa fa-times'></em></a></h4></div><div id='description_" + participant_list_counter + "' class='panel-collapse'><div class='panel-body'> <div class='col-md-6 btn_area'><textarea style='resize: none;'name='participant_description_" + participant_list_counter + "' placeholder='Описание участника, его достижения и др.' class='form-control error' aria-required='true' maxlength='1000' rows='6' required></textarea></div><div class='col-md-3 btn_area text-center'><label>Выберите фотографию участника</label><br><small>допустимые форматы jpeg,png,gif</small><div class='col-md-12 btn_area'><label for='participant_photo_" + participant_list_counter + "' class='btn btn-add-photo'>Выберите фото</label></div></div><div class='col-md-3 btn_area text-center'><div class='file-upload' id='file-upload_" + participant_list_counter + "'><div class='image-preview-wrapper' title=' '><div class='image-preview' id='image-viewer-participant_" + participant_list_counter + "'></div><input type='file' id='participant_photo_" + participant_list_counter + "' name='participant_photo_" + participant_list_counter + "' class='imageUploader' onchange='readURL1(this);'></div></div></div></div></div></div></li>";
    		$('.participant-list').append(temp);
    		$("#name-participant").val('');
 		}
 		if (participant_list_counter > 0) {
    		$('.btn-submit-participant').prop('disabled', false);
 		}
	});
	/* DELITE PARTICIPANT */
	$('.participant-list').on('click', '.delete-participant', function(){
 		var number = $(this).attr('id');
 		number = number.substr(number.lastIndexOf('_')+1,number.length);
 		var i;
 		for(i=parseInt(number)+1; i<=participant_list_counter; i++)
 		{
    		var liElem = $('.participant-list li:nth-child('+i+')');
    		var setHTML = liElem.html();
    		setHTML = setHTML.replace("id=\"participant_"+i+"\"","id=\"participant_"+(i-1)+"\"");
    		setHTML = setHTML.replace("id=\"name_"+i+"\"","id=\"name_"+(i-1)+"\"");
    		setHTML = setHTML.replace("href=\"#description_"+i+"\"","href=\"#description_"+(i-1)+"\""); 
    		setHTML = setHTML.replace("aria-controls=\"description_"+i+"\"","aria-controls=\"description_"+(i-1)+"\"");
    		setHTML = setHTML.replace("id=\"delete-participant_"+i+"\"","id=\"delete-participant_"+(i-1)+"\"");
    		setHTML = setHTML.replace("id=\"description_"+i+"\"","id=\"description_"+(i-1)+"\"");
    		setHTML = setHTML.replace("name=\"participant_description_"+i+"\"","name=\"participant_description_"+(i-1)+"\""); //
    		setHTML = setHTML.replace("name=\"participant_photo_"+i+"\"","name=\"participant_photo_"+(i-1)+"\"");
    		liElem.html(setHTML);
 		}
 		participant_list_counter--;
 		$('.participant-list li').remove(':nth-child(' + number + ')');
 		if (participant_list_counter == 0) {
    		$('.btn-submit-participant').prop('disabled', true);
 		}
	});
	/* SELECT PARTICIPANT PHOTO*/
	function readURL1(input){
		var number = $(input).attr('id');
	 	number = number.substr(number.lastIndexOf('_')+1,number.length);
	 	var type   = ['image/gif','image/jpg','image/jpeg','image/png'];
	 	var width  = 1024;
	 	var minwidth  = 150;
	 	var height = 768;
	 	var minheight = 150;
	 	var size   = 307200; // bytes
	 	var file   = input.files[0];
	 	function errType () {
		    alert('Error type ...');
		    input.value = '';
	 	}
	 	function errSize () {
		    alert('Error size ...');
		    input.value = '';
	 	}
	 	function errWidth() {
		    alert('Error width ...');
		    input.value = '';
	 	}
	 	function errHeight() {
		    alert('Error height ...');
		    input.value = '';
	 	}
	 	if (type.indexOf(file.type) == -1) {
		    errType ();
		    return false;
	 	} else if (file.size > size) {
		    errSize();
		    return false;
	 	} else if (file.width > minwidth && file.width < width) {
		    errWidth();
		    return false;
	 	} else if (file.height > minheight && file.height < height) {
		    errHeight();
		    return false;
	 	} else {
		    var reader = new FileReader();
		    reader.onload = function(e){
	       		$('#image-viewer-participant_'+number).css('background-image', 'url('+e.target.result+')');
	    	}
	    	reader.readAsDataURL(input.files[0]);
	 	}
	}
/* END PARTICIPANT */

/* START JUDGE */
	/* ADD JUDGE */
	var judge_list_counter = $(".judge-list li").length;
	$('#add-judge-btn').on("click", function(){
	 	var name = $("#name-judge").val();
	 	if (name != '') {
	    	judge_list_counter++;
	    	var temp = "<li><div class='panel panel-default animated fadeInDown' style='border-color:#5d9cec;'><div id='judge_" + judge_list_counter + "' role='tab' class='panel-heading'><h4 class='panel-title'>" + name + "<a type='button' class='pull-right delete-judge' title='Удалить члена жюри' id='delete-judge_" + judge_list_counter + "'><em class='fa fa-times'></em></a></h4></div><div id='description_" + judge_list_counter + "' role='tabpanel' class='panel-collapse'><div class='panel-body'> <div class='col-md-6 btn_area'><input name='judge_email_" + judge_list_counter + "' type='email' placeholder='Укажите e-mail члена жюри' class='form-control btn_area' required> <input name='judge_status_" + judge_list_counter + "' type='text' placeholder='Укажите кем является член жюри' class='form-control btn_area' required></div><div class='col-md-3 btn_area text-center'><label>Выберите фотографию участника</label><br><small>допустимые форматы jpeg,png,gif</small><div class='col-md-12 btn_area'><label for='judge_photo_" + judge_list_counter + "' id='btn-add-photo_" + judge_list_counter + "' class='btn btn-add-photo'>Выберите фото</label></div></div><div class='col-md-3 btn_area text-center'><div class='file-upload' id='file-upload_" + judge_list_counter + "'><div class='image-preview-wrapper' title=' '><div class='image-preview' id='image-viewer-judge_" + judge_list_counter + "'></div><input type='file' id='judge_photo_" + judge_list_counter + "' name='judge_photo_" + judge_list_counter + "' class='imageUploader' onchange='readURL2(this);'></div></div></div></div></div></div></li>";
	    	$('.judge-list').append(temp);
	    	$("#name-judge").val('');
	 	}
	 	if (judge_list_counter > 0) {
		    $('.btn-submit-judge').prop('disabled', false);
	 	}
	});
	/* DELITE JUDGE */
	$('.judge-list').on('click', '.delete-judge', function(){
		var number = $(this).attr('id');
	 	number = number.substr(number.lastIndexOf('_')+1,number.length);
	 	var i;
	 	for(i=parseInt(number)+1; i<=judge_list_counter; i++)
	 	{
		    var liElem = $('.judge-list li:nth-child('+i+')');
	    	var setHTML = liElem.html();
	    	setHTML = setHTML.replace("id=\"judge_"+i+"\"","id=\"judge_"+(i-1)+"\"");
	    	setHTML = setHTML.replace("id=\"judge_name_"+i+"\"","id=\"judge_name_"+(i-1)+"\"");
	    	setHTML = setHTML.replace("href=\"#judge_description_"+i+"\"","href=\"#judge_description_"+(i-1)+"\""); 
	    	setHTML = setHTML.replace("aria-controls=\"judge_description_"+i+"\"","aria-controls=\"judge_description_"+(i-1)+"\"");
	    	setHTML = setHTML.replace("id=\"delete-judge_"+i+"\"","id=\"delete-judge_"+(i-1)+"\"");
	    	setHTML = setHTML.replace("id=\"judge_description_"+i+"\"","id=\"judge_description_"+(i-1)+"\"");
	    	setHTML = setHTML.replace("name=\"judge_status_"+i+"\"","name=\"judge_status_"+(i-1)+"\""); //
	    	setHTML = setHTML.replace("name=\"judge_email_"+i+"\"","name=\"judge_email_"+(i-1)+"\"");
	    	setHTML = setHTML.replace("name=\"judge_photo_"+i+"\"","name=\"judge_photo_"+(i-1)+"\"");
	    	liElem.html(setHTML);
	 	}
	 	judge_list_counter--;
	 	$('.judge-list li').remove(':nth-child(' + number + ')');
	 	
	});
	/* SELECT JUDGE PHOTO*/
	function readURL2(input){
	 	var number = $(input).attr('id');
	 	number = number.substr(number.lastIndexOf('_')+1,number.length);
	 	var type   = ['image/gif','image/jpg','image/jpeg','image/png'];
	 	var width  = 1024;
	 	var minwidth  = 150;
	 	var height = 768;
	 	var minheight = 150;
	 	var size   = 307200; // bytes
	 	var file   = input.files[0];
	 	function errType () {
		    alert('Error type ...');
		    input.value = '';
	 	}
	 	function errSize () {
		    alert('Error size ...');
		    input.value = '';
	 	}
	 	function errWidth() {
		    alert('Error width ...');
		    input.value = '';
	 	}
	 	function errHeight() {
		    alert('Error height ...');
		    input.value = '';
	 	}
	 	if (type.indexOf(file.type) == -1) {
		    errType ();
		    return false;
	 	} else if (file.size > size) {
		    errSize();
		    return false;
	 	} else if (file.width > minwidth && file.width < width) {
		    errWidth();
	    	return false;
	 	} else if (file.height > minheight && file.height < height) {
		    errHeight();
		    return false;
	 	} else {
		    var reader = new FileReader();
		    reader.onload = function(e){
	       		$('#image-viewer-judge_'+number).css('background-image', 'url('+e.target.result+')');
	    	}
	    	reader.readAsDataURL(input.files[0]);
	 	}
	}
/* END JUDGE */

/* START STAGE */
	/* ADD STAGE */
	var stage_list_counter = $(".stage-list li").length;
	$('#add-stage-btn').on("click", function(){
 		var name = $("#name-stage").val();
 		if (name != '') {
    		stage_list_counter++;
    		var temp = "<li><div class='panel panel-default animated fadeInDown' style='border-color:#5d9cec;'><div id='stage_" + stage_list_counter + "' role='tab' class='panel-heading'><h4 class='panel-title'><a id='stage_name_" + stage_list_counter + "' href='#stage_description_" + stage_list_counter + "' aria-controls='stage_description_" + stage_list_counter + "'>" + name + "</a><a type='button' class='pull-right delete-stage' title='Удалить этап' id='delete-stage_" + stage_list_counter + "'><em class='fa fa-times'></em></a></h4></div><div id='stage_description_" + stage_list_counter + "' class='panel-collapse'><div class='panel-body'> <input name='stage_description_" + stage_list_counter + "' type='text' placeholder='Описание этапа' class='form-control' required> </div></div></div></li>";
    		$('.stage-list').append(temp);
    		$("#name-stage").val('');
 		}
 		if (stage_list_counter > 0) {
    		$('.btn-submit-stage').prop('disabled', false);
 		}
	});
	/* DELITE STAGE */
	$('.stage-list').on('click', '.delete-stage', function(){
 		var number = $(this).attr('id');
 		number = number.substr(number.lastIndexOf('_')+1,number.length);
 		var i;
 		for(i=parseInt(number)+1; i<=stage_list_counter; i++)
 		{
    		var liElem = $('.stage-list li:nth-child('+i+')');
    		var setHTML = liElem.html();
    		setHTML = setHTML.replace("id=\"stage_"+i+"\"","id=\"stage_"+(i-1)+"\"");
    		setHTML = setHTML.replace("id=\"stage_name_"+i+"\"","id=\"stage_name_"+(i-1)+"\"");
    		setHTML = setHTML.replace("href=\"#stage_description_"+i+"\"","href=\"#stage_description_"+(i-1)+"\""); 
    		setHTML = setHTML.replace("aria-controls=\"stage_description_"+i+"\"","aria-controls=\"stage_description_"+(i-1)+"\"");
    		setHTML = setHTML.replace("id=\"delete-stage_"+i+"\"","id=\"delete-stage_"+(i-1)+"\"");
    		setHTML = setHTML.replace("id=\"stage_description_"+i+"\"","id=\"stage_description_"+(i-1)+"\"");
    		setHTML = setHTML.replace("name=\"stage_description_"+i+"\"","name=\"stage_description_"+(i-1)+"\"");
    		liElem.html(setHTML);
 		}
 		stage_list_counter--;
 		$('.stage-list li').remove(':nth-child(' + number + ')');
 		if (stage_list_counter == 0) {
		    $('.btn-submit-judge').prop('disabled', true);
	 	}
	});
/* END STAGE */