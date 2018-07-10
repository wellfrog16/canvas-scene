// 剧本

define([
    'text!../components/usr/tab.html!strip',
    'iscroll',
    'jquery',
    'jquery.hammer',
    'helper/rivers',
    'utils/sword'],
(html, IScroll) => {
    const world = myWorld;
    const river = {};

    const root = '.usr-tab';

    // 挂载
    river.mount = function(index) {
        if (!this.$root) {
            world.root.append(html);
            this.$root = world.root.find(root);

            this.render();
        }
    };

    river.render = function() {
        new IScroll(`${root} .tab .container`, {
            scrollX: true,
            scrollY: false
        });
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

    world.rivers.$tab = river;
    return river;
});
