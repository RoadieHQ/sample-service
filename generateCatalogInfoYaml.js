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
        },
        annotations: {
            "github.com/project-slug": "sblausten/sample-service",
            "bugsnag.com/project-key": "RoadieHQ/93b71ec25fd3e1d803af87d57cea2acd"
        },
        spec: {
            type: "service",
            owner: "sblausten",
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
            const content = getComponentYaml(count);
            console.log(`Generated yaml for component ${i}`)
            console.log(`Appending yaml`)
            await fs.appendFile(fileName, content);
            await fs.appendFile(fileName, "---\n");
            console.log(`Added yaml to ${fileName} for component ${i}`)
            i += 1
        }

    } catch (err) {
        console.log(err);
    }
}
generate();
