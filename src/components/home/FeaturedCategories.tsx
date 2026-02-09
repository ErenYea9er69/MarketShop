"use client"

export function FeaturedCategories() {
    return (
        <section className="py-8 border-y border-[#262626] bg-[#0a0a0a]/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-3 md:gap-6">
                    {['Netflix', 'Spotify', 'PlayStation', 'Xbox', 'Steam', 'Free Fire', 'Roblox'].map((brand, i) => (
                        <div key={i} className="px-5 py-2 rounded-full border border-white/5 bg-white/5 text-[#71717a] hover:text-[#fafafa] hover:border-white/20 transition-all cursor-pointer text-xs font-medium uppercase tracking-wide">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
