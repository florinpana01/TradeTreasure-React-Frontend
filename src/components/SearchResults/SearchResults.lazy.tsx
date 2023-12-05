import React, { lazy, Suspense } from 'react';

const LazySearchResults = lazy(() => import('./SearchResults'));

const SearchResults = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySearchResults {...props} />
  </Suspense>
);

export default SearchResults;
