# Physical Diagram


```plantuml format="png"
@startuml PhysicalDiagram

!include ./images/snyk.puml
!include <kubernetes/k8s-sprites-unlabeled-25pct>
!theme carbon-gray

participant "<img:images/snyk.puml{scale=0.5}>" as snyk
snyk -> A : Hello

skinparam DefaultTextAlignment center
skinparam rectangle {
    FontSize 14
    Style normal
}


Gloo as gloo
Waf as waf
@enduml
```
