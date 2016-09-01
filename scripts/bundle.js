"use strict";$(document).ready(function(){$("#add-event-form").length>0&&(moment().format(),jQuery.validator.addMethod("futureDate",function(t,e){var a=$("#start_date").val(),n=moment();return!(moment(a)<=n)}),jQuery.validator.addMethod("dateChecker",function(t,e){var a=$("#start_date").val(),n=$("#end_date").val();return!(moment(a)>=moment(n))}),$.validator.setDefaults({errorClass:"invalid",validClass:"valid",errorPlacement:function(t,e){$(e).closest("form").find("input[id='"+e.attr("id")+"']").attr("class","validate invalid")}}),$("#add-event-form").validate({rules:{start_date:{futureDate:!0},end_date:{dateChecker:!0}},onfocusout:function(t){this.element(t)}}),$("#name").on("blur",function(){$("#add-event-form").validate().element(this)}),$("#event-type").on("blur",function(){$("#add-event-form").validate().element(this)}),$("#host").on("blur",function(){$("#add-event-form").validate().element(this)}),$("#start_date").on("blur",function(){$("#add-event-form").validate().element(this)}),$("#end_date").on("blur",function(){$("#add-event-form").validate().element(this)}),$("#guest-list").on("blur",function(){$("#add-event-form").validate().element(this)}),$("#location").on("blur",function(){$("#add-event-form").validate().element(this)}))}),$(document).ready(function(){$.getJSON("../data/events.json",function(t){$.each(t,function(t,e){var a='<div class="col s12 m4"><div class="card-panel"><h4 class="card-title name">'+e.name+'</h4><br><p class="type">Type:'+e.type+'</p><p class="host">Host:'+e.host+'</p><p class="start-date">Start: '+e.start_date+'</p><p class="end-date">End: '+e.end_date+'</p><p class="guests">Guests:</p><ul class="guest-list" id='+e.id+'></ul><p class="location">Location: '+e.location+'</p><p class="message">Message: '+e.message+"</p></div></div>";$("#events").append(a);var n="#"+e.id;$.each(e.guest_list,function(t,e){var a='<li class="guest">'+e+"</li>";$(n).append(a)})})})}),$(".button-collapse").sideNav(),$(document).ready(function(){$("#sign-up-form").length>0&&(jQuery.validator.addMethod("passwordMatch",function(t,e){var a=$("#password").val(),n=$("#password_confirmation").val();return a==n}),$.validator.setDefaults({errorClass:"invalid",validClass:"valid",errorPlacement:function(t,e){$(e).closest("form").find("input[id='"+e.attr("id")+"']").attr("class","validate invalid")}}),$("#sign-up-form").validate({rules:{password_confirmation:{passwordMatch:!0},name:{required:!0}},onfocusout:function(t){this.element(t)}}),$("#full_name").on("blur",function(){$("#sign-up-form").validate().element(this)}),$("#email").on("blur",function(){$("#sign-up-form").validate().element(this)}),$("#password").on("blur",function(){$("#sign-up-form").validate().element(this)}),$("#password_confirmation").on("blur",function(){$("#sign-up-form").validate().element(this)}),$("#phone").on("blur",function(){$("#sign-up-form").validate().element(this)}))});
//# sourceMappingURL=bundle.js.map
