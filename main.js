import * as THREE from "three"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// import { Scene, WebGL1Renderer } from "three";



const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();


    // Instantiate a loader
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );

        loader.load(

            // resource URL
            '/HustleDeck.gltf',
    
            // called when the resource is loaded
            function ( gltf ) {
            console.log(gltf);
            // scene.add( gltf.scene );
        
            //Load Model
            // let loader = THREE.GLTFLoader;
            loader.setDRACOLoader(dracoLoader);
            loader.load("/HustleDeck.gltf", function (gltf) {
                gltf.scene.scale.set(0.01, 0.01, 0.01); 
                let deck = gltf.scene;
                scene.add(deck);
    
                // animate();
            });
        
            },
            // called while loading is progressing
            function ( xhr ) {
        
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) {
        
            console.log( 'An error happened' );
            return error;
        
            }
        );
    


const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff,1);
light2.position.set(-2,-2,-5);
scene.add(light2);

const light3 = new THREE.DirectionalLight(0xffffff,1);
light3.position.set(10,10,10);
scene.add(light3);


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.1,100)
camera.position.set(1,1,1.8);
// camera.maxDistance = 1;
// camera.minDistance = 1;
scene.add(camera);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.maxDistance = 2;
controls.minDistance = 1.3;
controls.minPolarAngle = 1;
controls.maxPolarAngle = 1;

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true

function animate(){
    requestAnimationFrame(animate);
    controls.update()
    // deck.rotation.x += 0.01;
    // deck.rotation.z += 0.01;
    renderer.render(scene,camera)
}

animate();