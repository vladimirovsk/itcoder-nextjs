'use client';

import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import React, { useState } from 'react';

export default function EmotionCacheProvider({ children }: { children: React.ReactNode }) {
    const [{ cache, flush }] = useState(() => {
        const cache = createCache({ key: 'css' });
        cache.compat = true;
        const prevInsert = cache.insert.bind(cache);
        let inserted: { name: string; isGlobal: boolean }[] = [];

        cache.insert = (...args) => {
            const [selector, serialized, sheet, shouldCache] = args;
            const isGlobal = !selector;
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push({ name: serialized.name, isGlobal });
            }
            return prevInsert(selector, serialized, sheet, shouldCache);
        };

        const flush = () => {
            const prev = inserted;
            inserted = [];
            return prev;
        };

        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const inserted = flush();
        if (inserted.length === 0) return null;

        let styles = '';
        let dataEmotion = cache.key;

        for (const { name, isGlobal } of inserted) {
            const style = cache.inserted[name];
            if (typeof style === 'string') {
                if (isGlobal) {
                    styles += style;
                } else {
                    styles += style;
                    dataEmotion += ` ${name}`;
                }
            }
        }

        return (
            <style
                key={cache.key}
                data-emotion={dataEmotion}
                dangerouslySetInnerHTML={{ __html: styles }}
            />
        );
    });

    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
