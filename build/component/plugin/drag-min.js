/*
Copyright 2013, KISSY v1.50dev
MIT Licensed
build time: Nov 27 00:38
*/
KISSY.add("component/plugin/drag",["dd"],function(e,d){return d("dd").Draggable.extend({pluginId:"component/plugin/drag",pluginBindUI:function(a){var b=a.$el;this.set("node",b);this.on("dragend",function(){var c=b.offset();a.setInternal("xy",[c.left,c.top])})},pluginDestructor:function(){this.destroy()}},{ATTRS:{move:{value:1},groups:{value:!1}}})});
