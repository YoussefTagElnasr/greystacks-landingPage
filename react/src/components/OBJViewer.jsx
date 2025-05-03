import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './OBJViewer.module.css'; // Import the CSS module

const PLYViewer = ({ plyUrl }) => {
  const mountRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);
  
  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
   
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    
    // Container for our points
    const modelContainer = new THREE.Object3D();
    scene.add(modelContainer);
    
    // Track user interaction
    const handleInteraction = () => {
      setUserInteracted(true);
    };
    
    // Add event listeners
    renderer.domElement.addEventListener('pointerdown', handleInteraction);
    renderer.domElement.addEventListener('wheel', handleInteraction);
    
    // Load PLY file
    const loader = new PLYLoader();
    loader.load(
      plyUrl,
      (geometry) => {
        // Set up point cloud material
        const material = new THREE.PointsMaterial({
          size: 0.01,
          vertexColors: true // Use vertex colors from PLY if available
        });
        
        // Create points from geometry
        const pointCloud = new THREE.Points(geometry, material);
        
        // Add to container for rotation
        modelContainer.add(pointCloud);
       
        // Center the point cloud
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const center = new THREE.Vector3();
        box.getCenter(center);
       
        pointCloud.position.x = -center.x;
        pointCloud.position.y = -center.y;
        pointCloud.position.z = -center.z;
       
        // Adjust camera based on point cloud size
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 1.5;
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Auto-rotate until user interacts
      if (!userInteracted) {
        modelContainer.rotation.y += 0.005;
      } else {
        controls.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handleInteraction);
      renderer.domElement.removeEventListener('wheel', handleInteraction);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [plyUrl, userInteracted]);
  
  return <div ref={mountRef} className={styles.container} />;
};

export default PLYViewer;