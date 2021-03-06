
(function(config,Features,UA){
config({
    'anim/transition?':{
        alias:KISSY.Features.isTransitionSupported() ? "anim/transition" : ""
    }
});/*Generated By KISSY Module Compiler*/
config({
'anim': {requires: ['anim/base','anim/timer','anim/transition?']}
});
/*Generated By KISSY Module Compiler*/
config({
'anim/base': {requires: ['dom','promise']}
});
/*Generated By KISSY Module Compiler*/
config({
'anim/timer': {requires: ['dom','anim/base']}
});
/*Generated By KISSY Module Compiler*/
config({
'anim/transition': {requires: ['dom','event/dom','anim/base']}
});
/*Generated By KISSY Module Compiler*/
config({
'attribute': {requires: ['event/custom']}
});
/*Generated By KISSY Module Compiler*/
config({
'base': {requires: ['attribute']}
});
/*Generated By KISSY Module Compiler*/
config({
'button': {requires: ['node','component/control']}
});
/*Generated By KISSY Module Compiler*/
config({
'color': {requires: ['attribute']}
});
/*Generated By KISSY Module Compiler*/
config({
'combobox': {requires: ['node','component/control','menu','attribute','io']}
});
/*Generated By KISSY Module Compiler*/
config({
'component/container': {requires: ['component/control','component/manager']}
});
/*Generated By KISSY Module Compiler*/
config({
'component/control': {requires: ['node','base','promise','component/manager','xtemplate/runtime']}
});
/*Generated By KISSY Module Compiler*/
config({
'component/extension/align': {requires: ['node']}
});
/*Generated By KISSY Module Compiler*/
config({
'component/extension/content-render': {requires: ['component/extension/content-xtpl']}
});
/*Generated By KISSY Module Compiler*/
config({
'component/extension/delegate-children': {requires: ['node','component/manager']}
});
/*Generated By KISSY Module Compiler*/
config({
'component/plugin/drag': {requires: ['dd']}
});
/*Generated By KISSY Module Compiler*/
config({
'component/plugin/resize': {requires: ['resizable']}
});
/*Generated By KISSY Module Compiler*/
config({
'date/format': {requires: ['date/gregorian','i18n!date']}
});
/*Generated By KISSY Module Compiler*/
config({
'date/gregorian': {requires: ['i18n!date']}
});
/*Generated By KISSY Module Compiler*/
config({
'date/picker': {requires: ['node','date/gregorian','i18n!date/picker','component/control','date/format']}
});
/*Generated By KISSY Module Compiler*/
config({
'date/popup-picker': {requires: ['date/picker/picker-xtpl','date/picker','component/extension/shim','component/extension/align']}
});
/*Generated By KISSY Module Compiler*/
config({
'dd': {requires: ['node','base']}
});
/*Generated By KISSY Module Compiler*/
config({
'dd/plugin/constrain': {requires: ['node','base']}
});
/*Generated By KISSY Module Compiler*/
config({
'dd/plugin/proxy': {requires: ['node','dd','base']}
});
/*Generated By KISSY Module Compiler*/
config({
'dd/plugin/scroll': {requires: ['node','dd','base']}
});
config({
    "dom/basic": {
        "alias": [
            'dom/base',
            Features.isIELessThan(9) ? 'dom/ie' : '',
            Features.isClassListSupported() ? '' : 'dom/class-list'
        ]
    },
    "dom": {
        "alias": [
            'dom/basic',
            !Features.isQuerySelectorSupported() ? 'dom/selector' : ''
        ]
    }
});/*Generated By KISSY Module Compiler*/
config({
'dom/class-list': {requires: ['dom/base']}
});
/*Generated By KISSY Module Compiler*/
config({
'dom/ie': {requires: ['dom/base']}
});
/*Generated By KISSY Module Compiler*/
config({
'dom/selector': {requires: ['dom/basic']}
});
/*Generated By KISSY Module Compiler*/
config({
'editor': {requires: ['node','html-parser','component/control']}
});
/*Generated By KISSY Module Compiler*/
config({
'event': {requires: ['event/dom','event/custom']}
});
/*Generated By KISSY Module Compiler*/
config({
'event/custom': {requires: ['event/base']}
});
config({
    "event/dom": {
        "alias": [
            "event/dom/base",
            Features.isTouchGestureSupported() ?
                'event/dom/touch' : '',
            Features.isDeviceMotionSupported() ?
                'event/dom/shake' : '',
            Features.isHashChangeSupported() ?
                '' : 'event/dom/hashchange',
            Features.isIELessThan(9) ?
                'event/dom/ie' : '',
            UA.ie ? '' : 'event/dom/focusin'
        ]
    }
});/*Generated By KISSY Module Compiler*/
config({
'event/dom/base': {requires: ['event/base','dom']}
});
/*Generated By KISSY Module Compiler*/
config({
'event/dom/focusin': {requires: ['event/dom/base']}
});
/*Generated By KISSY Module Compiler*/
config({
'event/dom/hashchange': {requires: ['event/dom/base','dom']}
});
/*Generated By KISSY Module Compiler*/
config({
'event/dom/ie': {requires: ['event/dom/base','dom']}
});
/*Generated By KISSY Module Compiler*/
config({
'event/dom/shake': {requires: ['event/dom/base']}
});
/*Generated By KISSY Module Compiler*/
config({
'event/dom/touch': {requires: ['event/dom/base','dom']}
});
/*Generated By KISSY Module Compiler*/
config({
'filter-menu': {requires: ['menu','component/extension/content-xtpl','component/extension/content-render']}
});
/*Generated By KISSY Module Compiler*/
config({
'io': {requires: ['dom','event/custom','promise','event/dom']}
});
/*Generated By KISSY Module Compiler*/
config({
'kison': {requires: ['base']}
});
/*Generated By KISSY Module Compiler*/
config({
'menu': {requires: ['node','component/container','component/extension/delegate-children','component/control','component/extension/content-render','component/extension/content-xtpl','component/extension/align','component/extension/shim']}
});
/*Generated By KISSY Module Compiler*/
config({
'menubutton': {requires: ['node','button','component/extension/content-xtpl','component/extension/content-render','menu']}
});
/*Generated By KISSY Module Compiler*/
config({
'mvc': {requires: ['io','json','attribute','node']}
});
/*Generated By KISSY Module Compiler*/
config({
'node': {requires: ['dom','event/dom','anim']}
});
/*Generated By KISSY Module Compiler*/
config({
'overlay': {requires: ['component/container','component/extension/shim','component/extension/align','node','component/extension/content-xtpl','component/extension/content-render']}
});
/*Generated By KISSY Module Compiler*/
config({
'resizable': {requires: ['node','base','dd']}
});
/*Generated By KISSY Module Compiler*/
config({
'resizable/plugin/proxy': {requires: ['node','base']}
});
config({
    "scroll-view": {
        alias: Features.isTouchGestureSupported() ? 'scroll-view/drag' : 'scroll-view/base'
    }
});/*Generated By KISSY Module Compiler*/
config({
'scroll-view/base': {requires: ['node','anim','component/container','component/extension/content-render']}
});
/*Generated By KISSY Module Compiler*/
config({
'scroll-view/drag': {requires: ['scroll-view/base','node','anim']}
});
/*Generated By KISSY Module Compiler*/
config({
'scroll-view/plugin/pull-to-refresh': {requires: ['base']}
});
/*Generated By KISSY Module Compiler*/
config({
'scroll-view/plugin/scrollbar': {requires: ['base','node','component/control']}
});
/*Generated By KISSY Module Compiler*/
config({
'separator': {requires: ['component/control']}
});
/*Generated By KISSY Module Compiler*/
config({
'split-button': {requires: ['component/container','button','menubutton']}
});
/*Generated By KISSY Module Compiler*/
config({
'stylesheet': {requires: ['dom']}
});
/*Generated By KISSY Module Compiler*/
config({
'swf': {requires: ['dom','json','attribute']}
});
/*Generated By KISSY Module Compiler*/
config({
'tabs': {requires: ['component/container','toolbar','button']}
});
/*Generated By KISSY Module Compiler*/
config({
'toolbar': {requires: ['component/container','component/extension/delegate-children','node']}
});
/*Generated By KISSY Module Compiler*/
config({
'tree': {requires: ['node','component/container','component/extension/content-xtpl','component/extension/content-render','component/extension/delegate-children']}
});
/*Generated By KISSY Module Compiler*/
config({
'xtemplate': {requires: ['xtemplate/runtime','xtemplate/compiler']}
});
/*Generated By KISSY Module Compiler*/
config({
'xtemplate/compiler': {requires: ['xtemplate/runtime']}
});
/*Generated By KISSY Module Compiler*/
config({
'xtemplate/nodejs': {requires: ['xtemplate']}
});
/*Generated By KISSY Module Compiler*/
config({
'xtemplate/runtime': {requires: ['path']}
});

                })(function(c){
                KISSY.config('modules', c);
                },KISSY.Features,KISSY.UA);
            