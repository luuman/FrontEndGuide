// description: 新导航
// date: 2015-10-21
// header.v1.css
// update:3
$(function() {
	// 搜索输入隐藏下拉菜单
$(".search-val").keydown(function(){
	$('.search-select ul').hide();
});
	//滑过导航显示子导航
$(".nav-hd li").hover( function () {
$(this).find("a").addClass("on");
    $(this).find(".subnav-hd").show();
 },
 function () {
$(this).find("a").removeClass("on");
    $(this).find(".subnav-hd").hide();
 } );

	$('#quickTab .tab-wrap').find('a').each(function(){
		  		var tmpurl=$(this).attr('href') +'&random='+ Math.random();
		  		$(this).attr('href',tmpurl);
	});
	//点击去动态消息提示;
	// $('#quickTab ul li').click(function(){

	// 	var weizhi = String($(this).index())+',';

	// 	var span = $(this).find('span');
	// 	var bellspan = $('.icon-bell').nextAll('span');
	// 	if(span.length==1){
	// 		var cat = $(this).attr('rel');
	// 		var bellnum = bellspan.text();
	// 			bellnum =parseInt(bellnum);
	// 		var yidu=0;
	// 		var data ={
	// 					uid:navuid,
	// 					cat:cat
	// 					};

	// 		var host = window.location.host;
	// 		if(host=='www.ui.cn'){
	// 			$.ajax({
 //                    type:'get',
 //                    dataType:'json',
 //                    url:'/delnotice',
 //                    data:data,
 //                    success:function(data){
 //                        if ( data.state == true ) {
 //                        	span.remove();
 //                        	yidu = data.yiread;
 //                        	bellnum = bellnum - yidu;
 //                        	if(bellnum>0){
 //                        		bellspan.text(bellnum);
 //                        	}else{
 //                        		bellspan.prevAll('.icon-bell').css('color','#CED7DE')
 //                        		bellspan.remove();
 //                        	}
 //                        	nav_loc = nav_loc.replace(weizhi,'');
 //                        }else{
 //                        }
 //                    },
 //                    error:function(){
 //                    }
	//                 });
	// 		}else if(host.indexOf('ui.cn')){
	// 			$.ajax({
 //                    type:'post',
 //                    dataType:'jsonp',
 //                    url:'http://www.ui.cn/delnotice',
 //                    data:data,
 //                    jsonpCallback:'DFEDFE',
 //                    success:function(data){
 //                        if ( data.state == true ) {
 //                        	span.remove();
 //                        	yidu = data.yiread;
 //                        	bellnum = bellnum - yidu;
 //                        	if(bellnum>0){
 //                        		bellspan.text(bellnum);
 //                        	}else{
 //                        		bellspan.prevAll('.icon-bell').css('color','#CED7DE')
 //                        		bellspan.remove();
 //                        	}
 //                        	nav_loc = nav_loc.replace(weizhi,'');
 //                        }else{
 //                        }
 //                    },
 //                    error:function(){
 //                    }
	//                 });
	// 		}

	// 	}

	// });
//兼容个人中心,立即激活的样式。
$(".jsemailverify").parent('div').parent('li').css("background","#fff7e7").find('a').addClass('f14').css('display','block');

$(".quick-item").hover( function () {
	$(this).addClass('on');
		$(this).find('.quick-menu').show();
 },
 function () {
$(this).removeClass('on');
		$(this).find('.quick-menu').hide();
 } );


	$(".quick-item").mouseenter(function(){
		if($(this).find('.quick-menu').attr('id')=='quickTab' && nav_loc.length>0){
			var navi = nav_loc.substr(0,1); // 获取第一个展开S
			navi = parseInt(navi);
			tabNav.eq(navi).trigger('click');//默认有动态 展开项
		}
	});




	// 消息选项卡
	$(".quick-tab .tab-wrap .tab-cont").hide();
	$(".quick-tab .tab-wrap .tab-cont").eq(0).show();
	$(".quick-tab .tab-bar li").eq(0).addClass('on');

	var tabNav = $(".quick-tab .tab-bar li");
	tabNav.click(function(){
		var index = $(".quick-tab .tab-bar li").index(this);  //获取当前点击li的索引值

		tabNav.removeClass('on');
		tabNav.eq(index).addClass('on');
		$(".quick-tab .tab-wrap ul").hide();
		$(".quick-tab .tab-wrap ul").eq(index).show();
	});
$(".search-hd-btn").click(function(ev){
      var ev = ev || event, // enent做兼容
            isTrue = $(".search-hd").is(".on"); // 判断.search-hd是否是展开状态
      ev.stopPropagation(); // 阻止冒泡
      if($(".search-hd").addClass('on').find('input').val() == ""){ // 在输入框没有文字时执行
            if(isTrue){ // isTrue等于 true 移除on，false就添加on
            	$(".search-hd").removeClass('on').find('input').blur();
            	$('.search-select ul').hide();
            }else{
            	$(".search-hd").addClass('on').find('input').focus();
            }
      }else{ //提交事件search-hd
      	$(".search-hd").find('input').focus();
      	if(isTrue){
      		$("#searchForm").submit();
      	}else{

      	}
      }
  })
$(".search-filter").click(function(ev){
	 ev.stopPropagation();
})
$(document).click(function(){
	$(".search-hd").removeClass('on').find('input').blur();
});
	//回车提交
	$(document).on("keydown","#keywords",function(e){
		var keyVal = $(this).val();
		var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if(keyVal=='' && keyCode==13){
			e.preventDefault();
		}
	})

	// 搜索分类
	$(".search-filter").hover(function(){
		$(this).find('ul').show();
	},function(){
		$(this).find('ul').hide();
	})
	// selectBoxSer (".search-filter");
	$(".search-filter ul a").click(function(){
		var textVal = $(this).text();
		var tVal = $(this).attr("data-rel");
		$(".search-filter ul li").removeClass("on");
		$(this).parent().addClass("on");
		$("#sType").val(tVal);
		$(this).parents(".search-filter").find(".tit").text(textVal);
		$(this).parents(".search-filter").find(".options").hide();
		return false;
	});

	// 搜索提示
	selectBoxSer (".search-select");
	$(".search-select ul a").click(function(){
		var textVal = $(this).text();
		$(".search-val").val(textVal);
		$(this).parents(".search-select").find(".options").hide();
		// $(".search-hd").find('input').focus();搜索下拉选择后获取焦点
		return false;
	});

});
// 搜索选项下拉
selectBoxSer = function(box){
	$(box).click(function(){
		var $this = $(this);
		$this.blur();
		var options = $this.find('.options').css('display');

	if( options == 'none' && $(".search-val[type=text]").val()=="" ){	//
		$this.find(".options").show();

	} else {
		$this.find(".options").hide();
	}
	/*点击任何地方关闭层*/
	$(document).click(function(event){
		var tar = $(event.target).attr("class");
		if( tar != $this ){
			$this.find(".options").hide();
		}
	});
	return false;

});
};

