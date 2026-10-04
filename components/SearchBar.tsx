"use client";
import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

const categories = [
	{ slug: "all", label: "All Categories" },
	{ slug: "food_dining", label: "Food & Dining" },
	{ slug: "travel_tours", label: "Travel & Tours" },
	{ slug: "shopping_retail", label: "Shopping & Retail" },
	{ slug: "nightlife", label: "Nightlife" },
];

export default function SearchBar({ onSearch }: { onSearch?: (query: string, category: string) => void }) {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("all");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSearch = (e?: FormEvent<HTMLFormElement>) => {
		if (e) e.preventDefault();
		if (onSearch) {
			onSearch(query, category);
			return;
		}

		const trimmedQuery = query.trim();
		if (!trimmedQuery) {
			const categoryPath = category === "all" ? "/categories" : `/categories/${category}`;
			router.push(categoryPath);
			return;
		}

		const params = new URLSearchParams({ q: trimmedQuery });
		if (category !== "all") {
			params.set("category", category);
		}

		router.push(`/search?${params.toString()}`);
	};

	const handleClear = () => {
		setQuery("");
		inputRef.current?.focus();
	};

	return (
		<form
			onSubmit={handleSearch}
			className="flex w-full max-w-xl items-center gap-2 rounded-lg bg-white/90 px-3 py-2 shadow-md backdrop-blur"
			role="search"
			aria-label="Search businesses"
		>
			<select
				className="rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-700 focus:border-blue-500 focus:outline-none"
				value={category}
				onChange={e => setCategory(e.target.value)}
				aria-label="Category"
			>
				{categories.map(cat => (
					<option key={cat.slug} value={cat.slug}>
						{cat.label}
					</option>
				))}
			</select>
			<input
				ref={inputRef}
				type="text"
				className="flex-1 border-none bg-transparent px-2 py-1 text-slate-900 placeholder-slate-400 focus:outline-none"
				placeholder="Search for businesses, services, etc."
				value={query}
				onChange={e => setQuery(e.target.value)}
				aria-label="Search query"
			/>
			{query && (
				<button
					type="button"
					onClick={handleClear}
					className="rounded px-2 py-1 text-slate-400 hover:text-blue-600 focus:outline-none"
					aria-label="Clear search"
				>
					×
				</button>
			)}
			<button
				type="submit"
				className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none"
				aria-label="Search"
			>
				Search
			</button>
		</form>
	);
}



































