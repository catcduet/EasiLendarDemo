jQuery(document).ready(function(){jQuery(window).hashchange(function(){jQuery("a[href="+location.hash+"]").trigger("click")});jQuery("section.content.hide").hide();jQuery(".main-nav ul li a").click(function(){var a=jQuery(this).attr("href").substr(1);jQuery("section.content.show, section#"+a).is(":animated")||(jQuery(".main-nav ul li a").removeClass("active"),jQuery("section.content.show").addClass("show").animate({opacity:0},{queue:!1,duration:1E3,complete:function(){jQuery("section.content.show").hide();jQuery('a[href="#'+a+'"]').addClass("active");jQuery("section#"+a).show();jQuery("section#"+a).addClass("show").animate({opacity:1},{queue:!1,duration:1E3})}}))})});