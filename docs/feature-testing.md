# This doc is for testing styling problems

Here is a markdown table:

| Hello       | there     | Tilte  |   |   |
|-------------|-----------|--------|---|---|
| Value one   | Value two | `code` |   |   |
| Empty cells |           |        |   |   |
|             |           |        |   |   |

Code block

```js
const person = 'one';

const func = () => {
  return 'this is a func';
};
```

Headings

# Heading one

## Heading 2

### heading three

### heading 4

Embedded images

![expedia group](./the-power-of-platform-logos-updated.png)

# Graphviz

This should render a small diagram as long as `graphviz` is available in the environment
where the docs are generated. [MkDocs will use it automatically](https://github.com/backstage/mkdocs-techdocs-core/blob/main/src/core.py#L106).



{% dot attack_plan.svg
    digraph G {
        rankdir=LR
        Earth [peripheries=2]
        Mars
        Earth -> Mars
    }
%}
