import { useEffect, useState } from 'react';

function preload(type: 'image' | 'audio', src: string) {
    return new Promise((resolve, reject) => {
        const object = type === 'image' ? new Image() : new Audio();
        object.onload = function () {
            resolve(object);
        };
        object.onerror = object.onabort = function () {
            reject(src);
        };
        object.src = src;
    });
}

export default function useMediaPreloader(imageList: string[], audioList: string[]) {
    const [preloaded, setPreloaded] = useState<boolean>(false);
    useEffect(() => {
        let isCancelled = false;
        async function effect() {
            if (isCancelled) {
                return;
            }
            const imagesPromiseList: Promise<unknown>[] = [];
            for (const i of imageList) {
                imagesPromiseList.push(preload('image', i));
            }
            const audioPromiseList: Promise<unknown>[] = [];
            for (const i of audioList) {
                audioPromiseList.push(preload('audio', i));
            }
            await Promise.all(imagesPromiseList.concat(audioPromiseList));
            if (isCancelled) {
                return;
            }
            setPreloaded(true);
        }
        effect();
        return () => {
            isCancelled = true;
        };
    }, [imageList]);
    return preloaded;
}
