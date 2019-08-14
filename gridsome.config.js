const path = require('path');

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/styles/globals.less')
            ]
        });
}

module.exports = {
    siteName: 'Gridsome',
    transformers: {
        remark: {
            externalLinksTarget: '_blank',
            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
            anchorClassName: 'icon icon-link',
            plugins: [
                // ...global plugins
            ]
        }
    },
    plugins: [
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'products/**/*.md',
                typeName: 'Products',
                route: '/produto/:uid/:name'
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'categories/**/*.md',
                typeName: 'Categories',
                route: '/categoria/:name'
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'settings/**/*.md',
                typeName: 'Settings'
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'collections/**/*.md',
                typeName: 'Collections',
                route: '/colecoes/:name'
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'extras/**/*.md',
                typeName: 'Extras'
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                path: 'paper_types/**/*.md',
                typeName: 'PaperTypes'
            }
        },
        {
            use: `gridsome-plugin-netlify-cms`,
            options: {
                publicPath: `/admin`
            }
        }
    ],
    chainWebpack(config) {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

        types.forEach(type => {
            addStyleResource(config.module.rule('less').oneOf(type));
        });
    }
};
