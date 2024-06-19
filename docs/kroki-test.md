# Kroki test

Anyone who has spent more than a month working in a decently sized software engineering department
can tell you the pain of finding documentation. Everyone wishes that great docs for internal
services were the norm but few people are willing to spend the time it takes to make fantastic
docs a reality.

# Pub Quiz Brain

The Quiz Brain is suite of APIs is designed to assist users in excelling at pub quizzes by providing various services including collective noun identification, famous person recognition, numerical guessing, anagram solving, riddle deduction, and educated guessing. Each API offers a unique functionality aimed at enhancing the quiz experience and improving the chances of winning.

It is comprised of a number of different services each of which can be used to gain an advantage in a pub, charity or family quiz.

kroki-excalidraw
```kroki-excalidraw
@from_file:assets/diagram.excalidraw
```

kroki-plantuml
```kroki-plantuml
@from-file:assets/diagram.plantuml
```

kroki-blockdiag
```kroki-blockdiag
@from-file:assets/blocdiag
```

kroki-bpmn
```kroki-bpmn
@from_file:assets/diagram.bpmn
```

kroki-plantuml inline
```kroki-plantuml
participant John
participant Paul
```

kroki-mermaid inline
```kroki-mermaid
sequenceDiagram
GitLab->>Kroki: Request rendering
Kroki->>Mermaid: Request rendering
Mermaid-->>Kroki: Image
Kroki-->>GitLab: Image
```
