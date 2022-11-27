import { useEffect, useRef, useState } from 'react';

export function useAudioPlayer() {
    const audioEl = useRef(new Audio());
    const playQueue = useRef<string[]>([]);
    const [playing, setPlaying] = useState(false);
    const onPlayStart = () => {
        if (!playing) {
            setPlaying(true);
        }
    };
    const onPlayEnd = () => {
        if (playQueue.current.length > 0) {
            const el = playQueue.current.pop();
            if (!el) return;
            audioEl.current.src = el;
            audioEl.current.play();
        } else {
            setPlaying(false);
        }
    };
    useEffect(() => {
        audioEl.current.addEventListener('playing', onPlayStart);
        audioEl.current.addEventListener('ended', onPlayEnd);
    }, []);
    return (src: string, override: boolean) => {
        setPlaying((prev) => {
            if (prev && !override) {
                playQueue.current.push(src);
                return prev;
            } else {
                audioEl.current.currentTime = 0;
                audioEl.current.src = src;
                audioEl.current.play();
                return true;
            }
        });
    };
}
