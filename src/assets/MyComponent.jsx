import UnicornScene from "unicornstudio-react";

// documentation: https://www.npmjs.com/package/unicornstudio-react
export default function MyComponent() {
    return (
        <UnicornScene
            projectId="t3eP6VHPf7vyTsBA2umU"
            width="full"
            height="100vh"
            scale={1}
            dpi={1.5}
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.1/dist/unicornStudio.umd.js"
        />
    );
}