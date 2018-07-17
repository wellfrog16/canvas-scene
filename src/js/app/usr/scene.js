// 剧本

define([
    'text!../components/usr/scene.html!strip',
    'pixi',
    'source',
    'jquery',
    'jquery.hammer',
    'helper/rivers',
    'utils/sword'],
(html, PIXI, source) => {
    const world = myWorld;
    const river = {};

    const root = '.usr-scene';
    const baseUrl = './assets/img/main';

    let bg = null;
    let app = null;

    // 挂载
    river.mount = function(index) {
        if (!this.$root) {
            world.root.append(html);
            this.$root = world.root.find(root);

            this.render();
            this.bind();
        }
    };

    river.render = function() {
        // const canvas = this.$root.find('canvas');
        // // canvas.css({ 'width': $('body').width(), 'height': $('body').height() });
        // canvas.attr('width', $('body').width());
        // canvas.attr('height', $('body').height());

        app = new PIXI.Application($('body').width(), $('body').height(), {transparent: true});
        this.$root.get(0).appendChild(app.view);

        this.setDefault();
    };

    river.setDefault = function() {
        // create a new Sprite from an image path
        bg = new PIXI.Sprite(PIXI.Texture.fromImage('assets/img/main/item/1/01.jpg'));

        // center the sprite's anchor point
        bg.anchor.set(0.5);

        // move the sprite to the center of the screen
        bg.x = app.screen.width / 2;
        bg.y = app.screen.height / 2;
        bg.width = $('body').width();
        bg.height = 1334 / 750 * $('body').width();

        app.stage.addChild(bg);

        bg.interactive = true;
        bg.buttonMode = true;
    };

    river.bind = function() {
        const items = $('.usr-tab .content .container li img');
        for (const item of items) {
            $(item).hammer().on('tap', () => {
                const key = $(item).attr('data-key');
                const index = $(item).attr('data-index');
                const obj = source.tab.get(key).items[index];

                if (key === 'bg') {
                    bg.texture = PIXI.Texture.fromImage(`${baseUrl}/${obj.src}`);
                }
            });
        }
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
