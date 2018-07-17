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

    let titleScroll = null;
    let contentScroll = null;

    // 挂载
    river.mount = function(index) {
        if (!this.$root) {
            world.root.append(html);
            this.$root = world.root.find(root);

            this.render();
        }
    };

    river.render = function() {
        titleScroll = new IScroll(`${root} .tab .container`, {
            scrollX: true,
            scrollY: false
        });

        contentScroll = new IScroll(`${root} .content`, {
            scrollX: false,
            scrollY: true,
            scrollbars: true
        });

        this.tab.create(source.tab);
    };

    river.tab = {
        currentIndex: 0,
        create(items) {
            const oTtile = $(`${root} .tab ul`);
            const oContent = $(`${root} .content .container`);
            const baseUrl = './assets/img/main';

            for (const [key, item] of items) {
                const title = $(`<li>${item.title.name}</li>`);
                oTtile.append(title);

                const content = $('<ul></ul>');
                for (let i = 0; i < 8; i++) {
                    for (const index in item.items) {
                        content.append(`<li><img data-key="${key}" data-index="${index}" src="${baseUrl}/${item.items[index].src}"></li>`);
                    }

                    if (item.items.length > 3) { i = 10; }
                }
                oContent.append(content);
            }

            this.bindEvents();
            this.setActive(0, true);

            setTimeout(() => titleScroll.refresh(), 500);
            setTimeout(() => contentScroll.refresh(), 500);
        },

        // 绑定事件
        bindEvents() {
            // 内容块开关
            const h = $(`${root} .content`).height();
            $(`${root} .tab .switch`).hammer().on('tap', () => {
                if ($(`${root} .content`).height() > 0) {
                    $(`${root} .content`).animate({ 'height': 0 });
                    $(`${root} .tab .switch .icon`).addClass('close');
                } else {
                    $(`${root} .content`).animate({ 'height': `${h}px` });
                    $(`${root} .tab .switch .icon`).removeClass('close');
                }
            });

            // tab切换
            const oTtile = $(`${root} .tab li`);

            oTtile.each((index, title) => {
                $(title).hammer().on('tap', () => this.setActive(index));
            });
        },

        // 设置活动块
        setActive(index) {
            if (this.currentIndex === index && !arguments[1]) { return; }

            const oTitles = $(`${root} .tab li`);
            const oContent = $(`${root} .content .container ul`);

            oTitles.eq(this.currentIndex).removeClass('active');
            oTitles.eq(index).addClass('active');

            oContent.eq(this.currentIndex).hide();
            oContent.eq(index).show();

            this.currentIndex = index;
            setTimeout(() => {
                contentScroll.refresh();
                contentScroll.scrollTo(0, 0);
            }, 0);
        }
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
