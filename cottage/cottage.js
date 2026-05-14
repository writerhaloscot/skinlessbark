const canvas = document.getElementById("cottage");
const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
});

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;

    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-5, 7, -20), scene);
    camera.setTarget(BABYLON.Vector3.Zero(0, 0, 0));
    camera.attachControl(canvas, true);
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);

    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
    light.intensity = 1.5;

    var box = new BABYLON.MeshBuilder.CreateBox("box", {
        size: 30,
        sideOrientation: BABYLON.Mesh.BACKSIDE
    }, scene);
    box.checkCollisions = true;
    box.position = new BABYLON.Vector3(0, 0, -10);
    const material = new BABYLON.StandardMaterial("boxMat", scene);
    box.material = material;
    material.alpha = 0;
    box.receiveShadows = true;

    return scene;
};

const scene = createScene();

var pipeline = new BABYLON.DefaultRenderingPipeline("pipeline", true, scene);
pipeline.samples = 4; // Use 2, 4, or 8 depending on performance
pipeline.sharpenEnabled = true;
pipeline.sharpen.edgeAmount = 0.4; // Controls sharpness intensity (default 0.3)

engine.setHardwareScalingLevel(0.5);
engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});

// Scene Background
scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

// Deer
// ATTRIBUTION REQUIRED
// https://sketchfab.com/3d-models/irish-deer-fossil-33b64def1e7d40048224f589d49d68ec#download
const deer = BABYLON.SceneLoader.ImportMeshAsync('', 'models/', 'irish_deer_fossil.glb', scene).then((result) => {
    const characterRoot = result.meshes[0];
    const characterMeshes = result.meshes;

    characterRoot.position = new BABYLON.Vector3(0, 0, 5);
    characterRoot.scaling = new BABYLON.Vector3(3, 3, 3);

    characterMeshes.forEach(mesh => {
        mesh.isPickable = true;
        mesh.actionManager = new BABYLON.ActionManager(scene);
        mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function (evt) {
                    console.log("Deer clicked!", evt.meshUnderPointer.name);
                    alert('You clicked the deer!');
                    // Add your interaction logic here (e.g., play animation)
                }
            )
        );
    });
});
// NOTE: invisible collisions can cause click not to work

// Add Shack Interior: GIVE ATTRIBUTION FOR ALL SKETCH FAB, CHECK LINKS/COMMERCIAL USE
// https://sketchfab.com/3d-models/pine-forest-ece69535f7584e099488f65f2072264e
// ground + skybox also another option
const forest = await BABYLON.SceneLoader.ImportMeshAsync('', 'scenes/', 'pine_forest.glb', scene);
forest.meshes[0].scaling = new BABYLON.Vector3(3, 3, 3);
forest.meshes[0].isPickable = false;
