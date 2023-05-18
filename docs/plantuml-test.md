Test plantuml

```plantuml format="png"
@startuml PhysicalDiagram

!include images/snyk.puml
!include <kubernetes/k8s-sprites-unlabeled-25pct>
!theme carbon-gray

skinparam DefaultTextAlignment center
skinparam rectangle {
    FontSize 14
    Style normal
}


Gloo as gloo
Waf as waf
@enduml
```