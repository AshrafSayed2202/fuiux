import UnicornScene from "unicornstudio-react";

export default function MyComponent() {
    return (
        <UnicornScene
            projectId="t3eP6VHPf7vyTsBA2umU"
            width="full"
            height="100vh"
            scale={1}           // ← Lower = big performance win (try 0.5–0.75)
            dpi={1}               // ← 1.0 is usually plenty (was 1.5)
            fps={15}              // ← Lower target framerate
            production={true}     // Explicit (default is true, but good to be sure)
            lazyLoad={true}       // Explicit (default is true)
            sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.1/dist/unicornStudio.umd.js"
        />
    );
}