import { defineConfig } from "vite";
import { copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// JATOS resolves relative URLs against the study-assets root, not the HTML folder.
const camDir = path.dirname(fileURLToPath(import.meta.url));
const folder = path.basename(camDir);

export default defineConfig(({ mode }) => {
    const isJatos = mode === "jatos";
    const assetBase = isJatos ? `./${folder}/dist/` : "./";

    return {
        base: "./",
        define: {
            __CAM_ASSET_BASE__: JSON.stringify(assetBase),
        },
        plugins: [
            {
                name: "inject-jatos-script",
                transformIndexHtml: {
                    order: "post",
                    handler(html) {
                        if (!isJatos) {
                            return html;
                        }
                        return html
                            .replaceAll("\"./assets/", `"${assetBase}assets/`)
                            .replaceAll("\"./img/", `"${assetBase}img/`)
                            .replace(
                                "</head>",
                                "  <script src=\"jatos.js\"></script>\n  </head>"
                            );
                    },
                },
                closeBundle() {
                    if (!isJatos) {
                        return;
                    }
                    // copy the build next to the other component HTML files in the study root
                    copyFileSync(
                        path.join(camDir, "dist", "index.html"),
                        path.join(camDir, "..", `${folder}.html`)
                    );
                },
            },
        ],
    };
});
