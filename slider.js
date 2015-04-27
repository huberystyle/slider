/*
 slider 2.0
 Autor: Hu Yicheng
 Update: 2014-04-07
 Usage: $("selector").slider({bAutoPlay:true,interval:4000,bPrevNext:true,direction:"upDown",bPagenation:true,pageStyle:"number",speed:400});
*/

(function($){
	var Slider = function(ele,opt,identifiers){
		this.$ele = ele;
		this.$opt = $.extend({bAutoPlay:true,interval:4000,bPrevNext:true,direction:"upDown",bPagenation:true,pageStyle:"number",speed:400},opt);
		this._count = this.$ele.children().length;
		this.currentIndex = 0;
		this.intervalId = 0;
		this.identifiers = identifiers;
	};
	Slider.prototype = {
		// reset html
		_resetHtml:function(){
			var _t = this,_id = _t.identifiers;
			_t.$ele.wrapInner("<div class='sliderWrap"+_id+"'><div class='sliderInner"+_id+"'></div></div>");
			$(".sliderWrap"+_id,_t.$ele).css({"width":_t.$ele.innerWidth(),"height":_t.$ele.innerHeight(),"overflow":"hidden","position":"relative"});
			if(_t.$opt.direction == "upDown"){
				$(".sliderInner"+_id,_t.$ele).css({"width":_t.$ele.innerWidth(),"height":_t.$ele.innerHeight()*_t._count}).children().css({"float":"left"});
			}else if(_t.$opt.direction == "leftRight"){
				$(".sliderInner"+_id,_t.$ele).css({"width":_t.$ele.innerWidth()*_t._count,"height":_t.$ele.innerHeight()}).children().css({"float":"left"});
			}
			$(".sliderInner"+_id,_t.$ele).children().each(function(i){
				$(this).addClass("sliderIndex"+i);
			});
			if(_t.$opt.bPagenation){
				var li = "";
				for(var i = 0; i < _t._count; i++){
					if(_t.$opt.pageStyle == "icon"){
						li += "<li></li>";
					}else if(_t.$opt.pageStyle == "number"){
						li += "<li>"+(i+1)+"</li>";
					}
				};
				_t.$ele.append("<ul class='sPagenation sPagenation"+_id+"'>"+li+"</ul>");
				$(".sPagenation"+_id+" li:first-child").addClass("on");
				$(".sPagenation"+_id).css("width",_t._count*$(".sPagenation li").outerWidth(true));
			};
			if(_t.$opt.bPrevNext){
				if(_t.$opt.direction == "upDown"){
					_t.$ele.append("<a href='javascript:void(0)' class='sPrev sPrev"+_id+"'>down</a><a href='javascript:void(0)' class='sNext sNext"+_id+"'>up</a>");
				}else if(_t.$opt.direction == "leftRight"){
					_t.$ele.append("<a href='javascript:void(0)' class='sPrev sPrev"+_id+"'>prev</a><a href='javascript:void(0)' class='sNext sNext"+_id+"'>next</a>");
				}
			};	
		},
		
		// sort 
		_sort:function(index){
			var _t = this,_id = _t.identifiers;
			for(var i = index+1; i < _t._count; i++){
				$(".sliderInner"+_id,_t.$ele).append($(".sliderIndex"+i,_t.$ele));
			}
			for(var j = 0; j < _t.currentIndex; j++){
				$(".sliderInner"+_id,_t.$ele).append($(".sliderIndex"+j,_t.$ele));
			}
		},
		
		// pagenation on
		_pageNationOn:function(){
			var _t = this,_id = _t.identifiers, p = $(".sPagenation"+_id+" > li",_t.$ele);
			p.filter(".on").removeClass("on");
			p.eq(_t.currentIndex).addClass("on");
		},
		
		// active
		_active:function(_direction){
			var _t = this,_id = _t.identifiers, objWidth = _t.$ele.width(),objHeight = _t.$ele.height();
			_t._pageNationOn(_t.currentIndex);
			switch(_direction){
				case "left":
					$(".sliderInner"+_id,_t.$ele).stop(true,true).animate({marginLeft:parseInt(-objWidth)+"px"},_t.$opt.speed,function(){
						$(this).css({marginLeft:0}).children(":first").appendTo($(".sliderInner"+_id),_t.$ele);
						_t._sort(_t.currentIndex);	
					});
				break;
				case "right":
					$(".sliderInner"+_id,_t.$ele).stop(true,true).animate({marginLeft:parseInt(-objWidth)+"px"}).children(":last").prependTo($(".sliderInner"+_id,_t.$ele));
					$(".sliderInner"+_id,_t.$ele).stop(true,true).animate({marginLeft:"0px"},_t.$opt.speed,function(){
						_t._sort(_t.currentIndex);	
					});
				break;
				case "up":
					$(".sliderInner"+_id,_t.$ele).stop(true,true).animate({marginTop:parseInt(-objHeight)+"px"},_t.$opt.speed,function(){
					$(this).css({marginTop:0}).children(":first").appendTo($(".sliderInner"+_id),_t.$ele);
						_t._sort(_t.currentIndex);	
					});
				break;
				case "down":
					$(".sliderInner"+_id,_t.$ele).stop(true,true).animate({marginTop:parseInt(-objHeight)+"px"}).children(":last").prependTo($(".sliderInner"+_id),_t.$ele);
					$(".sliderInner"+_id,_t.$ele).stop(true,true).animate({marginTop:"0px"},_t.$opt.speed,function(){
						_t._sort(_t.currentIndex);	
					});
				break;
				default:
			}
		},
		// auto play
		_autoPlay:function(){
			var _t = this,_id = _t.identifiers;
			_t.intervalId = setInterval(function(){
				_t.currentIndex++;
				if(_t.currentIndex > parseInt(_t._count-1)) _t.currentIndex = 0;
				if(_t.$opt.direction == "upDown"){
					_t._active("up");
				}else if(_t.$opt.direction == "leftRight"){
					_t._active("left");
				}
			},_t.$opt.interval);
			_t.$ele.hover(
				function(){clearInterval(_t.intervalId)}, 
				function(){_t.intervalId = setInterval(function(){
					_t.currentIndex++;
					if(_t.currentIndex > parseInt(_t._count-1)) _t.currentIndex = 0;
					if(_t.$opt.direction == "upDown"){
						_t._active("up");
					}else if(_t.$opt.direction == "leftRight"){
						_t._active("left");
					}
				},_t.$opt.interval);}
			);
		},
		// bind
		_bind:function(){
			var _t = this,_id = _t.identifiers;
			if(_t.$opt.bPrevNext){
				$(".sNext"+_id,_t.$ele).bind({
					"click":function(){
						var temp = _t.currentIndex;
						_t.currentIndex++;
						if(_t.currentIndex > _t._count-1) _t.currentIndex = 0;
						$(".sliderInner"+_id,_t.$ele).children(".sliderIndex"+temp).after($(".sliderInner"+_id,_t.$ele).children(".sliderIndex"+_t.currentIndex));
						if(_t.$opt.direction == "upDown"){
							_t._active("up");
						}else if(_t.$opt.direction == "leftRight"){
							_t._active("left");
						}
					}
				});
				$(".sPrev"+_id,_t.$ele).bind({
					"click":function(){
						_t.currentIndex--;
						if(_t.currentIndex < 0) _t.currentIndex = _t._count-1;
						$(".sliderInner"+_id,_t.$ele).append($(".sliderInner"+_id,_t.$ele).children(".sliderIndex"+_t.currentIndex));
						if(_t.$opt.direction == "upDown"){
							_t._active("down");
						}else if(_t.$opt.direction == "leftRight"){
							_t._active("right");
						}
					}
				});
			}
			if(_t.$opt.bPagenation){
				$(".sPagenation"+_id+" li",_t.$ele).bind("click",function(){
					var pageIndex = parseInt($(this).index());
					if(pageIndex == _t.currentIndex) return;
					if(pageIndex > _t.currentIndex){
						$(".sliderInner"+_id,_t.$ele).children(":first").after($(".sliderInner"+_id,_t.$ele).children(".sliderIndex"+pageIndex));
						_t.currentIndex = pageIndex;
						if(_t.$opt.direction == "upDown"){
							_t._active("up");
						}else if(_t.$opt.direction == "leftRight"){
							_t._active("left");
						}
					}else{
						$(".sliderInner"+_id,_t.$ele).append($(".sliderInner"+_id,_t.$ele).children(".sliderIndex"+pageIndex));
						_t.currentIndex = pageIndex;
						if(_t.$opt.direction == "upDown"){
							_t._active("down");
						}else if(_t.$opt.direction == "leftRight"){
							_t._active("right");
						}
					}				
				});
			}
		},
		
		// init
		init:function(){
			if(this.$ele.children().length <=1) return;
			this._resetHtml();
			this._bind();
			if(this.$opt.bAutoPlay){
				this._autoPlay();
			}
		}
	};

	$.fn.slider = function(options){
		return this.each(function(j){
			var sliderObj = [],d = new Date(),i = parseInt(d.getTime().toString().slice(9))*++j;
			sliderObj[i] = new Slider($(this),options,i);
			return sliderObj[i].init();
		});
	}
	
})(jQuery);