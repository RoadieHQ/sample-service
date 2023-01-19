// node ./generateCatalogInfoYaml.js 100

const fs = require('fs/promises');
const yaml = require('js-yaml');

const getComponentYaml = (i) => {
    const generateComponent = (number) => ({
        apiVersion: "backstage.io/v1alpha1",
        kind: "Component",
        metadata: {
            name: `generated-component-${number}`,
            title: `generated-component-${number}`,
            annotations: {
                "github.com/project-slug": "RoadieHQ/sample-service"
            },
            tags: ['test', `generated${i}`]
        },
        spec: {
            type: "service",
            owner: "RoadieHQ",
            lifecycle: "experimental"
        }
    });

    return yaml.dump(generateComponent(i));
}

async function generate() {
    try {
        const args = process.argv.slice(2)
        const count = Number(args[0])
        console.log(`Creating ${count} components`)
        const fileName = `catalog-info-${count}-generated-components.yaml`;

        let i = 1;
        while(i <= count) {
            const content = getComponentYaml(i);
            await fs.appendFile(fileName, content);
            if(i !== count) await fs.appendFile(fileName, "---\n");
            console.log(`Added yaml to ${fileName} for component ${i}`)
            i += 1
        }

    } catch (err) {
        console.log(err);
    }
}
generate();
