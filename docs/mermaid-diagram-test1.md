```mermaid
%%{init: {'themeVariables': { 'lineColor': '#55aacc', 'mainBkg': '#ff4200', 'background': '#333333' }}}%%
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```
