```mermaid
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```

[comment]: <> (```mermaid)

[comment]: <> (%%{init: {'theme': 'forest'}}%%)

[comment]: <> (graph LR)

[comment]: <> (  A[Start] --> B{Error?};)

[comment]: <> (  B -->|Yes| C[Hmm...];)

[comment]: <> (  C --> D[Debug];)

[comment]: <> (  D --> B;)

[comment]: <> (  B ---->|No| E[Yay!];)

[comment]: <> (```)





