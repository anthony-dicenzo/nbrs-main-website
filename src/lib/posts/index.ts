import { meta as zoningReview, content as zoningReviewContent } from './multiplex-zoning-review';
import { meta as treesVsHousing, content as treesVsHousingContent } from './trees-vs-housing';
import { meta as suburbanMultiplex, content as suburbanMultiplexContent } from './suburban-multiplex';
import { meta as torontoHydro, content as torontoHydroContent } from './toronto-hydro-multiplex';
import { meta as christmasWishlist, content as christmasWishlistContent } from './multiplex-christmas-wishlist';

export interface PostMeta {
	slug: string;
	title: string;
	date: string;
	description: string;
}

export interface Post extends PostMeta {
	content: string;
}

const allPosts: Post[] = [
	{ ...zoningReview, content: zoningReviewContent },
	{ ...treesVsHousing, content: treesVsHousingContent },
	{ ...suburbanMultiplex, content: suburbanMultiplexContent },
	{ ...torontoHydro, content: torontoHydroContent },
	{ ...christmasWishlist, content: christmasWishlistContent }
];

// Sort by date descending (newest first)
export const posts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPost(slug: string): Post | undefined {
	return posts.find(p => p.slug === slug);
}
