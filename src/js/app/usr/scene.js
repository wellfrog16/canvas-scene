// 剧本

define([
    'text!../components/usr/scene.html!strip',
    'iscroll',
    'source',
    'jquery',
    'jquery.hammer',
    'helper/rivers',
    'utils/sword'],
(html, IScroll, source) => {
    const world = myWorld;
    const river = {};

    const root = '.usr-scene';

    // 挂载
    river.mount = function(index) {
        if (!this.$root) {
            world.root.append(html);
            this.$root = world.root.find(root);

            this.render();
        }
    };

    river.render = function() {
        const canvas = this.$root.find('canvas');
        // canvas.css({ 'width': $('body').width(), 'height': $('body').height() });
        canvas.attr('width', $('body').width());
        canvas.attr('height', $('body').height());
    };

    river.bind = function() {
        console.log('showBind');
    };

    river.show = () => {
        river.$root.show();
    };

    river.hide = () => {
        river.$root.hide();
    };

    // 销毁
    river.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    world.rivers.$scene = river;
    return river;
});
