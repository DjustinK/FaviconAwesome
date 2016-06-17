(function() {
    var FaviconAwesome = function(icon, color, bg) {
        'use strict';

        create(icon, color, bg, 'link', 'image/x-icon', 'shortcut icon', 32, 32, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 57, 57, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 60, 60, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 72, 72, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 76, 76, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 114, 114, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 120, 120, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 144, 144, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 152, 152, null, null);
        create(icon, color, bg, 'link', null, 'apple-touch-icon', 180, 180, null, null);

        create(icon, color, bg, 'link', 'image/png', 'icon', 16, 16, true, null);
        create(icon, color, bg, 'link', 'image/png', 'icon', 32, 32, true, null);
        create(icon, color, bg, 'link', 'image/png', 'icon', 96, 96, true, null);
        create(icon, color, bg, 'link', 'image/png', 'icon', 192, 192, true, null);

        create(icon, color, bg, 'meta', null, null, 70, 70, true, 'msapplication-square70x70logo');
        create(icon, color, bg, 'meta', null, null, 150, 150, true, 'msapplication-square150x150logo');
        create(icon, color, bg, 'meta', null, null, 310, 150, true, 'msapplication-square310x150logo');
        create(icon, color, bg, 'meta', null, null, 310, 310, true, 'msapplication-square310x310logo');

        function create(icon, color, bg, category, type, rel, width, height, useSizes, name){
            var
                container = document.createElement('div'),
                span = document.createElement('span'),
                body = document.body,
                content,
                canvas = document.createElement('canvas'),
                getContext = function(w, h) {
                    canvas.width = w;
                    canvas.height = h;
                    context = canvas.getContext('2d');
                    context.font = 'normal normal normal ' + h + 'px/' + w + 'px FontAwesome';
                    context.textBaseline = 'middle';
                    return context;
                },
                context = getContext(width, height),
                iconWidth,
                link = document.createElement('link'),
                meta = document.createElement('meta');
            if(!window.getComputedStyle || !canvas.toDataURL || !document.querySelectorAll)
                return;
            container.style.display = 'none';
            span.className = 'fa fa-' + icon.replace(/^fa-/, '');
            container.appendChild(span);
            body.appendChild(container);
            content = window.getComputedStyle(span, ':before').getPropertyValue('content').replace(/'/g, '').replace('"', '').replace('"', '');
            body.removeChild(container);
            iconWidth = context.measureText(content).width;
            if(iconWidth > canvas.width)
                context = getContext(iconWidth);
            if(bg) {
                context.rect(0, 0, canvas.width, canvas.height);
                context.fillStyle = bg;
                context.fill();
            }
            context.fillStyle = color;
            context.fillText(content, (canvas.width - iconWidth) / 2, canvas.height / 2);

            for(var icons = document.querySelectorAll('link[rel*=icon]'), i = 0, l = icons.length; i < l; i++)
                icons[i].parentNode.removeChild(icons[i]);

            if(category === 'link'){
                link.setAttribute('rel', rel);
                link.setAttribute('href', canvas.toDataURL('image/png'));
                if(useSizes === true){
                    link.setAttribute('sizes', width+'x'+height);
                }
                link.setAttribute('type', type);
                document.getElementsByTagName('head')[0].appendChild(link);
            }else if(category === 'meta'){
                if(name !== undefined && name !== null){
                    meta.setAttribute('name', name);
                }
                meta.setAttribute('content', canvas.toDataURL('image/png'));
                document.getElementsByTagName('head')[0].appendChild(meta);
            }
            return;
        }
    };
    this.FaviconAwesome = FaviconAwesome;
})();
