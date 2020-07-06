declare namespace NavScssNamespace {
  export interface INavScss {
    "common-button": string;
    "main-area": string;
    "nav-button": string;
    "nav-wrapper": string;
    "organization-button": string;
    "out-area": string;
    selected: string;
    "sub-area": string;
    "sub-button": string;
  }
}

declare const NavScssModule: NavScssNamespace.INavScss;

export = NavScssModule;
