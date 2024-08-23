```mermaid
%%{init: {'theme': 'forest'}}%%
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> <a href='http://google.com'>B</a>;
  B ---->|No| E[Yay!];
```
