/**
 * @path /src/components/Galaxy/Galaxy.tsx
 *
 * @project joshmu-dev-website
 * @file Galaxy.tsx
 *
 * @see https://www.youtube.com/watch?v=Q7AOvWpIVHU
 * @author Josh Mu <hello@joshmu.dev>
 * @created Sunday, 23rd January 2022
 * @modified Sunday, 23rd January 2022 9:53:04 pm
 * @copyright © 2020 - 2022 MU
 */

import { useEffect, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function initGalaxy() {
  const scene = new THREE.Scene()

  // field of view / aspect ratio / near / far
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  // render machine and target
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('galaxy'),
  })

  renderer.setPixelRatio(window.devicePixelRatio)
  // full screen canvas
  renderer.setSize(window.innerWidth, window.innerHeight)
  // render.setClearColor(0xffffff)
  // camera.position.z = 5
  camera.position.set(0, 0, 30)

  // init renderer
  renderer.render(scene, camera)

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const material = new THREE.MeshBasicMaterial({
    color: 0xff6347,
    wireframe: true,
  })
  // const material = new THREE.MeshStandardMaterial({
  //   color: 0xff6347,
  // })
  const torus = new THREE.Mesh(geometry, material)
  torus.position.x = 10

  scene.add(torus)

  // light (when using standard mesh)
  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(5, 5, 5)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

  scene.add(pointLight, ambientLight)

  // helpers
  function addHelpers() {
    const lightHelper = new THREE.PointLightHelper(pointLight)
    const gridHelper = new THREE.GridHelper(20, 20)
    scene.add(lightHelper, gridHelper)
  }

  // controls
  const enableControls = false
  let controls
  if (enableControls) controls = new OrbitControls(camera, renderer.domElement)

  // add stars
  function addStar() {
    const geometry = new THREE.SphereGeometry(0.1, 12, 12)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)

    scene.add(star)
  }
  Array(50).fill().forEach(addStar)

  // move camera
  function moveCamera() {
    const t = document.body.getBoundingClientRect().top

    torus.rotation.z += 0.001

    camera.position.x = t * -0.002
    camera.position.y = t * -0.005
    camera.position.z = t * -0.01
  }
  moveCamera()
  document.addEventListener('scroll', moveCamera)

  // external clean up when react component unmounts
  initGalaxy.cleanUp = () => {
    document.removeEventListener('scroll', moveCamera)
  }

  // animation loop
  function animate() {
    requestAnimationFrame(animate)
    torus.rotation.x += 0.0004
    torus.rotation.y += 0.0002
    torus.rotation.z += 0.00001

    if (enableControls) controls.update()

    renderer.render(scene, camera)
  }
  animate()
}

type ThreeProps = { props?: { [key: string]: any } }

export const Galaxy = ({ ...props }: ThreeProps) => {
  useEffect(() => {
    initGalaxy()

    return initGalaxy.cleanUp
  }, [])

  return (
    <canvas
      id='galaxy'
      className='fixed top-0 left-0 cursor-none opacity-20'
      {...props}
    ></canvas>
  )
}
