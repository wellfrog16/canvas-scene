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
    // let sort = 1;

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

        const w = $('body').width();
        const h = world.sword.isIphoneX ? '667' : $('body').height();

        app = new PIXI.Application(w, h, {transparent: true});
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

                if (key === 'item01') {
                    createItem(obj);
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

    function createItem(obj) {
        const container = new PIXI.Container();
        // container.zOrder = +sort;

        app.stage.addChild(container);
        // 写入元素
        let item = new PIXI.Sprite(PIXI.Texture.fromImage(`${baseUrl}/${obj.src}`));
        item.anchor.set(0.5);
        item.x = app.screen.width / 2;
        item.y = app.screen.height / 2;
        item.width = 100;
        item.height = 100;
        item.interactive = true;
        item.buttonMode = true;

        //
        // graphics.clear();
        let graphics = new PIXI.Graphics();
        container.addChild(graphics);
        graphics.lineStyle(2, 0xffff00, 1.0);
        graphics.drawShape(item.getBounds());

        //
        item
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

        container.addChild(item);

        function onDragStart(event) {
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
            // container.zOrder = +sort;
        }

        function onDragEnd() {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
        }

        function onDragMove() {
            if (this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.x = newPosition.x;
                this.y = newPosition.y;
                graphics.clear();
                graphics.lineStyle(2, 0xffff00, 1.0);
                graphics.drawShape(this.getBounds());
            }
        }
    }
});
