//第一步定义本地的菜单，也就是定义前端工程师自己要控制的全局菜单,从原型视图变成数据，与美工的交接
//TODO: 有空把注册这个动作改为闭包形式
//这个MAP表示原型展示给你看的东西，也就是说你要把原型翻译成这个

var DropbeatsMenu=function(menu,permissions){
	var user_menu=menu;
	var user_permission=permissions;
	function _trun(require,attr){
		for(var r in require){
			if(user_permissions.indexOf(require[r])!==-1){
				attr._ifDisplay=true;
				break;
			}
		}
	}

	function _load(menu){
		for(var o in menu){
			require=menu[o]._codec;
			_trun(require,menu[o]);
			buttons=menu[o].buttons;
			if(buttons){
				for(var b in buttons){
					require=buttons[b]._codec;
					_trun(require,buttons[b]);
				}
			}
			layer=menu[o].layer;
			if(menu[o].layer){
				_load(layer)
			}
		}
	}
	_load(user_menu);
	return {
		menu:user_menu,
		permissions:user_permissions
	}
}

view_to_menu={
	//这个JSON表示，有一个一级菜单叫,product，它是一级菜单(_type=top),_i18n表示语言显示,create_product表示它的一个按钮
	//_codec表示显示它需要的权限(注意这个可以是协同的默认展示权限，例如这里我一进去就要展示所有产品，所以必须有查看所有产品的权限)
	"product":{
		"_ifDisplay":false,
		"_type":"top",
		"_codec":["admin:product:query","admin:product:*","admin:*"],
		"_i18n":{
			"zh-cn":"产品",
			"en":"Product"
		},
		//视图按钮
		"buttons":[{
			"_ifDisplay":false,
			"_codec":["admin:product:create","admin:product:*","admin:*"],
			"_type":"button",
			"_i18n":{
				"zh-cn":"创建产品",
				"en":"Create Product"
			}
		}]
	},
	"my_product":{
		"_ifDisplay":false,
		"_type":"top",
		"_codec":["admin:bound:product:query","admin:bound:product:*","admin:*"],
		"_i18n":{
			"zh-cn":"我的产品",
			"en":"Own Product"
		}
	},
	"function":{
		"_ifDisplay":false,
		"_type":"top",
		"_codec":["admin:layout:query","admin:layout:*","admin:*"],
		"_i18n":{
			"zh-cn":"功能",
			"en":"Function"
		},
		//内联菜单
		"layer":{
			"layout_management":{
				"_ifDisplay":false,
				"_type":"second",
				"_codec":["admin:layout:query","admin:layout:*","admin:*"],
				"_i18n":{
					"zh-cn":"布局管理",
					"en":"Layout"
				}
			},
			"advertisement_management":{
				"_ifDisplay":false,
				"_type":"second",
				"_codec":["admin:advertisement:query","admin:advertisement:*","admin:*"],
				"_i18n":{
					"zh-cn":"广告管理",
					"en":"Advertisement"
				}
			}
		}
	}
}

//第二步，获取用户的权限，也就是登录时候的东西，见ajax-data.js
user_permissions=ajax_user_data.map(x=>x.codec);

//第三步，遍历视图菜单，将标志位置好
var dbmenus=new DropbeatsMenu(view_to_menu,user_permissions);
console.log(dbmenus.menu)

// for(var o in view_to_menu){
// 	require=view_to_menu[o]._codec;
// 	hasPermission(require,view_to_menu[o]);
// 	buttons=view_to_menu[o].buttons;
// 	if(buttons){
// 		for(var b in buttons){
// 			require=buttons[b]._codec;
// 			hasPermission(require,buttons[b]);
// 		}
// 	}
// 	layer=view_to_menu[o].layer;
// 	if(layer){
// 		for(var l in layer){
// 			require=layer[l]._codec;
// 			hasPermission(require,layer[l]);
// 		}
// 	}
// }









//不需要这步
//第二步，获取后端的权限定义，也就是全局的权限多叉树，并且把数组转化为单根多叉树
//模拟AJAX获取的数据

//假设ajax获取到的数据是这个,见ajax-data.js
// global_permissions=ajax_global_data;