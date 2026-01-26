'use client';

import { useEffect, useRef, useState } from 'react';

type PokemonListItem = { name: string; url: string };

async function fetchPokemonList(
  offset: number,
  limit: number
): Promise<{
  results: PokemonListItem[];
  next: string | null;
  hasMore: boolean;
}> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return {
    results: data.results,
    next: data.next,
    hasMore: Boolean(data.next),
    //previous: data.previous,
  };
}

export function InfinityScrollDemo() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const LIMIT = 20;
  const MAX = 60;

  const seenPokemon = useRef(new Set<number>());

  // 데이터 패칭
  useEffect(() => {
    if (seenPokemon.current.has(offset)) return;
    seenPokemon.current.add(offset);

    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetchPokemonList(offset, LIMIT);
        setPokemons((prev) => [...prev, ...res.results]);
        setHasMore(res.hasMore);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [offset]);

  // 무한스크롤 옵저버
  useEffect(() => {
    if (pokemons.length >= MAX) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
      if (isLoading || !hasMore) return;

      setOffset((prev) => prev + LIMIT);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [isLoading, hasMore]);

  return (
    <div>
      <section className="section-component space-y-2">
        <h6 className="text-md font-semibold">렌더링 화면</h6>
        <ul>
          {pokemons.map((p: { name: string }) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
            </li>
          ))}
          {isLoading && <li>Loading...</li>}
        </ul>
        <div ref={sentinelRef} style={{ height: '1px' }}></div>
      </section>
    </div>
  );
}
