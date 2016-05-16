/************
TABS
this is a JQuery function that displays tabs
in order to work we must a list of tab links encapsulated by an element with an id
param linksBlock: this is the element that has the tab links. a div element is preferred with id
param contentBlock: the block with the content, should also be a div
param linksElementName: the element that contains each individual link
param format_css_on: this allows to format the css for the link for the tab that is currently visible
param format_css_off: format css fo the other links not visible
*************/
function Tabs(linksBlock, contentBlock,linksElementName, format_css_on, format_css_off) {
	//a div encapsulating the other content divs
	this.content = contentBlock;
	//a div encapsulating the links, each individual link is a span
	this.links = linksBlock;
	this.linksElementName = linksElementName;
	this.currActiveTab = null;
	this.active_tab_id = null;
	this.format_css_on = format_css_on || null;
	this.format_css_off = format_css_off || null;
	this.oldActiveTab = null;
	this.animating = false;
	this.init();
}

/*
when we click on one of the tab links that is not in the one we are currently
*/
Tabs.prototype.clickTab = function(eClicked) {

	var oThis = this;  //  get the context of this function
	var tempLink = this.currActiveTab;  //  get link of current active tab
	this.oldActiveTab = this.currActiveTab;  //  the old tab
	this.currActiveTab = eClicked;  //  the current tab is the one we just clicked
	
		if(oThis.format_css_off != null)
		{
			$(oThis.oldActiveTab).css(oThis.format_css_off);
		}
		if	(oThis.format_css_on != null)
		{
			$(oThis.currActiveTab).css(oThis.format_css_on);
		}
	
	
	
	
	//console.log("classname: "+eClicked.className);
	var cssSelector = "#"+this.content.id+"> div.active";  //  get the current active div
	//console.log(cssSelector);
	var divPos = parseInt(eClicked.className);  //  the links should have numbers as class names
	//console.log("div pos: " + divPos + "|| active_tab_id: "+oThis.active_tab_id);
	var children = document.querySelectorAll("#"+oThis.content.id+">div");  // get the div for the link clicked
	//if(divPos<children.length && divPos != oThis.active_tab_id) {
	//var hide_and_show = function() {
		$(cssSelector).stop(false, true).slideUp("slow", 
			function (){
				
				this.className="";
				
				var newActiveTab = children[divPos];//oThis.content.getElementsByTagName("div")[divPos];
				//console.log(newActiveTab.innerHTML);
				$(newActiveTab).stop(false, true).slideDown("slow",function(){
					this.className="active";
					oThis.animating = false;
					oThis.active_tab_id = divPos;
					});
				//newActiveTab.className="active";
			});
	//}
	
	//dont know how useful this is
	
		/*$.when(function() {
			return divPos != oThis.active_tab_id;
		}).then(hide_and_show());
	*/
	
}

//  initialize everything
Tabs.prototype.init = function() {
	var oThis = this;
	
	$(this.links.getElementsByTagName(this.linksElementName)[0]).css(oThis.format_css_on);
	
	this.currActiveTab = this.links.getElementsByTagName(this.linksElementName)[0];
	//console.log(document.querySelectorAll('#tabcontent>div'));
	var directChildren = document.querySelectorAll("#"+this.content.id+">div");
	for (var i = 0; i < directChildren.length;i++) {
		//console.log("class names: " + directChildren[i].className);
		 if (directChildren[i].className == "active") {
			oThis.active_tab_id = i;
			$(directChildren[i]).show();
		 }
		 else {
			$(directChildren[i]).hide();
		 }
	}
		$("#tab > span").on('click', function() {
	//$(document.getElementById("tab").getElementsByTagName("span")).click(function() {
		//  check to see if a tab is sliding one and another one is sliding down so that we wait until those events finish
		if (!oThis.animating && parseInt(this.className) != parseInt(oThis.active_tab_id)) {
		
			//console.log("animating. class name: " + this.className);
			oThis.animating = true;
			//if (this.currActiveTab === this) return;
			oThis.clickTab(this);
			
		}
	//console.log("element clicked: "+this.className);
	});
		
	
}

/*****************************

END OF TABS

***************************/