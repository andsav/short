Router.map(function() {
    this.route('images', {
        path: '/',
        layoutTemplate: 'layout'
    });

    this.route('stat', {
        path: '/stat',
        layoutTemplate: 'layout'
    });

    this.route('upload', {
        path: '/upload',
        layoutTemplate: 'layout'
    });

    this.route('dev', {
        path: '/dev',
        layoutTemplate: 'layout'
    });

    this.route('vote', {
        path: '/vote'
    });
});