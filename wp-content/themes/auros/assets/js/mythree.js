// import { hello } from './module.mjs';
// src="https://unpkg.com/three@0.87.1/build/three.js">
//     <script src="https://unpkg.com/three@0.87.1/examples/js/controls/OrbitControls.js"></script>
//     <script src="https://unpkg.com/three@0.87.1/examples/js/loaders/GLTFLoader.js"></script>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js"></script>


jQuery(document).ready(function () {
    var url3D = jQuery('#my3DUrl').attr('href');
    var url3DDirPath = jQuery('#my3DUrl').data('dir');
    console.log(url3DDirPath);

    // var url3D = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf';
    setTimeout(function () {
        var myWidth = jQuery('#my3DUrl').parent().width();
        console.log(myWidth);
    const backgroundColor = 0x000000;

    /*////////////////////////////////////////*/

    var renderCalls = [];
    function render () {
        requestAnimationFrame( render );
        renderCalls.forEach((callback)=>{ callback(); });
    }
    render();

    /*////////////////////////////////////////*/

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
        camera.position.set(1, 1, 1);
        const canvas = document.querySelector('#my3DUrl');
        // const canvas = document.getElementById('my3DUrl');
        var renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(myWidth, myWidth);
    renderer.setClearColor( backgroundColor );//0x );

    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    window.addEventListener( 'resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );

        // document.body.appendChild( renderer.domElement);
        // document.body.$(canvas);
        jQuery('body').find('#my3DUrl').html(renderer.domElement);

    function renderScene(){ renderer.render( scene, camera ); }
    renderCalls.push(renderScene);

    /* ////////////////////////////////////////////////////////////////////////// */

    var controls = new THREE.OrbitControls( camera );

    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.9;

    controls.minDistance = 3;
    controls.maxDistance = 20;

    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = Math.PI /2; // radians

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    renderCalls.push(function(){
        controls.update()
    });


    /* ////////////////////////////////////////////////////////////////////////// */
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    var light = new THREE.PointLight( 0xffffcc, 20, 200 );
    light.position.set( 4, 30, -20 );
    scene.add( light );

    var light2 = new THREE.AmbientLight( 0x20202A, 20, 100 );
    light2.position.set( 30, -10, 30 );
    scene.add( light2 );

    /* ////////////////////////////////////////////////////////////////////////// */
        var loader = new THREE.TDSLoader();
        var normal = loader.load(url3DDirPath);

        // loader.crossOrigin = true;
        loader.setResourcePath(url3DDirPath + '/');
        loader.load(url3D, function (object) {
            object.rotation.setFromRotationMatrix(object.matrix);
            object.position.set(-1, 0, -0.75); //X, Y , Z
            object.traverse(function (child) {

                if (child.isMesh) {

                    child.material.normalMap = normal;

                }

            });

            scene.add( object );

        });

    }, 2000);

});