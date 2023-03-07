## Overview

Uses file system as source of truth for application's routing. Follows common patterns and concept that are ubiquitous in most of todays web frameworks.

- Uses React Router Dom
- Matches `pages/**page.tsx`
- Render file's default export
- optional named export `config` w/ e.g. loaders & actions
- Code-split by route
- Supports statically typed routes (e.g. through `<Link />`)

## Basics

📂 **File structure**

```
pages/
··users/
····page.tsx
····@user/
······page.tsx
······friends/
········@page.tsx
········@friend.page.tsx
··users.@user.friends.@friend.remove.page.tsx
```

🔗 **Corresponding routes**

```
/
/users
/users/:user
/users/:user/friends
/users/:user/friends/:friend
/users/:user/friends/:friend/remove
```

👩‍💻 **Corresponding React Tree**

```
<Users>
  <User>
    <Friends>
      <Friend />
    <Friends>
  </User>
  <RemoveFriend>
</Users>
```

Note: It's the developer's responsibility to provide an `<Outlet />` for nested routes.

## In depth

Above example covers most typical use-cases; dynamic route segments, nested-routes, URL nesting without layout nesting and the React route component-tree.

🌟 **Splats**

created by "@" immdiately followed by page.tsx, omitting param-name. This follows remix just different "@" instead of "$" as a modifier

```
route:   pages/repo/branches/@page.tsx
path:    repo/branches/*
matches: repo/branches/feature/add-signup/fix-integration
```

Note: splats behave slightly different based on occurence of both splat and index.
With both index and splat:

```
pages/
··articles/
····page.tsx
····@page.tex

articles       <- index
articles/      <- index
articles/splat <- splat
```

With only splat all paths below are matched

```
pages/articles.@splat.page.tsx
articles | articles/ | articles/splat
```

any explicit routes that are shadowed by splat will take presedence

```
URL repo/branches/hotfix-45/delete

pages/repo/branches/@page.tsx
pages/repo/branches/@branch/delete.page.tsx <- Match
```

🤨 **Optional path segments**

prefix optional segment with "-" and it may be omitted from path. Works with both
dynamic and static segments

```
pages/documents/-@lang/@docID.page.tsx

Macthes both
documents/en/doc-12345
documents/doc-12345
```

👻 **Pathless layout groups**

Wrap a directory in parentheses to make it pathless layout group.
Meaning any routes it houses will be rendered through its own `<Outlet />`.

```
pages/
··settings/
····page.tsx
····(admin)/
······page.tsx <- houses outlet
······danger-zone.page.tsx
······manage-users.page.tsx

Admin routes are matched by "settings/danger-zone" or "settings/danger-zone" but not "settings" or "settings/"
```

🛠️ **route config, e.g. actions/loaders**

if a `**page.tsx` exports a named export "config" along with the route-component, this will map to react router's `RouteObject` interface. Here you may pass any actions/loaders. For proper typings, reasonable defaults, etc… the "config" export must be the result of a call to `~router/definePageConfig`

REWRITE

## Deviations from other frameworks

- **Dynamic prefix.** Uses `@` as a prefix for creating dynamic path segments. This follows [vite-plugin-srr](https://vite-plugin-ssr.com/) because it looks and reads nicer than the other popular alternatives like `$`, `[slug]` or `[...rest]`.

- **Page file suffix and index files.** Like [vite-plugin-srr](https://vite-plugin-ssr.com/), a file needs to be suffixed with `page.tsx` to be recognized as a route. This makes development more ergonomic as you can co-locate other `.tsx` files in the `pages` directory enabling close coupling if warranted or just avoiding premature optimization. `users.page.tsx` denotes a route, while just `users/page.tsx` denotes the index-route of the directory, This differns from other frameworks where you need a redundant `index` in your filename.

- **Pathless layout groups.** uses parens to denote a pathless group because it reads nicer than alternatives like remix' doube underscore, e.g. `__auth/`.

- **Satitc typings.** Next.js 13.2 static types for routes is based on string template types. Here, we opt for passing the whole route and then explicitly passing route params instead as this results in better autocompletion and far better DX. TODO: more on this/rewrite

## Roadmap

- Static routes w/ optional segments needs to generate two const-routes; one WITH and ine WITHOUT the optional segment, OR simpply allow arg which can explcitly be set to NULL
- Ensure named export config is the result of definePageConfig call

## Resources

- [Remix router docs](https://remix.run/docs/en/v1/guides/routing)
- [Generouted](https://github.com/oedotme/generouted#route-based-code-splitting-and-pre-loading)
- [SvelteKit optional route thread](https://github.com/sveltejs/kit/issues/554)
