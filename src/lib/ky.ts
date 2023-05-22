import ky from 'ky';

const $api = ky.create({ prefixUrl: 'https://run.mocky.io/v3' });

export default $api;
