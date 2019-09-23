const UrlFilter = {
    methods: {
        url(value) {
            return value
                .normalize('NFD')
                .replace(/[\u0300-\u036f.]/g, '')
                .split('-')
                .map(item => item.trim().replace(/[ ]/g, '-'))
                .join('-')
                .toLowerCase();
        }
    }
};

export default UrlFilter;
