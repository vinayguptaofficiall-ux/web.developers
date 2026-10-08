import React, { useEffect, useState, useMemo } from 'react';
import menuImages from '../data/menu-images.json';

type MenuImagesMap = Record<string, Record<string, string>>;
const MAP = menuImages as MenuImagesMap;

interface RawItem {
  name: string;
  category: string;
  price?: number | null;
  image?: string | null;
}
interface Restaurant { slug: string; items: RawItem[]; }
interface AllMenus { restaurants: Restaurant[]; }

type FilterStatus = 'all' | 'ready' | 'missing';

export const MenuImagesAdminPage: React.FC = () => {
  const [data, setData] = useState<AllMenus | null>(null);
  const [filterSlug, setFilterSlug] = useState('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/data/menus/all-menus.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const rows = useMemo(() => {
    if (!data) return [];
    return data.restaurants.flatMap(r =>
      r.items.map(item => ({
        slug: r.slug,
        name: item.name,
        category: item.category,
        mappedPath: MAP[r.slug]?.[item.name] ?? null,
        status: MAP[r.slug]?.[item.name] ? 'READY' : 'MISSING',
      }))
    );
  }, [data]);

  const filtered = useMemo(() => {
    return rows.filter(row => {
      if (filterSlug !== 'all' && row.slug !== filterSlug) return false;
      if (filterStatus !== 'all' && row.status.toLowerCase() !== filterStatus) return false;
      if (search.trim() && !row.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [rows, filterSlug, filterStatus, search]);

  const readyCount = rows.filter(r => r.status === 'READY').length;
  const missingCount = rows.filter(r => r.status === 'MISSING').length;

  const slugLabel: Record<string, string> = {
    'a3-kitchen': 'A3 Kitchen',
    'froth-and-friends': 'Froth & Friends',
    'arise-cafe': 'Arise Café',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Admin
            </span>
            <h1 className="text-2xl font-black text-white">Menu Image Audit</h1>
          </div>
          <p className="text-sm text-slate-400">
            Manage image assignments in <code className="text-amber-400 text-xs">src/data/menu-images.json</code>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <p className="text-2xl font-black text-white">{rows.length}</p>
            <p className="text-xs text-slate-400 mt-0.5">Total Items</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-center">
            <p className="text-2xl font-black text-emerald-400">{readyCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Ready</p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 text-center">
            <p className="text-2xl font-black text-rose-400">{missingCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Missing</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={filterSlug}
            onChange={e => setFilterSlug(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none"
          >
            <option value="all">All Restaurants</option>
            <option value="a3-kitchen">A3 Kitchen</option>
            <option value="froth-and-friends">Froth & Friends</option>
            <option value="arise-cafe">Arise Café</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as FilterStatus)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="ready">Ready</option>
            <option value="missing">Missing</option>
          </select>

          <input
            type="text"
            placeholder="Search item name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none"
          />

          <span className="px-3 py-2 text-xs text-slate-400 self-center">
            {filtered.length} items
          </span>
        </div>

        {/* Table */}
        {!data ? (
          <p className="text-slate-500 text-sm">Loading…</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3">Restaurant</th>
                  <th className="px-4 py-3">Item Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Path</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={i} className="border-t border-slate-800/60 hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-300 whitespace-nowrap">
                      {slugLabel[row.slug] ?? row.slug}
                    </td>
                    <td className="px-4 py-3 font-semibold text-white max-w-[220px]">
                      <span className="line-clamp-2 leading-snug">{row.name}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="px-4 py-3">
                      {row.mappedPath ? (
                        <img
                          src={row.mappedPath}
                          alt={row.name}
                          className="w-14 h-10 object-cover rounded-lg border border-slate-700"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-14 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                          <span className="text-[9px] text-slate-600 font-bold">NO IMG</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono max-w-[200px]">
                      <span className="truncate block">{row.mappedPath ?? '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        row.status === 'READY'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Instructions */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs text-slate-400">
          <p className="font-bold text-white text-sm">How to add an image</p>
          <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
            <li>Place the image file in <code className="text-amber-400">public/images/restaurants/{'<slug>'}/'</code></li>
            <li>Open <code className="text-amber-400">src/data/menu-images.json</code></li>
            <li>Add an entry: <code className="text-amber-400">"Exact Item Name": "/images/restaurants/{'<slug>'}/filename.webp"</code></li>
            <li>The status will change to <span className="text-emerald-400 font-bold">READY</span> on next build/reload.</li>
          </ol>
          <p className="text-slate-500">Use WebP or AVIF for best performance. Recommended size: 800×600px.</p>
        </div>

      </div>
    </div>
  );
};
