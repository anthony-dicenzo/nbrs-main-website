// Enable prerendering for static site generation
export const prerender = true;

// Provide pathname for page transition keying
export const load = ({ url }) => {
	return { pathname: url.pathname };
};
