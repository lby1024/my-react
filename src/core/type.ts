export type Ojb = { [key: string]: any }

export type HTMLTagName = keyof HTMLElementTagNameMap;

export type VDomType = 'TEXT_ELEMENT' | HTMLTagName | Function;

export type Hook = {
  state: any,
  ququ: Function[]
}

export type EffectHook = {
  callback: Function,
  deps: any[],
  beforeCallback?: Function
}
