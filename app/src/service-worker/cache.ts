import { startsWith } from 'lodash';

export const CACHE_NAME = 'root';

declare let self: ServiceWorkerGlobalScope;

const _getCache = () => caches.open(CACHE_NAME);

const _getFromCache = (request: Request): Promise<Response> =>
    _getCache().then((cache) =>
        cache.match(request)
    );

const _update = async (request: Request) => {

    const cache = await _getCache();
    const response = await fetch(request);

    await cache.put(request, response.clone());

    return response;

};

const _refresh = async (response: Response): Promise<Response> => {

    (await self.clients.matchAll()).forEach((client: Client) =>
        client.postMessage(JSON.stringify({
            type: 'refresh',
            url: response.url,
            eTag: response.headers.get('ETag')
        }))
    );

    return response;

};

self.addEventListener('install', (event: ExtendableEvent) => {

    event.waitUntil((async () => {

        // this 'cache.json' is generated in webpack compilation
        const result = await fetch('/cache.json');
        if (result.ok) {

            const json = await result.json() as { [key: string]: string };
            const cachedValues = Object.keys(json).map((key) => {

                const value = json[key];
                if (startsWith(value, './')) {
                    return value.substring(2);
                } else {
                    return value;
                }

            });

            const cache = await _getCache();
            await cache.addAll(cachedValues);

        }

    })());

});

self.addEventListener('fetch', (event: FetchEvent) => {

    const {request: {method, url}} = event;

    // we only want requests for our host
    if (method !== 'GET' || !url.includes(location.hostname)) {
        return;
    }

    event.respondWith(_getFromCache(event.request).then((content) => {
        if (content) {
            return _update(event.request).then((response) => _refresh(response));
        } else {
            return fetch(event.request);
        }
    }));

});
