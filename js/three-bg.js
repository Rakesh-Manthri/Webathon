import * as THREE from 'three';

const container = document.getElementById('canvas-container');

if (container) {
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Particles
  const particleCount = 150;
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    velocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Static material color for light theme
  const particleColor = 0x000000;
  let particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: particleColor,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geometry, particleMaterial);
  
  // Lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: particleColor,
    transparent: true,
    opacity: 0.15
  });
  const lineGeometry = new THREE.BufferGeometry();
  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  
  const group = new THREE.Group();
  group.add(particles);
  group.add(lineSegments);
  scene.add(group);

  // Mouse interaction
  const mouse = new THREE.Vector2(0, 0);
  const targetMouse = new THREE.Vector2(0, 0);
  
  window.addEventListener('mousemove', (event) => {
    targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });



  // Animation Loop
  const animate = () => {
    requestAnimationFrame(animate);

    mouse.lerp(targetMouse, 0.05);


    const positions = geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      let x = positions[i * 3];
      let y = positions[i * 3 + 1];
      let z = positions[i * 3 + 2];
      
      x += velocities[i].x;
      y += velocities[i].y;
      z += velocities[i].z;
      
      // Wrap
      if (x > 10) x = -10;
      if (x < -10) x = 10;
      if (y > 10) y = -10;
      if (y < -10) y = 10;
      if (z > 5) z = -5;
      if (z < -5) z = 5;

      // Mouse repel
      const mouseWorldX = mouse.x * 10;
      const mouseWorldY = mouse.y * 10;
      const dist = Math.sqrt((x - mouseWorldX)**2 + (y - mouseWorldY)**2);
      
      if (dist < 2.5) {
        x += (x - mouseWorldX) * 0.01;
        y += (y - mouseWorldY) * 0.01;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    geometry.attributes.position.needsUpdate = true;

    // Connect lines
    const linePos = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        
        if (distSq < 4.0) { // maxDistance^2
          linePos.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));

    group.rotation.y += 0.0005;
    group.rotation.x += 0.0002;

    renderer.render(scene, camera);
  };

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
