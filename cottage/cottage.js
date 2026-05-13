const canvas = document.getElementById("cottage");
const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
});

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;

    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, 11), scene);
    camera.setTarget(BABYLON.Vector3.Zero(0, 1, 1));
    camera.attachControl(canvas, true);
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);

    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    const light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(-1, -2, 1), scene);
    light2.intensity = 0.75;

    var box = new BABYLON.MeshBuilder.CreateBox("box", {
        size: 25,
        sideOrientation: BABYLON.Mesh.BACKSIDE
    }, scene);
    box.checkCollisions = true;

    const stone = new BABYLON.StandardMaterial("stone", scene);
    stone.diffuseTexture = new BABYLON.Texture("../img/pixabay/pexels-rock-wall-1845128-min-min.jpg", scene);
    stone.diffuseTexture.uScale = 1.0;
    stone.diffuseTexture.vScale = 1.0;
    stone.samplingMode = BABYLON.Texture.BILINEAR_SAMPLINGMODE;
    box.material = stone;

    return scene;
};

const scene = createScene();

var pipeline = new BABYLON.DefaultRenderingPipeline("pipeline", true, scene);
pipeline.samples = 4; // Use 2, 4, or 8 depending on performance
pipeline.sharpenEnabled = true;
// pipeline.sharpen.edgeAmount = 0.5; // Controls sharpness intensity (default 0.3)

engine.setHardwareScalingLevel(0.5);
engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});

// Add GLB Model
const result = await BABYLON.SceneLoader.AppendAsync('models/', 'pix-quaternius_cc0-stag-1373.glb', scene).then(result => {
    var rootMesh = scene.meshes[0];
    rootMesh.isPickable = true;

    // Create action manager for the mesh
    rootMesh.actionManager = new BABYLON.ActionManager(scene);

    // Register the click action
    rootMesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (event) {
            console.log("Mesh clicked: " + event.meshUnderPointer.id);
        })
    );
});
const rootNode = result.meshes.find(m => m.name === "__root__");
if (rootNode) {
    rootNode.name = "Deer";
}

result.loadedMeshes.forEach(mesh => {
    mesh.name = "deer" + mesh.name;
});

// NAMING NOT WORKING YET & NOT INTERACTIVE MESH YET
