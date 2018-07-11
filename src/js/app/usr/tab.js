// 剧本

define([
    'text!../components/usr/tab.html!strip',
    'iscroll',
    'source',
    'jquery',
    'jquery.hammer',
    'helper/rivers',
    'utils/sword'],
(html, IScroll, source) => {
    const world = myWorld;
    const river = {};

    const root = '.usr-tab';
    let myScroll = null;

    // 挂载
    river.mount = function(index) {
        if (!this.$root) {
            world.root.append(html);
            this.$root = world.root.find(root);

            this.render();
        }
    };

    river.render = function() {
        setTimeout(() => {
            console.log('刷新');
            myScroll = new IScroll(`${root} .tab .container`, {
                scrollX: true,
                scrollY: false
            });
        }, 2000);

        // this.tab(source.tab);
    };

    river.tab = function(items) {
        const oTtile = this.$root.find('.tab ul');

        for (const item of items) {
            const title = $(`<li>${item.title.name}</li>`);
            oTtile.append(title);
        }

        setTimeout(() => {
            myScroll.refresh();
            console.log('刷新');
        }, 1500);
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
