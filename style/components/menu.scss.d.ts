declare namespace MenuScssNamespace {
  export interface IMenuScss {
    "action-button": string;
    "action-raw": string;
    "clickable-span": string;
    "clickable-span-red": string;
    "go-back": string;
    "menu-description": string;
    "menu-extra": string;
    "menu-grid": string;
    "menu-item": string;
    "named-title": string;
    "named-title-about": string;
    "named-title-name": string;
  }
}

declare const MenuScssModule: MenuScssNamespace.IMenuScss;

export = MenuScssModule;
