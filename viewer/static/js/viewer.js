// Three.js viewer logic

function initPointCloudViewer(fileUrl) {
    const container = document.getElementById('viewer');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(2, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Load ASCII PLY
    fetch(fileUrl)
        .then(res => res.text())
        .then(data => {
            const lines = data.split("\n");
            let start = lines.indexOf("end_header") + 1;
            const points = [];

            for (let i = start; i < lines.length; i++) {
                const p = lines[i].trim().split(/\s+/);
                if (p.length >= 3) {
                    points.push(parseFloat(p[0]), parseFloat(p[1]), parseFloat(p[2]));
                }
            }

            if (!points.length) {
                alert("Invalid or empty file. Make sure it's ASCII PLY!");
                return;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));

            const material = new THREE.PointsMaterial({
                size: 0.04,
                color: 0xffffff
            });

            const cloud = new THREE.Points(geometry, material);
            scene.add(cloud);

            function animate() {
                requestAnimationFrame(animate);
                cloud.rotation.y += 0.001;
                renderer.render(scene, camera);
            }
            animate();
        })
        .catch(err => {
            console.error(err);
            alert("Error loading PLY file!");
        });

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
