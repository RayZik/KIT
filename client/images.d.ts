declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare namespace JSX {
  interface IntrinsicElements {
    [x: string]: any
  }
}