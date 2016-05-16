
jQuery(document).ready(function() {
	jQuery(".menu").on("click",function() {
		jQuery("#nav-link-list").addClass("active");
		jQuery("body").addClass("no-overflow");
	});
	
	jQuery(".close-menu").on("click",function() {
		jQuery("#nav-link-list").removeClass("active");
		jQuery("body").removeClass("no-overflow");
	});
});