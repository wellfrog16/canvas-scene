const resources = {};

resources.preload = [
    { 'src': 'common/block/landscape.png' }
];

resources.mainload = [
    { 'src': 'common/block/landscape.png' }
];

// 场景1
for (let i = 1; i <= 8; i++) {
    let zero = '';
    for (let j = 0; j < 2 - i.toString().length; j++) {
        zero += '0';
    }

    resources.mainload.push({ 'src': `main/item/1/${zero + i}.jpg` });
}

// 场景2
for (let i = 1; i <= 10; i++) {
    let zero = '';
    for (let j = 0; j < 2 - i.toString().length; j++) {
        zero += '0';
    }

    resources.mainload.push({ 'src': `main/item/2/${zero + i}.png` });
}

resources.tab = new Map();

resources.tab.set('bg', {
    title: { name: '一', icon: '' },
    items: [
        { src: 'item/1/01.jpg' },
        { src: 'item/1/02.jpg' },
        { src: 'item/1/03.jpg' },
        { src: 'item/1/04.jpg' },
        { src: 'item/1/05.jpg' },
        { src: 'item/1/06.jpg' },
        { src: 'item/1/07.jpg' },
        { src: 'item/1/08.jpg' }
    ]
});

resources.tab.set('item01', {
    title: { name: '二', icon: '' },
    items: [
        { src: 'item/2/02.png' },
        { src: 'item/2/03.png' }
    ]
});

resources.tab.set('item02', {
    title: { name: '三', icon: '' },
    items: [
        { src: 'item/2/03.png' },
        { src: 'item/2/04.png' }
    ]
});

resources.tab.set('item03', {
    title: { name: '四', icon: '' },
    items: [
        { src: 'item/2/04.png' },
        { src: 'item/2/05.png' }
    ]
});

resources.tab.set('item04', {
    title: { name: '五', icon: '' },
    items: [
        { src: 'item/2/05.png' },
        { src: 'item/2/06.png' }
    ]
});

resources.tab.set('item05', {
    title: { name: '六', icon: '' },
    items: [
        { src: 'item/2/06.png' },
        { src: 'item/2/07.png' }
    ]
});

resources.tab.set('item06', {
    title: { name: '七', icon: '' },
    items: [
        { src: 'item/2/07.png' },
        { src: 'item/2/08.png' }
    ]
});

resources.tab.set('item07', {
    title: { name: '八', icon: '' },
    items: [
        { src: 'item/2/08.png' },
        { src: 'item/2/09.png' }
    ]
});

resources.tab.set('item08', {
    title: { name: '九', icon: '' },
    items: [
        { src: 'item/2/09.png' },
        { src: 'item/2/10.png' }
    ]
});

resources.tab.set('item09', {
    title: { name: '十', icon: '' },
    items: [
        { src: 'item/2/10.png' },
        { src: 'item/2/01.png' }
    ]
});

define(resources);
