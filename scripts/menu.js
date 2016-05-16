
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

function enterImg(all, name) {
	return "-hover.jpg";
}

function outImg(all, name) {
	return ".jpg";
}

function activeImg(all,name) {
	return "-hover.jpg";
}

/*
param activePageClass: the class name of the active link for the specific page
param menuId: the id of the navigation bar enclosing the links
*/
function Menu(activePageClass, menuId) {
	this.activePageClass = activePageClass; 
	this.menuId = menuId;
	this.init();
}

Menu.prototype.onLeave = function (linkOver) {

	if (!linkOver.getElementsByTagName("img")[0] || linkOver.className==this.activePageClass) return;
	var source = linkOver.getElementsByTagName("img")[0].src.toString();
	source = source.replace(/(-hover\.jpg)|(\.jpg)/g,outImg);
	//$(this.getElementsByTagName("img")[0]).animate({this.src=source;});
	$(linkOver.getElementsByTagName("img")[0]).stop(true).fadeTo(100,0.1, function() {
		//this.getElementsByTagName("img")[0].src = source;
		this.src = source;
		$(this).animate({opacity:1.0});
		//console.log("source: "+source);
		});
}

Menu.prototype.onEnter = function (linkOver) {
	//console.log(linkOver);
	if (!linkOver.getElementsByTagName("img")[0] || linkOver.className==this.activePageClass) return;

	var source = linkOver.getElementsByTagName("img")[0].src.toString();
	//console.log("before replace: "+source);
	source = source.replace(/(-hover\.jpg)|(\.jpg)/g,enterImg);
	
	$(linkOver.getElementsByTagName("img")[0]).stop(true).fadeTo(300,0.1, function() {
		//this.getElementsByTagName("img")[0].src = source;
		//image source
		this.src = source;
		$(this).animate({opacity:1.0});
		//console.log("source: "+source);
		});
}
Menu.prototype.init = function() {
	var oThis = this;
	var links = document.getElementById(this.menuId).getElementsByTagName("a");
	//console.log(links[0].getElementsByTagName("img")[0]);
	for (var i = 0; i< links.length; i++) {
		//change image for current active image
		if(links[i].className == this.activePageClass) {
			if(!links[i].getElementsByTagName("img")[0]) break;
			var imgsrc = links[i].getElementsByTagName("img")[0].src.toString();
			imgsrc = imgsrc.replace(/(-hover\.jpg)|(\.jpg)/g,activeImg);
			links[i].getElementsByTagName("img")[0].src = imgsrc;
			links[i].style.top = "7px";
			break;
		}
	}
	$(document.getElementById(this.menuId).getElementsByTagName("a")).hover(
		function() {oThis.onEnter(this);}, function(){ oThis.onLeave(this);});
}
