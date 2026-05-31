// Type declarations for CSS imports (NativeWind global.css + CSS modules).
// Metro/Babel handle these at build time; this just satisfies the TS checker.
declare module '*.css';

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
